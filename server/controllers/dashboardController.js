const db = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');
const { TOTAL_QUESTIONS, getRecommendations } = require('../utils/discInsights');

const formatHistoryRow = (row) => {
  let insights = null;
  if (row.insights) {
    try {
      // Se já for um objeto, retorna direto, senão faz parse
      insights = typeof row.insights === 'string' ? JSON.parse(row.insights) : row.insights;
    } catch (parseError) {
      console.warn('Erro ao fazer parse de insights:', parseError);
      insights = null;
    }
  }

  return {
    id: row.id,
    profile: row.profile,
    confidence: row.confidence,
    createdAt: row.created_at,
    scores: {
      D: row.d_score || 0,
      I: row.i_score || 0,
      S: row.s_score || 0,
      C: row.c_score || 0,
    },
    percentages: {
      D: Math.round(((row.d_score || 0) / TOTAL_QUESTIONS) * 100),
      I: Math.round(((row.i_score || 0) / TOTAL_QUESTIONS) * 100),
      S: Math.round(((row.s_score || 0) / TOTAL_QUESTIONS) * 100),
      C: Math.round(((row.c_score || 0) / TOTAL_QUESTIONS) * 100),
    },
    insights,
  };
};

exports.getSummary = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  try {
    // Buscar total de testes
    const [countRows] = await db.query(
      'SELECT COUNT(*) AS total FROM disc_tests WHERE user_id = ?',
      [req.user.id],
    );

    const countRow = countRows && countRows[0] ? countRows[0] : { total: 0 };
    const totalTests = Number(countRow.total) || 0;

    // Buscar histórico de testes
    const [historyRows] = await db.query(
      `SELECT id, profile, d_score, i_score, s_score, c_score, confidence, insights, created_at
       FROM disc_tests
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 10`,
      [req.user.id],
    );

    const history = Array.isArray(historyRows) ? historyRows.map(formatHistoryRow) : [];
    const latestTest = history[0] || null;
    const previousTest = history[1] || null;

    const evolution =
      latestTest && previousTest ? latestTest.confidence - previousTest.confidence : 0;

    const recommendations = latestTest ? getRecommendations(latestTest.profile) : [];

    res.json({
      user: req.user,
      summary: {
        totalTests,
        lastTestDate: latestTest ? latestTest.createdAt : null,
        primaryProfile: latestTest ? latestTest.profile : null,
        confidence: latestTest ? latestTest.confidence : 0,
        evolution,
      },
      latestTest,
      history,
      recommendations,
    });
  } catch (error) {
    console.error('Erro ao buscar resumo do dashboard:', error);
    console.error('Stack trace:', error.stack);
    console.error('User ID:', req.user?.id);
    throw error;
  }
});

