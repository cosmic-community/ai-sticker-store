import { getStickers } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import type { Sticker } from '@/types'

export const metadata = {
  title: 'All Stickers - AI Sticker Store',
  description: 'Browse our complete collection of AI-generated stickers. Find the perfect design for your laptop, water bottle, or notebook.',
}

export default async function ProductsPage() {
  // Changed: Added explicit type annotation to prevent TS7034 error
  let stickers: Sticker[] = []
  let errorMessage: string | null = null
  
  try {
    console.log('🔄 Products page: Fetching stickers...')
    stickers = await getStickers()
    console.log('✅ Products page: Stickers fetched:', stickers.length)
  } catch (error) {
    console.error('❌ Products page: Error fetching stickers:', error)
    errorMessage = error instanceof Error ? error.message : 'Failed to load stickers'
    // Continue rendering with empty array
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            All <span className="gradient-text">Stickers</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our complete collection of AI-generated stickers. Each design is unique and perfect for personalizing your favorite items.
          </p>
          
          {/* Error message display */}
          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-red-600 text-sm">
                ⚠️ <strong>Error loading stickers:</strong> {errorMessage}
              </p>
              <p className="text-red-500 text-xs mt-2">
                The Cosmic CMS API may be experiencing issues. Please check the console for details or try again later.
              </p>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={stickers} showCollection={true} />

        {/* Bottom CTA */}
        {stickers && stickers.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-secondary-600 mb-6">
                Check out our curated collections to discover stickers organized by theme.
              </p>
              <a 
                href="/collections" 
                className="btn-primary inline-block"
              >
                Browse Collections
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}