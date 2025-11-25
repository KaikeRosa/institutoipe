
  # Futuristic Neon Website Design

Experiência completa do Instituto IPÊ com landing page, teste DISC, login e dashboard conectados a uma API Node.js + MySQL.

## Requisitos

- Node.js 18+
- MySQL 8+

## Instalação

```bash
npm install
```

## Banco de Dados

1. Crie um banco (ex.: `ipe_disc`).
2. Rode o script `server/sql/schema.sql`.

## Variáveis de Ambiente

Copie `server/env.example` para `.env` (na raiz do projeto) e preencha com suas credenciais:

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=sua-chave
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=ipe_disc
```

## Executando

- Frontend (Vite): `npm run dev`
- API (Express): `npm run server`

Ambos podem rodar em paralelo (`http://localhost:5173` consumindo `http://localhost:4000`).

## Fluxo

1. Landing page (`index.html`) possui login/cadastro conectado ao backend.
2. `login.html` oferece autenticação dedicada com redirecionamento pós-login.
3. `disc.html` exige login, busca perguntas na API e salva respostas no MySQL.
4. `dashboard.html` consome `/api/dashboard/summary` para preencher estatísticas, gráficos e recomendações.

## Painel Administrativo

- Crie/atualize um usuário administrador via script:

```bash
npm run create:admin -- --name="Admin IPÊ" --email=admin@exemplo.com --password=SenhaForte123
```

- Ao fazer login com esse usuário você será direcionado automaticamente para `admin.html`.
- O painel consome `/api/admin/users` e `/api/admin/tests`, listando cada cadastro/teste e permitindo exportar os usuários em CSV.
- Contas comuns continuam sendo levadas para `dashboard.html`.
  