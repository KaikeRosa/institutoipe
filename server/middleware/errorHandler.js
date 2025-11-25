module.exports = (err, _req, res, _next) => {
  console.error('API error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const payload = {
    message: err.message || 'Erro interno inesperado.',
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    payload.stack = err.stack;
  }

  if (err.details) {
    payload.details = err.details;
  }

  res.status(statusCode).json(payload);
};

