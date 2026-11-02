import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Photo } from './ui'

const AUTOPLAY_MS = 7000
const DRAG_THRESHOLD = 70

const SLIDES = [
  {
    eyebrow: 'Verified fundraisers across India',
    title: 'Your gift.',
    accent: 'Their second chance.',
    text: 'GiveHope connects you with verified fundraisers for medical care, education, disaster relief and animal welfare — and shows you how every rupee is spent.',
    primary: { label: 'Donate now', href: '#fundraisers' },
    secondary: { label: 'Start a fundraiser', to: '/crowdfunding/' },
    photos: ['children', 'students'],
  },
  {
    eyebrow: 'Crowdfunding',
    title: 'Raise funds for the causes',
    accent: 'you care about',
    text: 'Start a fundraiser for a medical emergency, an NGO project or your community. We verify it, help you share it, and send the money straight to where it is needed.',
    primary: { label: 'Start a fundraiser', to: '/crowdfunding/' },
    secondary: { label: 'How it works', to: '/crowdfunding/#how-crowdfunding-works' },
    photos: ['women-field', 'community'],
  },
  {
    eyebrow: 'Monthly giving',
    title: 'Be there for them',
    accent: 'every single month',
    text: 'One-off gifts help in a crisis. A monthly gift keeps the work going once the crisis has passed.',
    primary: { label: 'Join monthly', to: '/monthly/' },
    secondary: { label: 'Browse fundraisers', href: '#fundraisers' },
    photos: ['classroom', 'meal'],
  },
]

function SlideLink({ link, className, children }) {
  if (link.to) {
    return (
      <Link to={link.to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={link.href} className={className}>
      {children}
    </a>
  )
}

/** Home hero: slides change by themselves, with the arrows and dots, or by dragging sideways. */
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
      className="hero-slider leaf-bg leaf-bg--ink"
      aria-roledescription="carousel"
      aria-label="Ways to help"
      style={{ '--dir': direction }}
      onFocus={(e) => setHeld(e.target.matches(':focus-visible'))}
      onBlur={() => setHeld(false)}
    >
      <div
        className="hero-slider__stage"
        ref={stage}
        data-parallax
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {SLIDES.map((slide, i) => {
          const Heading = i === 0 ? 'h1' : 'h2'
          const position = i === active ? 'is-active' : i === (active - 1 + count) % count ? 'is-prev' : 'is-next'
          return (
            <div
              className={`hero-slide ${position}${i % 2 ? ' hero-slide--flip' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={i !== active}
              key={slide.eyebrow}
            >
              <div className="container hero-slide__inner">
                <div className="hero-slide__copy">
                  <p className="hero-slide__eyebrow">{slide.eyebrow}</p>
                  <Heading className="display hero-slide__title">
                    {slide.title} <span className="accent">{slide.accent}</span>
                  </Heading>
                  <p className="lead">{slide.text}</p>
                  <div className="cta-row">
                    <SlideLink link={slide.primary} className="btn btn--primary btn--lg">
                      {slide.primary.label} <Icon name="arrowRight" size={20} strokeWidth={2.2} />
                    </SlideLink>
                    <SlideLink link={slide.secondary} className="text-link text-link--ink">
                      {slide.secondary.label}
                    </SlideLink>
                  </div>
                </div>
                <div className="collage">
                  <span className="collage__glow" aria-hidden="true" />
                  <div className="collage__main">
                    <Photo name={slide.photos[0]} alt="" priority={i === 0} sizes="(max-width: 900px) 80vw, 520px" />
                  </div>
                  <div className="collage__small">
                    <Photo name={slide.photos[1]} alt="" sizes="(max-width: 900px) 45vw, 300px" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" className="hero-arrow hero-arrow--prev" aria-label="Previous slide" onClick={() => go(-1)}>
        <Icon name="arrowLeft" size={22} strokeWidth={2.2} />
      </button>
      <button type="button" className="hero-arrow hero-arrow--next" aria-label="Next slide" onClick={() => go(1)}>
        <Icon name="arrowRight" size={22} strokeWidth={2.2} />
      </button>

      <div className="hero-controls">
        {SLIDES.map((slide, i) => (
          <button
            type="button"
            className="hero-dot"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
            key={slide.eyebrow}
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
