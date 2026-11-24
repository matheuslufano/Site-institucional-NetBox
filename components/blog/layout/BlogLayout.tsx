import { BlogFooter } from '@/components/blog/layout/Footer';
import { BlogHeader, BlogHeaderFallback } from '@/components/blog/layout/Header';
import { ReadingSuggestions } from '@/components/blog/search/ReadingSuggestions';
import styles from '@/styles/blog/Blog.module.css';
import { articlePath, articleSearchText, visibleArticles } from '@/lib/blog/catalog';
import { getBlogArticles } from '@/lib/blog/repository';
import { Suspense } from 'react';

/** The server renders editorial panel content once and passes it through the interactive header. */
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const articleSuggestions = visibleArticles(new Date(), await getBlogArticles().catch(() => []))
    .map(article => ({
      title: article.title,
      href: articlePath(article),
      category: article.category,
      searchText: articleSearchText(article),
      cover: article.spotlight?.poster || article.cover,
    }));
  const editorialSidebar = <ReadingSuggestions />;

  return (
    <div className={styles.blog} data-ui="netbox-blog">
      <a className="skip-link" href="#blog-conteudo">Ir para as notícias</a>
      <Suspense fallback={<BlogHeaderFallback editorialSidebar={editorialSidebar} articleSuggestions={articleSuggestions} />}>
        <BlogHeader editorialSidebar={editorialSidebar} articleSuggestions={articleSuggestions} />
      </Suspense>
      <main id="blog-conteudo" className={styles.main}>{children}</main>
      <BlogFooter />
    </div>
  );
}
