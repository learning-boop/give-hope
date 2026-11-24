import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Faq from '../components/Faq'
import { shareFundraiser } from '../lib/share'
import { Photo, SectionHead } from '../components/ui'
import { MISSION_FAQS, MONTHLY_PLANS, getMission, missionDonatePath, missionPath } from '../data/monthly'
import { CATEGORIES } from '../data/campaigns'
import { causePath } from '../data/causes'
import { inr } from '../site'
import NotFound from './NotFound'

const HOW = [
  { icon: 'repeat', title: 'You pledge once', text: 'Choose an amount. It is paid automatically every month until you stop it.' },
  { icon: 'shieldCheck', title: 'We fund verified NGOs', text: 'Your gifts go to partner NGOs our team has checked in person.' },
  { icon: 'fileText', title: 'You see the impact', text: 'Get updates with photos and reports on what your gifts paid for.' },
]

/** /missions/<id>/ — one monthly mission: why it matters, what your gift covers, and a monthly pledge. */
export default function Mission() {
  const { id } = useParams()
  const m = getMission(id)
  if (!m) return <NotFound />

  const path = missionPath(m.id)
  const cause = CATEGORIES.find((c) => c.id === m.cause)
  const others = MONTHLY_PLANS.filter((p) => p.id !== m.id)
  const popular = m.amounts[1]?.amount

  return (
    <>
      <Seo title={`Mission: ${m.title} — give monthly`} description={`${m.tagline} ${m.text} Pledge once, pay every month, cancel anytime.`} path={path} />

      {/* Banner */}
      <section className="dark-hero cause-hero mission-hero">
        <div className="hero-bg">
          <Photo name={m.photo} alt="" priority />
        </div>
        <div className="container cause-hero__inner">
          <nav aria-label="Breadcrumb" className="cause-hero__crumbs load-in">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/monthly/">Monthly missions</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{m.title}</span>
          </nav>
          <span className="cause-hero__tag load-in">
            <Icon name="repeat" size={16} strokeWidth={2.4} />
            Monthly mission
          </span>
          <h1 className="display cause-hero__title">
            <span className="rise-line">
              <span>{m.title}</span>
            </span>
          </h1>
          <p className="lead load-in" style={{ '--d': 1 }}>
            {m.tagline}
          </p>
          <div className="cta-row load-in" style={{ '--d': 2 }}>
            <Link to={missionDonatePath(m.id, popular)} className="btn btn--primary btn--lg btn--pill">
              Pledge monthly
            </Link>
            <button type="button" className="btn btn--outline-light btn--lg btn--pill" onClick={() => shareFundraiser({ title: `Mission: ${m.title}`, path })}>
              <Icon name="share" size={18} /> Share this mission
            </button>
          </div>
          <p className="cause-hero__count load-in" style={{ '--d': 2 }}>
            <Icon name="badgeCheck" size={18} strokeWidth={2.2} />
            Pledge once, pay every month · 80G tax benefit · Cancel anytime
          </p>
        </div>
      </section>

      {/* Impact so far: only once there is a real figure */}
      {m.impact && (
        <section className="mission-impact" aria-label="Impact so far">
          <div className="container">
            <p>
              Thanks to monthly donors like you, <strong>{m.impact.value}</strong> {m.impact.label}.
            </p>
          </div>
        </section>
      )}

      {/* The need */}
      <section className="section" aria-labelledby="mission-need-title">
        <div className="container cause-about">
          <div className="cause-about__copy" data-reveal="left">
            <span className="eyebrow">Why this mission</span>
            <h2 className="h2" id="mission-need-title">
              The need doesn’t stop, so neither do we
            </h2>
            {m.about.map((p) => (
              <p className="body" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
          </div>
          <div className="mission-needs" data-reveal="right">
            <h3 className="feature__title">Your donation covers</h3>
            <ul role="list">
              {m.needs.map((n) => (
                <li key={n.label}>
                  <span className="icon-tile icon-tile--md">
                    <Icon name={n.icon} />
                  </span>
                  {n.label}
                </li>
              ))}
            </ul>
            {cause && (
              <Link to={causePath(cause.id)} className="text-link">
                See {cause.label.toLowerCase()} fundraisers <Icon name="arrowRight" size={18} strokeWidth={2.2} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Amounts */}
      <section className="section section--cream" aria-labelledby="mission-amounts-title">
        <div className="container">
          <div className="causes-head" data-reveal>
            <span className="eyebrow">How your gift helps</span>
            <h2 className="h2" id="mission-amounts-title">
              Choose what you can give each month
            </h2>
            <p className="body">Your gifts go to verified partner NGOs working on this mission.</p>
          </div>
          <div className="mission-amounts section-body">
            {m.amounts.map((a) => (
              <Link
                to={missionDonatePath(m.id, a.amount)}
                className={`mission-amount${a.amount === popular ? ' mission-amount--popular' : ''}`}
                key={a.amount}
              >
                {a.amount === popular && <span className="donate-flow__popular">Popular</span>}
                <span className="mission-amount__value">
                  {inr(a.amount)}
                  <small>/month</small>
                </span>
                <span className="mission-amount__text">{a.text}</span>
                <span className="btn btn--primary btn--block">Pledge {inr(a.amount)}</span>
              </Link>
            ))}
          </div>
          <p className="center small" style={{ marginTop: 20 }}>
            Want to give a different amount? <Link to={missionDonatePath(m.id)}>Choose your own</Link>.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section" aria-labelledby="mission-how-title">
        <div className="container">
          <div className="causes-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="h2" id="mission-how-title">
              Set it up once. Keep changing lives.
            </h2>
          </div>
          <ol className="mission-how section-body">
            {HOW.map((s, i) => (
              <li key={s.title} className="reveal-cell" data-reveal style={{ '--d': i }}>
                <span className="icon-tile icon-tile--md icon-tile--lime-tint">
                  <Icon name={s.icon} />
                </span>
                <h3 className="feature__title">{s.title}</h3>
                <p className="small">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stories and partners: only once there are real ones */}
      {m.stories?.length > 0 && (
        <section className="section section--flush-top" aria-labelledby="mission-stories-title">
          <div className="container">
            <SectionHead eyebrow="Stories of change" title="What your gifts made possible" id="mission-stories-title" />
            <div className="grid-auto section-body" style={{ '--min': '260px' }}>
              {m.stories.map((s) => (
                <div className="card" key={s.name}>
                  <h3 className="feature__title">{s.name}</h3>
                  <p className="small">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {m.partners?.length > 0 && (
        <section className="section section--flush-top" aria-labelledby="mission-partners-title">
          <div className="container">
            <SectionHead eyebrow="Partner NGOs" title="Who carries out this mission" id="mission-partners-title" />
            <ul className="mission-partners section-body" role="list">
              {m.partners.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  <span className="small">{p.city}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Other missions */}
      <section className="section section--cream" aria-labelledby="mission-others-title">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">More missions</span>
              <h2 className="h2" id="mission-others-title">
                Other missions you can support
              </h2>
            </div>
            <Link to="/monthly/" className="text-link">
              All missions <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </Link>
          </div>
          <div className="grid-fill section-body">
            {others.slice(0, 3).map((p, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={p.id}>
                <Link className="media-tile type-tile" to={missionPath(p.id)}>
                  <Photo name={p.photo} alt="" position={p.position} sizes="(max-width: 720px) 100vw, 400px" />
                  <span className="media-tile__title">{p.title}</span>
                  <span className="media-tile__text">{p.text}</span>
                  <span className="media-tile__cta">
                    See mission <Icon name="arrowRight" size={16} strokeWidth={2.2} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="mission-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="mission-faq-title">
              About monthly giving
            </h2>
            <p className="body">How pledges, receipts and cancellations work.</p>
          </div>
          <div className="faq-layout__list">
            <Faq items={MISSION_FAQS} />
          </div>
        </div>
      </section>

      {/* Phones: a pledge bar that stays at the bottom of the screen */}
      <div className="sticky-donate">
        <Link to={missionDonatePath(m.id, popular)} className="btn btn--primary btn--block">
          Pledge monthly
        </Link>
        <button type="button" className="icon-btn" aria-label="Share this mission" onClick={() => shareFundraiser({ title: `Mission: ${m.title}`, path })}>
          <Icon name="share" size={20} />
        </button>
      </div>
    </>
  )
}
