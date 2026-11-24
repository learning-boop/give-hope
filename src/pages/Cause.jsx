import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import Faq from '../components/Faq'
import { CheckList, Photo } from '../components/ui'
import { CATEGORIES, filterCampaigns } from '../data/campaigns'
import { CAUSE_DETAILS, causePath } from '../data/causes'
import { MONTHLY_PLANS, missionPath } from '../data/monthly'
import { donorFaqs } from '../data/faqs'
import NotFound from './NotFound'

/** One cause: why it matters, its verified fundraisers, a monthly option, and links to the other causes. */
export default function Cause() {
  const { id } = useParams()
  const category = CATEGORIES.find((c) => c.id === id)
  const details = CAUSE_DETAILS[id]
  if (!category || id === 'all' || !details) return <NotFound />

  const list = filterCampaigns(id)
  const plan = MONTHLY_PLANS.find((p) => p.id === details.monthly)
  const others = CATEGORIES.filter((c) => c.id !== id && c.id !== 'all')
  const count = list.length
    ? `${list.length} verified ${list.length === 1 ? 'fundraiser' : 'fundraisers'}`
    : 'No live fundraisers yet'

  return (
    <>
      <Seo
        title={`Donate to ${category.label.toLowerCase()} fundraisers`}
        description={`${details.intro} Give to verified ${category.label.toLowerCase()} fundraisers on GiveHope, with 80G tax receipts where marked.`}
        path={causePath(id)}
      />

      {/* Banner */}
      <section className="dark-hero cause-hero">
        <div className="hero-bg">
          <Photo name={details.photo} alt="" priority />
        </div>
        <div className="container cause-hero__inner">
          <nav aria-label="Breadcrumb" className="cause-hero__crumbs load-in">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <a href="/#fundraisers">Causes</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{category.label}</span>
          </nav>
          <span className="cause-hero__tag load-in">
            <Icon name={details.icon} size={16} strokeWidth={2.4} />
            {category.label}
          </span>
          <h1 className="display cause-hero__title">
            <span className="rise-line">
              <span>{details.headline}</span>
            </span>
          </h1>
          <p className="lead load-in" style={{ '--d': 1 }}>
            {details.intro}
          </p>
          <div className="cta-row load-in" style={{ '--d': 2 }}>
            <a href="#cause-fundraisers" className="btn btn--primary btn--lg btn--pill">
              Donate now
            </a>
            {plan && (
              <Link to={missionPath(plan.id)} className="btn btn--outline-light btn--lg btn--pill">
                Give monthly
              </Link>
            )}
          </div>
          <p className="cause-hero__count load-in" style={{ '--d': 2 }}>
            <Icon name="badgeCheck" size={18} strokeWidth={2.2} />
            {count} · 80G tax receipts where marked
          </p>
        </div>
      </section>

      {/* Fundraisers in this cause */}
      <section id="cause-fundraisers" className="section section--cream" aria-labelledby="cause-list-title">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">{category.label}</span>
              <h2 className="h2" id="cause-list-title">
                Fundraisers that need you
              </h2>
            </div>
            <a href="/#fundraisers" className="text-link">
              All causes <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </a>
          </div>
          {list.length > 0 ? (
            <div className="grid-fill section-body">
              {list.map((c, i) => (
                <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={c.slug}>
                  <CampaignCard campaign={c} />
                </div>
              ))}
            </div>
          ) : (
            <div className="cause-empty section-body">
              <p className="body">
                There are no live {category.label.toLowerCase()} fundraisers right now. New ones go live as soon as our team
                has verified them.
              </p>
              <div className="cta-row">
                <a href="/#fundraisers" className="btn btn--dark">
                  See all fundraisers
                </a>
                {plan && (
                  <Link to={missionPath(plan.id)} className="btn btn--outline">
                    Give monthly instead
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Monthly option */}
      {plan && (
        <section className="section section--flush-top section--cream" aria-labelledby="cause-monthly-title">
          <div className="container">
            <div className="cause-monthly" data-reveal>
              <div className="cause-monthly__photo">
                <Photo name={plan.photo} alt="" position={plan.position} sizes="(max-width: 820px) 100vw, 480px" />
              </div>
              <div className="cause-monthly__copy">
                <span className="eyebrow">Monthly giving</span>
                <h2 className="h2" id="cause-monthly-title">
                  {plan.title}
                </h2>
                <p className="body">{plan.text}</p>
                <CheckList items={['Pause or cancel anytime from your account', '80G tax receipts for your gifts']} />
                <Link to={missionPath(plan.id)} className="btn btn--lime btn--lg">
                  Pledge monthly
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About the cause */}
      <section className="section" aria-labelledby="cause-about-title">
        <div className="container cause-about">
          <div className="cause-about__copy" data-reveal="left">
            <span className="eyebrow">About the cause</span>
            <h2 className="h2" id="cause-about-title">
              Why your help matters
            </h2>
            {details.about.map((p) => (
              <p className="body" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
          </div>
          <div className="cause-about__trust" data-reveal="right">
            <h3 className="feature__title">Every fundraiser here is</h3>
            <CheckList
              items={[
                'Checked by our team before it goes live',
                'Paid to the hospital, NGO or verified beneficiary',
                'Followed by updates with bills and photos',
              ]}
            />
            <Link to="/crowdfunding/" className="text-link">
              Raising money for this cause? Start a fundraiser <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Other causes */}
      <section className="section section--cream" aria-labelledby="cause-others-title">
        <div className="container">
          <div className="causes-head" data-reveal>
            <span className="eyebrow">Explore</span>
            <h2 className="h2" id="cause-others-title">
              Other causes you can support
            </h2>
          </div>
          <div className="cause-filter">
            {others.map((cat) => {
              const { photo, icon } = CAUSE_DETAILS[cat.id]
              return (
                <Link to={causePath(cat.id)} className={`cause-chip${cat.id === 'urgent' ? ' cause-chip--urgent' : ''}`} key={cat.id}>
                  <span className="cause-chip__media">
                    <span className="cause-chip__photo">
                      <img src={`/images/${photo}-thumb.webp`} width="240" height="240" alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="cause-chip__icon">
                      <Icon name={icon} size={14} strokeWidth={2.4} />
                    </span>
                  </span>
                  <span className="cause-chip__label">{cat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="cause-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="cause-faq-title">
              Before you give
            </h2>
            <p className="body">Straight answers about tax benefits, verification and where your money goes.</p>
          </div>
          <div className="faq-layout__list">
            <Faq items={donorFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
