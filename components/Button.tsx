import clsx from "clsx";
import { forwardRef } from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  colorScheme?: "slate" | "emerald" | "blue";
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
            "text-gray-900": colorScheme === "slate",
            "bg-slate-100 hover:bg-slate-200":
              variant === "solid" && colorScheme === "slate",
            "hover:bg-slate-100":
              variant === "ghost" && colorScheme === "slate",
          },
          {
            "text-white": colorScheme === "emerald" && variant === "solid",
            "text-emerald-500":
              colorScheme === "emerald" && variant === "ghost",
            "bg-emerald-500 hover:bg-emerald-600 ":
              variant === "solid" && colorScheme === "emerald",
            "hover:bg-emerald-100":
              variant === "ghost" && colorScheme === "emerald",
          },
          {
            "text-white": colorScheme === "blue" && variant === "solid",
            "text-gray-900": colorScheme === "blue" && variant === "ghost",
            "bg-sky-500 hover:bg-emerald-600 ":
              variant === "solid" && colorScheme === "blue",
            "hover:bg-blue-100 hover:text-blue-700":
              variant === "ghost" && colorScheme === "blue",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
