const { z } = require('zod');
const db = require('../db/pool');
const asyncHandler = require('../utils/asyncHandler');
const { hashPassword, comparePassword } = require('../utils/password');
const { signToken } = require('../utils/jwt');

const registerSchema = z.object({
  name: z.string().min(3, 'Informe um nome com pelo menos 3 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(1, 'Informe sua senha.'),
});

const buildUserPayload = (dbUser) => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  role: dbUser.role || 'user',
  createdAt: dbUser.createdAt || dbUser.created_at,
});

exports.register = asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      details: parsed.error.issues,
    });
  }

  const { name, email, password } = parsed.data;

  const [existing] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
  if (existing.length) {
    return res.status(409).json({ message: 'Já existe um usuário com este e-mail.' });
  }

  const passwordHash = await hashPassword(password);

  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash],
  );

  const user = buildUserPayload({ id: result.insertId, name, email, role: 'user' });
  const token = signToken({ sub: user.id });

  return res.status(201).json({ token, user });
});

exports.login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      details: parsed.error.issues,
    });
  }

  const { email, password } = parsed.data;

  const [rows] = await db.query(
    'SELECT id, name, email, password_hash, role, created_at AS createdAt FROM users WHERE email = ? LIMIT 1',
    [email],
  );

  if (!rows.length) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const userRow = rows[0];
  const passwordMatch = await comparePassword(password, userRow.password_hash);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [userRow.id]);

  const user = buildUserPayload(userRow);
  const token = signToken({ sub: user.id });

  return res.json({ token, user });
});

