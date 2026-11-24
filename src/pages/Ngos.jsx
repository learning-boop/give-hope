import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import NgoCard from '../components/NgoCard'
import { Photo } from '../components/ui'
import { CATEGORIES } from '../data/campaigns'
import { NGO_CITIES, cityPath, filterNgos } from '../data/ngos'
import NotFound from './NotFound'

const CAUSES = CATEGORIES.filter((c) => c.id !== 'urgent')

/**
 * The NGO directory: /ngos/ lists every verified NGO, /ngos/city/<city>/ only those in one city.
 * Search by name or place and filter by cause.
 */
export default function Ngos() {
  const { city: cityId } = useParams()
  const city = cityId ? NGO_CITIES.find((c) => c.id === cityId) : null
  const [cause, setCause] = useState('all')
  const [query, setQuery] = useState('')
  const [pickedCity, setPickedCity] = useState('')

  if (cityId && !city) return <NotFound />

  const activeCity = city?.id || pickedCity || null
  const list = filterNgos({ cause, city: activeCity, query })
  const place = city ? city.name : 'Andhra Pradesh and across India'

  return (
    <>
      <Seo
        title={city ? `Verified NGOs in ${city.name}` : 'Verified NGOs to donate to'}
        description={`Find and support verified NGOs in ${place}. Search by name or cause, see their work and donate with 80G tax benefits.`}
        path={city ? cityPath(city.id) : '/ngos/'}
      />

      <section className="dark-hero cause-hero ngo-hero-band">
        <div className="hero-bg">
          <Photo name="community-kitchen" alt="" priority />
        </div>
        <div className="container cause-hero__inner">
          <nav aria-label="Breadcrumb" className="cause-hero__crumbs load-in">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            {city ? (
              <>
                <Link to="/ngos/">NGOs</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{city.name}</span>
              </>
            ) : (
              <span aria-current="page">NGOs</span>
            )}
          </nav>
          <h1 className="display cause-hero__title">
            <span className="rise-line">
              <span>{city ? `Support NGOs in ${city.name}` : 'Support verified NGOs'}</span>
            </span>
          </h1>
          <p className="lead load-in" style={{ '--d': 1 }}>
            Every organisation here has been checked by our team: registration, 80G status, accounts and a visit to their
            work. Find one whose work moves you.
          </p>
          <div className="ngo-cities load-in" style={{ '--d': 2 }}>
            <Link to="/ngos/" className={`ngo-city-pill${city ? '' : ' is-active'}`}>
              All NGOs
            </Link>
            {NGO_CITIES.map((c) => (
              <Link to={cityPath(c.id)} className={`ngo-city-pill${city?.id === c.id ? ' is-active' : ''}`} key={c.id}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="ngo-list-title">
        <div className="container">
          <h2 className="sr-only" id="ngo-list-title">
            {city ? `NGOs in ${city.name}` : 'All NGOs'}
          </h2>
          <div className="ngo-tools">
            <form className="fr-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="ngo-search" className="sr-only">
                Search NGOs
              </label>
              <Icon name="search" size={20} className="fr-search__icon" />
              <input
                id="ngo-search"
                type="search"
                placeholder="Search by NGO name or place"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" className="fr-search__clear" aria-label="Clear search" onClick={() => setQuery('')}>
                  <Icon name="close" size={16} strokeWidth={2.4} />
                </button>
              )}
            </form>
            {!city && (
              <div className="ngo-tools__city">
                <label htmlFor="ngo-city" className="sr-only">
                  City
                </label>
                <select id="ngo-city" className="select" value={pickedCity} onChange={(e) => setPickedCity(e.target.value)}>
                  <option value="">All cities</option>
                  {NGO_CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="ngo-causes" role="group" aria-label="Filter NGOs by cause">
            {CAUSES.map((c) => (
              <button type="button" className="chip" aria-pressed={cause === c.id} onClick={() => setCause(c.id)} key={c.id}>
                {c.id === 'all' ? 'All causes' : c.label}
              </button>
            ))}
          </div>

          <p className="fr-count" aria-live="polite">
            {list.length} {list.length === 1 ? 'NGO' : 'NGOs'}
            {cause !== 'all' && (
              <>
                {' '}
                working on <strong>{CATEGORIES.find((c) => c.id === cause)?.label.toLowerCase()}</strong>
              </>
            )}
            {activeCity && !city && (
              <>
                {' '}
                in <strong>{NGO_CITIES.find((c) => c.id === activeCity)?.name}</strong>
              </>
            )}
          </p>

          {list.length > 0 ? (
            <div className="ngo-grid">
              {list.map((n) => (
                <NgoCard ngo={n} key={n.id} />
              ))}
            </div>
          ) : (
            <div className="cause-empty">
              <p className="body">No NGOs match this yet. We add organisations as soon as our team has verified them.</p>
              <button
                type="button"
                className="btn btn--dark"
                onClick={() => {
                  setCause('all')
                  setQuery('')
                  setPickedCity('')
                }}
              >
                Show all NGOs
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="ngo-join-title">
        <div className="container">
          <div className="ngo-join" data-reveal>
            <div>
              <span className="eyebrow">For NGOs</span>
              <h2 className="h2" id="ngo-join-title">
                Run a registered NGO? Raise funds on GiveHope
              </h2>
              <p className="body">Get verified once, then launch fundraisers, join monthly missions and reach donors across India.</p>
            </div>
            <Link to="/register-ngo/" className="btn btn--primary btn--lg">
              Register your NGO
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
