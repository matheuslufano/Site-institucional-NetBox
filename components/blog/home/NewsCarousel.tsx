"use client";

import { trailerEmbedUrl } from "@/lib/blog/trailers";
import { InlineTrailer } from "./InlineTrailer";
import { CoverImage } from "@/components/blog/articles/CoverImage";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import styles from "./NewsCarousel.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoPlayOutline,
  IoReaderOutline,
} from "react-icons/io5";

/** Only slide presentation data is sent to the client; the catalog stays on the server. */
export type NewsSlide = {
  id: string;
  href: string;
  title: string;
  summary: string;
  category: string;
  cover: string;
  coverAlt: string;
  poster?: string;
  posterAlt?: string;
  trailerUrl?: string;
  publishedAt: string;
  dateLabel: string;
};

export type NewsCarouselLayout = "poster" | "background";

const ROTATION_INTERVAL = 6000;

/** Identify natural orientation and decoded alpha, including extensionless media URLs.
 * Cross-origin images without canvas access remain unframed, preserving cutouts.
 */
function identifyPosterPresentation(image: HTMLImageElement) {
  const frame = image.closest<HTMLElement>('[data-component="lead-slide-poster"]');
  if (!frame) return;
  frame.dataset.orientation = image.naturalHeight > image.naturalWidth ? "portrait" : "landscape";
  const imageUrl = new URL(image.currentSrc || image.src, window.location.href);
  const originalImagePath = imageUrl.searchParams.get("url") || imageUrl.pathname;
  frame.dataset.format = decodeURIComponent(originalImagePath)
    .split("?")[0]
    .toLowerCase()
    .endsWith(".png")
    ? "png"
    : "other";
  try {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 128 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = false;
    for (let offset = 3; offset < pixels.length; offset += 4) {
      if (pixels[offset] < 255) {
        transparent = true;
        break;
      }
    }
    frame.dataset.transparent = String(transparent);
  } catch {
    frame.dataset.transparent = "unknown";
  }
}

/** Cycles recent stories, pausing for reading, keyboard interaction, reduced motion and off-screen content. */
export function NewsCarousel({
  slides,
  layout = "poster",
  expandableSummary = false,
  label = "Últimas notícias do Blog",
}: {
  slides: NewsSlide[];
  layout?: NewsCarouselLayout;
  expandableSummary?: boolean;
  label?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const posterNavigationPendingRef = useRef(false);
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);
  const [player, setPlayer] = useState<{ src: string; title: string; articleId?:string; modal?: boolean } | null>(
    null,
  );
  const playingRef = useRef(false);
  const trailerTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTrailer = useCallback(() => {
    playingRef.current = false;
    setPlayer(null);
    requestAnimationFrame(() =>
      trailerTriggerRef.current?.focus({ preventScroll: true }),
    );
  }, []);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const move = useCallback(
    (offset: number) => {
      if (playingRef.current) return;
      setActive((index) => (index + offset + slides.length) % slides.length);
    },
    [slides.length],
  );
  const navigateFromPoster = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) return;
      if (posterNavigationPendingRef.current) {
        event.preventDefault();
        return;
      }

      const link = event.currentTarget;
      const sourceImage = link.querySelector("img");
      const bounds = link.getBoundingClientRect();
      if (!sourceImage || bounds.width === 0 || bounds.height === 0) return;

      posterNavigationPendingRef.current = true;
      event.preventDefault();
      const transitionLayer = document.createElement("div");
      transitionLayer.className = styles.posterTransition;
      transitionLayer.dataset.component = "article-cover-transition";
      transitionLayer.setAttribute("aria-hidden", "true");

      const transitionImage = document.createElement("img");
      transitionImage.src = sourceImage.currentSrc || sourceImage.src;
      transitionImage.alt = "";
      transitionImage.style.left = `${bounds.left}px`;
      transitionImage.style.top = `${bounds.top}px`;
      transitionImage.style.width = `${bounds.width}px`;
      transitionImage.style.height = `${bounds.height}px`;
      transitionImage.style.borderRadius = getComputedStyle(sourceImage).borderRadius;
      transitionLayer.append(transitionImage);
      document.body.append(transitionLayer);

      const expandAnimation = transitionImage.animate(
        [
          {
            left: `${bounds.left}px`,
            top: `${bounds.top}px`,
            width: `${bounds.width}px`,
            height: `${bounds.height}px`,
          },
          {
            left: "0px",
            top: "0px",
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            borderRadius: "0px",
          },
        ],
        { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      );
      transitionLayer.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 240,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      });

      void expandAnimation.finished
        .then(() => {
          router.push(href);
          window.setTimeout(() => transitionLayer.remove(), 1800);
        })
        .catch(() => {
          posterNavigationPendingRef.current = false;
          transitionLayer.remove();
          router.push(href);
        });
    },
    [router],
  );
  const swipe = useSwipeGesture({
    enabled: slides.length > 1 && !player,
    onSwipeLeft: () => {
      setInteracted(true);
      move(1);
    },
    onSwipeRight: () => {
      setInteracted(true);
      move(-1);
    },
  });

  useEffect(() => {
    if (player || focused || hovered || interacted || slides.length < 2) return;
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
  }, [active, focused, hovered, interacted, slides.length, move, player]);

  useEffect(() => {
    const rail = thumbnailsRef.current;
    const thumbnail = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !thumbnail) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Scroll only the thumbnail rail; changing slides must never move the document vertically.
    rail.scrollTo({
      left: Math.max(
        0,
        thumbnail.offsetLeft - (rail.clientWidth - thumbnail.clientWidth) / 2,
      ),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active]);

  if (!slides.length) return null;

  return (
    <article
      ref={rootRef}
      className={styles.carousel}
      data-ui="lead-carousel"
      data-active-slide={active + 1}
      data-layout={layout}
      data-trailer-open={Boolean(player)}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (player) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        setInteracted(true);
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
      {...swipe.bind}
    >
      <div className={styles.track}>
        {slides.map((slide, index) => (
          <div
            className={styles.slide}
            key={slide.id}
            data-active={index === active}
            data-ui="lead-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={index + 1 + " de " + slides.length}
            aria-hidden={index !== active}
            inert={index !== active}
          >
            <div className={styles.backdrop} aria-hidden="true">
              {index === active && (
                <CoverImage
                  src={slide.cover}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  draggable={false}
                />
              )}
            </div>
            <div
              className={styles.feature}
              data-playing={Boolean(player)}
              data-summary-expanded={expandedSummaryId === slide.id}
              aria-hidden={player ? true : undefined}
              inert={Boolean(player)}
            >
              <Link
                className={styles.poster}
                data-component="lead-slide-poster"
                data-transparent="unknown"
                data-format="unknown"
                href={slide.href}
                onClick={(event) => navigateFromPoster(event, slide.href)}
                draggable={false}
                aria-label={"Ler artigo sobre " + slide.title}
              >
                {index !== active ? null : slide.poster ? (
                  <Image
                    src={slide.poster}
                    onLoad={(event) => identifyPosterPresentation(event.currentTarget)}
                    alt={slide.posterAlt || "Pôster de " + slide.title}
                    width={480}
                    height={720}
                    unoptimized
                    priority={index === 0}
                    draggable={false}
                  />
                ) : (
                  <CoverImage
                    onLoad={(event) => identifyPosterPresentation(event.currentTarget)}
                    src={slide.cover}
                    alt={slide.coverAlt}
                    width={480}
                    height={720}
                    sizes="240px"
                    priority={index === 0}
                    draggable={false}
                  />
                )}
              </Link>
              <div className={styles.copy}>
                <div className={styles.heading}>
                  <h2>
                      <Link href={slide.href}>{slide.title}</Link>
                  </h2>
                  {layout === "poster" && (
                    <div className={styles.meta}>
                      <span>{slide.category}</span>
                      <span aria-hidden="true">•</span>
                      <time dateTime={slide.publishedAt}>
                        {slide.dateLabel}
                      </time>
                    </div>
                  )}
                </div>
                {expandableSummary ? (
                  <button
                    className={styles.summaryToggle}
                    data-expanded={expandedSummaryId === slide.id}
                    type="button"
                    aria-expanded={expandedSummaryId === slide.id}
                    aria-label={
                      (expandedSummaryId === slide.id ? "Recolher" : "Expandir") +
                      " resumo de " +
                      slide.title
                    }
                    onClick={() =>
                      setExpandedSummaryId((current) =>
                        current === slide.id ? null : slide.id,
                      )
                    }
                  >
                    <span className={styles.summary}>{slide.summary}</span>
                  </button>
                ) : (
                  <p className={styles.summary}>{slide.summary}</p>
                )}
                {layout === "poster" && (
                  <div className={styles.actions}>
                    <Link className={styles.readButton} href={slide.href}>
                      <IoReaderOutline aria-hidden="true" />
                      Ler artigo
                    </Link>
                    {slide.trailerUrl && trailerEmbedUrl(slide.trailerUrl) && (
                      <button
                        className={styles.trailerButton}
                        type="button"
                        aria-label={"Assistir trailer de " + slide.title}
                        aria-expanded={Boolean(player)}
                        onClick={(event) => {
                          const src = trailerEmbedUrl(
                            slide.trailerUrl!,
                            window.location.origin,
                          );
                          if (!src) return;
                          trailerTriggerRef.current = event.currentTarget;
                          playingRef.current = true;
                          setInteracted(true);
                          setPlayer({ src, title: slide.title, articleId: slide.id, modal: window.matchMedia("(max-width: 767px)").matches });
                        }}
                      >
                        <IoPlayOutline aria-hidden="true" />
                        Assistir trailer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <InlineTrailer player={player} onClose={closeTrailer} />
      </div>
      {slides.length > 1 && (
        <div
          className={styles.navigation}
          data-playing={Boolean(player)}
          inert={Boolean(player)}
          aria-hidden={player ? true : undefined}
        >
          <div className={styles.railHeading}>
            <span>ESCOLHA SUA PRÓXIMA HISTÓRIA</span>
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.carouselControls}>
            <button
              className={styles.arrow}
              type="button"
              disabled={Boolean(player)}
              onClick={() => { setInteracted(true); move(-1); }}
              aria-label="Notícia anterior"
            >
              <IoChevronBack aria-hidden="true" />
            </button>
            <div
              className={styles.carouselPagination}
              ref={thumbnailsRef}
              aria-label="Escolher notícia"
              data-ui="carousel-thumbnails"
            >
              {slides.map((slide, index) => (
                <button
                  className={styles.thumbnail}
                  type="button"
                  disabled={Boolean(player)}
                  key={slide.id}
                  onClick={() => { setInteracted(true); setActive(index); }}
                  aria-label={
                    "Mostrar notícia " + (index + 1) + ": " + slide.title
                  }
                  aria-current={index === active ? "true" : undefined}
                >
                  <CoverImage
                    src={slide.cover}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 80px, 140px"
                    draggable={false}
                  />
                  <span>{slide.title}</span>
                </button>
              ))}
            </div>
            <button
              className={styles.arrow}
              type="button"
              disabled={Boolean(player)}
              onClick={() => { setInteracted(true); move(1); }}
              aria-label="Próxima notícia"
            >
              <IoChevronForward aria-hidden="true" />
            </button>
          </div>
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
