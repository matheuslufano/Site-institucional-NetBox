import spotlights from "./spotlights.json";
import type { BlogArticle } from '@/types/blog';
import cinema from './cinema.json';

/** Preserve the supplied copy, using its first sentence as the card excerpt and the rest as the article body. */
export const cinemaArticles: BlogArticle[] = cinema.map((story, index) => {
  const sentenceEnd = story.text.indexOf('. ') + 1;
  const summary = story.text.slice(0, sentenceEnd);
  const body = story.text.slice(sentenceEnd).trim();

  const media = spotlights.find(item => item.slug === story.slug);

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
    spotlight: media ? { title: media.title, poster: media.poster, trailerUrl: media.trailerUrl } : undefined,
    author: 'Equipe editorial Netbox',
    publishedAt: '2026-10-29',
    updatedAt: '2026-10-29',
    status: 'demo',
    featured: index < 4,
    content: [{ heading: story.topic, paragraphs: [body] }],
    seo: { title: story.title + ' | Blog Netbox', description: summary },
  };
});
