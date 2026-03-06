import { cn } from "~/utils/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
  secondary:
    "bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 focus-visible:ring-gray-300",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium cursor-pointer",
        "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        className
      )}
    >
      {isLoading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};