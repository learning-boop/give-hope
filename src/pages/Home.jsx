import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import Faq from '../components/Faq'
import HeroSlider from '../components/HeroSlider'
import Doodles from '../components/Doodles'
import { CheckList, Photo, SectionHead } from '../components/ui'
import { CATEGORIES, filterCampaigns } from '../data/campaigns'
import { donorFaqs } from '../data/faqs'
import { MONTHLY_PLANS } from '../data/monthly'
import { SITE } from '../site'

const TRUST = [
  { icon: 'homeHeart', title: 'We understand', text: 'A medical emergency or a lost home is hard enough. We help organisers with care at every step, from the first call to the last update.' },
  { icon: 'shieldCheck', title: 'Verified before launch', text: 'Our team visits the organiser in person and checks the documents and beneficiary before a fundraiser goes live.' },
  { icon: 'mapPin', title: 'A local team', text: 'GiveHope is run by CHANGE NGO from Vijayawada, so the people checking fundraisers know the communities they serve.' },
  { icon: 'receipt', title: '80G receipts, automatically', text: 'Your tax receipt lands in your inbox after you give, and stays in your account.' },
  { icon: 'fileText', title: 'Spending you can see', text: 'Every fundraiser posts bills, receipts and photos as the money is used.' },
  { icon: 'chart', title: 'Audited every year', text: 'Our accounts are audited each year, and the reports are on our Documents page for anyone to read.' },
]

const STEPS = [
  { icon: 'search', title: 'Pick a cause', text: 'Browse verified fundraisers by cause, city or urgency, and read the full story with documents.' },
  { icon: 'lock', title: 'Give securely', text: 'Pay by UPI, card or netbanking. Your 80G receipt is emailed to you right away.' },
  { icon: 'chart', title: 'See the impact', text: 'Get updates with bills, receipts and photos as your money is put to work.' },
]

/** Small drawings of what each step looks like on GiveHope. Decorative only. */
function StepVisual({ step }) {
  if (step === 0)
    return (
      <div className="how-ui" aria-hidden="true">
        <div className="how-ui__search">
          <Icon name="search" size={14} strokeWidth={2.4} />
          <span>Search fundraisers</span>
        </div>
        <div className="how-ui__causes">
          <span className="how-ui__cause is-on">
            <Icon name="pulse" size={14} strokeWidth={2.4} /> Medical
          </span>
          <span className="how-ui__cause">
            <Icon name="book" size={14} strokeWidth={2.4} /> Education
          </span>
          <span className="how-ui__cause">
            <Icon name="paw" size={14} strokeWidth={2.4} /> Animals
          </span>
        </div>
        <div className="how-ui__row">
          <span className="how-ui__badge">
            <Icon name="badgeCheck" size={14} strokeWidth={2.4} /> Verified in person
          </span>
          <span className="how-ui__line" />
        </div>
      </div>
    )
  if (step === 1)
    return (
      <div className="how-ui" aria-hidden="true">
        <div className="how-ui__amounts">
          <span>₹500</span>
          <span className="is-on">₹1,000</span>
          <span>₹2,500</span>
        </div>
        <div className="how-ui__pay">
          <span>UPI</span>
          <span>Card</span>
          <span>Netbanking</span>
        </div>
        <div className="how-ui__button">
          <Icon name="lock" size={14} strokeWidth={2.4} /> Donate securely
        </div>
      </div>
    )
  return (
    <div className="how-ui" aria-hidden="true">
      {[
        ['receipt', '80G receipt emailed'],
        ['fileText', 'Hospital bill uploaded'],
        ['photo', 'New photos added'],
      ].map(([icon, label], i) => (
        <div className="how-ui__note" style={{ '--n': i }} key={label}>
          <span className="how-ui__note-icon">
            <Icon name={icon} size={15} strokeWidth={2.2} />
          </span>
          <span>{label}</span>
          <Icon name="check" size={14} strokeWidth={2.6} className="how-ui__tick" />
        </div>
      ))}
    </div>
  )
}

// When you have figures backed by an audited report, put them in `value` (e.g. '₹5,00,000'). Numbers count up on scroll.
const IMPACT = [
  { value: 'Every fundraiser', label: 'checked in person before it goes live' },
  { value: 'Every bill', label: 'posted on the fundraiser as the money is used' },
  { value: 'Every donor', label: 'kept updated with receipts and photos' },
  { value: 'Every year', label: 'accounts audited and shared in our annual report' },
]

const RAISE_PATHS = [
  {
    audience: 'For individuals',
    title: 'Start a fundraiser',
    text: 'Raise money for yourself, a family member or a friend. Share the story, upload documents and we verify it before launch.',
    icon: 'users',
    to: '/crowdfunding/',
  },
  {
    audience: 'For NGOs and trusts',
    title: 'Register your NGO',
    text: 'Raise funds for your programmes with your registration, 12A and 80G certificates, PAN and bank details.',
    icon: 'shieldCheck',
    to: '/crowdfunding/#documents',
  },
]

// Reasons drawn from what the site promises. Add real quotes here only with the person's permission.
const REASONS = [
  { audience: 'For donors', title: 'See what your gift did', text: 'Give to a checked fundraiser, get your 80G receipt, and follow the bills, receipts and photos as the money is used.' },
  { audience: 'For organisers', title: 'Someone beside you at every step', text: 'A fundraiser manager helps you write, share and withdraw, with a ready-made WhatsApp message, poster and QR code.', icon: 'headset' },
  { audience: 'For families', title: 'Help that goes where it is needed', text: 'Funds go directly to the hospital, NGO or beneficiary account, in stages as the bills come in.', icon: 'homeHeart' },
]

// Photo and icon for each cause circle. Disability and Faith use stand-in photos until you have real ones.
const CAUSE_DETAILS = {
  all: { icon: 'grid' },
  urgent: { photo: 'flood-car', icon: 'alert' },
  medical: { photo: 'operating-room', icon: 'pulse' },
  children: { photo: 'children-group', icon: 'users' },
  education: { photo: 'classroom', icon: 'book' },
  elderly: { photo: 'elder-turban', icon: 'homeHeart' },
  animals: { photo: 'cow-care', icon: 'paw' },
  disaster: { photo: 'flood-boat', icon: 'lifebuoy' },
  hunger: { photo: 'community-kitchen', icon: 'bowl' },
  women: { photo: 'women-circle', icon: 'woman' },
  disability: { photo: 'field-care', icon: 'accessibility' },
  community: { photo: 'village-lane', icon: 'village' },
  faith: { photo: 'flower-work', icon: 'diya' },
}

/** Keeps fundraisers whose title, story, organiser, place or cause contain every word typed. */
function searchCampaigns(list, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return list
  return list.filter((c) => {
    const haystack = [c.title, c.summary, c.organiser, c.location, c.categoryLabel].join(' ').toLowerCase()
    return words.every((w) => haystack.includes(w))
  })
}

export default function Home() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const list = searchCampaigns(filterCampaigns(category), query)
  const categoryLabel = CATEGORIES.find((cat) => cat.id === category)?.label
  const { registration } = SITE
  const [firstReason, ...otherReasons] = REASONS

  return (
    <>
      <Seo
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: SITE.name,
          url: SITE.url,
          logo: `${SITE.url}/images/logo.png`,
          description: SITE.description,
          parentOrganization: { '@type': 'NGO', name: SITE.organisation.name },
        }}
      />

      <HeroSlider />

      {/* Fundraisers: search, pick a cause, see results — all in one place */}
      <section id="fundraisers" className="section causes-section" aria-labelledby="fundraisers-title">
        <div className="container">
          <div className="causes-head" data-reveal>
            <span className="eyebrow">Support a fundraiser</span>
            <h2 className="h2" id="fundraisers-title">
              Choose a cause close to your heart
            </h2>
            <p className="body">Every fundraiser here has been checked by our team. Search or pick a cause, and give in under a minute.</p>
          </div>

          <form className="fr-search" role="search" onSubmit={(e) => e.preventDefault()} data-reveal>
            <label htmlFor="fr-search" className="sr-only">
              Search fundraisers
            </label>
            <Icon name="search" size={20} className="fr-search__icon" />
            <input
              id="fr-search"
              type="search"
              placeholder="Search by name, cause or place"
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

          <div className="cause-filter" role="group" aria-label="Filter fundraisers by cause">
            {CATEGORIES.map((cat) => {
              const { photo, icon } = CAUSE_DETAILS[cat.id]
              return (
                <button
                  type="button"
                  className={`cause-chip${cat.id === 'urgent' ? ' cause-chip--urgent' : ''}`}
                  aria-pressed={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                  key={cat.id}
                >
                  <span className="cause-chip__media">
                    <span className={`cause-chip__photo${photo ? '' : ' cause-chip__photo--icon'}`}>
                      {photo ? (
                        // 240px square thumbnails made for these circles: public/images/<name>-thumb.webp
                        <img src={`/images/${photo}-thumb.webp`} width="240" height="240" alt="" loading="lazy" decoding="async" />
                      ) : (
                        <Icon name={icon} size={28} strokeWidth={2} />
                      )}
                    </span>
                    {photo && (
                      <span className="cause-chip__icon">
                        <Icon name={icon} size={14} strokeWidth={2.4} />
                      </span>
                    )}
                  </span>
                  <span className="cause-chip__label">{cat.label}</span>
                </button>
              )
            })}
          </div>

          <div className="fr-results" aria-live="polite">
            <p className="fr-count">
              {list.length} {list.length === 1 ? 'fundraiser' : 'fundraisers'}
              {category !== 'all' && <> in <strong>{categoryLabel}</strong></>}
              {query.trim() && <> matching “{query.trim()}”</>}
            </p>
            {list.length > 0 ? (
              <div className="grid-fill cards-in" key={category}>
                {list.map((c, i) => (
                  <div className="reveal-cell" style={{ '--d': i % 3 }} key={c.slug}>
                    <CampaignCard campaign={c} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                No fundraisers match this right now.{' '}
                <button
                  type="button"
                  className="text-link"
                  style={{ border: 0, background: 'none', padding: 0, display: 'inline' }}
                  onClick={() => {
                    setCategory('all')
                    setQuery('')
                  }}
                >
                  Show all fundraisers
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Monthly giving */}
      <section id="monthly" className="section" aria-labelledby="monthly-title">
        <div className="container">
          <div className="split-head" data-reveal>
            <div className="split-head__title">
              <span className="eyebrow">Monthly giving</span>
              <h2 className="h2" id="monthly-title">
                Show up for them every month
              </h2>
            </div>
            <div className="split-head__aside">
              <p className="body">
                A small monthly gift gives shelters, schools and care homes something they rarely have: income they can plan
                around.
              </p>
              <CheckList items={['Pause or cancel anytime from your account']} />
            </div>
          </div>
          <div className="grid-fill section-body">
            {MONTHLY_PLANS.map((p, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={p.id}>
                <div className="card plan-card" style={{ height: '100%' }}>
                  <div className="plan-card__media">
                    <Photo name={p.photo} alt="" position={p.position} sizes="(max-width: 720px) 100vw, 400px" />
                  </div>
                  <div className="plan-card__body">
                    <h3 className="feature__title">{p.title}</h3>
                    <p className="small">{p.text}</p>
                    <Link to={`/monthly/?cause=${p.id}`} className="btn btn--lime">
                      Pledge monthly
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GiveHope */}
      <section className="section leaf-bg leaf-bg--ink" aria-labelledby="trust-title">
        <div className="container">
          <div className="why-grid">
            <div className="why-photo parallax" data-reveal="left">
              <Photo name="family-visit" position="center 45%" sizes="(max-width: 1020px) 100vw, 640px" />
            </div>
            <div className="why-copy" data-reveal>
              <SectionHead
                eyebrow="Why GiveHope"
                title="Give knowing where it goes"
                text="When money is the only thing standing between someone and the help they need, GiveHope brings caring people together to close that gap, and shows them what their kindness did."
                id="trust-title"
              />
              <p className="body why-copy__more">
                Give Hope is an initiative of {SITE.organisation.name}. We listen to each family, check their story in person, and stay
                with them until the help arrives — so you can give with confidence.
              </p>
              <ul className="reg-list">
                <li>Registered as {registration.type}</li>
                <li>12A: {registration.twelveA}</li>
                <li>80G: {registration.eightyG}</li>
                <li>CSR-1: {registration.csr1}</li>
              </ul>
              <Link to="/documents/" className="btn btn--primary">
                View documents and reports <Icon name="arrowRight" size={18} strokeWidth={2.2} />
              </Link>
            </div>
            <div className="why-side">
              <div className="why-side__photo parallax" data-reveal="right">
                <Photo name="woman-speaking" alt="" sizes="300px" />
              </div>
            </div>
          </div>

          <div className="trust-columns section-body">
            {TRUST.map((t, i) => (
              <div className="trust-column" data-reveal style={{ '--d': i % 3 }} key={t.title}>
                <span className="trust-column__icon">
                  <Icon name={t.icon} size={22} strokeWidth={2} />
                </span>
                <h3 className="feature__title">{t.title}</h3>
                <p className="small">{t.text}</p>
              </div>
            ))}
          </div>

          <div className="photo-band parallax" data-reveal="zoom">
            <Photo name="giving-plate" sizes="(max-width: 1240px) 100vw, 1200px" />
          </div>

          <div className="pill-cta-row" data-reveal>
            <Link to="/crowdfunding/" className="pill-cta">
              Raising money for someone who needs help?
              <span className="pill-cta__go">
                Start a fundraiser <Icon name="arrowRight" size={16} strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section section--cream leaf-bg leaf-bg--ink" aria-labelledby="how-title">
        <div className="container">
          <div className="center-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="h2" id="how-title">
              Three steps from caring to changing a life
            </h2>
            <p className="body how-lead">Giving takes about a minute, and you can follow your money long after.</p>
          </div>

          <ol className="how-steps section-body" data-reveal>
            {STEPS.map((s, i) => (
              <li className="how-step" style={{ '--d': i }} key={s.title}>
                <span className="how-step__node" aria-hidden="true">
                  <Icon name={s.icon} size={24} strokeWidth={2.2} />
                  <span className="how-step__num">0{i + 1}</span>
                </span>
                <article className="how-step__card">
                  <StepVisual step={i} />
                  <h3 className="feature__title">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="small">{s.text}</p>
                </article>
              </li>
            ))}
          </ol>

          <div className="how-cta" data-reveal>
            <a href="#fundraisers" className="btn btn--primary btn--lg btn--pill">
              Find a cause to support <Icon name="arrowRight" size={20} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="impact-band leaf-bg" aria-labelledby="impact-title">
        <div className="container impact-band__grid">
          <div className="impact-band__photo parallax" data-reveal="left">
            <Photo name="elder-women" sizes="(max-width: 900px) 100vw, 560px" />
          </div>
          <div className="impact-band__copy">
            <div className="stack" data-reveal="right" style={{ '--stack-gap': '12px' }}>
              <span className="eyebrow eyebrow--on-dark">Our impact</span>
              <h2 className="h2" id="impact-title">
                Impact you can check for yourself
              </h2>
            </div>
            <div className="impact-panel" data-reveal>
              {IMPACT.map((s) => (
                <div className="impact-stat" key={s.label}>
                  <span className="stat__value" data-count>
                    {s.value}
                  </span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="impact-band__note" data-reveal>
              Our registrations and audited reports are in one place. <Link to="/documents/">See the documents</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Start a fundraiser */}
      <section id="start-fundraiser" className="section" aria-labelledby="start-title">
        <div className="container feature-grid">
          <div className="feature-grid__copy" data-reveal="left">
            <span className="eyebrow">Crowdfunding</span>
            <h2 className="h2" id="start-title">
              Raising money for someone who needs help?
            </h2>
            <p className="body">
              Whether it is a hospital bill, a relief drive or an NGO project, we help you tell the story and reach people
              who want to give.
            </p>
            <div className="raise-paths">
              {RAISE_PATHS.map((p) => (
                <Link to={p.to} className="raise-path" key={p.title}>
                  <span className="icon-tile icon-tile--md">
                    <Icon name={p.icon} />
                  </span>
                  <span className="raise-path__text">
                    <span className="raise-path__audience">{p.audience}</span>
                    <span className="feature__title">{p.title}</span>
                    <span className="small">{p.text}</span>
                  </span>
                  <Icon name="arrowRight" size={20} strokeWidth={2.2} className="raise-path__arrow" />
                </Link>
              ))}
            </div>
            <Link to="/crowdfunding/#faq" className="text-link text-link--ink">
              Not sure which? Talk to our team
            </Link>
          </div>
          <div className="feature-grid__photo parallax" data-reveal="zoom">
            <Photo name="field-smile" position="center 30%" sizes="(max-width: 1020px) 100vw, 480px" />
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="section section--cream" aria-labelledby="voices-title">
        <div className="container">
          <div className="center-head" data-reveal>
            <span className="eyebrow">For everyone involved</span>
            <h2 className="h2" id="voices-title">
              Why people choose GiveHope
            </h2>
          </div>
          <div className="voices-grid section-body">
            <div className="voice-feature voice-feature--top" data-reveal="left">
              <Photo name="donor-update" alt="" position="70% center" sizes="(max-width: 900px) 100vw, 680px" />
              <div className="voice-bubble">
                <span className="eyebrow">{firstReason.audience}</span>
                <h3 className="feature__title">{firstReason.title}</h3>
                <p className="small">{firstReason.text}</p>
              </div>
            </div>
            <div className="voices-grid__stack">
              {otherReasons.map((r, i) => (
                <div className="reveal-cell" data-reveal="right" style={{ '--d': i, flex: 1 }} key={r.audience}>
                  <div className="quote-card" style={{ height: '100%' }}>
                    <span className="icon-tile icon-tile--md">
                      <Icon name={r.icon} />
                    </span>
                    <span className="eyebrow">{r.audience}</span>
                    <h3 className="feature__title">{r.title}</h3>
                    <p className="small">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="faq-title">
              Before you give
            </h2>
            <p className="body">Straight answers about tax benefits, verification and where your money goes.</p>
            <a href={`mailto:${SITE.contact.email}`} className="text-link">
              Contact support <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </a>
          </div>
          <div className="faq-layout__list">
            <Faq items={donorFaqs} />
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="section section--flush-top cta-section" aria-labelledby="closing-title">
        <div className="container">
          <div className="cta-panel" data-reveal="zoom">
            {/* Photo cut into a brush-stroke shape that breaks out of the top of the panel */}
            <div className="cta-panel__photo">
              <Photo name="children" sizes="(max-width: 900px) 90vw, 520px" position="center 25%" />
            </div>
            <Doodles />
            <div className="cta-panel__copy">
              <h2 className="h2" id="closing-title">
                Your gift can be someone’s second chance.
              </h2>
              <p className="body">Pick a verified fundraiser and give in under a minute.</p>
              <a href="#fundraisers" className="btn btn--dark btn--lg btn--pill">
                Donate now <Icon name="arrowRight" size={20} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
