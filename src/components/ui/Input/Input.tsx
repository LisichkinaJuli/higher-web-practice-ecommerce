import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Текстовая подпись над полем ввода */
  label?: string;
  /** Текст ошибки для отображения под полем */
  errorText?: string;
}

/**
 * Универсальный компонент поля ввода.
 * Поддерживает forwardRef для прямой работы с DOM, вывод меток и состояний ошибок.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorText, className = '', id, disabled, ...props }, ref) => {
    
    // Флаг наличия ошибки для удобного переключения стилей
    const isError = Boolean(errorText);

    // Базовые структурные стили самого поля ввода
    const baseInputClasses = 'input__field w-full py-2 px-4 border rounded-md outline-none bg-bg-primary text-neutral-primary transition-all text-sm placeholder:text-neutral-disable disabled:bg-bg-disable disabled:text-neutral-disable disabled:cursor-not-allowed';
    
    // Динамические стили границы в зависимости от состояния (обычное / фокус / ошибка)
    const stateClasses = isError
      ? 'border-accent-danger focus:border-accent-danger focus:ring-1 focus:ring-accent-danger/50'
      : 'border-bg-shadows focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50';

    const inputClasses = [baseInputClasses, stateClasses, className].join(' ');

    return (
      // Контейнер инпута (Блок-обертка по БЭМ)
      <div className="input flex flex-col gap-1.5 w-full">
        
        {/* Элемент подписи (label) — рендерится только при наличии пропса */}
        {label && (
          <label 
            htmlFor={id} 
            className="input__label text-xs font-medium text-neutral-secondary"
          >
            {label}
          </label>
        )}

        {/* Нативное поле ввода с пробросом ref и атрибутов */}
        <input
          id={id}
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

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

Input.displayName = 'Input';
