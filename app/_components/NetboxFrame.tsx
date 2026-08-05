"use client";

import { ReactNode, useEffect, useState } from "react";
import { ClientShortcuts } from "./ClientShortcuts";
import { MenuContactLinks } from "./MenuContactLinks";
import { useScrollDirectionVisibility } from "./useScrollDirectionVisibility";

const WHATSAPP = "5508006022732";
const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";

const navItems = [
  ["/", "Início"],
  ["/sobre", "Sobre nós"],
  ["/nossos-servicos", "Serviços"],
  ["/nossa-estrutura", "Nossa estrutura"],
  ["/depoimentos", "Depoimentos"],
  ["/contatos", "Contatos"],
];

export function NetboxFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationVisible = useScrollDirectionVisibility();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("mobile-menu-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header
        className={`model-header${navigationVisible || menuOpen ? "" : " is-hidden"}`}
      >
        <a
          className="model-brand"
          href="/"
          aria-label="Netbox Internet — início"
        >
          <img src="/LOGO-NETBOX.png" alt="Netbox Internet" />
        </a>
        <nav
          id="menu-principal"
          className={menuOpen ? "model-nav open" : "model-nav"}
          aria-label="Navegação principal"
        >
          <div className="mobile-nav-heading" aria-hidden="true">
            <span>Menu</span>
            <small>Netbox Internet</small>
          </div>
          {navItems.map(([href, label]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <MenuContactLinks />
        </nav>
        <button
          className={menuOpen ? "model-menu open" : "model-menu"}
          aria-controls="menu-principal"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
          tabIndex={-1}
        />
      )}

      <main id="conteudo">{children}</main>

      <footer className="model-footer inner-footer">
        <div className="model-shell footer-main">
          <div className="footer-services">
            <a className="inner-footer-link" href="/nossos-servicos">
              <span>⌁</span>
              <div>
                <strong>Internet residencial →</strong>
                <small>Fibra óptica para sua casa e sua rotina.</small>
              </div>
            </a>
            <a className="inner-footer-link" href="/nossos-servicos#empresas">
              <span>▦</span>
              <div>
                <strong>Soluções empresariais →</strong>
                <small>Internet empresarial e link dedicado.</small>
              </div>
            </a>
            <a className="inner-footer-link" href="/contatos">
              <span>◉</span>
              <div>
                <strong>Atendimento →</strong>
                <small>Suporte, segunda via e canais oficiais.</small>
              </div>
            </a>
            <a className="footer-pill" href="/nossos-servicos">
              Todos os serviços →
            </a>
          </div>

          <div className="footer-about">
            <img src="/logo-branca-1024x371.png" alt="Netbox Internet" />
            <p>
              Fibra óptica, presença regional e atendimento humanizado para
              conectar o Tocantins.
            </p>
            <a className="model-button yellow" href="/sobre">
              Mais sobre a Netbox →
            </a>
          </div>

          <div className="footer-contact">
            <div className="footer-visual" aria-hidden="true">
              <span>NET</span>
              <strong>BOX</strong>
              <i>⌁</i>
            </div>
            <a href="tel:08006022732">☎ 0800 602 2732</a>
            <a href={SECOND_COPY} target="_blank" rel="noreferrer">
              2ª via de boleto
            </a>
            <a href="/contatos">Todos os contatos</a>
          </div>
        </div>
        <div className="model-shell footer-bottom">
          <span>
            © {new Date().getFullYear()} Netbox Internet LTDA • CNPJ
            25.356.470/0001-13
          </span>
          <span>
            <a href="https://netbox.net.br/ouvidoria/">Ouvidoria</a> •{" "}
            <a href="https://netbox.net.br/politica-de-privacidade/">
              Privacidade
            </a>
          </span>
        </div>
      </footer>

      <a
        className={`model-whatsapp${navigationVisible ? " shortcuts-visible" : ""}`}
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo site da Netbox e gostaria de atendimento.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Netbox pelo WhatsApp"
      >
        <small>Atendimento agora!</small>
        <strong>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
            <path d="M9.1 8.7c.2 2.3 2 4.1 4.3 4.4m-.1 0 1.5-.8 1.4 1.1-.4 1.5c-.2.5-.7.7-1.2.6-3.3-.7-5.9-3.3-6.6-6.6-.1-.5.1-1 .6-1.2l1.5-.4 1.1 1.4-.8 1.5" />
          </svg>
          <span>Fale Conosco</span>
        </strong>
      </a>

      <ClientShortcuts />
    </>
  );
}
