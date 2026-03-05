import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useIsomorphicLayoutEffect } from "~/hooks/useIsomorphicLayoutEffect";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
  offset?: number;
  width?: number;
};

export function DropdownPortal({
  open,
  anchorEl,
  onClose,
  children,
  offset = 8,
  width,
}: Props) {
  const [pos, setPos] = useState<{ top: number; left: number; w: number }>({
    top: 0,
    left: 0,
    w: 0,
  });

  useIsomorphicLayoutEffect(() => {
    if (!open || !anchorEl) return;

    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      setPos({
        top: r.bottom + offset + window.scrollY,
        left: r.left + window.scrollX,
        w: r.width,
      });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, anchorEl, offset]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const container = document.getElementById("__dropdown_portal__");
      if (!container || !target) return;
      if (!container.contains(target) && anchorEl && !anchorEl.contains(target)) onClose();
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
  }, [open, onClose, anchorEl]);

  if (!open || !anchorEl) return null;

  const portal = (
    <div
      id="__dropdown_portal__"
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        width: width ?? 280,
      }}
    >
      {children}
    </div>
  );

  return createPortal(portal, document.body);
}