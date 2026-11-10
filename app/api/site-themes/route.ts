/** Read-only same-origin proxy; the browser never receives backend credentials. */
export async function GET() {
  const base = process.env.BLOG_API_URL?.replace(/\/$/, '');
  if (!base) return Response.json({ error: 'Temas não configurados.' }, { status: 503 });
  try {
    const response = await fetch(base + '/site/themes', { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Theme API unavailable');
    return Response.json(await response.json(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Temas temporariamente indisponíveis.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
