import clsx from "clsx";
import { forwardRef } from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  colorScheme?: "slate" | "emerald";
  variant?: "ghost" | "solid";
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "solid",
      rightIcon,
      colorScheme = "slate",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={clsx(
          "flex rounded items-center py-2 px-4 transition-colors",
          {
            "text-zinc-800": colorScheme === "slate",
            "bg-slate-100 hover:bg-slate-200":
              variant === "solid" && colorScheme === "slate",
            "hover:bg-slate-100":
              variant === "ghost" && colorScheme === "slate",

            "text-white": colorScheme === "emerald",
            "bg-emerald-500 hover:bg-emerald-600 ":
              variant === "solid" && colorScheme === "emerald",
            "hover:bg-emerald-100":
              variant === "ghost" && colorScheme === "emerald",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
