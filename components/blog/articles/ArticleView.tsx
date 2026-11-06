import { ArticleCard } from '@/components/blog/articles/ArticleCard';
import { CoverImage } from '@/components/blog/articles/CoverImage';
import { ShareButtons } from '@/components/blog/articles/ShareButtons';
import { ArticleSources } from '@/components/blog/articles/ArticleSources';
import RichContent from './RichContent';
import { BLOG_PATH, SITE_URL, articlePath, blogHref, categoryLabel, formatDate, readingTime } from '@/lib/blog/catalog';
import styles from '@/styles/blog/Blog.module.css';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock, FiHome, FiRefreshCw, FiTag } from 'react-icons/fi';
import AuthorIdentity from './AuthorIdentity';
import cinema from './ArticleView.module.css';
import { ArticleCarousel } from '@/components/blog/home/ArticleCarousel';
import ArticleAnalytics from './ArticleAnalytics';

import type { BlogArticle } from '@/types/blog';

/** One presentation for public articles and unsaved editor previews. */
export default function ArticleView({ article, related = [], preview = false }: { article: BlogArticle; related?: BlogArticle[]; preview?: boolean }) {
  const url = SITE_URL + articlePath(article);
  const breadcrumbs = [{ name: 'Blog Netbox', url: SITE_URL + BLOG_PATH }, { name: categoryLabel(article.category), url: SITE_URL + blogHref(article.category) }, { name: article.title, url }];
  return <div className={cinema.page} data-cover={Boolean(article.cover)}>
    {!preview && article.status!=='draft' && <ArticleAnalytics key={article.id} articleId={article.id} />}
    {article.cover && <div className={cinema.backdrop} aria-hidden="true"><CoverImage src={article.cover} alt="" fill sizes="100vw" priority /></div>}
    <div className={`${styles.shell} ${cinema.shell}`}>
    <nav className={cinema.breadcrumb} aria-label="Breadcrumb"><ol>{breadcrumbs.map((item, index) => <li key={item.url}>{index < breadcrumbs.length - 1 ? <Link href={item.url.replace(SITE_URL, '')}>{index === 0 && <FiHome aria-hidden="true" />}{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>
    <article className={cinema.layout} data-poster={Boolean(article.spotlight?.poster)}>
      {article.spotlight?.poster && <figure className={cinema.poster}><CoverImage src={article.spotlight.poster} alt={article.spotlight.posterAlt || `Capa de ${article.spotlight.title || article.title}`} width={440} height={660} sizes="(max-width: 700px) 100px, 220px" priority /><figcaption>{article.spotlight.title || article.title}</figcaption></figure>}
      <div className={cinema.mainColumn}>
      <header className={cinema.header} data-ui="blog-first-section"><Link className={cinema.category} href={blogHref(article.category)}><FiTag aria-hidden="true" />{article.topic ?? categoryLabel(article.category)}</Link><h1>{article.title}</h1><p className={cinema.summary}>{article.summary}</p><AuthorIdentity name={article.author} photo={article.authorPhotoUrl} />{article.status === 'demo' && <p className={styles.notice}>Conteúdo demonstrativo — aguardando aprovação editorial. Informações e ofertas devem ser confirmadas antes da publicação.</p>}</header>
      <div className={`${styles.prose} ${cinema.prose}`}>{article.content.map((section, index) => section.document ? <RichContent key={index} blocks={section.document} /> : <section key={section.heading} id={'secao-' + index}>{section.level === 3 ? <h3>{section.heading}</h3> : <h2>{section.heading}</h2>}{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}{section.image && <figure><CoverImage src={section.image.src} alt={section.image.alt} width={1200} height={675} sizes="(max-width: 900px) 100vw, 860px" /></figure>}{section.link && <p><Link href={section.link.href}>{section.link.label} →</Link></p>}</section>)}</div>
      <div className={cinema.sources}><ArticleSources sources={article.sources ?? []} /></div>
      </div>
      <aside className={cinema.readingPanel} aria-label="Informações do artigo">
        <h2>Sobre este artigo</h2>
        <AuthorIdentity name={article.author} photo={article.authorPhotoUrl} />
        <dl><div><dt><FiCalendar aria-hidden="true" />Publicado em</dt><dd><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></dd></div><div><dt><FiRefreshCw aria-hidden="true" />Atualizado em</dt><dd><time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></dd></div><div><dt><FiClock aria-hidden="true" />Leitura</dt><dd>{readingTime(article)} min</dd></div></dl>
        <div inert={preview || undefined}><ShareButtons className={cinema.share} title={article.title} url={url} analyticsArticleId={preview ? undefined : article.id} /></div>
        {article.cover && <p className={cinema.coverCredit}>{article.coverAlt} · {article.coverCredit ?? 'Acervo Netbox'}</p>}
      </aside>
    </article>
    <section className={`${styles.section} ${cinema.related}`} aria-labelledby="related-title"><div className={styles.sectionHeading}><h2 id="related-title">Continue a leitura</h2><Link href={BLOG_PATH}><FiArrowLeft aria-hidden="true" />Voltar ao Blog</Link></div><ArticleCarousel label="Artigos mais recentes" compact>{related.map(item => <ArticleCard key={item.id} article={item} archive />)}</ArticleCarousel></section>
    </div>
  </div>;
}
