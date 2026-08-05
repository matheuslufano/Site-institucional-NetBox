"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ClientShortcuts } from "./_components/ClientShortcuts";
import { MenuContactLinks } from "./_components/MenuContactLinks";
import { useScrollDirectionVisibility } from "./_components/useScrollDirectionVisibility";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox";
const APP_STORE = "https://apps.apple.com/br/app/netbox/id1574550280";

const storeAddresses: Record<string, string> = {
  "Paraíso do Tocantins - TO": "Rua Bernardino Maciel, 891, Centro - Paraíso do Tocantins/TO",
  "Barrolândia - TO": "Netbox Internet - Barrolândia - Av. Bernardo Sayão, S/N - Centro, Barrolândia - TO, 77665-000",
  "Bom Jesus do Tocantins - TO": "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Brasilândia do Tocantins - TO": "Netbox Internet - Colinas - Av. Pedro Ludovico Teixeira, 1152 - Centro, Colinas do Tocantins - TO, 77760-000",
  "Colinas do Tocantins - TO": "Netbox Internet - Colinas - Av. Pedro Ludovico Teixeira, 1152 - Centro, Colinas do Tocantins - TO, 77760-000",
  "Colméia - TO": "Netbox Internet - Colméia - Av. Longuinho Viêira Júnior, 470 - Centro, Colméia - TO, 77725-000",
  "Goianorte - TO": "Netbox Internet - Goianorte, esquina com a - Avenida Tiradentes, R. Piauí - Centro, Goianorte - TO, 77695-000",
  "Guaraí - TO": "Netbox Internet - Guaraí - Rua Dr Valdir, 1375 - St. Planalto, Guaraí - TO, 77700-000",
  "Gurupi - TO": "Netbox Internet - Gurupi, Esquina com a - Avenida Pará, R. D, Q.11 - LT.01, Gurupi - TO, 77403-010",
  "Itacajá - TO": "NETBOX INTERNET - ITACAJÁ - Av. Pres. Dutra, 435 - Cartucho - Centro, Itacajá - TO, 77720-000",
  "Lajeado - TO": "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Miracema - TO": "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Miranorte - TO": "Netbox Internet - Miranorte - Av. Tocantins, 812 - Centro, Miranorte - TO, 77660-000",
  "Pedro Afonso - TO": "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Presidente Kennedy - TO": "Netbox Internet - Presidente Kennedy - Av. Tocantins, 681 - Centro, Pres. Kennedy - TO, 77745-000",
  "Rio dos Bois - TO": "Netbox Internet - Miranorte - Av. Tocantins, 812 - Centro, Miranorte - TO, 77660-000",
  "Santa Maria do Tocantins - TO": "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Tabocão - TO": "Netbox Internet - Fortaleza do Tabocão - R. Amazonas, 112 - CENTRO, Tabocão - TO, 77708-000",
  "Tocantínia - TO": "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Tupirama - TO": "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
};

const cities = Object.keys(storeAddresses);
const DEFAULT_CITY = "Paraíso do Tocantins - TO";

const services = [
  {
    icon: "⌁",
    title: "Internet Fibra Residencial",
    text: "Internet rápida e estável para estudar, trabalhar, jogar e assistir aos seus conteúdos favoritos.",
    action: "Consultar opções residenciais",
  },
  {
    icon: "▦",
    title: "Conteúdo e entretenimento",
    text: "Internet empresarial, link dedicado e atendimento personalizado.",
    action: "Solicitar proposta empresarial",
  },
  {
    icon: "◉",
    title: "Atendimento ao cliente",
    text: "Segunda via, aplicativo, suporte técnico e Central do Assinante.",
    action: "Acessar atendimento",
  },
];

const residentialPlans = [
  {
    name: "Básico",
    features: [
      "Entrega da velocidade contratada",
      "Desconto para pagamento com pontualidade",
      "Roteador em comodato",
      "Suporte premium 7 dias por semana",
    ],
    platforms: [
      { name: "Ubook Go", tone: "ubook" },
      { name: "App Netbox", tone: "netbox" },
    ],
    bonus: "Indique, fechou, ganhou!",
  },
  {
    name: "Essencial",
    features: [
      "Entrega da velocidade contratada",
      "Desconto para pagamento com pontualidade",
      "Roteador em comodato",
      "Suporte premium 7 dias por semana",
    ],
    platforms: [
      { name: "Ubook Go", tone: "ubook" },
      { name: "App Netbox", tone: "netbox" },
      { name: "Deezer Premium", tone: "deezer" },
      { name: "Prime Video", tone: "prime" },
    ],
    choiceNote: "Você pode optar por Deezer Premium ou Prime Video.",
  },
  {
    name: "Família",
    features: [
      "Entrega da velocidade contratada",
      "Desconto para pagamento com pontualidade",
      "Roteadores em comodato",
      "Suporte premium 7 dias por semana",
      "Instalação prioritária",
    ],
    platforms: [
      { name: "Ubook Go", tone: "ubook" },
      { name: "App Netbox", tone: "netbox" },
      { name: "Deezer Premium", tone: "deezer" },
      { name: "Prime Video", tone: "prime" },
    ],
    allIncluded: true,
  },
  {
    name: "Top Família",
    features: [
      "Entrega da velocidade contratada",
      "Desconto para pagamento com pontualidade",
      "Roteador em comodato",
      "Suporte premium 7 dias por semana",
      "Instalação prioritária",
    ],
    platforms: [
      { name: "Ubook Go", tone: "ubook" },
      { name: "App Netbox", tone: "netbox" },
      { name: "HBO Max", tone: "hbo" },
      { name: "Disney+", tone: "disney" },
    ],
    choiceNote: "Você pode optar por HBO Max ou Disney+.",
  },
];

const gallery = [
  ["01", "Fibra residencial", "Conexão para a rotina da sua casa.", "/solutions/fibra-residencial.png", "Casal usando a internet Netbox em casa"],
  ["02", "Casa conectada", "Mais dispositivos com estabilidade.", "/solutions/casa-conectada.png", "Dispositivos conectados à rede de uma residência"],
  ["03", "Netbox Empresas", "Soluções para negócios que não podem parar.", "/solutions/netbox-empresas.png", "Equipe trabalhando conectada em uma empresa"],
  ["04", "Link dedicado", "Desempenho personalizado para sua operação.", "/solutions/link-dedicado.png", "Equipamentos de rede conectados por fibra óptica"],
  ["05", "Aplicativo Netbox", "Serviços e faturas na palma da mão.", "/solutions/aplicativo-netbox.png", "Aplicativo Netbox sendo usado em um celular"],
  ["06", "Suporte regional", "Atendimento feito por quem está perto.", "/solutions/suporte-regional.png", "Atendente Netbox auxiliando um cliente"],
  ["07", "Lojas Netbox", "Presença em cidades do Tocantins.", "/solutions/lojas-netbox.png", "Cliente chegando a uma loja Netbox"],
  ["08", "Instalação agendada", "Consulta técnica e próximos passos pelo WhatsApp.", "/solutions/instalacao-agendada.png", "Técnico instalando fibra óptica em uma residência"],
];

const heroSlides = [
  {
    kicker: "Conexão que acompanha o Tocantins",
    title: "Internet para aproximar pessoas, cidades e oportunidades.",
    text: "Uma rede regional preparada para conectar sua casa ou empresa com estabilidade e atendimento próximo.",
    action: "Consultar cobertura",
    href: "#consulta",
    image: "/carousel/slide-01.jpg",
    side: "left",
  },
  {
    kicker: "Presença regional",
    title: "Mais cidades conectadas por uma rede que está perto de você.",
    text: "Conheça a estrutura da Netbox e nossa atuação em diferentes municípios do Tocantins.",
    action: "Conhecer nossa estrutura",
    href: "/nossa-estrutura",
    image: "/carousel/slide-02.jpg",
    side: "right",
  },
  {
    kicker: "Tudo mais simples para o cliente",
    title: "Sua assinatura Netbox na palma da mão.",
    text: "Consulte faturas, emita segunda via, solicite suporte e acesse serviços pelos canais digitais da Netbox.",
    action: "Acessar Central do Assinante",
    href: SECOND_COPY,
    image: "/carousel/slide-03.jpg",
    side: "left",
  },
  {
    kicker: "Compartilhe uma boa conexão",
    title: "Indique a Netbox para quem também quer internet de verdade.",
    text: "Fale com nossa equipe para conhecer as condições vigentes do programa de indicação.",
    action: "Quero indicar alguém",
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero conhecer o programa de indicação da Netbox.")}`,
    image: "/carousel/slide-04.jpg",
    side: "left",
  },
  {
    kicker: "Conexão para todos",
    title: "Uma internet que acompanha toda a família.",
    text: "Trabalho, estudo, entretenimento e vários dispositivos conectados em uma única experiência.",
    action: "Encontrar a melhor opção",
    href: "#consulta",
    image: "/carousel/slide-05.jpg",
    side: "left",
  },
  {
    kicker: "Rede construída por quem entende",
    title: "Infraestrutura preparada para levar fibra até você.",
    text: "Equipe técnica regional e expansão contínua para oferecer uma conexão cada vez mais presente.",
    action: "Ver nossa estrutura",
    href: "/nossa-estrutura",
    image: "/carousel/slide-06.jpg",
    side: "left",
  },
  {
    kicker: "Instalação e suporte",
    title: "Atendimento técnico cuidadoso, do início ao pós-venda.",
    text: "Conte com profissionais preparados para instalar, orientar e ajudar quando você precisar.",
    action: "Falar com a Netbox",
    href: "/contatos",
    image: "/carousel/slide-07.jpg",
    side: "right",
  },
  {
    kicker: "Tecnologia que faz diferença",
    title: "Fibra óptica para uma experiência mais estável.",
    text: "Conheça as soluções Netbox para residências e empresas que precisam estar sempre conectadas.",
    action: "Conhecer os serviços",
    href: "/nossos-servicos",
    image: "/carousel/slide-08.jpg",
    side: "left",
  },
  {
    kicker: "Netbox Empresas",
    title: "Soluções para negócios que não podem parar.",
    text: "Internet empresarial, link dedicado e atendimento personalizado para as necessidades da sua operação.",
    action: "Ver soluções empresariais",
    href: "/nossos-servicos#empresas",
    image: "/carousel/slide-09.jpg",
    side: "right",
  },
  {
    kicker: "Atendimento humanizado",
    title: "Canais digitais e pessoas prontas para atender você.",
    text: "Encontre suporte, informações e soluções com uma equipe que conhece a realidade da região.",
    action: "Conhecer os canais",
    href: "/contatos",
    image: "/carousel/slide-10.jpg",
    side: "left",
  },
];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

function openWhatsApp(message: string, context: Record<string, unknown>) {
  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    page: window.location.pathname,
    utm: Object.fromEntries(new URLSearchParams(window.location.search)),
    ...context,
  };
  const saved = JSON.parse(localStorage.getItem("netbox_leads") || "[]");
  localStorage.setItem("netbox_leads", JSON.stringify([...saved.slice(-19), lead]));
  track("lead_criado", lead);
  track("clicou_whatsapp", context);
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export default function Home() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSolution, setActiveSolution] = useState<number | null>(null);
  const [plansOpen, setPlansOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [featureVideoPaused, setFeatureVideoPaused] = useState(false);
  const [featureVideoMuted, setFeatureVideoMuted] = useState(true);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const planTouchStart = useRef<number | null>(null);
  const navigationVisible = useScrollDirectionVisibility();
  const selectedStoreAddress = storeAddresses[city] ?? storeAddresses[DEFAULT_CITY];
  const selectedMapLocation = selectedStoreAddress;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(selectedMapLocation)}&z=16&output=embed`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation)}`;
  const activeSolutionData = activeSolution === null ? null : gallery[activeSolution];

  useEffect(() => {
    setCookieOpen(!localStorage.getItem("netbox_cookie_consent"));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (activeSolution === null) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSolution(null);
      if (event.key === "ArrowLeft") {
        setActiveSolution((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
      }
      if (event.key === "ArrowRight") {
        setActiveSolution((current) => current === null ? null : (current + 1) % gallery.length);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeSolution]);

  useEffect(() => {
    if (!plansOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const handlePlansKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlansOpen(false);
      if (event.key === "ArrowLeft") {
        setActivePlan((current) => (current - 1 + residentialPlans.length) % residentialPlans.length);
      }
      if (event.key === "ArrowRight") {
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (carouselPaused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  function moveSlide(direction: number) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  function movePlan(direction: number) {
    setActivePlan((current) => (current + direction + residentialPlans.length) % residentialPlans.length);
  }

  function openResidentialPlans() {
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

  function toggleFeatureVideo() {
    const video = featureVideoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function toggleFeatureVideoSound() {
    const video = featureVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setFeatureVideoMuted(video.muted);
  }

  function consultCoverage(event?: FormEvent) {
    event?.preventDefault();
    track("consultou_cobertura", { city });
    openWhatsApp(
      `Olá! Quero consultar a cobertura da Netbox em ${city}.`,
      { city, type: "residencial", origin: "consulta_cobertura" },
    );
  }

  function handleService(title: string) {
    if (title.toLocaleLowerCase("pt-BR").includes("residencial")) {
      openResidentialPlans();
      return;
    }
    if (title === "Atendimento ao cliente") {
      document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
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
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <header className={`model-header${navigationVisible || menuOpen ? "" : " is-hidden"}`}>
        <a className="model-brand" href="/" aria-label="Netbox Internet — início">
          <img src="/LOGO-NETBOX.png" alt="Netbox Internet" />
        </a>
        <nav id="menu-principal" className={menuOpen ? "model-nav open" : "model-nav"} aria-label="Navegação principal">
          <div className="mobile-nav-heading" aria-hidden="true">
            <span>Menu</span>
            <small>Netbox Internet</small>
          </div>
          <a href="/" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a>
          <a href="/nossos-servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="/nossa-estrutura" onClick={() => setMenuOpen(false)}>Nossa estrutura</a>
          <a href="/depoimentos" onClick={() => setMenuOpen(false)}>Depoimentos</a>
          <a href="/contatos" onClick={() => setMenuOpen(false)}>Contatos</a>
          <MenuContactLinks />
        </nav>
        <button
          className={menuOpen ? "model-menu open" : "model-menu"}
          aria-controls="menu-principal"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
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
        <section
          className={`model-hero copy-${heroSlides[activeSlide].side}`}
          id="inicio"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Destaques Netbox"
          tabIndex={0}
          onMouseEnter={() => setCarouselPaused(true)}
          onMouseLeave={() => setCarouselPaused(false)}
          onFocusCapture={() => setCarouselPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setCarouselPaused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") moveSlide(-1);
            if (event.key === "ArrowRight") moveSlide(1);
          }}
        >
          <div
            className="hero-slide-background"
            key={heroSlides[activeSlide].image}
            style={{ backgroundImage: `url(${heroSlides[activeSlide].image})` }}
            aria-hidden="true"
          />
          <div className="hero-network" aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </div>
          <div className="model-shell hero-inner carousel-only">
            <div className="model-hero-copy" key={activeSlide} aria-live="polite" aria-atomic="true">
              <span>{heroSlides[activeSlide].kicker}</span>
              <h1>{heroSlides[activeSlide].title}</h1>
              <p>{heroSlides[activeSlide].text}</p>
              <a
                className="model-button hero-primary"
                href={heroSlides[activeSlide].href}
                target={heroSlides[activeSlide].href.startsWith("http") ? "_blank" : undefined}
                rel={heroSlides[activeSlide].href.startsWith("http") ? "noreferrer" : undefined}
              >
                {heroSlides[activeSlide].action} <b>»</b>
              </a>
            </div>

          </div>
          <button className="hero-arrow left" type="button" onClick={() => moveSlide(-1)} aria-label="Mostrar destaque anterior">‹</button>
          <button className="hero-arrow right" type="button" onClick={() => moveSlide(1)} aria-label="Mostrar próximo destaque">›</button>
          <div className="carousel-controls">
            <span className="carousel-count" aria-live="polite" aria-atomic="true">
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
                  aria-label={`Mostrar destaque ${index + 1}: ${slide.kicker}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                />
              ))}
            </div>
            <button
              className="carousel-pause"
              type="button"
              onClick={() => setCarouselPaused(!carouselPaused)}
              aria-label={carouselPaused ? "Retomar rotação automática" : "Pausar rotação automática"}
            >
              {carouselPaused ? "▶" : "Ⅱ"}
            </button>
          </div>
        </section>

        <section className="services-section" id="servicos">
          <div className="model-shell services-layout">
            <div className="service-feature">
              <div className="fiber-pole">
                <video
                  ref={featureVideoRef}
                  className="feature-video"
                  src="/videos/Video-netbox.mp4"
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
                    aria-label={featureVideoPaused ? "Reproduzir vídeo" : "Pausar vídeo"}
                  >
                    {featureVideoPaused ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z" /></svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFeatureVideoSound}
                    aria-label={featureVideoMuted ? "Ativar som" : "Desativar som"}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 9v6h4l5 4V5L8 9H4z" />
                      {featureVideoMuted ? <path d="m17 9 4 4m0-4-4 4" className="sound-stroke" /> : <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" className="sound-stroke" />}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="services-copy">
              <small>Netbox Internet</small>
              <h2>Nossos Serviços</h2>
              <p>
                Soluções para residências, empresas e clientes que precisam resolver tudo
                com praticidade e atendimento próximo.
              </p>
              <div className="services-list">
                {services.map((service) => (
                  <article key={service.title}>
                    <span className="service-thumb" aria-hidden="true">{service.icon}</span>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                    <button onClick={() => handleService(service.title)} aria-label={service.action}>＋</button>
                  </article>
                ))}
              </div>
              <a className="model-button yellow" href="#solucoes">Todas as soluções <b>»</b></a>
            </div>
          </div>
        </section>

        {plansOpen && (
          <div className="plans-modal-backdrop" onMouseDown={() => setPlansOpen(false)}>
            <section
              className="plans-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Planos residenciais Netbox"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="plans-modal-toolbar">
                <button
                  type="button"
                  className="plans-modal-close"
                  onClick={() => setPlansOpen(false)}
                  aria-label="Fechar planos residenciais"
                  autoFocus
                >
                  ×
                </button>
              </div>

              <div
                className="plans-carousel"
                onTouchStart={(event) => {
                  planTouchStart.current = event.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  if (planTouchStart.current === null) return;
                  const distance = (event.changedTouches[0]?.clientX ?? planTouchStart.current) - planTouchStart.current;
                  if (Math.abs(distance) > 45) movePlan(distance > 0 ? -1 : 1);
                  planTouchStart.current = null;
                }}
              >
                <button
                  type="button"
                  className="plans-carousel-arrow previous"
                  onClick={() => movePlan(-1)}
                  aria-label="Plano anterior"
                >
                  ‹
                </button>

                <div className="plans-carousel-viewport">
                  <div className="plans-carousel-track">
                    {residentialPlans.map((plan, index) => {
                      const position = index === activePlan
                        ? "is-active"
                        : index === (activePlan - 1 + residentialPlans.length) % residentialPlans.length
                          ? "is-previous"
                          : index === (activePlan + 1) % residentialPlans.length
                            ? "is-next"
                            : "is-far";

                      return (
                        <article
                          className={`residential-plan-slide ${position}`}
                          key={plan.name}
                          aria-hidden={index !== activePlan}
                          onClick={() => {
                            if (index !== activePlan) setActivePlan(index);
                          }}
                        >
                        <div className="residential-plan-card">
                          <div className="residential-plan-kicker">Plano Netbox</div>
                          <h3>{plan.name}</h3>

                          <ul className="residential-plan-features">
                            {plan.features.map((feature) => (
                              <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                            ))}
                          </ul>

                          <div className="residential-plan-subscriptions">
                            <strong>
                              {plan.allIncluded
                                ? "Assinatura inclui todas as plataformas"
                                : "Assinatura inclusa"}
                            </strong>
                            <div className="plan-platforms">
                              {plan.platforms.map((platform) => (
                                <span className={`plan-platform brand-${platform.tone}`} key={platform.name}>
                                  {platform.name}
                                </span>
                              ))}
                            </div>
                            {plan.choiceNote && <small>{plan.choiceNote}</small>}
                            {plan.bonus && <b className="residential-plan-bonus">{plan.bonus}</b>}
                          </div>

                          <div className="residential-plan-notes">
                            <small>Consulte a disponibilidade na sua região.</small>
                            <small>* Taxa de ativação. Consulte condições.</small>
                          </div>

                          <button
                            type="button"
                            className="residential-plan-cta"
                            onClick={() => contactPlan(plan.name)}
                            tabIndex={index === activePlan ? 0 : -1}
                          >
                            Assine já pelo WhatsApp
                          </button>
                        </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  className="plans-carousel-arrow next"
                  onClick={() => movePlan(1)}
                  aria-label="Próximo plano"
                >
                  ›
                </button>
              </div>

              <footer className="plans-carousel-footer">
                <span>{String(activePlan + 1).padStart(2, "0")} / {String(residentialPlans.length).padStart(2, "0")}</span>
                <div className="plans-carousel-dots" aria-label="Selecionar plano">
                  {residentialPlans.map((plan, index) => (
                    <button
                      type="button"
                      className={index === activePlan ? "active" : ""}
                      onClick={() => setActivePlan(index)}
                      aria-label={`Ver plano ${plan.name}`}
                      aria-current={index === activePlan ? "true" : undefined}
                      key={plan.name}
                    />
                  ))}
                </div>
              </footer>
            </section>
          </div>
        )}

        <section className="gallery-section" id="solucoes">
          <div className="model-shell">
            <div className="model-heading">
              <h2>Nossas Soluções e Presença</h2>
              <p>
                Uma estrutura regional para conectar casas e empresas com fibra óptica,
                canais digitais e atendimento nas cidades.
              </p>
            </div>
            <div className="solution-gallery">
              {gallery.map(([number, title, text, image, alt], index) => (
                <button
                  className={`solution-card card-${index + 1}`}
                  key={title}
                  type="button"
                  onClick={() => setActiveSolution(index)}
                  aria-label={`Abrir detalhes de ${title}`}
                >
                  <div className="solution-art">
                    <img src={image} alt={alt} loading="lazy" decoding="async" />
                    <span>{number}</span>
                  </div>
                  <div className="solution-overlay">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeSolutionData && activeSolution !== null && (
          <div
            className="solution-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveSolution(null);
            }}
          >
            <section
              className="solution-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="solution-modal-title"
            >
              <button
                className="solution-modal-close"
                type="button"
                onClick={() => setActiveSolution(null)}
                aria-label="Fechar detalhes do serviço"
                autoFocus
              >
                ×
              </button>
              <div className="solution-modal-image">
                <img src={activeSolutionData[3]} alt={activeSolutionData[4]} />
                <button
                  className="solution-modal-arrow previous"
                  type="button"
                  onClick={() => setActiveSolution((activeSolution - 1 + gallery.length) % gallery.length)}
                  aria-label="Mostrar solução anterior"
                >
                  ‹
                </button>
                <button
                  className="solution-modal-arrow next"
                  type="button"
                  onClick={() => setActiveSolution((activeSolution + 1) % gallery.length)}
                  aria-label="Mostrar próxima solução"
                >
                  ›
                </button>
              </div>
              <div className="solution-modal-copy">
                <span>{activeSolutionData[0]} / {String(gallery.length).padStart(2, "0")}</span>
                <h3 id="solution-modal-title">{activeSolutionData[1]}</h3>
                <p>{activeSolutionData[2]}</p>
              </div>
            </section>
          </div>
        )}

        <section className="coverage-conversion-section" id="consulta">
          <div className="model-shell coverage-conversion-layout">
            <div className="coverage-conversion-copy">
              <small>Consulta de cobertura</small>
              <h2>Encontre a Netbox na sua cidade.</h2>
              <p>
                Escolha a cidade, veja o mapa e consulte a disponibilidade pelo WhatsApp.
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
                  {cities.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <div className="coverage-map" aria-live="polite">
                <iframe
                  key={city}
                  src={googleMapsEmbedUrl}
                  title={`Mapa da Netbox em ${city}`}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="coverage-location">
                <div>
                  <small>Endereço da loja</small>
                  <strong>{city}</strong>
                  <p>{selectedStoreAddress}</p>
                </div>
                <a href={googleMapsLink} target="_blank" rel="noreferrer" aria-label={`Abrir ${city} no Google Maps`}>
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
          <div className="cta-lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="model-shell">
            <h2>Sua conexão pronta para acompanhar você!</h2>
            <p>
              Conte com atendimento regional para consultar cobertura, conhecer opções
              e cuidar da sua assinatura.
            </p>
            <button className="model-button white" onClick={() => consultCoverage()}>
              Falar com um consultor <b>→</b>
            </button>
          </div>
        </section>

        <section className="stats-strip" aria-label="Indicadores confirmados">
          <div className="model-shell">
            <article><small>REDE</small><strong>100%</strong><span>FIBRA ÓPTICA</span></article>
            <article><small>COBERTURA LISTADA EM</small><strong>17</strong><span>CIDADES DO TOCANTINS</span></article>
            <article><small>CENTRAL DE ATENDIMENTO</small><strong className="phone-stat">0800</strong><span>602 2732</span></article>
          </div>
        </section>
      </main>

      <footer className="model-footer">
        <div className="model-shell footer-main">
          <div className="footer-services">
            {services.map((service) => (
              <button key={service.title} onClick={() => handleService(service.title)}>
                <span>{service.icon}</span>
                <div><strong>{service.title} →</strong><small>{service.text}</small></div>
              </button>
            ))}
            <a className="footer-pill" href="/nossos-servicos">Todos os serviços →</a>
          </div>

          <div className="footer-about">
            <img src="/logo-branca-1024x371.png" alt="Netbox Internet" />
            <p>
              Fibra óptica, presença regional e atendimento humanizado para conectar
              casas e empresas no Tocantins.
            </p>
            <a className="model-button yellow" href="/sobre">Mais sobre a Netbox →</a>
          </div>

          <div className="footer-contact">
            <div className="footer-visual" aria-hidden="true"><span>NET</span><strong>BOX</strong><i>⌁</i></div>
            <div className="social-row"><span>◎</span><span>◉</span><span>▶</span></div>
            <a href="tel:08006022732">☎ 0800 602 2732</a>
            <a href={SECOND_COPY} target="_blank" rel="noreferrer">2ª via de boleto</a>
            <a href={PLAY_STORE} target="_blank" rel="noreferrer">Google Play</a>
            <a href={APP_STORE} target="_blank" rel="noreferrer">App Store</a>
          </div>
        </div>
        <div className="model-shell footer-bottom">
          <span>© {new Date().getFullYear()} Netbox Internet LTDA • CNPJ 25.356.470/0001-13</span>
          <span>
            <a href="https://netbox.net.br/ouvidoria/">Ouvidoria</a> •{" "}
            <a href="https://netbox.net.br/politica-de-privacidade/">Privacidade</a>
          </span>
        </div>
      </footer>

      <a
        className={`model-whatsapp${navigationVisible ? " shortcuts-visible" : ""}`}
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo site da Netbox e gostaria de atendimento em ${city}.`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Netbox pelo WhatsApp"
        onClick={() => track("clicou_whatsapp", { origin: "flutuante", city })}
      >
        <small>Atendimento agora!</small>
        <strong>
          <img src="/whatsapp-floating.png" alt="" aria-hidden="true" />
          <span>Fale Conosco</span>
        </strong>
      </a>

      <ClientShortcuts home />

      {cookieOpen && (
        <aside className="cookie-banner" aria-label="Preferências de cookies">
          <div>
            <strong>Sua privacidade importa.</strong>
            <p>
              Usamos cookies essenciais para o funcionamento do site e, com sua permissão,
              dados de navegação para melhorar sua experiência.
            </p>
          </div>
          <div>
            <button className="outline-button" onClick={() => saveConsent("essential")}>Somente essenciais</button>
            <button className="model-button orange" onClick={() => saveConsent("all")}>Aceitar todos</button>
          </div>
        </aside>
      )}
    </>
  );
}
