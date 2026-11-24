import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import OfferRow from '../components/OfferRow'
import { shareFundraiser } from '../lib/share'
import { Photo } from '../components/ui'
import { CATEGORIES, campaigns } from '../data/campaigns'
import { PROJECTS } from '../data/change-work'
import { causePath } from '../data/causes'
import { cityName, cityPath, getNgo, ngoPath } from '../data/ngos'
import { num } from '../site'
import NotFound from './NotFound'

const causeLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id
const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const compact = (n) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(1)} Cr+` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1)} L+` : `₹${num(n)}`)

const SOCIAL = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'twitter', label: 'X (Twitter)' },
]

/** /ngos/<id>/ — one NGO: what it does, its fundraisers, how it used funds, photos and links. */
export default function NgoProfile() {
  const { id } = useParams()
  const ngo = getNgo(id)
  if (!ngo) return <NotFound />

  const path = ngoPath(ngo.id)
  const fundraisers = campaigns.filter((c) => c.ngo === ngo.id)
  const donatePath = `/donate/ngo/${ngo.id}/`
  const links = SOCIAL.filter((s) => ngo.social?.[s.key])
  const sections = [
    ['what-we-do', 'What we do'],
    ['fundraisers', `Fundraisers${fundraisers.length ? ` (${fundraisers.length})` : ''}`],
    ...(ngo.showProjects ? [['projects', 'Projects']] : []),
    ['funds', 'Funds utilisation'],
    ...(ngo.gallery?.length ? [['in-action', 'In action']] : []),
  ]

  return (
    <>
      <Seo
        title={`${ngo.name} — donate to a verified NGO in ${cityName(ngo.city)}`}
        description={`${ngo.tagline} ${ngo.name} is a verified NGO in ${cityName(ngo.city)}, ${ngo.state}. See their work and donate with 80G tax benefits.`}
        path={path}
        noindex={ngo.sample}
      />

      {/* Header */}
      <section className="ngo-profile-head">
        <div className="ngo-profile-head__cover">
          <Photo name={ngo.photo} alt="" priority />
        </div>
        <div className="container">
          <div className="ngo-profile-head__card">
            <span className="ngo-profile-head__logo" aria-hidden="true">
              {ngo.name.replace(/[[\]]/g, '').charAt(0)}
            </span>
            <div className="ngo-profile-head__copy">
              <nav aria-label="Breadcrumb" className="breadcrumb">
                <Link to="/ngos/">NGOs</Link>
                <span aria-hidden="true">/</span>
                <Link to={cityPath(ngo.city)}>{cityName(ngo.city)}</Link>
              </nav>
              <h1 className="h2">
                {ngo.name}
                {ngo.sample && <span className="ngo-card__sample ngo-card__sample--inline">Sample listing</span>}
              </h1>
              <p className="body">{ngo.tagline}</p>
              <p className="ngo-card__place">
                <Icon name="mapPin" size={16} />
                {cityName(ngo.city)}, {ngo.state}
                {!ngo.sample && (
                  <span className="ngo-card__verified">
                    <Icon name="badgeCheck" size={16} strokeWidth={2.2} /> {ngo.operator ? 'Runs GiveHope' : 'Verified by GiveHope'}
                  </span>
                )}
                {ngo.partnerSince && <span>· Partner since {ngo.partnerSince}</span>}
              </p>
              <ul className="ngo-card__causes" role="list">
                {ngo.causes.map((c) => (
                  <li key={c}>
                    <Link to={causePath(c)}>{causeLabel(c)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ngo-profile-head__side">
              {(ngo.raised != null || ngo.donations != null) && (
                <dl className="ngo-profile-head__figures">
                  {ngo.raised != null && (
                    <div>
                      <dt>Funds raised</dt>
                      <dd>{compact(ngo.raised)}</dd>
                    </div>
                  )}
                  {ngo.donations != null && (
                    <div>
                      <dt>Donations</dt>
                      <dd>{num(ngo.donations)}</dd>
                    </div>
                  )}
                </dl>
              )}
              <Link to={donatePath} className="btn btn--primary btn--lg btn--block">
                Donate now
              </Link>
              <button type="button" className="btn btn--outline btn--block" onClick={() => shareFundraiser({ title: ngo.name, path })}>
                <Icon name="share" size={18} /> Share
              </button>
            </div>
          </div>

          <nav className="ngo-tabs" aria-label="On this page">
            {sections.map(([anchor, label]) => (
              <a href={`#${anchor}`} key={anchor}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="section ngo-section" aria-labelledby="ngo-what-title">
        <div className="container cause-about">
          <div className="cause-about__copy">
            <span className="eyebrow">What we do</span>
            <h2 className="h2" id="ngo-what-title">
              About {ngo.name}
            </h2>
            {ngo.about.map((p) => (
              <p className="body" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
          </div>
          <div className="cause-about__trust">
            <h3 className="feature__title">Registration details</h3>
            <dl className="ngo-facts">
              <div>
                <dt>Registered as</dt>
                <dd>{ngo.registration.type}</dd>
              </div>
              <div>
                <dt>Registration no.</dt>
                <dd>{ngo.registration.number}</dd>
              </div>
              <div>
                <dt>12A</dt>
                <dd>{ngo.registration.twelveA}</dd>
              </div>
              <div>
                <dt>80G</dt>
                <dd>{ngo.registration.eightyG}</dd>
              </div>
              {ngo.founded && (
                <div>
                  <dt>Founded</dt>
                  <dd>{ngo.founded}</dd>
                </div>
              )}
            </dl>
            {(ngo.website || links.length > 0) && (
              <div className="ngo-links">
                <h3 className="feature__title">Important links</h3>
                <ul role="list">
                  {ngo.website && (
                    <li>
                      <a href={ngo.website} target="_blank" rel="noopener">
                        Website <Icon name="arrowRight" size={14} strokeWidth={2.4} />
                      </a>
                    </li>
                  )}
                  {links.map((s) => (
                    <li key={s.key}>
                      <a href={ngo.social[s.key]} target="_blank" rel="noopener">
                        {s.label} <Icon name="arrowRight" size={14} strokeWidth={2.4} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fundraisers */}
      <section id="fundraisers" className="section section--cream ngo-section" aria-labelledby="ngo-fr-title">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">Our fundraisers</span>
              <h2 className="h2" id="ngo-fr-title">
                Help them reach their goals
              </h2>
            </div>
            <Link to={`/crowdfunding/`} className="text-link">
              Start a fundraiser for {ngo.name.replace(/[[\]]/g, '')} <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </Link>
          </div>
          {fundraisers.length ? (
            <div className="grid-fill section-body">
              {fundraisers.map((c) => (
                <CampaignCard campaign={c} key={c.slug} />
              ))}
            </div>
          ) : (
            <div className="cause-empty section-body">
              <p className="body">There are no live fundraisers from {ngo.name} right now. You can still support their work directly.</p>
              <Link to={donatePath} className="btn btn--dark">
                Donate to {ngo.name}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CHANGE NGO's own projects */}
      {ngo.showProjects && (
        <section id="projects" className="offer-section ngo-section" aria-labelledby="ngo-projects-title">
          <div className="container">
            <span className="eyebrow">Projects</span>
            <h2 className="h2" id="ngo-projects-title">
              Long-running projects
            </h2>
            <OfferRow items={PROJECTS} kind="Project" label="projects" />
          </div>
        </section>
      )}

      {/* Funds utilisation */}
      <section id="funds" className="section ngo-section" aria-labelledby="ngo-funds-title">
        <div className="container" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Funds utilisation</span>
          <h2 className="h2" id="ngo-funds-title">
            How they used the money
          </h2>
          {ngo.utilisation?.length ? (
            <ol className="update-list section-body">
              {ngo.utilisation.map((u) => (
                <li key={u.date + u.text.slice(0, 12)}>
                  <time dateTime={u.date}>{formatDate(u.date)}</time>
                  <p className="body">{u.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="body section-body">[Reports on how donations were spent, with bills and photos, appear here as they are shared.]</p>
          )}
        </div>
      </section>

      {/* In action */}
      {ngo.gallery?.length > 0 && (
        <section id="in-action" className="section section--flush-top ngo-section" aria-labelledby="ngo-action-title">
          <div className="container">
            <span className="eyebrow">In action</span>
            <h2 className="h2" id="ngo-action-title">
              Their work on the ground
            </h2>
            <div className="ngo-gallery section-body">
              {ngo.gallery.map((p) => (
                <figure key={p}>
                  <Photo name={p} sizes="(max-width: 720px) 50vw, 300px" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="section section--flush-top" aria-labelledby="ngo-cta-title">
        <div className="container">
          <div className="ngo-join">
            <div>
              <h2 className="h2" id="ngo-cta-title">
                Inspired by their work?
              </h2>
              <p className="body">Your gift helps {ngo.name} keep going and reach more people.</p>
            </div>
            <Link to={donatePath} className="btn btn--primary btn--lg">
              Donate now
            </Link>
          </div>
        </div>
      </section>

      <div className="sticky-donate">
        <Link to={donatePath} className="btn btn--primary btn--block">
          Donate to this NGO
        </Link>
        <button type="button" className="icon-btn" aria-label="Share this NGO" onClick={() => shareFundraiser({ title: ngo.name, path })}>
          <Icon name="share" size={20} />
        </button>
      </div>
    </>
  )
}
