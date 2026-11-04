import { getMediaPage } from '@/lib/blog/media';

/** Same-origin proxy: provider credentials never reach the browser. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const kind = params.get('kind') ?? 'all';
  const page = Number(params.get('page') ?? 1);
  if (!['movie', 'tv', 'all'].includes(kind) || !Number.isInteger(page) || page < 1 || page > 500) {
    return Response.json({ status: 'invalid', message: 'Parâmetros de busca inválidos.' }, { status: 400 });
  }
  const result = await getMediaPage(kind as 'movie' | 'tv' | 'all', params.get('q') ?? '', page);
  return Response.json(result, { status: result.status === 'ready' ? 200 : 503 });
}
