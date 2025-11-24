'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 20, 
  showNumber = true 
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          if (index < fullStars) {
            return (
              <Star
                key={index}
                size={size}
                className="fill-amber-400 text-amber-400"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <div key={index} className="relative">
                <Star size={size} className="text-gray-300" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star size={size} className="fill-amber-400 text-amber-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={index} size={size} className="text-gray-300" />;
          }
        })}
      </div>
      {showNumber && (
        <span className="ml-1 font-semibold text-gray-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
