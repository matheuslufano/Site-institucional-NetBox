import { WhatsAppModal } from "@/components/site/sales/WhatsAppModal";
import { DevelopmentPage } from "@/components/site/development/DevelopmentPage";
import "@/styles/site/site.css";
import type { ReactNode } from "react";

/** Institutional CSS and sales integration stay outside the editorial route group. */
export const dynamic = "force-dynamic";

async function isInstitutionalMaintenanceEnabled() {
  const backendUrl = process.env.BLOG_API_URL?.replace(/\/$/, "");
  if (!backendUrl) return false;

  try {
    const response = await fetch(`${backendUrl}/site/content/institutional`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const payload = await response.json();
    return payload?.content?.maintenanceMode === true;
  } catch {
    return false;
  }
}

export default async function SiteGroupLayout({ children }: { children: ReactNode }) {
  const maintenanceEnabled = await isInstitutionalMaintenanceEnabled();
  if (maintenanceEnabled) return <DevelopmentPage showManagedSections={false} />;
  return <>{children}<WhatsAppModal /></>;
}
