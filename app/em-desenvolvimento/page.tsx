import type { Metadata } from "next";
import { DevelopmentView } from "../_components/DevelopmentView";

export const metadata: Metadata = {
  title: "Site em desenvolvimento | Netbox Internet",
  description:
    "Estamos preparando uma nova experiência digital. Fale com a Netbox pelo WhatsApp.",
  robots: { index: false, follow: true },
};

export default function DevelopmentPage() {
  return <DevelopmentView />;
}
