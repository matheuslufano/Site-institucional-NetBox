"use client";

import { useEffect, useState } from "react";

type ScrollDirectionVisibilityOptions = {
  initialVisible?: boolean;
  revealAtTop?: boolean;
  resetKey?: string;
};

export function useScrollDirectionVisibility({
  initialVisible = true,
  revealAtTop = true,
  resetKey,
}: ScrollDirectionVisibilityOptions = {}) {
  const [visibilityState, setVisibilityState] = useState({
    key: resetKey,
    visible: initialVisible,
  });
  const visible =
    visibilityState.key === resetKey
      ? visibilityState.visible
      : initialVisible;

  useEffect(() => {
    let lastPosition = window.scrollY;
    let accumulatedDistance = 0;
    let direction = 0;
    let frame = 0;

    const updateVisibility = () => {
      const currentPosition = window.scrollY;
      const distance = currentPosition - lastPosition;
      const nextDirection = Math.sign(distance);

      if(nextDirection && nextDirection !== direction) {
        direction = nextDirection;
        accumulatedDistance = 0;
      }
      accumulatedDistance += Math.abs(distance);

      if(revealAtTop && currentPosition < 80) {
        setVisibilityState({ key: resetKey, visible: true });
        accumulatedDistance = 0;
      } else if(accumulatedDistance >= 28) {
        setVisibilityState({ key: resetKey, visible: direction < 0 });
        accumulatedDistance = 0;
      }

      lastPosition = currentPosition;
      frame = 0;
    };

    const handleScroll = () => {
      if(!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if(frame) window.cancelAnimationFrame(frame);
    };
  }, [initialVisible, resetKey, revealAtTop]);

  return visible;
}
