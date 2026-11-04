import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { test } from 'node:test';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
async function files(directory) {
  const base = new URL(directory + '/', root);
  const entries = await readdir(base, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? files(directory + '/' + entry.name)
    : [directory + '/' + entry.name]))).flat();
}

test('editorial modules do not depend on the institutional UI or sales integrations', async () => {
  for (const path of [...await files('components/blog'), ...await files('lib/blog'), ...await files('content/blog'), ...await files('hooks/blog')].filter(path => /\.tsx?$/.test(path))) {
    const source = await readFile(new URL(path, root), 'utf8');
    const syntax = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
    for (const statement of syntax.statements) {
      if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
      const destination = statement.moduleSpecifier?.text ?? '';
      assert.ok(!/components\/site|services\/site|services\/whatsapp|styles\/site/.test(destination), path + ' imports ' + destination);
    }
  }
});

test('business logic and content do not import visual components', async () => {
  for (const folder of ['services', 'lib/blog', 'content', 'constants', 'types']) {
    for (const path of (await files(folder)).filter(path => /\.ts$/.test(path))) {
      const source = await readFile(new URL(path, root), 'utf8');
      assert.doesNotMatch(source, /(?:from|import)\s+["'][^"']*components\//, path);
    }
  }
});

test('site sales integration and editorial layout are scoped to independent route groups', async () => {
  const global = await readFile(new URL('app/layout.tsx', root), 'utf8');
  const site = await readFile(new URL('app/(site)/layout.tsx', root), 'utf8');
  const blog = await readFile(new URL('app/(blog)/site/blog/layout.tsx', root), 'utf8');
  assert.doesNotMatch(global, /WhatsAppModal|styles\/site/);
  assert.match(site, /WhatsAppModal/);
  assert.match(site, /styles\/site\/site\.css/);
  assert.match(blog, /BlogLayout/);
});
