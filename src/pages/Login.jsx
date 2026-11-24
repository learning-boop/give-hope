import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { SITE } from '../site'

const NEEDS = [
  { icon: 'receipt', title: 'A copy of my 80G receipt', text: 'Tell us your name, email and donation date.' },
  { icon: 'repeat', title: 'Change, pause or cancel my monthly gift', text: 'Tell us the mission and the email you gave with.' },
  { icon: 'chart', title: 'Updates on a fundraiser I supported', text: 'Send us the fundraiser link.' },
]

/**
 * /login/ — donor and organiser accounts need the payments server, which is not set up yet.
 * Until then this page says so and offers the quickest way to get the same things done.
 */
export default function Login() {
  const wa = SITE.contact.whatsapp
  const waLink = (text) => `https://wa.me/${wa}?text=${encodeURIComponent(text)}`

  return (
    <>
      <Seo title="Log in" description="Donor and organiser accounts on GiveHope." path="/login/" noindex />
      <section className="section login-page">
        <div className="container login-page__inner">
          <span className="eyebrow">Your account</span>
          <h1 className="h2">Accounts are coming soon</h1>
          <p className="body">
            Soon you’ll be able to log in to see all your donations, download 80G receipts and manage monthly gifts. Until then,
            our team can do any of this for you — just ask.
          </p>

          <ul className="login-needs" role="list">
            {NEEDS.map((n) => (
              <li key={n.title}>
                <span className="icon-tile icon-tile--sm icon-tile--lime-tint">
                  <Icon name={n.icon} size={20} />
                </span>
                <span>
                  <strong>{n.title}</strong>
                  <span className="small">{n.text}</span>
                </span>
                {wa ? (
                  <a className="btn btn--outline" href={waLink(`Hi GiveHope, I need: ${n.title.toLowerCase()}.`)} target="_blank" rel="noopener">
                    Ask on WhatsApp
                  </a>
                ) : (
                  <Link className="btn btn--outline" to="/contact/">
                    Contact us
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <p className="small">
            Running a fundraiser or an NGO? Your fundraiser manager handles updates and withdrawals with you.{' '}
            <Link to="/contact/">Contact us</Link> if you need them.
          </p>
        </div>
      </section>
    </>
  )
}
