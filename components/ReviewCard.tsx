import Link from 'next/link'
import StarRating from './StarRating'
import type { ReviewCardProps } from '@/types'

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const product = review.metadata.product_reviewed;
  const reviewPhoto = review.metadata.review_photos?.[0];
  const rating = parseInt(review.metadata.rating.key);

  return (
    <div className="card">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-secondary-900 mb-1">
              {review.metadata.customer_name}
            </h3>
            <div className="flex items-center gap-2">
              <StarRating rating={rating} />
              {review.metadata.verified_purchase && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
          
          <span className="text-sm text-secondary-500">
            {new Date(review.metadata.review_date).toLocaleDateString()}
          </span>
        </div>

        {/* Product Info */}
        {showProduct && product && (
          <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
            <Link 
              href={`/products/${product.slug}`}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              {product.metadata.name} →
            </Link>
          </div>
        )}

        {/* Review Text */}
        <p className="text-secondary-700 leading-relaxed mb-4">
          {review.metadata.review_text}
        </p>

        {/* Review Photo */}
        {reviewPhoto && (
          <div className="mb-4">
            <img
              src={`${reviewPhoto.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
              alt="Customer review photo"
              width="200"
              height="150"
              className="w-full max-w-sm h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
          <span className="text-sm text-secondary-500">
            {review.metadata.helpful_votes || 0} people found this helpful
          </span>
          
          <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
            Helpful
          </button>
        </div>
      </div>
    </div>
  )
}