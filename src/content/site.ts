export const SOCIALS = {
  facebook: 'https://www.facebook.com/share/19ztyJQGwn/',
  instagram: 'https://www.instagram.com/___vnkn___/',
  tiktok: 'https://www.tiktok.com/@kimnganmakeup_',
  threads: 'https://www.threads.com/@___vnkn___',
} as const

/** Booking happens in messages: Facebook first, Instagram DM second (easier for visitors from abroad). */
export const BOOKING = [
  { id: 'facebook', label: 'Facebook', href: SOCIALS.facebook },
  { id: 'instagram', label: 'Instagram', href: SOCIALS.instagram },
] as const

export const MORE = [
  { id: 'tiktok', label: 'TikTok', href: SOCIALS.tiktok },
  { id: 'threads', label: 'Threads', href: SOCIALS.threads },
] as const

export const BRAND = 'Kim Ngân Makeup Artist'
