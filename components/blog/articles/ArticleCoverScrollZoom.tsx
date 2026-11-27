"use client";

import { useEffect } from "react";

/** Gently enlarges the article cover while the reader scrolls down. */
export function ArticleCoverScrollZoom() {
  useEffect(() => {
    document
      .querySelector('[data-component="article-cover-transition"]')
      ?.remove();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cover = document.querySelector<HTMLImageElement>(
      "#article-cover-backdrop img",
    );
    if (!cover) return;

    let previousScrollY = window.scrollY;
    let scale = 1;
    let frame = 0;

    const updateCoverScale = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - previousScrollY;
        previousScrollY = currentScrollY;
        scale = Math.min(1.2, Math.max(1, scale + scrollDelta * 0.00045));
        cover.style.setProperty("--article-cover-scroll-scale", String(scale));
      });
    };

    window.addEventListener("scroll", updateCoverScale, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateCoverScale);
      cancelAnimationFrame(frame);
      cover.style.removeProperty("--article-cover-scroll-scale");
    };
  }, []);

  return null;
}
