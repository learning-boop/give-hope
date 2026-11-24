import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Photo } from './ui'
import { CATEGORIES } from '../data/campaigns'
import { cityName, ngoPath } from '../data/ngos'
import { num } from '../site'

const causeLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id
const compact = (n) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(1)} Cr+` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1)} L+` : `₹${num(n)}`)

/** One NGO in the directory: photo, name, place, causes, figures (once real) and two actions. */
export default function NgoCard({ ngo }) {
  const path = ngoPath(ngo.id)
  return (
    <article className="ngo-card">
      <Link to={path} className="ngo-card__photo" tabIndex={-1} aria-hidden="true">
        <Photo name={ngo.photo} alt="" sizes="(max-width: 720px) 100vw, 380px" />
        {ngo.sample && <span className="ngo-card__sample">Sample listing</span>}
      </Link>
      <div className="ngo-card__body">
        <h3 className="feature__title">
          <Link to={path}>{ngo.name}</Link>
        </h3>
        <p className="ngo-card__place">
          <Icon name="mapPin" size={16} />
          {cityName(ngo.city)}, {ngo.state}
          {!ngo.sample && (
            <span className="ngo-card__verified">
              <Icon name="badgeCheck" size={16} strokeWidth={2.2} /> {ngo.operator ? 'Runs GiveHope' : 'Verified'}
            </span>
          )}
        </p>
        <ul className="ngo-card__causes" role="list">
          {ngo.causes.slice(0, 3).map((c) => (
            <li key={c}>{causeLabel(c)}</li>
          ))}
          {ngo.causes.length > 3 && <li>+{ngo.causes.length - 3} more</li>}
        </ul>
        {(ngo.raised != null || ngo.donations != null) && (
          <p className="ngo-card__figures">
            {ngo.raised != null && (
              <span>
                <strong>{compact(ngo.raised)}</strong> raised
              </span>
            )}
            {ngo.donations != null && (
              <span>
                <strong>{num(ngo.donations)}</strong> donations
              </span>
            )}
          </p>
        )}
        <div className="ngo-card__actions">
          <Link to={`/donate/ngo/${ngo.id}/`} className="btn btn--primary">
            Donate now
          </Link>
          <Link to={path} className="btn btn--outline">
            View profile
          </Link>
        </div>
      </div>
    </article>
  )
}
