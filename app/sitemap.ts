import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/nossos-servicos", "/nossa-estrutura", "/depoimentos", "/contatos"];
  return routes.map((route, index) => ({
    url: `https://netbox.net.br${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
