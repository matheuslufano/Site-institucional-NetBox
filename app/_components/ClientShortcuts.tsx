"use client";

import { useEffect, useState } from "react";
import { LiaToolsSolid } from "react-icons/lia";
import { useScrollDirectionVisibility } from "./useScrollDirectionVisibility";

const SECOND_COPY = "https://netboxfibra.sgp.net.br/accounts/central/login";
const WHATSAPP = "5508006022732";

export function ClientShortcuts({ home = false }: { home?: boolean }) {
  const visible = useScrollDirectionVisibility();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const syncSelection = (initialLoad = false) => {
      const { pathname, hash } = window.location;

      if (pathname === "/central-do-cliente") setSelected("central");
      else if (
        pathname === "/nossos-servicos" ||
        (!initialLoad && home && hash === "#servicos")
      )
        setSelected("services");
      else if (pathname === "/" && hash === "#consulta") setSelected("coverage");
      else setSelected(null);
    };

    syncSelection(true);
    const handleHashChange = () => syncSelection(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [home]);

  const itemClass = (item: string) => (selected === item ? "is-selected" : undefined);
  const hiddenTabIndex = visible ? undefined : -1;

  return (
    <div className={`client-shortcuts${visible ? "" : " is-hidden"}`} aria-hidden={!visible}>
      <a tabIndex={hiddenTabIndex} className={itemClass("billing")} href={SECOND_COPY} target="_blank" rel="noreferrer" onClick={() => setSelected("billing")}>
        <span className="shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3.5h8l3 3V20.5H7z" /><path d="M15 3.5v4h3M10 11h5M10 14.5h5" /></svg></span>
        <span className="shortcut-label">Boleto</span>
      </a>
      <a tabIndex={hiddenTabIndex} className={itemClass("services")} href={home ? "#servicos" : "/nossos-servicos"} onClick={() => setSelected("services")}>
        <span className="shortcut-icon" aria-hidden="true"><LiaToolsSolid className="shortcut-solid-icon" /></span>
        <span className="shortcut-label">Serviços</span>
      </a>
      <a tabIndex={hiddenTabIndex} className={itemClass("coverage")} href="/#consulta" onClick={() => setSelected("coverage")}>
        <span className="shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" /></svg></span>
        <span className="shortcut-label">Lojas</span>
      </a>
      <a tabIndex={hiddenTabIndex} className={itemClass("central")} href="/central-do-cliente" onClick={() => setSelected("central")}>
        <span className="shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" /><path d="M6.5 19a5.5 5.5 0 0 1 11 0M4 3.5h16v17H4z" /></svg></span>
        <span className="shortcut-label">Ajuda</span>
      </a>
      <a tabIndex={hiddenTabIndex} className={itemClass("whatsapp")} href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" onClick={() => setSelected("whatsapp")}>
        <span className="shortcut-icon whatsapp-icon" aria-hidden="true">
          <img src="/whatsapp-shortcut.png" alt="" width={36} height={36} />
        </span>
        <span className="shortcut-label">WhatsApp</span>
      </a>
    </div>
  );
}
