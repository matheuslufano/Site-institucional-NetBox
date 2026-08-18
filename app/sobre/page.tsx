import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon } from "../_components/ArrowIcon";
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
        <div className="model-shell about-hero-layout">
          <div className="about-hero-copy">
            <div className="inner-hero-nav"><BackButton /><span>Início / Sobre nós</span></div>
            <h1>Conexão regional feita para estar perto.</h1>
            <p>Conheça os princípios que orientam a Netbox e as pessoas que fazem a conexão acontecer no Tocantins.</p>

          </div>
          <figure className="about-hero-media">
            <Image src="/sobre-equipe-netbox.png" alt="Equipe Netbox reunida em frente à unidade" fill priority unoptimized sizes="(max-width: 760px) calc(100vw - 32px), 44vw" />
            <figcaption><strong>Gente que conecta</strong><span>Equipe e presença regional</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="inner-section about-story-section">
        <div className="model-shell story-layout about-story-layout">
          <div className="about-story-visual">
            <figure className="about-story-main">
              <Image src="/sobre-loja-netbox.png" alt="Fachada de uma unidade Netbox" fill unoptimized sizes="(max-width: 760px) calc(100vw - 32px), 42vw" />
            </figure>
            <figure className="about-story-detail">
              <Image src="/sobre-central-atendimento.webp" alt="Central de atendimento e infraestrutura interna da Netbox" fill unoptimized sizes="(max-width: 760px) 42vw, 20vw" />
            </figure>
            <div className="about-story-mark" aria-hidden="true"><span>NET</span><strong>BOX</strong></div>
          </div>
          <div className="inner-copy about-story-copy">
            <small>Quem somos</small>
            <h2>Uma empresa de internet com presença regional.</h2>
            <p>A Netbox atua levando conectividade por fibra óptica a cidades do Tocantins, combinando tecnologia, canais digitais e relacionamento próximo com seus clientes.</p>
            <p>As informações históricas detalhadas, números de clientes e extensão da rede serão publicados somente após validação institucional.</p>
            <div className="about-story-highlights">
              <span><b>01</b> Tecnologia que aproxima</span>
              <span><b>02</b> Equipe presente na região</span>
            </div>
            <a className="model-button yellow" href="/contatos">Falar com a Netbox <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="inner-section soft-section">
        <div className="model-shell about-values">
          <div className="model-heading"><small>Nosso jeito de conectar</small><h2>Compromissos Netbox</h2><p>Princípios que traduzem a experiência proposta pela marca.</p></div>
          <div className="value-grid">
            <article><span>01</span><h3>Proximidade</h3><p>Atendimento regional e canais para conversar de forma simples.</p></article>
            <article><span>02</span><h3>Tecnologia</h3><p>Fibra óptica e soluções pensadas para casas e empresas.</p></article>
            <article><span>03</span><h3>Transparência</h3><p>Condições comerciais confirmadas antes da contratação.</p></article>
            <article><span>04</span><h3>Relacionamento</h3><p>Internet de verdade. Amizade que conecta.</p></article>
          </div>
        </div>
      </section>

      <section className="inner-cta"><div className="model-shell"><h2>Quer conhecer a Netbox mais de perto?</h2><p>Veja nossas soluções ou converse com a equipe.</p><a className="model-button white" href="/nossos-servicos">Conhecer os serviços <ArrowIcon /></a></div></section>
    </NetboxFrame>
  );
}
