import { Hono } from 'hono';
import { getDb } from '../db';
import { getAuthUrl, exchangeCode, getValidToken } from '../services/mercado-libre';
import { uid } from '../db';

const integrations = new Hono();

// Generate Mercado Libre OAuth URL
integrations.get('/ml/auth', async (c) => {
  const payload = c.get('jwtPayload');
  const state = JSON.stringify({ userId: payload.sub, redirect: c.req.query('redirect') || '/' });
  const url = getAuthUrl(state);
  return c.json({ success: true, data: { url } });
});

// Handle Mercado Libre OAuth callback
integrations.get('/ml/callback', async (c) => {
  const code = c.req.query('code');
  const state = c.req.query('state');

  if (!code) {
    return c.json({ success: false, error: 'No authorization code received' }, 400);
  }

  try {
    const tokens = await exchangeCode(code);
    const { userId } = JSON.parse(state || '{}');

    if (!userId) {
      return c.json({ success: false, error: 'Invalid state parameter' }, 400);
    }

    const db = getDb();

    // Upsert integration
    const existing = db
      .query('SELECT id FROM integrations WHERE user_id = ? AND platform = ?')
      .get(userId, 'mercado_libre') as any;

    if (existing) {
      db.run(
        `UPDATE integrations SET access_token = ?, refresh_token = ?, expires_at = ?, seller_id = ?, updated_at = datetime('now')
         WHERE id = ?`,
        [tokens.access_token, tokens.refresh_token, tokens.expires_at, tokens.seller_id, existing.id]
      );
    } else {
      db.run(
        `INSERT INTO integrations (id, user_id, platform, access_token, refresh_token, expires_at, seller_id)
         VALUES (?, ?, 'mercado_libre', ?, ?, ?, ?)`,
        [uid(), userId, tokens.access_token, tokens.refresh_token, tokens.expires_at, tokens.seller_id]
      );
    }

    // Redirect back to the app (or return success for API clients)
    const redirectUrl = c.req.query('redirect') || '/dashboard';
    return c.redirect(redirectUrl);
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// Check integration status
integrations.get('/ml/status', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();

  const integration = db
    .query('SELECT id, platform, seller_id, expires_at, created_at FROM integrations WHERE user_id = ? AND platform = ?')
    .get(payload.sub, 'mercado_libre') as any;

  return c.json({
    success: true,
    data: integration
      ? {
          connected: true,
          seller_id: integration.seller_id,
          expires_at: integration.expires_at,
          connected_since: integration.created_at,
        }
      : { connected: false },
  });
});

// Disconnect Mercado Libre
integrations.delete('/ml', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();
  db.run('DELETE FROM integrations WHERE user_id = ? AND platform = ?', [payload.sub, 'mercado_libre']);
  return c.json({ success: true, data: null });
});

export default integrations;
