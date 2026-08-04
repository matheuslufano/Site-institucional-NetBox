import type { Metadata } from "next";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Sobre a Netbox | Presença regional no Tocantins",
  description: "Conheça o propósito, os compromissos e a atuação regional da Netbox Internet.",
};

export default function AboutPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero about-hero">
        <div className="model-shell"><div className="inner-hero-nav"><BackButton /><span>Início / Sobre nós</span></div><h1>Conexão regional feita para estar perto.</h1><p>Conheça os princípios que orientam a Netbox no Tocantins.</p></div>
      </section>
      <section className="inner-section">
        <div className="model-shell story-layout">
          <div className="inner-art about-art"><span>NET</span><strong>BOX</strong><i>Internet de verdade</i></div>
          <div className="inner-copy"><small>Quem somos</small><h2>Uma empresa de internet com presença regional.</h2><p>A Netbox atua levando conectividade por fibra óptica a cidades do Tocantins, combinando tecnologia, canais digitais e relacionamento próximo com seus clientes.</p><p>As informações históricas detalhadas, números de clientes e extensão da rede serão publicados somente após validação institucional.</p><a className="model-button yellow" href="/contatos">Falar com a Netbox →</a></div>
        </div>
      </section>
      <section className="inner-section soft-section">
        <div className="model-shell"><div className="model-heading"><h2>Compromissos Netbox</h2><p>Princípios que traduzem a experiência proposta pela marca.</p></div><div className="value-grid">
          <article><span>01</span><h3>Proximidade</h3><p>Atendimento regional e canais para conversar de forma simples.</p></article>
          <article><span>02</span><h3>Tecnologia</h3><p>Fibra óptica e soluções pensadas para casas e empresas.</p></article>
          <article><span>03</span><h3>Transparência</h3><p>Condições comerciais confirmadas antes da contratação.</p></article>
          <article><span>04</span><h3>Relacionamento</h3><p>Internet de verdade. Amizade que conecta.</p></article>
        </div></div>
      </section>
      <section className="inner-cta"><div className="model-shell"><h2>Quer conhecer a Netbox mais de perto?</h2><p>Veja nossas soluções ou converse com a equipe.</p><a className="model-button white" href="/nossos-servicos">Conhecer os serviços →</a></div></section>
    </NetboxFrame>
  );
}
