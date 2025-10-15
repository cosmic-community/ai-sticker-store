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
        <p className="text-secondary-500">Check back later for new designs!</p>
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