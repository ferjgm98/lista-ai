import { getDb } from '../db';
import type { MLToken } from '../types';

const ML_AUTH_URL = 'https://auth.mercadolibre.com/authorization';
const ML_API_URL = 'https://api.mercadolibre.com';
const ML_TOKEN_URL = 'https://api.mercadolibre.com/oauth/token';

interface MLConfig {
  appId: string;
  clientSecret: string;
  redirectUri: string;
}

function getConfig(): MLConfig {
  return {
    appId: process.env.ML_APP_ID || '',
    clientSecret: process.env.ML_CLIENT_SECRET || '',
    redirectUri: process.env.ML_REDIRECT_URI || 'http://localhost:3000/api/integrations/ml/callback',
  };
}

/**
 * Generate the Mercado Libre OAuth authorization URL.
 */
export function getAuthUrl(state: string): string {
  const { appId, redirectUri } = getConfig();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: appId,
    redirect_uri: redirectUri,
    state,
  });
  return `${ML_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access + refresh tokens.
 */
export async function exchangeCode(code: string): Promise<MLToken> {
  const { appId, clientSecret, redirectUri } = getConfig();

  const response = await fetch(ML_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: appId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`ML OAuth failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    seller_id: data.user_id?.toString() || '',
  };
}

/**
 * Refresh an expired access token.
 */
export async function refreshToken(refreshToken: string): Promise<MLToken> {
  const { appId, clientSecret } = getConfig();

  const response = await fetch(ML_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: appId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`ML token refresh failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken,
    expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    seller_id: data.user_id?.toString() || '',
  };
}

/**
 * Get a valid access token for a user, refreshing if necessary.
 */
export async function getValidToken(userId: string): Promise<string> {
  const db = getDb();
  const integration = db
    .query('SELECT * FROM integrations WHERE user_id = ? AND platform = ?')
    .get(userId, 'mercado_libre') as any;

  if (!integration) {
    throw new Error('Mercado Libre not connected');
  }

  // Check if token is expired (with 5 min buffer)
  const expiresAt = new Date(integration.expires_at).getTime();
  const isExpired = Date.now() > expiresAt - 5 * 60 * 1000;

  if (isExpired) {
    const tokens = await refreshToken(integration.refresh_token);
    db.run(
      `UPDATE integrations SET access_token = ?, refresh_token = ?, expires_at = ?, updated_at = datetime('now')
       WHERE id = ?`,
      [tokens.access_token, tokens.refresh_token, tokens.expires_at, integration.id]
    );
    return tokens.access_token;
  }

  return integration.access_token;
}

/**
 * Create a listing on Mercado Libre.
 */
export async function createListing(
  userId: string,
  listingData: {
    title: string;
    description: string;
    categoryId: string;
    price: number;
    currency: string;
    condition: string;
    images: string[];
    attributes: Record<string, string>;
  }
): Promise<string> {
  const token = await getValidToken(userId);

  const body = {
    title: listingData.title,
    category_id: listingData.categoryId,
    price: listingData.price,
    currency_id: listingData.currency || 'MXN',
    condition: listingData.condition || 'new',
    available_quantity: 1,
    buying_mode: 'buy_it_now',
    listing_type_id: 'gold_special',
    pictures: listingData.images.map((url) => ({ source: url })),
    attributes: Object.entries(listingData.attributes).map(([name, value]) => ({
      id: name,
      name,
      value_name: value,
    })),
    description: { plain_text: listingData.description },
  };

  const response = await fetch(`${ML_API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ML create listing failed: ${err}`);
  }

  const data = await response.json();
  return data.id; // ML listing ID
}
