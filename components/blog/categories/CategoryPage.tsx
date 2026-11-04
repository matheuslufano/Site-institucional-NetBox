import { FeaturedNews } from "@/components/blog/home/FeaturedNews";
import { MediaCatalog } from "@/components/blog/media/MediaCatalog";
import { Suspense } from "react";
import { ArticleCard } from "@/components/blog/articles/ArticleCard";
import {
  BLOG_PATH,
  blogHref,
  normalizeSearch,
} from "@/lib/blog/catalog";
import type { BlogArticle, BlogCategory } from "@/types/blog";
import { CATEGORY_PAGE_SIZE } from "@/lib/blog/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiFilter,
  FiGrid,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { CategorySort } from "./CategorySort";
import { FeaturedCard } from "./FeaturedCard";
import styles from "./CategoryPage.module.css";

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

/** Category identity, shared opening, GET filters and pagination without duplicate listing cards. */
export function CategoryPage({
  category,
  query,
  group,
  order,
  topics,
  results,
  page,
  maxPage,
}: Props) {
  const heroArticles = results.slice(0, 10);
  const hasHero = heroArticles.length > 0;
  const displayed = results.slice((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE);
  const spotlight = displayed.slice(0, 3);
  const gridArticles = displayed.slice(3);
  const firstResult = (page - 1) * CATEGORY_PAGE_SIZE + 1;
  const pageNumbers = Array.from(
    new Set([1, maxPage, page - 1, page, page + 1]),
  )
    .filter((number) => number >= 1 && number <= maxPage)
    .sort((a, b) => a - b);

  return (
    <div
      data-ui="blog-category"
      data-category={category.id}
      className={styles.page}
    >


      {hasHero && (
        <FeaturedNews
          latestArticles={heroArticles}
          layout={category.id === "tecnologia" ? "background" : "poster"}
          label={"Destaques de " + category.label}
        />
      )}

      <div className={styles.archive}>
        <section
          className={styles.filters}
          aria-label="Pesquisar e filtrar artigos"
        >
          <div className={styles.filterTop}>
            <div className={styles.filterHeading}>
              <span>
                <FiFilter aria-hidden="true" />
              </span>
              <div>
                <h2>Encontre sua próxima leitura</h2>
                <p>Explore os assuntos ou procure algo específico.</p>
              </div>
            </div>
            <form
              action={BLOG_PATH}
              method="get"
              className={styles.search}
              role="search"
              aria-label={"Pesquisar em " + category.label}
            >
              <input type="hidden" name="categoria" value={category.id} />
              {group && <input type="hidden" name="grupo" value={group} />}
              {order !== "recentes" && (
                <input type="hidden" name="ordem" value={order} />
              )}
              <label className="sr-only" htmlFor="category-query">
                Buscar artigos em {category.label}
              </label>
              <input
                key={query}
                id="category-query"
                type="search"
                name="q"
                defaultValue={query}
                maxLength={160}
                placeholder={"Buscar em " + category.label + "…"}
              />
              <button type="submit" aria-label={"Buscar em " + category.label}>
                <FiSearch aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className={styles.toolbar}>
            <nav className={styles.topics} aria-label="Filtrar por gênero">
              <Link
                href={blogHref(category.id, "", 1, group, order)}
                aria-current={!query ? "page" : undefined}
              >
                <FiGrid aria-hidden="true" />
                Todos
              </Link>
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={blogHref(category.id, topic, 1, group, order)}
                  aria-current={
                    normalizeSearch(query) === normalizeSearch(topic)
                      ? "page"
                      : undefined
                  }
                >
                  <FiBookOpen aria-hidden="true" />
                  {topic}
                </Link>
              ))}
            </nav>
            <CategorySort
              category={category.id}
              query={query}
              group={group}
              order={order}
            />
          </div>
        </section>

        <section
          className={styles.listing}
          id="publicacoes"
          aria-labelledby="latest-title"
        >
          <div className={styles.results}>
            <div>
              <span className={styles.eyebrow}>Para continuar explorando</span>
              <h2 id="latest-title">
                {query ? "Resultados da busca" : "Artigos de " + category.label}
              </h2>
            </div>
            <span className={styles.count} role="status">
              <FiBookOpen aria-hidden="true" />
              {results.length} {results.length === 1 ? "artigo" : "artigos"}
            </span>
          </div>
          {query && (
            <div className={styles.querySummary}>
              <span>
                Resultados para <strong>“{query}”</strong>
              </span>
              <Link href={blogHref(category.id, "", 1, group, order)}>
                <FiX aria-hidden="true" />
                Limpar busca
              </Link>
            </div>
          )}

          {displayed.length ? (
            <>
              <div
                className={styles.spotlight}
                data-ui="category-spotlight"
                data-count={spotlight.length}
              >
                {spotlight.map((article) => (
                  <FeaturedCard
                    key={article.id}
                    article={article}
                    columns={spotlight.length}
                  />
                ))}
              </div>
              {gridArticles.length > 0 && (
                <div className={styles.archiveGrid} data-ui="category-grid">
                  {gridArticles.map((article) => (
                    <div key={article.id} className={styles.archiveCard}>
                      <ArticleCard article={article} archive />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <FiSearch aria-hidden="true" />
              </span>
              <h3>Nenhum artigo encontrado</h3>
              <p>
                Tente outra palavra ou limpe os filtros para explorar esta
                categoria.
              </p>
              <Link href={blogHref(category.id)}>
                <FiArrowLeft aria-hidden="true" />
                Ver artigos da categoria
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <footer className={styles.pageFooter}>
              <p>
                Exibindo{" "}
                <strong>
                  {firstResult}–{Math.min(page * CATEGORY_PAGE_SIZE, results.length)}
                </strong>{" "}
                de {results.length} artigos
              </p>
              <nav
                className={styles.pagination}
                aria-label="Paginação da categoria"
              >
                {page > 1 ? (
                  <Link
                    className={styles.pageArrow}
                    href={
                      blogHref(category.id, query, page - 1, group, order) +
                      "#publicacoes"
                    }
                    aria-label="Página anterior"
                  >
                    <FiArrowLeft aria-hidden="true" />
                  </Link>
                ) : (
                  <span
                    className={styles.pageArrow}
                    aria-disabled="true"
                    aria-label="Página anterior indisponível"
                  >
                    <FiArrowLeft aria-hidden="true" />
                  </span>
                )}
                {pageNumbers.map((number, index) => (
                  <span key={number} className={styles.pageNumber}>
                    {index > 0 && number - pageNumbers[index - 1] > 1 && (
                      <span className={styles.pageGap} aria-hidden="true">
                        …
                      </span>
                    )}
                    {number === page ? (
                      <span
                        className={styles.currentPage}
                        aria-current="page"
                        aria-label={"Página " + number}
                      >
                        {number}
                      </span>
                    ) : (
                      <Link
                        href={
                          blogHref(category.id, query, number, group, order) +
                          "#publicacoes"
                        }
                        aria-label={"Página " + number}
                      >
                        {number}
                      </Link>
                    )}
                  </span>
                ))}
                {page < maxPage ? (
                  <Link
                    className={styles.pageArrow}
                    href={
                      blogHref(category.id, query, page + 1, group, order) +
                      "#publicacoes"
                    }
                    aria-label="Próxima página"
                  >
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <span
                    className={styles.pageArrow}
                    aria-disabled="true"
                    aria-label="Próxima página indisponível"
                  >
                    <FiArrowRight aria-hidden="true" />
                  </span>
                )}
              </nav>
              <span className={styles.pageLabel}>
                Página {page} de {maxPage}
              </span>
            </footer>
          )}
        </section>
      </div>
      {(category.id === "filmes" || category.id === "series") && (
          <Suspense fallback={<p role="status">Carregando filmes e séries…</p>}>
            <MediaCatalog category={category.id} />
          </Suspense>
        )}
    </div>
  );
}
