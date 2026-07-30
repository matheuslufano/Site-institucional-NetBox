"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
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
const stores = [
  ["Paraíso do Tocantins", "Rua Bernardino Maciel, 891, Centro"],
  ["Barrolândia", "Avenida Bernardo Sayão, S/N, Centro"],
  ["Miranorte", "Avenida Tocantins, 812, Centro"],
  ["Guaraí", "Rua Dr. Valdir, 1375, Bairro Planalto"],
  ["Miracema", "Avenida Tocantins, 1644, Centro"],
  ["Colinas do Tocantins", "Av. Pedro Ludovico Teixeira, 1152, Centro"],
  ["Colméia", "Av. Longuinho Vieira Júnior, 470, Centro"],
  ["Tabocão", "Rua Vitória Regina, 112, Centro"],
  ["Itacajá", "Rua Geraldo Veras, 119, Centro"],
  ["Pedro Afonso", "Av. Pedro Mariano dos Santos, 1078, Setor Maria Galvão"],
];
const planProfiles = [
  {
    eyebrow: "Para o dia a dia",
    title: "Internet residencial",
    description: "Uma opção para navegar, estudar, trabalhar e se divertir.",
    tag: "Oferta conforme a cidade",
  },
  {
    eyebrow: "Para vários dispositivos",
    title: "Casa conectada",
    description: "Consulte a opção adequada para toda a família conectada.",
    tag: "Recomendação personalizada",
    featured: true,
  },
  {
    eyebrow: "Para uso intenso",
    title: "Alta performance",
    description: "Para quem busca mais desempenho em jogos, vídeos e trabalho.",
    tag: "Disponibilidade sob consulta",
  },
];
const faqs = [
  [
    "Como descubro se há cobertura no meu endereço?",
    "Informe sua cidade e o CEP ou bairro nesta página. Um consultor confirmará a disponibilidade exata antes da contratação.",
  ],
  [
    "Quais planos estão disponíveis?",
    "Velocidades, valores e condições variam por cidade e campanha. Para evitar informação desatualizada, a oferta é confirmada durante a consulta.",
  ],
  [
    "A internet é por fibra óptica?",
    "A Netbox divulga sua rede como 100% fibra óptica. A viabilidade técnica do endereço é confirmada na consulta de cobertura.",
  ],
  [
    "Como emito a segunda via da fatura?",
    "Use o atalho “2ª via” nesta página ou o aplicativo Netbox para acessar os serviços financeiros.",
  ],
  [
    "O que posso fazer no aplicativo Netbox?",
    "Consultar faturas, emitir segunda via, realizar pagamentos, solicitar suporte e acompanhar serviços disponíveis para sua assinatura.",
  ],
  [
    "A Netbox atende empresas?",
    "Sim. Há internet empresarial, links dedicados e soluções personalizadas, com análise da necessidade de cada negócio.",
  ],
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
  const [businessSent, setBusinessSent] = useState(false);

  useEffect(() => {
    setCookieOpen(!localStorage.getItem("netbox_cookie_consent"));
  }, []);

  function consultCoverage(event?: FormEvent) {
    event?.preventDefault();
    track("consultou_cobertura", { city, address });
    openWhatsApp(
      `Olá! Quero consultar a cobertura da Netbox em ${city}${address ? `, na região de ${address}` : ""}.`,
      { city, address, type: "residencial", origin: "consulta_cobertura" },
    );
  }

  function consultProfile(title: string) {
    track("selecionou_plano", { city, profile: title });
    openWhatsApp(
      `Olá! Vi a opção “${title}” no site da Netbox. Minha cidade é ${city} e gostaria de conhecer os planos e consultar a cobertura.`,
      { city, profile: title, type: "residencial", origin: "planos" },
    );
  }

  function submitBusiness(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setBusinessSent(true);
    track("solicitou_proposta_empresarial", values);
    openWhatsApp(
      `Olá! Gostaria de uma proposta empresarial da Netbox.\nEmpresa: ${values.company}\nNome: ${values.name}\nCidade: ${values.city}\nSolução: ${values.solution}\nTelefone: ${values.phone}`,
      { ...values, type: "empresa", origin: "formulario_empresarial" },
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
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Netbox Internet — início">
          <Image
            className="brand-logo"
            src="/LOGO-NETBOX.png"
            alt="Netbox Internet"
            width={176}
            height={58}
            priority
          />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#planos" onClick={() => setMenuOpen(false)}>Planos</a>
          <a href="#beneficios" onClick={() => setMenuOpen(false)}>Benefícios</a>
          <a href="#empresas" onClick={() => setMenuOpen(false)}>Empresas</a>
          <a href="#cobertura" onClick={() => setMenuOpen(false)}>Cobertura</a>
          <a href="#atendimento" onClick={() => setMenuOpen(false)}>Atendimento</a>
        </nav>
        <div className="header-actions">
          <a className="button ghost desktop-only" href={SECOND_COPY} target="_blank" rel="noreferrer">
            Área do cliente
          </a>
          <a className="button primary desktop-only" href="#consulta">
            Consultar cobertura
          </a>
          <button
            className="menu-button"
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

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="fiber fiber-one" />
          <div className="fiber fiber-two" />
          <div className="hero-content shell">
            <div className="hero-copy">
              <span className="eyebrow light">Fibra óptica no Tocantins</span>
              <h1>
                Internet de verdade para conectar <em>tudo que importa.</em>
              </h1>
              <p>
                Velocidade, estabilidade e atendimento humanizado para sua casa ou empresa.
              </p>
              <div className="trust-row" aria-label="Diferenciais Netbox">
                <span><i>✓</i> 100% fibra óptica</span>
                <span><i>✓</i> Atendimento regional</span>
                <span><i>✓</i> Roteador em comodato</span>
              </div>
            </div>

            <div className="coverage-card" id="consulta">
              <span className="status-pill"><i /> Consulta rápida</span>
              <h2>Vamos ver se a Netbox chega até você?</h2>
              <p>Escolha sua cidade e informe a região do endereço.</p>
              <form onSubmit={consultCoverage}>
                <label>
                  Sua cidade
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
                <button className="button primary wide" type="submit">
                  Consultar no WhatsApp <span aria-hidden="true">↗</span>
                </button>
              </form>
              <small>Seus dados serão usados apenas para esta consulta.</small>
            </div>
          </div>
          <a className="scroll-hint" href="#planos">Role para descobrir <span>↓</span></a>
        </section>

        <section className="section shell" id="planos">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Planos residenciais</span>
              <h2>Uma conexão para cada jeito de viver.</h2>
            </div>
            <div className="city-context">
              <span>Consultando opções para</span>
              <select value={city} onChange={(event) => setCity(event.target.value)}>
                {cities.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <p className="validation-note">
            Velocidades, preços e condições são apresentados pelo consultor conforme a cidade e a campanha vigente.
          </p>
          <div className="plans-grid">
            {planProfiles.map((plan) => (
              <article className={plan.featured ? "plan-card featured" : "plan-card"} key={plan.title}>
                {plan.featured && <span className="recommended">Mais procurado</span>}
                <span className="plan-icon" aria-hidden="true">⌁</span>
                <small>{plan.eyebrow}</small>
                <h3>{plan.title}</h3>
                <div className="price-placeholder">
                  <strong>Oferta personalizada</strong>
                  <span>para {city}</span>
                </div>
                <p>{plan.description}</p>
                <ul>
                  <li>100% fibra óptica</li>
                  <li>Roteador em comodato</li>
                  <li>{plan.tag}</li>
                </ul>
                <button className={plan.featured ? "button primary wide" : "button dark wide"} onClick={() => consultProfile(plan.title)}>
                  Consultar opções
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits-section" id="beneficios">
          <div className="shell">
            <div className="section-heading centered">
              <span className="eyebrow light">Por que Netbox?</span>
              <h2>Mais que internet. Uma conexão feita por quem está perto.</h2>
            </div>
            <div className="benefit-grid">
              {[
                ["◉", "Fibra até você", "Rede de fibra óptica para uma experiência mais estável."],
                ["♡", "Atendimento humano", "Pessoas da região prontas para conversar e ajudar."],
                ["⌁", "Wi-Fi para sua rotina", "Roteador em comodato conforme as condições do plano."],
                ["↗", "Suporte regional", "Canais digitais e atendimento em cidades do Tocantins."],
              ].map(([icon, title, text]) => (
                <article key={title}>
                  <span>{icon}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section how shell">
          <div className="section-heading centered">
            <span className="eyebrow">É simples contratar</span>
            <h2>Da consulta à conexão em três passos.</h2>
          </div>
          <div className="steps">
            {[
              ["01", "Conte onde você mora", "Informe sua cidade e a região do endereço."],
              ["02", "Encontre sua conexão", "Veja as ofertas disponíveis e escolha com ajuda do consultor."],
              ["03", "Agende a instalação", "Converse no WhatsApp e combine os próximos passos."],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="app-section" id="atendimento">
          <div className="shell app-grid">
            <div className="phone-wrap" aria-label="Representação do aplicativo Netbox">
              <div className="phone">
                <div className="phone-top" />
                <div className="app-logo"><span>N</span><b>Olá, cliente!</b><small>Como podemos ajudar?</small></div>
                <div className="app-balance"><small>Próxima fatura</small><strong>Acesse com segurança</strong><button>Ver detalhes</button></div>
                <div className="app-icons"><i>Fatura</i><i>Suporte</i><i>Serviços</i></div>
              </div>
            </div>
            <div className="app-copy">
              <span className="eyebrow light">Cliente Netbox</span>
              <h2>Sua internet na palma da mão.</h2>
              <p>Resolva o que precisa sem sair de casa, pelo aplicativo oficial da Netbox.</p>
              <div className="app-features">
                <span>✓ Consultar faturas</span><span>✓ Emitir segunda via</span>
                <span>✓ Realizar pagamentos</span><span>✓ Solicitar suporte</span>
              </div>
              <div className="store-buttons">
                <a href={PLAY_STORE} target="_blank" rel="noreferrer"><small>Disponível no</small><strong>Google Play</strong></a>
                <a href={APP_STORE} target="_blank" rel="noreferrer"><small>Baixe na</small><strong>App Store</strong></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell customer-section">
          <div className="section-heading split">
            <div><span className="eyebrow">Já sou cliente</span><h2>O que você precisa resolver?</h2></div>
            <p>Acessos rápidos para cuidar da sua assinatura.</p>
          </div>
          <div className="quick-grid">
            {[
              ["2ª via de boleto", "Acesse sua fatura atual", SECOND_COPY, "↗"],
              ["Central do Assinante", "Serviços da sua assinatura", "https://netbox.net.br/central-do-cliente/", "⌂"],
              ["Suporte técnico", "Fale com nossa equipe", `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Sou cliente Netbox e preciso de suporte técnico.")}`, "◉"],
              ["Aplicativo Netbox", "Baixe para Android ou iOS", "#aplicativo", "▣"],
            ].map(([title, text, href, icon]) => (
              <a href={href} key={title} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div><b>→</b>
              </a>
            ))}
          </div>
        </section>

        <section className="business-section" id="empresas">
          <div className="shell business-grid">
            <div>
              <span className="eyebrow light">Netbox empresas</span>
              <h2>Sua empresa não pode parar. Sua conexão também não.</h2>
              <p>Soluções sob medida para manter seu negócio conectado, produtivo e preparado para crescer.</p>
              <div className="business-list">
                <span><i>01</i> Internet empresarial</span>
                <span><i>02</i> Link dedicado</span>
                <span><i>03</i> Atendimento personalizado</span>
              </div>
            </div>
            <form className="business-form" onSubmit={submitBusiness}>
              <span className="status-pill"><i /> Fale com um consultor</span>
              <h3>Solicite uma proposta empresarial</h3>
              <div className="form-row">
                <label>Seu nome<input name="name" required placeholder="Como podemos chamar você?" /></label>
                <label>Empresa<input name="company" required placeholder="Nome da empresa" /></label>
              </div>
              <div className="form-row">
                <label>Cidade<select name="city" defaultValue={city}>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Telefone<input name="phone" required inputMode="tel" placeholder="(63) 99999-9999" /></label>
              </div>
              <label>Solução de interesse<select name="solution"><option>Internet empresarial</option><option>Link dedicado</option><option>Quero uma recomendação</option></select></label>
              <button className="button primary wide" type="submit">Solicitar proposta <span>↗</span></button>
              {businessSent && <p className="form-success" role="status">Dados preparados. Abrindo o atendimento no WhatsApp.</p>}
            </form>
          </div>
        </section>

        <section className="section shell coverage-section" id="cobertura">
          <div className="section-heading split">
            <div><span className="eyebrow">Presença regional</span><h2>Netbox perto de você.</h2></div>
            <p>Confira algumas de nossas lojas. A cobertura exata depende da consulta do endereço.</p>
          </div>
          <div className="store-layout">
            <div className="map-visual" aria-label="Mapa ilustrativo do Tocantins">
              <div className="map-shape">
                {["Paraíso", "Guaraí", "Colinas", "Pedro Afonso"].map((label, index) => (
                  <span key={label} style={{ "--i": index } as React.CSSProperties}><i />{label}</span>
                ))}
              </div>
              <small>Representação ilustrativa • consulte a cobertura do endereço</small>
            </div>
            <div className="store-list">
              {stores.slice(0, 5).map(([name, addressText]) => (
                <article key={name}>
                  <span className="store-pin">⌖</span>
                  <div><h3>{name}</h3><p>{addressText}</p></div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addressText}, ${name}, TO`)}`} target="_blank" rel="noreferrer" aria-label={`Como chegar à loja de ${name}`}>↗</a>
                </article>
              ))}
              <button className="button dark wide" onClick={() => consultCoverage()}>Consultar minha cidade</button>
            </div>
          </div>
        </section>

        <section className="section faq-section shell" id="faq">
          <div className="section-heading centered">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Ficou com alguma dúvida?</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="shell">
            <span className="eyebrow light">Vamos conectar?</span>
            <h2>Pronto para ter internet de verdade?</h2>
            <p>Consulte a cobertura em {city} e descubra a melhor opção para você.</p>
            <div>
              <button className="button white" onClick={() => consultCoverage()}>Consultar cobertura <span>↗</span></button>
              <a className="text-link" href="#planos">Ver opções de planos →</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#inicio" aria-label="Netbox Internet — início">
              <Image
                className="footer-logo"
                src="/LOGO-NETBOX.png"
                alt="Netbox Internet"
                width={176}
                height={58}
              />
            </a>
            <p>Internet de verdade. Amizade que conecta.</p>
            <a className="phone-link" href="tel:08006022732">0800 602 2732</a>
          </div>
          <div><h3>Navegue</h3><a href="#planos">Planos</a><a href="#empresas">Empresas</a><a href="#cobertura">Cobertura</a><a href="#faq">Perguntas frequentes</a></div>
          <div><h3>Área do cliente</h3><a href={SECOND_COPY}>2ª via de boleto</a><a href="https://netbox.net.br/central-do-cliente/">Central do Assinante</a><a href={`https://wa.me/${WHATSAPP}`}>Suporte</a><a href={PLAY_STORE}>Aplicativo</a></div>
          <div><h3>Institucional</h3><a href="https://netbox.net.br/ouvidoria/">Ouvidoria</a><a href="https://netbox.net.br/contratos-e-regulamentos/">Contratos e regulamentos</a><a href="https://netbox.net.br/politica-de-privacidade/">Privacidade</a></div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Netbox Internet LTDA • CNPJ 25.356.470/0001-13</span>
          <span>Feito para conectar o Tocantins.</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Vim pelo site da Netbox e gostaria de atendimento em ${city}.`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Netbox pelo WhatsApp"
        onClick={() => track("clicou_whatsapp", { origin: "botao_flutuante", city })}
      >
        <span>◔</span><b>Fale com a gente</b>
      </a>

      <div className="mobile-bar">
        <a href="#planos"><span>⌁</span>Planos</a>
        <a href="#consulta"><span>⌖</span>Cobertura</a>
        <a href={SECOND_COPY}><span>▤</span>2ª via</a>
        <a href={`https://wa.me/${WHATSAPP}`}><span>◔</span>WhatsApp</a>
      </div>

      {cookieOpen && (
        <aside className="cookie-banner" aria-label="Preferências de cookies">
          <div><strong>Sua privacidade importa.</strong><p>Usamos cookies essenciais para o funcionamento do site e, com sua permissão, dados de navegação para melhorar sua experiência.</p></div>
          <div><button className="button ghost" onClick={() => saveConsent("essential")}>Somente essenciais</button><button className="button primary" onClick={() => saveConsent("all")}>Aceitar todos</button></div>
        </aside>
      )}
    </>
  );
}