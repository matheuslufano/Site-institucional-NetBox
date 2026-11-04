import { DevelopmentPage } from "@/components/site/development/DevelopmentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site em desenvolvimento | Netbox Internet",
  description:
    "Estamos preparando uma nova experiência digital. Fale com a Netbox pelo WhatsApp.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <DevelopmentPage />;
}
