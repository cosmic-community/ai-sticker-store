import ReviewCard from './ReviewCard'
import type { Review } from '@/types'

interface ReviewSectionProps {
  reviews: Review[]
  showProduct?: boolean
}

export default function ReviewSection({ reviews, showProduct = true }: ReviewSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⭐</div>
        <h3 className="text-xl font-semibold text-secondary-700 mb-2">No reviews yet</h3>
        <p className="text-secondary-500">Be the first to share your experience!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map(review => (
        <ReviewCard 
          key={review.id} 
          review={review} 
          showProduct={showProduct}
        />
      ))}
    </div>
  )
}