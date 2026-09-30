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
    image: "/structure/ICONE - REDE DE FIBRA ÓPTICA.png",
    alt: "Técnico organizando conexões em uma caixa de distribuição de fibra óptica",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Rede de fibra óptica preparada para manter você conectado.",
    width: 1678,
    height: 937,
  },
  {
    title: "ATENDIMENTO SIMPLES",
    image: "/structure/ICONE - ATENDIMENTO SIMPLES.png",
    alt: "Área interna da central de atendimento Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "Fale com a gente sem complicação e encontre rapidamente o que precisa.",
    width: 1360,
    height: 765,
  },
  {
    title: "INSTALAÇÃO ÁGIL",
    image: "/structure/ICONE - INSTALAÇÃO ÁGIL.png",
    alt: "Técnico configurando roteador durante instalação residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Contratou? Nossa equipe cuida da instalação para você começar a usar.",
    width: 1672,
    height: 941,
  },
  {
    title: "SUPORTE QUE RESOLVE",
    image: "/structure/ICONE - SUPORTE QUE RESOLVE.png",
    alt: "Equipe técnica atendendo uma rede em bairro residencial",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Quando precisar, nosso time técnico está pronto para ajudar.",
    width: 1672,
    height: 941,
  },
  {
    title: "PARA SUA CASA OU EMPRESA",
    image: "/structure/ICONE - PARA SUA CASA OU EMPRESA.png",
    alt: "Especialista apresentando infraestrutura de rede a clientes empresariais",
    source: "Imagem ilustrativa",
    position: "center",
    description: "Planos e soluções para diferentes formas de usar a internet.",
    width: 1672,
    height: 941,
  },
  {
    title: "ESTAMOS PERTO DE VOCÊ",
    image: "/structure/ICONE - ESTAMOS PERTO DE VOCÊ.png",
    alt: "Fachada de uma loja Netbox",
    source: "Acervo Netbox",
    position: "center",
    description: "Presença regional e atendimento feito por quem conhece sua cidade.",
    width: 1360,
    height: 765,
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
            <h2>A estrutura é nossa. <br/>A facilidade é sua.</h2>
            <p>Da contratação ao suporte, trabalhamos para deixar sua experiência mais simples.</p>
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
