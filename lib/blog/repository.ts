import { articles as localArticles } from '@/content/blog/articles';
import type { BlogArticle } from '@/types/blog';

const apiBaseUrl = process.env.BLOG_API_URL?.replace(/\/$/, '');

function isBlogArticle(value: unknown): value is BlogArticle {
  if (!value || typeof value !== 'object') return false;
  const article = value as Partial<BlogArticle>;
  return Boolean(
    article.id &&
      article.slug &&
      article.title &&
      article.summary &&
      article.category &&
      article.cover &&
      article.seo &&
      Array.isArray(article.content),
  );
}

async function apiRequest(path: string): Promise<unknown> {
  if (!apiBaseUrl) throw new Error('BLOG_API_URL não configurada.');
  const response = await fetch(apiBaseUrl + path, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(`API do Blog respondeu ${response.status}.`);
  return response.json();
}

/**
 * Without an API configuration, use the versioned catalog for offline development.
 * With an API configured, never resurrect unpublished content from the local catalog.
 */
export async function getBlogArticles(): Promise<BlogArticle[]> {
  if (!apiBaseUrl) return localArticles;
  try {
    const data = await apiRequest('/blog/articles');
    if (!Array.isArray(data) || !data.every(isBlogArticle)) throw new Error('Catálogo inválido.');
    return data;
  } catch (error) {
    console.warn('API do Blog indisponível:', error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getBlogArticle(slug: string): Promise<BlogArticle | undefined> {
  if (!apiBaseUrl) return localArticles.find(article => article.slug === slug && article.status !== 'draft');
  try {
    const data = await apiRequest('/blog/articles/' + encodeURIComponent(slug));
    if (data === undefined) return undefined;
    if (!isBlogArticle(data)) throw new Error('Artigo inválido.');
    return data;
  } catch (error) {
    console.warn(`Falha na API do Blog para ${slug}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}
