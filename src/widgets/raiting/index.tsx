'use client';

import { Star, StarHalf } from "lucide-react";

const Raiting = ({ className, raiting }: { className?: string; raiting?: number }) => {
  const ratingValue = raiting ? Math.max(0, Math.min(5, raiting)) : 0;
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} width={20} height={20} color={"green"} />
      ))}
      {hasHalfStar && <StarHalf width={20} height={20} color={"green"} />}
    </div>
  );
};

export default Raiting;