import type { Metadata } from "next";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Depoimentos | Experiências de clientes Netbox",
  description: "Área preparada para avaliações reais e autorizadas de clientes Netbox.",
};

const cities = ["Paraíso do Tocantins", "Guaraí", "Colinas do Tocantins", "Miranorte", "Miracema", "Pedro Afonso"];

export default function ReviewsPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero reviews-hero"><div className="model-shell"><span>Início / Depoimentos</span><h1>Experiências de quem está conectado.</h1><p>Avaliações reais, identificadas e publicadas com autorização.</p></div></section>
      <section className="inner-section soft-section"><div className="model-shell"><div className="review-policy"><strong>Compromisso com a transparência</strong><p>A Netbox não publica avaliações fictícias. Os espaços abaixo permanecem sinalizados até que os depoimentos reais sejam validados.</p></div><div className="reviews-grid inner-reviews">
        {cities.map((city, index) => <article key={city}><span className="review-avatar">{String(index + 1).padStart(2, "0")}</span><p>Depoimento real pendente de validação e autorização para publicação.</p><strong>Cliente Netbox</strong><small>{city}</small><div>☆ ☆ ☆ ☆ ☆</div></article>)}
      </div><div className="center-action"><a className="model-button yellow" href="https://netbox.net.br/avalie.html">Quero avaliar a Netbox →</a></div></div></section>
      <section className="inner-cta"><div className="model-shell"><h2>Teve uma boa experiência com a Netbox?</h2><p>Compartilhe sua avaliação pelo canal oficial.</p><a className="model-button white" href="https://netbox.net.br/avalie.html">Enviar avaliação →</a></div></section>
    </NetboxFrame>
  );
}
