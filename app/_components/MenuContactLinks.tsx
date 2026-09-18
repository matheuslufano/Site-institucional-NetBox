import { ReactNode } from "react";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";

type IconName = "whatsapp" | "instagram" | "mail" | "phone" | "document";

function ContactIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    whatsapp: (
      <ImWhatsapp />
    ),
    instagram: (
      <FaInstagram />  
    ),
    mail: (
      <TfiEmail />
    ),
    phone: (
      <FiPhone />
    ),
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
  };

  const icon = name === "document" ? (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  ) : paths[name];

  return <span className="menu-contact-icon">{icon}</span>;
}

export function MenuContactLinks() {
  return (
    <div className="menu-contact-links" aria-label="Canais de atendimento">
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp da Netbox"
        title="WhatsApp"
      >
        <ContactIcon name="whatsapp" />
      </a>
      <a
        href="https://www.instagram.com/netboxinternet/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram da Netbox"
        title="Instagram"
      >
        <ContactIcon name="instagram" />
      </a>
      <a
        href="mailto:atendimento@netbox.net.br"
        aria-label="Enviar e-mail para a Netbox"
        title="E-mail"
      >
        <ContactIcon name="mail" />
      </a>
      <a
        href="tel:08006022732"
        aria-label="Ligar para a Netbox no 0800 602 2732"
        title="Telefone"
      >
        <ContactIcon name="phone" />
      </a>
      <a
        className="menu-boleto-link"
        href={SECOND_COPY}
        target="_blank"
        rel="noreferrer"
        aria-label="Acessar boleto"
        title="Boleto"
      >
        <ContactIcon name="document" />
        <span>Boleto</span>
      </a>
    </div>
  );
}
