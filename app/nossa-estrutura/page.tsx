import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowIcon } from "../_components/ArrowIcon";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";
import { StructureGallery } from "./StructureGallery";
import { StoreLocator } from "./StoreLocator";

export const metadata: Metadata = {
  title: "Estrutura Netbox | Cobertura, lojas e canais digitais",
  description: "Conheça a presença regional, as lojas e os canais digitais da Netbox no Tocantins.",
};

const structureItems = [
  {
    title: "Rede de fibra óptica",
    image: "/structure/rede-fibra-optica.png",
    alt: "Técnico organizando conexões em uma caixa de distribuição de fibra óptica",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Nossa rede de fibra óptica é organizada e monitorada para entregar conexão estável, baixa latência e capacidade para acompanhar o uso de cada região.",
    width: 1678,
    height: 937,
  },
  {
    title: "Loja regional",
    image: "/structure/loja-netbox.png",
    alt: "Fachada de uma loja Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "As lojas regionais aproximam a Netbox dos clientes, oferecendo atendimento presencial, orientação sobre planos e suporte para cada necessidade.",
    width: 1360,
    height: 765,
  },
  {
    title: "Equipe Netbox",
    image: "/structure/equipe-netbox.png",
    alt: "Equipe Netbox reunida em frente à loja",
    source: "Acervo Netbox",
    position: "center 38%",
    description: "A equipe Netbox reúne profissionais de atendimento, operação e campo que trabalham juntos para manter a qualidade da conexão e do relacionamento com o cliente.",
    width: 1280,
    height: 960,
  },
  {
    title: "Instalação residencial",
    image: "/structure/instalacao-residencial.png",
    alt: "Técnico configurando roteador durante instalação residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Na instalação residencial, nossos técnicos configuram a fibra e o roteador com cuidado para oferecer melhor cobertura e desempenho dentro do imóvel.",
    width: 1672,
    height: 941,
  },
  {
    title: "Nossa marca",
    image: "/structure/marca-netbox.jpg",
    alt: "Marca Netbox Internet de Verdade em fundo laranja",
    source: "Acervo Netbox",
    position: "center",
    description: "A marca Netbox representa internet de verdade, presença local e o compromisso de conectar pessoas e negócios em cidades do Tocantins.",
    width: 1080,
    height: 1080,
  },
  {
    title: "Central de atendimento",
    image: "/structure/central-atendimento.webp",
    alt: "Área interna da central de atendimento Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "A central de atendimento integra pessoas e tecnologia para orientar clientes, acompanhar solicitações e agilizar a solução de cada chamado.",
    width: 1360,
    height: 765,
  },
  {
    title: "Conectividade empresarial",
    image: "/structure/conectividade-empresarial.png",
    alt: "Especialista apresentando infraestrutura de rede a clientes empresariais",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Para empresas, a Netbox oferece conectividade preparada para rotinas profissionais, sistemas em nuvem, videoconferências e operações que não podem parar.",
    width: 1672,
    height: 941,
  },
  {
    title: "Suporte regional",
    image: "/structure/suporte-regional.png",
    alt: "Equipe técnica atendendo uma rede em bairro residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "O suporte regional mantém equipes próximas às cidades atendidas, permitindo visitas técnicas e respostas mais rápidas quando o cliente precisa.",
    width: 1672,
    height: 941,
  },
];

const coverageCities = [
  "Barrolândia",
  "Bom Jesus do Tocantins",
  "Brasilândia do Tocantins",
  "Colinas do Tocantins",
  "Colméia",
  "Goianorte",
  "Gurupi",
  "Guaraí",
  "Itacajá",
  "Lajeado",
  "Luzimangues",
  "Miracema do Tocantins",
  "Miranorte",
  "Paraíso do Tocantins",
  "Pedro Afonso",
  "Presidente Kennedy",
  "Rio dos Bois",
  "Santa Maria do Tocantins",
  "Tabocão",
  "Tocantínia",
  "Tupirama",
];

const WHATSAPP = "5508006022732";

function cityWhatsAppUrl(city: string) {
  const message = `Olá! Tenho interesse em contratar a Netbox em ${city}, Tocantins. Gostaria de consultar a cobertura e os planos disponíveis para o meu endereço.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function StructurePage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero structure-hero">
        <div className="model-shell">
          <div className="inner-hero-nav"><BackButton /><span>Início / Nossa estrutura</span></div>
          <h1>Estrutura: estamos presente em 21 cidades do Tocantins</h1>
          <p>Conheça a loja da sua cidade e entre em contato com nossa equipe.</p>
        </div>
      </section>

      <StoreLocator />

      <section className="inner-section soft-section">
        <div className="model-shell">
          <div className="model-heading">
            <h2>Nossa estrutura</h2>
            <p>Gente, tecnologia e presença local trabalhando para manter você conectado.</p>
          </div>
          <StructureGallery items={structureItems} />
        </div>
      </section>

      <section className="inner-section coverage-inner">
        <div className="model-shell">
          <div>
            <small>Cobertura publicada</small>
            <h2>Cidades listadas pela Netbox</h2>
            <p>A disponibilidade deve ser confirmada para o endereço exato.</p>
          </div>
          <div className="city-chip-grid">
            {coverageCities.map((city) => (
              <a
                className="city-chip"
                key={city}
                href={cityWhatsAppUrl(city)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Falar no WhatsApp sobre atendimento em ${city}`}
              >
                <span>{city}</span>
                <FaWhatsapp aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="model-button yellow" href="/contatos">Consultar meu endereço <ArrowIcon /></a>
        </div>
      </section>
    </NetboxFrame>
  );
}
