import { ArticleCard } from '@/components/blog/articles/ArticleCard';
import { CoverImage } from '@/components/blog/articles/CoverImage';
import { ShareButtons } from '@/components/blog/articles/ShareButtons';
import { ArticleSources } from '@/components/blog/articles/ArticleSources';
import RichContent from './RichContent';
import { BLOG_PATH, SITE_URL, articlePath, blogHref, categoryLabel, formatDate, readingTime } from '@/lib/blog/catalog';
import styles from '@/styles/blog/Blog.module.css';
import Link from 'next/link';

import type { BlogArticle } from '@/types/blog';

/** One presentation for public articles and unsaved editor previews. */
export default function ArticleView({ article, related = [], preview = false }: { article: BlogArticle; related?: BlogArticle[]; preview?: boolean }) {
  const url = SITE_URL + articlePath(article);
  const breadcrumbs = [{ name: 'Blog Netbox', url: SITE_URL + BLOG_PATH }, { name: categoryLabel(article.category), url: SITE_URL + blogHref(article.category) }, { name: article.title, url }];
  return <div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>{breadcrumbs.map((item, index) => <li key={item.url}>{index < breadcrumbs.length - 1 ? <Link href={item.url.replace(SITE_URL, '')}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>
    <article className={styles.article}>
      <header className={styles.articleHeader} data-ui="blog-first-section"><Link className={styles.category} href={blogHref(article.category)}>{article.topic ?? categoryLabel(article.category)}</Link><h1>{article.title}</h1><p className={styles.summary}>{article.summary}</p><div className={styles.meta}><span>Por {article.author}</span><span>Publicado em <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span><span>Atualizado em <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span><span>{readingTime(article)} min de leitura</span></div>{article.status === 'demo' && <p className={styles.notice}>Conteúdo demonstrativo — aguardando aprovação editorial. Informações e ofertas devem ser confirmadas antes da publicação.</p>}</header>
      {article.cover && <figure className={styles.articleCover}><CoverImage src={article.cover} alt={article.coverAlt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 860px" priority /><figcaption>{article.coverAlt} · {article.coverCredit ?? 'Acervo Netbox'}</figcaption></figure>}
      <div className={styles.prose}>{article.content.map((section, index) => section.document ? <RichContent key={index} blocks={section.document} /> : <section key={section.heading} id={'secao-' + index}>{section.level === 3 ? <h3>{section.heading}</h3> : <h2>{section.heading}</h2>}{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}{section.image && <figure><CoverImage src={section.image.src} alt={section.image.alt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 860px" /></figure>}{section.link && <p><Link href={section.link.href}>{section.link.label} →</Link></p>}</section>)}</div>
      <div inert={preview || undefined}><ShareButtons title={article.title} url={url} /></div>
      <ArticleSources sources={article.sources ?? []} />
    </article>
    <section className={styles.section} aria-labelledby="related-title"><div className={styles.sectionHeading}><h2 id="related-title">Continue a leitura</h2><Link href={BLOG_PATH}>Voltar ao Blog ↗</Link></div><div className={styles.grid}>{related.map(item => <ArticleCard key={item.id} article={item} />)}</div></section>
  </div>;
}
