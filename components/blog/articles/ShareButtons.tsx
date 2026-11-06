"use client";
import styles from "./ShareButtons.module.css";
import Image from "next/image";
import { useState } from "react";
import { trackArticleAction } from '@/lib/blog/analytics';
import { FiCopy, FiShare2 } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

/** A local white logo stays visible independently of inherited SVG fill/stroke styles. */
function WhatsAppIcon() {
  return (
    <Image
      src="/blog/providers/whatsapp-share.svg"
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      unoptimized
    />
  );
}

/** Explicit user actions share the canonical URL; clipboard errors have visible feedback. */
export function ShareButtons({
  title,
  url,
  className = "",
  analyticsArticleId,
}: {
  title: string;
  url: string;
  className?: string;
  analyticsArticleId?: string;
}) {
  const [message, setMessage] = useState("");
  const links = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      href: "https://wa.me/?text=" + encodeURIComponent(title + " " + url),
    },
    {
      id: "x",
      label: "X",
      Icon: FaXTwitter,
      href:
        "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(title),
    },
    { id: "instagram", label: "Instagram", Icon: FaInstagram, href: null },
    {
      id: "telegram",
      label: "Telegram",
      Icon: FaTelegram,
      href:
        "https://t.me/share/url?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(title),
    },
    {
      id: "facebook",
      label: "Facebook",
      Icon: FaFacebookF,
      href:
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(url),
    },
  ];
  async function copy(instagram = false) {
    try {
      await navigator.clipboard.writeText(url);
      setMessage(
        instagram
          ? "Link copiado. Cole no Instagram para compartilhar."
          : "Link copiado.",
      );
    } catch {
      setMessage(
        "Não foi possível copiar. Copie o endereço na barra do navegador.",
      );
    }
  }
  function trackShare() { trackArticleAction('article_share',analyticsArticleId); }
  async function share() {
    if (!navigator.share) {
      await copy();
      return;
    }
    try {
      await navigator.share({ title, url });
      setMessage("Compartilhamento concluído.");
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError"))
        setMessage(
          "Não foi possível compartilhar. Use uma das redes ou copie o link.",
        );
    }
  }
  return (
    <div
      className={`${styles.share} ${className}`}
      aria-label="Compartilhar artigo"
    >
      <strong>Compartilhar</strong>
      <div className={styles.buttons}>
        {links.map(({ id, label, Icon, href }) =>
          href ? (
            <a
              key={id}
              className={styles.button}
              data-network={id}
              href={href}
              title={`Compartilhar: ${label}`}
              aria-label={`Compartilhar: ${label}`}
              target={id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={trackShare}
            >
              <Icon aria-hidden="true" />
            </a>
          ) : (
            <button
              key={id}
              className={styles.button}
              data-network={id}
              type="button"
              title="Copiar link para compartilhar no Instagram"
              aria-label="Copiar link para compartilhar no Instagram"
              onClick={() => { trackShare(); void copy(true); }}
            >
              <Icon aria-hidden="true" />
            </button>
          ),
        )}
        <button
          className={styles.button}
          type="button"
          title="Mais opções de compartilhamento"
          aria-label="Mais opções de compartilhamento"
          onClick={() => { trackShare(); void share(); }}
        >
          <FiShare2 aria-hidden="true" />
        </button>
        <button
          className={styles.button}
          type="button"
          title="Copiar link"
          aria-label="Copiar link"
          onClick={() => { trackShare(); void copy(); }}
        >
          <FiCopy aria-hidden="true" />
        </button>
      </div>
      <span className={styles.status} role="status">
        {message}
      </span>
    </div>
  );
}
