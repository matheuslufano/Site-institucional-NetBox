import { BlogImage } from './BlogImage';
import Link from 'next/link';
import type { BlogArticle } from '../_lib/types';
import { articlePath, categoryLabel, formatDate, readingTime } from '../_lib/blog';
import styles from '../blog.module.css';

/** Reusable card; archive places author/date before the excerpt and omits the extra reading CTA. */
export function ArticleCard({ article, priority = false, archive = false }: { article: BlogArticle; priority?: boolean; archive?: boolean }) {
  return <article className={styles.card}>
    <Link href={articlePath(article)} className={styles.cardLink}>
      <div className={styles.cardImage}><BlogImage src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 420px" priority={priority} />
        {article.status === 'demo' && <span className={styles.demoBadge}>Demonstrativo</span>}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.category}>{(article.topic ?? categoryLabel(article.category))}</span>
        <h3>{article.title}</h3>
        {archive && <div className={styles.meta}><span>{article.author}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>}
        <p>{article.summary}</p>
        {!archive && <div className={styles.meta}><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>· {readingTime(article)} min de leitura</span></div>}
        {!archive && <span className={styles.readLink}>Ler artigo <span aria-hidden="true">↗</span></span>}
      </div>
    </Link>
  </article>;
}
