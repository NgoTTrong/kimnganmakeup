import { describe, expect, test } from 'vitest'
import { BOOKING, CHANNELS, SOCIALS } from '@/content/site'
import { locales } from '@/i18n/config'

describe('site config', () => {
  test('booking channels are Facebook and Instagram, in that order, for every language', () => {
    expect(BOOKING.facebook).toBe(SOCIALS.facebook)
    expect(BOOKING.instagram).toBe(SOCIALS.instagram)
    for (const l of locales) expect(CHANNELS[l], l).toEqual(['facebook', 'instagram'])
  })

  test('socials match the spec', () => {
    expect(SOCIALS).toEqual({
      instagram: 'https://www.instagram.com/___vnkn___/',
      tiktok: 'https://www.tiktok.com/@kimnganmakeup_',
      threads: 'https://www.threads.com/@___vnkn___',
      facebook: 'https://www.facebook.com/share/19ztyJQGwn/',
    })
  })
})
