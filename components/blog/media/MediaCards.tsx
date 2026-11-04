import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiFilm, FiStar } from 'react-icons/fi';
import type { MediaWork } from '@/lib/blog/media';
import styles from './MediaCatalog.module.css';

/** Shared presentation for trends and title-search results, without provider transport code. */
export function MediaCards({ works, compact = false }: { works: MediaWork[]; compact?: boolean }) {
  return <div className={compact ? styles.searchGrid : styles.grid}>{works.map((work, index) => <Link key={work.kind + work.id} href={`/site/blog/obras/${work.kind}/${work.id}`} className={!compact && index < 3 ? styles.feature : styles.card}>
    {!compact && <span className={styles.rank}>#{index + 1}</span>}
    <div className={styles.poster}>{work.poster ? <Image src={work.poster} alt={'Capa de ' + work.title} width={500} height={750} unoptimized /> : <span><FiFilm aria-hidden="true" />Capa indisponível</span>}</div>
    <div className={styles.copy}><h3>{work.title}</h3><div className={styles.meta}><span>{work.year || 'Ano não informado'}</span><span>{work.kind === 'movie' ? 'Filme' : 'Série'}</span></div>
      <span className={styles.rating}><FiStar aria-hidden="true" />{work.rating === null ? 'Sem avaliações' : work.rating.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' / 10'}</span>
      {!compact && index < 3 && <p className={styles.synopsis}>{work.overview || 'Sinopse em português indisponível.'}</p>}
      <span className={styles.more}>Conhecer a obra <FiArrowUpRight aria-hidden="true" /></span>
    </div>
  </Link>)}</div>;
}
