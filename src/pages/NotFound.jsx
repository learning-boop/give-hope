import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="not-found">
        <div className="container stack" style={{ '--stack-gap': '20px' }}>
          <span className="eyebrow">404</span>
          <h1 className="h2">We couldn’t find that page</h1>
          <p className="body">The fundraiser may have ended, or the link may be mistyped.</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn--primary">
              Browse fundraisers
            </Link>
            <Link to="/crowdfunding/" className="btn btn--outline">
              Start a fundraiser
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
