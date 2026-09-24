import {
  type ButtonHTMLAttributes,
  type ComponentPropsWithRef,
  Children,
  isValidElement,
} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon" | "text" | "tab";
  colorVariant?: "primary" | "secondary";
  fullWidth?: boolean;
  align?: "center" | "left";
  active?: boolean;
}

export function Button({
  variant,
  colorVariant = "primary",
  fullWidth = false,
  active = false,
  align = "center",
  className = "",
  type = "button",
  disabled,
  ref,
  children,
  ...props
}: ButtonProps & ComponentPropsWithRef<"button">) {
  let activeVariant = variant;
  if (!activeVariant) {
    const childArray = Children.toArray(children);
    const isOnlyIcon =
      childArray.length === 1 &&
      isValidElement(childArray[0]) &&
      typeof childArray[0].type === "string" &&
      ["svg", "img"].includes(childArray[0].type);
    activeVariant = isOnlyIcon ? "icon" : "default";
  }

  const classes = ["btn", `btn_variant_${activeVariant}`];

  const variantsWithColor = ["default", "icon"];
  if (variantsWithColor.includes(activeVariant)) {
    classes.push(`btn_color_${colorVariant}`);
  }

  if (fullWidth) classes.push("btn_full-width");
  if (align === "left") classes.push("btn_align_left");
  if (active) classes.push("btn_state_active");
  if (className) classes.push(className);

  return (
    <button
      type={type}
      ref={ref}
      disabled={disabled}
      className={classes.join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
