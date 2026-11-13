import type { Locale } from '@/i18n/config'

export const BRAND = 'Kim Ngân Makeup Artist'

export const SOCIALS = {
  instagram: 'https://www.instagram.com/___vnkn___/',
  tiktok: 'https://www.tiktok.com/@kimnganmakeup_',
  threads: 'https://www.threads.com/@___vnkn___',
  facebook: 'https://www.facebook.com/share/19ztyJQGwn/',
} as const

/** Booking happens in messages: Facebook first, Instagram DM second (easier for visitors from abroad). */
export const BOOKING = {
  facebook: SOCIALS.facebook,
  instagram: SOCIALS.instagram,
} as const

export type Channel = 'facebook' | 'instagram'
export const CHANNEL_URL: Record<Channel, string> = { facebook: BOOKING.facebook, instagram: BOOKING.instagram }
export const CHANNEL_LABEL: Record<Channel, string> = { facebook: 'Facebook', instagram: 'Instagram' }
/** Booking channels per language, most used first; every language uses the same two. */
export const CHANNELS: Record<Locale, Channel[]> = { vi: ['facebook', 'instagram'], ko: ['facebook', 'instagram'], ru: ['facebook', 'instagram'] }

export const AREA: Record<Locale, string> = { vi: 'Nội thành Nha Trang', ko: '나트랑 시내', ru: 'Центр Нячанга' }
