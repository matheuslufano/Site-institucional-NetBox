import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/** Download and optimize editorial cover/poster assets declared by the local content catalog. */
const root = process.cwd();
const records = JSON.parse(await readFile(path.join(root, 'content/blog/editorial/articles.json'), 'utf8'));
const publicDir = path.join(root, 'public/blog/editorial');
const posterDir = path.join(publicDir, 'posters');
await mkdir(posterDir, { recursive: true });

for (const article of records) {
  const response = await fetch(article.coverSource, { headers: { 'User-Agent': 'NetboxBlog/1.0 (editorial asset preparation)' } });
  if (!response.ok) throw new Error(`Cover download failed (${response.status}): ${article.slug}`);
  const input = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 100 || metadata.height < 100) throw new Error(`Invalid cover dimensions: ${article.slug}`);

  const outputBase = path.join(publicDir, article.slug);
  for (const width of [480, 800, 1200]) {
    await sharp(input).resize(width, Math.round(width * 9 / 16), { fit: 'cover', position: 'attention' }).webp({ quality: 82, effort: 5 }).toFile(`${outputBase}-${width}.webp`);
  }
  await sharp(input).resize(480, 720, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(path.join(posterDir, `${article.slug}.webp`));
  console.log(`${article.slug}: ${metadata.width}x${metadata.height} -> local WebP variants`);
}
