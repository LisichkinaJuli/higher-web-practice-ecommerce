import { type ButtonHTMLAttributes, type Ref } from 'react';

export interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  ref?: Ref<HTMLButtonElement>;
  children: string;
}

export function CategoryButton({
  isActive = false,
  className = '',
  disabled,
  type = 'button',
  ref,
  children,
  ...props
}: CategoryButtonProps) {
  const computedClasses = [
    'button-category',
    isActive ? 'button-category_active' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      ref={ref}
      className={computedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
