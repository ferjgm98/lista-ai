# ListaAI Architecture

## Overview

```
Client (React SPA)
    │
    ▼
Hono API Server (Bun)
    │
    ├── Auth Middleware (JWT)
    ├── Rate Limiter
    │
    ├── /api/listings ──────────▶ AI Service ──▶ OpenAI / Claude
    ├── /api/images  ──────────▶ Image Service ──▶ Replicate
    ├── /api/integrations/ml ──▶ ML Service ──▶ Mercado Libre API
    └── /api/billing ──────────▶ Stripe API
                │
                ▼
           SQLite (Bun:sqlite)
```

## Directory Structure

```
src/
├── index.ts              # Entry point
├── app.ts                # Hono server setup + routes
├── config.ts             # Env vars & configuration
├── middleware/
│   ├── auth.ts           # JWT verification
│   ├── rate-limit.ts     # Rate limiting per user/tier
│   └── error.ts          # Global error handler
├── routes/
│   ├── auth.ts           # Register, login, refresh
│   ├── listings.ts       # CRUD + generate + publish
│   ├── images.ts         # Image upload + processing
│   ├── integrations.ts   # ML OAuth connect/disconnect
│   └── billing.ts        # Plans, subscriptions
├── services/
│   ├── ai.ts             # GPT-4o/Claude integration
│   ├── images.ts         # Remove.bg / Replicate processing
│   ├── mercado-libre.ts  # ML API client
│   ├── listing-generator.ts  # Orchestrates listing creation
│   └── stripe.ts         # Payment processing
├── lib/
│   ├── templates.ts      # Prompt templates per language/category
│   ├── ml-keywords.ts    # ML keyword research
│   └── errors.ts         # Custom error types
├── db/
│   ├── schema.ts         # CREATE TABLE statements
│   └── index.ts          # Database client + migrations
└── types/
    └── index.ts          # TypeScript types

web/
└── app/                  # React SPA (Vite)
    ├── pages/
    │   ├── Dashboard.tsx
    │   ├── NewListing.tsx
    │   ├── ListingPreview.tsx
    │   ├── Settings.tsx
    │   └── Login.tsx
    ├── components/
    │   ├── ImageUploader.tsx
    │   ├── ListingCard.tsx
    │   └── PricingTable.tsx
    ├── hooks/
    │   └── useApi.ts
    └── App.tsx

tests/
├── services/
│   └── listing-generator.test.ts
└── routes/
    └── listings.test.ts
```

## Data Flow: Listing Generation

```
1. User uploads images + optional product info
2. Images stored temporarily (memory / local filesystem)
3. Images sent to image processing service (bg removal, enhance)
4. Product info + processed images sent to AI service
5. AI returns: title, description, category, keywords, attributes
6. All data saved to `listings` table as "draft"
7. User can review/edit in dashboard
8. On "publish": listing posted to Mercado Libre via API
9. Status updated to "published" with ML listing ID
```

## Mercado Libre OAuth Flow

```
1. User clicks "Connect Mercado Libre"
2. Redirect to:
   https://auth.mercadolibre.com/authorization
   ?response_type=code
   &client_id={APP_ID}
   &redirect_uri={CALLBACK_URL}
3. User authorizes → ML redirects to CALLBACK_URL with ?code=
4. Server exchanges code for access_token + refresh_token
5. Tokens stored encrypted in integrations table
6. On API calls: use access_token, refresh if 401
```

## Environment Variables

```env
# App
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-here
APP_URL=http://localhost:3000

# AI
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Mercado Libre
ML_APP_ID=your-app-id
ML_CLIENT_SECRET=your-client-secret
ML_REDIRECT_URI=http://localhost:3000/api/integrations/ml/callback

# Images
REPLICATE_API_KEY=r8_...

# Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# Database
DATABASE_PATH=./data/lista-ai.db
```
