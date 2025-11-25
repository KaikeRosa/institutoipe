const API_BASE_URL = window.API_BASE_URL || 'http://localhost:4000';
const SESSION_STORAGE_KEY = 'ipe_session';

const getStoredSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Não foi possível ler a sessão salva:', error);
    return null;
  }
};

const saveSession = ({ token, user }) => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ token, user }));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

const getToken = () => {
  const session = getStoredSession();
  return session?.token || null;
};

const getUser = () => {
  const session = getStoredSession();
  return session?.user || null;
};

const requireAuth = (redirectPath) => {
  const token = getToken();
  if (!token) {
    const fallback = redirectPath || window.location.pathname;
    window.location.href = `login.html?redirect=${encodeURIComponent(fallback)}`;
    return false;
  }
  return true;
};

const isAdmin = () => getUser()?.role === 'admin';

const getDefaultHomePath = () => (isAdmin() ? 'admin.html' : 'dashboard.html');

const requireAdmin = (redirectPath = 'admin.html') => {
  const isAuthenticated = requireAuth(redirectPath);
  if (!isAuthenticated) {
    return false;
  }

  if (!isAdmin()) {
    alert('Esta área é restrita aos administradores.');
    window.location.href = getDefaultHomePath();
    return false;
  }

  return true;
};

const apiRequest = async (path, options = {}) => {
  const {
    method = 'GET',
    body,
    headers = {},
    auth = true,
  } = options;

  const finalHeaders = { ...headers };

  if (!(body instanceof FormData)) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getToken();
    if (!token) {
      throw new Error('Faça login para continuar.');
    }
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  // Lê o texto da resposta uma única vez
  const text = await response.text();
  const contentType = response.headers.get('content-type');
  
  // Tenta fazer parse do JSON
  let data;
  if (contentType && contentType.includes('application/json')) {
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      console.error('Texto recebido:', text);
      data = { message: 'Resposta inválida do servidor', raw: text };
    }
  } else {
    // Se não for JSON, trata como texto
    data = { message: text || `Erro ${response.status}: ${response.statusText}` };
  }

  if (!response.ok) {
    const message = data?.message || `Erro ${response.status}: ${response.statusText}`;
    const error = new Error(message);
    error.details = data?.details;
    error.status = response.status;
    error.stack = data?.stack;
    if (data?.raw) {
      error.rawResponse = data.raw;
    }
    throw error;
  }

  return data;
};

const AuthAPI = {
  login: (credentials) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: credentials,
      auth: false,
    }),
  register: (payload) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: payload,
      auth: false,
    }),
};

const PENDING_TEST_KEY = 'ipe_pending_test';

const PendingTest = {
  save(payload) {
    if (!payload || !Array.isArray(payload.answers) || payload.answers.length === 0) {
      return;
    }

    const data = {
      ...payload,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(PENDING_TEST_KEY, JSON.stringify(data));
  },

  peek() {
    const raw = localStorage.getItem(PENDING_TEST_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed?.answers) || !parsed.answers.length) {
        return null;
      }
      return parsed;
    } catch (error) {
      console.warn('Não foi possível ler o teste pendente:', error);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(PENDING_TEST_KEY);
  },

  async submit() {
    const pending = this.peek();
    if (!pending) return false;

    await apiRequest('/api/tests', {
      method: 'POST',
      body: pending,
    });

    this.clear();
    return true;
  },
};

window.API_BASE_URL = API_BASE_URL;
window.apiRequest = apiRequest;
window.AuthAPI = AuthAPI;
window.PendingTest = PendingTest;
window.AuthSession = {
  save: saveSession,
  clear: clearSession,
  getToken,
  getUser,
  isAdmin,
  requireAdmin,
  getHomePath: getDefaultHomePath,
  requireAuth,
  getSession: getStoredSession,
};

