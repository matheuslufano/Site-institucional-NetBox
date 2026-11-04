import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCompass, FiCpu, FiFilm, FiGrid, FiTv } from 'react-icons/fi';
import { blogHref, categories } from "@/lib/blog/navigation";
import styles from "./CategoryStrip.module.css";

const presentation = {
  tecnologia: { Icon: FiCpu, description: 'Ideias que conectam', label: 'Inove' },
  filmes: { Icon: FiFilm, description: 'Além dos créditos', label: 'Assista' },
  series: { Icon: FiTv, description: 'Sua próxima maratona', label: 'Maratone' },
  hqs: { Icon: FiBookOpen, description: 'Histórias em cada página', label: 'Descubra' },
  games: { Icon: FiGrid, description: 'Uma nova fase começa', label: 'Jogue' },
};

/** Centered illustrated category shortcuts; native horizontal scrolling on smaller screens. */
export function CategoryStrip() {
  return (
    <section className={styles.section} aria-labelledby="category-strip-title">
      <header className={styles.header}>
        <div><span className={styles.eyebrow}><FiCompass aria-hidden="true" />Explore o Blog</span><h2 id="category-strip-title">Qual universo você quer explorar?</h2></div>
        <p>Escolha seu assunto e encontre sua próxima descoberta.</p>
      </header>
      <nav className={styles.rail} aria-label="Explorar categorias do Blog" data-ui="category-strip">
        {categories.map((category) => {
          const detail = presentation[category.id as keyof typeof presentation];
          const Icon = detail?.Icon || FiCompass;
          return (
            <Link className={styles.card} key={category.id} href={blogHref(category.id)} aria-label={"Explorar categoria " + category.label}>
              <span className={styles.cardHeader}>
                <span className={styles.kicker}>{detail?.label || 'Explore'}</span>
                <span className={styles.icon}><Icon aria-hidden="true" /></span>
              </span>
              <span className={styles.name}>{category.label}</span>
              <span className={styles.description}>{detail?.description || category.description}</span>
              <span className={styles.artwork} aria-hidden="true">
                <Image
                  className={styles.illustration}
                  src={"/blog/categories/" + category.id + ".png"}
                  alt=""
                  width={320}
                  height={320}
                  unoptimized
                  loading="lazy"
                />
              </span>
              <span className={styles.action} aria-hidden="true">
                Explorar categoria <span><FiArrowRight /></span>
              </span>
            </Link>
          );
        })}
      </nav>
      <p className={styles.mobileHint}><FiArrowRight aria-hidden="true" />Deslize para descobrir mais categorias</p>
    </section>
  );
}
