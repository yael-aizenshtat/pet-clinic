import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "~/utils/cn";

type ModalSize = "sm" | "md" | "lg";

const sizeClass: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
};

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative mx-auto flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full",
            sizeClass[size],
            "rounded-2xl bg-white shadow-xl",
            "animate-in fade-in zoom-in-95 duration-150"
          )}
        >
          <X
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          />
          {(title || description) && (
            <div className="border-b border-gray-100 px-6 py-5">
              {title && (
                <div className="text-lg font-semibold text-gray-900">
                  {title}
                </div>
              )}
              {description && (
                <div className="mt-1 text-sm text-gray-500">{description}</div>
              )}
            </div>
          )}

          <div className="px-6 py-5">{children}</div>

          {footer && (
            <div className="border-t border-gray-100 px-6 py-4">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};