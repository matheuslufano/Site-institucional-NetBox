import Link from "next/link";
import { LeadCarousel, type LeadCarouselSlide } from "./LeadCarousel";
import type { BlogArticle } from "../_lib/types";
import { articlePath, categoryLabel, formatDate } from "../_lib/blog";
import styles from "../blog.module.css";

/** The latest ten stories form the carousel; the adjacent editorial selection remains independent. */
export function EditorialHero({ articles, latestArticles }: { articles: BlogArticle[]; latestArticles: BlogArticle[] }) {
  const slides: LeadCarouselSlide[] = latestArticles.map(article => ({
    id: article.id, href: articlePath(article), title: article.title, summary: article.summary,
    category: article.topic ?? categoryLabel(article.category), cover: article.cover, coverAlt: article.coverAlt,
    publishedAt: article.publishedAt, dateLabel: formatDate(article.publishedAt), demo: article.status === 'demo',
  }));
  if (!slides.length) return null;
  return (
    <section
      data-ui="blog-first-section"
      className={styles.editorialHero}
      aria-label="Destaques do Blog"
    >
      <LeadCarousel slides={slides} />
      <aside className={styles.topStories} aria-labelledby="top-stories-title">
        <div className={styles.topStoriesHeading}>
          <span className={styles.eyebrow}>SUA PRÓXIMA LEITURA</span>
          <h2 id="top-stories-title">Em destaque</h2>
        </div>
        <ol>
          {articles.slice(1, 4).map((article, index) => (
            <li key={article.id}>
              <Link href={articlePath(article)}>
                <span className={styles.storyNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className={styles.category}>
                    {article.topic ?? categoryLabel(article.category)}
                  </span>
                  <h3>{article.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
