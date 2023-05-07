import clsx from "clsx";

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: "large" | "regular";
}

export function Heading({
  children,
  className,
  size = "regular",
  ...props
}: HeadingProps) {
  return (
    <h1
      className={clsx(
        "font-bold text-slate-800",
        {
          "text-5xl": size === "large",
          "text-2xl": size === "regular",
        },
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
