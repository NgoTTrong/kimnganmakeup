// Builds every served image from assets/ (run: npm run assets).
// Looks: cut the 2x2 collages into single cells at full resolution, in display order;
// sets from assets/drive/ are whole photos, downsized.
// Never upscales; sizes on the page are capped by each photo's measured sharpness (see photos.json).
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets')
const PUB = path.join(ROOT, 'public')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/content/photos.json'), 'utf8'))
const files = fs.readdirSync(SRC)
const find = (hash) => {
  const f = files.find((n) => n.includes(hash))
  if (!f) throw new Error(`asset not found: ${hash}`)
  return path.join(SRC, f)
}
const mk = (d) => fs.mkdirSync(d, { recursive: true })
const sizes = { looks: {}, moments: {}, artist: null }
// originals from the Google Drive folder, named by folder position (assets/drive/NN.jpg)
const drive = (n) => path.join(SRC, 'drive', `${n}.jpg`)
// whole photo, downsized only (sharp drops EXIF unless asked to keep it)
const single = (src, out, width) =>
  sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out)

// 1 · looks: 2x2 collages → cells, trimmed 3px to drop the seam; drive sets → whole photos ≤ 1000 px wide
for (const look of manifest.looks) {
  const dir = path.join(PUB, 'looks', look.slug)
  mk(dir)
  sizes.looks[look.slug] = []
  if (look.drive) {
    for (const [i, n] of look.drive.entries()) {
      const out = await single(drive(n), path.join(dir, `${i}.webp`), 1000)
      sizes.looks[look.slug].push([out.width, out.height])
    }
    continue
  }
  const src = find(look.file)
  const { width, height } = await sharp(src).metadata()
  const cw = width / 2, ch = height / 2
  for (const [i, cell] of look.tiles.entries()) {
    const box = { left: Math.round((cell % 2) * cw) + 3, top: Math.round(Math.floor(cell / 2) * ch) + 3, width: Math.round(cw) - 6, height: Math.round(ch) - 6 }
    const out = await sharp(src).rotate().extract(box).webp({ quality: 82 }).toFile(path.join(dir, `${i}.webp`))
    sizes.looks[look.slug].push([out.width, out.height])
  }
}

// 2 · moments and the artist portrait: single photos, at most 900 px wide
mk(path.join(PUB, 'moments'))
for (const m of manifest.moments) {
  const out = await single(m.drive ? drive(m.drive) : find(m.file), path.join(PUB, 'moments', `${m.slug}.webp`), 900)
  sizes.moments[m.slug] = [out.width, out.height]
}
{
  const out = await sharp(find(manifest.artist.file)).rotate().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(PUB, 'artist.webp'))
  sizes.artist = [out.width, out.height]
}
fs.writeFileSync(path.join(ROOT, 'src/content/photo-sizes.json'), JSON.stringify(sizes, null, 1) + '\n')

// 3 · logo: alpha mask from the cream-background JPG (ink = opaque), full mark and monogram only
mk(path.join(PUB, 'brand'))
const logo = path.join(SRC, 'logo.jpg')
const { data, info } = await sharp(logo).greyscale().raw().toBuffer({ resolveWithObject: true })
const bg = data[0]
const mask = Buffer.alloc(info.width * info.height * 4)
for (let i = 0; i < data.length; i++) {
  const a = Math.max(0, Math.min(255, ((bg - 12 - data[i]) * 255) / (bg - 60)))
  mask[i * 4 + 3] = a
}
const maskPng = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer()
await sharp(maskPng).trim().toFile(path.join(PUB, 'brand', 'logo-mask.png'))
// rows 100–332 hold the KN monogram; the wordmark sits below
const monoRaw = await sharp(maskPng).extract({ left: 0, top: 100, width: info.width, height: 232 }).png().toBuffer()
const mono = await sharp(monoRaw).trim().png().toBuffer()
await sharp(mono).toFile(path.join(PUB, 'brand', 'mono-mask.png'))

// gold monogram on the night background, for icons and the share image
const NIGHT = '#0D0A09'
const goldSvg = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.3">
  <stop offset="0" stop-color="#9C7643"/><stop offset=".25" stop-color="#E8CFA0"/><stop offset=".5" stop-color="#B8925A"/><stop offset=".7" stop-color="#F3E2BD"/><stop offset="1" stop-color="#A9844F"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`)
async function goldMono(width) {
  const m = await sharp(mono).resize({ width }).png().toBuffer()
  const { width: w, height: h } = await sharp(m).metadata()
  return sharp(goldSvg(w, h)).composite([{ input: m, blend: 'dest-in' }]).png().toBuffer()
}
for (const [file, size, pad] of [['icon.png', 512, 0.18], ['apple-icon.png', 180, 0.2]]) {
  const g = await goldMono(Math.round(size * (1 - pad * 2)))
  const meta = await sharp(g).metadata()
  await sharp({ create: { width: size, height: size, channels: 4, background: NIGHT } })
    .composite([{ input: g, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
    .png().toFile(path.join(ROOT, 'src/app', file))
}

// 4 · share image 1200×630: gold monogram, name, three small framed faces (kept small: no upscaling)
{
  const W = 1200, H = 630
  const g = await goldMono(150)
  const gm = await sharp(g).metadata()
  const faces = [['peach-velvet', 0], ['rose-muse', 0], ['sweet-pink', 0]]
  const comps = [{ input: g, left: 120, top: 150 }]
  const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#B8925A"/><stop offset=".5" stop-color="#F3E2BD"/><stop offset="1" stop-color="#B8925A"/></linearGradient></defs>
    <rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="#CFAE78" stroke-opacity=".35"/>
    <text x="120" y="${150 + gm.height + 110}" font-family="Cormorant Garamond, Georgia, serif" font-size="104" fill="url(#g)">Kim Ngân</text>
    <text x="124" y="${150 + gm.height + 160}" font-family="Arial, sans-serif" font-size="20" letter-spacing="9" fill="#CFAE78">MAKEUP ARTIST</text></svg>`)
  comps.push({ input: text, left: 0, top: 0 })
  let x = 640
  for (const [i, [slug, k]] of faces.entries()) {
    const img = await sharp(path.join(PUB, 'looks', slug, `${k}.webp`)).resize(150, 200, { fit: 'cover' }).toBuffer()
    const framed = await sharp({ create: { width: 166, height: 216, channels: 4, background: '#CFAE78' } })
      .composite([{ input: await sharp({ create: { width: 164, height: 214, channels: 4, background: '#120E0C' } }).png().toBuffer(), left: 1, top: 1 }, { input: img, left: 8, top: 8 }])
      .png().toBuffer()
    comps.push({ input: framed, left: x, top: i === 1 ? 190 : 220 })
    x += 186
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: NIGHT } }).composite(comps).jpeg({ quality: 86 }).toFile(path.join(PUB, 'og.jpg'))
}

// 5 · film grain tile for the background
{
  const S = 256, b = Buffer.alloc(S * S * 4)
  for (let i = 0; i < S * S; i++) { const v = (Math.random() * 255) | 0; b[i * 4] = b[i * 4 + 1] = b[i * 4 + 2] = v; b[i * 4 + 3] = 14 }
  await sharp(b, { raw: { width: S, height: S, channels: 4 } }).png().toFile(path.join(PUB, 'grain.png'))
}
console.log('images ok', Object.keys(sizes.looks).length, 'looks,', Object.keys(sizes.moments).length, 'moments')
