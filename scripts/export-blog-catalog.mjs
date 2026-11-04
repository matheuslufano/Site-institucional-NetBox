import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const temporaryDirectory = await mkdtemp(join(tmpdir(), 'netbox-blog-export-'));
const outputFile = resolve(process.argv[2] || 'outputs/blog-articles.json');
const modules = [
  'types/blog.ts',
  'lib/blog/navigation.ts',
  'content/blog/cinema.ts',
  'content/blog/articles.ts',
  'content/blog/editorial/index.ts',
];

try {
  for (const modulePath of modules) {
    const source = await readFile(new URL('../' + modulePath, import.meta.url), 'utf8');
    let output = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText.replace(
      /(from\s+['"])(@\/[^'"]+|\.[^'"]+)(['"])/g,
      (_, before, specifier, after) => {
        const resolved = specifier.startsWith('@\/')
          ? './' + relative(dirname(modulePath), specifier.slice(2)).replaceAll('\\', '/')
          : specifier;
        return before + resolved + '.mjs' + after;
      },
    );
    output = output.replace(/ with \{ type: ['"]json['"] \}/g, '');
    const target = join(temporaryDirectory, modulePath.replace(/\.ts$/, '.mjs'));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, output);
  }

  for (const jsonPath of [
    'content/blog/cinema.json',
    'content/blog/spotlights.json',
    'content/blog/editorial/articles.json',
  ]) {
    const value = JSON.parse(await readFile(new URL('../' + jsonPath, import.meta.url), 'utf8'));
    const target = join(temporaryDirectory, jsonPath + '.mjs');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, 'export default ' + JSON.stringify(value));
  }

  const { articles } = await import(pathToFileURL(join(temporaryDirectory, 'content/blog/articles.mjs')));
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, JSON.stringify(articles, null, 2) + '\n');
  console.log(`${articles.length} artigos exportados para ${outputFile}`);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
