import assert from 'node:assert/strict';
import { test } from 'node:test';

// Start a local development/production server before running npm run test:routes.
const base = process.env.SITE_TEST_URL ?? 'http://localhost:3017';
for (const path of ['/', '/site', '/sobre', '/nossos-servicos', '/nossa-estrutura', '/contatos', '/central-do-cliente', '/em-desenvolvimento', '/site/blog', '/site/blog?categoria=filmes']) {
  test('renders ' + path, async () => {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<html[^>]*lang="pt-BR"/);
    assert.match(html, /<h1[ >]/);
    if (path.startsWith('/site/blog')) {
      assert.match(html, /data-ui="netbox-blog"/);
      assert.doesNotMatch(html, /class="model-header/);
    } else if (path !== '/' && path !== '/em-desenvolvimento') {
      assert.match(html, /model-header/);
      assert.match(html, /\/site\/blog/);
    }
  });
}
