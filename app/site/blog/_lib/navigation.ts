import type { BlogCategory, CategoryId } from './types';

export const BLOG_PATH = '/site/blog';
export const SITE_URL = 'https://netbox.net.br';
export const PAGE_SIZE = 6;
export const categories: BlogCategory[] = [
  { id: 'tecnologia', label: 'Tecnologia', description: 'Ideias, novidades e dicas para entender a tecnologia que faz parte da sua vida.' },
  { id: 'filmes', label: 'Filmes', description: 'Cinema, histórias e universos para quem gosta de descobrir o que vem depois dos créditos.' },
  { id: 'series', label: 'Séries', description: 'Histórias, personagens e próximas maratonas para acompanhar episódio por episódio.' },
  { id: 'hqs', label: 'HQs', description: 'Quadrinhos, super-heróis e novos universos para explorar a cada página.' },
  { id: 'games', label: 'Jogos', description: 'O universo dos games, suas histórias e dicas para aproveitar a próxima partida.' },
  { id: 'entretenimento', label: 'Entretenimento', description: 'Cultura pop, streaming e descobertas para deixar o seu tempo livre mais interessante.' },
];

/** Earlier category links remain usable after the editorial focus changes. */
const legacyCategories: Record<string, CategoryId> = {
  'internet-e-wifi': 'tecnologia',
  'filmes-e-series': 'filmes',
  'streaming': 'entretenimento',
  'dicas-e-tutoriais': 'tecnologia',
  'novidades-netbox': 'tecnologia',
};
export function resolveCategory(id: string): CategoryId | undefined {
  return categories.find(category => category.id === id)?.id ?? legacyCategories[id];
}

export const editorialGroups = [
  { id: 'tecnologia-internet', title: 'Tecnologia e inovação', ids: ['tecnologia'] },
  { id: 'entretenimento', title: 'Filmes, séries e entretenimento', ids: ['filmes', 'series', 'entretenimento'] },
  { id: 'universo-nerd', title: 'Universo nerd: HQs e jogos', ids: ['hqs', 'games'] },
];

/** A single URL builder preserves search/category state across pagination and navigation. */
export function blogHref(category = '', query = '', page = 1, group = '', order = 'recentes') {
  const params = new URLSearchParams();
  if (group) params.set('grupo', group);
  if (category) params.set('categoria', category);
  if (query) params.set('q', query);
  if (order !== 'recentes') params.set('ordem', order);
  if (page > 1) params.set('pagina', String(page));
  return BLOG_PATH + (params.size ? '?' + params.toString() : '');
}
