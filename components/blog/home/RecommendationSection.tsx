import Link from 'next/link';
import { FiArrowUpRight, FiBookOpen, FiCalendar, FiClock, FiFilm, FiGrid, FiPlay, FiTv } from 'react-icons/fi';
import { CoverImage } from '@/components/blog/articles/CoverImage';
import { articlePath, blogHref, categoryLabel, formatDate, readingTime } from '@/lib/blog/catalog';
import type { BlogArticle } from '@/types/blog';
import styles from './RecommendationSection.module.css';

type Props = {
  group: { id: string; title: string; ids: string[] };
  /** Existing publication order and the three recommendations are preserved. */
  articles: BlogArticle[];
};

function ArticleMeta({ article }: { article: BlogArticle }) {
  return <div className={styles.meta}>
    <span><FiClock aria-hidden="true" />{readingTime(article)} min de leitura</span>
    <span><FiCalendar aria-hidden="true" /><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span>
    {article.status === 'demo' && <span className={styles.demo}>Demonstrativo</span>}
  </div>;
}

/** Server-rendered magazine layout, scoped to the two entertainment recommendation groups. */
export function RecommendationSection({ group, articles }: Props) {
  const cinema = group.id === 'entretenimento';
  const Icon = cinema ? FiFilm : FiBookOpen;
  const [lead, ...others] = articles.slice(0, 3);
  const titleId = `recommendations-${group.id}`;
  const categoryIcons = { filmes: FiFilm, series: FiTv, entretenimento: FiPlay, hqs: FiBookOpen, games: FiGrid };
  return <section className={styles.section} data-tone={cinema ? 'cinema' : 'nerd'} data-ui={`recommendations-${group.id}`} aria-labelledby={titleId}>
    <header className={styles.header}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}><Icon aria-hidden="true" />{cinema ? 'Cinema & maratonas' : 'Histórias & novas fases'}</span>
        <h2 id={titleId}>{group.title}</h2>
        <p>{cinema ? 'Do cinema à sua próxima maratona. Encontre uma história para dar o play.' : 'Dos quadrinhos à próxima partida. Explore personagens, histórias e novos mundos.'}</p>
      </div>
      <Link className={styles.explore} href={blogHref('', '', 1, group.id)}>Ver todos <span className="sr-only">de {group.title}</span><FiArrowUpRight aria-hidden="true" /></Link>
    </header>
    <nav className={styles.categories} aria-label={`Categorias de ${group.title}`}>
      {group.ids.map(id => { const CategoryIcon = categoryIcons[id as keyof typeof categoryIcons] || Icon; return <Link key={id} href={blogHref(id)}><CategoryIcon aria-hidden="true" />{categoryLabel(id)}<FiArrowUpRight aria-hidden="true" /></Link>; })}
    </nav>
    {lead ? <div className={styles.layout}>
      <article className={styles.lead}>
        <Link className={styles.leadLink} href={articlePath(lead)}>
          <CoverImage src={lead.cover} alt={lead.coverAlt} fill sizes="(max-width: 800px) 100vw, 55vw" className={styles.leadImage} />
          <span className={styles.leadLabel}><Icon aria-hidden="true" />Para começar</span>
          <div className={styles.leadBody}>
            <span className={styles.category}>{lead.topic ?? categoryLabel(lead.category)}</span>
            <h3>{lead.title}</h3>
            <p>{lead.summary}</p>
            <ArticleMeta article={lead} />
            <span className={styles.read}>Ler artigo <FiArrowUpRight aria-hidden="true" /></span>
          </div>
          <span className={styles.leadArrow} aria-hidden="true"><FiArrowUpRight /></span>
        </Link>
      </article>
      {!!others.length && <div className={styles.list}>
        <div className={styles.listHeading}><span>Continue explorando</span><span aria-hidden="true">0{others.length}</span></div>
        {others.map((article, index) => <article key={article.id} className={styles.card}>
          <Link className={styles.cardLink} href={articlePath(article)}>
            <div className={styles.thumbnail}><CoverImage src={article.cover} alt={article.coverAlt} fill sizes="(max-width: 500px) 108px, (max-width: 800px) 180px, 160px" /><span className={styles.number} aria-hidden="true">0{index + 2}</span></div>
            <div className={styles.cardBody}>
              <span className={styles.category}>{article.topic ?? categoryLabel(article.category)}</span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <ArticleMeta article={article} />
              <span className={styles.cardAction}>Ler artigo <FiArrowUpRight aria-hidden="true" /></span>
            </div>
          </Link>
        </article>)}
      </div>}
    </div> : <p className={styles.empty}>Novas recomendações aparecerão aqui quando houver artigos disponíveis.</p>}
  </section>;
}
