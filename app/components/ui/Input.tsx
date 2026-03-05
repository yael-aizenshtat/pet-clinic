import { cn } from "~/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default function Input({ error, className, ...props }: InputProps) {
  return (
    <div>
      <input
        {...props}
        className={cn(
          "h-10 w-full rounded-xl bg-white px-3",
          "ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none",
          error && "ring-rose-300 focus:ring-rose-500",
          className
        )}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}