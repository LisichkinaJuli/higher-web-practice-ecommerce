import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Модификатор внешнего вида кнопок */
  variant?: 'primary' | 'secondary' | 'text';
  /** Модификатор размера кнопки */
  size?: 'md' | 'lg';
  /** Флаг для квадратной кнопки-иконки (например, кнопки корзины в карточке товара) */
  isIconOnly?: boolean;
  /** Содержимое кнопки (текст, иконки) */
  children: ReactNode;
}

/**
 * Универсальный компонент кнопки.
 * Поддерживает primary, secondary, text варианты, а также режим отображения только иконки.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isIconOnly = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  
  // Базовые структурные стили кнопки
  const baseClasses = 'button inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 outline-none focus:ring-2 focus:ring-accent-secondary/50 cursor-pointer disabled:cursor-not-allowed';
  
  // Стили для вариантов внешнего вида в строгом соответствии с HEX-палитрой макета
  const variantClasses = {
    // Темно-синяя переходит в ярко-синюю на ховере. Disabled — серая.
    primary: 'button_variant_primary bg-[#1e40af] hover:bg-[#2563eb] text-white disabled:bg-bg-disable disabled:text-neutral-disable disabled:border-transparent',
    
    // Контурная синяя кнопка, ховер — более яркая рамка и текст.
    secondary: 'button_variant_secondary bg-bg-secondary border border-bg-shadows text-[#1e40af] hover:text-[#2563eb] hover:border-[#2563eb] disabled:bg-transparent disabled:text-neutral-disable disabled:border-bg-disable',
    
    // Текстовая кнопка без фонов и рамок из UI-кита
    text: 'button_variant_text bg-transparent text-[#1e40af] hover:text-[#2563eb] p-0 disabled:text-neutral-disable disabled:bg-transparent'
  };

  // Размеры кнопок: разделяем обычные прямоугольные и квадратные для иконок
  const sizeClasses = {
    md: isIconOnly ? 'p-2 w-9 h-9' : 'text-sm py-2 px-5',
    lg: isIconOnly ? 'p-3 w-12 h-12' : 'text-base py-3 px-8'
  };

  // Собираем классы воедино
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
