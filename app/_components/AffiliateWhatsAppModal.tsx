"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AffiliateWhatsAppModal.module.css";
import { AFFILIATE_WHATSAPP_EVENT } from "./affiliateWhatsApp";

const AFFILIATE_CODE_PATTERN = /^[a-f0-9]{8}$/i;
const AFFILIATE_STORAGE_KEY = "netbox-affiliate-code";
const AFFILIATE_WHATSAPP = "556332330892";
const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "web.whatsapp.com",
]);

function normalizedAffiliateCode(value: string | null) {
  const code = String(value || "").trim().toLowerCase();
  return AFFILIATE_CODE_PATTERN.test(code) ? code : null;
}

function isWhatsAppUrl(url: URL) {
  return WHATSAPP_HOSTS.has(url.hostname.toLowerCase());
}

function messageWithAffiliateCode(message: string, code: string) {
  const codeLine = `Código do afiliado: [${code}]`;
  if (message.toLowerCase().includes(code.toLowerCase())) return message;
  return message.trim() ? `${message.trim()}\n\n${codeLine}` : codeLine;
}

export function AffiliateWhatsAppModal() {
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);
  const [pendingWhatsAppUrl, setPendingWhatsAppUrl] = useState<URL | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);

  const open = Boolean(affiliateCode && pendingWhatsAppUrl);

  useEffect(() => {
    const queryCode = normalizedAffiliateCode(
      new URLSearchParams(window.location.search).get("ref"),
    );
    const storedCode = normalizedAffiliateCode(
      window.sessionStorage.getItem(AFFILIATE_STORAGE_KEY),
    );

    if (queryCode) {
      window.sessionStorage.setItem(AFFILIATE_STORAGE_KEY, queryCode);
    }

    const timer = window.setTimeout(
      () => setAffiliateCode(queryCode || storedCode),
      0,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!affiliateCode) return;

    function interceptProgrammaticWhatsApp(event: Event) {
      const customEvent = event as CustomEvent<{ url?: string }>;
      if (!customEvent.detail?.url) return;

      try {
        const url = new URL(customEvent.detail.url, window.location.href);
        if (isWhatsAppUrl(url)) setPendingWhatsAppUrl(url);
      } catch {
        // Ignora URLs inválidas e mantém o usuário na página.
      }
    }

    function interceptWhatsAppClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (!isWhatsAppUrl(url)) return;

      event.preventDefault();
      setPendingWhatsAppUrl(url);
    }

    window.addEventListener(
      AFFILIATE_WHATSAPP_EVENT,
      interceptProgrammaticWhatsApp,
    );
    document.addEventListener("click", interceptWhatsAppClick, true);
    return () => {
      window.removeEventListener(
        AFFILIATE_WHATSAPP_EVENT,
        interceptProgrammaticWhatsApp,
      );
      document.removeEventListener("click", interceptWhatsAppClick, true);
    };
  }, [affiliateCode]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    continueButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPendingWhatsAppUrl(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function continueToWhatsApp() {
    if (!affiliateCode || !pendingWhatsAppUrl) return;

    const destination = new URL(pendingWhatsAppUrl.toString());
    if (destination.hostname.toLowerCase() === "wa.me") {
      destination.pathname = `/${AFFILIATE_WHATSAPP}`;
    } else {
      destination.searchParams.set("phone", AFFILIATE_WHATSAPP);
    }
    destination.searchParams.set(
      "text",
      messageWithAffiliateCode(
        destination.searchParams.get("text") || "",
        affiliateCode,
      ),
    );

    setPendingWhatsAppUrl(null);
    window.open(destination.toString(), "_blank", "noopener,noreferrer");
  }

  if (!open || !affiliateCode) return null;

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="affiliate-whatsapp-title"
        aria-describedby="affiliate-whatsapp-description"
      >
        <div className={styles.handle} aria-hidden="true" />
        <div className={styles.icon} aria-hidden="true">
          <span>✓</span>
        </div>

        <p className={styles.eyebrow}>Link de divulgação identificado</p>
        <h2 id="affiliate-whatsapp-title">Leve seu código para o WhatsApp</h2>
        <p id="affiliate-whatsapp-description" className={styles.description}>
          Para que o afiliado responsável seja identificado, mantenha a mensagem
          preparada no WhatsApp ou encaminhe o código abaixo durante o atendimento.
        </p>

        <div className={styles.codeCard}>
          <span>Código do afiliado</span>
          <strong>{affiliateCode}</strong>
          <small>Ele será incluído automaticamente na mensagem.</small>
        </div>

        <div className={styles.actions}>
          <button
            ref={continueButtonRef}
            type="button"
            className={styles.primaryAction}
            onClick={continueToWhatsApp}
          >
            Manter mensagem e continuar
          </button>
          <button
            type="button"
            className={styles.cancelAction}
            onClick={() => setPendingWhatsAppUrl(null)}
          >
            Agora não
          </button>
        </div>
      </section>
    </div>
  );
}
