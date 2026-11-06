import type { BlogArticle, ArticleSection } from '@/types/blog';
import type { RichBlock, TextRun } from './richDocument';
import { safeAuthorPhoto, safeHref } from './richDocument';

const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const text = (value: unknown, max = 20000) => typeof value === 'string' ? value.slice(0, max) : '';
const date = (value: unknown) => /^\d{4}-\d{2}-\d{2}/.test(text(value)) && !Number.isNaN(Date.parse(text(value))) ? text(value).slice(0, 10) : new Date().toISOString().slice(0, 10);

/** Messages are transient: whitelist structured content, never HTML or credentials. */
export function previewArticle(value: unknown): BlogArticle | null {
  const input = record(value);
  if (!Array.isArray(input.content) || input.content.length > 100 || typeof input.title !== 'string') return null;
  function block(value: unknown): RichBlock[] {
    const item = record(value);
    if (!['paragraph', 'heading', 'list-item', 'image', 'video'].includes(text(item.type))) return [];
    const content = Array.isArray(item.content) ? item.content.slice(0, 2000).map(value => {
      const run = record(value);
      return { text: text(run.text), bold: run.bold === true, italic: run.italic === true, underline: run.underline === true, href: safeHref(text(run.href)), ...(['sans', 'serif', 'mono'].includes(text(run.font)) ? { font: run.font as TextRun['font'] } : {}), ...(['small', 'normal', 'large'].includes(text(run.size)) ? { size: run.size as TextRun['size'] } : {}) };
    }) : [];
    return [{ type: item.type as RichBlock['type'], level: item.level === 3 ? 3 : 2, ...(['left', 'center', 'right'].includes(text(item.align)) ? { align: item.align as RichBlock['align'] } : {}), width: typeof item.width === 'number' && Number.isFinite(item.width) ? Math.max(20, Math.min(100, item.width)) : 100, src: safeHref(text(item.src), item.type === 'image'), alt: text(item.alt, 500), content }];
  }
  const content: ArticleSection[] = input.content.map(value => {
    const section = record(value);
    const image = record(section.image), link = record(section.link);
    return { heading: text(section.heading, 300), level: section.level === 3 ? 3 : 2, paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.slice(0, 500).map(value => text(value)) : [], ...(Array.isArray(section.document) ? { document: section.document.slice(0, 500).flatMap(block) } : {}), ...(Array.isArray(section.list) ? { list: section.list.slice(0, 100).map(value => text(value)) } : {}), ...(safeHref(text(image.src), true) ? { image: { src: safeHref(text(image.src), true), alt: text(image.alt, 500) } } : {}), ...(safeHref(text(link.href)) ? { link: { href: safeHref(text(link.href)), label: text(link.label, 300) } } : {}) };
  });
  const sources = Array.isArray(input.sources) ? input.sources.slice(0, 100).flatMap(value => { const source = record(value); const url = safeHref(text(source.url)); return url ? [{ title: text(source.title, 300), publisher: text(source.publisher, 300), url, ...(source.role === 'promotional' ? { role: 'promotional' as const } : {}) }] : []; }) : [];
  const artwork = record(input.spotlight);
  const authorPhotoUrl = safeAuthorPhoto(input.authorPhotoUrl || record(input.authorUser).photoUrl);
  return { id: text(input.id, 200), slug: text(input.slug, 200) || 'previa', title: text(input.title, 200) || 'Sem título', summary: text(input.summary, 1000), category: text(input.category, 200), topic: text(input.topic, 200) || undefined, cover: safeHref(text(input.cover), true), coverAlt: text(input.coverAlt, 500), coverCredit: text(input.coverCredit, 500) || undefined, ...(safeHref(text(artwork.poster), true) ? { spotlight: { title: text(artwork.title, 200), poster: safeHref(text(artwork.poster), true), posterAlt: text(artwork.posterAlt, 500), trailerUrl: safeHref(text(artwork.trailerUrl)) } } : {}), sources, author: text(input.author, 200) || 'Autor do artigo', authorPhotoUrl, publishedAt: date(input.publishedAt), updatedAt: date(input.updatedAt), status: input.status === 'demo' ? 'demo' : 'draft', featured: false, content, seo: { title: text(input.title, 200), description: text(input.summary, 1000) } };
}
