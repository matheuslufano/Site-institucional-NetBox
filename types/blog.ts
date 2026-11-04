import type { RichBlock } from '@/lib/blog/richDocument';
export type CategoryId = string;

export type BlogCategory = {
  id: CategoryId;
  label: string;
  description: string;
};

/** Structured content is rendered as React elements; no untrusted HTML is executed. */
export type ArticleSection = {
  /** Optional rich document; plain paragraphs remain available to search and older consumers. */
  document?: RichBlock[];
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  list?: string[];
  link?: { label: string; href: string };
  image?: { src: string; alt: string };
};

export type ArticleSource = {
  title: string;
  url: string;
  publisher: string;
  /** Clarifies whether a link supports facts or only identifies promotional material. */
  role?: 'reference' | 'promotional';
};

export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  /** Editorial genre shown on cards; category continues to drive section navigation. */
  topic?: string;
  category: CategoryId;
  cover: string;
  coverAlt: string;
  coverCredit?: string;
  /** Optional cinema/series presentation; trailer is a verified official video URL. */
  spotlight?: { title: string; poster: string; posterAlt?: string; trailerUrl?: string };
  sources?: ArticleSource[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'demo' | 'draft' | 'published';
  featured: boolean;
  content: ArticleSection[];
  seo: { title: string; description: string };
};
