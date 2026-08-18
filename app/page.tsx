"use client";

import {
  type CSSProperties,
  FormEvent,
  type TransitionEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClientShortcuts } from "./_components/ClientShortcuts";
import { ArrowIcon } from "./_components/ArrowIcon";
import { MenuContactLinks } from "./_components/MenuContactLinks";
import { ThemeToggle } from "./_components/ThemeToggle";
import { useScrollDirectionVisibility } from "./_components/useScrollDirectionVisibility";
import { useFocusTrap } from "./_components/useFocusTrap";
import { useSwipeGesture } from "./_components/useSwipeGesture";
import { FaApple } from "react-icons/fa";
import {
  IoBookOutline,
  IoCallOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoDocumentTextOutline,
  IoHeadsetOutline,
  IoPause,
  IoPlay,
} from "react-icons/io5";
import { SiDeezer, SiGoogleplay, SiHbomax } from "react-icons/si";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox";
const APP_STORE = "https://apps.apple.com/br/app/netbox/id1574550280";

type PlanPlatform = { name: string; tone: string };

function PlatformLogo({ platform }: { platform: PlanPlatform }) {
  if (platform.tone === "netbox") {
    return (
      <>
        <img src="/netbox-app-icon.png" alt="" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "deezer") {
    return (
      <>
        <SiDeezer aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "hbo") {
    return (
      <>
        <SiHbomax aria-hidden="true" />
        <span className="sr-only">{platform.name}</span>
      </>
    );
  }
  if (platform.tone === "ubook") {
    return (
      <span className="platform-wordmark ubook-wordmark">
        <IoBookOutline aria-hidden="true" />
        <b>ubook</b>
        <small>GO</small>
        <span className="sr-only">{platform.name}</span>
      </span>
    );
  }
  if (platform.tone === "prime") {
    return (
      <span className="platform-wordmark prime-wordmark">
        <b>prime</b>
        <small>video</small>
        <svg viewBox="0 0 36 8" aria-hidden="true">
          <path d="M2 1.5c8 5.5 20 6 30 .7" />
          <path d="m28 1 4 1-2 3" />
        </svg>
        <span className="sr-only">{platform.name}</span>
      </span>
    );
  }
  return (
    <span className="platform-wordmark disney-wordmark">
      <b>Disney</b>
      <small>+</small>
      <span className="sr-only">{platform.name}</span>
    </span>
  );
}

const storeAddresses: Record<string, string> = {
  "Paraíso do Tocantins - TO":
    "Rua Bernardino Maciel, 891, Centro - Paraíso do Tocantins/TO",
  "Barrolândia - TO":
    "Netbox Internet - Barrolândia - Av. Bernardo Sayão, S/N - Centro, Barrolândia - TO, 77665-000",
  "Bom Jesus do Tocantins - TO":
    "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Brasilândia do Tocantins - TO":
    "Netbox Internet - Colinas - Av. Pedro Ludovico Teixeira, 1152 - Centro, Colinas do Tocantins - TO, 77760-000",
  "Colinas do Tocantins - TO":
    "Netbox Internet - Colinas - Av. Pedro Ludovico Teixeira, 1152 - Centro, Colinas do Tocantins - TO, 77760-000",
  "Colméia - TO":
    "Netbox Internet - Colméia - Av. Longuinho Viêira Júnior, 470 - Centro, Colméia - TO, 77725-000",
  "Goianorte - TO":
    "Netbox Internet - Goianorte, esquina com a - Avenida Tiradentes, R. Piauí - Centro, Goianorte - TO, 77695-000",
  "Guaraí - TO":
    "Netbox Internet - Guaraí - Rua Dr Valdir, 1375 - St. Planalto, Guaraí - TO, 77700-000",
  "Gurupi - TO":
    "Netbox Internet - Gurupi, Esquina com a - Avenida Pará, R. D, Q.11 - LT.01, Gurupi - TO, 77403-010",
  "Itacajá - TO":
    "NETBOX INTERNET - ITACAJÁ - Av. Pres. Dutra, 435 - Cartucho - Centro, Itacajá - TO, 77720-000",
  "Lajeado - TO":
    "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Miracema - TO":
    "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Miranorte - TO":
    "Netbox Internet - Miranorte - Av. Tocantins, 812 - Centro, Miranorte - TO, 77660-000",
  "Pedro Afonso - TO":
    "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Presidente Kennedy - TO":
    "Netbox Internet - Presidente Kennedy - Av. Tocantins, 681 - Centro, Pres. Kennedy - TO, 77745-000",
  "Rio dos Bois - TO":
    "Netbox Internet - Miranorte - Av. Tocantins, 812 - Centro, Miranorte - TO, 77660-000",
  "Santa Maria do Tocantins - TO":
    "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
  "Tabocão - TO":
    "Netbox Internet - Fortaleza do Tabocão - R. Amazonas, 112 - CENTRO, Tabocão - TO, 77708-000",
  "Tocantínia - TO":
    "Netbox Internet - Miracema - TO-342, 1664 - Vila Maria, Miracema do Tocantins - TO, 77650-000",
  "Tupirama - TO":
    "Netbox internet - Pedro Afonso - Av. Pedro Mariano dos Santos, 1050 - St. maria Galvão, Pedro Afonso - TO, 77710-000",
};

const cities = Object.keys(storeAddresses);
const DEFAULT_CITY = "Paraíso do Tocantins - TO";
const services = [
  {
    title: "Internet Fibra Residencial",
    text: "Internet rápida e estável para estudar, trabalhar, jogar e assistir aos seus conteúdos favoritos.",
    action: "Consultar opções residenciais",
    image: "/img_services/cabo-optico-laraja.png",
  },
  {
    title: "Aplicativo Netbox",
    text: "Consulte faturas, veja o histórico financeiro, solicite suporte e receba notificações pelo celular.",
    action: "Baixar aplicativo",
    image: "/netbox-app-icon.png",
  },
  {
    title: "Suporte Técnico Regional",
    text: "Atendimento humanizado e suporte técnico realizado por uma equipe que conhece a região.",
    action: "Acessar atendimento",
    image: "/img_services/atendimento.png",
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
  [
    "01",
    "Fibra residencial",
    "Conexão para a rotina da sua casa.",
    "/solutions 2/fibra-residencial.png",
    "oxe?",
  ],
  [
    "02",
    "Casa conectada",
    "Mais dispositivos com estabilidade.",
    "/solutions 2/casa-conectada.png",
    "Dispositivos conectados à rede de uma residência",
  ],
  [
    "03",
    "Netbox Empresas",
    "Soluções para negócios que não podem parar.",
    "/solutions 2/netbox-empresas.png",
    "Equipe trabalhando conectada em uma empresa",
  ],
  [
    "04",
    "Link dedicado",
    "Desempenho personalizado para sua operação.",
    "/solutions 2/link-dedicado.png",
    "Equipamentos de rede conectados por fibra óptica",
  ],
  [
    "05",
    "Aplicativo Netbox",
    "Serviços e faturas na palma da mão.",
    "/solutions 2/aplicativo-netbox.png",
    "Aplicativo Netbox sendo usado em um celular",
  ],
  [
    "06",
    "Suporte regional",
    "Atendimento feito por quem está perto.",
    "/solutions 2/suporte-regional.png",
    "Atendente Netbox auxiliando um cliente",
  ],
  [
    "07",
    "Lojas Netbox",
    "Presença em cidades do Tocantins.",
    "/solutions 2/lojas-netbox.png",
    "Cliente chegando a uma loja Netbox",
  ],
  [
    "08",
    "Instalação agendada",
    "Consulta técnica e próximos passos pelo WhatsApp.",
    "/solutions 2/instalacao-agendada.png",
    "Técnico instalando fibra óptica em uma residência",
  ],
];

const heroSlides = [
  {
    title: "Aplicativo Netbox",
    text: "Acesse faturas, segunda via, suporte e \n outros serviços Netbox de onde estiver.",
    image: "/carousel/netbox-app.jpg",
    mobileImage: "/carousel/mobile-v2-app.jpg",
    position: "68% center",
    side: "left",
  },
  {
    title: "Internet Residencial",
    text: "Conexão rápida e estável para estudar, trabalhar,  jogar \ne assistir aos seus conteúdos favoritos.",
    image: "/carousel/netbox-familia.jpg",
    mobileImage: "/carousel/mobile-v2-casa.jpg",
    position: "68% center",
    side: "left",
  },
  {
    title: "Conexão Empresarial",
    text: "Soluções empresariais para sua equipe produzir, \n atender e crescer sem interrupções.",
    image: "/carousel/netbox-empresas.jpg",
    mobileImage: "/carousel/mobile-v2-empresas.jpg",
    position: "69% center",
    side: "left",
  },
  {
    title: "Suporte regional",
    text: "Atendimento para todo o Tocantins feito \npor uma equipe que conhece a região.",
    image: "/carousel/netbox-regional.jpg",
    mobileImage: "/carousel/mobile-v2-regional.jpg",
    position: "68% center",
    side: "left",
  },
  {
    title: "Instalação Agendada",
    text: "Agendamento prático e uma equipe preparada  \n para deixar tudo funcionando para você.",
    image: "/carousel/netbox-instalacao.jpg",
    mobileImage: "/carousel/mobile-v2-instalacao.jpg",
    position: "70% center",
    side: "left",
  },
  {
    title: "Conexão de fibra óptica",
    text: "Uma infraestrutura monitorada para entregar \n estabilidade, segurança e alto desempenho.",
    image: "/carousel/netbox-infraestrutura.jpg",
    mobileImage: "/carousel/mobile-v2-infraestrutura.jpg",
    position: "70% center",
    side: "left",
  },
  {
    title: "Toda casa conectada",
    text: "Mais dispositivos conectados com estabilidade, \n velocidade e segurança.",
    image: "/carousel/netbox-conexao.jpg",
    mobileImage: "/carousel/mobile-v2-casa.jpg",
    position: "68% center",
    side: "left",
  },
];

const appScreens = [
  "/carocel_app/celular-laranja-1.png",
  "/carocel_app/celular-laranja-2.png",
  "/carocel_app/celular-laranja-3.png",
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
  localStorage.setItem(
    "netbox_leads",
    JSON.stringify([...saved.slice(-19), lead]),
  );
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
  const [appCarouselIndex, setAppCarouselIndex] = useState(1);
  const [appCarouselResetting, setAppCarouselResetting] = useState(false);
  const [appCarouselPaused, setAppCarouselPaused] = useState(false);
  const [activeSolution, setActiveSolution] = useState<number | null>(null);
  const [plansOpen, setPlansOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [carouselInteractionPaused, setCarouselInteractionPaused] =
    useState(false);
  const [featureVideoPaused, setFeatureVideoPaused] = useState(false);
  const [featureVideoMuted, setFeatureVideoMuted] = useState(true);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const solutionModalRef = useRef<HTMLElement | null>(null);
  const solutionTriggerRef = useRef<HTMLElement | null>(null);
  const plansModalRef = useRef<HTMLElement | null>(null);
  const plansTriggerRef = useRef<HTMLElement | null>(null);
  const navigationVisible = useScrollDirectionVisibility();
  const selectedStoreAddress =
    storeAddresses[city] ?? storeAddresses[DEFAULT_CITY];
  const selectedMapLocation = selectedStoreAddress;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(selectedMapLocation)}&z=16&output=embed`;
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation)}`;
  const activeSolutionData =
    activeSolution === null ? null : gallery[activeSolution];
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
  const solutionSwipe = useSwipeGesture({
    onSwipeLeft: () =>
      setActiveSolution((current) =>
        current === null ? null : (current + 1) % gallery.length,
      ),
    onSwipeRight: () =>
      setActiveSolution((current) =>
        current === null
          ? null
          : (current - 1 + gallery.length) % gallery.length,
      ),
    onSwipeDown: () => setActiveSolution(null),
  });
  const planSwipe = useSwipeGesture({
    onSwipeLeft: () => movePlan(1),
    onSwipeRight: () => movePlan(-1),
    onSwipeDown: () => setPlansOpen(false),
  });
  const menuSwipe = useSwipeGesture({
    onSwipeRight: () => setMenuOpen(false),
    threshold: 56,
    enabled: menuOpen,
  });

  useFocusTrap(menuOpen, menuRef, menuButtonRef, () => setMenuOpen(false));
  useFocusTrap(
    activeSolution !== null,
    solutionModalRef,
    solutionTriggerRef,
    () => setActiveSolution(null),
  );
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
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (activeSolution === null) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveSolution((current) =>
          current === null
            ? null
            : (current - 1 + gallery.length) % gallery.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveSolution((current) =>
          current === null ? null : (current + 1) % gallery.length,
        );
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
      if (event.key === "ArrowLeft") {
        setActivePlan(
          (current) =>
            (current - 1 + residentialPlans.length) % residentialPlans.length,
        );
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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (
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
    if (appCarouselPaused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setAppCarouselResetting(false);
      setAppCarouselIndex((current) => {
        if (current <= 0 || current >= appScreens.length + 1) return current;
        return current + 1;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [appCarouselPaused]);

  useEffect(() => {
    let resetIndex: number | null = null;
    let resetDelay = 480;

    if (appCarouselIndex === 0) resetIndex = appScreens.length;
    if (appCarouselIndex === appScreens.length + 1) resetIndex = 1;
    if (
      appCarouselIndex < 0 ||
      appCarouselIndex > appScreens.length + 1
    ) {
      resetIndex = 1;
      resetDelay = 0;
    }
    if (resetIndex === null) return;

    const resetTimer = window.setTimeout(() => {
      setAppCarouselResetting(true);
      setAppCarouselIndex(resetIndex);
    }, resetDelay);

    return () => window.clearTimeout(resetTimer);
  }, [appCarouselIndex]);

  useEffect(() => {
    if (!appCarouselResetting) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setAppCarouselResetting(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
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
      if (current === 0 || current === appScreens.length + 1) return current;
      return current + direction;
    });
  }

  function finishAppCarouselTransition(
    event: TransitionEvent<HTMLDivElement>,
  ) {
    if (event.target !== event.currentTarget || event.propertyName !== "transform")
      return;

    let resetIndex: number | null = null;
    if (appCarouselIndex === 0) resetIndex = appScreens.length;
    if (appCarouselIndex === appScreens.length + 1) resetIndex = 1;
    if (resetIndex === null) return;

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
    if (distance === 0) return "is-active";
    if (distance === 1) return "is-next";
    if (distance === residentialPlans.length - 1) return "is-previous";
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
    openWhatsApp(`Olá! Quero consultar a cobertura da Netbox em ${city}.`, {
      city,
      type: "residencial",
      origin: "consulta_cobertura",
    });
  }

  function handleService(title: string) {
    if (title.toLocaleLowerCase("pt-BR").includes("residencial")) {
      openResidentialPlans();
      return;
    }
    if (title === "Aplicativo Netbox") {
      document
        .querySelector("#aplicativo-netbox")
        ?.scrollIntoView({ behavior: "smooth" });
      track("acessou_aplicativo", { origin: "servicos" });
      return;
    }
    if (
      title === "Suporte Técnico Regional" ||
      title === "Atendimento ao cliente"
    ) {
      document
        .querySelector("#contato")
        ?.scrollIntoView({ behavior: "smooth" });
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
        className={`model-header${navigationVisible || menuOpen ? "" : " is-hidden"}`}
      >
        <a
          className="model-brand"
          href="/"
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
          <a href="/" aria-current="page" onClick={() => setMenuOpen(false)}>
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
          <MenuContactLinks />
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
            if (event.key === "ArrowLeft") moveSlide(-1);
            if (event.key === "ArrowRight") moveSlide(1);
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
                    <FaApple className="store-icon apple" aria-hidden="true" />
                    <div className="store-text">
                      <span>Download on the</span>
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
                    <SiGoogleplay
                      className="store-icon play"
                      aria-hidden="true"
                    />
                    <div className="store-text">
                      <span>GET IT ON</span>
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
        </section>

        <aside
          className="home-contact-strip"
          aria-label="Canais rápidos de atendimento"
        >
          <div className="model-shell">
            <small className="home-contact-strip-title">
              Canais de atendimento
            </small>
            <MenuContactLinks />
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
                Soluções para residências, empresas e clientes que precisam
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
                      <FaApple className="store-icon apple" />

                      <div className="store-text">
                        <span>Download on the</span>
                        <strong>App Store</strong>
                      </div>
                    </a>

                    <a
                      className="store-download"
                      href={PLAY_STORE}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiGoogleplay className="store-icon play" />

                      <div className="store-text">
                        <span>GET IT ON</span>
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

        <section className="gallery-section" id="solucoes">
          <div className="model-shell">
            <div className="model-heading">
              <h2>Nossas Soluções e Presença</h2>
              <p>
                Uma estrutura regional para conectar casas e empresas com fibra
                óptica, canais digitais e atendimento nas cidades.
              </p>
            </div>
            <div className="solution-gallery">
              {gallery.map(([number, title, text, image, alt], index) => (
                <button
                  className={`solution-card card-${index + 1}`}
                  key={title}
                  type="button"
                  onClick={(event) => {
                    solutionTriggerRef.current = event.currentTarget;
                    setActiveSolution(index);
                  }}
                  aria-label={`Abrir detalhes de ${title}`}
                >
                  <div className="solution-art">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                    />
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
              ref={solutionModalRef}
              className="solution-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="solution-modal-title"
              style={{
                translate: `${solutionSwipe.offsetX * 0.2}px ${Math.max(0, solutionSwipe.offsetY) * 0.2}px`,
              }}
              {...solutionSwipe.bind}
            >
              <button
                className="solution-modal-close"
                type="button"
                onClick={() => setActiveSolution(null)}
                aria-label="Fechar detalhes do serviço"
                autoFocus
              >
                <IoClose aria-hidden="true" />
              </button>
              <div className="solution-modal-image">
                <img src={activeSolutionData[3]} alt={activeSolutionData[4]} />
                <button
                  className="solution-modal-arrow previous"
                  type="button"
                  onClick={() =>
                    setActiveSolution(
                      (activeSolution - 1 + gallery.length) % gallery.length,
                    )
                  }
                  aria-label="Mostrar solução anterior"
                >
                  <IoChevronBack aria-hidden="true" />
                </button>
                <button
                  className="solution-modal-arrow next"
                  type="button"
                  onClick={() =>
                    setActiveSolution((activeSolution + 1) % gallery.length)
                  }
                  aria-label="Mostrar próxima solução"
                >
                  <IoChevronForward aria-hidden="true" />
                </button>
              </div>
              <div className="solution-modal-copy">
                <span>
                  {activeSolutionData[0]} /{" "}
                  {String(gallery.length).padStart(2, "0")}
                </span>
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
              <strong>17</strong>
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
            if (event.target === event.currentTarget) setPlansOpen(false);
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
                          if (positionClass === "is-previous") movePlan(-1);
                          if (positionClass === "is-next") movePlan(1);
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

      <footer className="model-footer">
        <div className="model-shell footer-main">
          <div className="footer-services">
            {services.map((service) => (
              <button
                key={service.title}
                onClick={() => handleService(service.title)}
              >
                <span className="footer-service-icon">
                  <img src={service.image} alt="" />
                </span>

                <div>
                  <strong>
                    {service.title} <ArrowIcon />
                  </strong>
                  <small>{service.text}</small>
                </div>
              </button>
            ))}

            <a className="footer-pill" href="/nossos-servicos">
              Todos os serviços <ArrowIcon />
            </a>
          </div>

          <div className="footer-about">
            <img src="/logo-branca-1024x371.png" alt="Netbox Internet" />
            <p>
              Fibra óptica, presença regional e atendimento humanizado para
              conectar casas e empresas no Tocantins.
            </p>
            <a className="model-button yellow" href="/sobre">
              Mais sobre a Netbox <ArrowIcon />
            </a>
          </div>

          <div className="footer-contact">
            <div className="footer-visual" aria-hidden="true">
              <span>NET</span>
              <strong>BOX</strong>
              <i>⌁</i>
            </div>
            <div className="social-row">
              <span>◎</span>
              <span>◉</span>
              <span>▶</span>
            </div>
            <a href="tel:08006022732">☎ 0800 602 2732</a>
            <a href={SECOND_COPY} target="_blank" rel="noreferrer">
              2ª via de boleto
            </a>
            <a href={PLAY_STORE} target="_blank" rel="noreferrer">
              Google Play
            </a>
            <a href={APP_STORE} target="_blank" rel="noreferrer">
              App Store
            </a>
          </div>
        </div>
        <div className="model-shell footer-bottom">
          <span>
            © {new Date().getFullYear()} Netbox Internet LTDA • CNPJ
            25.356.470/0001-13
          </span>
          <span>
            <a href="https://netbox.net.br/ouvidoria/">Ouvidoria</a> •{" "}
            <a href="https://netbox.net.br/politica-de-privacidade/">
              Privacidade
            </a>
          </span>
        </div>
      </footer>

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
