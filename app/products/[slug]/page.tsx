// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getStickerBySlug, getReviewsByProduct } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewSection from '@/components/ReviewSection'
import type { ProductPageProps } from '@/types'

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const sticker = await getStickerBySlug(slug)
  
  if (!sticker) {
    return {
      title: 'Product Not Found - AI Sticker Store'
    }
  }

  return {
    title: `${sticker.metadata.name} - AI Sticker Store`,
    description: sticker.metadata.description.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [sticker, reviews] = await Promise.all([
    getStickerBySlug(slug),
    getStickerBySlug(slug).then(s => s ? getReviewsByProduct(s.id) : [])
  ])

  if (!sticker) {
    notFound()
  }

  // Safety check for product images
  if (!sticker.metadata.product_images || sticker.metadata.product_images.length === 0) {
    notFound()
  }

  const collection = sticker.metadata.collections?.[0]
  const firstImage = sticker.metadata.product_images[0]
  
  // Additional safety check for TypeScript
  if (!firstImage) {
    notFound()
  }
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + parseInt(review.metadata.rating.key), 0) / reviews.length
    : 0

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary-50">
              <img
                  src={`${firstImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={sticker.metadata.name}
                width="400"
                height="400"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Images */}
            {sticker.metadata.product_images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {sticker.metadata.product_images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg bg-secondary-50">
                    <img
                      src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={`${sticker.metadata.name} ${index + 2}`}
                      width="100"
                      height="100"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {/* Collection Badge */}
            {collection && (
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                  {collection.metadata.collection_name}
                </span>
              </div>
            )}

            {/* Title & Price */}
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {sticker.metadata.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                ${sticker.metadata.price}
              </span>
              
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(averageRating)} size="md" />
                  <span className="text-secondary-600">({reviews.length} reviews)</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div 
              className="prose prose-secondary max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: sticker.metadata.description }}
            />

            {/* Size Options */}
            {sticker.metadata.size_options && sticker.metadata.size_options.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Size Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sticker.metadata.size_options.map((option, index) => (
                    <div 
                      key={index} 
                      className="border border-secondary-200 rounded-lg p-4 text-center hover:border-primary-300 transition-colors duration-200"
                    >
                      <div className="font-medium text-secondary-900">{option.size}</div>
                      <div className="text-primary-600 font-semibold">${option.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏷️</span>
                <div>
                  <div className="font-medium text-secondary-900">Material</div>
                  <div className="text-secondary-600">{sticker.metadata.material_type.value}</div>
                </div>
              </div>
              
              {sticker.metadata.waterproof && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <div className="font-medium text-secondary-900">Waterproof</div>
                    <div className="text-secondary-600">Weather resistant</div>
                  </div>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {sticker.metadata.in_stock ? (
                <span className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-lg">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-700 bg-red-100 px-4 py-2 rounded-lg">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* AI Prompt */}
            {sticker.metadata.ai_prompt && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-secondary-900 mb-2">AI Generation Prompt</h3>
                <p className="text-secondary-700 italic">"{sticker.metadata.ai_prompt}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews && reviews.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Customer Reviews ({reviews.length})
              </h2>
              {averageRating > 0 && (
                <div className="flex items-center gap-4">
                  <StarRating rating={Math.round(averageRating)} size="lg" />
                  <span className="text-lg font-semibold text-secondary-700">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
              )}
            </div>
            <ReviewSection reviews={reviews} showProduct={false} />
          </section>
        )}
      </div>
    </div>
  )
}