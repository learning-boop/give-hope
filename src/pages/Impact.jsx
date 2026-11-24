import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Photo, SectionHead } from '../components/ui'
import { CATEGORIES } from '../data/campaigns'
import { IMPACT_REPORT as R } from '../data/impact'
import { inr, num } from '../site'

const causeLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || id

const FIGURES = [
  { value: num(R.donations), label: 'donations made' },
  { value: R.amountRaised != null ? inr(R.amountRaised) : '₹[Amount]', label: 'raised for verified causes' },
  { value: num(R.ngos), label: 'verified NGOs supported' },
  { value: num(R.fundraisers), label: 'fundraisers funded' },
]

const PROMISES = [
  { icon: 'shieldCheck', title: 'Checked before it goes live', text: 'Every NGO and fundraiser is verified in person, with documents, before it can raise a rupee.' },
  { icon: 'fileText', title: 'Spending you can see', text: 'Bills, receipts and photos are posted as money is used, and you get the updates.' },
  { icon: 'chart', title: 'Audited every year', text: 'Our accounts are audited each year, and the reports are on our Documents page.' },
]

/** /impact/ — what donations achieved: headline figures, causes, places and stories. */
export default function Impact() {
  return (
    <>
      <Seo
        title="Our impact"
        description="See what donations on GiveHope achieved: lives reached, causes supported, where the money went and stories of change."
        path="/impact/"
      />

      <section className="page-hero dark-hero impact-hero">
        <div className="hero-bg">
          <Photo name="flood-relief" alt="" priority />
        </div>
        <div className="container">
          <div className="page-hero__copy page-hero__copy--wide">
            <span className="eyebrow eyebrow--on-dark load-in">Our impact · {R.period}</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span className="accent">{num(R.livesImpacted)}</span>
              </span>
              <span className="rise-line">
                <span style={{ '--d': 1 }}>lives reached with your support</span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              Every number here comes from our records and audited accounts. Behind each one is a family, a patient, a
              student or an animal that got help.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Impact in numbers">
        <div className="container">
          <div className="grid-auto" style={{ '--min': '220px', '--grid-gap': '16px' }}>
            {FIGURES.map((f, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={f.label}>
                <div className="stat" style={{ height: '100%' }}>
                  <span className="stat__value">{f.value}</span>
                  <span className="stat__label">{f.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="impact-causes-title">
        <div className="container impact-split">
          <div data-reveal="left">
            <SectionHead eyebrow="By cause" title="Where your donations went" id="impact-causes-title" />
            {R.causeShare.length ? (
              <ul className="impact-bars section-body" role="list">
                {R.causeShare.map((c) => (
                  <li key={c.cause}>
                    <span className="impact-bars__label">
                      <span>{causeLabel(c.cause)}</span>
                      <strong>{c.percent}%</strong>
                    </span>
                    <span className="impact-bars__track">
                      <span className="impact-bars__fill" style={{ width: `${c.percent}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body section-body">[Share of donations by cause for {R.period}, from your records, appears here.]</p>
            )}
          </div>
          <div data-reveal="right">
            <SectionHead eyebrow="By place" title="Places that benefited" id="impact-places-title" />
            {R.districts.length ? (
              <ul className="impact-places section-body" role="list">
                {R.districts.map((d) => (
                  <li key={d.name}>
                    <Icon name="mapPin" size={16} /> {d.name}
                    <span className="small">{d.state}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body section-body">[Districts and states your donations reached in {R.period} appear here.]</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="impact-stories-title">
        <div className="container">
          <SectionHead eyebrow="Stories of change" title="The people behind the numbers" id="impact-stories-title" />
          {R.stories.length ? (
            <div className="grid-auto section-body" style={{ '--min': '300px', '--grid-gap': '20px' }}>
              {R.stories.map((s) => (
                <article className="impact-story" key={s.name + s.title}>
                  {s.photo && (
                    <div className="impact-story__photo">
                      <Photo name={s.photo} alt="" sizes="(max-width: 720px) 100vw, 400px" />
                    </div>
                  )}
                  <div className="stack" style={{ '--stack-gap': '8px', padding: 22 }}>
                    <span className="eyebrow">{s.name}</span>
                    <h3 className="feature__title">{s.title}</h3>
                    <p className="small">{s.text}</p>
                    <p className="small" style={{ fontSize: 13 }}>
                      {s.ngo}, {s.place}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="body section-body">
              [Two to four real stories, shared with consent, appear here: who was helped, by which NGO, and what changed.]
            </p>
          )}
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="impact-trust-title">
        <div className="container">
          <div className="panel panel--dark" data-reveal>
            <SectionHead eyebrow="Accountability" title="How we make sure it’s real" onDark id="impact-trust-title" />
            <div className="grid-auto section-body" style={{ '--min': '240px', '--grid-gap': '16px' }}>
              {PROMISES.map((p) => (
                <div className="card card--dark" key={p.title} style={{ padding: 26, gap: 12 }}>
                  <span className="icon-tile icon-tile--md">
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="h3" style={{ color: 'var(--white)' }}>
                    {p.title}
                  </h3>
                  <p className="small">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="cta-row" style={{ marginTop: 28 }}>
              <Link to="/documents/" className="btn btn--lime">
                Read our reports
              </Link>
              <Link to="/how-your-donation-works/" className="text-link text-link--on-dark">
                How your donation works <Icon name="arrowRight" size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="impact-cta-title">
        <div className="container">
          <div className="ngo-join">
            <div>
              <h2 className="h2" id="impact-cta-title">
                Be part of next year’s numbers
              </h2>
              <p className="body">Give to a verified fundraiser today, or support a mission every month.</p>
            </div>
            <div className="cta-row">
              <a href="/#fundraisers" className="btn btn--primary btn--lg">
                Donate now
              </a>
              <Link to="/monthly/" className="btn btn--outline btn--lg">
                Give monthly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
