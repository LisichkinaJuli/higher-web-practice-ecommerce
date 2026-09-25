import { useState } from 'react';
import StarIcon from '../../../assets/Star.svg?react';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  count?: number;
}

export const Rating = ({ 
  value, 
  onChange, 
  size = 'm', 
  disabled = false,
  count = 5
}: RatingProps) => {
  const [hover, setHover] = useState<number>(0);

  const handleMouseEnter = (starValue: number) => {
    if (!disabled) setHover(starValue);
  };

  const handleMouseLeave = () => {
    if (!disabled) setHover(0);
  };

  const handleClick = (starValue: number) => {
    if (!disabled && onChange) onChange(starValue);
  };

  const starsArray = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="rating" onMouseLeave={handleMouseLeave}>
      {starsArray.map((star) => {
        const isFilled = (hover || value) >= star;
        
        const iconClasses = [
          `rating-star-icon_size_${size}`,
          isFilled ? 'rating-star-icon_state_filled' : 'rating-star-icon_state_empty'
        ].join(' ');

        return (
          <button
            key={star}
            type="button"
            className="rating-star-btn"
            disabled={disabled}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            aria-label={`Оценка ${star}`}
          >
            <StarIcon className={iconClasses} />
          </button>
        );
      })}
    </div>
  );
};
