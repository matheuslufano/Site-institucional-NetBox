"use client";
import { useState, useSyncExternalStore } from "react";
import { FiCheck, FiShield, FiX } from "react-icons/fi";
import {
  consentSnapshot,
  saveBlogConsent,
  subscribeConsent,
} from "@/lib/blog/analytics";
import styles from "./BlogConsent.module.css";

export default function BlogConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    consentSnapshot,
    () => "unknown",
  );
  const [settings, setSettings] = useState(false);
  const embedded = useSyncExternalStore(
    subscribeConsent,
    () => window.self !== window.top,
    () => false,
  );
  if (embedded) return null;
  const open = settings || consent === "unknown";
  return (
    <aside
      className={styles.root}
      aria-label="Preferências de privacidade do Blog"
    >
      {open ? (
        <div className={styles.panel}>
          <strong>
            <FiShield aria-hidden="true" />
            Privacidade no Blog
          </strong>
          <p>
            Com sua permissão, contamos visitas e interações com identificadores
            aleatórios, sem nome, e-mail ou IP nos relatórios. Você pode mudar
            sua escolha a qualquer momento.
          </p>
          {consent === "blocked" && (
            <p>
              Seu navegador bloqueia analytics por DNT/GPC. Essa preferência
              será respeitada.
            </p>
          )}
          <div>
            <button
              type="button"
              onClick={() => {
                saveBlogConsent("essential");
                setSettings(false);
              }}
            >
              <FiX aria-hidden="true" />
              Somente essenciais
            </button>
            <button
              type="button"
              disabled={consent === "blocked"}
              onClick={() => {
                saveBlogConsent("all");
                setSettings(false);
              }}
            >
              <FiCheck aria-hidden="true" />
              Permitir analytics
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setSettings(true)}
        >
          <FiShield aria-hidden="true" />
          Privacidade
        </button>
      )}
    </aside>
  );
}
