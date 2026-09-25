import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  ref?: Ref<HTMLInputElement>;
}

export function Switch({
  children,
  checked = false,
  onCheckedChange,
  disabled,
  className = '',
  id,
  ref,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const stateClasses = [
    checked ? 'switch_state_checked' : '',
    disabled ? 'switch_state_disabled' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={inputId} className={`switch ${stateClasses} ${className}`}>
      <input
        type="checkbox"
        id={inputId}
        ref={ref}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        role="switch"
        aria-checked={checked}
        className="switch__input"
        {...props}
      />
      <div className="switch__track">
        <div className="switch__thumb" />
      </div>
      {children && <span className="switch__label">{children}</span>}
    </label>
  );
}
