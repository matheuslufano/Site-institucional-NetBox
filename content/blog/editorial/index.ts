import records from './articles.json' with { type: 'json' };
import type { ArticleSection, BlogArticle, CategoryId } from '@/types/blog';

/** Local catalog records keep editorial copy separate from site rendering code. */
type EditorialRecord = Omit<BlogArticle, 'cover' | 'coverSource' | 'posterSource' | 'sourcePage' | 'publisher' | 'sources' | 'spotlight' | 'content' | 'seo'> & {
  coverSource: string;
  posterSource: string;
  sourcePage: string;
  publisher: string;
  sources: NonNullable<BlogArticle['sources']>;
  content: ArticleSection[];
  seo: BlogArticle['seo'];
  spotlight: { title: string; trailerUrl?: string } | null;
};

/** Resolve a content record into the public asset paths used by the image component. */
function toArticle(record: EditorialRecord): BlogArticle {
  const localImage = '/blog/editorial/' + record.slug;
  const spotlight = record.spotlight
    ? { title: record.spotlight.title, poster: '/blog/editorial/posters/' + record.slug + '.webp', ...(record.spotlight.trailerUrl ? { trailerUrl: record.spotlight.trailerUrl } : {}) }
    : undefined;

  return {
    ...record,
    category: record.category as CategoryId,
    cover: localImage + '-1200.webp',
    spotlight,
  };
}

export const editorialArticles: BlogArticle[] = (records as EditorialRecord[]).map(toArticle);


