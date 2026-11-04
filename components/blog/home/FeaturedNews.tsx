import { articlePath, categoryLabel, formatDate } from "@/lib/blog/catalog";
import styles from "@/styles/blog/Blog.module.css";
import type { BlogArticle } from "@/types/blog";
import { NewsCarousel, type NewsCarouselLayout, type NewsSlide } from "./NewsCarousel";

/** Shared opening for home and category archives; presentation changes without duplicating carousel behavior. */
export function FeaturedNews({ latestArticles, layout = "poster", label = "Destaques do Blog" }: { latestArticles: BlogArticle[]; layout?: NewsCarouselLayout; label?: string }) {
  const slides: NewsSlide[] = latestArticles.map(article => ({
    id: article.id, href: articlePath(article), title: article.spotlight?.title ?? article.title,
    summary: article.spotlight?.poster || article.spotlight?.trailerUrl ? [article.summary, ...(article.content[0]?.paragraphs ?? [])].join(" ") : article.summary,
    poster: article.spotlight?.poster, posterAlt: article.spotlight?.posterAlt, trailerUrl: article.spotlight?.trailerUrl,
    category: article.topic ?? categoryLabel(article.category), cover: article.cover, coverAlt: article.coverAlt,
    publishedAt: article.publishedAt, dateLabel: formatDate(article.publishedAt), demo: article.status === 'demo',
  }));
  if(!slides.length) return null;
  return (
    <section
      data-ui="blog-first-section"
      className={styles.editorialHero}
      aria-label={label}
    >
      <NewsCarousel key={[layout, ...slides.map(slide => slide.id)].join(":")} slides={slides} layout={layout} label={label} />
    </section>
  );
}
