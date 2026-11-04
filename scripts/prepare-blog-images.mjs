import { fileURLToPath } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

/** Generate reviewed local covers once; runtime does not require Cloudflare image bindings. */
const covers = {
  'wifi-em-casa': 'servico-fibra-residencial.png',
  'tecnologia': 'structure/conectividade-empresarial.png',
  'entretenimento': 'servico-aplicativos-parceiros.png',
  'fibra-optica': 'structure/rede-fibra-optica.png',
  'streaming': 'services-hero.png',
  'aplicativo': 'sobre-central-atendimento.webp',
  'seguranca': 'structure/central-atendimento.webp',
  'games': 'structure/instalacao-residencial.png',
};
const cinema = JSON.parse(await readFile(new URL('../content/blog/cinema.json', import.meta.url), 'utf8'));
for (const story of cinema) covers[story.slug] = 'blog/' + story.image;

await mkdir(new URL('../public/blog/', import.meta.url), { recursive: true });
for (const [name, source] of Object.entries(covers)) {
  for (const width of [480, 800, 1200]) {
    const image = await sharp(fileURLToPath(new URL('../public/' + source, import.meta.url))).resize(width, Math.round(width * 9 / 16), { fit: 'cover' }).webp({ quality: 78 }).toBuffer();
    await writeFile(new URL('../public/blog/' + name + '-' + width + '.webp', import.meta.url), image);
  }
}
console.log('Generated ' + Object.keys(covers).length * 3 + ' responsive WebP covers.');
