import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import photos from '@/content/photos.json'
import { artistPhoto, getLook, looks, moments } from '@/content/looks'
import { locales } from '@/i18n/config'

const pub = (src: string) => path.join(__dirname, '../../public', src)

describe('looks', () => {
  test('eighteen looks with unique slugs, one photo per manifest tile or drive file', () => {
    expect(looks).toHaveLength(18)
    expect(new Set(looks.map((l) => l.slug)).size).toBe(18)
    for (const [i, l] of looks.entries()) {
      const m = photos.looks[i] as { tiles?: number[]; drive?: string[] }
      expect(l.photos.length, l.slug).toBe((m.tiles ?? m.drive)!.length)
      expect(l.photos.length, l.slug).toBeGreaterThanOrEqual(2)
    }
  })

  test('every look has a name, three shades and a note in each language', () => {
    for (const l of looks) {
      expect(l.name).toBeTruthy()
      expect(l.pans).toHaveLength(3)
      for (const loc of locales) expect(l.note[loc], `${l.slug}.${loc}`).toBeTruthy()
    }
  })

  test('every served photo exists and carries a sharpness budget', () => {
    const all = [...looks.flatMap((l) => l.photos), ...moments.map((m) => m.photo), artistPhoto]
    for (const p of all) {
      expect(fs.existsSync(pub(p.src)), p.src).toBe(true)
      expect(p.eff).toBeGreaterThan(300)
      expect(p.width).toBeGreaterThan(0)
    }
  })

  test('nine moments with text in every language', () => {
    expect(moments).toHaveLength(9)
    for (const m of moments) for (const loc of locales) expect(m.note[loc]).toBeTruthy()
  })

  test('photo #19 (another artist watermark) is never used', () => {
    // #19 = 20th file in assets/ by name; its hash must not appear in the manifest
    const n19 = fs.readdirSync(path.join(__dirname, '../../assets')).filter((f) => f.endsWith('.jpg') && f !== 'logo.jpg').sort()[19]
    expect(n19).toContain('393c82930f56ee1db32ddb6d06d886a5')
    expect(JSON.stringify(photos)).not.toContain('393c8293')
  })

  test('getLook', () => {
    expect(getLook('rose-muse')?.name).toBe('Rose Muse')
    expect(getLook('nope')).toBeUndefined()
  })
})
