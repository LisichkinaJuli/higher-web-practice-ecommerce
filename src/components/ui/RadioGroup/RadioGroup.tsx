import { type Ref, useId } from 'react';

export type RadioOption<T extends string> = {
  value: T;
  label: string;
};

type RadioGroupProps<T extends string> = {
  name?: string;
  value: T | null;
  options: RadioOption<T>[];
  onValueChange: (value: T) => void;
  isError?: boolean;
  className?: string;
  ref?: Ref<HTMLFieldSetElement>;
};

export function RadioGroup<T extends string>({
  name,
  value,
  options,
  onValueChange,
  isError = false,
  className = '',
  ref,
}: RadioGroupProps<T>) {
  const generatedName = useId();
  const groupName = name || generatedName;

  const stateClasses = isError ? 'radio-group_state_error' : '';

  return (
    <fieldset ref={ref} className={`radio-group ${stateClasses} ${className}`}>
      {options.map((option) => {
        const isChecked = value === option.value;
        const inputId = `radio-${groupName}-${option.value}`;

        const itemClasses = [
          'radio-group__item',
          isChecked ? 'radio-group__item_state_checked' : ''
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <label key={option.value} htmlFor={inputId} className={itemClasses}>
            <input
              type="radio"
              id={inputId}
              name={groupName}
              value={option.value}
              checked={isChecked}
              onChange={() => onValueChange(option.value)}
              className="radio-group__input"
            />
            <div className="radio-group__circle">
              <div className="radio-group__marker" />
            </div>
            <span className="radio-group__label">{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
