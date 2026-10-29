import type { Metadata } from "next";
import Link from "next/link";
import { CategoryView } from "./_components/CategoryView";
import { ArticleCard } from "./_components/ArticleCard";
import { EditorialHero } from "./_components/EditorialHero";
import { ArticleFeedCard } from "./_components/ArticleFeedCard";
import { BsRocket } from "react-icons/bs";

import {
  BLOG_PATH,
  PAGE_SIZE,
  blogHref,
  categories,
  editorialGroups,
  filterArticles,
  resolveCategory,
  visibleArticles,
} from "./_lib/blog";
import styles from "./blog.module.css";

type Query = {
  grupo?: string | string[];
  categoria?: string | string[];
  q?: string | string[];
  pagina?: string | string[];
  ordem?: string | string[];
};
type Props = { searchParams: Promise<Query> };
const scalar = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : "";

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const category = categories.find(
    (item) => item.id === resolveCategory(scalar(params.categoria)),
  );
  const title = category
    ? category.label + " | Blog Netbox"
    : "Blog Netbox | Tecnologia e cultura nerd e pop";
  const description =
    category?.description ??
    "Tecnologia, filmes, séries, HQs, jogos e entretenimento: explore o universo nerd e pop no Blog Netbox.";
  return {
    title,
    description,
    alternates: { canonical: BLOG_PATH },
    robots:
      params.q ||
      params.categoria ||
      params.pagina ||
      params.grupo ||
      params.ordem
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: BLOG_PATH,
      type: "website",
      images: ["/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = scalar(params.q).trim().slice(0, 160);
  const requestedCategory = scalar(params.categoria);
  const selectedCategory = categories.find(
    (item) => item.id === resolveCategory(requestedCategory),
  );
  const category = selectedCategory?.id ?? "";
  const group = editorialGroups.find(
    (item) => item.id === scalar(params.grupo),
  );
  const results = filterArticles(query, category).filter(
    (article) => !group || group.ids.includes(article.category),
  );
  const maxPage = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const rawPage = Number(scalar(params.pagina));
  const page =
    Number.isSafeInteger(rawPage) && rawPage > 0
      ? Math.min(rawPage, maxPage)
      : 1;
  const all = visibleArticles();
  const featured = [
    ...all.filter((article) => article.featured),
    ...all.filter((article) => !article.featured),
  ].slice(0, 4);
  const filtered = Boolean(query || category || group);
  if (selectedCategory) {
    const requestedOrder = scalar(params.ordem);
    const order = ["antigas", "destaques"].includes(requestedOrder)
      ? requestedOrder
      : "recentes";
    const categoryArticles = filterArticles("", selectedCategory.id);
    const topics = [
      ...new Set(
        categoryArticles
          .map((article) => article.topic)
          .filter((topic): topic is string => Boolean(topic)),
      ),
    ];
    const orderedResults =
      order === "antigas"
        ? [...results].sort((a, b) =>
            a.publishedAt.localeCompare(b.publishedAt),
          )
        : order === "destaques"
          ? [...results].sort((a, b) => Number(b.featured) - Number(a.featured))
          : results;
    return (
      <CategoryView
        category={selectedCategory}
        query={query}
        group={group?.id ?? ""}
        results={orderedResults}
        order={order}
        topics={topics}
        page={page}
        maxPage={maxPage}
      />
    );
  }
  return (
    <>
      <h1 className="sr-only">Blog Netbox — tecnologia e cultura nerd e pop</h1>
      {!filtered && (
        <EditorialHero articles={featured} latestArticles={all.slice(0, 10)} />
      )}
      <div className={styles.shell}>
        <div className={styles.newsLayout}>
          <section
            className={styles.feedSection}
            aria-labelledby="latest-title"
            id="publicacoes"
          >
            <div className={styles.sectionHeading}>
              <h2 id="latest-title">
                {filtered ? "Publicações encontradas" : "Mais recentes"}
              </h2>
              <span role="status">
                {results.length} {results.length === 1 ? "artigo" : "artigos"}
              </span>
            </div>
            {filtered && (
              <div className={styles.filterSummary}>
                <span>
                  {category
                    ? selectedCategory!.label
                    : (group?.title ?? "Todos os assuntos")}
                  {query ? " · Busca: “" + query + "”" : ""}
                </span>
                <Link href={BLOG_PATH}>Limpar filtros ×</Link>
              </div>
            )}
            {results.length ? (
              <>
                <div className={styles.feed} data-ui="news-timeline">
                  <span
                    className={styles.timelineRocket}
                    data-ui="timeline-rocket"
                    aria-hidden="true"
                  >
                    <BsRocket />
                  </span>
                  {results.slice(0, page * PAGE_SIZE).map((article) => (
                    <ArticleFeedCard key={article.id} article={article} />
                  ))}
                </div>
                {page < maxPage && (
                  <div className={styles.loadMore}>
                    <Link
                      className={styles.secondaryButton}
                      href={
                        blogHref(category, query, page + 1, group?.id) +
                        "#publicacoes"
                      }
                      scroll={false}
                    >
                      Carregar mais notícias ↓
                    </Link>
                    <p>
                      Exibindo {Math.min(page * PAGE_SIZE, results.length)} de{" "}
                      {results.length} artigos
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.empty}>
                <h3>Nenhum artigo encontrado</h3>
                <p>Tente outra palavra ou escolha uma categoria diferente.</p>
                <Link href={BLOG_PATH} className={styles.secondaryButton}>
                  Limpar busca e filtros
                </Link>
              </div>
            )}
          </section>
        </div>
        {!filtered &&
          editorialGroups.map((group) => (
            <section
              className={styles.section}
              key={group.title}
              aria-label={group.title}
            >
              <div className={styles.sectionHeading}>
                <h2>{group.title}</h2>
                <Link href={blogHref("", "", 1, group.id)}>
                  Ver todos <span className="sr-only">de {group.title}</span>
                  <span aria-hidden="true"> ↗</span>
                </Link>
              </div>
              <div className={styles.grid}>
                {all
                  .filter((article) => group.ids.includes(article.category))
                  .slice(0, 3)
                  .map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
