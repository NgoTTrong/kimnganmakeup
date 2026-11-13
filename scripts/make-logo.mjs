// assets/logo.jpg (dark ink on cream) → transparent public/brand/logo-moss.png and logo-white.png.
// Alpha comes from ink darkness so anti-aliased edges and the brush stroke stay smooth.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'assets', 'logo.jpg')
const outDir = path.join(root, 'public', 'brand')
await mkdir(outDir, { recursive: true })

const { data, info } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true })
const PAPER = data[0] - 12, INK = 60 // luminance of background (minus JPEG noise) and of solid ink
// rows above this hold the KN monogram and brush; "KIM NGÂN" and "MAKEUP ARTIST" sit below
const MARK_BOTTOM = 336

const variants = { moss: [0x2f, 0x3b, 0x2c], white: [255, 255, 255] }
for (const [name, [r, g, b]] of Object.entries(variants)) {
  const rgba = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0; i < info.width * info.height; i++) {
    const a = Math.min(1, Math.max(0, (PAPER - data[i]) / (PAPER - INK)))
    rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = b
    rgba[i * 4 + 3] = Math.round(a * 255)
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } }
  await sharp(rgba, raw).trim({ threshold: 1 }).png().toFile(path.join(outDir, `logo-${name}.png`))
  // Monogram only (KN + brush, without the wordmark) for the nav bar and icons.
  const top = await sharp(rgba, raw).extract({ left: 0, top: 0, width: info.width, height: MARK_BOTTOM }).png().toBuffer()
  await sharp(top).trim({ threshold: 1 }).png().toFile(path.join(outDir, `mark-${name}.png`))
}
console.log('logo ok', info.width, info.height)

// WebP copies for the page (PNG kept for tools that need it).
for (const file of ['logo-moss', 'logo-white', 'mark-moss', 'mark-white']) {
  await sharp(path.join(outDir, `${file}.png`)).webp({ quality: 90, alphaQuality: 90 }).toFile(path.join(outDir, `${file}.webp`))
}
