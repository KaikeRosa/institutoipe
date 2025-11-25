const adminState = {
  users: [],
  tests: [],
  limit: 50,
};

const formatDateTime = (value) => {
  if (!value) return '--';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
};

const formatRelative = (value) => {
  if (!value) return '--';
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'hoje';
  if (days === 1) return 'há 1 dia';
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months === 1) return 'há 1 mês';
  return `há ${months} meses`;
};

function setUsersLoading() {
  const tbody = document.getElementById('admin-users-body');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-placeholder">Carregando usuários...</td>
      </tr>
    `;
  }
}

function setTestsLoading() {
  const tbody = document.getElementById('admin-tests-body');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-placeholder">Carregando testes...</td>
      </tr>
    `;
  }
}

function renderUsers(users = []) {
  const tbody = document.getElementById('admin-users-body');
  if (!tbody) return;

  if (!users.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-placeholder">Nenhum usuário encontrado.</td>
      </tr>
    `;
    return;
  }

  const rows = users
    .map(
      (user) => `
      <tr>
        <td>
          <div class="user-cell">
            <strong>${user.name}</strong>
            <small>ID ${user.id}</small>
          </div>
        </td>
        <td>${user.email}</td>
        <td>
          <span class="admin-role-badge ${user.role === 'admin' ? 'admin' : ''}">
            ${user.role === 'admin' ? 'Admin' : 'Usuário'}
          </span>
        </td>
        <td>${user.totalTests}</td>
        <td>${user.lastProfile || '--'}</td>
        <td>${user.lastTestDate ? formatRelative(user.lastTestDate) : 'Sem testes'}</td>
      </tr>
    `,
    )
    .join('');

  tbody.innerHTML = rows;
}

function renderTests(tests = []) {
  const tbody = document.getElementById('admin-tests-body');
  if (!tbody) return;

  if (!tests.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-placeholder">Nenhum teste encontrado.</td>
      </tr>
    `;
    return;
  }

  const rows = tests
    .map(
      (test) => `
      <tr>
        <td>#${test.id}</td>
        <td>
          <div class="user-cell">
            <strong>${test.userName}</strong>
            <small>${test.userEmail}</small>
          </div>
        </td>
        <td>${test.profile}</td>
        <td>${test.confidence}%</td>
        <td>
          <span class="score-pill">
            <span>D ${test.scores?.D ?? 0}</span>
            <span>I ${test.scores?.I ?? 0}</span>
            <span>S ${test.scores?.S ?? 0}</span>
            <span>C ${test.scores?.C ?? 0}</span>
          </span>
        </td>
        <td>${formatDateTime(test.createdAt)}</td>
      </tr>
    `,
    )
    .join('');

  tbody.innerHTML = rows;
}

function updateStats() {
  const totalUsers = adminState.users.length;
  const totalTests = adminState.tests.length;

  document.getElementById('admin-total-users').textContent = totalUsers;
  document.getElementById('admin-total-tests').textContent = totalTests;

  const lastUser = adminState.users[0];
  document.getElementById('admin-last-user').textContent = lastUser?.name || '--';
  document.getElementById('admin-last-user-date').textContent = lastUser
    ? formatRelative(lastUser.createdAt || lastUser.lastTestDate)
    : '--';

  const lastTest = adminState.tests[0];
  document.getElementById('admin-last-test').textContent = lastTest
    ? `${lastTest.profile} (${lastTest.userName})`
    : '--';
  document.getElementById('admin-last-test-date').textContent = lastTest
    ? formatRelative(lastTest.createdAt)
    : '--';
}

function updateLastSync() {
  const el = document.getElementById('admin-last-sync');
  if (el) {
    el.textContent = formatDateTime(new Date().toISOString());
  }
}

function downloadCSV() {
  if (!adminState.users.length) {
    alert('Nenhum usuário para exportar.');
    return;
  }

  const headers = ['id', 'name', 'email', 'role', 'totalTests', 'lastProfile', 'lastTestDate'];
  const lines = [headers.join(';')];

  adminState.users.forEach((user) => {
    lines.push(
      [
        user.id,
        `"${user.name}"`,
        user.email,
        user.role,
        user.totalTests,
        user.lastProfile || '',
        user.lastTestDate || '',
      ].join(';'),
    );
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `usuarios-ipe-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

async function loadAdminData({ showToast } = {}) {
  setUsersLoading();
  setTestsLoading();

  try {
    const [usersRes, testsRes] = await Promise.all([
      apiRequest('/api/admin/users'),
      apiRequest(`/api/admin/tests?limit=${adminState.limit}`),
    ]);

    adminState.users = usersRes?.users || [];
    adminState.tests = testsRes?.tests || [];

    renderUsers(adminState.users);
    renderTests(adminState.tests);
    updateStats();
    updateLastSync();

    if (showToast) {
      console.log('✅ Dados administrativos atualizados');
    }
  } catch (error) {
    console.error('❌ Erro ao carregar dados administrativos:', error);
    alert(error.message || 'Não foi possível carregar os dados administrativos.');
    if (error.status === 401) {
      AuthSession.requireAuth('admin.html');
    }
    if (error.status === 403) {
      alert('Sua conta não tem permissão para acessar esta área.');
      window.location.href = AuthSession.getHomePath();
    }
  }
}

function setupAdminEvents() {
  document.getElementById('logout-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    AuthSession.clear();
    window.location.href = 'login.html';
  });

  document.getElementById('refresh-admin-data')?.addEventListener('click', () => {
    loadAdminData({ showToast: true });
  });

  document.getElementById('export-users-btn')?.addEventListener('click', downloadCSV);

  document.getElementById('admin-tests-limit')?.addEventListener('change', (event) => {
    adminState.limit = Number(event.target.value) || 50;
    loadAdminData();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const isAllowed = AuthSession.requireAdmin('admin.html');
  if (!isAllowed) {
    return;
  }

  setupAdminEvents();
  await loadAdminData();
});

