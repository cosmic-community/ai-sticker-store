interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ rating, size = 'sm' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating;
      return (
        <svg
          key={index}
          className={`${sizeClasses[size]} ${isFilled ? 'text-yellow-400' : 'text-secondary-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            clipRule="evenodd"
          />
        </svg>
      );
    });
  };

  return (
    <div className="flex items-center">
      {renderStars()}
    </div>
  );
}