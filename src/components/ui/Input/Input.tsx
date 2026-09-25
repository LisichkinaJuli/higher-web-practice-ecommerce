import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'aria-describedby'> {
  label?: string;
  error?: string;
  invalid?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  ref?: Ref<HTMLInputElement>;
}

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

  const stateClasses = [
    isInvalid ? 'input_state_invalid' : '',
    disabled ? 'input_state_disabled' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}
      
      <div className="input__container">
        <input
          type={type}
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`input__field ${stateClasses} ${icon ? 'input__field_with-icon' : ''}`}
          {...props}
        />
        
        {icon && (
          <button
            type="button"
            disabled={disabled}
            onClick={onIconClick}
            className={`input__icon-btn ${onIconClick ? 'input__icon-btn_clickable' : ''}`}
          >
            {icon}
          </button>
        )}
      </div>

      {error && (
        <span id={errorId} className="input__error-text">
          {error}
        </span>
      )}
    </div>
  );
}
