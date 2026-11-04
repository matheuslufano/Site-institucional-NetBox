/** Server-side TMDB adapter. Never import this module into a client component. */
export type MediaKind = 'movie' | 'tv';
export type MediaWork = {
  id: number; kind: MediaKind; title: string; overview: string; poster?: string;
  backdrop?: string; year: string; rating: number | null; votes: number;
  genres: string[]; runtime?: number; seasons?: number; episodes?: number;
  cast: string[];
  originalTitle: string; popularity?: number; directors: string[];
  videos: { key: string; name: string }[]; photos: string[];
  providers: { name: string; logo?: string }[]; watchUrl?: string;
};
export type MediaResult<T> = { status: 'ready'; data: T } | { status: 'unconfigured' | 'unavailable' | 'missing' };
export type MediaPage = { works: MediaWork[]; page: number; totalPages: number };

/** Portuguese title search and paginated trends share the same safe server-side transport. */
export async function getMediaPage(kind: MediaKind | 'all', query = '', page = 1): Promise<MediaResult<MediaPage>> {
  const safePage = Math.max(1, Math.min(500, Math.floor(page) || 1));
  const term = query.trim().slice(0, 160);
  const endpoint = term ? `search/${kind === 'all' ? 'multi' : kind}` : `trending/${kind === 'all' ? 'all' : kind}/week`;
  const params = new URLSearchParams({ language: 'pt-BR', include_adult: 'false', page: String(safePage) });
  if (term) params.set('query', term);
  const result = await request(`${endpoint}?${params}`);
  if (result.status !== 'ready') return result;
  const data = record(result.data);
  if (!Array.isArray(data.results)) return { status: 'unavailable' };
  const works = data.results.flatMap(item => {
    const mediaKind = kind === 'all' ? record(item).media_type : kind;
    if (mediaKind !== 'movie' && mediaKind !== 'tv') return [];
    const work = normalizeMedia(item, mediaKind);
    return work ? [work] : [];
  });
  return { status: 'ready', data: { works, page: safePage, totalPages: Math.min(500, Math.max(0, number(data.total_pages) ?? 0)) } };
}
type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue => value && typeof value === 'object' ? value as RecordValue : {};
const text = (value: unknown) => typeof value === 'string' ? value : '';
const number = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : undefined;
const image = (value: unknown, size: string) => /^\/[a-zA-Z0-9._-]+$/.test(text(value)) ? `https://image.tmdb.org/t/p/${size}${value}` : undefined;
export const mediaHref = (work: Pick<MediaWork, 'kind' | 'id'>) => `/site/blog/obras/${work.kind}/${work.id}`;

/** Reject malformed records and preserve unknown ratings rather than inventing values. */
export function normalizeMedia(value: unknown, kind: MediaKind): MediaWork | undefined {
  const data = record(value);
  const id = number(data.id);
  const title = text(kind === 'movie' ? data.title : data.name);
  if (!id || !Number.isSafeInteger(id) || id < 1 || !title || data.adult === true) return undefined;
  const credits = record(data.credits);
  const votes = number(data.vote_count) ?? 0;
  const videos = record(data.videos).results;
  const photos = record(data.images).backdrops;
  const region = record(record(record(data['watch/providers']).results).BR);
  const crew = Array.isArray(credits.crew) ? credits.crew : [];
  const creators = Array.isArray(data.created_by) ? data.created_by : [];
  return {
    id, kind, title, overview: text(data.overview), poster: image(data.poster_path, 'w500'),
    backdrop: image(data.backdrop_path, 'w1280'),
    year: text(kind === 'movie' ? data.release_date : data.first_air_date).slice(0, 4),
    rating: votes > 0 ? number(data.vote_average) ?? null : null, votes,
    genres: Array.isArray(data.genres) ? data.genres.map(item => text(record(item).name)).filter(Boolean) : [],
    runtime: number(data.runtime), seasons: number(data.number_of_seasons), episodes: number(data.number_of_episodes),
    cast: Array.isArray(credits.cast) ? credits.cast.slice(0, 8).map(item => text(record(item).name)).filter(Boolean) : [],
    originalTitle: text(kind === 'movie' ? data.original_title : data.original_name), popularity: number(data.popularity),
    directors: [...new Set((kind === 'movie' ? crew.filter(item => record(item).job === 'Director') : creators).map(item => text(record(item).name)).filter(Boolean))],
    videos: Array.isArray(videos) ? videos.filter(item => record(item).site === 'YouTube' && /^[\w-]{11}$/.test(text(record(item).key))).sort((a, b) => Number(record(b).type === 'Trailer') - Number(record(a).type === 'Trailer')).map(item => ({ key: text(record(item).key), name: text(record(item).name) })) : [],
    photos: Array.isArray(photos) ? photos.map(item => image(record(item).file_path, 'w1280')).filter((url): url is string => Boolean(url)).slice(0, 24) : [],
    providers: Array.isArray(region.flatrate) ? region.flatrate.map(item => ({ name: text(record(item).provider_name), logo: image(record(item).logo_path, 'w185') })).filter(item => item.name) : [],
    watchUrl: /^https:\/\/www\.themoviedb\.org\//.test(text(region.link)) ? text(region.link) : undefined,
  };
}

async function request(path: string): Promise<MediaResult<unknown>> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN?.trim();
  if (!token) return { status: 'unconfigured' };
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000),
    });
    if (response.status === 404) return { status: 'missing' };
    if (!response.ok) return { status: 'unavailable' };
    return { status: 'ready', data: await response.json() };
  } catch { return { status: 'unavailable' }; }
}

export async function getTrendingMedia(kind: MediaKind): Promise<MediaResult<MediaWork[]>> {
  const result = await request(`trending/${kind}/week?language=pt-BR`);
  if (result.status !== 'ready') return result;
  const results = record(result.data).results;
  if (!Array.isArray(results)) return { status: 'unavailable' };
  const works = results.map(item => normalizeMedia(item, kind)).filter((item): item is MediaWork => Boolean(item));
  return { status: 'ready', data: works.slice(0, 10) };
}

export async function getMediaDetail(kind: MediaKind, id: string): Promise<MediaResult<MediaWork>> {
  if (!/^[1-9]\d{0,9}$/.test(id)) return { status: 'missing' };
  const result = await request(`${kind}/${id}?language=pt-BR&append_to_response=credits,videos,images,watch/providers&include_image_language=pt,en,null`);
  if (result.status !== 'ready') return result;
  const work = normalizeMedia(result.data, kind);
  // Some works have only original-language videos; do not leave an existing trailer undiscoverable.
  if (work && !work.videos.length) {
    const fallback = await request(`${kind}/${id}/videos?language=en-US`);
    if (fallback.status === 'ready') work.videos = normalizeMedia({ ...record(result.data), videos: fallback.data }, kind)?.videos ?? [];
  }
  return work ? { status: 'ready', data: work } : { status: 'missing' };
}
