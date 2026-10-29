import Link from 'next/link';
import { ArticleCard } from './ArticleCard';
import { CategorySort } from './CategorySort';
import { CategorySpotlightCard } from './CategorySpotlightCard';
import type { BlogArticle, BlogCategory } from '../_lib/types';
import { BLOG_PATH, PAGE_SIZE, blogHref, normalizeSearch } from '../_lib/blog';
import styles from '../blog.module.css';

type Props = {
  category: BlogCategory;
  query: string;
  group: string;
  order: string;
  topics: string[];
  results: BlogArticle[];
  page: number;
  maxPage: number;
};

/** Full-width category archive: three opening stories, a three-column grid and numbered pages. */
export function CategoryView({ category, query, group, order, topics, results, page, maxPage }: Props) {
  const displayed = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const spotlight = displayed.slice(0, 3);
  const gridArticles = displayed.slice(3);
  // Keep pagination compact even when a future CMS supplies hundreds of pages.
  const pageNumbers = Array.from(new Set([1, maxPage, page - 1, page, page + 1])).filter(number => number >= 1 && number <= maxPage).sort((a, b) => a - b);

  return (
    <div className={styles.categoryArchive} data-ui="blog-category" data-category={category.id}>
      <header className={styles.categoryHeader} data-ui="blog-first-section">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol><li><Link href={BLOG_PATH}>Início</Link></li><li><span aria-current="page">{category.label}</span></li></ol></nav>
        <h1>{category.label}</h1>
        <p className="sr-only">{category.description}</p>
        <div className={styles.categoryToolbar}>
          <nav className={styles.categoryTopics} aria-label="Filtrar por gênero">
            <Link href={blogHref(category.id, '', 1, group, order)} aria-current={!query ? 'page' : undefined}>Todos</Link>
            {topics.map(topic => <Link key={topic} href={blogHref(category.id, topic, 1, group, order)} aria-current={normalizeSearch(query) === normalizeSearch(topic) ? 'page' : undefined}>{topic}</Link>)}
          </nav>
          <CategorySort category={category.id} query={query} group={group} order={order} />
        </div>
      </header>

      <section className={styles.categoryListing} id="publicacoes" aria-label={'Publicações de ' + category.label}>
        <div className={styles.categoryResults}>
          <h2 className="sr-only" id="latest-title">{query ? 'Publicações encontradas' : 'Notícias de ' + category.label}</h2>
          <span role="status">{results.length} {results.length === 1 ? 'artigo' : 'artigos'}</span>
          {query && <div>Busca: “{query}” <Link href={blogHref(category.id, '', 1, group, order)}>Limpar ×</Link></div>}
        </div>
        {displayed.length ? <>
          <div className={styles.categorySpotlight} data-ui="category-spotlight" data-count={spotlight.length}>
            {spotlight.map((article, index) => <CategorySpotlightCard key={article.id} article={article} priority={index === 0} columns={spotlight.length} />)}
          </div>
          {gridArticles.length > 0 && <div className={styles.categoryArchiveGrid} data-ui="category-grid">{gridArticles.map(article => <ArticleCard key={article.id} article={article} archive />)}</div>}
        </> : <div className={styles.empty}><h3>Nenhum artigo encontrado</h3><p>Tente outro gênero ou palavra para pesquisar nesta categoria.</p><Link href={blogHref(category.id)} className={styles.secondaryButton}>Limpar busca</Link></div>}

        {results.length > 0 && <div className={styles.categoryPageFooter}>
          <nav className={styles.categoryPagination} aria-label="Paginação da categoria">
            {page > 1 && <Link href={blogHref(category.id, query, page - 1, group, order)} aria-label="Página anterior">‹</Link>}
            {pageNumbers.map((number, index) => <span key={number}>{index > 0 && number - pageNumbers[index - 1] > 1 && <span className={styles.pageGap} aria-hidden="true">…</span>}{number === page ? <span className={styles.currentPage} aria-current="page">{number}</span> : <Link href={blogHref(category.id, query, number, group, order)} aria-label={'Página ' + number}>{number}</Link>}</span>)}
            {page < maxPage && <Link href={blogHref(category.id, query, page + 1, group, order)} aria-label="Próxima página">›</Link>}
          </nav>
          <p>Página {page} de {maxPage}</p>
        </div>}
      </section>
    </div>
  );
}
