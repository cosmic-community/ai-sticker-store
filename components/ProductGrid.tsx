import ProductCard from './ProductCard'
import type { Sticker } from '@/types'

interface ProductGridProps {
  products: Sticker[]
  showCollection?: boolean
}

export default function ProductGrid({ products, showCollection = true }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏷️</div>
        <h3 className="text-xl font-semibold text-secondary-700 mb-2">No stickers found</h3>
        <p className="text-secondary-500 mb-4">
          The stickers may not be loading due to an API issue.
        </p>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
          <p className="text-blue-700 text-sm font-medium mb-2">
            🔍 Troubleshooting Tips:
          </p>
          <ul className="text-blue-600 text-xs text-left space-y-1">
            <li>• Check the browser console for detailed error logs</li>
            <li>• Verify the Cosmic CMS bucket contains stickers</li>
            <li>• Ensure environment variables are correctly configured</li>
            <li>• The Cosmic API may be experiencing a temporary outage</li>
          </ul>
        </div>
        <p className="text-secondary-400 text-sm mt-6">
          Try creating a new sticker or check back later!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          sticker={product} 
          showCollection={showCollection}
        />
      ))}
    </div>
  )
}