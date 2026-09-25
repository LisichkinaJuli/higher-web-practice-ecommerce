import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  children?: ReactNode;
  isError?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  ref?: Ref<HTMLInputElement>;
};

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

  const stateClasses = [
    isError ? 'checkbox_state_error' : '',
    checked ? 'checkbox_state_checked' : '',
    disabled ? 'checkbox_state_disabled' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={checkboxId} className={`checkbox ${stateClasses} ${className}`}>
      <input
        id={checkboxId}
        type="checkbox"
        ref={ref}
        disabled={disabled}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="checkbox__input"
        {...props}
      />
      <div className="checkbox__box">
        <div className="checkbox__marker" />
      </div>
      {children && <span className="checkbox__text">{children}</span>}
    </label>
  );
}
