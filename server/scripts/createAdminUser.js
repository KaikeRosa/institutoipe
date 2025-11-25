const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const db = require('../db/pool');
const { hashPassword } = require('../utils/password');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (!arg.startsWith('--')) {
      // Permite valores sem chave (ex.: após --name)
      continue;
    }

    const [rawKey, inlineValue] = arg.split('=');
    const key = rawKey.replace(/^--/, '');

    if (inlineValue !== undefined) {
      params[key] = inlineValue;
    } else if (args[i + 1] && !args[i + 1].startsWith('--')) {
      params[key] = args[i + 1];
      i += 1;
    }
  }

  return params;
};

const params = parseArgs();

const name = params.name || params.n || process.env.npm_config_name;
const email = params.email || params.e || process.env.npm_config_email;
const password = params.password || params.p || process.env.npm_config_password;

if (!name || !email || !password) {
  console.error(
    '\nUso: npm run create:admin -- --name="Seu Nome" --email=admin@exemplo.com --password=SenhaForte123\n',
  );
  process.exit(1);
}

async function upsertAdmin() {
  try {
    const passwordHash = await hashPassword(password);

    const [existing] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);

    if (existing.length) {
      await db.query(
        'UPDATE users SET name = ?, password_hash = ?, role = "admin" WHERE id = ?',
        [name, passwordHash, existing[0].id],
      );
      console.log('🔐 Usuário existente atualizado para administrador com sucesso!');
    } else {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, "admin")',
        [name, email, passwordHash],
      );
      console.log(`✅ Usuário administrador criado com ID ${result.insertId}`);
    }
  } catch (error) {
    console.error('❌ Não foi possível criar/atualizar o admin:', error.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

upsertAdmin();

