import { useEffect, useRef } from "react";
import { cn } from "~/utils/cn";

type EnumOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  open: boolean;
  onClose: () => void;
  options: EnumOption<T>[];
  value: T[];
  onChange: (next: T[]) => void;
  className?: string;
};

export const EnumFilterDropdown = <T extends string>({
  open,
  onClose,
  options,
  value,
  onChange,
  className,
}: Props<T>) => {
  const ref = useRef<HTMLDivElement | null>(null);

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

  const toggle = (v: string) => {
    const exists = value.includes(v as any);
    const next = exists ? value.filter((x) => x !== (v as any)) : [...value, v as any];
    onChange(next);
  };

  const clear = () => onChange([]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5",
        "p-2 text-gray-900",
        className
      )}
      role="dialog"
      aria-label="Enum filter"
    >
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-sm font-semibold">Filter</span>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-gray-600 hover:text-gray-900"
        >
          Clear
        </button>
      </div>

      <div className="max-h-56 overflow-auto">
        {options.map((opt) => {
          const checked = value.includes(opt.value);
          return (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt.value)}
                className="h-4 w-4"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};