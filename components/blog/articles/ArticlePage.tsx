import ArticleView from './ArticleView';
import { BLOG_PATH, SITE_URL, articlePath, blogHref, categoryLabel, serializeJsonLd, visibleArticles } from '@/lib/blog/catalog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogArticle, getBlogArticles } from '@/lib/blog/repository';

export type ArticlePageProps = { params: Promise<{ slug: string }> };
export async function articleStaticParams() { return visibleArticles(new Date(), await getBlogArticles()).map(article => ({ slug: article.slug })); }
export async function generateArticleMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getBlogArticle((await params).slug);
  if(!article) return { title: 'Artigo não encontrado | Blog Netbox', robots: { index: false } };
  return {
    title: article.seo.title, description: article.seo.description,
    alternates: { canonical: articlePath(article) },
    robots: { index: article.status === 'published', follow: true },
    openGraph: { type: 'article', title: article.title, description: article.summary, url: articlePath(article), publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], images: [{ url: article.cover, alt: article.coverAlt }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.summary, images: [article.cover] },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getBlogArticle((await params).slug);
  if(!article) notFound();
  const related = visibleArticles(new Date(), await getBlogArticles()).filter(item => item.id !== article.id);
  const url = SITE_URL + articlePath(article);
  const breadcrumbs = [
    { name: 'Blog Netbox', url: SITE_URL + BLOG_PATH },
    { name: categoryLabel(article.category), url: SITE_URL + blogHref(article.category) }, { name: article.title, url },
  ];
  const structuredData = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.summary,
      image: new URL(article.cover, SITE_URL).href, citation: article.sources?.map(source => source.url), datePublished: article.publishedAt + 'T09:00:00-03:00', dateModified: article.updatedAt + 'T09:00:00-03:00',
      author: { '@type': 'Organization', name: article.author, url: SITE_URL + '/sobre' },
      publisher: { '@type': 'Organization', name: 'Netbox Internet', url: SITE_URL, logo: { '@type': 'ImageObject', url: SITE_URL + '/LOGO-NETBOX.png' } },
      mainEntityOfPage: url, articleSection: categoryLabel(article.category), inLanguage: 'pt-BR', creativeWorkStatus: article.status === 'demo' ? 'Demonstrativo — aguardando aprovação editorial' : 'Publicado',
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) },
  ];
  return <><ArticleView article={article} related={related} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} /></>;
}
