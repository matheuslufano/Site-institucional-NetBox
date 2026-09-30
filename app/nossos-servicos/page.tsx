import type { Metadata } from "next";
import Image from "next/image";
import {
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoHeadsetOutline,
  IoHomeOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { LuHeadset } from "react-icons/lu";
import { ArrowIcon } from "../_components/ArrowIcon";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Serviços Netbox | Internet residencial e empresarial",
  description:
    "Conheça as soluções residenciais, empresariais e os canais de atendimento da Netbox.",
};

const WHATSAPP = "5508006022732";

const serviceDetails = [
  {
    icon: IoHomeOutline,
    title: "Internet residencial",
    kicker: "Para sua casa",
    image: "/servico-fibra-residencial.png",
    text: "Conectividade por fibra óptica para estudar, trabalhar, assistir e manter a casa conectada com estabilidade.",
    items: [
      "Planos ideais para cada rotina e perfil de consumo",
      "Wi-Fi de alta performance com instalação prática",
      "Mais estabilidade para streaming, trabalho e estudos",
      "Atendimento próximo para acompanhar sua contratação"
    ],
  },
  {
    icon: IoBusinessOutline,
    title: "Internet empresarial",
    kicker: "Para seu negócio",
    image: "/servico-netbox-empresas.png",
    text: "Soluções para empresas que precisam de estabilidade, flexibilidade e atendimento personalizado.",
    items: [
      "Internet empresarial com mais estabilidade e desempenho",
      "Link dedicado e conectividade sob medida",
      "Análise técnica conforme a necessidade do negócio",
      "Atendimento e suporte preferencial para sua operação"
    ],
  },
  {
    icon: IoHeadsetOutline,
    title: "Suporte Técnico Regional",
    kicker: "Atendimento próximo",
    image: "/servico-suporte-regional.png",
    text: "Acesso rápido ao suporte para cuidar da sua assinatura e resolver demandas com agilidade.",
    items: [
      "Equipe regional que conhece a sua realidade",
      "Atendimento humanizado e sem burocracia",
      "Acompanhamento rápido para suporte e orientações",
      "Mais segurança para resolver o que você precisa"
    ],
  },
  {
    icon: IoHeadsetOutline,
    title: "Aplicativos e benefícios",
    kicker: "Aplicativos parceiros",
    image: "/servico-aplicativos-parceiros.png",
    text: "Complete sua experiência Netbox com serviços de entretenimento, música, saúde e conteúdo. Contrate aplicativos como Docway, Deezer Premium, Sky+ Light com Amazon Prime Video, HBO Max, Disney+ e Globoplay adicionando junto com a sua internet.",
    items: [
      "Até 40% de desconto em serviços selecionados no combo com internet",
      "Contratação sem precisar usar cartão de crédito",
      "Serviços cobrados junto com a internet em uma única fatura",
      "Contratação simples, com mais praticidade para gerenciar seus serviços"
    ],
  },
];

export default function ServicesPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero services-hero">
        <div className="model-shell services-hero-content">
          <div className="inner-hero-nav">
            <BackButton />
            <span>Início / Serviços</span>
          </div>
          <h1>Soluções para conectar cada momento.</h1>
          <p>
            Casa, empresa e atendimento reunidos em uma experiência simples,
            próxima e feita para a sua rotina.
          </p>
        </div>
      </section>

      <section className="inner-section services-detail-section" id="servicos">
        <div className="model-shell services-detail-shell">
          <div className="model-heading services-detail-heading">
            <small>Escolha sua jornada</small>
            <h2>TUDO O QUE VOCÊ PRECISA PARA SE CONECTAR MELHOR</h2>
            <p>
              Internet, suporte e benefícios em um só lugar <br/>
              Para sua casa, seu negócio e sua rotina. Simples de contratar e fácil de resolver.
            </p>
          </div>
          <div className="detail-service-grid">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              const isSupport = service.title === "Suporte Técnico Regional";
              const href = isSupport
                ? "/nossa-estrutura"
                : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service.title}.`)}`;
              return (
                <article
                  className="service-detail-card"
                  key={service.title}
                  id={
                    service.title === "Internet empresarial"
                      ? "empresas"
                      : undefined
                  }
                >
                  <div className="service-detail-image">
                    <Image
                      src={service.image}
                      alt={`Ilustração do serviço ${service.title}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) calc(100vw - 32px), 42vw"
                    />
                    <span className="service-detail-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="service-detail-icon">
                      <Icon aria-hidden="true" />
                    </span>
                  </div>
                  <div className="service-detail-body">
                    <small>{service.kicker}</small>
                    <h2>{service.title}</h2>
                    <p>{service.text}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a
                      className="model-button yellow"
                      href={href}
                      target={isSupport ? undefined : "_blank"}
                      rel={isSupport ? undefined : "noreferrer"}
                    >
                      Saiba mais <ArrowIcon />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="support-strip services-support-strip">
        <div className="model-shell">
          <div>
            <small>Já sou cliente</small>
            <h2>RESOLVA TUDO</h2>
            <p>Acesse rapidamente os canais que fazem parte da sua rotina.</p>
          </div>
          <div className="support-actions">
            <a href="https://netboxfibra.sgp.net.br/accounts/central/login">
              <IoDocumentTextOutline
                className="support-action-icon"
                aria-hidden="true"
              />
              <strong>2ª via</strong>
            </a>
            <a href="/contatos">
              <LuHeadset
                className="support-action-icon"
                aria-hidden="true"
              />
              <strong>Suporte</strong>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox"
              target="_blank"
              rel="noreferrer"
            >
              <IoPhonePortraitOutline
                className="support-action-icon"
                aria-hidden="true"
              />
              <strong>Aplicativo</strong>
            </a>
          </div>
        </div>
      </section>
    </NetboxFrame>
  );
}
