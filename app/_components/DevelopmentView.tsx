"use client";

import type { MouseEvent } from "react";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import styles from "../em-desenvolvimento/page.module.css";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=br.com.appdoprovedor.netbox";
const APP_STORE = "https://apps.apple.com/br/app/netbox/id1574550280";
const MESSAGE =
  "Olá! Vim pelo site da Netbox e gostaria de falar com a equipe.";

export function DevelopmentView() {
  function openAppStore(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const userAgent = navigator.userAgent || "";
    const isAppleDevice =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    window.location.href = isAppleDevice ? APP_STORE : PLAY_STORE;
  }

  const whatsappUrl =
    "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MESSAGE);

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="development-title">
        <div className={styles.copy}>
          <img
            className={styles.logo}
            src="/LOGO-NETBOX.png"
            alt="Netbox Internet — Internet de verdade"
            width={310}
            height={112}
          />
          <span className={styles.badge}>Estamos preparando novidades</span>
          <h1 id="development-title">
            Nosso site está passando por melhorias
          </h1>
          <p>
            Em breve, você terá uma nova experiência por aqui. Enquanto isso,
            nossa equipe continua atendendo pelo WhatsApp.
          </p>
          <nav className={styles.actions} aria-label="Acessos rápidos">
            <a
              className={styles.action}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>WhatsApp</span>
              <FaArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
            <a
              className={styles.action}
              href={SECOND_COPY}
              target="_blank"
              rel="noreferrer"
            >
              <IoDocumentTextOutline aria-hidden="true" />
              <span>Segunda via do boleto</span>
              <FaArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
            <a
              className={styles.action}
              href={PLAY_STORE}
              onClick={openAppStore}
            >
              <img src="/netbox-app-icon.png" alt="" aria-hidden="true" />
              <span>App Netbox</span>
              <FaArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
          </nav>
          <div className={styles.tagline}>
            <span aria-hidden="true" />
            Internet de verdade. Amizade que conecta.
          </div>
        </div>
        <div className={styles.illustration} aria-hidden="true">
          <img src="/maintenance-rocket.png" alt="" />
        </div>
      </section>
    </main>
  );
}
