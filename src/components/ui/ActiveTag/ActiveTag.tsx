import { type Ref } from 'react';
import { Button } from '../Button/Button'; 

export interface ActiveTagProps {
  onRemove: () => void;
  className?: string;
  ref?: Ref<HTMLDivElement>;
  children: string;
}

export function ActiveTag({
  onRemove,
  className = '',
  ref,
  children,
}: ActiveTagProps) {
  return (
    <div ref={ref} className={`active-tag ${className}`}>
      <span>{children}</span>
      <Button 
        variant="icon" 
        onClick={onRemove} 
        className="active-tag__close-btn"
        aria-label={`Удалить фильтр ${children}`}
      >
        {/* Атрибуты размеров убраны — теперь размеры задаются только в CSS через класс */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://w3.org"
          className="active-tag__close-icon"
        >
          <path 
            d="M3 21L21 3M3 3L21 21" 
            stroke="currentColor" 
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
}
