import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { CATEGORIES } from '../data/campaigns'
import { CAUSE_DETAILS, causePath } from '../data/causes'
import { MONTHLY_PLANS, missionPath } from '../data/monthly'
import { NGO_CITIES, cityPath } from '../data/ngos'

// `hash` links jump to a section on the homepage; `to` links are separate pages.
// Monthly giving and Crowdfunding live inside the Donate menu and the footer.
const NAV = [
  { label: 'Fundraisers', hash: '/#fundraisers' },
  { label: 'NGOs', to: '/ngos/' },
  { label: 'Our impact', to: '/impact/' },
]

const CAUSES = CATEGORIES.filter((cat) => CAUSE_DETAILS[cat.id]?.photo)

const WAYS = [
  { icon: 'receipt', title: 'Give once', text: 'Support a verified fundraiser today', href: '/#fundraisers' },
  { icon: 'users', title: 'Start a fundraiser', text: 'Raise funds for someone in need', to: '/crowdfunding/' },
  { icon: 'shieldCheck', title: 'Register your NGO', text: 'Raise funds for your organisation', to: '/register-ngo/' },
  { icon: 'gift', title: 'Gift cards', text: 'A donation gift for any occasion', to: '/gift-cards/' },
]

const ABOUT = [
  { title: 'Our story', text: 'Why GiveHope exists', to: '/about/' },
  { title: 'How your donation works', text: 'From screening to reporting back', to: '/how-your-donation-works/' },
  { title: 'Our impact', text: 'What your gifts achieved', to: '/impact/' },
  { title: 'Documents and reports', text: 'Registrations and audits', to: '/documents/' },
  { title: 'Blog', text: 'Guides and stories', to: '/blog/' },
  { title: 'Festival calendar', text: 'Give on special days', to: '/indian-festival-calendar/' },
  { title: 'Join us', text: 'Work, intern or volunteer', to: '/careers/' },
  { title: 'Contact us', text: 'We reply on WhatsApp', to: '/contact/' },
]

/**
 * Open/close behaviour shared by the navbar menus: click to toggle, hover on desktop (with a short grace period so
 * the pointer can travel into the panel), and close on Escape (focus returns to the button) or a click elsewhere.
 */
function useNavMenu(onNavigate) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrap.current?.querySelector('button')?.focus()
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

  return { open, setOpen, wrap, hover, done }
}

/** "About" in the navbar: a short list of pages about GiveHope. */
function AboutMenu({ onNavigate }) {
  const { open, setOpen, wrap, hover, done } = useNavMenu(onNavigate)
  return (
    <div className={`donate-menu about-menu${open ? ' is-open' : ''}`} ref={wrap} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      <button type="button" className="donate-menu__toggle" aria-expanded={open} aria-controls="about-panel" onClick={() => setOpen(!open)}>
        About
        <Icon name="chevronDown" size={16} strokeWidth={2.4} className="donate-menu__chevron" />
      </button>
      <div id="about-panel" className="about-panel" hidden={!open}>
        <ul role="list">
          {ABOUT.map((a) => (
            <li key={a.to}>
              <Link to={a.to} className="about-link" onClick={done}>
                <span className="donate-cause__label">{a.title}</span>
                <span className="donate-cause__line">{a.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** "Donate" in the navbar: a menu of every cause, plus the ways to give. */
function DonateMenu({ onNavigate }) {
  const { open, setOpen, wrap, hover, done } = useNavMenu(onNavigate)

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
        <div className="donate-panel__missions">
          <p className="donate-panel__title">Monthly missions</p>
          <ul className="donate-panel__list" role="list">
            {MONTHLY_PLANS.map((m) => (
              <li key={m.id}>
                <Link to={missionPath(m.id)} className="donate-mission" onClick={done}>
                  <span className="donate-mission__icon">
                    <Icon name={CAUSE_DETAILS[m.cause]?.icon || 'repeat'} size={16} strokeWidth={2.2} />
                  </span>
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/monthly/" className="text-link donate-panel__all" onClick={done}>
            All missions <Icon name="arrowRight" size={16} strokeWidth={2.4} />
          </Link>

          <p className="donate-panel__title donate-panel__title--gap">NGOs near you</p>
          <div className="donate-panel__cities">
            {NGO_CITIES.map((c) => (
              <Link to={cityPath(c.id)} onClick={done} key={c.id}>
                {c.name}
              </Link>
            ))}
            <Link to="/ngos/" onClick={done}>
              All NGOs
            </Link>
          </div>
        </div>

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
          <AboutMenu onNavigate={() => setOpen(false)} />
          <Link className="mobile-only" to="/login/" onClick={() => setOpen(false)}>
            Log in
          </Link>
        </nav>

        <div className="site-header__actions">
          <Link to="/#fundraisers" className="icon-btn site-header__search" aria-label="Search fundraisers">
            <Icon name="search" size={20} />
          </Link>
          <Link to="/login/" className="site-header__login">
            Log in
          </Link>
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
