"use client";

import { consentSnapshot, saveBlogConsent, subscribeConsent } from "@/lib/blog/analytics";
import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./BlogPrivacy.module.css";

const privacyEvent = "netbox:open-blog-privacy";
export function openBlogPrivacy() { window.dispatchEvent(new Event(privacyEvent)); }

export function BlogPrivacyTrigger() {
  return <button id="blog-footer-privacy" type="button" onClick={openBlogPrivacy}>Preferências de privacidade</button>;
}

export function BlogPrivacy() {
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "pending");
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    const open = () => setRequested(true);
    window.addEventListener(privacyEvent, open);
    return () => window.removeEventListener(privacyEvent, open);
  }, []);
  if (consent === "blocked" || (consent !== "unknown" && !requested)) return null;

  function choose(value: "essential" | "all") {
    saveBlogConsent(value);
    setRequested(false);
  }

  return (
    <section id="blog-privacy-notice" className={styles.notice} data-requested={requested} aria-labelledby="blog-privacy-title">
      <h2 id="blog-privacy-title">Privacidade no Blog</h2>
      <p>Você decide se o Blog pode medir visitas e interações. Os recursos essenciais continuam disponíveis.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("essential")}>Somente essenciais</button>
        <button type="button" onClick={() => choose("all")}>Permitir analytics</button>
      </div>
    </section>
  );
}
