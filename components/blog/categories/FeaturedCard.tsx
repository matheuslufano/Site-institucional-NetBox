import { CoverImage } from '@/components/blog/articles/CoverImage';
import { articlePath, categoryLabel, formatDate, readingTime } from '@/lib/blog/catalog';
import { FiArrowUpRight, FiCalendar, FiClock } from 'react-icons/fi';
import styles from './CategoryPage.module.css';
import type { BlogArticle } from '@/types/blog';
import Link from 'next/link';

/** Image-overlay story; its grid position determines the large or compact presentation. */
export function FeaturedCard({ article, priority = false, columns = 3 }: { article: BlogArticle; priority?: boolean; columns?: number }) {
  return (
    <article className={styles.feature} data-ui="category-feature">
      <Link href={articlePath(article)}>
        <CoverImage src={article.cover} alt={article.coverAlt} fill sizes={'(max-width: 767px) 100vw, ' + (columns === 1 ? '1280px' : '700px')} priority={priority} />
        <div className={styles.featureCopy}>
          <span>{article.topic ?? categoryLabel(article.category)}</span>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <div className={styles.featureMeta}><span><FiCalendar aria-hidden="true" /><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span><span><FiClock aria-hidden="true" />{readingTime(article)} min de leitura</span></div>
          <span className={styles.featureAuthor}>Por {article.author}</span>
          {article.status === 'demo' && <small>Conteúdo demonstrativo</small>}
          <span className={styles.featureRead}>Ler artigo <FiArrowUpRight aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
