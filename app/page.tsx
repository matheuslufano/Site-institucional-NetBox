"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox";
const APP_STORE = "https://apps.apple.com/br/app/netbox/id1574550280";

const cities = [
  "Paraíso do Tocantins",
  "Barrolândia",
  "Brasilândia do Tocantins",
  "Colinas do Tocantins",
  "Colméia",
  "Goianorte",
  "Guaraí",
  "Itacajá",
  "Lajeado",
  "Miracema",
  "Miranorte",
  "Pedro Afonso",
  "Presidente Kennedy",
  "Rio dos Bois",
  "Santa Maria do Tocantins",
  "Tabocão",
  "Tocantínia",
];

const services = [
  {
    icon: "⌁",
    title: "Internet residencial",
    text: "Fibra óptica para conectar sua casa, sua rotina e tudo o que importa.",
    action: "Consultar opções residenciais",
  },
  {
    icon: "▦",
    title: "Soluções empresariais",
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

const gallery = [
  ["01", "Fibra residencial", "Conexão para a rotina da sua casa."],
  ["02", "Casa conectada", "Mais dispositivos com estabilidade."],
  ["03", "Netbox Empresas", "Soluções para negócios que não podem parar."],
  ["04", "Link dedicado", "Desempenho personalizado para sua operação."],
  ["05", "Aplicativo Netbox", "Serviços e faturas na palma da mão."],
  ["06", "Suporte regional", "Atendimento feito por quem está perto."],
  ["07", "Lojas Netbox", "Presença em cidades do Tocantins."],
  ["08", "Instalação agendada", "Consulta técnica e próximos passos pelo WhatsApp."],
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
  const [city, setCity] = useState("Paraíso do Tocantins");
  const [address, setAddress] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [featureVideoPaused, setFeatureVideoPaused] = useState(false);
  const [featureVideoMuted, setFeatureVideoMuted] = useState(true);
  const featureVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCookieOpen(!localStorage.getItem("netbox_cookie_consent"));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

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
    track("consultou_cobertura", { city, address });
    openWhatsApp(
      `Olá! Quero consultar a cobertura da Netbox em ${city}${address ? `, na região de ${address}` : ""}.`,
      { city, address, type: "residencial", origin: "consulta_cobertura" },
    );
  }

  function handleService(title: string) {
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

      <header className="model-header">
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
          <a className="nav-icon" href="mailto:atendimento@netbox.net.br" aria-label="Enviar e-mail">✉</a>
          <a className="nav-icon" href={`https://wa.me/${WHATSAPP}`} aria-label="Abrir WhatsApp">◔</a>
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
                className="model-button yellow"
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
          <div className="carousel-controls" aria-label="Escolher destaque">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Mostrar destaque ${index + 1}: ${slide.kicker}`}
                aria-current={index === activeSlide ? "true" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
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
              {gallery.map(([number, title, text], index) => (
                <article className={`solution-card card-${index + 1}`} key={title}>
                  <div className="solution-art" aria-hidden="true">
                    <span>{number}</span>
                    <i /><i /><i />
                  </div>
                  <div className="solution-overlay">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="coverage-conversion-section" id="consulta">
          <div className="model-shell coverage-conversion-layout">
            <div className="coverage-conversion-copy">
              <small>Consulta de cobertura</small>
              <h2>A Netbox chega até você?</h2>
              <p>
                Informe sua cidade e a região do endereço. A equipe confirma a
                disponibilidade e apresenta as opções vigentes pelo WhatsApp.
              </p>
              <div className="coverage-highlights">
                <span><i>01</i> Selecione sua cidade</span>
                <span><i>02</i> Informe o endereço</span>
                <span><i>03</i> Converse com o consultor</span>
              </div>
            </div>

            <form className="coverage-form" onSubmit={consultCoverage}>
              <span>Consulte seu endereço</span>
              <label>
                Cidade
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
              <label>
                CEP, bairro ou endereço
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Ex.: Centro ou 77600-000"
                />
              </label>
              <button className="model-button orange" type="submit">
                Consultar pelo WhatsApp <b>»</b>
              </button>
              <em>Consulta sujeita à viabilidade técnica do endereço.</em>
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
        className="model-whatsapp"
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo site da Netbox e gostaria de atendimento em ${city}.`)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("clicou_whatsapp", { origin: "flutuante", city })}
      >
        <small>Atendimento agora!</small>
        <strong>◔ Fale Conosco</strong>
      </a>

      <div className="client-shortcuts">
        <a href={SECOND_COPY} target="_blank" rel="noreferrer">
          <span className="shortcut-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M7 3.5h8l3 3V20.5H7z" /><path d="M15 3.5v4h3M10 11h5M10 14.5h5" /></svg>
          </span>
          <span className="shortcut-label">2ª via</span>
        </a>
        <a href="#servicos">
          <span className="shortcut-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 16.5a10 10 0 0 1 14 0M8 13a6 6 0 0 1 8 0M11 9.5a2 2 0 0 1 2 0" /><circle cx="12" cy="18.5" r="1" /></svg>
          </span>
          <span className="shortcut-label">Serviços</span>
        </a>
        <a href="#consulta">
          <span className="shortcut-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" /></svg>
          </span>
          <span className="shortcut-label">Cobertura</span>
        </a>
        <a href={`https://wa.me/${WHATSAPP}`}>
          <span className="shortcut-icon whatsapp-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4A8 8 0 1 1 20 11.5z" /><path d="M9 8.3c.4 2.7 2 4.3 4.7 5.3l1.2-1.2 2 .9c-.4 1.6-1.5 2.4-3 2.2-3.9-.6-6.8-3.5-7.4-7.4-.2-1.4.6-2.6 2.2-3l.9 2z" /></svg>
          </span>
          <span className="shortcut-label">WhatsApp</span>
        </a>
      </div>

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
