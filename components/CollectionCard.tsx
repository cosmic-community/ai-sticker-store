import Link from 'next/link'
import type { CollectionCardProps } from '@/types'

export default function CollectionCard({ collection }: CollectionCardProps) {
  const featuredImage = collection.metadata.featured_image;

  if (!featuredImage) {
    return null;
  }

  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={collection.metadata.collection_name}
            width="400"
            height="200"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
            {collection.metadata.collection_name}
          </h3>
          
          <div 
            className="text-secondary-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: collection.metadata.description }}
          />

          {/* Featured Badge */}
          {collection.metadata.featured_collection && (
            <div className="mt-4">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded">
                Featured Collection
              </span>
            </div>
          )}
          
          {/* View Collection CTA */}
          <div className="mt-4 pt-4 border-t border-secondary-100">
            <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
              View Collection →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}