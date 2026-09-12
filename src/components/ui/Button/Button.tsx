import { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Интерфейс пропсов для переиспользуемой кнопки.
 * Расширяет стандартные атрибуты HTML-кнопки.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Модификатор внешнего вида */
  variant?: 'primary' | 'secondary';
  /** Модификатор размера кнопки */
  size?: 'md' | 'lg';
  /** Содержимое кнопки (текст, иконки) */
  children: ReactNode;
}

/**
 * Универсальный компонент кнопки.
 * Поддерживает автоматическую стилизацию состояний Hover, Focus, Disabled и смену тем.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  
  // Базовые структурные стили кнопки (Layout, скругления, транзишены)
  const baseClasses = 'button inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 outline-none focus:ring-2 focus:ring-accent-secondary/50 cursor-pointer disabled:cursor-not-allowed';
  
  // Стили для БЭМ-модификаторов внешнего вида (variant) с учетом темной темы
  const variantClasses = {
    primary: 'button_variant_primary bg-accent-primary hover:bg-accent-secondary text-white disabled:bg-bg-disable disabled:text-neutral-disable disabled:border-transparent',
    secondary: 'button_variant_secondary bg-transparent border border-bg-shadows hover:border-accent-primary text-neutral-primary hover:text-accent-primary disabled:bg-transparent disabled:text-neutral-disable disabled:border-bg-disable'
  };

  // Стили для БЭМ-модификаторов размера (size)
  const sizeClasses = {
    md: 'button_size_md text-sm py-2 px-5',
    lg: 'button_size_lg text-base py-3 px-8'
  };

  const computedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].join(' ');

  return (
    <button
      className={computedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
