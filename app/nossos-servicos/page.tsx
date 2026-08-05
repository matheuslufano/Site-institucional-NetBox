import type { Metadata } from "next";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Serviços Netbox | Internet residencial e empresarial",
  description: "Conheça as soluções residenciais, empresariais e os canais de atendimento da Netbox.",
};

const serviceDetails = [
  ["⌁", "Internet residencial", "Conectividade por fibra óptica para estudar, trabalhar, assistir e manter a casa conectada.", ["Consulta por cidade e endereço", "Roteador em comodato conforme condições", "Oferta confirmada pelo consultor"]],
  ["▦", "Internet empresarial", "Soluções para empresas que precisam de estabilidade, flexibilidade e atendimento personalizado.", ["Internet empresarial", "Análise da necessidade do negócio", "Atendimento preferencial"]],
  ["↗", "Link dedicado", "Conectividade personalizada para operações que precisam de desempenho e disponibilidade.", ["Proposta sob medida", "Análise técnica", "Executivo de contas"]],
  ["◉", "Atendimento ao cliente", "Acessos rápidos para cuidar da assinatura e falar com a equipe Netbox.", ["Segunda via e financeiro", "Suporte técnico", "Aplicativo e Central do Assinante"]],
];

export default function ServicesPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero services-hero"><div className="model-shell"><div className="inner-hero-nav"><BackButton /><span>Início / Serviços</span></div><h1>Soluções para conectar cada momento.</h1><p>Casa, empresa e atendimento reunidos em uma página completa.</p></div></section>
      <section className="inner-section">
        <div className="model-shell"><div className="model-heading"><h2>Nossos serviços</h2><p>Escolha uma jornada e fale com o canal adequado.</p></div><div className="detail-service-grid">
          {serviceDetails.map(([icon, title, text, items]) => (
            <article key={String(title)} id={title === "Internet empresarial" ? "empresas" : undefined}>
              <span>{icon as string}</span><h2>{title as string}</h2><p>{text as string}</p>
              <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
              <a className="model-button yellow" href={title === "Atendimento ao cliente" ? "/contatos" : `https://wa.me/${"5508006022732"}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${title}.`)}`}>Saiba mais →</a>
            </article>
          ))}
        </div></div>
      </section>
      <section className="support-strip"><div className="model-shell"><div><small>Já sou cliente</small><h2>Resolva tudo com mais praticidade.</h2></div><div><a href="https://netboxfibra.sgp.net.br/accounts/central/login">2ª !</a><a href="/contatos">Suporte</a><a href="https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox">Aplicativo</a></div></div></section>
    </NetboxFrame>
  );
}
