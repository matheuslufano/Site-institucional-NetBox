import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowIcon } from "../_components/ArrowIcon";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";
import { StructureSection } from "../_components/StructureSection";
import { StoreLocator } from "./StoreLocator";

export const metadata: Metadata = {
  title: "Estrutura Netbox | Cobertura, lojas e canais digitais",
  description: "Conheça a presença regional, as lojas e os canais digitais da Netbox no Tocantins.",
};

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

      <StructureSection />

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
