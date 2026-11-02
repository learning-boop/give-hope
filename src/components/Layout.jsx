import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import usePageEffects from '../lib/usePageEffects'

export default function Layout() {
  const { pathname } = useLocation()
  usePageEffects(pathname)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
