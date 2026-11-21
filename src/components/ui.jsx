import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { PHOTOS } from '../data/photos'

/** Eyebrow + heading + optional intro text */
export function SectionHead({ eyebrow, title, text, onDark = false, as: Tag = 'h2', id, children }) {
  return (
    <div className="section-head">
      {eyebrow && <span className={`eyebrow${onDark ? ' eyebrow--on-dark' : ''}`}>{eyebrow}</span>}
      <Tag className="h2" id={id} style={onDark ? { color: 'var(--white)' } : undefined}>
        {title}
      </Tag>
      {text && <p className="body">{text}</p>}
      {children}
    </div>
  )
}

/** Responsive image from public/images. `sizes` tells the browser how wide it renders. Pass alt="" when decorative. */
export function Photo({ name, alt, sizes = '100vw', priority = false, position, className = '' }) {
  return (
    <img
      className={`photo ${className}`}
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt ?? PHOTOS[name].alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
    />
  )
}

/**
 * Silent looping video from public/images/<name>.webm and .mp4, shown like a photo.
 * Its first frame (<name>-1600.webp) shows until it loads. It only downloads and plays while on screen,
 * and stays a still picture for visitors who ask their device for less motion.
 */
export function LoopVideo({ name, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    video.muted = true // browsers only autoplay muted video, and React doesn't always set the attribute
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto'
          video.play().catch(() => {}) // e.g. data saver blocks it: the poster stays
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    watcher.observe(video)
    return () => watcher.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={`photo ${className}`}
      poster={`/images/${name}-1600.webp`}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      role="img"
      aria-label={PHOTOS[name].alt}
    >
      <source src={`/images/${name}.webm`} type="video/webm" />
      <source src={`/images/${name}.mp4`} type="video/mp4" />
    </video>
  )
}

export function CheckList({ items, variant }) {
  return (
    <ul className={`check-list${variant ? ` check-list--${variant}` : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" size={20} strokeWidth={2.4} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProgressBar({ percent, large = false }) {
  const pct = Math.max(0, Math.min(100, percent || 0))
  return (
    <div className={`progress${large ? ' progress--lg' : ''}`} aria-hidden="true">
      <div className="progress__bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
