import app from './app';

const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || '0.0.0.0';

console.log(`⚡ ListaAI server starting on ${HOST}:${PORT}`);
console.log(`📋 API docs: http://localhost:${PORT}/health`);

export default {
  port: PORT,
  hostname: HOST,
  fetch: app.fetch,
};
