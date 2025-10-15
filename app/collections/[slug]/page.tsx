// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCollectionBySlug, getStickersByCollection } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import type { CollectionPageProps } from '@/types'

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)
  
  if (!collection) {
    return {
      title: 'Collection Not Found - AI Sticker Store'
    }
  }

  return {
    title: `${collection.metadata.collection_name} - AI Sticker Store`,
    description: collection.metadata.description.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const [collection, stickers] = await Promise.all([
    getCollectionBySlug(slug),
    getCollectionBySlug(slug).then(c => c ? getStickersByCollection(c.id) : [])
  ])

  if (!collection) {
    notFound()
  }

  const bannerImage = collection.metadata.collection_banner || collection.metadata.featured_image

  return (
    <div className="min-h-screen">
      {/* Collection Header with Banner */}
      <section className="relative">
        <div className="aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
          <img
            src={`${bannerImage.imgix_url}?w=1400&h=400&fit=crop&auto=format,compress`}
            alt={collection.metadata.collection_name}
            width="1400"
            height="400"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {collection.metadata.collection_name}
            </h1>
            <div 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: collection.metadata.description }}
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {stickers && stickers.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                  {stickers.length} Sticker{stickers.length !== 1 ? 's' : ''} in this Collection
                </h2>
                <p className="text-secondary-600">
                  Unique AI-generated designs perfect for personalizing your items
                </p>
              </div>
              
              <ProductGrid products={stickers} showCollection={false} />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏷️</div>
              <h2 className="text-2xl font-bold text-secondary-700 mb-4">
                No stickers in this collection yet
              </h2>
              <p className="text-secondary-500 mb-8">
                Check back later for new designs in this collection!
              </p>
              <a 
                href="/collections" 
                className="btn-primary"
              >
                Browse Other Collections
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Related Collections CTA */}
      <section className="py-16 px-4 bg-secondary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Explore More Collections
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Discover other themed collections of AI-generated stickers
          </p>
          <a 
            href="/collections" 
            className="btn-primary"
          >
            View All Collections
          </a>
        </div>
      </section>
    </div>
  )
}