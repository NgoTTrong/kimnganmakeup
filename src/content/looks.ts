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
  'berry-garden': { name: 'Berry Garden', tone: 'hong', pans: ['#E8909A', '#EF7F7A', '#A8746A'], note: { vi: 'Má hồng điểm nhũ, môi cam hồng căng mọng, nơ đỏ cài tóc.', ko: '글리터 포인트 핑크 볼, 촉촉한 코랄 핑크 립, 빨간 리본.', ru: 'Розовые румяна с блёстками, сочные коралловые губы, красный бант.' } },
  'brick-curl': { name: 'Brick Curl', tone: 'tram', pans: ['#D98A7E', '#B5544D', '#4A3330'], note: { vi: 'Eyeliner sắc, môi đỏ gạch, tóc xoăn lọn nhuộm nâu.', ko: '선명한 아이라인, 브릭 레드 립, 브라운 컬 헤어.', ru: 'Чёткие стрелки, кирпичные губы, каштановые локоны.' } },
  'ivory-shirt': { name: 'Ivory Shirt', tone: 'dao', pans: ['#E9A28E', '#C9645C', '#8F6C5E'], note: { vi: 'Nền mỏng, má cam đào, môi đỏ nhẹ, tóc sóng dài.', ko: '얇은 베이스, 피치 볼, 은은한 레드 립, 긴 웨이브.', ru: 'Лёгкий тон, персиковые щёки, мягкий красный, длинные волны.' } },
  'peony-blush': { name: 'Peony Blush', tone: 'dao', pans: ['#F08C80', '#E9707A', '#C99A9A'], note: { vi: 'Má đào phủ rộng, mắt nhũ hồng, hoa mẫu đơn cài tóc.', ko: '넓게 펴 바른 피치 볼, 핑크 글리터 눈매, 작약 헤어 장식.', ru: 'Широкие персиковые румяна, розовое сияние век, пионы в волосах.' } },
  'silk-braids': { name: 'Silk Braids', tone: 'hong', pans: ['#E7A7B2', '#D9848C', '#7A5C5A'], note: { vi: 'Áo dài trắng, tóc tết bồng, má hồng điểm sao nhũ.', ko: '흰 아오자이, 볼륨 땋은 머리, 별 글리터 핑크 볼.', ru: 'Белое аозай, объёмные косы, румяна со звёздочками.' } },
  'winged-sculpt': { name: 'Winged Sculpt', tone: 'tram', pans: ['#C98A6E', '#C77A5E', '#2E2420'], note: { vi: 'Mắt kẻ cánh đậm, tạo khối rõ, môi nude cam, tóc buộc thấp.', ko: '진한 윙 아이라인, 또렷한 윤곽, 누드 오렌지 립, 로우 포니테일.', ru: 'Выразительные стрелки, чёткая скульптура, нюдово-оранжевые губы.' } },
  'twin-braids': { name: 'Twin Braids', tone: 'hong', pans: ['#EBA9AA', '#E3857E', '#8C6B66'], note: { vi: 'Nền sáng trong, má hồng nhạt, mi cong, tóc tết hai bên.', ko: '맑은 베이스, 연한 핑크 볼, 컬링 속눈썹, 양갈래 땋은 머리.', ru: 'Светлый прозрачный тон, нежный румянец, две косы.' } },
  'cream-lace': { name: 'Cream Lace', tone: 'nude', pans: ['#E6A39C', '#C98C86', '#8A6A5E'], note: { vi: 'Má hồng vắt ngang sống mũi, môi nude hồng, tóc rẽ ngôi giữa.', ko: '콧등까지 이어진 핑크 볼, 누드 핑크 립, 가운데 가르마.', ru: 'Румяна через переносицу, нюдово-розовые губы, прямой пробор.' } },
}

const MOMENT_TEXT: Record<string, Omit<Moment, 'slug' | 'photo'>> = {
  'ivory-silk': { name: 'Ivory Silk', note: { vi: 'Áo dài lụa trắng, má hồng nhẹ.', ko: '흰 실크 아오자이, 은은한 볼.', ru: 'Белое шёлковое аозай, лёгкий румянец.' } },
  'flower-crown': { name: 'Flower Crown', note: { vi: 'Hoa cài tóc, má đào, nụ cười rạng rỡ.', ko: '꽃 헤어 장식, 피치 볼, 환한 미소.', ru: 'Цветы в волосах, персиковые щёки.' } },
  'soft-bun': { name: 'Soft Bun', note: { vi: 'Tóc búi thấp, nền trong, môi nude hồng.', ko: '로우 번, 맑은 베이스, 누드 핑크 립.', ru: 'Низкий пучок, прозрачный тон.' } },
  'cherry-clip': { name: 'Cherry Clip', note: { vi: 'Mắt to tròn, môi hồng, kẹp tóc nhỏ.', ko: '동그란 눈매, 핑크 립, 작은 헤어핀.', ru: 'Округлые глаза, розовые губы, заколка.' } },
  'honey-bronze': { name: 'Honey Bronze', note: { vi: 'Mắt nâu mật ong, tóc highlight.', ko: '허니 브라운 눈매, 하이라이트 헤어.', ru: 'Медово-коричневые глаза, мелирование.' } },
  'morning-coral': { name: 'Morning Coral', note: { vi: 'Má san hô, mái thưa, da căng.', ko: '코랄 볼, 시스루 뱅, 탱탱한 피부.', ru: 'Коралловые щёки, лёгкая чёлка.' } },
  'lace-bloom': { name: 'Lace Bloom', note: { vi: 'Tóc thả bồng, má hồng tròn, môi hồng ngọt.', ko: '볼륨 있는 생머리, 동그란 핑크 볼, 달콤한 핑크 립.', ru: 'Пышные волосы, круглые румяна, сладкие розовые губы.' } },
  tangerine: { name: 'Tangerine', note: { vi: 'Nền ấm, má cam, eyeliner mảnh.', ko: '따뜻한 베이스, 오렌지 볼, 얇은 아이라인.', ru: 'Тёплый тон, оранжевые щёки, тонкая стрелка.' } },
  'black-ribbon': { name: 'Black Ribbon', note: { vi: 'Tóc búi cao, khăn đen quấn cổ, má hồng nhẹ.', ko: '높은 번, 검은 넥 스카프, 은은한 핑크 볼.', ru: 'Высокий пучок, чёрный шарф на шее, лёгкий румянец.' } },
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
