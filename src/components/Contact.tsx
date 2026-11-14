import { BOOKING, BRAND, MORE } from '@/content/site'
import type { Dict } from '@/i18n/dict'

/** Chapter V: booking links. Facebook and Instagram are where bookings happen; TikTok and Threads are for following. */
export function Contact({ t }: { t: Dict }) {
  return (
    <section className="meet" id="meet" data-ch="4">
      <div className="kick">V</div>
      <h2 className="gold-text meet__title">{t.meet}</h2>
      <p className="meet__lead">{t.meetLead}</p>
      <div className="meet__acts">
        {BOOKING.map((b) => (
          <a key={b.id} className="btn-gold" href={b.href} target="_blank" rel="noopener" data-testid={`book-${b.id}`}>
            {b.label}
          </a>
        ))}
      </div>
      <div className="meet__more">
        <span>{t.also}</span>
        {MORE.map((m) => (
          <a key={m.id} href={m.href} target="_blank" rel="noopener">
            {m.label}
          </a>
        ))}
      </div>
      <small>
        {BRAND.toUpperCase()} · {t.area}
      </small>
    </section>
  )
}
