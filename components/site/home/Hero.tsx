"use client";
import { APP_STORE, APP_STORE_LOGO, GOOGLE_PLAY_LOGO, PLAY_STORE, WHATSAPP } from "@/constants/site";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { track } from "@/services/site/leads";
import type { Dispatch, SetStateAction } from "react";
import {
  type CSSProperties
} from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoPause,
  IoPlay
} from "react-icons/io5";
import { heroSlides } from "./content";
type Props = {
  slides: Array<(typeof heroSlides)[number] & { id?: string; videoUrl?: string }>;
  activeSlide: number;
  heroSwipe: ReturnType<typeof useSwipeGesture>;
  setCarouselInteractionPaused: Dispatch<SetStateAction<boolean>>;
  moveSlide: (direction: number) => void;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  setCarouselPaused: Dispatch<SetStateAction<boolean>>;
  carouselPaused: boolean;
};

/** Institutional opening carousel. Interaction state remains owned by the home composition. */
export function Hero({ slides, activeSlide, heroSwipe, setCarouselInteractionPaused, moveSlide, setActiveSlide, setCarouselPaused, carouselPaused }: Props) {
  const currentSlide = slides[activeSlide] ?? slides[0];
  const heroVideo = currentSlide.videoUrl ? resolveHeroVideo(currentSlide.videoUrl) : null;
  return (<section
    className={`model-hero copy-${currentSlide.side}${heroSwipe.isDragging ? " is-swiping" : ""}`}
    id="inicio"
    role="region"
    aria-roledescription="carrossel"
    aria-label="Destaques Netbox"
    tabIndex={0}
    onMouseEnter={() => setCarouselInteractionPaused(true)}
    onMouseLeave={() => setCarouselInteractionPaused(false)}
    style={
      {
        "--hero-swipe-offset": `${heroSwipe.offsetX * 0.28}px`,
      } as CSSProperties
    }
    {...heroSwipe.bind}
    onKeyDown={(event) => {
      if(event.key === "ArrowLeft") moveSlide(-1);
      if(event.key === "ArrowRight") moveSlide(1);
    }}
  >
    <div
      className="hero-slide-background"
      key={currentSlide.id || currentSlide.image}
      style={
        {
          backgroundImage: `url(${currentSlide.image})`,
          backgroundPosition: currentSlide.position,
          "--hero-mobile-image": `url(${currentSlide.mobileImage})`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {heroVideo?.type === "file" && <video className="hero-slide-video" autoPlay muted loop playsInline poster={currentSlide.image}><source src={heroVideo.src} /></video>}
      {heroVideo?.type === "embed" && <iframe className="hero-slide-video" src={heroVideo.src} title={`Vídeo: ${currentSlide.title}`} tabIndex={-1} allow="autoplay; encrypted-media; picture-in-picture" />}
    </div>
    <div className="model-shell hero-inner carousel-only">
      <div
        className={`model-hero-copy${activeSlide === 0 ? " is-app-slide" : ""}`}
        key={activeSlide}
        aria-live="polite"
        aria-atomic="true"
      >
        <img
          className="hero-logo"
          src="/logo-branca-1024x371.png"
          alt="Netbox — Internet de verdade"
        />
        {activeSlide === 0 && (
          <img
            className="hero-app-icon"
            src="/netbox-app-icon.png"
            alt="Ícone do Aplicativo Netbox"
          />
        )}
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.text}</p>
        {activeSlide === 0 ? (
          <div
            className="netbox-app-stores hero-app-stores"
            aria-label="Baixar o Aplicativo Netbox"
          >
            <a
              className="store-download"
              href={APP_STORE}
              target="_blank"
              rel="noreferrer"
              aria-label="Baixar o Aplicativo Netbox na App Store"
              onClick={() =>
                track("clicou_download_app", {
                  origin: "carrossel",
                  store: "app_store",
                })
              }
            >
              <img
                className="store-icon store-logo apple"
                src={APP_STORE_LOGO}
                alt=""
              />
              <div className="store-text">
                <span>Baixe o app na</span>
                <strong>App Store</strong>
              </div>
            </a>
            <a
              className="store-download"
              href={PLAY_STORE}
              target="_blank"
              rel="noreferrer"
              aria-label="Baixar o Aplicativo Netbox no Google Play"
              onClick={() =>
                track("clicou_download_app", {
                  origin: "carrossel",
                  store: "google_play",
                })
              }
            >
              <img
                className="store-icon store-logo play"
                src={GOOGLE_PLAY_LOGO}
                alt=""
              />
              <div className="store-text">
                <span>Baixe o App no</span>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        ) : (
          <a
            className="model-button hero-primary hero-whatsapp-button hero-whatsapp-desktop"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo destaque “${currentSlide.title}” no site da Netbox e gostaria de saber mais.`)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              track("clicou_whatsapp", {
                origin: "carrossel",
                slide: currentSlide.title,
              })
            }
          >
            Falar pelo WhatsApp <b aria-hidden="true">›</b>
          </a>
        )}
      </div>
    </div>
    {activeSlide !== 0 && (
      <a
        className="model-button hero-primary hero-whatsapp-button hero-whatsapp-mobile"
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo destaque “${currentSlide.title}” no site da Netbox e gostaria de saber mais.`)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          track("clicou_whatsapp", {
            origin: "carrossel_mobile",
            slide: currentSlide.title,
          })
        }
      >
        Falar pelo WhatsApp <b aria-hidden="true">›</b>
      </a>
    )}
    <button
      className="hero-arrow left"
      type="button"
      onClick={() => moveSlide(-1)}
      aria-label="Mostrar destaque anterior"
    >
      <IoChevronBack aria-hidden="true" />
    </button>
    <button
      className="hero-arrow right"
      type="button"
      onClick={() => moveSlide(1)}
      aria-label="Mostrar próximo destaque"
    >
      <IoChevronForward aria-hidden="true" />
    </button>
    <div className="carousel-controls">
      <span
        className="carousel-count"
        aria-live="polite"
        aria-atomic="true"
      >
        <strong>{String(activeSlide + 1).padStart(2, "0")}</strong>
        <i>/</i>
        {String(slides.length).padStart(2, "0")}
      </span>
      <div className="carousel-dots" aria-label="Escolher destaque">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === activeSlide ? "active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Mostrar destaque ${index + 1}: ${slide.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
          />
        ))}
      </div>
      <button
        className="carousel-pause"
        type="button"
        onClick={() => setCarouselPaused((paused) => !paused)}
        aria-label={
          carouselPaused
            ? "Retomar rotação automática"
            : "Pausar rotação automática"
        }
      >
        {carouselPaused ? (
          <IoPlay aria-hidden="true" />
        ) : (
          <IoPause aria-hidden="true" />
        )}
      </button>
    </div>
  </section>);
}

function resolveHeroVideo(source: string): { type: "file" | "embed"; src: string } | null {
  if (source.startsWith("/") && /\.(mp4|webm)(?:\?|$)/i.test(source)) return { type: "file", src: source };
  try {
    const url = new URL(source);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (/\.(mp4|webm)$/i.test(url.pathname)) return { type: "file", src: url.href };
    if (host === "youtu.be" || ["youtube.com", "www.youtube.com", "m.youtube.com", "www.youtube-nocookie.com"].includes(host)) {
      const id = host === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).at(-1);
      if (id && /^[\w-]{11}$/.test(id)) return { type: "embed", src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1` };
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      if (id && /^\d+$/.test(id)) return { type: "embed", src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1` };
    }
  } catch { return null; }
  return null;
}
