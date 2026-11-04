import { articles } from '@/content/blog/articles';
import type { BlogArticle, CategoryId } from '@/types/blog';

import { BLOG_PATH, categories } from './navigation';
export { BLOG_PATH, blogHref, categories, editorialGroups, PAGE_SIZE, resolveCategory, SITE_URL } from './navigation';
/** Older articles may keep a category that is no longer offered in navigation. */
export const categoryLabel = (id: CategoryId) => categories.find(category => category.id === id)?.label ?? (id.charAt(0).toLocaleUpperCase('pt-BR') + id.slice(1));
export const articlePath = (article: BlogArticle) => BLOG_PATH + '/' + article.slug;
export const formatDate = (date: string) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z'));
export const readingTime = (article: BlogArticle) => Math.max(1, Math.ceil(article.content.map(section => [section.heading, ...section.paragraphs, ...(section.list ?? [])].join(' ')).join(' ').split(/\s+/).length / 200));

/** Drafts and scheduled publications never reach public listings or article routes. */
export function visibleArticles(now = new Date(), source = articles) {
  return source.filter(article => article.status !== 'draft' && article.publishedAt <= now.toISOString().slice(0, 10))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function indexableArticles() { return visibleArticles().filter(article => article.status === 'published'); }
export function findArticle(slug: string) { return visibleArticles().find(article => article.slug === slug); }
export function normalizeSearch(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim(); }
export function filterArticles(query: string, category: string, source = articles) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return visibleArticles(new Date(), source).filter(article => (!category || article.category === category) && terms.every(term => normalizeSearch(article.title + ' ' + article.summary + ' ' + (article.topic ?? '') + ' ' + categoryLabel(article.category)).includes(term)));
}
/** Escape opening tags so editorial text cannot terminate a JSON-LD script element. */
export function serializeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
