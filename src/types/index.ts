// ListaAI — TypeScript type definitions

export type Plan = 'free' | 'starter' | 'pro' | 'enterprise';
export type Locale = 'es-MX' | 'es-AR' | 'es-CO' | 'pt-BR';
export type ListingStatus = 'draft' | 'published' | 'archived';
export type Tone = 'professional' | 'casual' | 'luxury';

export interface User {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  credits_remaining: number;
  locale: Locale;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name?: string;
  price?: number;
  currency?: string;
  brand?: string;
  model?: string;
  color?: string;
  size?: string;
  material?: string;
  weight?: number;
  condition?: string;
  notes?: string;
  category_hint?: string;
  tone?: Tone;
  language?: Locale;
}

export interface ListingData {
  id: string;
  user_id: string;
  title: string;
  short_description: string;
  long_description: string;
  category_id: string | null;
  category_name: string | null;
  attributes: Record<string, string>;
  keywords: string[];
  original_images: string[];
  processed_images: string[];
  status: ListingStatus;
  ml_listing_id: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationRequest {
  images: string[]; // base64 or URLs
  product: ProductInput;
}

export interface GenerationResponse {
  listing: ListingData;
  credits_used: number;
  generation_time_ms: number;
}

export interface MLAuthUrlResponse {
  url: string;
}

export interface MLToken {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  seller_id: string;
}

export interface PlanTier {
  id: Plan;
  name: string;
  price: number; // USD cents
  listings_per_month: number;
  images_per_month: number;
  features: string[];
}

export const PLANS: PlanTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    listings_per_month: 10,
    images_per_month: 10,
    features: ['AI listing generation', 'Image enhancement', 'Spanish + Portuguese'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 900, // $9
    listings_per_month: 100,
    images_per_month: 100,
    features: [
      '100 AI listings/mo',
      '100 image enhancements/mo',
      'ML direct publish',
      'Keyword optimization',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1900, // $19
    listings_per_month: 999999, // unlimited-ish
    images_per_month: 500,
    features: [
      'Unlimited AI listings',
      '500 image enhancements/mo',
      'Batch CSV import',
      'API access',
      'Priority support',
      '3 team seats',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0, // custom
    listings_per_month: 999999,
    images_per_month: 999999,
    features: ['Custom limits', 'Dedicated support', 'Custom integrations', 'SLA'],
  },
];

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };
