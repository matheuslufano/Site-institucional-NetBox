import type { Metadata } from "next";
import { ArrowIcon } from "../_components/ArrowIcon";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";
import { StructureGallery } from "./StructureGallery";

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

const coverageCities = ["Barrolândia", "Brasilândia do Tocantins", "Colinas do Tocantins", "Colméia", "Goianorte", "Guaraí", "Itacajá", "Lajeado", "Miracema", "Miranorte", "Paraíso do Tocantins", "Pedro Afonso", "Presidente Kennedy", "Rio dos Bois", "Santa Maria do Tocantins", "Tabocão", "Tocantínia"];

export default function StructurePage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero structure-hero">
        <div className="model-shell">
          <div className="inner-hero-nav"><BackButton /><span>Início / Nossa estrutura</span></div>
          <h1>Presença regional e canais para estar sempre perto.</h1>
          <p>Conheça a estrutura que conecta clientes em cidades do Tocantins.</p>
        </div>
      </section>

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
          <div className="city-chip-grid">{coverageCities.map((city) => <span key={city}>⌖ {city}</span>)}</div>
          <a className="model-button yellow" href="/contatos">Consultar meu endereço <ArrowIcon /></a>
        </div>
      </section>
    </NetboxFrame>
  );
}
