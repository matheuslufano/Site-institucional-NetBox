"use client";
import ChristmasHeroLights from "@/components/shared/seasonal/ChristmasHeroLights";
import { useSeasonalTheme } from "@/components/shared/seasonal/SeasonalThemeProvider";
import { ClientShortcuts } from "@/components/site/layout/ClientShortcuts";
import { StructureSection } from "@/components/site/structure/StructureSection";
import Link from "next/link";
import {
  type CSSProperties,
  FormEvent,
  type TransitionEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { MenuContacts } from "@/components/site/layout/MenuContacts";
import { ThemeToggle } from "@/components/site/layout/ThemeToggle";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollDirectionVisibility } from "@/hooks/useScrollDirectionVisibility";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import {
  IoCallOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoDocumentTextOutline,
  IoHeadsetOutline
} from "react-icons/io5";

import { APP_STORE, APP_STORE_LOGO, GOOGLE_PLAY_LOGO, PLAY_STORE, WHATSAPP } from "@/constants/site";
import { openWhatsApp, track } from "@/services/site/leads";
import { Hero } from "./Hero";
import { HomeFooter } from "./HomeFooter";
import { PlanCard, PlatformLogo } from "./PlanCard";
import { appScreens, cities, DEFAULT_CITY, familyFeaturedPlans, featuredPlans, heroSlides, residentialPlans, services, storeAddresses } from "./content";

/** Institutional home composition; routes only mount this component. */
export default function HomePage() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [appCarouselIndex, setAppCarouselIndex] = useState(1);
  const [appCarouselResetting, setAppCarouselResetting] = useState(false);
  const [appCarouselPaused, setAppCarouselPaused] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [featuredPlanIndex, setFeaturedPlanIndex] = useState(0);
  const [selectedFeaturedAudience, setSelectedFeaturedAudience] = useState<
    "basico" | "familia"
  >("basico");
  const currentFeaturedPlans =
    selectedFeaturedAudience === "familia"
      ? familyFeaturedPlans
      : featuredPlans;
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [carouselInteractionPaused, setCarouselInteractionPaused] =
    useState(false);
  const [featureVideoPaused, setFeatureVideoPaused] = useState(false);
  const [featureVideoMuted, setFeatureVideoMuted] = useState(true);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const plansModalRef = useRef<HTMLElement | null>(null);
  const plansTriggerRef = useRef<HTMLElement | null>(null);
  const navigationVisible = useScrollDirectionVisibility();
  const { theme } = useSeasonalTheme();
  const christmasActive = theme?.id === "christmas";
  const selectedStoreAddress =
    storeAddresses[city] ?? storeAddresses[DEFAULT_CITY];
  const selectedMapLocation = selectedStoreAddress;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(selectedMapLocation)}&z=16&output=embed`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation)}`;
  const appCarouselSlides = [
    appScreens[appScreens.length - 1],
    ...appScreens,
    appScreens[0],
  ];
  const activeAppSlide =
    (appCarouselIndex - 1 + appScreens.length) % appScreens.length;

  const heroSwipe = useSwipeGesture({
    onSwipeLeft: () => moveSlide(1),
    onSwipeRight: () => moveSlide(-1),
  });
  const appSwipe = useSwipeGesture({
    onSwipeLeft: () => moveAppSlide(1),
    onSwipeRight: () => moveAppSlide(-1),
  });
  const planSwipe = useSwipeGesture({
    onSwipeLeft: () => movePlan(1),
    onSwipeRight: () => movePlan(-1),
    onSwipeDown: () => setPlansOpen(false),
  });
  const featuredSwipe = useSwipeGesture({
    onSwipeLeft: () => moveFeaturedPlan(1),
    onSwipeRight: () => moveFeaturedPlan(-1),
  });
  const menuSwipe = useSwipeGesture({
    onSwipeRight: () => setMenuOpen(false),
    threshold: 56,
    enabled: menuOpen,
  });

  useFocusTrap(menuOpen, menuRef, menuButtonRef, () => setMenuOpen(false));
  useFocusTrap(plansOpen, plansModalRef, plansTriggerRef, () =>
    setPlansOpen(false),
  );

  useEffect(() => {
    setCookieOpen(!localStorage.getItem("netbox_cookie_consent"));
  }, []);

  useEffect(() => {
    const preloadedAppScreens = appScreens.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    return () => {
      preloadedAppScreens.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    if(!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    if(!plansOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const handlePlansKeyboard = (event: KeyboardEvent) => {
      if(event.key === "ArrowLeft") {
        setActivePlan(
          (current) =>
            (current - 1 + residentialPlans.length) % residentialPlans.length,
        );
      }
      if(event.key === "ArrowRight") {
        setActivePlan((current) => (current + 1) % residentialPlans.length);
      }
    };
    window.addEventListener("keydown", handlePlansKeyboard);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handlePlansKeyboard);
    };
  }, [plansOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if(
      carouselPaused ||
      carouselInteractionPaused ||
      heroSwipe.isDragging ||
      reduceMotion
    )
      return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [carouselPaused, carouselInteractionPaused, heroSwipe.isDragging]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if(appCarouselPaused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setAppCarouselResetting(false);
      setAppCarouselIndex((current) => {
        if(current <= 0 || current >= appScreens.length + 1) return current;
        return current + 1;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [appCarouselPaused]);

  useEffect(() => {
    let resetIndex: number | null = null;
    let resetDelay = 480;

    if(appCarouselIndex === 0) resetIndex = appScreens.length;
    if(appCarouselIndex === appScreens.length + 1) resetIndex = 1;
    if(appCarouselIndex < 0 || appCarouselIndex > appScreens.length + 1) {
      resetIndex = 1;
      resetDelay = 0;
    }
    if(resetIndex === null) return;

    const resetTimer = window.setTimeout(() => {
      setAppCarouselResetting(true);
      setAppCarouselIndex(resetIndex);
    }, resetDelay);

    return () => window.clearTimeout(resetTimer);
  }, [appCarouselIndex]);

  useEffect(() => {
    if(!appCarouselResetting) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setAppCarouselResetting(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if(secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [appCarouselResetting]);

  function moveSlide(direction: number) {
    setActiveSlide(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );
  }

  function moveAppSlide(direction: number) {
    setAppCarouselResetting(false);
    setAppCarouselIndex((current) => {
      if(current === 0 || current === appScreens.length + 1) return current;
      return current + direction;
    });
  }

  function finishAppCarouselTransition(event: TransitionEvent<HTMLDivElement>) {
    if(
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    )
      return;

    let resetIndex: number | null = null;
    if(appCarouselIndex === 0) resetIndex = appScreens.length;
    if(appCarouselIndex === appScreens.length + 1) resetIndex = 1;
    if(resetIndex === null) return;

    setAppCarouselResetting(true);
    setAppCarouselIndex(resetIndex);
  }

  function movePlan(direction: number) {
    setActivePlan(
      (current) =>
        (current + direction + residentialPlans.length) %
        residentialPlans.length,
    );
  }

  function getPlanSlideClass(index: number) {
    const distance =
      (index - activePlan + residentialPlans.length) % residentialPlans.length;
    if(distance === 0) return "is-active";
    if(distance === 1) return "is-next";
    if(distance === residentialPlans.length - 1) return "is-previous";
    return "is-far";
  }

  function openResidentialPlans() {
    plansTriggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setActivePlan(0);
    setPlansOpen(true);
    track("abriu_planos_residenciais", { city, origin: "servicos" });
  }

  function contactPlan(planName: string) {
    openWhatsApp(
      `Olá! Tenho interesse no plano residencial ${planName} da Netbox e gostaria de consultar disponibilidade e condições em ${city}.`,
      { city, type: "residencial", plan: planName, origin: "modal_planos" },
    );
    setPlansOpen(false);
  }

  function moveFeaturedPlan(direction: number) {
    setFeaturedPlanIndex(
      (index) =>
        (index + direction + currentFeaturedPlans.length) %
        currentFeaturedPlans.length,
    );
  }

  function contactFeaturedPlan(name: string) {
    openWhatsApp(
      `Olá! Vim pelo site e eu quero conhecer os planos disponíveis da Netbox.`,
      {
        city: DEFAULT_CITY,
        type: "residencial",
        plan: name,
        origin: "carrossel_planos",
      },
    );
  }

  function toggleFeatureVideo() {
    const video = featureVideoRef.current;
    if(!video) return;
    if(video.paused) void video.play();
    else video.pause();
  }

  function toggleFeatureVideoSound() {
    const video = featureVideoRef.current;
    if(!video) return;
    video.muted = !video.muted;
    setFeatureVideoMuted(video.muted);
  }

  function consultCoverage(event?: FormEvent) {
    event?.preventDefault();
    track("consultou_cobertura", { city });
    openWhatsApp(`Olá! Quero consultar a cobertura da Netbox em ${city}.`, {
      city,
      type: "residencial",
      origin: "consulta_cobertura",
    });
  }

  function handleService(title: string) {
    if(title.toLocaleLowerCase("pt-BR").includes("residencial")) {
      window.location.hash = "planos-netbox";
      return;
    }
    if(title === "Aplicativo Netbox") {
      document
        .querySelector("#aplicativo-netbox")
        ?.scrollIntoView({ behavior: "smooth" });
      track("acessou_aplicativo", { origin: "servicos" });
      return;
    }
    if(
      title === "Suporte Técnico Regional" ||
      title === "Atendimento ao cliente"
    ) {
      window.location.href = "/nossa-estrutura";
      track("acessou_atendimento", { origin: "servicos" });
      return;
    }
    openWhatsApp(
      title === "Soluções empresariais"
        ? `Olá! Gostaria de conhecer as soluções empresariais da Netbox em ${city}.`
        : `Olá! Gostaria de conhecer os planos residenciais da Netbox em ${city}.`,
      { city, type: title, origin: "servicos" },
    );
  }

  function saveConsent(value: "essential" | "all") {
    localStorage.setItem("netbox_cookie_consent", value);
    setCookieOpen(false);
    track("consentimento_cookies", { value });
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header
        className={`model-header${christmasActive || navigationVisible || menuOpen ? "" : " is-hidden"}`}
        data-seasonal-pinned={christmasActive}
      >
        <a
          className="model-brand"
          href="/site"
          aria-label="Netbox Internet — início"
        >
          <img src="/LOGO-NETBOX.png" alt="Netbox Internet" />
        </a>
        <nav
          ref={menuRef}
          id="menu-principal"
          className={menuOpen ? "model-nav open" : "model-nav"}
          aria-label="Navegação principal"
          style={
            {
              "--menu-swipe-offset": `${Math.max(0, menuSwipe.offsetX)}px`,
            } as CSSProperties
          }
          {...menuSwipe.bind}
        >
          <div className="mobile-nav-heading" aria-hidden="true">
            <span>Menu</span>
            <small>Netbox Internet</small>
          </div>
          <a
            href="/site"
            aria-current="page"
            onClick={() => setMenuOpen(false)}
          >
            Início
          </a>
          <a href="/sobre" onClick={() => setMenuOpen(false)}>
            Sobre nós
          </a>
          <a href="/nossos-servicos" onClick={() => setMenuOpen(false)}>
            Serviços
          </a>
          <a href="/nossa-estrutura" onClick={() => setMenuOpen(false)}>
            Nossa estrutura
          </a>
          <a href="/contatos" onClick={() => setMenuOpen(false)}>
            Contatos
          </a>
          <Link href="/site/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <MenuContacts />
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            className={menuOpen ? "model-menu open" : "model-menu"}
            aria-controls="menu-principal"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ChristmasHeroLights />
      </header>
      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
          tabIndex={-1}
        />
      )}

      <main id="conteudo">
        <Hero activeSlide={activeSlide} heroSwipe={heroSwipe} setCarouselInteractionPaused={setCarouselInteractionPaused} moveSlide={moveSlide} setActiveSlide={setActiveSlide} setCarouselPaused={setCarouselPaused} carouselPaused={carouselPaused} />

        <aside
          className="home-contact-strip"
          aria-label="Canais rápidos de atendimento"
        >
          <div className="model-shell">
            <small className="home-contact-strip-title">
              Canais de atendimento
            </small>
            <MenuContacts />
          </div>
        </aside>

        <section className="services-section" id="servicos">
          <div className="model-shell services-layout">
            <div className="service-feature">
              <div className="fiber-pole">
                <video
                  ref={featureVideoRef}
                  className="feature-video"
                  src="/videos/Video-netbox-web.mp4"
                  autoPlay
                  muted={featureVideoMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setFeatureVideoPaused(false)}
                  onPause={() => setFeatureVideoPaused(true)}
                  aria-label="Vídeo sobre a conexão de fibra óptica da Netbox"
                />
              </div>
              <div className="feature-caption">
                <div className="feature-caption-copy">
                  <span>100% fibra óptica</span>
                  <strong>Conexão no seu ritmo.</strong>
                </div>
                <div className="feature-video-controls">
                  <button
                    type="button"
                    onClick={toggleFeatureVideo}
                    aria-label={
                      featureVideoPaused ? "Reproduzir vídeo" : "Pausar vídeo"
                    }
                  >
                    {featureVideoPaused ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFeatureVideoSound}
                    aria-label={
                      featureVideoMuted ? "Ativar som" : "Desativar som"
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 9v6h4l5 4V5L8 9H4z" />
                      {featureVideoMuted ? (
                        <path d="m17 9 4 4m0-4-4 4" className="sound-stroke" />
                      ) : (
                        <path
                          d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
                          className="sound-stroke"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="services-copy">
              <small>Netbox Internet</small>
              <h2>Nossos Serviços</h2>
              <p>
                DIRECIONAR LINK PARA A PAGINA NOSSA ESTRUTURA que precisam
                resolver tudo com praticidade e atendimento próximo.
              </p>
              <div className="services-list">
                {services.map((service) => (
                  <article key={service.title}>
                    <span className="service-thumb" aria-hidden="true">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-thumb-image"
                      />
                    </span>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                    <button
                      onClick={() => handleService(service.title)}
                      aria-label={service.action}
                    >
                      ＋
                    </button>
                  </article>
                ))}
              </div>
              <div className="services-actions">
                <a
                  className="model-button service-glass-button"
                  href="https://netboxfibra.sgp.net.br/accounts/central/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="service-action-icon" aria-hidden="true">
                    <IoDocumentTextOutline />
                  </span>
                  <span>2ª Via do Boleto</span>
                </a>
                <a
                  className="model-button service-glass-button"
                  href="https://site-institucional-net-box-chi.vercel.app/contatos"
                >
                  <span className="service-action-icon" aria-hidden="true">
                    <IoHeadsetOutline />
                  </span>
                  <span>Suporte</span>
                </a>
                <a
                  className="model-button service-glass-button"
                  href="/contatos"
                >
                  <span className="service-action-icon" aria-hidden="true">
                    <IoCallOutline />
                  </span>
                  <span>Contatos</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`nb-featured-plans${selectedFeaturedAudience === "basico" ? " is-basic-audience" : ""}`}
          id="planos-netbox"
          aria-labelledby="nb-featured-title"
        >
          <div className="nb-featured-shell">
            <header className="nb-featured-heading">
              <h2 id="nb-featured-title">Conheça nossos planos</h2>
              <p>
                Consulte os planos de internet residencial e escolha a opção
                ideal para se manter conectado.
              </p>
              <div
                className="nb-featured-audience"
                aria-label="Escolha seu perfil"
              >
                <button
                  type="button"
                  className={`nb-featured-audience-button${selectedFeaturedAudience === "basico" ? " is-selected" : ""}`}
                  aria-pressed={selectedFeaturedAudience === "basico"}
                  onClick={() => {
                    setSelectedFeaturedAudience("basico");
                    setFeaturedPlanIndex(0);
                  }}
                >
                  BÁSICO
                </button>
                <button
                  type="button"
                  className={`nb-featured-audience-button${selectedFeaturedAudience === "familia" ? " is-selected" : ""}`}
                  aria-pressed={selectedFeaturedAudience === "familia"}
                  onClick={() => {
                    setSelectedFeaturedAudience("familia");
                    setFeaturedPlanIndex(0);
                  }}
                >
                  PREMIUM
                </button>
              </div>
            </header>

            <div
              className="nb-featured-stage"
              aria-roledescription="carrossel"
              aria-label={
                selectedFeaturedAudience === "familia"
                  ? "Planos Família Netbox"
                  : "Planos Básicos Netbox"
              }
              {...featuredSwipe.bind}
            >
              <button
                type="button"
                className="nb-featured-arrow nb-featured-arrow-left"
                onClick={() => moveFeaturedPlan(-1)}
                aria-label="Plano anterior"
              >
                <IoChevronBack aria-hidden="true" />
              </button>

              {currentFeaturedPlans.map((plan, index) => {
                const distance =
                  (index - featuredPlanIndex + currentFeaturedPlans.length) %
                  currentFeaturedPlans.length;
                const position =
                  distance === 0
                    ? "active"
                    : distance === 1
                      ? "next"
                      : "previous";
                return (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    position={position}
                    onSelect={() => setFeaturedPlanIndex(index)}
                    onContact={contactFeaturedPlan}
                  />
                );
              })}

              <button
                type="button"
                className="nb-featured-arrow nb-featured-arrow-right"
                onClick={() => moveFeaturedPlan(1)}
                aria-label="Próximo plano"
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>
            <div className="nb-featured-dots" aria-label="Selecionar plano">
              {currentFeaturedPlans.map((plan, index) => (
                <button
                  key={plan.name}
                  type="button"
                  className={index === featuredPlanIndex ? "is-active" : ""}
                  onClick={() => setFeaturedPlanIndex(index)}
                  aria-label={`Mostrar plano ${plan.name}`}
                  aria-current={
                    index === featuredPlanIndex ? "true" : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className="netbox-app-section" id="aplicativo-netbox">
          <div className="model-shell netbox-app-layout">
            <div className="netbox-app-copy">
              <div className="netbox-app-copy-row">
                <span className="netbox-app-icon-glow">
                  <img
                    src="/netbox-app-icon.png"
                    alt="Netbox App"
                    className="netbox-app-icon"
                  />
                </span>
                <div className="netbox-app-copy-text">
                  <small>Controle na palma da mão</small>
                  <h2>Aplicativo Netbox</h2>
                  <p>
                    Consulte faturas, veja o histórico financeiro, solicite
                    suporte e receba notificações pelo celular.
                  </p>

                  <div className="netbox-app-stores">
                    <a
                      className="store-download"
                      href={APP_STORE}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="store-icon store-logo apple"
                        src={APP_STORE_LOGO}
                        alt=""
                      />

                      <div className="store-text">
                        <span>Baixe o App na</span>
                        <strong>App Store</strong>
                      </div>
                    </a>

                    <a
                      className="store-download"
                      href={PLAY_STORE}
                      target="_blank"
                      rel="noreferrer"
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
                </div>
              </div>
            </div>
            <div className="netbox-app-visual">
              <div
                className={`netbox-app-carousel${appSwipe.isDragging ? " is-swiping" : ""}${appCarouselResetting ? " is-resetting" : ""}`}
                onMouseEnter={() => setAppCarouselPaused(true)}
                onMouseLeave={() => setAppCarouselPaused(false)}
                {...appSwipe.bind}
              >
                <div
                  className="netbox-app-carousel-track"
                  style={{
                    width: `${appCarouselSlides.length * 100}%`,
                    transform: `translateX(calc(-${appCarouselIndex * (100 / appCarouselSlides.length)}% + ${appSwipe.offsetX}px))`,
                  }}
                  onTransitionEnd={finishAppCarouselTransition}
                >
                  {appCarouselSlides.map((screen, index) => {
                    const logicalIndex =
                      (index - 1 + appScreens.length) % appScreens.length;
                    return (
                      <div
                        key={`${screen}-${index}`}
                        className={`netbox-app-carousel-item ${index === appCarouselIndex ? "active" : ""}`}
                        role="tabpanel"
                        aria-hidden={index !== appCarouselIndex}
                        style={{
                          flexBasis: `${100 / appCarouselSlides.length}%`,
                          width: `${100 / appCarouselSlides.length}%`,
                        }}
                      >
                        <img
                          src={screen}
                          alt={`Tela do aplicativo Netbox ${logicalIndex + 1}`}
                          loading="eager"
                          fetchPriority={logicalIndex === 0 ? "high" : "auto"}
                          decoding="async"
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="app-carousel-arrow previous"
                  onClick={() => moveAppSlide(-1)}
                  aria-label="Tela anterior"
                >
                  <IoChevronBack aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="app-carousel-arrow next"
                  onClick={() => moveAppSlide(1)}
                  aria-label="Próxima tela"
                >
                  <IoChevronForward aria-hidden="true" />
                </button>
              </div>
              <div
                className="app-carousel-dots"
                aria-label="Navegação de telas"
                role="tablist"
              >
                {appScreens.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === activeAppSlide ? "active" : ""}
                    onClick={() => {
                      setAppCarouselResetting(false);
                      setAppCarouselIndex(index + 1);
                    }}
                    aria-label={`Mostrar tela ${index + 1}`}
                    role="tab"
                    aria-selected={index === activeAppSlide}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <StructureSection id="solucoes" />

        <section className="coverage-conversion-section" id="consulta">
          <div className="model-shell coverage-conversion-layout">
            <div className="coverage-conversion-copy">
              <small>Consulta de cobertura</small>
              <h2>Encontre a Netbox na sua cidade.</h2>
              <p>
                Escolha a cidade, veja o mapa e consulte a disponibilidade pelo
                WhatsApp.
              </p>
            </div>

            <form className="coverage-form" onSubmit={consultCoverage}>
              <label>
                Selecione a cidade
                <select
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    track("selecionou_cidade", { city: event.target.value });
                  }}
                >
                  {cities.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <div className="coverage-map" aria-live="polite">
                <iframe
                  key={city}
                  src={googleMapsEmbedUrl}
                  title={`Mapa da Netbox em ${city}`}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="fullscreen"
                  allowFullScreen
                />
                <span className="coverage-map-touch-hint" aria-hidden="true">
                  Arraste com um dedo para mover e use a pinça para ampliar
                </span>
              </div>
              <div className="coverage-location">
                <div>
                  <small>Endereço da loja</small>
                  <strong>{city}</strong>
                  <p>{selectedStoreAddress}</p>
                </div>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${city} no Google Maps`}
                >
                  Abrir mapa ↗
                </a>
              </div>
              <button className="model-button orange" type="submit">
                Consultar pelo WhatsApp <b>»</b>
              </button>
              <em>Cobertura sujeita à viabilidade técnica.</em>
            </form>
          </div>
        </section>

        <section className="model-cta" id="contato">
          <div className="cta-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="model-shell">
            <h2>Sua conexão pronta para acompanhar você!</h2>
            <p>
              Conte com atendimento regional para consultar cobertura, conhecer
              opções e cuidar da sua assinatura.
            </p>
            <button
              className="model-button white"
              onClick={() => consultCoverage()}
            >
              Falar com um consultor{" "}
              <b>
                <ArrowIcon />
              </b>
            </button>
          </div>
        </section>

        <section className="stats-strip" aria-label="Indicadores confirmados">
          <div className="model-shell">
            <article>
              <small>REDE</small>
              <strong>100%</strong>
              <span>FIBRA ÓPTICA</span>
            </article>
            <article>
              <small>COBERTURA LISTADA EM</small>
              <strong>21</strong>
              <span>CIDADES DO TOCANTINS</span>
            </article>
            <article>
              <small>CENTRAL DE ATENDIMENTO</small>
              <strong className="phone-stat">0800</strong>
              <span>602 2732</span>
            </article>
          </div>
        </section>
      </main>

      {plansOpen && (
        <div
          className="plans-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if(event.target === event.currentTarget) setPlansOpen(false);
          }}
        >
          <section
            ref={plansModalRef}
            className="plans-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plans-modal-title"
            style={{
              translate: `${planSwipe.offsetX * 0.15}px ${Math.max(0, planSwipe.offsetY) * 0.15}px`,
            }}
            {...planSwipe.bind}
          >
            <div className="plans-modal-toolbar">
              <button
                className="plans-modal-close"
                type="button"
                onClick={() => setPlansOpen(false)}
                aria-label="Fechar planos"
              >
                <IoClose aria-hidden="true" />
              </button>
            </div>
            <div className="plans-carousel">
              <h2 id="plans-modal-title" className="sr-only">
                Planos residenciais Netbox
              </h2>
              <div className="plans-carousel-viewport">
                <div className="plans-carousel-track">
                  {residentialPlans.map((plan, index) => {
                    const positionClass = getPlanSlideClass(index);
                    return (
                      <article
                        key={plan.name}
                        className={`residential-plan-slide ${positionClass}`}
                        aria-hidden={index !== activePlan}
                        onClick={() => {
                          if(positionClass === "is-previous") movePlan(-1);
                          if(positionClass === "is-next") movePlan(1);
                        }}
                      >
                        <div className="residential-plan-card">
                          <span className="residential-plan-kicker">
                            Plano residencial
                          </span>
                          <h3>{plan.name}</h3>
                          <ul className="residential-plan-features">
                            {plan.features.map((feature) => (
                              <li key={feature}>
                                <span>✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="residential-plan-subscriptions">
                            <strong>Serviços inclusos</strong>
                            <div className="plan-platforms">
                              {plan.platforms.map((platform) => (
                                <span
                                  key={platform.name}
                                  className={`plan-platform brand-${platform.tone}`}
                                  title={platform.name}
                                  aria-label={platform.name}
                                >
                                  <PlatformLogo platform={platform} />
                                </span>
                              ))}
                            </div>
                            {plan.choiceNote && (
                              <small>{plan.choiceNote}</small>
                            )}
                            {plan.allIncluded && (
                              <small>
                                Todos os serviços apresentados estão inclusos.
                              </small>
                            )}
                            {plan.bonus && (
                              <b className="residential-plan-bonus">
                                {plan.bonus}
                              </b>
                            )}
                          </div>
                          <div className="residential-plan-notes">
                            <small>
                              Consulte disponibilidade, velocidade e condições
                              para seu endereço.
                            </small>
                          </div>
                          <button
                            className="residential-plan-cta"
                            type="button"
                            tabIndex={index === activePlan ? 0 : -1}
                            onClick={() => contactPlan(plan.name)}
                          >
                            Consultar este plano
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
              <button
                className="plans-carousel-arrow previous"
                type="button"
                onClick={() => movePlan(-1)}
                aria-label="Plano anterior"
              >
                <IoChevronBack aria-hidden="true" />
              </button>
              <button
                className="plans-carousel-arrow next"
                type="button"
                onClick={() => movePlan(1)}
                aria-label="Próximo plano"
              >
                <IoChevronForward aria-hidden="true" />
              </button>
            </div>
            <div className="plans-carousel-footer">
              <span>
                {String(activePlan + 1).padStart(2, "0")} /{" "}
                {String(residentialPlans.length).padStart(2, "0")}
              </span>
              <div
                className="plans-carousel-dots"
                role="tablist"
                aria-label="Escolher plano"
              >
                {residentialPlans.map((plan, index) => (
                  <button
                    key={plan.name}
                    type="button"
                    className={index === activePlan ? "active" : ""}
                    onClick={() => setActivePlan(index)}
                    role="tab"
                    aria-selected={index === activePlan}
                    aria-label={`Mostrar plano ${plan.name}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      <HomeFooter onService={handleService} />

      <a
        className={`model-whatsapp${navigationVisible ? " shortcuts-visible" : " is-collapsed"}`}
        tabIndex={navigationVisible ? undefined : -1}
        aria-hidden={!navigationVisible}
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo site da Netbox e gostaria de atendimento em ${city}.`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Netbox pelo WhatsApp"
        onClick={() => track("clicou_whatsapp", { origin: "flutuante", city })}
      >
        <small>WHATSAPP &middot; agora</small>
        <strong>
          <span className="model-whatsapp-icon" aria-hidden="true">
            <img src="/whatsapp-shortcut.png" alt="" />
          </span>
          <span className="model-whatsapp-copy">Fale Conosco</span>
        </strong>
      </a>

      <ClientShortcuts home />

      {cookieOpen && (
        <aside className="cookie-banner" aria-label="Preferências de cookies">
          <div>
            <strong>Sua privacidade importa.</strong>
            <p>
              Usamos cookies essenciais para o funcionamento do site e, com sua
              permissão, dados de navegação para melhorar sua experiência.
            </p>
          </div>
          <div>
            <button
              className="outline-button"
              onClick={() => saveConsent("essential")}
            >
              Somente essenciais
            </button>
            <button
              className="model-button orange"
              onClick={() => saveConsent("all")}
            >
              Aceitar todos
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
