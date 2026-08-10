import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });
const sora = Sora({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://netbox.net.br"),
  title: "Netbox Internet | Fibra óptica no Tocantins",
  description:
    "Internet 100% fibra óptica para sua casa ou empresa. Consulte a cobertura Netbox na sua cidade pelo WhatsApp.",
  keywords: ["internet fibra óptica", "provedor de internet", "Tocantins", "Netbox"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Netbox Internet — Internet de verdade",
    description: "Fibra óptica, estabilidade e atendimento regional no Tocantins.",
    locale: "pt_BR",
    type: "website",
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4511e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `
    (function () {
      try {
        var saved = localStorage.getItem("netbox_theme");
        var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("theme-dark", dark);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta && dark) meta.setAttribute("content", "#11110f");
      } catch (_) {}
    })();
  `;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Netbox Internet",
    legalName: "Netbox Internet LTDA",
    url: "https://netbox.net.br",
    telephone: "0800 602 2732",
    taxID: "25.356.470/0001-13",
    areaServed: { "@type": "State", name: "Tocantins" },
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${manrope.variable} ${sora.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
