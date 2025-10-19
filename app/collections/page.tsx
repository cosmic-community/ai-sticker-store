import { getCollections } from '@/lib/cosmic'
import CollectionGrid from '@/components/CollectionGrid'

export const metadata = {
  title: 'Collections - AI Sticker Store',
  description: 'Browse our curated collections of AI-generated stickers organized by theme. Find cute animals, space designs, tech stickers and more.',
}

export default async function CollectionsPage() {
  // Changed: Added error handling to prevent build failures
  let collections = []
  
  try {
    collections = await getCollections()
  } catch (error) {
    console.error('Error fetching collections:', error)
    // Continue rendering with empty array
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Sticker <span className="gradient-text">Collections</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our carefully curated collections of themed stickers. Each collection features unique AI-generated designs perfect for different interests and styles.
          </p>
        </div>

        {/* Collections Grid */}
        <CollectionGrid collections={collections} />

        {/* Bottom CTA */}
        {collections && collections.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Looking for something specific?
              </h2>
              <p className="text-secondary-600 mb-6">
                Browse all our individual stickers to find the perfect design for you.
              </p>
              <a 
                href="/products" 
                className="btn-primary inline-block"
              >
                View All Stickers
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}