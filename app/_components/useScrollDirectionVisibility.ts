"use client";

import { useEffect, useState } from "react";

export function useScrollDirectionVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastPosition = window.scrollY;
    let frame = 0;

    const updateVisibility = () => {
      const currentPosition = window.scrollY;
      const distance = currentPosition - lastPosition;

      if (currentPosition < 80) {
        setVisible(true);
      } else if (Math.abs(distance) >= 6) {
        setVisible(distance < 0);
      }

      lastPosition = currentPosition;
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return visible;
}
