import { Database } from 'bun:sqlite';

const DB_PATH = process.env.DATABASE_PATH || './data/lista-ai.db';

let db: Database | null = null;

export function getDb(): Database {
  if (!db) {
    db = new Database(DB_PATH, { create: true });
    db.exec('PRAGMA journal_mode=WAL');
    db.exec('PRAGMA foreign_keys=ON');
    runMigrations(db);
  }
  return db;
}

function runMigrations(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT NOT NULL,
      plan TEXT DEFAULT 'free' CHECK(plan IN ('free','starter','pro','enterprise')),
      credits_remaining INTEGER DEFAULT 10,
      credits_reset_at TEXT,
      locale TEXT DEFAULT 'es-MX',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      title TEXT,
      short_description TEXT,
      long_description TEXT,
      category_id TEXT,
      category_name TEXT,
      attributes TEXT DEFAULT '{}',
      keywords TEXT DEFAULT '[]',
      original_images TEXT DEFAULT '[]',
      processed_images TEXT DEFAULT '[]',
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
      ml_listing_id TEXT,
      language TEXT DEFAULT 'es-MX',
      metadata TEXT DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      name TEXT,
      price REAL,
      currency TEXT DEFAULT 'MXN',
      brand TEXT,
      model TEXT,
      color TEXT,
      size TEXT,
      material TEXT,
      weight REAL,
      condition TEXT DEFAULT 'new',
      notes TEXT,
      listing_id TEXT REFERENCES listings(id),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS generations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      type TEXT CHECK(type IN ('listing','image','keyword','batch')),
      model TEXT,
      input_tokens INTEGER,
      output_tokens INTEGER,
      cost_cents REAL,
      duration_ms INTEGER,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS integrations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      platform TEXT DEFAULT 'mercado_libre',
      access_token TEXT,
      refresh_token TEXT,
      expires_at TEXT,
      seller_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
    CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
    CREATE INDEX IF NOT EXISTS idx_generations_user ON generations(user_id);
    CREATE INDEX IF NOT EXISTS idx_integrations_user ON integrations(user_id);
  `);
}

// Helper: generate short UUID
export function uid(): string {
  return crypto.randomUUID().slice(0, 8);
}
