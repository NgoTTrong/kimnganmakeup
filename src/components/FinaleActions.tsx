'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { CHANNEL_LABEL, CHANNEL_URL, type Channel } from '@/content/site'

const ICON: Record<Channel, string> = {
  instagram: 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
  facebook: 'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z',
}

/** Leans toward the pointer a few px (fine pointers, motion allowed); springs back on leave. */
function magnet(e: PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`)
}
function release(e: PointerEvent<HTMLAnchorElement>) {
  e.currentTarget.style.removeProperty('--mx')
  e.currentTarget.style.removeProperty('--my')
}

/**
 * Booking actions of the footer finale: a ready-to-send message with a blank for the date, a copy
 * button, and the booking channels of this language (the first one is the main button).
 */
export function FinaleActions({
  template,
  label,
  copy,
  copied,
  channels,
}: {
  template: string
  label: string
  copy: string
  copied: string
  channels: Channel[]
}) {
  const [done, setDone] = useState(false)
  const timer = useRef<number>(undefined)
  const message = template

  useEffect(() => {
    const root = document.documentElement
    // the floating book button steps aside while the finale (which has the same links) is on screen
    const footer = document.getElementById('contact')
    const io = new IntersectionObserver(([e]) => (root.dataset.finale = String(e.isIntersecting)), { rootMargin: '0px 0px -30% 0px' })
    if (footer) io.observe(footer)
    return () => {
      io.disconnect()
      delete root.dataset.finale
      clearTimeout(timer.current)
    }
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
    } catch {
      return // clipboard blocked: the message stays visible to copy by hand
    }
    setDone(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setDone(false), 3500)
  }

  return (
    <div className="finale__actions">
      <figure className="finale__message">
        <figcaption>{label}</figcaption>
        <blockquote data-message>{message}</blockquote>
        <button type="button" className="finale__copy" data-testid="copy-message" onClick={onCopy} aria-live="polite">
          {done ? copied : copy}
        </button>
      </figure>
      <div className="finale__channels">
        {channels.map((k) => (
          <a
            key={k}
            href={CHANNEL_URL[k]}
            target="_blank"
            rel="noopener"
            className={`finale__channel finale__channel--${k}`}
            onPointerMove={magnet}
            onPointerLeave={release}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden fill="currentColor">
              <path d={ICON[k]} />
            </svg>
            {CHANNEL_LABEL[k]}
          </a>
        ))}
      </div>
    </div>
  )
}
