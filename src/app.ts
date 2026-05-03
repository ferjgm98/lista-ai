import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

const app = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

// CORS for development
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (c.req.method === 'OPTIONS') return c.body(null, 204);
  await next();
});

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', version: '0.1.0', name: 'lista-ai' });
});

// Public routes
import authRoutes from './routes/auth';
app.route('/api/auth', authRoutes);

// Protected routes
import listingsRoutes from './routes/listings';
import integrationsRoutes from './routes/integrations';
import billingRoutes from './routes/billing';

app.use('/api/*', async (c, next) => {
  // Skip auth for non-protected paths
  if (c.req.path.startsWith('/api/auth/')) return next();
  if (c.req.path.startsWith('/api/integrations/ml/callback')) return next();
  if (c.req.path.startsWith('/health')) return next();

  const jwtMiddleware = jwt({ secret: JWT_SECRET });
  return jwtMiddleware(c, next);
});

app.route('/api/listings', listingsRoutes);
app.route('/api/integrations', integrationsRoutes);
app.route('/api/billing', billingRoutes);

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ success: false, error: err.message || 'Internal server error' }, 500);
});

export default app;
