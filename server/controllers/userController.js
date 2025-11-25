const db = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');
const { TOTAL_QUESTIONS } = require('../utils/discInsights');

const mapTest = (row) => ({
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
  percentages: {
    D: Math.round((row.d_score / TOTAL_QUESTIONS) * 100),
    I: Math.round((row.i_score / TOTAL_QUESTIONS) * 100),
    S: Math.round((row.s_score / TOTAL_QUESTIONS) * 100),
    C: Math.round((row.c_score / TOTAL_QUESTIONS) * 100),
  },
  insights: row.insights ? JSON.parse(row.insights) : null,
});

exports.getProfile = asyncHandler(async (req, res) => {
  const [rows] = await db.query(
    `SELECT id, profile, d_score, i_score, s_score, c_score, confidence, insights, created_at
     FROM disc_tests
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT 1`,
    [req.user.id],
  );

  const lastTest = rows.length ? mapTest(rows[0]) : null;

  res.json({
    user: req.user,
    lastTest,
  });
});

