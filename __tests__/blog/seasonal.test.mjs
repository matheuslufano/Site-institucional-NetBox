import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const componentBase = new URL('../../components/shared/seasonal/', import.meta.url);
const christmasSceneCss = readFileSync(new URL('ChristmasScene.module.css', componentBase), 'utf8');
const snowfallCss = readFileSync(new URL('Snowfall.module.css', componentBase), 'utf8');

/** Exercise actual footer and scene JSX while replacing only browser context and image infrastructure. */
function loadComponent(name, theme) {
  const filename = fileURLToPath(new URL(name, componentBase));
  const require = createRequire(filename);
  const source = readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const componentModule = { exports: {} };
  const localRequire = specifier => {
    if (specifier.endsWith('.module.css')) return new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) });
    if (specifier === './SeasonalThemeProvider') return { useSeasonalTheme: () => ({ theme, paused: false }), seasonalColors: () => ({}) };
    if (specifier === './WavingSnowman') return loadComponent('WavingSnowman.tsx', theme);
    if (specifier === './ChristmasScene') return loadComponent('ChristmasScene.tsx', theme);
    if (specifier === 'next/image') return function EditorialImage(props) {
      const imageProps = { ...props };
      delete imageProps.unoptimized;
      return React.createElement('img', imageProps);
    };
    return require(specifier);
  };
  new Function('require', 'module', 'exports', compiled)(localRequire, componentModule, componentModule.exports);
  return componentModule.exports;
}

test('Snow crystals keep hydration stable and distribute positions independently of fall phases', () => {
  const { default: Snowfall } = loadComponent('Snowfall.tsx', null);
  const html = renderToStaticMarkup(React.createElement(Snowfall, { paused: false }));
  assert.equal(html, renderToStaticMarkup(React.createElement(Snowfall, { paused: false })));
  assert.equal((html.match(/class="crystal"/g) || []).length, 140);
  assert.equal((html.match(/<path /g) || []).length, 140);
  const flakes = Snowfall({ paused: false }).props.children;
  const positions = flakes.map(flake => parseFloat(flake.props.style['--snow-x']));
  const phases = flakes.map(flake => -parseFloat(flake.props.style['--snow-delay']) / parseFloat(flake.props.style['--snow-duration']));
  assert.equal(new Set(positions.map(x => Math.floor(x / 10))).size, 10);
  const centered = values => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return values.map(value => value - mean);
  };
  const x = centered(positions), y = centered(phases);
  const correlation = x.reduce((sum, value, i) => sum + value * y[i], 0) / Math.sqrt(x.reduce((sum, value) => sum + value ** 2, 0) * y.reduce((sum, value) => sum + value ** 2, 0));
  assert.ok(Math.abs(correlation) < 0.25, 'Initial snow must not form diagonal rows');
  assert.match(snowfallCss, /christmas-snow-fall/);
  assert.match(snowfallCss, /n \+ 73/);
  assert.match(snowfallCss, /n \+ 43/);
});

test('A completed fall changes its horizontal origin without resetting its clock', () => {
  const { default: Snowfall } = loadComponent('Snowfall.tsx', null);
  const flake = Snowfall({ paused: false }).props.children[0];
  const updates = new Map();
  const target = { style: { setProperty: (name, value) => updates.set(name, value) } };
  flake.props.onAnimationIteration({ target: {}, currentTarget: target });
  assert.equal(updates.size, 0, 'Ignore bubbled sway and rotation events');
  flake.props.onAnimationIteration({ target, currentTarget: target });
  const first = updates.get('--snow-x');
  flake.props.onAnimationIteration({ target, currentTarget: target });
  assert.notEqual(first, updates.get('--snow-x'));
  assert.equal(updates.has('--snow-duration'), false);
});

test('Christmas greeting places forest and waving snowman without the decorated tree across the footer transition', () => {
  const { SeasonalSiteFooter } = loadComponent('SeasonalFooter.tsx', { id: 'christmas', effect: 'snow' });
  const html = renderToStaticMarkup(React.createElement(SeasonalSiteFooter, { className: '_portalFooter_xeipx_1203', 'data-ui': 'blog-footer' }, React.createElement('a', { href: '/site/blog/creditos' }, 'Créditos')));
  const greeting = html.slice(0, html.indexOf('<footer'));
  const footer = html.slice(html.indexOf('<footer'), html.lastIndexOf('</footer>'));
  assert.match(greeting, /data-component="christmas-footer-scene"/);
  assert.match(greeting, /class="forest"/);
  assert.doesNotMatch(greeting, /class="christmasTree"/);
  assert.match(greeting, /class="snowman"/);
  assert.match(greeting, /class="wavingArm"/);
  assert.match(greeting, /Feliz Natal!/);
  assert.match(greeting, /Que a magia do Natal conecte sua fam\u00edlia ao que mais importa\./);
  assert.match(christmasSceneCss, /christmas-snowman-wave/);
  assert.match(christmasSceneCss, /background: transparent/);
  assert.match(footer, /class="_portalFooter_xeipx_1203 frame"/);
  assert.match(footer, /data-seasonal-theme="christmas"/);
  assert.match(footer, /href="\/site\/blog\/creditos"/);
  assert.equal((html.match(/id="seasonal-footer-decoration"/g) || []).length, 1);
});

test('disabled themes leave the actual footer free of seasonal artwork', () => {
  const { SeasonalSiteFooter } = loadComponent('SeasonalFooter.tsx', null);
  const html = renderToStaticMarkup(React.createElement(SeasonalSiteFooter, { className: 'model-footer' }, 'Rodapé original'));
  assert.doesNotMatch(html, /seasonal-footer-decoration|snowy-pines|christmas-pine-forest|data-seasonal-theme/);
  assert.match(html, /Rodapé original/);
});
