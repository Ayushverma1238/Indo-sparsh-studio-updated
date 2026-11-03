import sharp from "sharp";

const project = "C:/Users/AYUSH/OneDrive/Desktop/IndoSparceStudio/Indo_Sparsh_Studio";
const src = `${project}/public/video/hero-poster.webp`;

const meta = await sharp(src).metadata();
console.log("original", meta.width, "x", meta.height);

for (const width of [480, 800, 1920]) {
  const out = `${project}/public/video/hero-poster-${width}.webp`;
  await sharp(src)
    .resize({ width, withoutEnlargement: true }) // never upscales
    .webp({ quality: 72, effort: 6 })
    .toFile(out);
  console.log("wrote", out);
}