import type { Metadata } from "next";
import Image from "next/image";
import { IoBusinessOutline, IoGitNetworkOutline, IoHeadsetOutline, IoHomeOutline } from "react-icons/io5";
import { ArrowIcon } from "../_components/ArrowIcon";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Serviços Netbox | Internet residencial e empresarial",
  description: "Conheça as soluções residenciais, empresariais e os canais de atendimento da Netbox.",
};

const WHATSAPP = "5508006022732";

const serviceDetails = [
  {
    icon: IoHomeOutline,
    title: "Internet residencial",
    kicker: "Para sua casa",
    image: "/servico-fibra-residencial.png",
    text: "Conectividade por fibra óptica para estudar, trabalhar, assistir e manter a casa conectada.",
    items: ["Consulta por cidade e endereço", "Roteador em comodato conforme condições", "Oferta confirmada pelo consultor"],
  },
  {
    icon: IoBusinessOutline,
    title: "Internet empresarial",
    kicker: "Para seu negócio",
    image: "/servico-netbox-empresas.png",
    text: "Soluções para empresas que precisam de estabilidade, flexibilidade e atendimento personalizado.",
    items: ["Internet empresarial", "Análise da necessidade do negócio", "Atendimento preferencial"],
  },
  {
    icon: IoGitNetworkOutline,
    title: "Link dedicado",
    kicker: "Conexão sob medida",
    image: "/servico-link-dedicado.png",
    text: "Conectividade personalizada para operações que precisam de desempenho e disponibilidade.",
    items: ["Proposta sob medida", "Análise técnica", "Executivo de contas"],
  },
  {
    icon: IoHeadsetOutline,
    title: "Suporte Técnico Regional",
    kicker: "Atendimento próximo",
    image: "/servico-suporte-regional.png",
    text: "Acessos rápidos para cuidar da assinatura e falar com a equipe Netbox.",
    items: ["Atendimento humanizado por uma equipe que conhece a região"],
  },
];

export default function ServicesPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero services-hero">
        <div className="model-shell services-hero-content">
          <div className="inner-hero-nav"><BackButton /><span>Início / Serviços</span></div>
          <h1>Soluções para conectar cada momento.</h1>
          <p>Casa, empresa e atendimento reunidos em uma experiência simples, próxima e feita para a sua rotina.</p>
        </div>
      </section>

      <section className="inner-section services-detail-section" id="servicos">
        <div className="model-shell services-detail-shell">
          <div className="model-heading services-detail-heading"><small>Escolha sua jornada</small><h2>Nossos serviços</h2><p>Encontre a solução ideal e fale diretamente com o canal adequado.</p></div>
          <div className="detail-service-grid">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              const isSupport = service.title === "Suporte Técnico Regional";
              const href = isSupport ? "/contatos" : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service.title}.`)}`;
              return (
                <article className="service-detail-card" key={service.title} id={service.title === "Internet empresarial" ? "empresas" : undefined}>
                  <div className="service-detail-image">
                    <Image src={service.image} alt={`Ilustração do serviço ${service.title}`} fill unoptimized sizes="(max-width: 640px) calc(100vw - 32px), 42vw" />
                    <span className="service-detail-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="service-detail-icon"><Icon aria-hidden="true" /></span>
                  </div>
                  <div className="service-detail-body">
                    <small>{service.kicker}</small>
                    <h2>{service.title}</h2>
                    <p>{service.text}</p>
                    <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <a className="model-button yellow" href={href} target={isSupport ? undefined : "_blank"} rel={isSupport ? undefined : "noreferrer"}>Saiba mais <ArrowIcon /></a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="support-strip services-support-strip">
        <div className="model-shell">
          <div><small>Já sou cliente</small><h2>Resolva tudo com mais praticidade.</h2><p>Acesse rapidamente os canais que fazem parte da sua rotina.</p></div>
          <div className="support-actions">
            <a href="https://netboxfibra.sgp.net.br/accounts/central/login"><span>01</span>2ª via <ArrowIcon /></a>
            <a href="/contatos"><span>02</span>Suporte <ArrowIcon /></a>
            <a href="https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox" target="_blank" rel="noreferrer"><span>03</span>Aplicativo <ArrowIcon /></a>
          </div>
        </div>
      </section>
    </NetboxFrame>
  );
}
