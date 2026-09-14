import { type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';

/**
 * Интерфейс пропсов компонента Button.
 * Расширяет стандартные атрибуты HTML-кнопки.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант визуального оформления кнопки */
  variant?: 'primary' | 'secondary' | 'text';
  /** Модификатор размера, определяющий адаптивную шкалу высот */
  size?: 'md' | 'lg';
  /** Флаг для создания равносторонней квадратной кнопки-иконки на основе паддингов */
  isIconOnly?: boolean;
  /** Флаг растягивания кнопки на 100% ширины родительского контейнера */
  fullWidth?: boolean;
  /** Состояние загрузки: блокирует интерактивность и отображает спиннер */
  isLoading?: boolean;
  /** Нативная ссылка на DOM-элемент кнопки по стандарту React 19 */
  ref?: Ref<HTMLButtonElement>;
  /** Дочерние элементы для рендеринга внутри кнопки */
  children: ReactNode;
}

/**
 * Переиспользуемый атомарный компонент кнопки дизайн-системы Quant.
 * Соответствует спецификациям типографики Inter 700 Bold и адаптивным высотам Figma.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isIconOnly = false,
  isLoading = false,
  className = '',
  disabled,
  type = 'button',
  ref,
  children,
  ...props
}: ButtonProps) {
  
  const baseClasses = 'button inline-flex items-center justify-center font-bold gap-2 rounded-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/50 cursor-pointer disabled:cursor-not-allowed select-none shrink-0 text-sm leading-5 md:text-base md:leading-6';
  
  const variantClasses = {
    primary: 'button_variant_primary bg-accent-primary hover:bg-accent-secondary text-white disabled:bg-bg-disable disabled:text-neutral-disable',
    secondary: 'button_variant_secondary bg-white border border-accent-primary text-accent-primary hover:text-white hover:bg-accent-primary disabled:bg-transparent disabled:text-neutral-disable disabled:border-bg-disable',
    text: 'button_variant_text bg-transparent text-accent-primary hover:text-accent-secondary p-0 disabled:text-neutral-disable'
  };

  const sizeClasses = {
    md: isIconOnly ? 'p-2 md:p-2.5' : 'py-2 px-4 md:py-2.5 md:px-5',
    lg: isIconOnly ? 'p-3 md:p-3.5' : 'py-2.5 px-6 md:py-3 md:px-8'
  };

  const computedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      ref={ref}
      className={computedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
      ) : (
        children
      )}
    </button>
  );
}
