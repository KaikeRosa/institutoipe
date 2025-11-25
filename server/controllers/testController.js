const { z } = require('zod');
const db = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');
const {
  questions,
  calculateScores,
  TOTAL_QUESTIONS,
} = require('../utils/discInsights');

const answerSchema = z.object({
  questionId: z.number().int().positive(),
  value: z.enum(['D', 'I', 'S', 'C']),
});

const submissionSchema = z.object({
  answers: z.array(answerSchema).min(10, 'Responda pelo menos 10 perguntas para gerar um resultado.'),
});

const validQuestionIds = new Set(questions.map((question) => question.id));

const formatTestRow = (row) => ({
  id: row.id,
  profile: row.profile,
  scores: {
    D: row.d_score,
    I: row.i_score,
    S: row.s_score,
    C: row.c_score,
  },
  confidence: row.confidence,
  createdAt: row.created_at,
  insights: row.insights ? JSON.parse(row.insights) : null,
  percentages: {
    D: Math.round((row.d_score / TOTAL_QUESTIONS) * 100),
    I: Math.round((row.i_score / TOTAL_QUESTIONS) * 100),
    S: Math.round((row.s_score / TOTAL_QUESTIONS) * 100),
    C: Math.round((row.c_score / TOTAL_QUESTIONS) * 100),
  },
});

exports.getQuestions = asyncHandler(async (_req, res) => {
  res.json({ total: questions.length, questions });
});

exports.listTests = asyncHandler(async (req, res) => {
  const [rows] = await db.query(
    `SELECT id, profile, d_score, i_score, s_score, c_score, confidence, insights, created_at
     FROM disc_tests
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT 20`,
    [req.user.id],
  );

  const tests = rows.map(formatTestRow);
  res.json({ tests });
});

exports.createTest = asyncHandler(async (req, res) => {
  const parsed = submissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      details: parsed.error.issues,
    });
  }

  const filteredAnswers = parsed.data.answers.filter((answer) => validQuestionIds.has(answer.questionId));

  if (!filteredAnswers.length) {
    return res.status(400).json({ message: 'Nenhuma resposta válida foi enviada.' });
  }

  const result = calculateScores(filteredAnswers);

  const [dbResult] = await db.query(
    `INSERT INTO disc_tests
      (user_id, profile, d_score, i_score, s_score, c_score, confidence, answers_json, insights)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      result.profileCode,
      result.scores.D,
      result.scores.I,
      result.scores.S,
      result.scores.C,
      result.confidence,
      JSON.stringify(result.answers),
      JSON.stringify(result.insights),
    ],
  );

  const savedTest = {
    id: dbResult.insertId,
    profile: result.profileCode,
    profileLabel: result.insights.profileLabel,
    scores: result.scores,
    percentages: result.percentages,
    confidence: result.confidence,
    createdAt: new Date().toISOString(),
    insights: result.insights,
  };

  res.status(201).json({ test: savedTest });
});

