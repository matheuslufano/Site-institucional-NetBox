"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useSwipeGesture } from "../../../_components/useSwipeGesture";
import { BlogImage } from "./BlogImage";
import styles from "../blog.module.css";

/** Display-only data; article bodies and the complete catalog stay on the server. */
export type LeadCarouselSlide = {
  id: string;
  href: string;
  title: string;
  summary: string;
  category: string;
  cover: string;
  coverAlt: string;
  publishedAt: string;
  dateLabel: string;
  demo: boolean;
};

const ROTATION_INTERVAL = 6000;

/** Cycles recent stories, pausing for reading, keyboard interaction, reduced motion and off-screen content. */
export function LeadCarousel({ slides }: { slides: LeadCarouselSlide[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const move = useCallback(
    (offset: number) => {
      setActive((index) => (index + offset + slides.length) % slides.length);
    },
    [slides.length],
  );
  const swipe = useSwipeGesture({
    enabled: slides.length > 1,
    onSwipeLeft: () => {
      move(1);
    },
    onSwipeRight: () => {
      move(-1);
    },
  });

  useEffect(() => {
    if (focused || hovered || slides.length < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let inView = false;
    const synchronize = () => {
      clearInterval(timer);
      if (inView && !document.hidden && !motion.matches)
        timer = setInterval(() => move(1), ROTATION_INTERVAL);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      synchronize();
    });
    if (rootRef.current) observer.observe(rootRef.current);
    motion.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      motion.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
    };
  }, [active, focused, hovered, slides.length, move]);

  if (!slides.length) return null;

  return (
    <article
      ref={rootRef}
      className={styles.leadStory}
      data-ui="lead-carousel"
      data-active-slide={active + 1}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Últimas notícias"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
      }}
      {...swipe.bind}
    >
      <div className={styles.carouselTrack}>
        {slides.map((slide, index) => (
          <div
            className={styles.carouselSlide}
            key={slide.id}
            data-active={index === active}
            data-ui="lead-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={index + 1 + " de " + slides.length}
            aria-hidden={index !== active}
            inert={index !== active}
          >
            <Link
              href={slide.href}
              draggable={false}
              tabIndex={index === active ? undefined : -1}
            >
              <BlogImage
                src={slide.cover}
                alt={slide.coverAlt}
                fill
                sizes="(max-width: 767px) 100vw, 70vw"
                priority={index === 0}
                draggable={false}
              />
              <div className={styles.leadCopy}>
                <span className={styles.leadCategory}>{slide.category}</span>
                <h2>{slide.title}</h2>
                <p>{slide.summary}</p>
                <div>
                  <time dateTime={slide.publishedAt}>{slide.dateLabel}</time>
                  {slide.demo && <span> · Conteúdo demonstrativo</span>}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className={styles.carouselControls}>
          <button
            className={styles.carouselArrow}
            type="button"
            onClick={() => move(-1)}
            aria-label="Notícia anterior"
          >
            <IoChevronBack aria-hidden="true" />
          </button>
          <div className={styles.carouselPagination} aria-label="Escolher notícia">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                onClick={() => setActive(index)}
                aria-label={"Mostrar notícia " + (index + 1) + ": " + slide.title}
                aria-current={index === active ? "true" : undefined}
              >
                <span />
              </button>
            ))}
            <span className={styles.carouselCounter}>
              {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <button
            className={styles.carouselArrow}
            type="button"
            onClick={() => move(1)}
            aria-label="Próxima notícia"
          >
            <IoChevronForward aria-hidden="true" />
          </button>
        </div>
      )}
      <span
        className="sr-only"
        aria-live={focused || hovered ? "polite" : "off"}
        aria-atomic="true"
      >
        Notícia {active + 1} de {slides.length}: {slides[active].title}
      </span>
    </article>
  );
}
