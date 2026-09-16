import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useId,
} from "react";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  ref?: Ref<HTMLInputElement>;
}

/**
 * Компонент переключателя.
 */
export function Switch({
  children,
  checked = false,
  onCheckedChange,
  disabled,
  className = "",
  id,
  ref,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={`switch inline-flex items-center gap-3 select-none text-neutral-primary font-normal cursor-pointer w-full md:w-auto
        text-xs leading-4 md:text-sm md:leading-5
        ${disabled ? "switch_disabled cursor-not-allowed opacity-40" : ""}`}
    >
      <input
        type="checkbox"
        id={inputId}
        ref={ref}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        role="switch"
        aria-checked={checked}
        className="switch__input sr-only peer"
        {...props}
      />

      <div
        className={`
        switch__track rounded-full relative border flex items-center px-0.5 transition-all duration-200 shrink-0
        w-11 h-6 md:w-9 md:h-5
        peer-focus-visible:ring-2 peer-focus-visible:ring-accent-secondary/50
        peer-hover:border-accent-secondary peer-hover:bg-accent-secondary
        ${
          checked
            ? "bg-accent-primary border-accent-primary"
            : "bg-bg-shadows border-transparent"
        }
        ${disabled ? "bg-bg-disable border-bg-shadows" : ""}
        ${className}
      `.trim()}
      >
        <div
          className={`
          switch__thumb bg-white rounded-full transition-transform duration-200 shadow-sm pointer-events-none
          ${
            checked
              ? "w-5 h-5 translate-x-5 md:w-4 md:h-4 md:translate-x-4"
              : "w-5 h-5 translate-x-0 md:w-4 md:h-4 md:translate-x-0"
          }
        `.trim()}
        />
      </div>

      {children && (
        <span className="switch__label font-medium tracking-wide peer-disabled:opacity-40">
          {children}
        </span>
      )}
    </label>
  );
}
