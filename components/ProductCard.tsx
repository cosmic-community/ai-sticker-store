import Link from 'next/link'
import type { ProductCardProps } from '@/types'

export default function ProductCard({ sticker, showCollection = true }: ProductCardProps) {
  const firstImage = sticker.metadata.product_images[0];
  const collection = sticker.metadata.collections?.[0];

  if (!firstImage) {
    return null;
  }

  return (
    <Link href={`/products/${sticker.slug}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={`${firstImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={sticker.metadata.name}
            width="300"
            height="300"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Collection Badge */}
          {showCollection && collection && (
            <div className="mb-2">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded">
                {collection.metadata.collection_name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {sticker.metadata.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              ${sticker.metadata.price}
            </span>
            
            {/* Material Badge */}
            <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded">
              {sticker.metadata.material_type.value}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-2 mt-2">
            {sticker.metadata.waterproof && (
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Waterproof
              </span>
            )}
            {sticker.metadata.featured_product && (
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                Featured
              </span>
            )}
            {!sticker.metadata.in_stock && (
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}