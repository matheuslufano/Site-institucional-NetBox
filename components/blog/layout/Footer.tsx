import { BLOG_PATH, blogHref, categories } from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import { FooterCredits } from '@/components/ui/FooterCredits';
import { SeasonalSiteFooter } from '@/components/shared/seasonal/SeasonalFooter';

export function BlogFooter() {
  return (
    <SeasonalSiteFooter className={styles.portalFooter} data-ui="blog-footer">
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
          <Link href="/site">Visitar o site institucional ↗</Link>
          <Link href="/site/blog/creditos"><FiInfo aria-hidden="true" /> Créditos</Link>
        </div>
      </div>
      <FooterCredits product="Netbox Blog" />
    </SeasonalSiteFooter>
  );
}
