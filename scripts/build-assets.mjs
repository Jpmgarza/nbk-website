// Builds every image the site serves from the Figma exports in design/source.
// Run with `npm run assets` after replacing a source file.
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = (name) => path.join(root, "design/source", name);
const imagesDir = path.join(root, "assets/images");
const publicDir = path.join(root, "public");
const iconsDir = path.join(publicDir, "icons");
const appDir = path.join(root, "app");

const BG = { r: 254, g: 253, b: 253, alpha: 1 };

await mkdir(imagesDir, { recursive: true });
await mkdir(iconsDir, { recursive: true });

const report = [];
async function write(pipeline, file) {
  const info = await pipeline.toFile(file);
  report.push(`${path.relative(root, file)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// Photographs
await write(sharp(source("noelia-portrait.jpg")).webp({ quality: 86 }), path.join(imagesDir, "noelia-portrait.webp"));
await write(sharp(source("services-hero.png")).webp({ quality: 82 }), path.join(imagesDir, "services-hero.webp"));

// Flat illustrations: lossless keeps the edges crisp and stays small.
for (const name of ["juridique", "communautaire", "simultanee", "chuchotee", "consecutive", "traduction", "faq"]) {
  await write(
    sharp(source(`illustration-${name}.png`)).webp({ lossless: true, effort: 6 }),
    path.join(imagesDir, `illustration-${name}.webp`),
  );
}
await write(sharp(source("carte-suisse.png")).webp({ quality: 90 }), path.join(imagesDir, "carte-suisse.webp"));
await write(sharp(source("logo-nbk.png")).webp({ lossless: true }), path.join(imagesDir, "logo-nbk.webp"));

// Icons use the "NBK" letters (top part of the logo) centred on the light background.
const lettersBand = await sharp(source("logo-nbk.png"))
  .extract({ left: 0, top: 0, width: 713, height: 250 })
  .toBuffer();
const letters = await sharp(lettersBand).trim().toBuffer();

async function icon(size, padding) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(letters).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "center" }])
    .png();
}

await write(await icon(512, 0.1), path.join(appDir, "icon.png"));
await write(await icon(180, 0.12), path.join(appDir, "apple-icon.png"));
await write(await icon(192, 0.1), path.join(iconsDir, "icon-192.png"));
await write(await icon(512, 0.1), path.join(iconsDir, "icon-512.png"));

// favicon.ico holding 16, 32 and 48 px PNG images.
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map(async (size) => (await icon(size, 0.04)).toBuffer()));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const entry = 6 + i * 16;
  header.writeUInt8(icoSizes[i], entry);
  header.writeUInt8(icoSizes[i], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(path.join(appDir, "favicon.ico"), Buffer.concat([header, ...pngs]));
report.push("app/favicon.ico  16/32/48");

// Share image: logo on the left, portrait on the right.
const shareLogo = await sharp(source("logo-nbk.png")).resize({ width: 520 }).toBuffer();
const sharePortrait = await sharp(source("noelia-portrait.jpg"))
  .resize({ width: 452, height: 630, fit: "cover", position: "centre" })
  .toBuffer();
await write(
  sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
    .composite([
      { input: shareLogo, left: 84, top: Math.round((630 - 309) / 2) },
      { input: sharePortrait, left: 748, top: 0 },
    ])
    .jpeg({ quality: 85, mozjpeg: true }),
  path.join(publicDir, "og-share.jpg"),
);

for (const svg of ["linkedin.svg", "caret.svg"]) {
  await copyFile(source(svg), path.join(iconsDir, svg));
}

console.log(report.join("\n"));
