# ListaAI — Product Specification

> AI-powered product listing content for Mercado Libre sellers.
> Generate optimized titles, descriptions, and images in Spanish and Portuguese.

**Version:** 1.0
**Status:** Draft
**Author:** Fer (ferjgm98)

---

## 1. Executive Summary

**ListaAI** is a SaaS tool that helps Mercado Libre sellers generate professional, search-optimized product listings using AI. Sellers upload product photos and basic info — ListaAI generates optimized titles, descriptions, category suggestions, and enhanced product images.

**Target Market:** 5-7M Mercado Libre sellers across 18 LATAM countries
**Primary Markets:** Brazil (55% of ML GMV) → Mexico (25%) → Argentina (10%) → Colombia
**Revenue Model:** Monthly subscription ($9/$19/$29 tiers)
**MVP Build Time:** ~3 weeks using Bun + React + GPT-4o/Claude

### 1.1 Value Proposition

> "Upload your product photos. Get professional, search-optimized listings ready to publish on Mercado Libre. In Spanish or Portuguese."

For the 5M+ sellers on Mercado Libre who are product experts but not marketing professionals — ListaAI turns raw product photos into complete, high-converting listings in minutes instead of hours.

### 1.2 Key Metrics Targets

| Metric | Target (Year 1) |
|--------|----------------|
| Active users | 1,000 |
| Paying users | 200 (20% conversion) |
| Monthly revenue | $4,000-6,000 |
| Churn rate | <8% monthly |
| NPS | 40+ |

---

## 2. Market Analysis

### 2.1 E-commerce in LATAM

| Metric | Value |
|--------|-------|
| LATAM e-commerce market (2025) | ~$160B |
| Projected (2026) | $190-200B |
| YoY growth | 25-30% (fastest globally) |
| Digital shoppers | 300M+ |
| Smartphone-first | 70%+ of transactions on mobile |

### 2.2 Mercado Libre Dominance

| Metric | Value |
|--------|-------|
| GMV (2025) | $56B |
| Revenue (2025) | $22.5B (50% YoY growth) |
| Active users | 80M+ |
| Total sellers | 5-7M |
| Professional sellers | 1-2M |
| Items sold (2025) | 1.5B+ |
| Countries | 18 |
| Brazil share | 55% of GMV |
| Mexico share | 25% |
| Argentina share | 10% |

### 2.3 Seller Economics

- Average seller: 50-200 products listed
- Top sellers: 500-10,000+ SKUs
- Commission: 8-16% per sale + listing fees
- Listing quality directly impacts ML search ranking and conversion
- Most sellers are NOT professional marketers

A seller with 100 orders/month at $25 avg = $2,500 in sales = $200-400 in ML fees. Paying $9-29/mo for better listings is trivial in comparison.

---

## 3. Competitive Landscape

### 3.1 Competitors

**Global AI Content Tools** (not LATAM-focused, English-first)
- **Jasper AI** — $100M+ ARR — general marketing content
- **Copy.ai** — $50M+ ARR — marketing copy
- **Writesonic** — $30M+ ARR — general content

→ These are too expensive ($39-69/mo), English-only, not optimized for product listings or ML's search algorithm.

**AI E-commerce Image Tools**
- **Photoroom** — $4MM+ MRR ($48M+ ARR) — AI product photography
  - 300M+ downloads, $43M from YC + Balderton
  - Started in emerging markets (Thailand, Brazil)
  - **CONFIRMS:** E-commerce sellers WILL pay for AI content tools
  - **BUT:** Image-only — no title/description/SEO generation

**E-commerce Listing Tools** (Amazon-focused, US-centric)
- **SellerApp** — Amazon keyword research & analytics
- **Helium10** — Amazon seller toolkit ($79/mo+)
- **Jungle Scout** — Amazon product research

→ None support Mercado Libre's search algorithm or LATAM marketplaces.

**LATAM-Specific Tools** (ERP/inventory focused)
- **MeliTools.br** (Brazil) — ML listing management, no AI content
- **Likui** — ML seller automation, mostly pricing/inventory
- **TinyERP/Bling** — Brazilian ERP with ML integration
- **BigSeller** — Multi-channel listing, SEA-based

→ None offer AI-powered title + description + image generation optimized for ML's algorithm.

### 3.2 Gap Analysis

| Feature | Competitors | ListaAI |
|---------|-------------|---------|
| AI product titles | ❌ None do this | ✅ ML-optimized titles |
| AI descriptions | ❌ None do this | ✅ SEO descriptions in SP/PT |
| AI image enhancement | ✅ Photoroom | ✅ (integrated) |
| ML search optimization | ❌ | ✅ |
| Spanish + Portuguese native | ❌ | ✅ |
| Batch/bulk processing | ❌ | ✅ |
| Mobile + WhatsApp workflow | ❌ | ✅ |
| Multi-marketplace | ❌ | ✅ (v2) |

### 3.3 Defensible Moat

1. **ML Algorithm Expertise** — Mercado Libre has a proprietary search ranking algorithm. Tweaking titles and descriptions for ML's specific ranking factors is non-trivial value.

2. **Spanish + Portuguese Native** — Generic AI models produce poor Spanish/PT copy. Regional variations matter (Mexican vs Argentine slang, Brazilian PT formulas). This is a real moat.

3. **Mobile-first + WhatsApp Workflow** — LATAM sellers manage stores from their phones. "Send photos via WhatsApp → receive listings back" is radically different from desktop-first tools.

4. **Marketplace-Specific Knowledge** — Understanding ML's category taxonomy, attribute requirements, and listing policies across 18 countries and 2 languages is the moat that compounds over time.

---

## 4. Product Definition

### 4.1 Core Features

**F-01: AI Listing Generation**
- Input: 1-5 product photos + optional bullet points (color, size, material, price)
- Output: Optimized title, short description, long SEO description, category suggestion, key attributes
- Supports: All ML product categories
- Languages: Spanish (regional variants), Portuguese (Brazil)

**F-02: Image Enhancement**
- Background removal and replacement
- Lighting/color correction
- Smart cropping and resizing for ML's required formats
- Batch processing (up to 50 images)

**F-03: Mercado Libre Integration**
- Direct publish to Mercado Libre via API
- Draft saving for manual review
- CSV import/export for bulk operations
- Listing analytics (view counts, impressions)

**F-04: Keyword Optimization**
- ML search term analysis for high-CTR keywords
- Title keyword density recommendations
- Category-specific keyword libraries

**F-05: Batch & Bulk Operations**
- CSV upload with product data → generate all listings at once
- API endpoint for agency/ERP integration
- Webhook notifications on completion

### 4.2 Feature Priority (MVP → v2)

| Feature | Phase | Effort | Impact |
|---------|-------|--------|--------|
| F-01: AI Listing Generation | MVP | 1 week | 🔥 Critical |
| F-02: Image Enhancement | MVP | 3 days | 🔥 Critical |
| F-03: ML Integration (publish) | MVP | 2 days | 🔥 Critical |
| F-04: Keyword Optimization | v1.1 | 3 days | High |
| CSV Import/Export | v1.1 | 1 day | High |
| Batch Processing | v1.2 | 2 days | High |
| Analytics Dashboard | v1.2 | 3 days | Medium |
| WhatsApp Integration | v2.0 | 1 week | Strategic |
| Multi-marketplace (Shopify, Amazon) | v2.0 | 2 weeks | Growth |

### 4.3 User Personas

**Persona 1: "María" — Boutique Owner**
- Age: 32, Mexico City
- Sells: Handmade jewelry on Mercado Libre
- SKUs: 80 products
- Pain: Spends 2+ hours per listing writing descriptions
- Value prop: "Upload photos, get a pro description in 30 seconds"

**Persona 2: "Carlos" — Electronics Reseller**
- Age: 28, São Paulo
- Sells: Phone accessories, imports from China
- SKUs: 400+ products
- Pain: Products all look similar, needs differentiation
- Value prop: "Batch-generate unique descriptions for 100 products at once"

**Persona 3: "Ana & Luis" — Clothing Brand**
- Age: 35/38, Buenos Aires
- Sells: Original clothing line on ML + Shopify
- SKUs: 200+ seasonal products
- Pain: Needs consistent brand voice across listings
- Value prop: "Set your brand tone, generate consistent listings"

---

## 5. Technical Architecture

### 5.1 Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Backend | Bun + Hono | Fast, simple, fits Fer's stack |
| Frontend | React 19 (Vite) | Familiar, fast, simple dashboard |
| Database | SQLite (Bun:sqlite) | Zero ops, perfect for MVP |
| Auth | JWT + session tokens | Simple, stateless |
| AI | GPT-4o / Claude Sonnet 4 | Best price/quality for content |
| Images | Replicate / Stability AI | Background removal + enhancement |
| Payments | Stripe | Standard, ML support |
| Hosting | Vercel + Cloudflare | Fer's existing infra |
| ML API | Mercado Libre API v4 | Official seller integration |

### 5.2 Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│  Hono API (Bun) │────▶│   SQLite DB     │
│  (Dashboard)    │     │  /api/*         │     │  (users, lists)   │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │ OpenAI   │ │ Replicate│ │ ML API   │
              │ GPT-4o   │ │ Images   │ │ v4       │
              └──────────┘ └──────────┘ └──────────┘
```

### 5.3 Data Model

```sql
-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password_hash TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK(plan IN ('free','starter','pro','enterprise')),
  credits_remaining INTEGER DEFAULT 10,
  credits_reset_at TEXT, -- ISO 8601
  locale TEXT DEFAULT 'es-MX', -- es-MX, es-AR, pt-BR
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Listings (generated content)
CREATE TABLE listings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT, -- Generated title
  short_description TEXT, -- 50-100 char description
  long_description TEXT, -- SEO-optimized long description
  category_id TEXT, -- ML category suggestion
  category_name TEXT,
  attributes TEXT, -- JSON: key-value attributes
  keywords TEXT, -- JSON: suggested keywords
  original_images TEXT, -- JSON: array of original image URLs
  processed_images TEXT, -- JSON: array of processed image URLs
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
  ml_listing_id TEXT, -- ML listing ID if published
  language TEXT DEFAULT 'es',
  metadata TEXT, -- JSON: generation params, model used
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Products (raw input data)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT, -- Original product name
  price REAL,
  currency TEXT DEFAULT 'MXN',
  brand TEXT,
  model TEXT,
  color TEXT,
  size TEXT,
  material TEXT,
  weight REAL,
  condition TEXT DEFAULT 'new',
  notes TEXT, -- User's bullet points about the product
  created_at TEXT DEFAULT (datetime('now'))
);

-- Generation log (for analytics + billing)
CREATE TABLE generations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  type TEXT CHECK(type IN ('listing','image','keyword','batch')),
  model TEXT, -- AI model used
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_cents REAL,
  duration_ms INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ML integration tokens
CREATE TABLE integrations (
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
```

### 5.4 API Endpoints

```
POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login
POST   /api/auth/refresh         # Refresh token

POST   /api/listings/generate    # Generate listing from product data + images
POST   /api/listings/batch       # Batch generate listings from CSV
GET    /api/listings/:id         # Get listing details
PUT    /api/listings/:id         # Edit listing
DELETE /api/listings/:id         # Delete listing
POST   /api/listings/:id/publish # Publish to Mercado Libre
GET    /api/listings             # List user's listings

POST   /api/images/process       # Process images (bg removal, enhance)
POST   /api/images/batch         # Batch process images

POST   /api/integrations/ml      # Connect Mercado Libre account
DELETE /api/integrations/ml      # Disconnect ML account

GET    /api/usage                # Current usage stats
GET    /api/plans                # Available plans
POST   /api/subscription         # Create/update subscription
```

### 5.5 Mercado Libre API Integration

**Required ML API Endpoints:**
- `POST /items` — Create a listing
- `PUT /items/:id` — Update listing
- `GET /categories/:id` — Category attributes
- `POST /pictures` — Upload images
- `GET /users/me` — Seller info

**Auth Flow:**
1. User clicks "Connect Mercado Libre"
2. OAuth redirect to ML auth page
3. User grants permissions
4. Callback receives `code` → exchange for `access_token` + `refresh_token`
5. Store tokens encrypted in `integrations` table
6. Refresh flow: when 401, use `refresh_token` to get new `access_token`

---

## 6. AI Content Generation

### 6.1 Listing Generation Prompt Architecture

**System Prompt (per language):**

```
You are an expert Mercado Libre listing copywriter who specializes in creating 
high-converting, SEO-optimized product listings. You know Mercado Libre's search 
ranking algorithm and the specific keywords, title structures, and description 
formats that rank well for each product category.

Rules:
- Write in {language} using {regional_variant} dialect
- Titles must be 60-80 characters, include key product attributes and search terms
- Short descriptions: 50-100 characters, highlight unique value proposition
- Long descriptions: 300-500 characters, SEO-optimized, include features/benefits/specs
- Include relevant keywords naturally (don't stuff)
- Suggest the correct Mercado Libre category
- Extract attributes from images (color, material, size, shape, style)
```

**Input Structure (JSON sent to AI):**
```json
{
  "product_name": "[user provided or AI-extracted]",
  "price": 299.99,
  "currency": "MXN",
  "category_hint": "[optional user selection]",
  "attributes": {
    "brand": "Nike",
    "color": "black",
    "material": "leather",
    "size": "medium",
    "condition": "new"
  },
  "user_notes": "Perfect for daily use, waterproof, comes with warranty",
  "language": "es-MX",
  "tone": "professional"  // professional, casual, luxury
}
```

**Output Structure (AI response):**
```json
{
  "title": "Zapatos Nike Air Max 90 Originales - Negro Cuero - Cómodos y Duraderos",
  "short_description": "Zapatos Nike Air Max 90 originales en cuero negro. Cómodos, duraderos y perfectos para uso diario. ¡Envío gratis!",
  "long_description": "Experimenta la comodidad y el estilo con los Nike Air Max 90... [300-500 chars]",
  "category_id": "MLM-12345",
  "category_name": "Zapatos > Deportivos > Running",
  "keywords": ["nike air max 90", "zapatos deportivos", "cuero negro", "cómodos"],
  "attributes": {
    "brand": "Nike",
    "color": "Negro",
    "material": "Cuero",
    "size": "Mediano",
    "condition": "Nuevo"
  }
}
```

### 6.2 Image Processing Pipeline

1. **Background Removal** — AI model detects and removes background
2. **Color Correction** — Auto white balance, exposure adjustment
3. **Smart Crop** — Detect product boundaries, crop to recommended ML aspect ratio
4. **Background Replacement** — Add clean white/gradient background, or suggested contextual background per category
5. **Batch Processing** — Queue system for 50+ images

### 6.3 Model Selection

| Task | Model | Cost | Quality |
|------|-------|------|---------|
| Text generation | GPT-4o / Claude Sonnet 4 | ~$0.01/listing | Excellent |
| Image processing | Replicate / Stability AI | ~$0.005/image | Good |
| Image enhancement | Photoroom API (future) | ~$0.01/image | Best |
| Keyword analysis | GPT-4o-mini | ~$0.001/query | Good enough |

---

## 7. Pricing & Business Model

### 7.1 Subscription Tiers

| Feature | Free | Starter ($9/mo) | Pro ($19/mo) | Enterprise (Custom) |
|---------|------|-----------------|--------------|---------------------|
| AI listings/mo | 10 | 100 | Unlimited | Unlimited |
| Image enhancements | 10 | 100 | 500 | Custom |
| ML direct publish | ❌ | ✅ | ✅ | ✅ |
| Batch CSV import | ❌ | ❌ | ✅ | ✅ |
| Keyword optimization | ❌ | ✅ | ✅ | ✅ |
| Analytics | ❌ | Basic | Advanced | Custom |
| API access | ❌ | ❌ | ✅ | ✅ |
| Team seats | 1 | 1 | 3 | Unlimited |
| Support | Email | Email | Priority | Dedicated |

### 7.2 Unit Economics

| Metric | Value |
|--------|-------|
| Cost per AI generation | ~$0.012 (GPT-4o, 500 tokens in/out) |
| Cost per image processed | ~$0.005 (Replicate) |
| Total cost per listing (text + 3 images) | ~$0.027 |
| Revenue per Pro user (unlimited, avg 50/mo) | $19/mo |
| Gross margin per Pro user | ~92% |
| Breakeven (100 paying users) | 100 × $14 avg = $1,400/mo |
| Breakeven timeline | ~2-3 months at target growth |

### 7.3 Revenue Projection

| Month | Free Users | Paid Users | Revenue | COGS | Gross Profit |
|-------|-----------|------------|---------|------|-------------|
| 1 | 50 | 5 | $75 | $5 | $70 |
| 3 | 300 | 40 | $600 | $30 | $570 |
| 6 | 1,000 | 120 | $1,800 | $90 | $1,710 |
| 12 | 5,000 | 200 | $4,000 | $200 | $3,800 |

---

## 8. Go-to-Market Strategy

### 8.1 Distribution Channels

**Primary: YouTube Spanish Tutorials**
- "Cómo crear listings profesionales en Mercado Libre con IA"
- "5 errores en tus títulos que matan tus ventas"
- "De 0 a listing profesional en 30 segundos con AI"
- Format: Before/after comparisons, real-time demos

**Secondary: WhatsApp Seller Groups**
- "Grupos de vendedores de Mercado Libre" — there are hundreds of these
- Share tips, before/after examples, special offers
- Viral within communities

**Tertiary: Facebook Groups + TikTok**
- Short-form demos showing the magic moment (photo → professional listing)
- Mercado Libre seller communities on Facebook

### 8.2 Content Marketing

- **Blog posts (Spanish):** "La guía definitiva para optimizar tus listings en Mercado Libre"
- **Free templates:** CSV templates for bulk listing uploads
- **Email course:** "5 días para mejorar tus listings" (lead gen)
- **YouTube series:** Weekly tips for ML sellers

### 8.3 Launch Strategy

**Phase 1 (MVP launch):**
- Post in 5-10 WhatsApp seller groups
- Create 3 YouTube videos demonstrating the tool
- Offer "lifetime at launch price" $49 (vs $19/mo) for first 50 users

**Phase 2 (growth, month 2-3):**
- Partner with 3-5 accounting/tax firms that serve ML sellers
- Facebook ads targeting "vendedor Mercado Libre" in Mexico + Brazil
- SEO blog content for long-tail Spanish keywords

**Phase 3 (scale, month 4+):**
- Mercado Libre app marketplace integration
- Affiliate program for power users
- Portuguese localization for Brazil push

---

## 9. MVP Scope (Week 1-3)

### Week 1: Core Engine

**Days 1-2: Project setup + Database**
- [ ] Bun + Hono project scaffold
- [ ] SQLite schema (users, listings, products, integrations)
- [ ] Auth routes (register, login, JWT)
- [ ] Basic React frontend scaffold

**Days 3-5: AI Listing Generation**
- [ ] GPT-4o integration for text generation
- [ ] Image upload endpoint
- [ ] Image processing pipeline (background removal + enhancement)
- [ ] Listing generation endpoint (combine AI text + images)
- [ ] Spanish prompt templates (es-MX, es-AR)
- [ ] Portuguese prompt templates (pt-BR)

### Week 2: Mercado Libre Integration

**Days 6-7: ML OAuth + Publishing**
- [ ] Mercado Libre OAuth flow
- [ ] Token management (store, refresh)
- [ ] Create listing on ML via API
- [ ] Image upload to ML

**Days 8-9: Dashboard UI**
- [ ] User dashboard (listings list)
- [ ] Listing creation form
- [ ] Listing preview/edit
- [ ] Integration settings page

**Day 10: Testing & Polish**
- [ ] End-to-end listing flow test
- [ ] Error handling for ML API limits
- [ ] Mobile-responsive dashboard

### Week 3: Payments & Launch Prep

**Days 11-12: Payments**
- [ ] Stripe subscription integration
- [ ] Usage tracking and limits
- [ ] Plan management UI

**Days 13-14: Launch Prep**
- [ ] Landing page (value prop + demo GIF)
- [ ] Onboarding flow (first listing tutorial)
- [ ] Analytics (Plausible or simple custom)
- [ ] Brazilian Portuguese locale

**Day 15: Soft Launch**
- [ ] Deploy to Vercel + Cloudflare
- [ ] Marketing materials ready
- [ ] Launch in WhatsApp groups

---

## 10. Roadmap

### v1.0 — MVP (Week 3)
- Core listing generation
- ML integration (publish)
- Free + Starter + Pro tiers
- Spanish + Portuguese

### v1.1 — Enhancement (Week 5-6)
- Keyword optimization
- CSV import/export
- Listing analytics (views, impressions)
- Portuguese improvements

### v1.2 — Power User (Week 8-9)
- Batch processing (50+ listings at once)
- Brand voice profiles
- A/B title testing
- API for agencies

### v2.0 — Platform (Month 3+)
- WhatsApp integration (send photo → get listing)
- Shopify integration
- Amazon Mexico integration
- Mobile app (React Native / PWA)
- Team accounts

---

## 11. Technical Notes & Risks

### 11.1 Mercado Libre API Constraints
- Rate limit: 30 requests/min per token
- Image max: 10 images per listing, 10MB each
- Category taxonomy: 18 countries × ~3,000 categories each
- OAuth tokens expire after 6 hours → must implement refresh flow

### 11.2 AI Risks
- Hallucination risk: AI may invent product specifications
  → Mitigation: Always show AI output for human review before publishing
- Cost risk: Heavy users could consume >$5/mo in AI costs on Pro plan
  → Mitigation: Cap at 500 listings/mo on Pro, monitor avg usage

### 11.3 Competition Risks
- Mercado Libre could launch built-in AI listing tools
  → Mitigation: Focus on multi-platform (Shopify, Amazon) so we're not ML-dependent
- Photoroom could add text generation
  → Mitigation: Move fast, build brand+community moat before they do

### 11.4 Compliance
- Data privacy: User product data is customer property
- Mercado Libre ToS: Listing automation is permitted via their API
- Payment: Stripe handles all PCI compliance

---

## 12. Success Metrics

### 12.1 North Star Metric
**Listings published per week** — measures real value delivered to sellers.

### 12.2 Leading Indicators
- Signups (daily)
- Free → Paid conversion rate (>20% target)
- Listings generated per user (week 1 vs week 4)
- Time from signup to first listing published

### 12.3 Health Metrics
- AI generation success rate (>98%)
- ML API error rate (<2%)
- Average response time (<3 seconds per listing)
- Monthly churn (<8%)

---

*This spec is a living document. Update as we learn from real users.*
