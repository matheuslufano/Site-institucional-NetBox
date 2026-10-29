import Link from "next/link";
import { BLOG_PATH, blogHref, categories } from "../_lib/navigation";
import styles from "../blog.module.css";

export function BlogFooter() {
  return (
    <footer className={styles.portalFooter} data-ui="blog-footer">
      <div className={styles.shell}>
        <div className={styles.footerTop}>
          <Link className={styles.footerBrand} href={BLOG_PATH}>
            NETBOX<span>.</span> <strong>BLOG</strong>
          </Link>
          <p>Tecnologia, filmes, séries, HQs, jogos e entretenimento.</p>
        </div>
        <nav aria-label="Assuntos do Blog no rodapé">
          {categories.map((category) => (
            <Link key={category.id} href={blogHref(category.id)}>
              {category.label}
            </Link>
          ))}
        </nav>
        <div className={styles.footerBottom}>
          <span>
            © {new Date().getFullYear()} Blog Netbox · Conteúdo em preparação
            editorial.
          </span>
          <Link href="/site">Visitar o site institucional ↗</Link>
        </div>
      </div>
    </footer>
  );
}
