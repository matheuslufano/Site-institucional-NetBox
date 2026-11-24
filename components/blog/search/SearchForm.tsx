'use client';
import { blogHref, editorialGroups } from '@/lib/blog/navigation';
import styles from '@/styles/blog/Blog.module.css';
import Link from 'next/link';
import { normalizeSearch } from '@/lib/blog/searchNormalization';
import suggestionStyles from './SearchForm.module.css';
import { useEffect, useRef, useState } from 'react';
import type { CategoryId } from '@/types/blog';
import { SearchCoverCarousel } from './SearchCoverCarousel';

const SEARCH_PRESS_DELAY_MS = 180;

export type ArticleSuggestion = {
  title: string;
  href: string;
  category: CategoryId;
  searchText: string;
  cover: string;
};

/** GET-compatible search progressively enhances to client-side App Router navigation. */
export function SearchForm({ query, category, group, articleSuggestions, onSubmitted }: { query: string; category: string; group: string; articleSuggestions: ArticleSuggestion[]; onSubmitted?: () => void }) {
  const [searchPressed, setSearchPressed] = useState(false);
  const [submission, setSubmission] = useState<{ query: string; index: number } | null>(null);
  const searchTimer = useRef<number | null>(null);
  const submitting = searchPressed;
  useEffect(() => () => {
    if (searchTimer.current !== null) window.clearTimeout(searchTimer.current);
  }, []);
  const [searchText, setSearchText] = useState(query);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const terms = normalizeSearch(searchText).split(' ').filter(Boolean);
  const suggestions = terms.length ? articleSuggestions.filter(article => {
    const title = normalizeSearch(article.title);
    return terms.every(term => title.includes(term));
  }) : articleSuggestions;
  const selectedGroup = editorialGroups.find(item => item.id === group);
  const scopedArticles = articleSuggestions.filter(article =>
    (!category || article.category === category) &&
    (!selectedGroup || selectedGroup.ids.includes(article.category)),
  );

  return <>
  <form action="/site/blog" role="search" className={`${styles.search} ${suggestionStyles.articleSearchForm}`} aria-busy={submitting} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setSuggestionsOpen(false);
  }} onSubmit={event => {
    event.preventDefault();
    if (submitting || searchTimer.current !== null) return;
    const data = new FormData(event.currentTarget);
    const submittedText = String(data.get('q') ?? '').trim();
    setSuggestionsOpen(false);
    setSearchPressed(true);
    searchTimer.current = window.setTimeout(() => {
      searchTimer.current = null;
      setSearchPressed(false);
      setSubmission(previous => ({ query: submittedText, index: (previous?.index ?? -1) + 1 }));
    }, SEARCH_PRESS_DELAY_MS);
  }}>
    <label className="sr-only" htmlFor="blog-search">Buscar artigos por título, resumo ou categoria</label>
    <input id="blog-search" name="q" value={searchText} onClick={() => setSuggestionsOpen(true)} onChange={event => setSearchText(event.target.value)} autoComplete="off" placeholder="Buscar artigos..." type="search" maxLength={160} />
    {group && <input type="hidden" name="grupo" value={group} />}
    {category && <input type="hidden" name="categoria" value={category} />}
    <button
      id="blog-search-submit"
      className={suggestionStyles.searchEnter}
      type="submit"
      aria-label={submitting ? 'Buscando…' : 'Buscar'}
      data-pressed={searchPressed}
      disabled={submitting}
    >
      <svg className={suggestionStyles.searchEnterFace} viewBox="0 0 132 142" aria-hidden="true">
        <path fill="#f4f4f4" d="M45 2H124Q130 2 130 8V134Q130 140 124 140H8Q2 140 2 134V80Q2 74 8 74H41V8Q41 2 45 2Z" />
        <path fill="#fff" d="M53 14H118V127H14V86H53Z" />
        <path fill="none" d="M43 4L53 14M127 4L118 14M127 138L118 127M4 138L14 127M4 76L14 86M41 74L53 86" />
        <text x="28" y="107" stroke="none">Enter</text>
        <path fill="currentColor" stroke="none" d="M64 105H68V119H40V123L25 117L40 111V115H64Z" />
      </svg>
    </button>
    {suggestionsOpen && <ul id="blog-article-search-suggestions" className={suggestionStyles.articleSuggestions} aria-label="Sugestões de artigos">
      {suggestions.map(article => (
        <li key={article.href}>
          <Link href={article.href} onNavigate={onSubmitted}>{article.title}</Link>
        </li>
      ))}
      {!suggestions.length && <li className={suggestionStyles.emptySuggestions}>Nenhum título encontrado.</li>}
    </ul>}
  </form>
  {submission && (
    <SearchCoverCarousel
      key={JSON.stringify([submission.query, category, group])}
      query={submission.query}
      submissionIndex={submission.index}
      articles={scopedArticles}
      resultsHref={blogHref(category, submission.query, 1, group)}
      onNavigate={onSubmitted}
    />
  )}
  </>;
}
