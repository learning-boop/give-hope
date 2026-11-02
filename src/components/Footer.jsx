import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../site'

// Links pointing at "#" are pages still to be built — swap in real routes as you add them.
const COLUMNS = [
  {
    title: 'Give',
    links: [
      { label: 'Browse fundraisers', href: '/#fundraisers' },
      { label: 'Urgent needs', href: '/#fundraisers' },
      { label: 'Monthly giving', to: '/monthly/' },
      { label: 'Tax benefits', href: '/#faq' },
    ],
  },
  {
    title: 'Fundraise',
    links: [
      { label: 'Crowdfunding', to: '/crowdfunding/' },
      { label: 'How it works', to: '/crowdfunding/#how-crowdfunding-works' },
      { label: 'Fees', to: '/crowdfunding/#fees' },
      { label: 'Documents needed', to: '/crowdfunding/#documents' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our story', to: '/about/' },
      { label: 'Documents and reports', to: '/documents/' },
      { label: 'Our impact', href: '/#impact' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: `mailto:${SITE.contact.email}` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of use', href: '#' },
      { label: 'Refund policy', href: '#' },
    ],
  },
]

export default function Footer() {
  const { contact, registration } = SITE
  return (
    <footer className="site-footer leaf-bg">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo onDark />
            <p>
              GiveHope helps people across India raise funds for medical care, education, relief and animal welfare —
              openly and accountably.
            </p>
            <address className="site-footer__contact" style={{ fontStyle: 'normal' }}>
              <span>{contact.address}</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>
            </address>
          </div>

          <div className="site-footer__cols">
            {COLUMNS.map((col) => (
              <nav key={col.title} className="site-footer__col" aria-label={col.title}>
                <h2>{col.title}</h2>
                {col.links.map((l) =>
                  l.to ? (
                    <Link key={l.label} to={l.to}>
                      {l.label}
                    </Link>
                  ) : (
                    <a key={l.label} href={l.href}>
                      {l.label}
                    </a>
                  ),
                )}
              </nav>
            ))}
          </div>
        </div>

        <p className="site-footer__reg">
          <span>Registered as {registration.type}</span>
          <span>12A: {registration.twelveA}</span>
          <span>80G: {registration.eightyG}</span>
          <span>CSR-1: {registration.csr1}</span>
        </p>

        <div className="site-footer__bottom">
          {/* eslint-disable-next-line no-undef -- injected by vite.config.js */}
          <span>© {__BUILD_YEAR__} GiveHope. All rights reserved.</span>
          <span>Payments secured by {SITE.paymentGateway} · UPI · Cards · Netbanking</span>
        </div>
        <p className="site-footer__credit">Photos are illustrative stock images from Unsplash and do not show fundraiser beneficiaries.</p>
        <p className="site-footer__script" aria-hidden="true">
          Your gift. Their second chance.
        </p>
      </div>
    </footer>
  )
}
