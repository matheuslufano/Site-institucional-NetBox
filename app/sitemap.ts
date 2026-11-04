import { articlePath, SITE_URL } from "@/lib/blog/catalog";
import type { MetadataRoute } from "next";
import { getBlogArticles } from "@/lib/blog/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/sobre", "/nossos-servicos", "/nossa-estrutura", "/contatos", "/central-do-cliente", "/site/blog"];
  const pages: MetadataRoute.Sitemap = routes.map((route, index) => ({
    url: `https://netbox.net.br${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: index === 0 ? 1 : 0.8,
  }));
  const remoteArticles = await getBlogArticles();
  return [...pages, ...remoteArticles.filter(article => article.status === 'published').map(article => ({
    url: SITE_URL + articlePath(article), lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const, priority: 0.6,
  }))];
}
