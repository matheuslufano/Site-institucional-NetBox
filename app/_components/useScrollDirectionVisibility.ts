"use client";

import { useEffect, useState } from "react";

export function useScrollDirectionVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastPosition = window.scrollY;
    let accumulatedDistance = 0;
    let direction = 0;
    let frame = 0;

    const updateVisibility = () => {
      const currentPosition = window.scrollY;
      const distance = currentPosition - lastPosition;
      const nextDirection = Math.sign(distance);

      if (nextDirection && nextDirection !== direction) {
        direction = nextDirection;
        accumulatedDistance = 0;
      }
      accumulatedDistance += Math.abs(distance);

      if (currentPosition < 80) {
        setVisible(true);
        accumulatedDistance = 0;
      } else if (accumulatedDistance >= 28) {
        setVisible(direction < 0);
        accumulatedDistance = 0;
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
