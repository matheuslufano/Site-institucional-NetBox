"use client";

import { type ReactNode, useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";

const WHATSAPP = "5508006022732";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Netbox e gostaria de atendimento.";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const EMAIL = "atendimento@netbox.net.br";
const EMAIL_SUBJECT = "Atendimento Netbox — contato pelo site";
const WEBMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;
const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

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
  const [desktopEmail, setDesktopEmail] = useState(false);

  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const iPad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    setDesktopEmail(!mobile && !iPad);
  }, []);

  return (
    <div className="menu-contact-links" aria-label="Canais de atendimento">
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
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
        href={desktopEmail ? WEBMAIL_URL : MAILTO_URL}
        target={desktopEmail ? "_blank" : undefined}
        rel={desktopEmail ? "noopener noreferrer" : undefined}
        aria-label={desktopEmail ? "Enviar e-mail para a Netbox pelo Gmail (nova aba)" : "Enviar e-mail para a Netbox"}
        title={desktopEmail ? "E-mail — abrir Gmail em nova aba" : "E-mail"}
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
