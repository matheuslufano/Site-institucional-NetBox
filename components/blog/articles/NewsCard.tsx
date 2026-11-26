import { articlePath, categoryLabel, formatDate, readingTime } from '@/lib/blog/catalog';
import styles from '@/styles/blog/Blog.module.css';
import type { BlogArticle } from '@/types/blog';
import Link from 'next/link';
import { CoverImage } from './CoverImage';

/** The date capsule sits on the feed's shared timeline; datetime preserves the full date. */
export function NewsCard({ article }: { article: BlogArticle }) {
  const publishedDate = formatDate(article.publishedAt);

  return (
    <article className={styles.feedCard}>
      <div className={styles.feedMarker}>
        <time
          className={styles.feedDate}
          dateTime={article.publishedAt}
          title={publishedDate}
          aria-label={publishedDate}
        >
          {publishedDate.replace(/ de \d{4}$/, '')}
        </time>
      </div>
      <Link className={styles.feedLink} href={articlePath(article)}>
        <div className={styles.feedImage}>
          <CoverImage src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 767px) 112px, 300px" />
          {article.status === 'demo' && <span className={styles.demoBadge}>Demonstrativo</span>}
        </div>
        <div className={styles.feedCopy}>
          <span className={styles.category}>{(article.topic ?? categoryLabel(article.category))}</span>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <span className={styles.feedRead}>
            <span className={styles.feedReadDetails}>
              <time className={styles.feedMobileDate} dateTime={article.publishedAt}>{publishedDate.replace(/ de \d{4}$/, '')} · </time>
              {readingTime(article)} min de leitura
            </span>
            <span className={styles.feedReadArrow} aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
