import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "~/utils/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
  showClear?: boolean;
};

export function TextFilterDropdown({
  open,
  onClose,
  value,
  onChange,
  placeholder = "Search...",
  className,
  showClear = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) onClose();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const clear = () => onChange("");

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5",
        "p-3",
        className
      )}
      role="dialog"
      aria-label="Text filter"
    >
      <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-500">
        <Search className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
        />
        {showClear && value.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}