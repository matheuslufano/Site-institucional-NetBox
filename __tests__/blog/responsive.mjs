import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const playwright = await import(process.env.BLOG_PLAYWRIGHT_PATH
  ? pathToFileURL(process.env.BLOG_PLAYWRIGHT_PATH).href
  : 'playwright');
const base = process.env.BLOG_TEST_URL ?? 'http://localhost:3002';
const output = process.env.BLOG_SCREENSHOT_DIR ?? 'outputs/blog-mobile-review';
const widths = [320, 360, 375, 390, 393, 414, 430, 480, 600, 768, 820, 1024, 1280, 1440];
const sizes = [
  ...widths.map(width => ({ width, height: width < 768 ? 844 : 900 })),
  { width: 667, height: 375 },
  { width: 844, height: 390 },
];
const browser = await playwright.chromium.launch({ channel: process.env.BLOG_BROWSER_CHANNEL || 'chrome' });
await mkdir(output, { recursive: true });

try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(10000);

  async function open(path) {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    await page.locator('#blog-conteudo h1').first().waitFor({ state: 'attached' });
    await page.locator('[data-ui="blog-header"]').waitFor({ state: 'attached' });
    await page.evaluate(() => document.fonts.ready);
  }

  for (const size of process.env.BLOG_INTERACTIONS_ONLY === '1' ? [] : sizes) {
    await page.setViewportSize(size);
    for (const [name, path] of [
      ['inicio', '/site/blog'],
      ['filmes', '/site/blog?categoria=filmes'],
      ['artigo', '/site/blog/como-melhorar-o-sinal-wifi'],
    ]) {
      await open(path);
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(hasOverflow, false, `${name} com rolagem horizontal em ${size.width}×${size.height}`);
      await page.locator('#blog-mobile-shortcuts').waitFor({ state: size.width <= 640 ? 'visible' : 'attached' });
      assert.equal(await page.locator('#blog-mobile-shortcuts').isVisible(), size.width <= 640, `Barra inferior em ${name} a ${size.width}px`);
      if (size.width < 768) {
        assert.ok(await page.locator('#blog-mobile-categories').isVisible());
        const heights = await page.locator('[data-ui="blog-search-trigger"], [data-ui="blog-menu-button"]').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height));
        assert.ok(heights.every(height => height >= 44));
      }
      if (name === 'inicio' && size.width < 768) {
        assert.equal(await page.locator('[data-ui="lead-slide"]:not([inert])').count(), 1);
        assert.ok(await page.locator('[data-ui="news-timeline"] time:visible').first().isVisible());
      }
      if ([320, 390, 1440].includes(size.width) || size.width > size.height && size.width < 1000) {
        await page.screenshot({ path: `${output}/${name}-${size.width}x${size.height}.png` });
      }
    }
    console.log(`Layout validado em ${size.width}×${size.height}`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await open('/site/blog');
  await page.locator('#blog-navigation a[aria-current="page"]').waitFor({ state: 'attached' });
  await page.waitForFunction(() => typeof document.querySelector('[data-ui="blog-menu-button"]')?.onclick === 'function');
  const cookie = page.locator('#blog-privacy-notice');
  if (await cookie.isVisible()) await cookie.getByRole('button', { name: 'Somente essenciais' }).click();
  const leadHeading = page.locator('[data-ui="lead-slide"][data-active="true"] h2');
  const longTitleFits = await leadHeading.evaluate(element => {
    const original = element.textContent;
    element.textContent = 'Título excepcionalmente longo para validar a capa do Blog Netbox. '.repeat(12);
    const style = getComputedStyle(element);
    const fits = element.getBoundingClientRect().height <= parseFloat(style.lineHeight) * 3 + 1 &&
      element.scrollHeight > element.clientHeight;
    element.textContent = original;
    return fits;
  });
  assert.ok(longTitleFits);
  await page.locator('[data-ui="blog-menu-button"]').click();
  await page.locator('#blog-mobile-drawer[open]').waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), 'hidden');
  await page.screenshot({ path: `${output}/menu-390.png` });
  await page.keyboard.press('Escape');
  await page.locator('#blog-mobile-drawer[open]').waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('data-ui')), 'blog-menu-button');

  await page.locator('[data-ui="blog-search-trigger"]').click();
  const search = page.locator('#blog-search-panel[open]');
  await search.waitFor();
  assert.equal(await search.locator('#blog-search').evaluate(element => getComputedStyle(element).fontSize), '16px');
  await search.locator('#blog-search').fill('internet');
  await search.locator('#blog-article-search-suggestions a').first().waitFor();
  await page.screenshot({ path: `${output}/busca-390.png` });
  await search.locator('#blog-search-clear').click();
  assert.equal(await search.locator('#blog-search').inputValue(), '');
  await search.locator('#blog-search').fill('zzzzz-sem-correspondencia');
  await search.getByText('Nenhum título encontrado.').waitFor();
  await search.getByRole('button', { name: 'Filmes e séries' }).click();
  await search.getByRole('search', { name: 'Buscar obras' }).waitFor();
  await page.keyboard.press('Escape');
  await search.waitFor({ state: 'hidden' });

  await page.route('https://www.youtube-nocookie.com/**', route => route.abort());
  const carousel = page.locator('[data-ui="lead-carousel"]');
  const trailerSlideIndex = await carousel.locator('[data-ui="lead-slide"]').evaluateAll(slides =>
    slides.findIndex(slide => slide.querySelector('button[aria-label^="Assistir trailer"]')),
  );
  assert.ok(trailerSlideIndex >= 0, 'O catálogo local deve ter um trailer para validar');
  await carousel.locator('[data-ui="carousel-thumbnails"] button').nth(trailerSlideIndex).click();
  const trailerButton = carousel.locator('[data-active="true"]').getByRole('button', { name: /Assistir trailer/ });
  await trailerButton.click();
  const player = page.locator('#blog-mobile-trailer[open]');
  await player.waitFor();
  const bounds = await player.boundingBox();
  assert.ok(bounds.width <= 390 && bounds.height <= 844);
  await page.screenshot({ path: `${output}/trailer-390.png` });
  await player.getByRole('button', { name: 'Fechar trailer' }).click();
  await page.locator('#blog-mobile-trailer iframe').waitFor({ state: 'detached' });
  const activeLabel = await trailerButton.getAttribute('aria-label');
  await page.waitForFunction(label => document.activeElement?.getAttribute('aria-label') === label, activeLabel);
  await page.locator('#blog-load-more-news a').click();
  await page.waitForURL(url => url.searchParams.get('pagina') === '2');
  assert.ok(await page.locator('#publicacoes article').count() > 6);

  const coverSource = await page.locator('[data-ui="lead-slide"][data-active="true"] img').first().evaluate(image => image.currentSrc);
  await page.route(coverSource, route => route.abort());
  await open('/site/blog');
  await page.locator('[data-ui="lead-slide"][data-active="true"] img[src="/og.jpg"]').first().waitFor({ state: 'attached' });
  console.log('Menu, pesquisa, trailer, consentimento, paginação, título longo e falha de capa verificados.');
} finally {
  await browser.close();
}
