"use client";
import { AppDownloadButton } from "@/components/site/app/AppDownloadButton";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SECOND_COPY } from "@/constants/site";
import { services } from "./content";
import { FooterCredits } from '@/components/ui/FooterCredits';
/** Home footer preserves its context-aware service actions. */
export function HomeFooter({ onService }: { onService: (title: string) => void }) {
  return (<footer className="model-footer">
    <div className="model-shell footer-main">
      <div className="footer-services">
        {services.map((service) => (
          <button
            key={service.title}
            onClick={() => onService(service.title)}
          >
            <span className="footer-service-icon">
              <img src={service.image} alt="" />
            </span>

            <div>
              <strong>
                {service.title} <ArrowIcon />
              </strong>
              <small>{service.text}</small>
            </div>
          </button>
        ))}

        <a className="footer-pill" href="/nossos-servicos">
          Todos os serviços <ArrowIcon />
        </a>
      </div>

      <div className="footer-about">
        <img src="/logo-branca-1024x371.png" alt="Netbox Internet" />
        <p>
          Fibra óptica, presença regional e atendimento humanizado para
          conectar casas e empresas no Tocantins.
        </p>
        <a className="model-button yellow" href="/sobre">
          Mais sobre a Netbox <ArrowIcon />
        </a>
      </div>

      <div className="footer-contact">
        <img
          className="footer-app-logo"
          src="/netbox-app-icon.png"
          alt="Aplicativo Netbox"
        />
        <div className="footer-contact-actions">
          <a href="tel:08006022732">☎ 0800 602 2732</a>
          <a href={SECOND_COPY} target="_blank" rel="noreferrer">
            2ª via de boleto
          </a>
        </div>
        <AppDownloadButton />
      </div>
    </div>
    <div className="model-shell footer-bottom">
      <span>CNPJ 25.356.470/0001-13</span>
      <span>
        <a href="https://netbox.net.br/ouvidoria/">Ouvidoria</a> •{" "}
        <a href="https://netbox.net.br/politica-de-privacidade/">
          Privacidade
        </a>
      </span>
    </div>
    <FooterCredits />
  </footer>);
}
