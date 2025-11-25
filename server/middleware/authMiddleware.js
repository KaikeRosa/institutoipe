const db = require('../db/pool');
const { verifyToken } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Autenticação necessária.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const [rows] = await db.query(
      'SELECT id, name, email, role, created_at AS createdAt, updated_at AS updatedAt FROM users WHERE id = ? LIMIT 1',
      [decoded.sub],
    );

    if (!rows.length) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = rows[0];
    req.tokenPayload = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Sessão expirada ou inválida.' });
  }
};

