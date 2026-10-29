import Link from 'next/link';
import { articlePath, blogHref, categories, categoryLabel, visibleArticles } from '../_lib/blog';
import styles from '../blog.module.css';

/** Server-rendered content is passed into the search panel without sending the article catalog to the client. */
export function EditorialSidebar() {
  const picks = visibleArticles().filter(article => article.featured).slice(0, 3);

  return (
    <aside className={styles.editorialSidebar} data-ui="editorial-sidebar" aria-label="Explore o Blog">
      <section className={styles.topicPanel}>
        <span className={styles.eyebrow}>EXPLORE</span>
        <h2>Seu assunto está aqui.</h2>
        <nav aria-label="Explorar assuntos">
          {categories.map(category => (
            <Link key={category.id} href={blogHref(category.id)}>
              {category.label}<span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </section>
      <section className={styles.editorPicks}>
        <h2>Escolhas da redação</h2>
        {picks.map(article => (
          <Link href={articlePath(article)} key={article.id}>
            <span className={styles.category}>{(article.topic ?? categoryLabel(article.category))}</span>
            <h3>{article.title}</h3>
          </Link>
        ))}
      </section>
      <p className={styles.editorialNote}>Edição demonstrativa. Os artigos estão disponíveis para avaliação e aguardam aprovação editorial.</p>
    </aside>
  );
}
