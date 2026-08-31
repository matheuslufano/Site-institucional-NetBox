"use client";

import styles from "../em-desenvolvimento/page.module.css";

const WHATSAPP = "5508006022732";
const MESSAGE =
  "Olá! Vim pelo site da Netbox e gostaria de falar com a equipe.";

export function DevelopmentView() {
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="development-title">
        <img
          className={styles.logo}
          src="/LOGO-NETBOX.png"
          alt="Netbox Internet"
          width={260}
          height={94}
        />
        <span className={styles.badge}>Estamos preparando novidades</span>
        <h1 id="development-title">
          Este site ainda está em desenvolvimento.
        </h1>
        <p>
          Em breve, uma nova experiência estará disponível. Enquanto isso,
          nossa equipe continua atendendo normalmente pelo WhatsApp.
        </p>
        <a
          className={styles.whatsappButton}
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={styles.whatsappIcon}
            src="/whatsapp-shortcut.png"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          Falar com a Netbox
        </a>
      </section>
    </main>
  );
}
