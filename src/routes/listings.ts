import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getDb, uid } from '../db';
import { generateListing } from '../services/listing-generator';
import { createListing as publishToML, getValidToken } from '../services/mercado-libre';

const listings = new Hono();

const generateSchema = z.object({
  images: z.array(z.string()).max(10).default([]),
  product: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    currency: z.string().default('MXN'),
    brand: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
    size: z.string().optional(),
    material: z.string().optional(),
    weight: z.number().positive().optional(),
    condition: z.string().default('new'),
    notes: z.string().optional(),
    category_hint: z.string().optional(),
    tone: z.enum(['professional', 'casual', 'luxury']).default('professional'),
  }),
});

// Generate a new listing
listings.post('/generate', async (c) => {
  const payload = c.get('jwtPayload');
  const body = await c.req.json();

  try {
    const result = await generateListing({
      images: body.images || [],
      product: body.product || {},
      userId: payload.sub,
      locale: body.locale || 'es-MX',
    });

    return c.json({ success: true, data: result });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 400);
  }
});

// List user's listings
listings.get('/', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();

  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = (page - 1) * limit;

  const rows = db
    .query(
      `SELECT * FROM listings WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(payload.sub, limit, offset) as any[];

  const total = db
    .query('SELECT COUNT(*) as count FROM listings WHERE user_id = ?')
    .get(payload.sub) as any;

  return c.json({
    success: true,
    data: {
      listings: rows.map(parseListing),
      total: total.count,
      page,
      limit,
    },
  });
});

// Get single listing
listings.get('/:id', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();
  const id = c.req.param('id');

  const row = db
    .query('SELECT * FROM listings WHERE id = ? AND user_id = ?')
    .get(id, payload.sub) as any;

  if (!row) {
    return c.json({ success: false, error: 'Listing not found' }, 404);
  }

  return c.json({ success: true, data: parseListing(row) });
});

// Update listing
listings.put('/:id', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();
  const id = c.req.param('id');
  const body = await c.req.json();

  const existing = db
    .query('SELECT id FROM listings WHERE id = ? AND user_id = ?')
    .get(id, payload.sub);
  if (!existing) {
    return c.json({ success: false, error: 'Listing not found' }, 404);
  }

  const updates: string[] = [];
  const params: any[] = [];

  for (const field of ['title', 'short_description', 'long_description', 'category_id', 'category_name']) {
    if (body[field] !== undefined) {
      updates.push(`${field} = ?`);
      params.push(body[field]);
    }
  }

  if (body.attributes) {
    updates.push('attributes = ?');
    params.push(JSON.stringify(body.attributes));
  }
  if (body.keywords) {
    updates.push('keywords = ?');
    params.push(JSON.stringify(body.keywords));
  }

  if (updates.length > 0) {
    updates.push("updated_at = datetime('now')");
    params.push(id);
    db.run(`UPDATE listings SET ${updates.join(', ')} WHERE id = ?`, params);
  }

  const updated = db.query('SELECT * FROM listings WHERE id = ?').get(id) as any;
  return c.json({ success: true, data: parseListing(updated) });
});

// Delete listing
listings.delete('/:id', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();
  const id = c.req.param('id');

  db.run('DELETE FROM listings WHERE id = ? AND user_id = ?', [id, payload.sub]);
  return c.json({ success: true, data: null });
});

// Publish to Mercado Libre
listings.post('/:id/publish', async (c) => {
  const payload = c.get('jwtPayload');
  const db = getDb();
  const id = c.req.param('id');

  const listing = db
    .query('SELECT * FROM listings WHERE id = ? AND user_id = ?')
    .get(id, payload.sub) as any;

  if (!listing) {
    return c.json({ success: false, error: 'Listing not found' }, 404);
  }

  try {
    const mlId = await publishToML(payload.sub, {
      title: listing.title,
      description: listing.long_description || listing.short_description,
      categoryId: listing.category_id,
      price: 0, // user should set this
      currency: 'MXN',
      condition: 'new',
      images: JSON.parse(listing.processed_images || '[]'),
      attributes: JSON.parse(listing.attributes || '{}'),
    });

    db.run(
      "UPDATE listings SET status = 'published', ml_listing_id = ?, updated_at = datetime('now') WHERE id = ?",
      [mlId, id]
    );

    return c.json({ success: true, data: { ml_listing_id: mlId } });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

function parseListing(row: any) {
  return {
    ...row,
    attributes: JSON.parse(row.attributes || '{}'),
    keywords: JSON.parse(row.keywords || '[]'),
    original_images: JSON.parse(row.original_images || '[]'),
    processed_images: JSON.parse(row.processed_images || '[]'),
    metadata: JSON.parse(row.metadata || '{}'),
  };
}

export default listings;
