import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Compile the real pure modules to an isolated temporary directory, without a runtime dependency.
const temp = await mkdtemp(join(tmpdir(), 'netbox-blog-tests-'));
after(() => rm(temp, { recursive: true, force: true }));
for (const path of ['app/site/blog/_lib/types.ts', 'app/site/blog/_lib/navigation.ts', 'app/site/blog/_content/cinema.ts', 'app/site/blog/_content/articles.ts', 'app/site/blog/_lib/blog.ts', 'app/sitemap.ts']) {
  const source = await readFile(new URL('../' + path, import.meta.url), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
    .replace(/(from\s+['"])(\.[^'"]+)(['"])/g, '$1$2.mjs$3');
  const target = join(temp, path.replace(/\.ts$/, '.mjs'));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output);
}
const cinemaSeed = JSON.parse(await readFile(new URL('../app/site/blog/_content/cinema.json', import.meta.url), 'utf8'));
await writeFile(join(temp, 'app/site/blog/_content/cinema.json.mjs'), 'export default ' + JSON.stringify(cinemaSeed));
const blog = await import(pathToFileURL(join(temp, 'app/site/blog/_lib/blog.mjs')));
const { articles } = await import(pathToFileURL(join(temp, 'app/site/blog/_content/articles.mjs')));
const { default: sitemap } = await import(pathToFileURL(join(temp, 'app/sitemap.mjs')));

test('content has unique routes, valid categories, local covers and coherent dates', async () => {
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  assert.equal(new Set(articles.map(a => a.id)).size, articles.length);
  for (const article of articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(blog.categories.some(c => c.id === article.category));
    assert.ok(article.summary && article.coverAlt && article.author && article.seo.description);
    assert.ok(article.content.length > 0);
    assert.ok(article.content.every(section => section.heading && section.paragraphs.length && section.paragraphs.every(text => text.trim())));
    assert.ok(article.updatedAt >= article.publishedAt);
    for (const width of [480, 800, 1200]) {
      await readFile(new URL('../public' + article.cover.replace('-1200.webp', '-' + width + '.webp'), import.meta.url));
    }
  }
});
test('search handles accents, title, summary, category, combined filters and empty results', () => {
  assert.ok(blog.filterArticles('optica', '').some(a => a.slug === 'como-funciona-a-fibra-optica'));
  assert.ok(blog.filterArticles('lugar do roteador', '').some(a => a.slug === 'como-melhorar-o-sinal-wifi'));
  assert.equal(blog.filterArticles('ENTRETENIMENTO', '')[0].category, 'entretenimento');
  assert.equal(blog.filterArticles('wifi', 'games').length, 0);
  assert.equal(blog.filterArticles('zzzzzz', '').length, 0);
  assert.equal(blog.filterArticles('', 'games').length, 1);
});
test('demo, draft, scheduled and approved statuses obey visibility and sitemap rules', () => {
  assert.equal(blog.indexableArticles().length, 0);
  assert.ok(sitemap().some(item => item.url.endsWith('/site/blog')));
  assert.ok(!sitemap().some(item => item.url.includes('/site/blog/')));
  const article = articles[0];
  const original = { ...article };
  try {
    article.status = 'draft';
    assert.equal(blog.findArticle(article.slug), undefined);
    article.status = 'published';
    article.publishedAt = '2099-01-01';
    assert.ok(!blog.visibleArticles(new Date('2026-10-28')).includes(article));
    article.publishedAt = original.publishedAt;
    assert.ok(sitemap().some(item => item.url.endsWith('/' + article.slug)));
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
  assert.deepEqual(blog.visibleArticles().slice(0, 10).map(article => article.slug), cinemaSeed.map(story => story.slug));
  assert.ok(blog.filterArticles('Ficção científica', 'filmes').some(article => article.slug === 'devoradores-de-estrelas'));
});
