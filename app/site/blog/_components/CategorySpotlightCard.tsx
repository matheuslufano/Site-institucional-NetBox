import Link from 'next/link';
import { BlogImage } from './BlogImage';
import { articlePath, categoryLabel, formatDate } from '../_lib/blog';
import type { BlogArticle } from '../_lib/types';
import styles from '../blog.module.css';

/** Compact image-overlay story used in the three-column category opening. */
export function CategorySpotlightCard({ article, priority = false, columns = 3 }: { article: BlogArticle; priority?: boolean; columns?: number }) {
  return (
    <article className={styles.categoryFeature} data-ui="category-feature">
      <Link href={articlePath(article)}>
        <BlogImage src={article.cover} alt={article.coverAlt} fill sizes={'(max-width: 1023px) 100vw, ' + Math.ceil(1120 / columns) + 'px'} priority={priority} />
        <div className={styles.categoryFeatureCopy}>
          <span>{article.topic ?? categoryLabel(article.category)}</span>
          <h2>{article.title}</h2>
          <div><strong>{article.author}</strong><span> · </span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
          {article.status === 'demo' && <small>Conteúdo demonstrativo</small>}
        </div>
      </Link>
    </article>
  );
}
