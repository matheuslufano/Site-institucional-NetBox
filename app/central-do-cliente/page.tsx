import type { Metadata } from "next";
import { BackButton } from "../_components/BackButton";
import { NetboxFrame } from "../_components/NetboxFrame";

const CENTRAL_URL = "https://netboxfibra.sgp.net.br/accounts/central/login";

export const metadata: Metadata = {
  title: "Central do Cliente Netbox | Faturas e autoatendimento",
  description: "Acesse segunda via, promessa de pagamento, fatura mensal e ferramentas para testar sua conexão Netbox.",
};

const accountServices = [
  {
    icon: "▤",
    label: "Financeiro",
    title: "2ª via de boleto",
    text: "Consulte seus boletos e acesse a segunda via pela Central do Assinante.",
  },
  {
    icon: "✓",
    label: "Negociação",
    title: "Promessa de pagamento",
    text: "Informe seu compromisso de pagamento diretamente no autoatendimento.",
  },
  {
    icon: "◫",
    label: "Minha assinatura",
    title: "Fatura mensal",
    text: "Consulte os dados e o histórico financeiro da sua assinatura Netbox.",
  },
];

const speedTests = [
  { name: "Fast.com", url: "https://fast.com/pt/", mark: "FAST" },
  { name: "Speedtest", url: "https://www.speedtest.net/pt", mark: "GO" },
  { name: "Minha Conexão", url: "https://www.minhaconexao.com.br/", mark: "MB" },
];

export default function CustomerCenterPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero customer-center-hero">
        <div className="model-shell">
          <div className="inner-hero-nav">
            <BackButton />
            <span>Início / Central do Cliente</span>
          </div>
          <h1>Resolva tudo de forma simples.</h1>
          <p>Acesse os serviços da sua assinatura e confira a qualidade da sua conexão em poucos cliques.</p>
        </div>
      </section>

      <section className="inner-section customer-center-section">
        <div className="model-shell">
          <div className="model-heading customer-center-heading">
            <small>Central do Assinante</small>
            <h2>O que você precisa acessar?</h2>
            <p>Todos os serviços abaixo abrem o ambiente seguro de autoatendimento da Netbox.</p>
          </div>
          <div className="customer-service-grid">
            {accountServices.map((service) => (
              <a href={CENTRAL_URL} target="_blank" rel="noreferrer" key={service.title}>
                <span className="customer-service-icon" aria-hidden="true">{service.icon}</span>
                <small>{service.label}</small>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <strong>Acessar agora <span aria-hidden="true">↗</span></strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section speed-test-section">
        <div className="model-shell speed-test-layout">
          <div className="inner-copy">
            <small>Teste de velocidade</small>
            <h2>Confira o desempenho da sua conexão.</h2>
            <p>Para um resultado mais preciso, faça o teste utilizando um computador conectado diretamente ao roteador por um cabo de rede.</p>
            <div className="speed-tip"><span aria-hidden="true">i</span><p>Feche downloads, vídeos e outros aplicativos que estejam usando a internet antes de começar.</p></div>
          </div>
          <div className="speed-test-links">
            {speedTests.map((test) => (
              <a href={test.url} target="_blank" rel="noreferrer" key={test.name}>
                <span aria-hidden="true">{test.mark}</span>
                <div><small>Teste externo</small><strong>{test.name}</strong></div>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-cta customer-center-cta">
        <div className="model-shell">
          <h2>Ainda precisa de ajuda?</h2>
          <p>Fale com a equipe Netbox pelo canal oficial de atendimento.</p>
          <a className="model-button yellow" href="https://wa.me/5508006022732" target="_blank" rel="noreferrer">Falar no WhatsApp →</a>
        </div>
      </section>
    </NetboxFrame>
  );
}
