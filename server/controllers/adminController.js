const db = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');

exports.listUsers = asyncHandler(async (_req, res) => {
  const [rows] = await db.query(
    `SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        u.created_at AS createdAt,
        COUNT(dt.id) AS totalTests,
        MAX(dt.created_at) AS lastTestDate,
        (
          SELECT dt2.profile
          FROM disc_tests dt2
          WHERE dt2.user_id = u.id
          ORDER BY dt2.created_at DESC
          LIMIT 1
        ) AS lastProfile
     FROM users u
     LEFT JOIN disc_tests dt ON dt.user_id = u.id
     GROUP BY u.id
     ORDER BY u.created_at DESC`,
  );

  const users = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.createdAt,
    totalTests: Number(row.totalTests) || 0,
    lastTestDate: row.lastTestDate,
    lastProfile: row.lastProfile,
  }));

  res.json({ users });
});

exports.listTests = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 500);

  const [rows] = await db.query(
    `SELECT 
        dt.id,
        dt.user_id AS userId,
        u.name AS userName,
        u.email AS userEmail,
        dt.profile,
        dt.d_score AS dScore,
        dt.i_score AS iScore,
        dt.s_score AS sScore,
        dt.c_score AS cScore,
        dt.confidence,
        dt.created_at AS createdAt
     FROM disc_tests dt
     INNER JOIN users u ON u.id = dt.user_id
     ORDER BY dt.created_at DESC
     LIMIT ?`,
    [limit],
  );

  const tests = rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    userName: row.userName,
    userEmail: row.userEmail,
    profile: row.profile,
    scores: {
      D: row.dScore,
      I: row.iScore,
      S: row.sScore,
      C: row.cScore,
    },
    confidence: row.confidence,
    createdAt: row.createdAt,
  }));

  res.json({ tests });
});

