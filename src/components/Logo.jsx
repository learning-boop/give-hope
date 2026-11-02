import { Link } from 'react-router-dom'

// The artwork has black lettering on a transparent background, so on dark sections it sits on a white plate.
export default function Logo({ onDark = false }) {
  return (
    <Link to="/" className={`logo${onDark ? ' logo--on-dark' : ''}`} aria-label="Give Hope home">
      <img className="logo__image" src="/images/logo.png" width="564" height="187" alt="Give Hope, an initiative of CHANGE NGO" />
    </Link>
  )
}
