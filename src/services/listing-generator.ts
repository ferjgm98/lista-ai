import type { ListingData, GenerationResponse, ProductInput } from '../types';
import { uid, getDb } from '../db';
import { generateListingContent } from './ai';
import { processImages } from './images';

export interface GenerateOptions {
  images: string[]; // base64 or URLs
  product: ProductInput;
  userId: string;
  locale?: string;
}

/**
 * Orchestrates the full listing generation pipeline:
 * 1. Process images (bg removal, enhancement)
 * 2. Generate AI content (title, desc, keywords, category)
 * 3. Save to database
 * 4. Return the complete listing
 */
export async function generateListing(options: GenerateOptions): Promise<GenerationResponse> {
  const { images, product, userId, locale = 'es-MX' } = options;
  const startTime = Date.now();

  // Step 1: Check credits
  const db = getDb();
  const user = db.query('SELECT * FROM users WHERE id = ?').get(userId) as any;
  if (!user) throw new Error('User not found');

  const planLimits: Record<string, number> = { free: 10, starter: 100, pro: 999999 };
  const limit = planLimits[user.plan] || 10;

  const monthlyCount = db
    .query(
      `SELECT COUNT(*) as count FROM listings
       WHERE user_id = ? AND created_at > datetime('now', '-30 days')`
    )
    .get(userId) as any;

  if (monthlyCount.count >= limit) {
    throw new Error('Monthly listing limit reached. Upgrade your plan.');
  }

  // Step 2: Process images
  const processedImages = images.length > 0 ? await processImages(images) : [];

  // Step 3: Generate AI content
  const aiContent = await generateListingContent({
    images: processedImages,
    product,
    locale,
  });

  // Step 4: Save to database
  const listingId = uid();
  const listing: ListingData = {
    id: listingId,
    user_id: userId,
    title: aiContent.title,
    short_description: aiContent.short_description,
    long_description: aiContent.long_description,
    category_id: aiContent.category_id,
    category_name: aiContent.category_name,
    attributes: aiContent.attributes,
    keywords: aiContent.keywords,
    original_images: images,
    processed_images: processedImages,
    status: 'draft',
    ml_listing_id: null,
    language: locale,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.run(
    `INSERT INTO listings (id, user_id, title, short_description, long_description,
      category_id, category_name, attributes, keywords, original_images,
      processed_images, status, language, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      listing.id,
      listing.user_id,
      listing.title,
      listing.short_description,
      listing.long_description,
      listing.category_id,
      listing.category_name,
      JSON.stringify(listing.attributes),
      JSON.stringify(listing.keywords),
      JSON.stringify(listing.original_images),
      JSON.stringify(listing.processed_images),
      listing.status,
      listing.language,
      listing.created_at,
      listing.updated_at,
    ]
  );

  // Step 5: Log generation
  db.run(
    `INSERT INTO generations (id, user_id, type, model, duration_ms, created_at)
     VALUES (?, ?, 'listing', 'gpt-4o', ?, datetime('now'))`,
    [uid(), userId, Date.now() - startTime]
  );

  const elapsed = Date.now() - startTime;

  return {
    listing,
    credits_used: 1,
    generation_time_ms: elapsed,
  };
}
