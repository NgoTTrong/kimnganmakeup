import type { Locale } from '@/i18n/config'
import photos from './photos.json'
import sizes from './photo-sizes.json'

export type Tone = 'hong' | 'dao' | 'nude' | 'tram'
export type Photo = { src: string; width: number; height: number; /** sharp pixels: shown CSS width × DPR must not exceed */ eff: number }

export type Look = {
  slug: string
  name: string
  tone: Tone
  /** Three shades used on the face: cheek, lip, eye. */
  pans: [string, string, string]
  note: Record<Locale, string>
  /** Display order; the first is the cover. */
  photos: Photo[]
}

export type Moment = { slug: string; name: string; note: Record<Locale, string>; photo: Photo }

// KO-DRAFT / RU-DRAFT — notes below are draft translations.
const TEXT: Record<string, Omit<Look, 'slug' | 'photos'>> = {
  'peach-velvet': { name: 'Peach Velvet', tone: 'dao', pans: ['#C98270', '#E7B9A6', '#8A5645'], note: { vi: 'Nền mịn, má đào ấm, môi cam đất.', ko: '매끈한 베이스, 따뜻한 피치 볼, 테라코타 립.', ru: 'Гладкий тон, персиковые румяна, терракотовые губы.' } },
  'rose-muse': { name: 'Rose Muse', tone: 'hong', pans: ['#DC7278', '#E9A59A', '#7A4A40'], note: { vi: 'Hồng hoa hồng, tóc uốn sóng cổ điển.', ko: '로즈 핑크, 클래식 웨이브.', ru: 'Оттенки розы, классические локоны.' } },
  'dusty-rose': { name: 'Dusty Rose', tone: 'tram', pans: ['#B86B6B', '#D89A8E', '#5A3C38'], note: { vi: 'Hồng đất trầm, eyeliner kéo dài.', ko: '더스티 로즈, 길게 뺀 아이라인.', ru: 'Пыльно-розовый, удлинённые стрелки.' } },
  'coral-crush': { name: 'Coral Crush', tone: 'dao', pans: ['#DA6574', '#EB9B8F', '#6F5047'], note: { vi: 'Môi san hô nổi bật, mắt ánh nâu.', ko: '선명한 코랄 립, 브라운 눈매.', ru: 'Коралловые губы, коричневые тени.' } },
  'sweet-pink': { name: 'Sweet Pink', tone: 'hong', pans: ['#D86A80', '#F0A8B5', '#8C6561'], note: { vi: 'Hồng ngọt từ má tới môi, mắt nhẹ.', ko: '볼부터 입술까지 달콤한 핑크.', ru: 'Сладкий розовый от щёк до губ.' } },
  'porcelain-doll': { name: 'Porcelain Doll', tone: 'hong', pans: ['#E8A0A8', '#F2C4C4', '#C9877F'], note: { vi: 'Da trong như sứ, má phớt hồng, môi gradient.', ko: '도자기처럼 맑은 피부, 은은한 볼, 그라데이션 립.', ru: 'Фарфоровая кожа, лёгкий румянец, градиентные губы.' } },
  'rosy-bloom': { name: 'Rosy Bloom', tone: 'hong', pans: ['#E58F96', '#F0B5B0', '#C4746F'], note: { vi: 'Má hồng trải rộng, da căng bóng.', ko: '넓게 퍼진 핑크 볼, 촉촉한 피부.', ru: 'Широкие румяна, сияющая кожа.' } },
  'cherry-blush': { name: 'Cherry Blush', tone: 'hong', pans: ['#E07F8C', '#F3B7BC', '#8A5A5A'], note: { vi: 'Má hồng anh đào, môi căng mọng.', ko: '체리빛 볼, 도톰한 입술.', ru: 'Вишнёвые румяна, сочные губы.' } },
  'bare-glow': { name: 'Bare Glow', tone: 'nude', pans: ['#D79A8A', '#E9C0B0', '#A47B71'], note: { vi: 'Gần như không trang điểm — da khoẻ, môi tự nhiên.', ko: '안 한 듯한 메이크업 — 건강한 피부, 자연스러운 입술.', ru: 'Почти без макияжа — здоровая кожа, естественные губы.' } },
  'soft-daylight': { name: 'Soft Daylight', tone: 'nude', pans: ['#C98473', '#E2B4A2', '#996E61'], note: { vi: 'Tông nude ấm cho ánh sáng ban ngày.', ko: '낮 빛에 어울리는 따뜻한 누드 톤.', ru: 'Тёплый нюд для дневного света.' } },
}

const MOMENT_TEXT: Record<string, Omit<Moment, 'slug' | 'photo'>> = {
  'ivory-silk': { name: 'Ivory Silk', note: { vi: 'Áo dài lụa trắng, má hồng nhẹ.', ko: '흰 실크 아오자이, 은은한 볼.', ru: 'Белое шёлковое аозай, лёгкий румянец.' } },
  'flower-crown': { name: 'Flower Crown', note: { vi: 'Hoa cài tóc, má đào, nụ cười rạng rỡ.', ko: '꽃 헤어 장식, 피치 볼, 환한 미소.', ru: 'Цветы в волосах, персиковые щёки.' } },
  'soft-bun': { name: 'Soft Bun', note: { vi: 'Tóc búi thấp, nền trong, môi nude hồng.', ko: '로우 번, 맑은 베이스, 누드 핑크 립.', ru: 'Низкий пучок, прозрачный тон.' } },
  'cherry-clip': { name: 'Cherry Clip', note: { vi: 'Mắt to tròn, môi hồng, kẹp tóc nhỏ.', ko: '동그란 눈매, 핑크 립, 작은 헤어핀.', ru: 'Округлые глаза, розовые губы, заколка.' } },
  'honey-bronze': { name: 'Honey Bronze', note: { vi: 'Mắt nâu mật ong, tóc highlight.', ko: '허니 브라운 눈매, 하이라이트 헤어.', ru: 'Медово-коричневые глаза, мелирование.' } },
  'morning-coral': { name: 'Morning Coral', note: { vi: 'Má san hô, mái thưa, da căng.', ko: '코랄 볼, 시스루 뱅, 탱탱한 피부.', ru: 'Коралловые щёки, лёгкая чёлка.' } },
}

const S = sizes as unknown as { looks: Record<string, [number, number][]>; moments: Record<string, [number, number]>; artist: [number, number] }

export const looks: Look[] = photos.looks.map((p) => ({
  slug: p.slug,
  ...TEXT[p.slug],
  photos: S.looks[p.slug].map(([width, height], i) => ({ src: `/looks/${p.slug}/${i}.webp`, width, height, eff: p.eff })),
}))

export const moments: Moment[] = photos.moments.map((p) => ({
  slug: p.slug,
  ...MOMENT_TEXT[p.slug],
  photo: { src: `/moments/${p.slug}.webp`, width: S.moments[p.slug][0], height: S.moments[p.slug][1], eff: p.eff },
}))

export const artistPhoto: Photo = { src: '/artist.webp', width: S.artist[0], height: S.artist[1], eff: photos.artist.eff }

export const getLook = (slug: string) => looks.find((l) => l.slug === slug)
