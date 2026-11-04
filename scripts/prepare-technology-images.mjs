import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/** Regenerate the existing API-compatible cover URLs from the reviewed AI originals. */
const names = ['wifi-em-casa', 'tecnologia', 'fibra-optica', 'aplicativo', 'seguranca'];
for (const name of names) {
  const source = new URL(`../public/blog/technology/originals/${name}.png`, import.meta.url);
  await mkdir(new URL('../public/blog/', import.meta.url), { recursive: true });
  for (const width of [480, 800, 1200]) {
    await sharp(fileURLToPath(source))
      .resize(width, Math.round(width * 9 / 16), { fit: 'cover' })
      .webp({ quality: 82, effort: 5 })
      .toFile(fileURLToPath(new URL(`../public/blog/${name}-${width}.webp`, import.meta.url)));
  }
  console.log(`${name}: 480, 800, 1200 px`);
}
