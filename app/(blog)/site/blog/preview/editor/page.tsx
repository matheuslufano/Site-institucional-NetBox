import type { Metadata } from 'next';
import LiveArticlePreview from '@/components/blog/articles/LiveArticlePreview';
import { getBlogArticles } from '@/lib/blog/repository';
import { visibleArticles } from '@/lib/blog/catalog';

export const metadata: Metadata = { title: 'Prévia do artigo | Blog Netbox', robots: { index: false, follow: false } };

/** Inherits the real BlogLayout; unpublished data arrives only via postMessage. */
export default async function PreviewPage() {
  const allowedOrigins = (process.env.BLOG_EDITOR_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000').split(',').map(value => value.trim()).filter(Boolean);
  const related = visibleArticles(new Date(), await getBlogArticles().catch(() => []));
  return <LiveArticlePreview allowedOrigins={allowedOrigins} related={related} />;
}
