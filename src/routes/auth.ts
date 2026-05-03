import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getDb, uid } from '../db';
import { sign, verify } from 'hono/jwt';

const auth = new Hono();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  locale: z.enum(['es-MX', 'es-AR', 'es-CO', 'pt-BR']).default('es-MX'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name, locale } = c.req.valid('json');
  const db = getDb();

  // Check if exists
  const existing = db.query('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return c.json({ success: false, error: 'Email already registered' }, 409);
  }

  const id = uid();
  const passwordHash = await Bun.password.hash(password);

  db.run(
    `INSERT INTO users (id, email, name, password_hash, plan, credits_remaining, locale)
     VALUES (?, ?, ?, ?, 'free', 10, ?)`,
    [id, email, name || null, passwordHash, locale]
  );

  const token = await sign({ sub: id, email, plan: 'free' }, JWT_SECRET);

  return c.json({
    success: true,
    data: { token, user: { id, email, name, plan: 'free', locale } },
  }, 201);
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const db = getDb();

  const user = db.query('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    return c.json({ success: false, error: 'Invalid credentials' }, 401);
  }

  const valid = await Bun.password.verify(password, user.password_hash);
  if (!valid) {
    return c.json({ success: false, error: 'Invalid credentials' }, 401);
  }

  const token = await sign({ sub: user.id, email: user.email, plan: user.plan }, JWT_SECRET);

  return c.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        locale: user.locale,
        credits_remaining: user.credits_remaining,
      },
    },
  });
});

export default auth;
