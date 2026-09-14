import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';

/**
 * Интерфейс пропсов компонента Checkbox.
 * Расширяет стандартные HTML-атрибуты инпута, заменяя нативный onChange на контролируемый onCheckedChange.
 */
export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  /** Текст подписи (лейбл), отображаемый справа от флажка */
  children?: ReactNode;
  /** Флаг состояния ошибки, активирующий предупреждающий красный контур */
  isError?: boolean;
  /** Кастомный обработчик изменения состояния, возвращающий актуальный статус boolean наружу */
  onCheckedChange?: (checked: boolean) => void;
  /** Нативная ссылка на DOM-элемент инпута по стандарту React 19 */
  ref?: Ref<HTMLInputElement>;
};

/**
 * Переиспользуемый атомарный компонент чекбокса дизайн-системы Quant.
 * Интегрирует автогенерацию ID через useId, поддержку состояний peer и адаптивные размеры Figma.
 */
export function Checkbox({
  children,
  isError = false,
  onCheckedChange,
  id,
  disabled,
  checked,
  className = '',
  ref,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const borderClasses = isError
    ? 'border-accent-danger peer-hover:border-accent-danger'
    : checked
      ? 'border-accent-primary'
      : 'border-bg-shadows peer-hover:border-accent-primary';

  const labelClasses = [
    'checkbox inline-flex items-center gap-2.5 select-none font-normal w-full md:w-auto text-xs leading-4 md:text-sm md:leading-5',
    disabled ? 'checkbox_disabled cursor-not-allowed opacity-40' : 'cursor-pointer'
  ]
    .filter(Boolean)
    .join(' ');

  const boxClasses = [
    'checkbox__box w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center border rounded-[2px] bg-white transition-all duration-150 shrink-0',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-accent-secondary/50',
    'peer-disabled:bg-bg-disable peer-disabled:border-bg-shadows',
    borderClasses,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const markerClasses = [
    'w-2 h-2 md:w-2.5 md:h-2.5 bg-accent-primary rounded-[1px] transition-transform duration-150 shadow-sm',
    checked ? 'scale-100' : 'scale-0'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={checkboxId} className={labelClasses}>
      <input
        id={checkboxId}
        type="checkbox"
        ref={ref}
        disabled={disabled}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="checkbox__input sr-only peer"
        {...props}
      />
      <div className={boxClasses}>
        <div className={markerClasses} />
      </div>
      {children && (
        <span className="checkbox__text text-neutral-primary peer-disabled:opacity-40">
          {children}
        </span>
      )}
    </label>
  );
}
