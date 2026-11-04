'use client';

import { useScrollDirectionVisibility } from '@/hooks/useScrollDirectionVisibility';
import { useEffect, useState, type RefObject } from 'react';

/** Keep the opening section visible; afterwards reuse the site's direction threshold to avoid scroll jitter. */
export function useHeaderVisibility(headerRef: RefObject<HTMLElement | null>, pageKey: string) {
  const directionVisible = useScrollDirectionVisibility();
  const [withinOpening, setWithinOpening] = useState(true);

  useEffect(() => {
    let frame = 0;

    const measureOpening = () => {
      const opening = document.querySelector<HTMLElement>('[data-ui="blog-first-section"]');
      const header = headerRef.current;
      // Measure the collapsed bar so opening the mobile menu cannot shift the first-section boundary.
      const headerHeight = header ? parseFloat(getComputedStyle(header).getPropertyValue('--blog-header-height')) || header.offsetHeight : 0;
      setWithinOpening(opening ? opening.getBoundingClientRect().bottom > headerHeight : window.scrollY < 80);
      frame = 0;
    };
    const scheduleMeasure = () => {
      if(!frame) frame = window.requestAnimationFrame(measureOpening);
    };

    scheduleMeasure();
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    return () => {
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
      if(frame) window.cancelAnimationFrame(frame);
    };
  }, [headerRef, pageKey]);

  return directionVisible || withinOpening;
}
