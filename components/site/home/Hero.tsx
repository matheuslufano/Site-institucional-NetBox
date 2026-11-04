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
  activeSlide: number;
  heroSwipe: ReturnType<typeof useSwipeGesture>;
  setCarouselInteractionPaused: Dispatch<SetStateAction<boolean>>;
  moveSlide: (direction: number) => void;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  setCarouselPaused: Dispatch<SetStateAction<boolean>>;
  carouselPaused: boolean;
};

/** Institutional opening carousel. Interaction state remains owned by the home composition. */
export function Hero({ activeSlide, heroSwipe, setCarouselInteractionPaused, moveSlide, setActiveSlide, setCarouselPaused, carouselPaused }: Props) {
  return (<section
    className={`model-hero copy-${heroSlides[activeSlide].side}${heroSwipe.isDragging ? " is-swiping" : ""}`}
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
      key={heroSlides[activeSlide].image}
      style={
        {
          backgroundImage: `url(${heroSlides[activeSlide].image})`,
          backgroundPosition: heroSlides[activeSlide].position,
          "--hero-mobile-image": `url(${heroSlides[activeSlide].mobileImage})`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
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
        <h1>{heroSlides[activeSlide].title}</h1>
        <p>{heroSlides[activeSlide].text}</p>
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
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo destaque “${heroSlides[activeSlide].title}” no site da Netbox e gostaria de saber mais.`)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              track("clicou_whatsapp", {
                origin: "carrossel",
                slide: heroSlides[activeSlide].title,
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
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo destaque “${heroSlides[activeSlide].title}” no site da Netbox e gostaria de saber mais.`)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          track("clicou_whatsapp", {
            origin: "carrossel_mobile",
            slide: heroSlides[activeSlide].title,
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
        {String(heroSlides.length).padStart(2, "0")}
      </span>
      <div className="carousel-dots" aria-label="Escolher destaque">
        {heroSlides.map((slide, index) => (
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
