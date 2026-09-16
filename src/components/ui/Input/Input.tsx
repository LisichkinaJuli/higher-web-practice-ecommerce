import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';

/**
 * Интерфейс пропсов компонента Input.
 * Исключает стандартный атрибут aria-describedby для реализации контролируемой связи с ошибками.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'aria-describedby'> {
  /** Текст заголовка-метки над полем ввода */
  label?: string;
  /** Текст ошибки, активирующий красный контур и выводящийся под полем */
  error?: string;
  /** Флаг принудительной активации невалидного состояния поля */
  invalid?: boolean;
  /** Встраиваемый графический SVG-ассет (иконка) для правой части поля ввода */
  icon?: ReactNode;
  /** Обработчик события клика по встроенной интерактивной иконке */
  onIconClick?: () => void;
  /** Нативная ссылка на DOM-элемент инпута по стандарту React 19 */
  ref?: Ref<HTMLInputElement>;
}

/**
 * INPUT.
 * Интегрирует спецификации доступности WAI-ARIA, адаптивные высоты и встроенные элементы управления.
 */
export function Input({
  label,
  error,
  invalid = false,
  icon,
  onIconClick,
  className = '',
  disabled,
  type = 'text',
  id,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const isInvalid = Boolean(error) || invalid;

  const borderClasses = isInvalid
    ? 'border-accent-danger focus:border-accent-danger focus:ring-2 focus:ring-accent-danger/20'
    : 'border-bg-shadows focus:border-accent-primary focus:ring-2 focus:ring-accent-secondary/30';

  const wrapperClasses = [
    'input-wrapper flex flex-col gap-1.5 w-full',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const fieldClasses = [
    'input__field w-full py-1.5 md:py-2 pl-4',
    icon ? 'pr-10' : 'pr-4',
    'border rounded-md bg-white text-neutral-primary font-medium transition-all outline-none text-xs leading-4 md:text-sm md:leading-5',
    'placeholder:text-neutral-disable placeholder:font-normal',
    'disabled:bg-bg-disable disabled:text-neutral-disable disabled:border-bg-shadows disabled:cursor-not-allowed',
    borderClasses
  ]
    .filter(Boolean)
    .join(' ');

  const iconClasses = [
    'input__icon-btn absolute right-3 flex items-center justify-center p-0 bg-transparent border-0 outline-none text-neutral-secondary transition-colors',
    onIconClick ? 'cursor-pointer hover:text-accent-primary' : 'pointer-events-none'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input__label text-xs md:text-sm font-bold text-neutral-primary tracking-wide cursor-pointer">
          {label}
        </label>
      )}
      
      <div className="input__container relative w-full flex items-center">
        <input
          type={type}
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={fieldClasses}
          {...props}
        />
        
        {icon && (
          <button
            type="button"
            disabled={disabled}
            onClick={onIconClick}
            className={iconClasses}
          >
            {icon}
          </button>
        )}
      </div>

      {error && (
        <span id={errorId} className="input__error-text text-xs font-medium text-accent-danger animate-fadeIn pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
