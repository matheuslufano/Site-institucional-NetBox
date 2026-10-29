import { Suspense } from 'react';
import { BlogHeader, BlogHeaderFallback } from './_components/BlogHeader';
import { BlogFooter } from './_components/BlogFooter';
import { EditorialSidebar } from './_components/EditorialSidebar';
import styles from './blog.module.css';

/** The server renders editorial panel content once and passes it through the interactive header. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const editorialSidebar = <EditorialSidebar />;

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
