import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'

// `hash` links jump to a section on the homepage; `to` links are separate pages.
const NAV = [
  { label: 'Fundraisers', hash: '/#fundraisers' },
  { label: 'Monthly giving', to: '/monthly/' },
  { label: 'Crowdfunding', to: '/crowdfunding/' },
  { label: 'How it works', hash: '/#how-it-works' },
  { label: 'About', to: '/about/' },
]

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
