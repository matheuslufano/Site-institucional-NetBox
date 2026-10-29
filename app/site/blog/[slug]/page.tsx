import type { Metadata } from 'next';
import { BlogImage } from '../_components/BlogImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '../_components/ArticleCard';
import { ShareButtons } from '../_components/ShareButtons';
import { BLOG_PATH, SITE_URL, articlePath, blogHref, categoryLabel, findArticle, formatDate, readingTime, serializeJsonLd, visibleArticles } from '../_lib/blog';
import styles from '../blog.module.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return visibleArticles().map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return { title: 'Artigo não encontrado | Blog Netbox', robots: { index: false } };
  return { title: article.seo.title, description: article.seo.description,
    alternates: { canonical: articlePath(article) },
    robots: { index: article.status === 'published', follow: true },
    openGraph: { type: 'article', title: article.title, description: article.summary, url: articlePath(article), publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], images: [{ url: article.cover, alt: article.coverAlt }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.summary, images: [article.cover] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const related = visibleArticles().filter(item => item.id !== article.id).sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category)).slice(0, 3);
  const url = SITE_URL + articlePath(article);
  const breadcrumbs = [
    { name: 'Blog Netbox', url: SITE_URL + BLOG_PATH },
    { name: categoryLabel(article.category), url: SITE_URL + blogHref(article.category) }, { name: article.title, url },
  ];
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.summary,
      image: SITE_URL + article.cover, datePublished: article.publishedAt + 'T09:00:00-03:00', dateModified: article.updatedAt + 'T09:00:00-03:00',
      author: { '@type': 'Organization', name: article.author, url: SITE_URL + '/sobre' },
      publisher: { '@type': 'Organization', name: 'Netbox Internet', url: SITE_URL, logo: { '@type': 'ImageObject', url: SITE_URL + '/LOGO-NETBOX.png' } },
      mainEntityOfPage: url, articleSection: categoryLabel(article.category), inLanguage: 'pt-BR', creativeWorkStatus: article.status === 'demo' ? 'Demonstrativo — aguardando aprovação editorial' : 'Publicado',
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) },
  ];
  return <div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>{breadcrumbs.map((item, index) => <li key={item.url}>{index < breadcrumbs.length - 1 ? <Link href={item.url.replace(SITE_URL, '')}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>
    <article className={styles.article}>
      <header className={styles.articleHeader} data-ui="blog-first-section"><Link className={styles.category} href={blogHref(article.category)}>{article.topic ?? categoryLabel(article.category)}</Link><h1>{article.title}</h1><p className={styles.summary}>{article.summary}</p><div className={styles.meta}><span>Por {article.author}</span><span>Publicado em <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span><span>Atualizado em <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span><span>{readingTime(article)} min de leitura</span></div>{article.status === 'demo' && <p className={styles.notice}>Conteúdo demonstrativo — aguardando aprovação editorial. Informações e ofertas devem ser confirmadas antes da publicação.</p>}</header>
      <figure className={styles.articleCover}><BlogImage src={article.cover} alt={article.coverAlt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 860px" priority /><figcaption>{article.coverAlt} · {article.coverCredit ?? 'Acervo Netbox'}</figcaption></figure>
      <div className={styles.prose}>{article.content.map((section, index) => <section key={section.heading} id={'secao-' + index}>{section.level === 3 ? <h3>{section.heading}</h3> : <h2>{section.heading}</h2>}{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}{section.link && <p><Link href={section.link.href}>{section.link.label} →</Link></p>}</section>)}</div>
      <ShareButtons title={article.title} url={url} />
    </article>
    <section className={styles.section} aria-labelledby="related-title"><div className={styles.sectionHeading}><h2 id="related-title">Continue a leitura</h2><Link href={BLOG_PATH}>Voltar ao Blog ↗</Link></div><div className={styles.grid}>{related.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
  </div>;
}
