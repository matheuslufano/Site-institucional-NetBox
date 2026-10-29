import { articles } from '../_content/articles';
import type { BlogArticle, CategoryId } from './types';

import { BLOG_PATH, categories } from './navigation';
export { BLOG_PATH, SITE_URL, PAGE_SIZE, categories, editorialGroups, blogHref, resolveCategory } from './navigation';
export const categoryLabel = (id: CategoryId) => categories.find(category => category.id === id)!.label;
export const articlePath = (article: BlogArticle) => BLOG_PATH + '/' + article.slug;
export const formatDate = (date: string) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z'));
export const readingTime = (article: BlogArticle) => Math.max(1, Math.ceil(article.content.map(section => [section.heading, ...section.paragraphs, ...(section.list ?? [])].join(' ')).join(' ').split(/\s+/).length / 200));

/** Drafts and scheduled publications never reach public listings or article routes. */
export function visibleArticles(now = new Date()) {
  return articles.filter(article => article.status !== 'draft' && article.publishedAt <= now.toISOString().slice(0, 10))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function indexableArticles() { return visibleArticles().filter(article => article.status === 'published'); }
export function findArticle(slug: string) { return visibleArticles().find(article => article.slug === slug); }
export function normalizeSearch(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim(); }
export function filterArticles(query: string, category: string) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return visibleArticles().filter(article => (!category || article.category === category) && terms.every(term => normalizeSearch(article.title + ' ' + article.summary + ' ' + (article.topic ?? '') + ' ' + categoryLabel(article.category)).includes(term)));
}
/** Escape opening tags so editorial text cannot terminate a JSON-LD script element. */
export function serializeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
