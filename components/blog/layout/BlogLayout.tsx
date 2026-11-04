import { BlogFooter } from '@/components/blog/layout/Footer';
import { BlogHeader, BlogHeaderFallback } from '@/components/blog/layout/Header';
import { ReadingSuggestions } from '@/components/blog/search/ReadingSuggestions';
import styles from '@/styles/blog/Blog.module.css';
import { Suspense } from 'react';

/** The server renders editorial panel content once and passes it through the interactive header. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const editorialSidebar = <ReadingSuggestions />;

  return (
    <div className={styles.blog} data-ui="netbox-blog">
      <a className="skip-link" href="#blog-conteudo">Ir para as notícias</a>
      <Suspense fallback={<BlogHeaderFallback editorialSidebar={editorialSidebar} />}>
        <BlogHeader editorialSidebar={editorialSidebar} />
      </Suspense>
      <main id="blog-conteudo" className={styles.main}>{children}</main>
      <BlogFooter />
    </div>
  );
}
