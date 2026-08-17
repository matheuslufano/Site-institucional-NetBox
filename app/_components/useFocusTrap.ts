"use client";

import { type RefObject, useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!active) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => !element.hasAttribute("hidden"));
    window.requestAnimationFrame(() => getFocusable()[0]?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      const target = trigger ?? previousFocus;
      window.requestAnimationFrame(() => target?.focus());
    };
  }, [active, containerRef, triggerRef]);
}
