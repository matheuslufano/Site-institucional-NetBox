import { BLOG_PATH, blogHref, categories } from "@/lib/blog/navigation";
import styles from "@/styles/blog/Blog.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";
import { FooterCredits } from '@/components/ui/FooterCredits';
import { SeasonalSiteFooter } from '@/components/shared/seasonal/SeasonalFooter';
import { BlogPrivacyTrigger } from './BlogPrivacy';

export function BlogFooter() {
  return (
    <SeasonalSiteFooter className={styles.portalFooter} data-ui="blog-footer">
      <div className={styles.shell}>
        <div className={styles.footerTop}>
          <Link className={styles.footerBrand} href={BLOG_PATH}>
            <span className={styles.footerBrandText}>NETBOX<span>.</span> <strong>BLOG</strong></span>
            <Image src="/blog/logo-NETBOX-BLOG.png" alt="Netbox Blog" width={110} height={62} unoptimized />
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
          <BlogPrivacyTrigger />
        </div>
      </div>
      <FooterCredits product="Netbox Blog" />
    </SeasonalSiteFooter>
  );
}
