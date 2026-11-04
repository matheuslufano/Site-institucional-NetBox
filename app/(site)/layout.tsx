import { WhatsAppModal } from "@/components/site/sales/WhatsAppModal";
import "@/styles/site/site.css";
import type { ReactNode } from "react";

/** Institutional CSS and sales integration stay outside the editorial route group. */
export default function SiteGroupLayout({ children }: { children: ReactNode }) {
  return <>{children}<WhatsAppModal /></>;
}
