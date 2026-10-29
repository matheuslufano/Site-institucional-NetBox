import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const base = process.env.BLOG_TEST_URL ?? 'http://localhost:3010';
const port = process.env.BLOG_BROWSER_PORT ?? '9334';
const tab = await fetch('http://localhost:' + port + '/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let sequence = 0;
const calls = new Map();
const errors = [];
socket.onmessage = event => {
  const data = JSON.parse(event.data);
  if (data.id) { const call = calls.get(data.id); calls.delete(data.id); if (data.error) call.reject(data.error); else call.resolve(data.result); }
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
  if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') errors.push(data.params.args.map(a => a.value ?? a.description).join(' '));
};
const command = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; calls.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
const evaluate = async expression => {
  const data = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (data.exceptionDetails) throw new Error(JSON.stringify(data.exceptionDetails));
  return data.result.value;
};
const until = async expression => {
  const deadline = Date.now() + 45000;
  while (Date.now() < deadline) { if (await evaluate(expression)) return; await new Promise(resolve => setTimeout(resolve, 150)); }
  throw new Error('Timed out waiting for ' + expression);
};
const navigate = async path => {
  await command('Page.navigate', { url: base + path });
  await until("document.readyState === 'complete' && !!document.querySelector('[data-ui=netbox-blog] h1')");
  await evaluate('document.fonts.ready');
  await until("typeof document.querySelector('[data-ui=blog-search-trigger]')?.onclick === 'function'");
  const target = new URL(path, base);
  if (target.pathname === '/site/blog' && !target.searchParams.get('grupo')) {
    await until("!!document.querySelector('#blog-navigation a[aria-current=page]')");
  }
  await until("Array.from(document.querySelectorAll('[data-ui=netbox-blog] img')).filter(i=>i.loading!=='lazy').every(i=>i.complete && i.naturalWidth>0)");
};
await command('Page.enable'); await command('Runtime.enable');
await mkdir('outputs/blog-review', { recursive: true });
try {
  for (const width of [1440, 1024, 768, 375, 320]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    for (const [name, path] of [['index', '/site/blog'], ['article', '/site/blog/como-melhorar-o-sinal-wifi']]) {
      await navigate(path);
      assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Overflow at ' + width + ' ' + name);
      assert.equal(await evaluate("document.querySelectorAll('[data-ui=blog-header]').length"), 1);
      assert.equal(await evaluate("document.querySelectorAll('.model-header, .model-footer, .model-whatsapp, .client-shortcuts, .nb-featured-plans').length"), 0);
      assert.equal(await evaluate("document.querySelectorAll('[data-ui=blog-footer]').length"), 1);
      assert.ok(await evaluate("document.querySelector('[data-ui=blog-header] a[href=\"/site/blog\"]') !== null"));
      if (name === 'article') {
        assert.match(await evaluate("document.querySelector('meta[name=robots]').content"), /noindex/);
        assert.equal(await evaluate("JSON.parse(document.querySelector('[data-ui=netbox-blog] script[type=\"application/ld+json\"]').textContent)[0]['@type']"), 'BlogPosting');
      }
      const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile('outputs/blog-review/' + name + '-' + width + '.png', Buffer.from(shot.data, 'base64'));
      if (name === 'index') {
        const timeline = await evaluate(`(() => {
          const feed = document.querySelector('[data-ui=news-timeline]');
          const style = getComputedStyle(feed, '::before');
          const x = feed.getBoundingClientRect().left + parseFloat(style.left);
          return {
            content: style.content,
            width: parseFloat(style.width),
            rocket: !!feed.querySelector('[data-ui=timeline-rocket] > *'),
            aligned: Array.from(feed.querySelectorAll('time')).every(time => {
              const rect = time.getBoundingClientRect();
              return Math.abs(rect.left + rect.width / 2 - x) < 1;
            }),
          };
        })()`);
        assert.equal(timeline.rocket, true);
        assert.equal(timeline.width, 2);
        assert.equal(timeline.aligned, true, 'Date capsules must align with the continuous timeline');
        await evaluate("scrollTo(0, document.querySelector('#publicacoes').getBoundingClientRect().top + scrollY - 30)");
        const timelineShot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        await writeFile('outputs/blog-review/timeline-' + width + '.png', Buffer.from(timelineShot.data, 'base64'));
      }

    }
    await navigate('/site/blog?categoria=tecnologia');
    assert.equal(await evaluate("document.querySelector('h1').textContent"), 'Tecnologia');
    assert.equal(await evaluate("document.querySelectorAll('[data-ui=category-feature]').length"), 3);
    assert.equal(await evaluate("document.querySelectorAll('#publicacoes article').length"), 5);
    assert.ok(await evaluate("Array.from(document.querySelectorAll('#publicacoes article a')).map(a=>a.href).length === new Set(Array.from(document.querySelectorAll('#publicacoes article a')).map(a=>a.href)).size"), 'Lead should not repeat in the category feed');
    assert.ok(await evaluate("document.documentElement.scrollWidth <= innerWidth"));
    assert.equal(await evaluate("document.querySelectorAll('[data-ui=blog-category] aside').length"),0);
    const categoryShot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile('outputs/blog-review/category-' + width + '.png', Buffer.from(categoryShot.data, 'base64'));
    assert.ok(await evaluate("(() => { const brand = document.querySelector('[data-ui=blog-header] a').getBoundingClientRect(); const trigger = document.querySelector('[data-ui=blog-search-trigger]').getBoundingClientRect(); return Math.abs(brand.top + brand.height / 2 - trigger.top - trigger.height / 2) < 1; })()"), 'Brand and magnifier should share one header row');
    assert.equal(await evaluate("document.querySelectorAll('form[role=search]').length"), 1, 'Search should have no fixed duplicates');
    assert.equal(await evaluate("document.querySelector('#blog-search-panel').open"), false);
    await until("document.querySelector('#blog-navigation a[aria-current=page]')?.textContent.trim() === 'Tecnologia'");
    await evaluate("document.querySelector('[data-ui=blog-search-trigger]').focus(); document.querySelector('[data-ui=blog-search-trigger]').click()");
    await until("document.querySelector('#blog-search-panel').open && document.activeElement.id === 'blog-search' && Math.abs(document.querySelector('#blog-search-panel').getBoundingClientRect().right - innerWidth) < 1");
    assert.equal(await evaluate("document.querySelector('#blog-search-title').textContent"), 'Encontre sua próxima leitura');
    assert.equal(await evaluate("document.documentElement.style.overflow"), 'hidden');
    const searchPanelShot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile('outputs/blog-review/search-panel-' + width + '.png', Buffer.from(searchPanelShot.data, 'base64'));
    await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await until("!document.querySelector('#blog-search-panel').open && document.activeElement === document.querySelector('[data-ui=blog-search-trigger]')");
    await navigate('/site/blog');
    await until("typeof document.querySelector('[data-ui=lead-carousel] button')?.onclick === 'function'");
    const cinema = JSON.parse(await readFile('app/site/blog/_content/cinema.json', 'utf8'));
    assert.equal(await evaluate("document.querySelectorAll('[data-ui=lead-slide]').length"), 10);
    await command('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    const carouselHeight = await evaluate("document.querySelector('[data-ui=lead-carousel]').getBoundingClientRect().height");
    for (let index = 0; index < cinema.length; index++) {
      await evaluate("document.querySelector('[data-ui=lead-carousel] button[aria-label^=\"Mostrar notícia " + (index + 1) + ":\"]').click()");
      await until("document.querySelector('[data-ui=lead-carousel]').dataset.activeSlide === '" + (index + 1) + "'");
      assert.equal(await evaluate("document.querySelector('[data-ui=lead-slide][data-active=true] h2').textContent"), cinema[index].title);
      assert.ok(await evaluate("document.querySelector('[data-ui=lead-slide][data-active=true] a').getAttribute('href').endsWith('/" + cinema[index].slug + "')"));
      assert.equal(await evaluate("document.querySelectorAll('[data-ui=lead-slide]:not([inert])').length"), 1);
      assert.ok(Math.abs(await evaluate("document.querySelector('[data-ui=lead-carousel]').getBoundingClientRect().height") - carouselHeight) < 2, 'Changing slides must not shift the opening section');
    }
    await evaluate("document.querySelector('[data-ui=lead-carousel] button[aria-label=\"Próxima notícia\"]').click()");
    await until("document.querySelector('[data-ui=lead-carousel]').dataset.activeSlide === '1'");
    await evaluate("document.querySelector('[data-ui=lead-carousel] button[aria-label=\"Notícia anterior\"]').click()");
    await until("document.querySelector('[data-ui=lead-carousel]').dataset.activeSlide === '10'");
    await evaluate("document.querySelector('[data-ui=lead-carousel]').dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true, cancelable:true}))");
    await until("document.querySelector('[data-ui=lead-carousel]').dataset.activeSlide === '1'");
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
    await until("getComputedStyle(document.querySelector('[data-ui=lead-slide][data-active=true]')).opacity === '1'");
    const carouselShot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile('outputs/blog-review/carousel-' + width + '.png', Buffer.from(carouselShot.data, 'base64'));
    if (width < 768) {
      const bounds = await evaluate("(() => {const r=document.querySelector('[data-ui=lead-carousel]').getBoundingClientRect();return {left:r.left,width:r.width,y:Math.max(125,r.top+r.height/3)}})()");
      await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{x:bounds.left+bounds.width*.8,y:bounds.y}] });
      await command('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{x:bounds.left+bounds.width*.2,y:bounds.y}] });
      await command('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await until("document.querySelector('[data-ui=lead-carousel]').dataset.activeSlide === '2'");
      assert.equal(await evaluate('location.pathname'), '/site/blog');
    }

    await command('Emulation.setEmulatedMedia', {features:[]});
    for (const path of ['/site/blog', '/site/blog?categoria=tecnologia', '/site/blog/homem-aranha-um-novo-dia']) {
      await navigate(path);
      await evaluate('scrollTo(0, 0)');
      await until("document.querySelector('[data-ui=blog-header]').dataset.visible === 'true'");
      assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-ui=blog-header]')).position"), 'fixed');
      assert.ok(await evaluate("getComputedStyle(document.querySelector('[data-ui=blog-header]')).backdropFilter.includes('blur')"));
      const openingEnd = await evaluate("document.querySelector('[data-ui=blog-first-section]').getBoundingClientRect().bottom + scrollY");
      const headerHeight = await evaluate("document.querySelector('[data-ui=blog-header]').offsetHeight");
      const inside = Math.max(0, (openingEnd - headerHeight) / 2);
      await evaluate('scrollTo(0, ' + inside + ')');
      await until('Math.abs(scrollY - ' + inside + ') < 2');
      assert.equal(await evaluate("document.querySelector('[data-ui=blog-header]').dataset.visible"), 'true', 'Header must stay visible during the opening section');
      const down = openingEnd + 220;
      await evaluate('scrollTo(0, ' + down + ')');
      await until("document.querySelector('[data-ui=blog-header]').dataset.visible === 'false' && document.querySelector('[data-ui=blog-header]').getBoundingClientRect().bottom < 0");
      assert.equal(await evaluate("document.querySelector('[data-ui=blog-header]').inert"), true);
      await evaluate('scrollTo(0, Math.max(0, scrollY - 100))');
      await until("document.querySelector('[data-ui=blog-header]').dataset.visible === 'true' && Math.abs(document.querySelector('[data-ui=blog-header]').getBoundingClientRect().top) < 1");
      assert.equal(await evaluate("document.querySelector('[data-ui=blog-header]').inert"), false);
    }



  }
  await command('Emulation.setDeviceMetricsOverride', { width: 375, height: 1000, deviceScaleFactor: 1, mobile: true });
  await navigate('/site/blog');
  await evaluate("document.querySelector('[data-ui=blog-menu-button]').click()");
  await until("document.querySelector('[data-ui=blog-menu-button]').getAttribute('aria-expanded') === 'true'");
  const menuScroll = await evaluate("document.querySelector('[data-ui=blog-first-section]').getBoundingClientRect().bottom + scrollY + 200");
  await evaluate('scrollTo(0, ' + menuScroll + ')');
  await until('Math.abs(scrollY - ' + menuScroll + ') < 2');
  assert.equal(await evaluate("document.querySelector('[data-ui=blog-header]').dataset.visible"), 'true', 'Open menu should pin the header');
  await evaluate("document.querySelector('[data-ui=blog-menu-button]').click()");
  await until("document.querySelector('[data-ui=blog-header]').dataset.visible === 'false'");
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.ok(await evaluate("getComputedStyle(document.querySelector('[data-ui=blog-header]')).transitionDuration.split(',').every(value=>parseFloat(value)===0)"));
  await evaluate('scrollTo(0, ' + (menuScroll - 100) + ')');
  await until("document.querySelector('[data-ui=blog-header]').dataset.visible === 'true'");
  await command('Emulation.setEmulatedMedia', { features: [] });

  await navigate('/site/blog');
  await until("!!document.querySelector('[data-ui=blog-menu-button]')");
  await evaluate("document.querySelector('[data-ui=blog-menu-button]').click()");
  await until("document.querySelector('[data-ui=blog-menu-button]').getAttribute('aria-expanded')==='true'");
  assert.ok(await evaluate("document.querySelector('#blog-navigation[data-open=\"true\"] a[href=\"/site/blog\"]') !== null"));
  await evaluate("document.querySelector('[data-ui=blog-menu-button]').click()");
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await navigate('/site/blog');
  await evaluate("document.querySelector('[data-ui=blog-search-trigger]').click()");
  await until("document.querySelector('#blog-search-panel').open");
  await evaluate("window.__blogNavigationTest = true; document.querySelector('#blog-search').value='óptica'; document.querySelector('form[role=search]').requestSubmit()");
  await until("location.search.includes('q=') && document.querySelector('#latest-title')?.textContent==='Publicações encontradas'");
  assert.equal(await evaluate('window.__blogNavigationTest'), true, 'Search should use client navigation');
  assert.ok(await evaluate("document.querySelector('#publicacoes').textContent.includes('Como funciona a internet por fibra óptica?')"));
  await navigate('/site/blog?q=zzzzzz');
  assert.ok(await evaluate("document.querySelector('#publicacoes').textContent.includes('Nenhum artigo encontrado')"));
  await navigate('/site/blog?categoria=games');
  assert.equal(await evaluate("document.querySelectorAll('#publicacoes article').length"), 1);
  await navigate('/site/blog?grupo=entretenimento');
  assert.equal(await evaluate("document.querySelectorAll('#publicacoes article').length"), 6);
  await navigate('/site/blog');
  assert.equal(await evaluate("document.querySelectorAll('#publicacoes article').length"), 6);
  await evaluate("document.querySelector('a[href*=\"pagina=2\"]').click()");
  await until("document.querySelectorAll('#publicacoes article').length === 12");
  await evaluate("document.documentElement.classList.toggle('theme-dark')");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-ui=netbox-blog]')).backgroundColor"), 'rgb(255, 255, 255)');
  await evaluate("document.documentElement.classList.toggle('theme-dark')");
  await evaluate("document.querySelector('#publicacoes article a').click()");
  await until("location.pathname.includes('/site/blog/') && !!document.querySelector('article h1')");
  assert.ok(await evaluate("document.querySelectorAll('article h1').length === 1"));
  await navigate('/site/blog/como-melhorar-o-sinal-wifi?ref=abcd1234');
  await until("sessionStorage.getItem('netbox-affiliate-code') === 'abcd1234'");
  const interceptedShare = await evaluate(`(() => {
    let intercepted = false;
    document.addEventListener('click', event => { intercepted = event.defaultPrevented; event.preventDefault(); }, { once: true });
    document.querySelector('a[href^="https://wa.me/"]').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    return intercepted;
  })()`);
  assert.equal(interceptedShare, false, 'Editorial shares must bypass the affiliate sales interceptor');
  assert.equal(await evaluate("document.querySelectorAll('[role=dialog]').length"), 0);
  await command('Page.navigate', { url: base + '/site?ref=abcd1234' });
  await until("document.readyState === 'complete' && !!document.querySelector('.model-whatsapp')");
  await until("sessionStorage.getItem('netbox-affiliate-code') === 'abcd1234' && typeof document.querySelector('.theme-toggle')?.onclick === 'function'");
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  await evaluate("document.querySelector('.model-whatsapp').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))");
  await until("!!document.querySelector('#affiliate-whatsapp-title')");
  await evaluate("Array.from(document.querySelectorAll('[role=dialog] button')).find(button => button.textContent.includes('Agora não')).click(); sessionStorage.removeItem('netbox-affiliate-code')");

  await navigate('/site/blog');
  await evaluate('window.__categoryNavigation = true');
  for (const [category, label] of [['tecnologia', 'Tecnologia'], ['filmes', 'Filmes'], ['series', 'Séries'], ['hqs', 'HQs'], ['games', 'Jogos'], ['entretenimento', 'Entretenimento']]) {
    await evaluate("document.querySelector('#blog-navigation a[href*=\"categoria=" + category + "\"]').click()");
    await until("!!document.querySelector('[data-ui=blog-category][data-category=" + category + "]')");
    assert.equal(await evaluate("document.querySelector('h1').textContent"), label);
    assert.equal(await evaluate('window.__categoryNavigation'), true, 'Category navigation should not reload the document');
    assert.ok(await evaluate("document.querySelectorAll('[data-ui=category-feature]').length > 0"));
    assert.equal(await evaluate("document.querySelectorAll('[data-ui=blog-category] aside').length"),0);
    assert.equal(await evaluate("document.querySelector('#blog-navigation a[aria-current=page]').textContent.trim()"), label);
    assert.ok((await evaluate('document.title')).includes(label));
  }
  await navigate('/site/blog?categoria=filmes&q=zzzzzz');
  assert.ok(await evaluate("document.querySelector('#publicacoes').textContent.includes('Nenhum artigo encontrado')"));
  await navigate('/site/blog?categoria=internet-e-wifi');
  assert.equal(await evaluate("document.querySelector('h1').textContent"), 'Tecnologia');

  await navigate('/site/blog?categoria=tecnologia');
  await evaluate("document.querySelector('[data-ui=blog-search-trigger]').click()");
  await until("document.querySelector('#blog-search-panel').open");
  await evaluate("document.querySelector('#blog-search').value='fibra'; document.querySelector('form[role=search]').requestSubmit()");
  await until("location.search.includes('q=fibra') && !document.querySelector('#blog-search-panel').open");
  assert.ok(await evaluate("location.search.includes('categoria=tecnologia')"));
  assert.ok(await evaluate("document.querySelector('[data-ui=category-feature]').textContent.includes('Como funciona a internet por fibra óptica?')"));
  await evaluate("document.querySelector('[data-ui=blog-search-trigger]').click()");
  await until("document.querySelector('#blog-search-panel').open");
  await until("Math.abs(document.querySelector('#blog-search-panel').getBoundingClientRect().right - innerWidth) < 1");
  assert.equal(await evaluate("document.querySelector('#blog-search').value"), 'fibra');
  await command('Input.dispatchMouseEvent', { type: 'mousePressed', x: 20, y: 220, button: 'left', clickCount: 1 });
  await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 20, y: 220, button: 'left', clickCount: 1 });
  await until("!document.querySelector('#blog-search-panel').open");

  await navigate('/site/blog');
  assert.equal(await evaluate("document.querySelectorAll('main [data-ui=editorial-sidebar]').length"), 0, 'Editorial sidebar must leave the page content');
  assert.equal(await evaluate("document.querySelectorAll('#blog-search-panel [data-ui=editorial-sidebar]').length"), 1);
  await evaluate("document.querySelector('[data-ui=blog-search-trigger]').click()");
  await until("document.querySelector('#blog-search-panel').open");
  assert.equal(await evaluate("document.querySelectorAll('#blog-search-panel nav[aria-label=\"Explorar assuntos\"] a').length"), 6);
  assert.ok(await evaluate("document.querySelector('#blog-search-panel').textContent.includes('Escolhas da redação')"));
  await evaluate("document.querySelector('#blog-search-panel nav a[href*=\"categoria=games\"]').click()");
  await until("!document.querySelector('#blog-search-panel').open && !!document.querySelector('[data-ui=blog-category][data-category=games]')");
  await evaluate("document.querySelector('[data-ui=blog-search-trigger]').click()");
  await until("document.querySelector('#blog-search-panel').open");
  await evaluate("Array.from(document.querySelectorAll('#blog-search-panel aside section')).find(section=>section.textContent.includes('Escolhas da redação')).querySelector('a').click()");
  await until("!document.querySelector('#blog-search-panel').open && location.pathname.includes('/site/blog/')");

  const cinema = JSON.parse(await readFile('app/site/blog/_content/cinema.json', 'utf8'));
  for (const story of cinema) {
    await navigate('/site/blog/' + story.slug);
    assert.equal(await evaluate("document.querySelector('article h1').textContent"), story.title);
    const renderedCopy = await evaluate(`(() => {
      const article = document.querySelector('article h1').closest('article');
      return [article.querySelector('header > p').textContent, ...Array.from(article.querySelectorAll('section[id^="secao-"] p'), p=>p.textContent)].join(' ');
    })()`);
    assert.equal(renderedCopy, story.text);
    assert.ok(await evaluate("document.querySelector('article figure img').currentSrc.includes('/blog/" + story.slug + "-') && document.querySelector('article figure img').naturalWidth > 0"));
  }

  for (const path of ['/site', '/sobre', '/nossos-servicos', '/nossa-estrutura', '/contatos', '/central-do-cliente']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes('/site/blog'), 'Blog link missing from ' + path);
    if (path === '/site') assert.ok(html.includes('planos-netbox'));
  }
  assert.equal((await fetch(base + '/site/blog/artigo-inexistente')).status, 404);
  const sitemap = await fetch(base + '/sitemap.xml').then(r => r.text());
  assert.ok(sitemap.includes('/site/blog'));
  assert.ok(!sitemap.includes('/site/blog/como-melhorar-o-sinal-wifi'));
  console.log(JSON.stringify({ result: 'passed', widths: [1440,1024,768,375,320], checks: ['index/article overflow and images','ten latest lead slides: order, links, arrows, pagination, keyboard, swipe and stable height','fixed glass header: opening section visible, hide down, reveal up on home/category/article','ten cinema articles preserve supplied copy and correct covers','continuous timeline, date alignment and rocket icon','independent header/footer and no institutional chrome','mobile menu stays visible while open; reduced motion respected','SPA search','right-side search panel, Escape, backdrop, focus restoration and category context','editorial sidebar only in panel; topic and article links close it','empty state','category and group filters','six editorial category views and SPA header navigation','load more','demo noindex','JSON-LD','light editorial palette with inherited dark preference','existing institutional routes','unknown article 404','sitemap excludes demos','editorial shares bypass affiliate sales; institutional flow preserved'], errors }, null, 2));
  assert.deepEqual(errors, [], 'Browser console errors');
} finally { socket.close(); await fetch('http://localhost:' + port + '/json/close/' + tab.id); }
