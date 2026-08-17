"use client";

import { type MouseEvent, type TouchEvent, useRef, useState } from "react";

type SwipeOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  enabled?: boolean;
};

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  threshold = 48,
  enabled = true,
}: SwipeOptions) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function reset() {
    start.current = null;
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }

  function onTouchStart(event: TouchEvent<HTMLElement>) {
    if (!enabled || event.touches.length !== 1) return;
    const touch = event.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  }

  function onTouchMove(event: TouchEvent<HTMLElement>) {
    if (!start.current || event.touches.length !== 1) return;
    const touch = event.touches[0];
    setOffset({ x: touch.clientX - start.current.x, y: touch.clientY - start.current.y });
  }

  function onTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!start.current) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      reset();
      return;
    }

    const distanceX = touch.clientX - start.current.x;
    const distanceY = touch.clientY - start.current.y;
    const horizontal = Math.abs(distanceX) >= threshold && Math.abs(distanceX) > Math.abs(distanceY) * 1.2;
    const downward = distanceY >= threshold && Math.abs(distanceY) > Math.abs(distanceX) * 1.2;

    if (horizontal) {
      suppressClick.current = true;
      if (distanceX < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    } else if (downward) {
      suppressClick.current = true;
      onSwipeDown?.();
    }

    reset();
    window.setTimeout(() => { suppressClick.current = false; }, 400);
  }

  function onClickCapture(event: MouseEvent<HTMLElement>) {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  }

  return {
    bind: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: reset, onClickCapture },
    offsetX: offset.x,
    offsetY: offset.y,
    isDragging,
  };
}
