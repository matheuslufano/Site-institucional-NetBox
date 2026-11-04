import Link from "next/link";
import { articlePath, BLOG_PATH, categoryLabel, readingTime } from "@/lib/blog/catalog";
import type { BlogArticle } from "@/types/blog";
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { CoverImage } from '@/components/blog/articles/CoverImage';
import styles from './NextReading.module.css';

/** Editorial selection alongside the latest feed; stacks below it on smaller screens. */
export function NextReading({ articles }: { articles: BlogArticle[] }) {
  const recommendations = articles.slice(1, 4);
  if (!recommendations.length) return null;
  return (
    <aside className={styles.panel} aria-labelledby="top-stories-title" data-ui="next-reading">
      <header className={styles.heading}>
        <span className={styles.eyebrow}>Sua próxima leitura</span>
        <h2 id="top-stories-title">Em destaque</h2>
      </header>
      <ol className={styles.list}>
        {recommendations.map((article, index) => (
          <li key={article.id} className={styles.item}>
            <Link href={articlePath(article)} className={styles.story}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.copy}>
                <span className={styles.category}>
                  {article.topic ?? categoryLabel(article.category)}
                </span>
                <h3>{article.title}</h3>
                <span className={styles.time}><FiClock aria-hidden="true" />{readingTime(article)} min de leitura</span>
              </div>
              <span className={styles.image}><CoverImage src={article.cover} alt={article.coverAlt} fill sizes={index === 0 ? '(max-width: 1023px) 90vw, 282px' : '68px'} /></span>
            </Link>
          </li>
        ))}
      </ol>
      <Link className={styles.allStories} href={BLOG_PATH + '#publicacoes'}>Todas as notícias<FiArrowRight aria-hidden="true" /></Link>
    </aside>
  );
}
