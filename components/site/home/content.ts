/** Static content for the institutional home. Asset URLs remain public and unchanged. */
export const featuredServiceImages: Record<string, string> = {
  Deezer: "/featured-plans/deezer.png",
  "Ubook Go": "/featured-plans/ubook-go.jpg",
  "Roteador Wi-Fi": "/featured-plans/roteador.png",
  "Sky Light": "/featured-plans/sky-light.png",
  "Prime Video": "/featured-plans/prime-video.png",
  "Amazon Prime": "/featured-plans/prime-video.png",
  "Disney Plus": "/featured-plans/disney-plus.png",
  "Docway Telemedicina": "/featured-plans/docway.png",
  "HBO Max": "/featured-plans/hbo-max.png",
  Globoplay: "/featured-plans/globoplay.png",
};

export const storeAddresses: Record<string, string> = {
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

export const cities = Object.keys(storeAddresses);

export const DEFAULT_CITY = "Paraíso do Tocantins - TO";

export const featuredPlans = [
  {
    name: "INTERMEDIÁRIO",
    tone: "intermediate",
    services: ["Ubook Go", "App Netbox"],
  },
  {
    name: "ADICIONAIS",
    tone: "additional",
    services: [
      "Globoplay",
      "HBO Max",
      "Disney Plus",
      "Deezer",
      "Prime Video",
      "Sky Light",
      "Docway Telemedicina",
    ],
  },
  {
    name: "PRO",
    tone: "pro",
    services: ["Ubook Go", "App Netbox", "Sky Light"],
  },
] as const;

export const familyFeaturedPlans = [
  {
    name: "FAMÍLIA",
    tone: "family",
    benefits: [
      "Desconto para pagamento com pontualidade",
      "Roteadores em comodato",
      "Instalação prioritária",
    ],
    services: [
      "Aplicativo Netbox",
      "Ubook Go",
      "Sky Light",
      "Amazon Prime",
      "Deezer Premium",
    ],
  },
  {
    name: "TOP FAMÍLIA",
    tone: "top-family",
    benefits: [
      "Desconto para pagamento com pontualidade",
      "Roteador em comodato",
      "Instalação prioritária",
    ],
    services: ["Aplicativo Netbox", "Ubook Go"],
  },
  {
    name: "ADICIONAIS",
    tone: "additional",
    services: [
      "Docway Telemedicina",
      "Sky Light",
      "Amazon Prime",
      "Deezer Premium",
      "Disney Plus",
      "HBO Max",
      "Globoplay",
    ],
  },
] as const;

export type FeaturedPlan = {
  name: string;
  tone: string;
  benefits?: readonly string[];
  services: readonly string[];
};

export const featuredBenefits = [
  "Entrega da velocidade contratada",
  "Desconto para pagamento com pontualidade",
  "Suporte premium 7 dias por semana",
] as const;

export const featuredAdditionalTiers = [
  { name: "STANDARD", services: ["Docway Telemedicina", "Deezer"] },
  {
    name: "ADVANCED",
    services: ["Sky Light", "Prime Video"],
    caption: "SKY+ com Amazon Prime incluso",
  },
  {
    name: "PREMIUM",
    services: ["Disney Plus", "HBO Max", "Globoplay"],
  },
] as const;

export const services = [
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

export const residentialPlans = [
  {
    name: "BÁSICO",
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
    name: "ESSENCIAL",
    features: [
      "Entrega da velocidade contratada",
      "Desconto para pagamento com pontualidade",
      "Roteador em comodato",
      "Suporte premium 7 dias por semana",
    ],
    platforms: [
      { name: "Ubook Go", tone: "ubook" },
      { name: "App Netbox", tone: "netbox" },
      { name: "Deezer", tone: "Deezer" },
      { name: "Prime Video", tone: "prime" },
    ],
    choiceNote: "Você pode optar por Deezer ou Prime Video.",
  },
  {
    name: "FAMÍLIA",
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
      { name: "Deezer", tone: "Deezer" },
      { name: "Prime Video", tone: "prime" },
    ],
    allIncluded: true,
  },
  {
    name: "TOP FAMÍLIA",
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
      { name: "Disney Plus", tone: "disney" },
    ],
    choiceNote: "Você pode optar por HBO Max ou Disney Plus.",
  },
];

export const heroSlides = [
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
];

export const appScreens = [
  "/carocel_app/celular-laranja-v1.png",
  "/carocel_app/celular-laranja-v2.png",
  "/carocel_app/celular-laranja-v3.png",
  "/carocel_app/celular-laranja-v4.png",
];
