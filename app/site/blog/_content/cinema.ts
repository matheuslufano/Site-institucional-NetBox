import cinema from './cinema.json';
import type { BlogArticle } from '../_lib/types';

/** Preserve the supplied copy, using its first sentence as the card excerpt and the rest as the article body. */
export const cinemaArticles: BlogArticle[] = cinema.map((story, index) => {
  const sentenceEnd = story.text.indexOf('. ') + 1;
  const summary = story.text.slice(0, sentenceEnd);
  const body = story.text.slice(sentenceEnd).trim();

  return {
    id: story.slug,
    slug: story.slug,
    title: story.title,
    summary,
    topic: story.topic,
    category: 'filmes',
    cover: '/blog/' + story.slug + '-1200.webp',
    coverAlt: story.coverAlt,
    coverCredit: 'Imagem enviada para o Blog Netbox',
    author: 'Equipe editorial Netbox',
    publishedAt: '2026-10-29',
    updatedAt: '2026-10-29',
    status: 'demo',
    featured: index < 4,
    content: [{ heading: story.topic, paragraphs: [body] }],
    seo: { title: story.title + ' | Blog Netbox', description: summary },
  };
});
