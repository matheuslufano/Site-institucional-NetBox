"use client";

import { CoverImage } from "@/components/blog/articles/CoverImage";
import { normalizeSearch } from "@/lib/blog/searchNormalization";
import { categoryLabel } from "@/lib/blog/catalog";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import type { ArticleSuggestion } from "./SearchForm";
import styles from "./SearchCoverCarousel.module.css";
import { emptySearchDogs } from "./empty-search-dogs";


function rankSearchCovers(articles: ArticleSuggestion[], query: string) {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return articles;

  const terms = [...new Set(normalizedQuery.split(" "))];
  const ranked = articles.map((article) => {
    const title = normalizeSearch(article.title);
    const titleMatches = terms.filter((term) => title.includes(term)).length;
    const fullMatch = terms.every((term) => article.searchText.includes(term));
    const relatedTerms = terms.filter(
      (term) => term.length >= 3 && article.searchText.includes(term),
    ).length;
    return {
      article,
      titleMatches,
      fullMatch,
      relatedTerms,
      title,
      phraseMatch: title.includes(normalizedQuery),
    };
  });
  const primary = ranked
    .filter((item) => item.fullMatch)
    .sort(
      (a, b) =>
        Number(b.title === normalizedQuery) -
          Number(a.title === normalizedQuery) ||
        Number(b.phraseMatch) - Number(a.phraseMatch) ||
        b.titleMatches - a.titleMatches,
    )[0];
  const related = ranked
    .filter(
      (item) =>
        item !== primary &&
        (item.fullMatch ||
          item.relatedTerms > 0 ||
          item.article.category === primary?.article.category),
    )
    .sort(
      (a, b) =>
        Number(b.fullMatch) - Number(a.fullMatch) ||
        b.relatedTerms - a.relatedTerms ||
        Number(b.article.category === primary?.article.category) -
          Number(a.article.category === primary?.article.category),
    );

  return [
    ...(primary ? [primary.article] : []),
    ...related.map((item) => item.article),
  ];
}

export function SearchCoverCarousel({
  articles,
  query,
  submissionIndex,
  resultsHref,
  onNavigate,
}: {
  articles: ArticleSuggestion[];
  query: string;
  submissionIndex: number;
  resultsHref: string;
  onNavigate?: () => void;
}) {
  const covers = rankSearchCovers(articles, query);
  const rowRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: covers.length <= 2 });

  function scrollCovers(direction: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({
      left: row.clientWidth * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      id="blog-search-cover-results"
      className={styles.coverResults}
      data-empty={covers.length === 0}
      aria-labelledby="blog-search-results-title"
    >
      <div className={styles.coverResultsHeader}>
        <h3 id="blog-search-results-title">Resultados da busca</h3>
        {covers.length > 2 && (
          <div className={styles.coverNavigation}>
            <button
              id="blog-search-covers-previous"
              type="button"
              aria-label="Capas anteriores"
              disabled={edges.start}
              onClick={() => scrollCovers(-1)}
            >
              <IoChevronBack aria-hidden="true" />
            </button>
            <button
              id="blog-search-covers-next"
              type="button"
              aria-label="PrÃ³ximas capas"
              disabled={edges.end}
              onClick={() => scrollCovers(1)}
            >
              <IoChevronForward aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {covers.length > 0 ? (
        <ul
          id="blog-search-cover-carousel"
          ref={rowRef}
          className={styles.coverCarousel}
          aria-label="Capas dos artigos"
          onScroll={(event) => {
            const { scrollLeft, clientWidth, scrollWidth } =
              event.currentTarget;
            setEdges({
              start: scrollLeft <= 1,
              end: scrollLeft + clientWidth >= scrollWidth - 1,
            });
          }}
        >
          {covers.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className={styles.coverCard}
                onNavigate={onNavigate}
              >
                <span className={styles.coverFrame}>
                  <CoverImage
                    src={article.cover}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 64px, 180px"
                  />
                </span>
                <span className={styles.coverCopy}>
                  <small>{categoryLabel(article.category)}</small>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptySearchState submissionIndex={submissionIndex} />
      )}
      {!!covers.length && <Link href={resultsHref} onNavigate={onNavigate}>Ver todos os resultados</Link>}
    </section>
  );
}

function EmptySearchState({ submissionIndex }: { submissionIndex: number }) {
  const { name, width, height, message } =
    emptySearchDogs[submissionIndex % emptySearchDogs.length];

  return (
    <div className={styles.emptySearch}>
      <p role="status">{message}</p>
      <Image
        className={styles.emptySearchDog}
        src={`/blog/search-empty/${name}.webp`}
        alt=""
        width={width}
        height={height}
        unoptimized
      />
    </div>
  );
}
