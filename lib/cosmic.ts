import { createBucketClient } from '@cosmicjs/sdk'
import type { Sticker, Collection, Review, CosmicResponse, CreateStickerRequest } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all stickers with collections
export async function getStickers(): Promise<Sticker[]> {
  try {
    console.log('🔍 Fetching stickers from Cosmic...')
    console.log('Environment:', {
      bucketSlug: process.env.COSMIC_BUCKET_SLUG,
      hasReadKey: !!process.env.COSMIC_READ_KEY,
      apiEnvironment: 'staging'
    })
    
    const response = await cosmic.objects
      .find({ type: 'stickers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    console.log('✅ Stickers fetched successfully:', {
      count: response.objects?.length || 0,
      total: response.total
    })
    
    if (!response.objects || response.objects.length === 0) {
      console.warn('⚠️ No stickers found in response')
      return []
    }
    
    return (response.objects as Sticker[]).sort((a, b) => {
      // Sort featured products first, then by price
      if (a.metadata?.featured_product && !b.metadata?.featured_product) return -1;
      if (!a.metadata?.featured_product && b.metadata?.featured_product) return 1;
      return (a.metadata?.price || 0) - (b.metadata?.price || 0);
    });
  } catch (error) {
    console.error('❌ Error fetching stickers:', error)
    console.error('Error details:', {
      type: typeof error,
      hasStatus: hasStatus(error),
      status: hasStatus(error) ? error.status : 'N/A',
      message: error instanceof Error ? error.message : String(error)
    })
    
    if (hasStatus(error) && error.status === 404) {
      console.log('ℹ️ 404 error - no stickers found, returning empty array')
      return [];
    }
    
    if (hasStatus(error) && error.status === 500) {
      console.error('🚨 500 error from Cosmic API - server issue')
      // Return empty array instead of throwing to prevent page crash
      return [];
    }
    
    // For other errors, return empty array to prevent page crash
    console.error('🚨 Unexpected error, returning empty array to prevent crash')
    return [];
  }
}

// Get featured stickers
export async function getFeaturedStickers(): Promise<Sticker[]> {
  const allStickers = await getStickers();
  return allStickers.filter(sticker => sticker.metadata?.featured_product);
}

// Get sticker by slug
export async function getStickerBySlug(slug: string): Promise<Sticker | null> {
  try {
    console.log('🔍 Fetching sticker by slug:', slug)
    
    const response = await cosmic.objects
      .findOne({
        type: 'stickers',
        slug
      })
      .depth(1)
    
    console.log('✅ Sticker found:', response.object?.id)
    return response.object as Sticker;
  } catch (error) {
    console.error('❌ Error fetching sticker by slug:', error)
    
    if (hasStatus(error) && error.status === 404) {
      console.log('ℹ️ Sticker not found with slug:', slug)
      return null;
    }
    
    if (hasStatus(error) && error.status === 500) {
      console.error('🚨 500 error from Cosmic API for slug:', slug)
      return null;
    }
    
    throw new Error('Failed to fetch sticker');
  }
}

// Get all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    console.log('🔍 Fetching collections from Cosmic...')
    
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    console.log('✅ Collections fetched:', response.objects?.length || 0)
    
    return (response.objects as Collection[]).sort((a, b) => {
      const orderA = a.metadata?.sort_order || 999;
      const orderB = b.metadata?.sort_order || 999;
      return orderA - orderB;
    });
  } catch (error) {
    console.error('❌ Error fetching collections:', error)
    
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    
    if (hasStatus(error) && error.status === 500) {
      console.error('🚨 500 error from Cosmic API - collections')
      return [];
    }
    
    throw new Error('Failed to fetch collections');
  }
}

// Get featured collections
export async function getFeaturedCollections(): Promise<Collection[]> {
  const allCollections = await getCollections();
  return allCollections.filter(collection => collection.metadata?.featured_collection);
}

// Get collection by slug
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'collections',
        slug
      })
      .depth(1)
    
    return response.object as Collection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch collection');
  }
}

// Get stickers by collection
export async function getStickersByCollection(collectionId: string): Promise<Sticker[]> {
  try {
    console.log('🔍 Fetching stickers for collection:', collectionId)
    
    const response = await cosmic.objects
      .find({ 
        type: 'stickers',
        'metadata.collections': collectionId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    console.log('✅ Collection stickers fetched:', response.objects?.length || 0)
    
    return response.objects as Sticker[];
  } catch (error) {
    console.error('❌ Error fetching stickers by collection:', error)
    
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    
    if (hasStatus(error) && error.status === 500) {
      console.error('🚨 500 error from Cosmic API - collection stickers')
      return [];
    }
    
    throw new Error('Failed to fetch stickers by collection');
  }
}

// Get all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Review[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.review_date || '').getTime();
      const dateB = new Date(b.metadata?.review_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Get reviews for a specific product
export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product_reviewed': productId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Review[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.review_date || '').getTime();
      const dateB = new Date(b.metadata?.review_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch product reviews');
  }
}

// Get recent reviews
export async function getRecentReviews(limit: number = 3): Promise<Review[]> {
  const allReviews = await getReviews();
  return allReviews.slice(0, limit);
}

// Search stickers by tags
export async function searchStickersByTag(tag: string): Promise<Sticker[]> {
  const allStickers = await getStickers();
  return allStickers.filter(sticker => 
    sticker.metadata?.tags?.toLowerCase().includes(tag.toLowerCase())
  );
}

// Create a new sticker with AI-generated image
export async function createSticker(data: CreateStickerRequest, imageFileName: string, imageImgixUrl: string): Promise<Sticker> {
  try {
    console.log('🔧 createSticker called with:', {
      stickerName: data.name,
      imageFileName,
      imgixUrl: imageImgixUrl,
      price: data.price,
      materialType: data.materialType
    })
    
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    console.log('📝 Generated slug:', slug)
    
    const payload = {
      title: data.name,
      type: 'stickers',
      slug: slug,
      metadata: {
        name: data.name,
        description: data.description,
        ai_prompt: data.prompt,
        product_images: [imageFileName], // Changed: Using array with filename for files metafield
        price: data.price,
        size_options: [
          {
            size: 'Small (2")',
            price: data.price - 1
          },
          {
            size: 'Medium (4")',
            price: data.price + 1
          },
          {
            size: 'Large (6")',
            price: data.price + 3
          }
        ],
        tags: data.tags,
        material_type: {
          key: data.materialType,
          value: data.materialType.charAt(0).toUpperCase() + data.materialType.slice(1)
        },
        waterproof: data.waterproof,
        in_stock: true,
        featured_product: false
      }
    };
    
    console.log('📦 Payload being sent to Cosmic:', JSON.stringify(payload, null, 2))
    
    const response = await cosmic.objects.insertOne(payload);
    
    console.log('✅ Cosmic insertOne successful')
    console.log('Response object:', {
      id: response.object?.id,
      slug: response.object?.slug,
      title: response.object?.title
    })
    
    return response.object as Sticker;
  } catch (error) {
    console.error('❌ Error in createSticker function:', error)
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    
    // Log additional error properties if available
    if (error && typeof error === 'object') {
      console.error('Error object keys:', Object.keys(error))
      console.error('Full error object:', JSON.stringify(error, null, 2))
    }
    
    throw new Error(error instanceof Error ? error.message : 'Failed to create sticker in Cosmic');
  }
}