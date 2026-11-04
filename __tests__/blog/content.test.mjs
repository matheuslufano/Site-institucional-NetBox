import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Compile the real pure modules to an isolated temporary directory, without a runtime dependency.
const temp = await mkdtemp(join(tmpdir(), 'netbox-blog-tests-'));
after(() => rm(temp, { recursive: true, force: true }));
for (const path of ['types/blog.ts', 'lib/blog/richDocument.ts', 'lib/blog/preview.ts', 'lib/blog/navigation.ts', 'content/blog/cinema.ts', 'content/blog/articles.ts', 'content/blog/editorial/index.ts', 'lib/blog/catalog.ts', 'lib/blog/repository.ts', 'lib/blog/trailers.ts', 'lib/blog/media.ts', 'app/sitemap.ts']) {
  const source = await readFile(new URL('../../' + path, import.meta.url), 'utf8');
  let output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
    .replace(/(from\s+['"])(@\/[^'"]+|\.[^'"]+)(['"])/g, (_, before, specifier, after) => {
      const resolved = specifier.startsWith('@/')
        ? './' + relative(dirname(path), specifier.slice(2)).replaceAll('\\', '/')
        : specifier;
      return before + resolved + '.mjs' + after;
    });
  output = output.replace(/ with \{ type: ['\"]json['\"] \}/g, '');
  const target = join(temp, path.replace(/\.ts$/, '.mjs'));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output);
}
const cinemaSeed = JSON.parse(await readFile(new URL('../../content/blog/cinema.json', import.meta.url), 'utf8'));
await writeFile(join(temp, 'content/blog/cinema.json.mjs'), 'export default ' + JSON.stringify(cinemaSeed));
const spotlights = JSON.parse(await readFile(new URL('../../content/blog/spotlights.json', import.meta.url), 'utf8'));
const editorialSeeds = JSON.parse(await readFile(new URL('../../content/blog/editorial/articles.json', import.meta.url), 'utf8'));
await writeFile(join(temp, 'content/blog/spotlights.json.mjs'), 'export default ' + JSON.stringify(spotlights));
await writeFile(join(temp, 'content/blog/editorial/articles.json.mjs'), 'export default ' + JSON.stringify(editorialSeeds));
const blog = await import(pathToFileURL(join(temp, 'lib/blog/catalog.mjs')));
const { articles } = await import(pathToFileURL(join(temp, 'content/blog/articles.mjs')));
const { trailerEmbedUrl } = await import(pathToFileURL(join(temp, 'lib/blog/trailers.mjs')));
const { default: sitemap } = await import(pathToFileURL(join(temp, 'app/sitemap.mjs')));
const { previewArticle } = await import(pathToFileURL(join(temp, 'lib/blog/preview.mjs')));

test('unsaved preview handles empty dates, media layout and unsafe message content', () => {
  const input = { title: '', content: [{ document: [{ type: 'image', src: '/blog/image.webp', alt: 'Capa', width: 50, align: 'right' }, { type: 'html', content: [] }, { type: 'paragraph', content: [{ text: '<script>texto</script>', href: 'javascript:alert(1)' }] }] }], publishedAt: '', updatedAt: 'bad', cover: 'javascript:alert(1)' };
  const next = previewArticle(input);
  assert.equal(next.title, 'Sem título');
  assert.equal(next.cover, '');
  assert.match(next.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(next.content[0].document.length, 2);
  assert.equal(next.content[0].document[0].width, 50);
  assert.equal(next.content[0].document[0].align, 'right');
  assert.equal(next.content[0].document[1].content[0].href, '');
  assert.equal(next.content[0].document[1].content[0].text, '<script>texto</script>');
  assert.equal(previewArticle({ title: 'Inválido', content: 'texto' }), null);
});

test('content has unique routes, readable categories, local covers and coherent dates', async () => {
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  assert.equal(new Set(articles.map(a => a.id)).size, articles.length);
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(blog.categoryLabel(article.category).trim(), "Archived categories must remain readable");
    assert.ok(article.summary && article.coverAlt && article.author && article.seo.description);
    assert.ok(article.content.length > 0);
    assert.ok(article.content.every(section => section.heading && section.paragraphs.length && section.paragraphs.every(text => text.trim())));
    assert.ok(article.updatedAt >= article.publishedAt);
    for (const width of [480, 800, 1200]) {
      await readFile(new URL('../../public' + article.cover.replace('-1200.webp', '-' + width + '.webp'), import.meta.url));
    }
  }
});
test('search handles accents, title, summary, category, combined filters and empty results', () => {
  assert.ok(blog.filterArticles('optica', '').some(a => a.slug === 'como-funciona-a-fibra-optica'));
  assert.ok(blog.filterArticles('lugar do roteador', '').some(a => a.slug === 'como-melhorar-o-sinal-wifi'));
  assert.equal(blog.filterArticles('ENTRETENIMENTO', '')[0].category, 'entretenimento');
  assert.equal(blog.filterArticles('wifi', 'games').length, 0);
  assert.equal(blog.filterArticles('zzzzzz', '').length, 0);
  assert.equal(blog.filterArticles('', 'games').length, 6);
});
test('demo, draft, scheduled and approved statuses obey visibility and sitemap rules', async () => {
  assert.equal(blog.indexableArticles().length, 0);
  assert.ok((await sitemap()).some(item => item.url.endsWith('/site/blog')));
  assert.ok(!(await sitemap()).some(item => item.url.includes('/site/blog/')));
  const article = articles[0];
  const original = { ...article };
  try {
    article.status = 'draft';
    assert.equal(blog.findArticle(article.slug), undefined);
    article.status = 'published';
    article.publishedAt = '2099-01-01';
    assert.ok(!blog.visibleArticles(new Date('2026-10-28')).includes(article));
    article.publishedAt = original.publishedAt;
    assert.ok((await sitemap()).some(item => item.url.endsWith('/' + article.slug)));
  } finally { Object.assign(article, original); }
});
test('pagination links preserve encoded state and structured data escapes HTML', () => {
  const url = new URL(blog.blogHref('games', 'ação & conexão', 2, 'entretenimento'), 'https://netbox.net.br');
  assert.equal(url.searchParams.get('q'), 'ação & conexão');
  assert.equal(url.searchParams.get('pagina'), '2');
  assert.equal(url.searchParams.get('categoria'), 'games');
  assert.equal(url.searchParams.get('grupo'), 'entretenimento');
  assert.equal(new URL(blog.blogHref('filmes', 'Animação', 2, '', 'destaques'), 'https://netbox.net.br').searchParams.get('ordem'), 'destaques');
  assert.ok(!blog.serializeJsonLd({ title: '</script>' }).includes('<'));
});

test('editorial categories include nerd/pop topics and preserve older category URLs', () => {
  for (const category of ['tecnologia', 'filmes', 'series', 'hqs', 'games', 'entretenimento']) {
    assert.ok(blog.filterArticles('', category).length > 0, category);
  }
  assert.equal(blog.resolveCategory('internet-e-wifi'), 'tecnologia');
  assert.equal(blog.resolveCategory('filmes-e-series'), 'filmes');
  assert.equal(blog.resolveCategory('streaming'), 'entretenimento');
  assert.equal(blog.resolveCategory('novidades-netbox'), 'tecnologia');
  assert.equal(blog.resolveCategory('inexistente'), undefined);
});

test('cinema copy, genre and image associations preserve all ten supplied stories', () => {
  assert.equal(cinemaSeed.length, 10);
  for (const story of cinemaSeed) {
    const article = articles.find(item => item.slug === story.slug);
    assert.ok(article, story.slug);
    assert.equal(article.title, story.title);
    assert.equal(article.topic, story.topic);
    assert.equal(article.category, 'filmes');
    assert.equal([article.summary, ...article.content.flatMap(section => section.paragraphs)].join(' '), story.text);
    assert.equal(article.cover, '/blog/' + story.slug + '-1200.webp');
    assert.equal(article.status, 'demo');
  }
  assert.deepEqual(blog.filterArticles('', 'filmes').slice(0, 10).map(article => article.slug), cinemaSeed.map(story => story.slug));
  assert.ok(blog.filterArticles('Ficção científica', 'filmes').some(article => article.slug === 'devoradores-de-estrelas'));
});


test('cinema spotlights have local posters and verified trailer destinations without changing article copy', async () => {
  assert.equal(spotlights.length, cinemaSeed.length);
  for (const media of spotlights) {
    const article = articles.find(item => item.slug === media.slug);
    assert.ok(article?.spotlight, media.slug);
    assert.deepEqual(article.spotlight, { title: media.title, poster: media.poster, trailerUrl: media.trailerUrl });
    assert.ok(media.title && media.posterSource && media.posterImageSource);
    assert.ok(media.poster.startsWith('/blog/posters/'));
    await readFile(new URL('../../public' + media.poster, import.meta.url));
    const trailer = new URL(media.trailerUrl);
    assert.equal(trailer.protocol, 'https:');
    assert.ok(['www.youtube.com', 'video.disney.com'].includes(trailer.hostname));
  }
  assert.equal(blog.categoryLabel('entretenimento'), 'Entretenimento');
});


test('inline trailers use recognized video IDs and only trusted privacy-enhanced embed URLs', () => {
  for (const media of spotlights) {
    const embed = new URL(trailerEmbedUrl(media.trailerUrl, 'https://netbox.net.br/site/blog'));
    assert.equal(embed.origin, 'https://www.youtube-nocookie.com');
    assert.match(embed.pathname, /^\/embed\/[A-Za-z0-9_-]{11}$/);
    assert.equal(embed.searchParams.get('autoplay'), '1');
    assert.equal(embed.searchParams.get('playsinline'), '1');
    assert.equal(embed.searchParams.get('origin'), 'https://netbox.net.br');
  }
  assert.ok(trailerEmbedUrl('https://youtu.be/8TZMtslA3UY'));
  for (const invalid of ['javascript:alert(1)', 'https://evil.example/watch?v=8TZMtslA3UY', 'http://www.youtube.com/watch?v=8TZMtslA3UY', 'https://www.youtube.com.evil.example/watch?v=8TZMtslA3UY', 'https://www.youtube.com/watch?v=bad', 'invalid']) {
    assert.equal(trailerEmbedUrl(invalid), null);
  }
});


test('editorial seed has five new Series, HQs and Games articles with complete local image variants and source records', async () => {
  assert.equal(editorialSeeds.length, 15);
  for (const category of ['series', 'hqs', 'games']) {
    assert.equal(editorialSeeds.filter(article => article.category === category).length, 5);
    assert.equal(blog.filterArticles('', category).length, 6, 'includes the existing guide');
  }
  assert.equal(blog.filterArticles('', 'tecnologia').length, 5);
  assert.equal(blog.filterArticles('', 'filmes').length, 11, 'ten provided cinema stories plus the existing guide');
  for (const article of editorialSeeds) {
    const stored = articles.find(item => item.slug === article.slug);
    assert.ok(stored && stored.status === 'demo');
    assert.ok(stored.sources?.length >= 2);
    assert.ok(article.sourcePage && article.publisher && article.coverAlt && article.seo.title && article.seo.description);
    assert.match(article.coverSource, /^https:\/\//);
    for (const width of [480, 800, 1200]) {
      await readFile(new URL('../../public/blog/editorial/' + article.slug + '-' + width + '.webp', import.meta.url));
    }
    await readFile(new URL('../../public/blog/editorial/posters/' + article.slug + '.webp', import.meta.url));
  }
  assert.equal(blog.indexableArticles().length, 0, 'demonstrative content remains out of indexable routes');
});

test('every visible article has source documentation and usable source URLs', () => {
  for (const article of articles) {
    assert.ok(article.sources?.length, article.slug);
    for (const source of article.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assert.ok(source.title && source.publisher);
    }
  }
});




test('media API keeps credentials server-side and handles missing configuration, failures and real records', async () => {
  const { getTrendingMedia, getMediaDetail, normalizeMedia, mediaHref } = await import(pathToFileURL(join(temp, 'lib/blog/media.mjs')));
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.TMDB_READ_ACCESS_TOKEN;
  try {
    delete process.env.TMDB_READ_ACCESS_TOKEN;
    globalThis.fetch = async () => { throw new Error('Fetch must not run without a token'); };
    assert.equal((await getTrendingMedia('movie')).status, 'unconfigured');
    assert.equal((await getMediaDetail('movie', '../12')).status, 'missing');
    process.env.TMDB_READ_ACCESS_TOKEN = 'test-only-token';
    globalThis.fetch = async (url, options) => {
      assert.ok(url.startsWith('https://api.themoviedb.org/3/'));
      assert.ok(url.includes('language=pt-BR'));
      assert.ok(!url.includes('test-only-token'));
      assert.equal(options.headers.Authorization, 'Bearer test-only-token');
      return new Response(JSON.stringify({ results: [{ id: 7, title: 'Fixture movie', overview: '<script>plain text</script>', poster_path: '/cover.jpg', vote_count: 20, vote_average: 8.1, release_date: '2026-01-01' }, { id: 8, title: 'Excluded', adult: true }, { title: 'Invalid' }] }));
    };
    const result = await getTrendingMedia('movie');
    assert.equal(result.status, 'ready');
    assert.equal(result.data.length, 1);
    assert.equal(result.data[0].poster, 'https://image.tmdb.org/t/p/w500/cover.jpg');
    assert.equal(mediaHref(result.data[0]), '/site/blog/obras/movie/7');
    assert.equal(normalizeMedia({ id: 9, name: 'Fixture series', poster_path: '//evil.test/x', vote_count: 0 }, 'tv').poster, undefined);
    assert.equal(normalizeMedia({ id: 9, name: 'Fixture series', vote_count: 0 }, 'tv').rating, null);
    globalThis.fetch = async () => new Response('', { status: 404 });
    assert.equal((await getMediaDetail('tv', '9')).status, 'missing');
    globalThis.fetch = async () => new Response('', { status: 429 });
    assert.equal((await getTrendingMedia('tv')).status, 'unavailable');
    globalThis.fetch = async () => { throw new Error('network'); };
    assert.equal((await getTrendingMedia('tv')).status, 'unavailable');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.TMDB_READ_ACCESS_TOKEN;
    else process.env.TMDB_READ_ACCESS_TOKEN = originalToken;
  }
});

test('work media prioritizes trailers and rejects unsafe video keys and image paths', async () => {
  const { normalizeMedia } = await import(pathToFileURL(join(temp, 'lib/blog/media.mjs')));
  const work = normalizeMedia({ id: 42, title: 'Media fixture', videos: { results: [
    { site: 'YouTube', key: 'abcdefghijk', name: 'Interview', type: 'Featurette' },
    { site: 'YouTube', key: '12345678901', name: 'Official trailer', type: 'Trailer' },
    { site: 'YouTube', key: '../unsafe', name: 'Invalid' },
    { site: 'Other', key: '12345678901', name: 'Unsupported' },
  ] }, images: { backdrops: [{ file_path: '/scene.jpg' }, { file_path: '//unsafe.test/x' }] } }, 'movie');
  assert.equal(work.videos.length, 2);
  assert.equal(work.videos[0].name, 'Official trailer');
  assert.deepEqual(work.photos, ['https://image.tmdb.org/t/p/w1280/scene.jpg']);
});

test('Portuguese media search encodes titles, paginates and excludes people and adult records', async () => {
  const { getMediaPage } = await import(pathToFileURL(join(temp, 'lib/blog/media.mjs')));
  const previousFetch = globalThis.fetch;
  const previousToken = process.env.TMDB_READ_ACCESS_TOKEN;
  try {
    process.env.TMDB_READ_ACCESS_TOKEN = 'test-only-token';
    globalThis.fetch = async (input) => {
      const url = new URL(input);
      assert.equal(url.pathname, '/3/search/multi');
      assert.equal(url.searchParams.get('query'), 'Ação & aventura');
      assert.equal(url.searchParams.get('language'), 'pt-BR');
      assert.equal(url.searchParams.get('page'), '2');
      assert.equal(url.searchParams.get('include_adult'), 'false');
      return Response.json({ total_pages: 7, results: [
        { id: 1, media_type: 'movie', title: 'Filme de teste' },
        { id: 2, media_type: 'tv', name: 'Série de teste' },
        { id: 3, media_type: 'person', name: 'Pessoa' },
        { id: 4, media_type: 'movie', title: 'Adulto', adult: true },
      ] });
    };
    const result = await getMediaPage('all', 'Ação & aventura', 2);
    assert.equal(result.status, 'ready');
    assert.equal(result.data.page, 2);
    assert.equal(result.data.totalPages, 7);
    assert.deepEqual(result.data.works.map(work => work.kind), ['movie', 'tv']);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.TMDB_READ_ACCESS_TOKEN;
    else process.env.TMDB_READ_ACCESS_TOKEN = previousToken;
  }
});

test('remote media fill retains absolute full-size geometry in the actual Vinext image renderer', async () => {
  const source = await readFile(new URL('../../components/blog/media/MediaImage.tsx', import.meta.url), 'utf8');
  const shim = new URL('../../node_modules/vinext/dist/shims/image.js', import.meta.url).href;
  let output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  output = output.replace(/from ['"]next\/image['"]/, 'from ' + JSON.stringify(shim))
    .replace(/from ['"]react\/jsx-runtime['"]/, 'from ' + JSON.stringify(import.meta.resolve('react/jsx-runtime')));
  const { MediaImage } = await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const html = renderToStaticMarkup(createElement(MediaImage, { src: 'https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg', alt: 'Video preview', fill: true, style: { objectFit: 'contain' } }));
  assert.match(html, /position:absolute/);
  assert.match(html, /width:100%/);
  assert.match(html, /height:100%/);
  assert.match(html, /object-fit:contain/);
  assert.doesNotMatch(html, /max-width:480px/);
});
