import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../site'

const SOCIAL_LABELS = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', x: 'X' }

const COLUMNS = [
  {
    title: 'Give',
    links: [
      { label: 'Browse fundraisers', href: '/#fundraisers' },
      { label: 'Urgent needs', href: '/#fundraisers' },
      { label: 'Monthly missions', to: '/monthly/' },
      { label: 'NGOs', to: '/ngos/' },
      { label: 'Gift cards', to: '/gift-cards/' },
      { label: 'Tax benefits', href: '/#faq' },
    ],
  },
  {
    title: 'Fundraise',
    links: [
      { label: 'Crowdfunding', to: '/crowdfunding/' },
      { label: 'Register your NGO', to: '/register-ngo/' },
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
      { label: 'Our impact', to: '/impact/' },
      { label: 'How your donation works', to: '/how-your-donation-works/' },
      { label: 'Blog', to: '/blog/' },
      { label: 'Festival calendar', to: '/indian-festival-calendar/' },
      { label: 'Careers', to: '/careers/' },
      { label: 'Contact', to: '/contact/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy-policy/' },
      { label: 'Terms of use', to: '/terms/' },
      { label: 'Refund policy', to: '/refund-policy/' },
    ],
  },
]

export default function Footer() {
  const { contact, registration } = SITE
  const socials = Object.entries(SITE.social || {}).filter(([, url]) => url)
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
            <p className="site-footer__org">
              An initiative of <strong>{SITE.organisation.name}</strong> · {SITE.organisation.tagline}
            </p>
            <address className="site-footer__contact" style={{ fontStyle: 'normal' }}>
              <span>{contact.address}</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">
                  WhatsApp +{contact.whatsapp.slice(0, 2)} {contact.whatsapp.slice(2, 7)} {contact.whatsapp.slice(7)}
                </a>
              )}
            </address>
            {socials.length > 0 && (
              <ul className="site-footer__social" role="list" aria-label="GiveHope on social media">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener">
                      {SOCIAL_LABELS[key]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
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
        <p className="site-footer__credit">
          Photos are illustrative — stock images from Unsplash and AI-generated illustrations — and do not show fundraiser
          beneficiaries. Stories and photos of beneficiaries, including children, are shared only with their or their
          guardians’ consent, to raise awareness and donations for their cause.
        </p>
        <p className="site-footer__script" aria-hidden="true">
          Your gift. Their second chance.
        </p>
      </div>
    </footer>
  )
}
