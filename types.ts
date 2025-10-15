// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
}

// Sticker product interface
export interface Sticker extends CosmicObject {
  type: 'stickers';
  metadata: {
    name: string;
    description: string;
    ai_prompt?: string;
    product_images: {
      url: string;
      imgix_url: string;
    }[];
    price: number;
    size_options?: {
      size: string;
      price: number;
    }[];
    tags?: string;
    collections?: Collection[];
    material_type: {
      key: string;
      value: string;
    };
    waterproof?: boolean;
    in_stock: boolean;
    featured_product?: boolean;
  };
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name: string;
    description: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    collection_banner?: {
      url: string;
      imgix_url: string;
    };
    sort_order?: number;
    featured_collection?: boolean;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name: string;
    rating: {
      key: string;
      value: string;
    };
    review_text: string;
    product_reviewed: Sticker;
    review_photos?: {
      url: string;
      imgix_url: string;
    }[];
    verified_purchase?: boolean;
    review_date: string;
    helpful_votes?: number;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total?: number;
  limit?: number;
  skip?: number;
}

// Material types for filtering
export type MaterialType = 'vinyl' | 'paper' | 'holographic' | 'transparent';

// Rating values
export type RatingValue = '1' | '2' | '3' | '4' | '5';

// Product card props
export interface ProductCardProps {
  sticker: Sticker;
  showCollection?: boolean;
}

// Collection card props
export interface CollectionCardProps {
  collection: Collection;
}

// Review card props
export interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

// Page props for dynamic routes
export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

// Type guards
export function isSticker(obj: CosmicObject): obj is Sticker {
  return obj.type === 'stickers';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}