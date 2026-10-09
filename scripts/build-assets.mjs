// Builds every image the site serves from the Figma exports in design/source.
// Run with `npm run assets` after replacing a source file.
import { copyFile, mkdir } from "node:fs/promises";
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
// Hero portrait: the source is landscape but the hero frame is portrait (413x586), so object-cover
// would display only a narrow slice of a wide file and the browser, sizing the request for the
// frame width, would upscale it. Crop to the frame's aspect around the face (horizontally centred).
{
  const meta = await sharp(source("noelia-portrait.jpg")).metadata();
  const cropWidth = Math.min(meta.width, Math.round(meta.height * (413 / 586)));
  const left = Math.round((meta.width - cropWidth) / 2);
  await write(
    sharp(source("noelia-portrait.jpg"))
      .extract({ left, top: 0, width: cropWidth, height: meta.height })
      .resize({ width: 1800 })
      .webp({ quality: 88 }),
    path.join(imagesDir, "noelia-portrait.webp"),
  );
}
// Services hero: same shoot, tighter crop (face larger, shoulders cut) so the two pages differ.
{
  const meta = await sharp(source("noelia-portrait.jpg")).metadata();
  const cropHeight = Math.round(meta.height * 0.78);
  const cropWidth = Math.round(cropHeight * (413 / 586));
  await write(
    sharp(source("noelia-portrait.jpg"))
      .extract({
        left: Math.round((meta.width - cropWidth) / 2),
        top: Math.round(meta.height * 0.07),
        width: cropWidth,
        height: cropHeight,
      })
      .resize({ width: 1800 })
      .webp({ quality: 88 }),
    path.join(imagesDir, "noelia-services.webp"),
  );
}

// Flat illustrations: lossless keeps the edges crisp and stays small.
for (const name of ["juridique", "communautaire", "simultanee", "chuchotee", "consecutive", "traduction", "faq"]) {
  await write(
    sharp(source(`illustration-${name}.png`)).webp({ lossless: true, effort: 6 }),
    path.join(imagesDir, `illustration-${name}.webp`),
  );
}
await write(sharp(source("carte-suisse.png")).webp({ quality: 90 }), path.join(imagesDir, "carte-suisse.webp"));
await write(sharp(source("logo-nbk.png")).webp({ lossless: true }), path.join(imagesDir, "logo-nbk.webp"));

// Favicons are drawn by the studio (design/source/favicon, 5 October 2026) and copied as they are;
// only the 192px manifest icon, which the set lacks, is scaled down from the 512px one.
const favicon = (name) => source(`favicon/${name}`);
await copyFile(favicon("favicon.ico"), path.join(appDir, "favicon.ico"));
await copyFile(favicon("favicon-512.png"), path.join(appDir, "icon.png"));
await copyFile(favicon("apple-touch-icon.png"), path.join(appDir, "apple-icon.png"));
await copyFile(favicon("favicon-512.png"), path.join(iconsDir, "icon-512.png"));
await write(
  sharp(favicon("favicon-512.png")).resize(192, 192, { kernel: "lanczos3" }).png({ compressionLevel: 9 }),
  path.join(iconsDir, "icon-192.png"),
);
report.push("app/favicon.ico, app/icon.png, app/apple-icon.png, public/icons/icon-512.png  copied from design/source/favicon");

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
