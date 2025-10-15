import { getReviews } from '@/lib/cosmic'
import ReviewSection from '@/components/ReviewSection'

export const metadata = {
  title: 'Customer Reviews - AI Sticker Store',
  description: 'Read authentic customer reviews of our AI-generated stickers. See what customers love about our quality, designs, and service.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Customer <span className="gradient-text">Reviews</span>
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Read authentic feedback from our customers about their experience with our AI-generated stickers. Quality designs that customers love!
          </p>
          
          {reviews && reviews.length > 0 && (
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <span className="text-xl">⭐</span>
                {reviews.length} Customer Review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Reviews */}
        <ReviewSection reviews={reviews} showProduct={true} />

        {/* Bottom CTA */}
        {reviews && reviews.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Ready to Experience Our Quality?
              </h2>
              <p className="text-secondary-600 mb-6">
                Join thousands of satisfied customers who love our AI-generated stickers.
              </p>
              <a 
                href="/products" 
                className="btn-primary inline-block"
              >
                Shop Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}