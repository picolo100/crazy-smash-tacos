/**
 * Génère des variantes responsives AVIF + WebP pour chaque photo de `assets/photos`
 * et écrit un manifeste typé (`lib/images.generated.ts`) utilisé par <Photo />.
 * Usage : npm run images   (à relancer après ajout/remplacement d'une photo)
 */
import { readdir, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/photos";
const OUT = "public/img";
const STEPS = [360, 550, 800, 1100, 1560];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, "");
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = [...new Set([...STEPS.filter((w) => w < width), width])];
  for (const w of widths) {
    const resized = input.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await resized.clone().webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  const blur = await input.clone().resize(16).webp({ quality: 40 }).toBuffer();
  manifest[name] = { width, height, widths, blur: `data:image/webp;base64,${blur.toString("base64")}` };
  console.log(`✓ ${name} (${width}×${height}) → ${widths.join(", ")}`);
}

const ts = `/* Fichier généré par scripts/optimize-images.mjs — ne pas modifier à la main. */
export const images = ${JSON.stringify(manifest, null, 2)} as const;

export type ImageName = keyof typeof images;
`;
await writeFile("lib/images.generated.ts", ts);
console.log(`\n${files.length} photos traitées.`);
