import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { ProgressBar } from './ui'
import { inr, num } from '../site'
import { campaigns, fundraiserPath, hasProgress, progressOf } from '../data/campaigns'

const AUTOPLAY_MS = 4000
const DRAG_THRESHOLD = 70

// One transparent cut-out per slide, each from a different cause. `width` caps how wide the picture may grow,
// so wide group shots stay clear of the text. Slides appear in this order.
const CUTOUTS = {
  'heart-surgery-for-a-6-year-old': { src: '/images/cutout-boy.webp', w: 1402, h: 1116, width: 580, position: 'right center', alt: 'A young boy in a hospital gown hugging a teddy bear, his mother holding him close' },
  'school-fees-for-girls-in-rural-schools': { src: '/images/cutout-students.webp', w: 1112, h: 1100, width: 580, alt: 'Two smiling schoolgirls in blue uniforms, one holding notebooks and one with a school bag' },
  'meals-and-medicines-for-elders-living-alone': { src: '/images/cutout-elder.webp', w: 1516, h: 996, width: 580, position: 'right center', alt: 'Two young volunteers sitting and smiling with an elderly couple' },
  'food-and-treatment-for-injured-street-dogs': { src: '/images/cutout-dog.webp', w: 1354, h: 1024, width: 580, position: 'right center', alt: 'A smiling young woman hugging a brown dog, with a second dog beside a food bowl' },
}

const SLIDES = Object.keys(CUTOUTS).map((slug) => campaigns.find((c) => c.slug === slug))

/** Home hero: each slide is a fundraiser. Slides change by themselves, with the arrows and dots, or by dragging sideways. */
export default function HeroSlider() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const stage = useRef(null)
  const drag = useRef(null)

  const count = SLIDES.length

  function go(step) {
    setDirection(step < 0 ? -1 : 1)
    setActive((current) => (current + step + count) % count)
  }

  function goTo(index) {
    setDirection(index < active ? -1 : 1)
    setActive(index)
  }

  // Keeps moving under the mouse. Stops only for keyboard focus inside it, a drag, or the pause button.
  useEffect(() => {
    if (!playing || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `go` only uses state setters and a constant
  }, [playing, held, active])

  function onPointerDown(e) {
    if (e.button !== 0 || e.target.closest('a, button')) return
    drag.current = { x: e.clientX, id: e.pointerId, dx: 0 }
    setHeld(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    stage.current.classList.add('is-dragging')
  }

  function onPointerMove(e) {
    if (!drag.current) return
    drag.current.dx = e.clientX - drag.current.x
    stage.current.style.setProperty('--drag', `${drag.current.dx}px`)
  }

  function endDrag() {
    if (!drag.current) return
    const { dx } = drag.current
    drag.current = null
    setHeld(false)
    stage.current.classList.remove('is-dragging')
    stage.current.style.setProperty('--drag', '0px')
    if (Math.abs(dx) > DRAG_THRESHOLD) go(dx < 0 ? 1 : -1)
  }

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Fundraisers that need you now"
      style={{ '--dir': direction }}
      onFocus={(e) => setHeld(e.target.matches(':focus-visible'))}
      onBlur={() => setHeld(false)}
    >
      <h1 className="sr-only">GiveHope — donate to verified fundraisers across India</h1>
      <div
        className="hero-slider__stage"
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {SLIDES.map((c, i) => {
          const position = i === active ? 'is-active' : i === (active - 1 + count) % count ? 'is-prev' : 'is-next'
          const path = fundraiserPath(c)
          const cutout = CUTOUTS[c.slug]
          return (
            <div
              className={`hero-slide ${position}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={i !== active}
              key={c.slug}
            >
              {/* The slide's cut-out stands on the right, beside its text */}
              <figure className="hero-figure" style={{ '--fig-w': `${cutout.width}px`, '--fig-pos': cutout.position }}>
                <span className="hero-figure__glow" aria-hidden="true" />
                <img
                  src={cutout.src}
                  width={cutout.w}
                  height={cutout.h}
                  alt={cutout.alt}
                  // All four are small; load them up front so a slide never arrives empty
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  decoding="async"
                />
                <figcaption className="photo-note">Illustrative photo</figcaption>
              </figure>
              <div className="container hero-slide__inner">
                <div className="hero-slide__copy">
                  <p className="hero-slide__kicker">
                    {c.urgent ? 'Urgent · ' : 'Support · '}
                    <span>{c.categoryLabel}</span>
                  </p>
                  <h2 className="display hero-slide__title">{c.title}</h2>
                  <p className="organiser">
                    <Icon name="badgeCheck" size={18} strokeWidth={2.2} />
                    <span>{c.organiser}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.location}</span>
                  </p>
                  <p className="lead">{c.summary}</p>
                  {hasProgress(c) && (
                    <div className="hero-slide__progress">
                      <ProgressBar percent={progressOf(c)} />
                      <div className="progress-meta">
                        <span>
                          <strong>{inr(c.raised)}</strong> of {inr(c.goal)}
                        </span>
                        {c.donors != null && <span>{num(c.donors)} donors</span>}
                      </div>
                    </div>
                  )}
                  <div className="cta-row">
                    <Link to={path} className="btn btn--primary btn--lg btn--pill">
                      Donate now
                    </Link>
                    <a href="#fundraisers" className="text-link text-link--ink">
                      See all fundraisers
                    </a>
                  </div>
                  <p className="hero-slide__secure">
                    <Icon name="lock" size={16} />
                    Secure payments by UPI, card and netbanking · 80G tax receipts
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" className="hero-arrow hero-arrow--prev" aria-label="Previous fundraiser" onClick={() => go(-1)}>
        <Icon name="arrowLeft" size={22} strokeWidth={2.2} />
      </button>
      <button type="button" className="hero-arrow hero-arrow--next" aria-label="Next fundraiser" onClick={() => go(1)}>
        <Icon name="arrowRight" size={22} strokeWidth={2.2} />
      </button>

      <div className="hero-controls">
        <span className="hero-count" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
          <span> / {String(count).padStart(2, '0')}</span>
        </span>
        {SLIDES.map((c, i) => (
          <button
            type="button"
            className="hero-dot"
            aria-label={`Show fundraiser ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
            key={c.slug}
          />
        ))}
        <button
          type="button"
          className="hero-pause"
          aria-label={playing ? 'Pause slides' : 'Play slides'}
          onClick={() => setPlaying(!playing)}
        >
          <Icon name={playing ? 'pause' : 'play'} size={16} strokeWidth={2.4} />
        </button>
      </div>
    </section>
  )
}
