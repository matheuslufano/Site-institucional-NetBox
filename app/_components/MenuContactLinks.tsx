import { ReactNode } from "react";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";

type IconName = "whatsapp" | "facebook" | "mail" | "phone" | "document";

function ContactIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    whatsapp: (
      <>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
        <path d="M9.1 8.7c.2 2.3 2 4.1 4.3 4.4" />
        <path d="m13.3 13.1 1.5-.8 1.4 1.1-.4 1.5c-.2.5-.7.7-1.2.6-3.3-.7-5.9-3.3-6.6-6.6-.1-.5.1-1 .6-1.2l1.5-.4 1.1 1.4-.8 1.5" />
      </>
    ),
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />,
    mail: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />,
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export function MenuContactLinks() {
  return (
    <div className="menu-contact-links" aria-label="Canais de atendimento">
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp da Netbox" title="WhatsApp"><ContactIcon name="whatsapp" /></a>
      <a href="https://www.facebook.com/Netboxinternetfibra/" target="_blank" rel="noreferrer" aria-label="Facebook da Netbox" title="Facebook"><ContactIcon name="facebook" /></a>
      <a href="mailto:atendimento@netbox.net.br" aria-label="Enviar e-mail para a Netbox" title="E-mail"><ContactIcon name="mail" /></a>
      <a href="tel:08006022732" aria-label="Ligar para a Netbox no 0800 602 2732" title="Telefone"><ContactIcon name="phone" /></a>
      <a className="menu-boleto-link" href={SECOND_COPY} target="_blank" rel="noreferrer" aria-label="Acessar boleto" title="Boleto">
        <ContactIcon name="document" />
        <span>Boleto</span>
      </a>
    </div>
  );
}
