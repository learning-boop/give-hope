import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const TONES = ['coral', 'lime', 'sand', 'ink']

/** A row of colourful cards that scrolls sideways, with the next card peeking in. Arrows appear on larger screens. */
export default function OfferRow({ items, kind, label }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = track.current
    if (!el) return undefined
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const move = (dir) => {
    const el = track.current
    const card = el.querySelector('.offer-card')
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 16 : el.clientWidth), behavior: 'smooth' })
  }

  return (
    <div className="offer-row">
      <div className="offer-row__nav">
        <button type="button" className="icon-btn offer-row__arrow" aria-label={`Previous ${label}`} onClick={() => move(-1)} disabled={edge.start}>
          <Icon name="arrowLeft" size={20} strokeWidth={2.2} />
        </button>
        <button type="button" className="icon-btn offer-row__arrow" aria-label={`Next ${label}`} onClick={() => move(1)} disabled={edge.end}>
          <Icon name="arrowRight" size={20} strokeWidth={2.2} />
        </button>
      </div>
      <ul className="offer-row__track" ref={track} role="list" aria-label={label}>
        {items.map((item, i) => {
          const className = `offer-card offer-card--${TONES[i % TONES.length]}`
          const inner = (
            <>
              <span className="offer-card__body">
                <span className="offer-card__tag">{[kind, item.tag].filter(Boolean).join(' · ')}</span>
                <span className="offer-card__name">{item.name}</span>
                <span className="offer-card__text">{item.text}</span>
                <span className="offer-card__go">
                  {item.cta ?? 'Know more'} <Icon name="arrowRight" size={16} strokeWidth={2.4} />
                  {!item.to && <span className="sr-only"> (opens change.ngo in a new tab)</span>}
                </span>
              </span>
              <img
                className="offer-card__img"
                src={`/images/offer-${item.id}.webp`}
                width="360"
                height="400"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </>
          )
          return (
            <li key={item.id}>
              {/* `to` links stay on GiveHope; `href` links open change.ngo in a new tab */}
              {item.to?.includes('#') ? (
                // A plain link so the browser jumps to the section (the router ignores the # part)
                <a href={item.to} className={className}>
                  {inner}
                </a>
              ) : item.to ? (
                <Link to={item.to} className={className}>
                  {inner}
                </Link>
              ) : (
                <a href={item.href} className={className} target="_blank" rel="noopener">
                  {inner}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
