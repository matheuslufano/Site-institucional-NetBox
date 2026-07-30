import type { Metadata } from "next";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Estrutura Netbox | Cobertura, lojas e canais digitais",
  description: "Conheça a presença regional, as lojas e os canais digitais da Netbox no Tocantins.",
};

const structureItems = ["Rede de fibra óptica", "Lojas regionais", "Equipe de atendimento", "Instalação técnica", "Aplicativo Netbox", "Central do Assinante", "Atendimento empresarial", "Suporte regional"];
const coverageCities = ["Barrolândia", "Brasilândia do Tocantins", "Colinas do Tocantins", "Colméia", "Goianorte", "Guaraí", "Itacajá", "Lajeado", "Miracema", "Miranorte", "Paraíso do Tocantins", "Pedro Afonso", "Presidente Kennedy", "Rio dos Bois", "Santa Maria do Tocantins", "Tabocão", "Tocantínia"];

export default function StructurePage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero structure-hero"><div className="model-shell"><span>Início / Nossa estrutura</span><h1>Presença regional e canais para estar sempre perto.</h1><p>Conheça a estrutura que conecta clientes em cidades do Tocantins.</p></div></section>
      <section className="inner-section soft-section"><div className="model-shell"><div className="model-heading"><h2>Nossa estrutura</h2><p>Imagens oficiais serão incluídas conforme o acervo da Netbox for validado.</p></div><div className="structure-gallery">
        {structureItems.map((item, index) => <article key={item}><div className={`structure-art s-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span><i>Foto oficial pendente</i></div><h3>{item}</h3></article>)}
      </div></div></section>
      <section className="inner-section coverage-inner"><div className="model-shell"><div><small>Cobertura publicada</small><h2>Cidades listadas pela Netbox</h2><p>A disponibilidade deve ser confirmada para o endereço exato.</p></div><div className="city-chip-grid">{coverageCities.map((city) => <span key={city}>⌖ {city}</span>)}</div><a className="model-button yellow" href="/contatos">Consultar meu endereço →</a></div></section>
    </NetboxFrame>
  );
}
