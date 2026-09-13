import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Текст подписи рядом с чекбоксом */
  children?: ReactNode;
}

/**
 * Универсальный компонент чекбокса.
 * Полностью кастомизирует нативный инпут, сохраняя доступность и поддержку клавиатуры.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className = '', id, disabled, ...props }, ref) => {
    
    return (
      // Обертка-контейнер
      <label className={`checkbox inline-flex items-center gap-2.5 select-none cursor-pointer text-sm text-neutral-primary ${disabled ? 'checkbox_disabled cursor-not-allowed opacity-50' : ''}`}>
        
        {/* Скрытый нативный инпут, который слушает события и фокус */}
        <input
          id={id}
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className="checkbox__input sr-only peer"
          {...props}
        />

        {/* Кастомный визуальный квадрат чекбокса */}
        <div className={`checkbox__box w-5 h-5 flex items-center justify-center border border-bg-shadows rounded bg-bg-secondary text-transparent transition-all duration-200
          peer-focus-visible:ring-2 peer-focus-visible:ring-accent-secondary/50
          peer-checked:bg-accent-primary peer-checked:border-accent-primary peer-checked:text-white
          peer-disabled:bg-bg-disable peer-disabled:border-bg-shadows
          ${className}`}
        >
          {/* SVG-иконка галочки, которая становится видимой только при peer-checked */}
          <svg
            className="w-3.5 h-3.5 stroke-[3px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Элемент текста подписи */}
        {children && (
          <span className="checkbox__text font-medium">
            {children}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
