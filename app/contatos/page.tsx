import type { Metadata } from "next";
import { ContactForm } from "../_components/ContactForm";
import { NetboxFrame } from "../_components/NetboxFrame";

export const metadata: Metadata = {
  title: "Contatos Netbox | Atendimento e suporte",
  description: "Fale com a Netbox pelo WhatsApp, telefone ou canais de autoatendimento.",
};

export default function ContactPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero contact-hero"><div className="model-shell"><span>Início / Contatos</span><h1>Como podemos ajudar?</h1><p>Escolha o melhor canal para contratar, pedir suporte ou cuidar da assinatura.</p></div></section>
      <section className="inner-section"><div className="model-shell"><div className="contact-cards">
        <a href="tel:08006022732"><span>☎</span><small>Central de atendimento</small><strong>0800 602 2732</strong><em>Ligue para falar com a equipe</em></a>
        <a href="https://wa.me/5508006022732"><span>◔</span><small>WhatsApp</small><strong>Fale com a Netbox</strong><em>Atendimento pelo canal oficial</em></a>
        <a href="https://netboxfibra.sgp.net.br/accounts/central/login"><span>▤</span><small>Autoatendimento</small><strong>Central do Assinante</strong><em>Faturas e serviços da assinatura</em></a>
        <a href="https://netbox.net.br/ouvidoria/"><span>◎</span><small>Canal institucional</small><strong>Ouvidoria</strong><em>Para demandas com protocolo anterior</em></a>
      </div></div></section>
      <section className="inner-section soft-section"><div className="model-shell contact-layout"><div className="inner-copy"><small>Envie sua mensagem</small><h2>Conte o que você precisa.</h2><p>Preencha os dados essenciais. A mensagem será preparada e encaminhada para o WhatsApp da Netbox.</p><div className="contact-hours"><strong>Atendimento divulgado</strong><span>Segunda a sexta: 7h às 22h</span><span>Sábado: 8h às 18h</span><span>Domingos e feriados: 8h às 18h</span></div></div><ContactForm /></div></section>
    </NetboxFrame>
  );
}
