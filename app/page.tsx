import { getFeaturedStickers, getFeaturedCollections, getRecentReviews } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import CollectionGrid from '@/components/CollectionGrid'
import ReviewSection from '@/components/ReviewSection'
import type { Sticker, Collection, Review } from '@/types'

export default async function HomePage() {
  // Fetch all data for homepage with error handling
  // Changed: Added explicit type annotations to prevent TS7034 errors
  let featuredStickers: Sticker[] = []
  let featuredCollections: Collection[] = []
  let recentReviews: Review[] = []

  try {
    [featuredStickers, featuredCollections, recentReviews] = await Promise.all([
      getFeaturedStickers(),
      getFeaturedCollections(),
      getRecentReviews(6)
    ])
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Continue rendering with empty arrays - page will show fallback UI
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Featured <span className="gradient-text">Stickers</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover our most popular AI-generated stickers, perfect for personalizing your favorite items
            </p>
          </div>
          
          {featuredStickers && featuredStickers.length > 0 ? (
            <ProductGrid products={featuredStickers} />
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary-500">No featured stickers available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections */}
      {featuredCollections && featuredCollections.length > 0 && (
        <section className="py-16 px-4 bg-secondary-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Popular <span className="gradient-text">Collections</span>
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Explore our curated collections of themed stickers
              </p>
            </div>
            
            <CollectionGrid collections={featuredCollections} />
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {recentReviews && recentReviews.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                What Customers <span className="gradient-text">Say</span>
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Read authentic reviews from our happy customers
              </p>
            </div>
            
            <ReviewSection reviews={recentReviews} />
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 bg-hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Sticker?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our complete collection of AI-generated stickers and find the perfect design for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Shop All Products
            </a>
            <a 
              href="/collections" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Browse Collections
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}