# Product Requirements Document — Vitrina

> **Status:** Draft v0.1
> **Author:** Fernando (ferjgm98)
> **Date:** May 3, 2026
> **Working Name:** Vitrina (TBD — also considering Alquimia)
> **Domain:** vitrina.la (available)

---

## 1. Executive Summary

Vitrina is a SaaS tool that helps Mercado Libre sellers generate professional, search-optimized product listings using AI. The user uploads product photos and basic details — Vitrina returns polished titles, descriptions, category recommendations, and enhanced images ready to publish. Built for the 5-7 million sellers across Latin America who are product experts but not copywriters or photographers.

**Core value proposition:** "Upload your product photos. Get professional listings in Spanish or Portuguese. Publish to Mercado Libre in one click. Sell more."

**Tagline candidates:**
- "Tu vitrina, perfecta." (Your showcase, perfect.)
- "Productos que venden solos." (Products that sell themselves.)
- "La vitrina de tus productos, potenciada por IA."

---

## 2. Problem Statement

### 2.1 The User Pain

Mercado Libre dominates Latin American e-commerce with 70%+ market share and 80M+ active users. Its 5-7 million sellers range from boutique owners to electronics resellers to full-time merchants managing thousands of SKUs. These sellers share a common problem: **they are experts in their products, not in product listing copywriting or photography.**

Creating a single listing today means:
1. Taking product photos (often with a phone, in poor lighting, against a messy background)
2. Writing a title that ranks well in ML's search algorithm (60-80 characters, keywords, attributes)
3. Writing a short and long description that converts browsers into buyers
4. Choosing the right category from ML's 3,000+ category taxonomy
5. Formatting images to ML's specifications (aspect ratio, size limits, background)

A typical seller spends **2-4 hours per listing**. With 50-200 products to list, that's hundreds of hours of unskilled, repetitive work — or thousands of dollars hiring freelancers.

### 2.2 Why Existing Solutions Don't Work

| Solution | Problem |
|----------|---------|
| **Generic AI tools (Jasper, Copy.ai)** | English-first, not optimized for product listings or ML's algorithm. Expensive ($39-69/mo). General marketing copy, not listing-specific. |
| **Freelancers / agencies** | Slow, expensive ($5-15 per listing), inconsistent quality, language barriers for Spanish/Portuguese. |
| **ERP/inventory tools (Bling, Tiny, MeliTools)** | Manage inventory and pricing — don't generate content from product photos. |
| **Photoroom** | Excellent image editing, but doesn't generate text titles/descriptions. Image-only. |
| **Manual templates** | Still require filling in each field, no AI assistance. Time-consuming at scale. |

### 2.3 The Opportunity

No tool today combines:
- AI-powered **title + description generation** optimized for ML's search algorithm
- AI **image enhancement** (background removal, color correction, smart cropping)
- **Native Spanish and Portuguese** with regional dialect awareness
- **One-click publish** to Mercado Libre
- **Batch processing** for sellers with 100+ SKUs
- **Mobile-first workflow** that meets LATAM sellers where they are (on their phones)

---

## 3. Target Audience

### 3.1 Primary Personas

**Persona 1: María — Boutique Owner**
- Age: 32, Mexico City
- Sells: Handmade jewelry and accessories on Mercado Libre
- SKUs: ~80 products
- Tech comfort: Uses WhatsApp daily, manages ML from her phone
- Pain: Spends 2+ hours per listing writing descriptions, her photos look amateur
- Quote: *"Quiero que mis productos se vean tan bien como los de las grandes marcas, pero no puedo pagar un fotógrafo."*
- Willing to pay: $9-15/mo

**Persona 2: Carlos — Electronics Reseller**
- Age: 28, São Paulo
- Sells: Phone accessories, imports from China
- SKUs: 400+ products
- Tech comfort: Comfortable with web apps, uses Bling for inventory
- Pain: Products all look identical, needs unique descriptions at scale to differentiate
- Quote: *"Tenho 400 produtos iguais. Preciso de descrições diferentes pra cada um sem gastar horas."*
- Willing to pay: $19-29/mo

**Persona 3: Ana & Luis — Clothing Brand**
- Age: 35/38, Buenos Aires
- Sells: Original clothing line on ML + their own Shopify store
- SKUs: 200+ seasonal products
- Tech comfort: Proficient, uses Shopify admin, understands branding
- Pain: Needs consistent brand voice across all listings, launches new collections monthly
- Quote: *"Cada mes lanzamos 30 prendas nuevas. No podemos escribir 30 descripciones únicas manteniendo la misma voz."*
- Willing to pay: $29-49/mo

**Persona 4: Javier — Agency Owner (v2 target)**
- Age: 40, Bogotá
- Manages: 15 client stores on ML, 3,000+ total SKUs
- Needs: API access, white-label or team accounts, bulk CSV workflows
- Willing to pay: $100-200/mo

### 3.2 Market Sizing

| Segment | Size | Addressable |
|---------|------|-------------|
| Total ML sellers | 5-7M | — |
| Professional sellers (full-time) | 1-2M | Primary market |
| SMB sellers (part-time) | 3-5M | Secondary (v2) |
| Agencies managing multiple stores | ~50K | Enterprise (v2) |
| **TAM (total addressable)** | **1-2M sellers** | $12-60M/mo at $9-29 avg |

---

## 4. Product Vision

### 4.1 Vision Statement

> "Make every Mercado Libre seller a professional listing creator — without learning copywriting, photography, or SEO."

### 4.2 Core Beliefs

1. **AI should do the work, not add more.** The user takes photos and answers 2-3 questions. AI does the rest.
2. **Quality matters more than speed.** A listing created in 30 seconds must look better than one that took 2 hours.
3. **Native language is a moat.** Generic English AI tools can't write convincing Mexican Spanish or Brazilian Portuguese product copy. This is our defensible advantage.
4. **Mobile-first is not optional.** 70%+ of ML transactions happen on mobile. Our sellers manage their stores from phones. We must meet them there.
5. **The listing is the product.** Every output must be publish-ready. No editing required (but editing permitted).

### 4.3 Product Principles

- **Zero prompt engineering required.** The user doesn't "prompt" the AI. They provide product details. We handle the AI.
- **One-click publish.** From "upload photos" to "live on Mercado Libre" in as few clicks as possible.
- **Defaults that work.** Out-of-the-box outputs should be good enough for most sellers. Power users can customize.
- **Batch is the superpower.** Individual listings get people in the door. Batch processing makes them stay.
- **Spanish and Portuguese first, English later.** English content generation is v3 at earliest.

---

## 5. User Stories & Requirements

### 5.1 MVP Requirements (Phase 1 — Launch)

#### Authentication & Onboarding

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| U-01 | As a seller, I want to sign up with my email so I can start using the tool. | P0 | Email + password, no SSO v1 |
| U-02 | As a seller, I want to see a quick tutorial on first login showing me how to create my first listing. | P1 | 3-step interactive walkthrough |
| U-03 | As a seller, I want to connect my Mercado Libre account so I can publish listings directly. | P0 | OAuth flow via ML API |
| U-04 | As a seller, I want to see my remaining credits for the month. | P1 | Dashboard header |

#### Listing Generation

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| L-01 | As a seller, I want to upload 1-5 product photos so the AI can see my product. | P0 | Drag-drop or phone upload |
| L-02 | As a seller, I want to optionally provide basic product info (name, price, brand, color, size, material) so the AI has more context. | P0 | Form fields — all optional |
| L-03 | As a seller, I want the AI to generate a title optimized for ML's search algorithm. | P0 | 60-80 chars, includes keywords + attributes |
| L-04 | As a seller, I want the AI to generate a short description (50-100 chars) for my listing. | P0 | Highlights unique value prop |
| L-05 | As a seller, I want the AI to generate a long SEO-optimized description (300-500 chars). | P0 | Features, benefits, specifications |
| L-06 | As a seller, I want the AI to suggest the best Mercado Libre category for my product. | P0 | From ML's taxonomy |
| L-07 | As a seller, I want the AI to suggest relevant keywords and attributes. | P1 | For search ranking |
| L-08 | As a seller, I want to review and edit the AI-generated content before publishing. | P0 | Editable preview |
| L-09 | As a seller, I want the generation to complete in under 10 seconds. | P1 | Target: 3-5s |
| L-10 | As a seller, I want to regenerate if I don't like the output. | P1 | With option to tweak input |
| L-11 | As a seller, I want my listings to be saved as drafts so I can come back later. | P0 | Auto-save on generation |

#### Image Processing

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| I-01 | As a seller, I want the AI to remove the background from my product photos automatically. | P0 | Clean white or transparent bg |
| I-02 | As a seller, I want the AI to enhance my photos (color, brightness, contrast). | P1 | Auto-correction |
| I-03 | As a seller, I want the images to be cropped to ML's recommended aspect ratio. | P1 | 1:1 or 4:3 depending on category |
| I-04 | As a seller, I want to see a before/after comparison of image enhancements. | P1 | Side-by-side |

#### Publishing

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| P-01 | As a seller, I want to publish my listing to Mercado Libre with one click. | P0 | Via ML API |
| P-02 | As a seller, I want to see the published ML listing URL after successful publish. | P0 | Deep link to ML |
| P-03 | As a seller, I want to see an error message if publishing fails, with guidance. | P0 | e.g. "Missing required attribute: color" |
| P-04 | As a seller, I want to save a listing as CSV for manual upload. | P1 | For sellers who don't want API |

#### Pricing & Limits

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| B-01 | As a seller, I want to use the tool for free (limited listings) to evaluate it. | P0 | 10 free listings/mo |
| B-02 | As a seller, I want to upgrade to a paid plan when I'm ready to create more listings. | P0 | Stripe subscription |
| B-03 | As a seller, I want to see my current plan and usage clearly. | P1 | Dashboard widget |

### 5.2 Phase 2 Requirements (v1.1 — Growth)

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| V2-01 | As a seller, I want CSV import/export for batch generating 100+ listings. | P1 | Core growth feature |
| V2-02 | As a seller, I want to see basic analytics: how many views/impressions my generated listings get vs manual ones. | P1 | Proves value |
| V2-03 | As a seller, I want to set a "brand voice" so all my listings sound consistent. | P2 | Tone, vocabulary, brand story |
| V2-04 | As a user, I want to generate listings in Portuguese (Brazil). | P1 | 55% of ML GMV |
| V2-05 | As a seller, I want to A/B test different titles for the same product. | P2 | Data-driven optimization |
| V2-06 | As a seller, I want an API to integrate with my existing ERP/workflow. | P2 | For Carlos with 400+ SKUs |

### 5.3 Phase 3 Requirements (v2.0 — Scale)

| ID | User Story | Priority | Notes |
|----|-----------|----------|-------|
| V3-01 | As a seller, I want to send photos via WhatsApp and get listings back. | P2 | Mobile-first, LATAM native |
| V3-02 | As a seller, I want to publish to Shopify and Amazon Mexico too. | P2 | Multi-marketplace |
| V3-03 | As an agency, I want team accounts to manage multiple client stores. | P2 | Enterprise use case |
| V3-04 | As a seller, I want a mobile app (PWA or native). | P3 | Most sellers are on phones |

---

## 6. Functional Requirements

### 6.1 AI Content Engine

| Req ID | Requirement | Acceptance Criteria |
|--------|-----------|-------------------|
| AI-01 | Title generation | Output 60-80 chars, includes product name + key attributes + 2-3 search keywords |
| AI-02 | Short description | Output 50-100 chars, highlights unique value, no markdown |
| AI-03 | Long description | Output 300-500 chars, includes features/benefits/specs, no markdown, SEO-optimized (keyword density 2-3%) |
| AI-04 | Category suggestion | Suggest top 3 ML categories with confidence score. Must be valid ML category IDs |
| AI-05 | Keyword generation | Suggest 5-10 search keywords relevant to product, category, and ML's search algorithm |
| AI-06 | Attribute extraction | Extract visible attributes from photos (color, material, shape) + include user-provided attributes |
| AI-07 | Language accuracy | Generated text must be in correct variant (es-MX ≠ es-AR ≠ pt-BR). Slang/dialect must be appropriate |
| AI-08 | No hallucinated specs | AI must not invent specifications not visible or provided. "Material: No especificado" if unknown |
| AI-09 | Regeneration | Same input → different output on regenerate (temperature variance). Must change at least 40% of text |

### 6.2 Image Processing Engine

| Req ID | Requirement | Acceptance Criteria |
|--------|-----------|-------------------|
| IMG-01 | Background removal | Remove background with <2px edge artifacts on 95%+ of product photos |
| IMG-02 | Color correction | Auto white balance + exposure. Output should look natural, not over-processed |
| IMG-03 | Smart crop | Detect product boundaries, apply padding, output ML-recommended aspect ratio |
| IMG-04 | Format compliance | Output JPEG/WebP, max 10MB per ML limits, minimum 500px on longest side |
| IMG-05 | Batch processing | Process up to 50 images in <5 minutes total |

### 6.3 Mercado Libre Integration

| Req ID | Requirement | Acceptance Criteria |
|--------|-----------|-------------------|
| ML-01 | OAuth flow | Complete ML authorization → token exchange → seller info retrieval. Redirect back to app |
| ML-02 | Token management | Auto-refresh tokens before expiry. Store encrypted. Handle 401 by refresh, not crash |
| ML-03 | Listing publish | Create ML listing with title, description, price, category, images, attributes via POST /items |
| ML-04 | Error handling | Return ML API errors to user in Spanish/Portuguese with actionable guidance |
| ML-05 | Rate limiting | Respect ML's 30 req/min limit. Queue requests if needed |

### 6.4 Performance Requirements

| Req ID | Requirement | Target |
|--------|-----------|--------|
| PERF-01 | Listing generation time (text only) | <3 seconds p95 |
| PERF-02 | Listing generation time (text + 3 images) | <10 seconds p95 |
| PERF-03 | Image upload & processing | <5 seconds per image p95 |
| PERF-04 | Page load (dashboard) | <1.5s first paint |
| PERF-05 | ML publish time | <3 seconds (excludes ML processing) |
| PERF-06 | API response time (non-AI endpoints) | <200ms p95 |
| PERF-07 | Uptime SLA | 99.5% (excluding ML API outages) |

### 6.5 Security Requirements

| Req ID | Requirement | Notes |
|--------|-----------|-------|
| SEC-01 | Password hashing | Bun.password.hash (bcrypt) |
| SEC-02 | JWT tokens | 24h expiry, refresh token rotation |
| SEC-03 | ML tokens | Encrypted at rest (AES-256) |
| SEC-04 | Image storage | Temp storage only, deleted after generation. No permanent storage of user images |
| SEC-05 | API rate limiting | 60 req/min per user on free tier, 300 req/min on paid |
| SEC-06 | Data isolation | User A cannot access User B's listings. Enforced in all DB queries |

---

## 7. Success Metrics

### 7.1 North Star Metric

**Listings published per week.** This measures the core value delivered: sellers are creating and publishing real content that drives sales. Everything else leads here.

### 7.2 Key Performance Indicators

| Category | Metric | Target (Month 3) | Target (Month 12) |
|----------|--------|-----------------|-------------------|
| **Acquisition** | New signups/week | 50 | 500 |
| **Activation** | % who generate first listing within 24h of signup | 60% | 70% |
| **Conversion** | Free → Paid conversion rate | 15% | 25% |
| **Retention** | Monthly active users (generated ≥1 listing) | 40% of signups | 50% |
| **Retention** | Monthly churn (paid users) | <10% | <5% |
| **Revenue** | MRR | $1,000 | $8,000 |
| **Engagement** | Avg listings/user in first 30 days | 5 | 10 |
| **Engagement** | Batch users (% of paid who use batch) | 20% | 40% |
| **Quality** | AI gen success rate | >98% | >99% |
| **Quality** | ML publish success rate (first attempt) | >90% | >95% |
| **Satisfaction** | NPS | 30 | 45 |

### 7.3 Health Metrics

| Metric | Red | Yellow | Green |
|--------|-----|--------|-------|
| AI gen time (text) | >5s p95 | 3-5s p95 | <3s p95 |
| Churn rate | >15% monthly | 8-15% | <8% |
| ML API error rate | >5% | 2-5% | <2% |
| Support ticket volume | >50/mo for 200 users | 20-50/mo | <20/mo |

### 7.4 Leading Indicators (What to watch daily)

- **Signups** — Leading indicator for growth
- **First listing generated** — Activation quality
- **Listings generated vs published ratio** — Drop-off point in the funnel
- **Time from signup to first publish** — Friction indicator
- **Free tier usage exhaustion** — Readiness to convert (if they hit 10/10 listings, they're warm)

---

## 8. Competitive Analysis

### 8.1 Direct Competitors

| Competitor | Type | Price | Coverage | AI Content | ML Opt | SP/PT |
|-----------|------|-------|----------|-----------|--------|-------|
| **Jasper** | General AI writing | $39-69/mo | English | ✅ | ❌ | ❌ |
| **Copy.ai** | General AI writing | $49/mo | English | ✅ | ❌ | ❌ |
| **Photoroom** | AI image editing | $9-30/mo | Global | ❌ (images only) | ❌ | ⚠️ (app translated) |
| **SellerApp** | Amazon analytics | $39-199/mo | Amazon | ❌ | ❌ | ❌ |
| **MeliTools** | ML inventory/pricing | Free-$20/mo | LATAM | ❌ | ⚠️ | ✅ |
| **Likui** | ML automation | Unknown | LATAM | ❌ | ⚠️ | ✅ |
| **TinyERP/Bling** | ERP with ML sync | $15-50/mo | Brazil | ❌ | ⚠️ | ✅ |

### 8.2 Positioning

```
                 AI-powered
                     │
                     │
        Vitrina ●────┼────● Jasper / Copy.ai
                     │
    ML-specific ─────┼───── General
                     │
        MeliTools ●──┼────● Photoroom
                     │
                     │
                Manual / Inventory
```

Vitrina sits in the **AI-powered + ML-specific** quadrant — the only player there. The closest competitor would be Jasper integrating with ML (unlikely, they're English-first enterprise), or Photoroom adding text generation (possible, but they'd need Spanish/PT expertise and ML-specific prompt engineering).

### 8.3 Competitive Threats

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|-----------|
| ML builds built-in AI listing tool | Medium | High | Diversify to Shopify/Amazon in v2. Build community moat |
| Photoroom adds text generation | Medium | Medium | Move fast on brand voice, batch, multi-platform |
| Jasper adds ML integration | Low | Low | They're enterprise English-first. Wrong market |

---

## 9. Release Criteria

### 9.1 MVP Launch Checklist

**Functionality:**
- [ ] User can register and log in
- [ ] User can upload 1-5 product photos
- [ ] User can provide optional product info (name, price, brand, color, size, material)
- [ ] AI generates title, short desc, long desc, category suggestion, keywords (<5s)
- [ ] AI enhances images (bg removal + color correction) (<10s for 5 images)
- [ ] User can review, edit, and save draft
- [ ] User can connect Mercado Libre account via OAuth
- [ ] User can publish listing to ML with one click
- [ ] User sees published ML listing URL
- [ ] Free tier limited to 10 listings/mo
- [ ] Stripe subscriptions for Starter ($9) and Pro ($19)
- [ ] Error states: network failure, ML API error, AI timeout — all handled gracefully

**Quality:**
- [ ] AI output quality: blind test with 20 real ML products → 4/5 reviewers prefer Vitrina output over original listings
- [ ] Image quality: bg removal artifact-free on 95%+ of test images
- [ ] Average gen time <5s for text, <10s for text + 3 images
- [ ] All API endpoints return proper errors for invalid input

**Distribution:**
- [ ] 3 YouTube tutorials published in Spanish (before launch)
- [ ] Posted in 5 WhatsApp seller groups
- [ ] Landing page with demo GIF and pricing

### 9.2 Beta Criteria (Pre-Launch Validation)

- [ ] 20 beta testers (recruited from WhatsApp seller groups)
- [ ] Each tester creates ≥3 listings
- [ ] ≥50 total listings published to ML
- [ ] Feedback survey: ≥80% would recommend
- [ ] Identify and fix top 3 friction points

---

## 10. Monetization

### 10.1 Pricing Tiers

| Feature | Free | Starter ($9/mo) | Pro ($19/mo) |
|---------|------|----------------|--------------|
| AI listings | 10/mo | 100/mo | Unlimited |
| Image enhancements | 10/mo | 100/mo | 500/mo |
| ML direct publish | ❌ | ✅ | ✅ |
| Batch CSV import | ❌ | ❌ | ✅ |
| Keyword optimization | ❌ | ✅ | ✅ |
| API access | ❌ | ❌ | ✅ |
| Team seats | 1 | 1 | 3 |
| Support | Email | Email | Priority |

### 10.2 Unit Economics

| Item | Cost |
|------|------|
| AI text generation (GPT-4o) | ~$0.012/listing |
| Image processing (Replicate) | ~$0.005/image |
| Total per listing (text + 3 images) | ~$0.027 |
| Gross margin at $19 Pro (avg 50/mo) | ~92% |
| Breakeven at 100 paid users | ~$1,400/mo revenue |

### 10.3 Revenue Projection

| Month | Free Users | Paid Users | MRR |
|-------|-----------|------------|-----|
| 1 | 50 | 5 | $75 |
| 3 | 300 | 40 | $600 |
| 6 | 1,000 | 120 | $1,800 |
| 12 | 5,000 | 200 | $4,000+ |

---

## 11. Open Questions & Risks

### 11.1 Open Questions

| Question | Decision Needed By | Notes |
|----------|-------------------|-------|
| **Name:** Vitrina or Alquimia? | Before launch | Both domains (.la) available |
| **Brazil first or Mexico first?** | Before content creation | Mexico = easier (Spanish), Brazil = larger (55% of GMV) |
| **Image processing:** Build or buy (Replicate/Remove.bg API)? | Week 1 of build | Buy = faster MVP, Build = better margins |
| **AI model:** GPT-4o or Claude Sonnet 4? | Week 1 | GPT-4o cheaper/faster, Claude better at Spanish |
| **Mobile:** PWA or native app? | Before v2 | PWA = faster, native = better UX |
| **WhatsApp integration:** Priority or v2? | After beta feedback | High demand signal = pull forward |

### 11.2 Key Risks

| Risk | Probability | Impact | Mitigation |
|------|-----------|--------|------------|
| ML API rate limits throttle power users | Medium | Medium | Queue system, staggered publishing |
| AI costs exceed margins on Pro tier | Low | Medium | Cap at 500/mo, monitor avg usage |
| ML builds competing feature | Medium | High | Diversify to Shopify/Amazon v2 |
| Spanish/PT quality not good enough | Low | High | Rigorous testing with native speakers before launch |
| Sellers don't trust AI-generated content | Medium | Medium | Show before/after examples, testimonials |
| Photoroom adds text generation | Medium | Medium | Compete on ML-specific optimization, not generic features |

---

## 12. Appendix

### 12.1 Glossary

| Term | Definition |
|------|-----------|
| **Listing** | A product page on Mercado Libre with title, description, images, price, category |
| **ML** | Mercado Libre |
| **SKU** | Stock Keeping Unit — individual product variant |
| **GMV** | Gross Merchandise Volume — total value of goods sold |
| **TAM** | Total Addressable Market |
| **ACP** | Average Customer Price — per-seller revenue target |
| **OAuth** | Open Authorization — secure token-based API access |

### 12.2 References

- Mercado Libre Q4 2025 Earnings Report (Feb 2026)
- eMarketer / Insider Intelligence — LATAM E-commerce 2025-2026
- Indie Hackers Ideas Database — Product validation data
- Photoroom Case Studies — E-commerce seller conversion data
- YC LATAM Cohort Analysis (April-May 2026 scans)

### 12.3 Related Documents

- `SPEC.md` — Technical specification (repository)
- `ARCHITECTURE.md` — System architecture (repository)
- Market Opportunities Database (Notion) — Opportunity scoring

---

> **Next steps:**
> 1. Decide on name (Vitrina vs Alquimia vs other)
> 2. Finalize MVP scope
> 3. Begin Week 1 build
