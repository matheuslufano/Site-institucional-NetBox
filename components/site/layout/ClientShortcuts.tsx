"use client";

import { INSTAGRAM_URL, SECOND_COPY, SUPPORT_EMAIL, SUPPORT_PHONE_URL, WHATSAPP } from "@/constants/site";
import { useScrollDirectionVisibility } from "@/hooks/useScrollDirectionVisibility";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoAddOutline, IoHomeOutline, IoNewspaperOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import styles from "./ClientShortcuts.module.css";

const whatsappUrl = `https://wa.me/${WHATSAPP}`;

const mobileContactLinks = [
  { id: "instagram", label: "Instagram", href: INSTAGRAM_URL, icon: <FaInstagram aria-hidden="true" />, external: true },
  { id: "whatsapp", label: "WhatsApp", href: whatsappUrl, icon: <FaWhatsapp aria-hidden="true" />, external: true },
  { id: "email", label: "E-mail", href: `mailto:${SUPPORT_EMAIL}`, icon: <span className="icon-[logos--google-gmail-2020]" aria-hidden="true" /> },
  { id: "phone", label: "Telefone", href: SUPPORT_PHONE_URL, icon: <Image src="/mobile-support-headset.png" alt="" width={31} height={31} unoptimized /> },
];

export function ClientShortcuts() {
  const visible = useScrollDirectionVisibility();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);
  const [contactsOpen, setContactsOpen] = useState(false);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const currentShortcut = pathname === "/contatos" ? "services" : pathname === "/nossa-estrutura" ? "stores" : null;
  const itemClass = (item: string) => (selected ?? currentShortcut) === item ? "is-selected" : undefined;
  const shortcutsVisible = visible || contactsOpen;
  const hiddenTabIndex = shortcutsVisible ? undefined : -1;

  useEffect(() => {
    if (!contactsOpen) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !shortcutsRef.current?.contains(event.target)) {
        setContactsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setContactsOpen(false);
      moreButtonRef.current?.focus();
    }

    function closeOnPageScroll() {
      setContactsOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnPageScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnPageScroll);
    };
  }, [contactsOpen]);

  return (
    <div
      ref={shortcutsRef}
      className={`client-shortcuts${shortcutsVisible ? "" : " is-hidden"}`}
      aria-hidden={!shortcutsVisible}
      data-contacts-open={contactsOpen}
    >
      <a id="mobile-shortcut-menu" tabIndex={hiddenTabIndex} href="/">
        <span className="shortcut-icon" aria-hidden="true"><IoHomeOutline /></span>
        <span className="shortcut-label">Menu</span>
      </a>
      <a tabIndex={hiddenTabIndex} className={itemClass("billing")} href={SECOND_COPY} target="_blank" rel="noreferrer" onClick={() => setSelected("billing")}>
        <span className="shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3.5h8l3 3V20.5H7z" /><path d="M15 3.5v4h3M10 11h5M10 14.5h5" /></svg></span>
        <span className="shortcut-label">Boleto</span>
      </a>
      <a id="mobile-shortcut-services" tabIndex={hiddenTabIndex} className={itemClass("services")} href="/contatos" aria-current={pathname === "/contatos" ? "page" : undefined}>
        <span className="shortcut-icon" aria-hidden="true"><LiaToolsSolid className="shortcut-solid-icon" /></span>
        <span className="shortcut-label">Serviços</span>
      </a>
      <a id="mobile-shortcut-stores" tabIndex={hiddenTabIndex} className={itemClass("stores")} href="/nossa-estrutura">
        <span className="shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" /></svg></span>
        <span className="shortcut-label">Lojas</span>
      </a>
      <a id="mobile-shortcut-blog" tabIndex={hiddenTabIndex} href="/site/blog">
        <span className="shortcut-icon" aria-hidden="true"><IoNewspaperOutline /></span>
        <span className="shortcut-label">Blog</span>
      </a>
      <button
        id="mobile-shortcut-more"
        ref={moreButtonRef}
        type="button"
        tabIndex={hiddenTabIndex}
        aria-controls="mobile-shortcut-contacts"
        aria-expanded={contactsOpen}
        onClick={() => setContactsOpen((open) => !open)}
      >
        <span className="shortcut-icon" aria-hidden="true"><IoAddOutline /></span>
        <span className="shortcut-label">Mais</span>
      </button>
      <nav id="mobile-shortcut-contacts" className={styles.contactsPanel} aria-label="Canais de contato da Netbox" hidden={!contactsOpen}>
        {mobileContactLinks.map(({ id, label, href, icon, external }) => (
          <a
            key={id}
            id={`mobile-contact-${id}`}
            className={styles.contactLink}
            data-channel={id}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            onClick={() => setContactsOpen(false)}
          >
            {icon}
          </a>
        ))}
      </nav>
    </div>
  );
}
