"use client";

import { ReactNode, useEffect, useState } from "react";
import { ClientShortcuts } from "./ClientShortcuts";
import { MenuContactLinks } from "./MenuContactLinks";
import { ThemeToggle } from "./ThemeToggle";
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
        <ThemeToggle />
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
        className={`model-whatsapp${navigationVisible ? " shortcuts-visible" : " is-collapsed"}`}
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo site da Netbox e gostaria de atendimento.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Netbox pelo WhatsApp"
      >
        <small>WHATSAPP &middot; agora</small>
        <strong>
          <span className="model-whatsapp-icon" aria-hidden="true">
            <img src="/whatsapp-shortcut.png" alt="" />
          </span>
          <span className="model-whatsapp-copy">Fale Conosco</span>
        </strong>
      </a>

      <ClientShortcuts />
    </>
  );
}
