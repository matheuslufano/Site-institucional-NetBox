import { WHATSAPP } from "@/constants/site";
import { openAffiliateAwareWhatsApp } from "../whatsapp";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
/** Records a navigation event for the existing analytics integration. */
export function track(event: string, data: Record<string, unknown> = {}) {
  if(typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
/** Keeps the existing local lead history and opens the affiliate-aware sales channel. */
export function openWhatsApp(message: string, context: Record<string, unknown>) {
  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    page: window.location.pathname,
    utm: Object.fromEntries(new URLSearchParams(window.location.search)),
    ...context,
  };
  const saved = JSON.parse(localStorage.getItem("netbox_leads") || "[]");
  localStorage.setItem(
    "netbox_leads",
    JSON.stringify([...saved.slice(-19), lead]),
  );
  track("lead_criado", lead);
  track("clicou_whatsapp", context);
  openAffiliateAwareWhatsApp(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
  );
}
