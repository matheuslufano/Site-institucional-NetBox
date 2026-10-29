export type CategoryId = 'tecnologia' | 'filmes' | 'series' | 'hqs' | 'games' | 'entretenimento';

export type BlogCategory = {
  id: CategoryId;
  label: string;
  description: string;
};

/** Structured content is rendered as React elements; no untrusted HTML is executed. */
export type ArticleSection = {
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  list?: string[];
  link?: { label: string; href: string };
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
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'demo' | 'draft' | 'published';
  featured: boolean;
  content: ArticleSection[];
  seo: { title: string; description: string };
};
