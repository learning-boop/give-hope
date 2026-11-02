import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import QuickDonateCard from '../components/QuickDonateCard'
import Faq from '../components/Faq'
import HeroSlider from '../components/HeroSlider'
import { CheckList, Photo, SectionHead } from '../components/ui'
import { CATEGORIES, campaigns, featuredCampaign, filterCampaigns, fundraiserPath } from '../data/campaigns'
import { donorFaqs } from '../data/faqs'
import { MONTHLY_PLANS } from '../data/monthly'
import { SITE } from '../site'

const TRUST = [
  { title: 'We understand', text: 'A medical emergency or a lost home is hard enough. We help organisers with care at every step, from the first call to the last update.' },
  { title: 'Verified before launch', text: 'Our team visits the organiser in person and checks the documents and beneficiary before a fundraiser goes live.' },
  { title: '80G receipts, automatically', text: 'Your tax receipt lands in your inbox after you give, and stays in your account.' },
  { title: 'Spending you can see', text: 'Every fundraiser posts bills, receipts and photos as the money is used.' },
]

const STEPS = [
  { title: 'Pick a cause', text: 'Browse verified fundraisers by cause, city or urgency, and read the full story with documents.', photo: 'classroom' },
  { title: 'Give securely', text: 'Pay by UPI, card or netbanking. Your 80G receipt is emailed to you right away.', photo: 'meal' },
  { title: 'See the impact', text: 'Get updates with bills, receipts and photos as your money is put to work.', photo: 'flood' },
]

// When you have figures backed by an audited report, put them in `value` (e.g. '₹5,00,000'). Numbers count up on scroll.
const IMPACT = [
  { value: 'Every fundraiser', label: 'checked in person before it goes live' },
  { value: 'Every bill', label: 'posted on the fundraiser as the money is used' },
  { value: 'Every donor', label: 'kept updated with receipts and photos' },
  { value: 'Every year', label: 'accounts audited and shared in our annual report' },
]

// Reasons drawn from what the site promises. Add real quotes here only with the person's permission.
const REASONS = [
  { audience: 'For donors', title: 'See what your gift did', text: 'Give to a checked fundraiser, get your 80G receipt, and follow the bills, receipts and photos as the money is used.' },
  { audience: 'For organisers', title: 'Someone beside you at every step', text: 'A fundraiser manager helps you write, share and withdraw, with a ready-made WhatsApp message, poster and QR code.', icon: 'headset' },
  { audience: 'For families', title: 'Help that goes where it is needed', text: 'Funds go directly to the hospital, NGO or beneficiary account, in stages as the bills come in.', icon: 'homeHeart' },
]

function RailGroup({ hidden = false }) {
  return (
    <div className="rail__group" inert={hidden} aria-hidden={hidden || undefined}>
      {campaigns.map((c) => (
        <Link to={fundraiserPath(c)} className="cause-logo" key={c.slug}>
          <span className="cause-logo__photo">
            <Photo name={c.photo} alt="" position={c.photoPosition} sizes="44px" />
          </span>
          {c.categoryLabel}
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  const [category, setCategory] = useState('all')
  const list = filterCampaigns(category)
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
        }}
      />

      <HeroSlider />

      {/* Causes */}
      <section className="rail" aria-label="Causes you can support">
        <div className="rail__track">
          <RailGroup />
          <RailGroup hidden />
        </div>
      </section>

      {/* Quick donate */}
      <section className="section quick-give" aria-label="Donate to a featured fundraiser">
        <div className="container quick-give__inner">
          <div className="quick-give__photo parallax" data-reveal="left">
            <Photo name={featuredCampaign.photo} position={featuredCampaign.photoPosition} sizes="(max-width: 900px) 100vw, 640px" />
            {featuredCampaign.photoIllustrative && <span className="photo-note">Illustrative photo</span>}
          </div>
          <div className="quick-give__card" data-reveal="right">
            <QuickDonateCard campaign={featuredCampaign} />
            <p className="quick-give__secure">
              <Icon name="lock" size={18} />
              Secure payments by UPI, card and netbanking · 80G tax receipts
            </p>
          </div>
        </div>
      </section>

      {/* Why GiveHope */}
      <section className="section leaf-bg leaf-bg--ink" aria-labelledby="trust-title">
        <div className="container">
          <div className="why-grid">
            <div className="why-photo parallax" data-reveal="left">
              <Photo name="women-field" sizes="(max-width: 1020px) 100vw, 640px" />
            </div>
            <div className="why-copy" data-reveal>
              <SectionHead
                eyebrow="Why GiveHope"
                title="Give knowing where it goes"
                text="When money is the only thing standing between someone and the help they need, GiveHope brings caring people together to close that gap, and shows them what their kindness did."
                id="trust-title"
              />
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
              <p className="script" data-reveal="flip" aria-hidden="true">
                <span>Pick a cause</span>
                <span>Give securely</span>
                <span>See the impact</span>
              </p>
              <div className="why-side__photo parallax" data-reveal="right">
                <Photo name="dog" alt="" position="center 35%" sizes="300px" />
              </div>
            </div>
          </div>

          <div className="trust-columns section-body">
            {TRUST.map((t, i) => (
              <div className="trust-column" data-reveal style={{ '--d': i }} key={t.title}>
                <h3 className="feature__title">{t.title}</h3>
                <p className="small">{t.text}</p>
              </div>
            ))}
          </div>

          <div className="photo-band parallax" data-reveal="zoom">
            <Photo name="classroom" sizes="(max-width: 1240px) 100vw, 1200px" />
          </div>

          <div className="pill-cta-row" data-reveal>
            <Link to="/crowdfunding/" className="pill-cta">
              Raising money for someone who needs help?
              <span className="pill-cta__faces" aria-hidden="true">
                {['students', 'elder', 'women-field'].map((name) => (
                  <span className="pill-cta__face" key={name}>
                    <Photo name={name} alt="" sizes="36px" />
                  </span>
                ))}
              </span>
              <span className="pill-cta__go">
                Start a fundraiser <Icon name="arrowRight" size={16} strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fundraisers */}
      <section id="fundraisers" className="section section--flush-top" aria-labelledby="fundraisers-title">
        <div className="container">
          <div className="split-head" data-reveal>
            <div className="split-head__title">
              <span className="eyebrow">Active fundraisers</span>
              <h2 className="h2" id="fundraisers-title">
                Fundraisers that need you now
              </h2>
            </div>
            <div className="split-head__aside">
              <p className="body">Every fundraiser here has been checked by our team. Pick a cause and give in under a minute.</p>
              <a href="#fundraisers" className="text-link">
                View all fundraisers <Icon name="arrowRight" size={18} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          <div className="filter-row" role="group" aria-label="Filter fundraisers by cause">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div aria-live="polite">
            {list.length > 0 ? (
              <div className={`grid-fill${category === 'all' ? '' : ' cards-in'}`} key={category}>
                {list.map((c, i) => (
                  <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={c.slug}>
                    <CampaignCard campaign={c} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">
                No active fundraisers in this cause right now.{' '}
                <button type="button" className="text-link" style={{ border: 0, background: 'none', padding: 0, display: 'inline' }} onClick={() => setCategory('all')}>
                  Browse all fundraisers
                </button>
              </p>
            )}
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
          </div>
          <div className="grid-auto section-body" style={{ '--min': '280px' }}>
            {STEPS.map((s, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={s.title}>
                <article className="step-card">
                  <div className="step-card__media">
                    <Photo name={s.photo} alt="" sizes="(max-width: 720px) 100vw, 400px" />
                  </div>
                  <span className="step-card__badge" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="step-card__text">
                    <h3 className="feature__title">{s.title}</h3>
                    <p className="small" style={{ fontSize: 16 }}>
                      {s.text}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly giving */}
      <section id="monthly" className="section" aria-labelledby="monthly-title">
        <div className="container split" style={{ '--split-gap': '48px' }}>
          <div className="monthly__intro" data-reveal="left">
            <span className="eyebrow">Monthly giving</span>
            <h2 className="h2" id="monthly-title">
              Show up for them every month
            </h2>
            <p className="body">
              A small monthly gift gives shelters, schools and care homes something they rarely have: income they can plan
              around.
            </p>
            <CheckList items={['Pause or cancel anytime from your account']} />
          </div>
          <div className="monthly__plans grid-auto">
            {MONTHLY_PLANS.slice(0, 3).map((p, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={p.title}>
                <div className="card plan-card" style={{ height: '100%' }}>
                  <div className="plan-card__media">
                    <Photo name={p.photo} alt="" position={p.position} sizes="300px" />
                  </div>
                  <div className="plan-card__body">
                    <h3 className="feature__title">{p.title}</h3>
                    <p className="small">{p.text}</p>
                    <Link to={`/monthly/?cause=${p.id}`} className="btn btn--lime">
                      Join monthly
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="impact-band leaf-bg" aria-labelledby="impact-title">
        <div className="container impact-band__grid">
          <div className="impact-band__photo parallax" data-reveal="left">
            <Photo name="students" sizes="(max-width: 900px) 100vw, 560px" />
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
            <CheckList
              items={[
                'Share the story and upload supporting documents',
                'Our team verifies the details before launch',
                'Share on WhatsApp and track every donation live',
              ]}
            />
            <div className="cta-row">
              <Link to="/crowdfunding/" className="btn btn--dark btn--lg">
                Start a fundraiser
              </Link>
              <Link to="/crowdfunding/#faq" className="text-link text-link--ink">
                Talk to our team
              </Link>
            </div>
          </div>
          <div className="feature-grid__photo parallax" data-reveal="zoom">
            <Photo name="community" position="30% center" sizes="(max-width: 1020px) 100vw, 480px" />
          </div>
          <p className="script" data-reveal="flip" aria-hidden="true">
            <span>Share</span>
            <span>Verify</span>
            <span>Track</span>
          </p>
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
            <div className="voice-feature" data-reveal="left">
              <Photo name="meal" alt="" sizes="(max-width: 900px) 100vw, 680px" />
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
      <section className="section section--flush-top" aria-labelledby="closing-title">
        <div className="container">
          <div className="media-tile closing" data-reveal="zoom">
            <Photo name="children" alt="" sizes="(max-width: 1240px) 100vw, 1200px" position="center 30%" />
            <h2 className="h2" id="closing-title">
              Your gift can be someone’s second chance.
            </h2>
            <p className="body">Pick a verified fundraiser and give in under a minute.</p>
            <div className="cta-row">
              <a href="#fundraisers" className="btn btn--primary btn--lg">
                Donate now <Icon name="arrowRight" size={20} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
