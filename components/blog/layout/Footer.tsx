import { BLOG_PATH, blogHref, categories } from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import Link from "next/link";
import { FiInfo } from "react-icons/fi";

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
          <Link href="/site/blog/creditos"><FiInfo aria-hidden="true" /> Créditos</Link>
        </div>
      </div>
    </footer>
  );
}
