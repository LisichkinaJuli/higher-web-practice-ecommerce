import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Интерфейс пропсов для переиспользуемого поля ввода.
 * Расширяет стандартные атрибуты HTML-инпута с учётом строгой типизации TypeScript.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Текстовая подпись над полем ввода */
  label?: string;
  /** Текст ошибки для отображения под полем */
  errorText?: string;
  /** Иконка (компонент или SVG), отображаемая в правой части поля */
  icon?: ReactNode;
  /** Обработчик клика по иконке (например, для запуска поиска или показа пароля) */
  onIconClick?: () => void;
}

/**
 * Универсальный компонент поля ввода.
 * Поддерживает forwardRef для прямой работы с DOM, встроенные иконки, метки и анимацию ошибок.
 * Полностью синхронизирован с дизайн-системой и автоматически адаптируется под тёмную тему.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorText, icon, onIconClick, className = '', id, disabled, ...props }, ref) => {
    
    // Флаг наличия ошибки для динамического переключения стилей
    const isError = Boolean(errorText);

    // Базовые стили инпута. Если передана иконка, добавляем правый паддинг (pr-10), чтобы текст не перекрывал её
    const baseInputClasses = `input__field w-full py-2 pl-4 ${icon ? 'pr-10' : 'pr-4'} border rounded-md outline-none bg-bg-primary text-neutral-primary transition-all text-sm placeholder:text-neutral-disable disabled:bg-bg-disable disabled:text-neutral-disable disabled:cursor-not-allowed`;
    
    // Динамические стили границы в зависимости от состояния (обычное / фокус / ошибка)
    // Используем исключительно системные токены из @theme (accent-danger, accent-primary, bg-shadows)
    const stateClasses = isError
      ? 'border-accent-danger focus:border-accent-danger focus:ring-1 focus:ring-accent-danger/50'
      : 'border-bg-shadows focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50';

    const inputClasses = [baseInputClasses, stateClasses, className].join(' ');

    return (
      // Контейнер инпута (Блок-обертка по БЭМ)
      <div className="input flex flex-col gap-1.5 w-full">
        
        {/* Элемент подписи (input__label) — рендерится только при наличии пропса */}
        {label && (
          <label 
            htmlFor={id} 
            className="input__label text-xs font-medium text-neutral-secondary"
          >
            {label}
          </label>
        )}

        {/* Обертка для поля и абсолютной иконки внутри него */}
        <div className="input__wrapper relative w-full flex items-center">
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />

          {/* Рендерим элемент иконки, если он передан в пропсах */}
          {icon && (
            <button
              type="button"
              onClick={onIconClick}
              disabled={disabled}
              className={`input__icon-btn absolute right-3 text-neutral-secondary transition-colors focus:outline-none bg-transparent border-none p-0
                ${onIconClick && !disabled ? 'cursor-pointer hover:text-accent-primary' : 'pointer-events-none'}`}
            >
              {icon}
            </button>
          )}
        </div>

        {/* Элемент текста ошибки — плавно выводится под инпутом */}
        {isError && (
          <span className="input__error-text text-xs text-accent-danger font-medium animate-fadeIn">
            {errorText}
          </span>
        )}
      </div>
    );
  }
);

// Указываем displayName для корректного отображения компонента в React DevTools
Input.displayName = 'Input';
