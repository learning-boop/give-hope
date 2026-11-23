import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { CATEGORIES } from '../data/campaigns'
import { CAUSE_DETAILS, causePath } from '../data/causes'

// `hash` links jump to a section on the homepage; `to` links are separate pages.
// Monthly giving and Crowdfunding live inside the Donate menu and the footer.
const NAV = [
  { label: 'Fundraisers', hash: '/#fundraisers' },
  { label: 'How it works', hash: '/#how-it-works' },
  { label: 'About', to: '/about/' },
]

const CAUSES = CATEGORIES.filter((cat) => CAUSE_DETAILS[cat.id]?.photo)

const WAYS = [
  { icon: 'receipt', title: 'Give once', text: 'Support a verified fundraiser today', href: '/#fundraisers' },
  { icon: 'pulse', title: 'Give every month', text: 'Steady help for causes you care about', to: '/monthly/' },
  { icon: 'users', title: 'Start a fundraiser', text: 'Raise funds for someone in need', to: '/crowdfunding/' },
  { icon: 'shieldCheck', title: 'Register your NGO', text: 'Raise funds for your organisation', to: '/register-ngo/' },
]

/** "Donate" in the navbar: a menu of every cause, plus the ways to give. */
function DonateMenu({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const closeTimer = useRef(null)

  // Close on Escape or a click elsewhere
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrap.current?.querySelector('.donate-menu__toggle')?.focus()
      }
    }
    const onClick = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  // On desktop it also opens on hover, with a short grace period so the pointer can travel into the panel
  const hover = (value) => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1141px)').matches) return
    clearTimeout(closeTimer.current)
    if (value) setOpen(true)
    else closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  const done = () => {
    setOpen(false)
    onNavigate()
  }

  return (
    <div
      className={`donate-menu${open ? ' is-open' : ''}`}
      ref={wrap}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
    >
      <button
        type="button"
        className="donate-menu__toggle"
        aria-expanded={open}
        aria-controls="donate-panel"
        onClick={() => setOpen(!open)}
      >
        Donate
        <Icon name="chevronDown" size={16} strokeWidth={2.4} className="donate-menu__chevron" />
      </button>

      <div id="donate-panel" className="donate-panel" hidden={!open}>
        <div className="donate-panel__causes">
          <p className="donate-panel__title">Donate by cause</p>
          <ul className="donate-panel__grid" role="list">
            {CAUSES.map((cat) => {
              const { photo, icon, text } = CAUSE_DETAILS[cat.id]
              return (
                <li key={cat.id}>
                  <Link to={causePath(cat.id)} className="donate-cause" onClick={done}>
                    <span className="donate-cause__photo">
                      <img src={`/images/${photo}-thumb.webp`} width="240" height="240" alt="" loading="lazy" decoding="async" />
                      <span className="donate-cause__icon">
                        <Icon name={icon} size={11} strokeWidth={2.6} />
                      </span>
                    </span>
                    <span className="donate-cause__text">
                      <span className="donate-cause__label">{cat.label}</span>
                      <span className="donate-cause__line">{text}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <a href="/#fundraisers" className="text-link donate-panel__all" onClick={done}>
            See all fundraisers <Icon name="arrowRight" size={16} strokeWidth={2.4} />
          </a>
        </div>

        <div className="donate-panel__ways">
          <p className="donate-panel__title">Ways to give</p>
          {WAYS.map((w) => {
            const inner = (
              <>
                <span className="donate-way__icon">
                  <Icon name={w.icon} size={18} strokeWidth={2.2} />
                </span>
                <span className="donate-cause__text">
                  <span className="donate-cause__label">{w.title}</span>
                  <span className="donate-cause__line">{w.text}</span>
                </span>
              </>
            )
            return w.to ? (
              <Link to={w.to} className="donate-way" onClick={done} key={w.title}>
                {inner}
              </Link>
            ) : (
              <a href={w.href} className="donate-way" onClick={done} key={w.title}>
                {inner}
              </a>
            )
          })}
          <p className="donate-panel__note">
            <Icon name="shieldCheck" size={16} strokeWidth={2.2} />
            Every fundraiser is verified · 80G tax receipts
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const location = useLocation()
  const here = location.pathname + location.hash
  // The menu remembers which URL it was opened on, so it closes by itself after navigation
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === here
  const setOpen = (value) => setOpenOn(value ? here : null)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />

        <nav id="site-nav" aria-label="Main" className={`site-nav${open ? ' is-open' : ''}`}>
          <DonateMenu onNavigate={() => setOpen(false)} />
          {NAV.map((item) =>
            item.to ? (
              <NavLink key={item.label} to={item.to}>
                {item.label}
              </NavLink>
            ) : (
              <a key={item.label} href={item.hash} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ),
          )}
          <a className="mobile-only" href="#login">
            Log in
          </a>
        </nav>

        <div className="site-header__actions">
          <Link to="/#fundraisers" className="icon-btn site-header__search" aria-label="Search fundraisers">
            <Icon name="search" size={20} />
          </Link>
          <a href="#login" className="site-header__login">
            Log in
          </a>
          <a href="/#fundraisers" className="btn btn--primary site-header__donate">
            Donate
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
