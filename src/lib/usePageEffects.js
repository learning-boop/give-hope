import { useEffect } from 'react'

const COUNT_MS = 1600

// Counts the number inside `el` up from zero, keeping any text around it ("₹5,00,000+").
// Placeholders such as "[Number]" contain no digits, so they are left alone.
function countUp(el) {
  const match = /\d[\d,]*/.exec(el.textContent)
  if (!match) return
  const target = Number(match[0].replace(/,/g, ''))
  const [before, after] = el.textContent.split(match[0])
  const start = performance.now()
  function tick(now) {
    // The first frame's timestamp can be slightly earlier than `start`
    const progress = Math.min(Math.max(now - start, 0) / COUNT_MS, 1)
    const eased = 1 - (1 - progress) ** 3
    el.textContent = before + Math.round(target * eased).toLocaleString('en-IN') + after
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/**
 * Client-only motion. Content is fully visible in the prerendered HTML: only elements still below
 * the fold get hidden, once JS has loaded, so nothing depends on these effects to be readable.
 *  - [data-reveal]    arrives when scrolled into view: up by default, or "left", "right", "zoom", "flip"
 *                     (set --d on it to stagger)
 *  - [data-count]     counts its number up when scrolled into view
 *  - [data-spotlight] sets --mx / --my for a glow that follows the pointer
 *  - [data-parallax]  sets --px / --py (-1 to 1) for layers that drift with the pointer
 *  - .site-header     gets .is-scrolled once the page has moved
 */
export default function usePageEffects(pathname) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.remove('is-pending')
          if (entry.target.hasAttribute('data-count')) countUp(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    const items = [...document.querySelectorAll('[data-reveal]')]
    for (const el of items) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue
      el.classList.add('is-pending')
      observer.observe(el)
    }
    for (const el of document.querySelectorAll('[data-count]')) observer.observe(el)
    return () => {
      observer.disconnect()
      for (const el of items) el.classList.remove('is-pending')
    }
  }, [pathname])

  useEffect(() => {
    const header = document.querySelector('.site-header')
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const canHover = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    function onPointerMove(e) {
      if (!(e.target instanceof Element)) return
      const spot = e.target.closest('[data-spotlight]')
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`)
        spot.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      const stage = e.target.closest('[data-parallax]')
      if (stage) {
        const r = stage.getBoundingClientRect()
        stage.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
        stage.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
      }
    }
    if (canHover) document.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, [])
}
