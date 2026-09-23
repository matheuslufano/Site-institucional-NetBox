import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LuBuilding2, LuReceiptText } from "react-icons/lu";
import { BackButton } from "../_components/BackButton";
import { ContactForm } from "../_components/ContactForm";
import { NetboxFrame } from "../_components/NetboxFrame";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { IoMailUnreadOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Contatos Netbox | Atendimento e suporte",
  description:
    "Fale com a Netbox pelo WhatsApp, telefone ou canais de autoatendimento.",
};

export default function ContactPage() {
  return (
    <NetboxFrame>
      <section className="inner-page-hero contact-hero">
        <div className="model-shell">
          <div className="inner-hero-nav">
            <BackButton />
            <span>Início / Contatos</span>
          </div>
          <h1>Como podemos ajudar?</h1>
          <p>
            Escolha o melhor canal para contratar, pedir suporte ou cuidar da
            assinatura.
          </p>
        </div>
      </section>
      <section className="inner-section contact-centered-section">
        <div className="model-shell">
          <div className="contact-cards">
            <a href="tel:08006022732">
              <span className="contact-card-icon contact-icon-phone" aria-hidden="true"><FiPhone /></span>
              <small>Central de atendimento</small>
              <strong>0800 602 2732</strong>
              <em>Ligue para falar com a equipe</em>
            </a>
            <a href="https://wa.me/5508006022732">
              <span className="contact-card-icon contact-icon-whatsapp" aria-hidden="true"><FaWhatsapp /></span>
              <small>WhatsApp</small>
              <strong>Fale com a Netbox</strong>
              <em>Atendimento pelo canal oficial</em>
            </a>
            <a href="https://netboxfibra.sgp.net.br/accounts/central/login">
              <span className="contact-card-icon contact-icon-receipt" aria-hidden="true"><HiOutlineDocumentCurrencyDollar/></span>
              <small>Segunda Via do Boleto</small>
              <strong>Onde você pode encontar</strong>
              <em>Faturas e serviços da assinatura</em>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=atendimento%40netbox.net.br&su=Atendimento%20Netbox%20%E2%80%94%20contato%20pelo%20site/">
              <span className="contact-card-icon contact-icon-building" aria-hidden="true"><IoMailUnreadOutline /></span>
              <small>E - mail de Ouvidoria</small>
              <strong>atendimento@netbox.net.br</strong>
              <em>Envie sua mensagem para a equipe de Ouvidoria</em>
            </a>
          </div>
        </div>
      </section>
      <section className="inner-section soft-section contact-centered-section">
        <div className="model-shell contact-layout">
          <div className="inner-copy">
            <small>Envie sua mensagem</small>
            <h2>Conte o que você precisa.</h2>
            <p>
              Preencha os dados essenciais. A mensagem será preparada e
              encaminhada para o WhatsApp da Netbox.
            </p>
            <div className="contact-hours">
              <strong>Atendimento divulgado</strong>
              <span>Segunda a sexta: 7h às 22h</span>
              <span>Sábado: 8h às 18h</span>
              <span>Domingos e feriados: 8h às 18h</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </NetboxFrame>
  );
}
