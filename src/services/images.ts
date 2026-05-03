const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

/**
 * Process images through AI enhancement pipeline.
 * Steps: background removal → color correction → smart crop → background replace
 */
export async function processImages(images: string[]): Promise<string[]> {
  if (images.length === 0) return [];

  // TODO: Implement actual image processing
  // 1. Upload to processing service (Replicate / Remove.bg API)
  // 2. Wait for processing
  // 3. Return processed image URLs
  //
  // Example with Replicate:
  // const response = await fetch('https://api.replicate.com/v1/predictions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     version: 'bg-removal-model-version',
  //     input: { image: imageUrl },
  //   }),
  // });

  // For now, return original images (identity transform)
  return images;
}

export function getSupportedFormats(): string[] {
  return ['image/jpeg', 'image/png', 'image/webp'];
}

export function getMaxFileSize(): number {
  return 10 * 1024 * 1024; // 10MB per Mercado Libre limits
}

export function getMaxImages(): number {
  return 10; // ML allows max 10 images per listing
}
