import Link from 'next/link';
import { BlogImage } from './BlogImage';
import type { BlogArticle } from '../_lib/types';
import { articlePath, categoryLabel, formatDate, readingTime } from '../_lib/blog';
import styles from '../blog.module.css';

/** The date capsule sits on the feed's shared timeline; datetime preserves the full date. */
export function ArticleFeedCard({ article }: { article: BlogArticle }) {
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
          <BlogImage src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 599px) 100vw, 300px" />
          {article.status === 'demo' && <span className={styles.demoBadge}>Demonstrativo</span>}
        </div>
        <div className={styles.feedCopy}>
          <span className={styles.category}>{(article.topic ?? categoryLabel(article.category))}</span>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <span className={styles.feedRead}>
            {readingTime(article)} min de leitura <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
