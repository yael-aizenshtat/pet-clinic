import type { SelectHTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export type SelectOption = { label: string; value: string };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  error?: string;
};

export const Select = ({ options, error, className, ...props }: SelectProps) => {
  return (
    <div>
      <select
        {...props}
        className={cn(
          "h-10 w-full rounded-xl bg-white px-3",
          "ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none",
          error && "ring-rose-300 focus:ring-rose-500",
          className
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
};