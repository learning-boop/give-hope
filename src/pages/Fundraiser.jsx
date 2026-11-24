import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import Faq from '../components/Faq'
import QuickDonateCard from '../components/QuickDonateCard'
import { shareFundraiser } from '../lib/share'
import { Photo } from '../components/ui'
import { campaigns, fundraiserPath, getCampaign } from '../data/campaigns'
import { causePath } from '../data/causes'
import { donorFaqs } from '../data/faqs'
import { getNgo, ngoPath } from '../data/ngos'
import { SITE, inr, num } from '../site'
import NotFound from './NotFound'

// Updates shown before "View more"
const UPDATES_SHOWN = 2

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const PROMISES = [
  { icon: 'shieldCheck', title: 'Verified', text: 'Checked by our team before it went live' },
  { icon: 'receipt', title: 'Tax benefit', text: '80G receipts on eligible fundraisers' },
  { icon: 'fileText', title: 'Accountable', text: 'Bills and photos posted as money is used' },
]

export default function Fundraiser() {
  const { slug } = useParams()
  const campaign = getCampaign(slug)
  const [copied, setCopied] = useState(false)
  const [allUpdates, setAllUpdates] = useState(false)

  if (!campaign) return <NotFound />

  const c = campaign
  const path = fundraiserPath(c)
  const donatePath = `/donate/${c.slug}/`
  const more = campaigns.filter((x) => x.slug !== c.slug).slice(0, 3)
  const updates = c.updates || []
  const ngo = c.ngo ? getNgo(c.ngo) : null
  const shownUpdates = allUpdates ? updates : updates.slice(0, UPDATES_SHOWN)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(SITE.url + path)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <>
      {/* Each fundraiser is prerendered with its own title, description and share preview */}
      <Seo title={c.title} description={c.summary} path={path} image={`/images/og/${c.photo}.jpg`} />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={causePath(c.category)}>{c.categoryLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Fundraiser</span>
          </nav>

          <div className="detail-layout">
            <div className="detail-layout__main">
              <div className="stack">
                <div className="tags">
                  {c.urgent && <span className="tag tag--urgent">Urgent</span>}
                  <span className="tag">{c.categoryLabel}</span>
                  {c.taxBenefit && <span className="tag tag--lime">80G tax benefit</span>}
                </div>
                <h1 className="h2">{c.title}</h1>
                <p className="organiser" style={{ fontSize: 15 }}>
                  <Icon name="badgeCheck" size={18} strokeWidth={2.2} />
                  <span>By {c.organiser}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.location}</span>
                  {c.daysLeft != null && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{num(c.daysLeft)} days left</span>
                    </>
                  )}
                </p>
              </div>

              <figure className="detail-photo">
                <Photo name={c.photo} position={c.photoPosition} priority sizes="(max-width: 900px) 100vw, 760px" />
                {c.photoIllustrative && <figcaption className="photo-note">Illustrative photo, not the beneficiary</figcaption>}
              </figure>

              <div className="detail-block" id="story">
                <h2 className="h3">Story</h2>
                <p className="body">{c.summary}</p>
                {c.story?.length ? (
                  c.story.map((p, i) => (
                    <div key={i} className="stack" style={{ '--stack-gap': '10px' }}>
                      {c.storyHeadings?.[i] && <h3 className="feature__title">{c.storyHeadings[i]}</h3>}
                      <p className="body">{p}</p>
                    </div>
                  ))
                ) : (
                  <p className="body">
                    [Full story — who the beneficiary is, what happened, what the money will pay for and by when. Written by the
                    organiser and reviewed by GiveHope.]
                  </p>
                )}
                <p className="detail-note">
                  <Icon name="lock" size={18} /> Donate easily through UPI, all debit and credit cards and netbanking.
                </p>
                {c.taxBenefit && (
                  <p className="detail-note">
                    <Icon name="receipt" size={18} /> Donations to this fundraiser are eligible for tax deduction under Section
                    80G of the Income Tax Act.
                  </p>
                )}
              </div>

              <div className="detail-block" id="updates">
                <h2 className="h3">Updates</h2>
                {updates.length ? (
                  <>
                    <ol className="update-list">
                      {shownUpdates.map((u) => (
                        <li key={u.date + u.text.slice(0, 12)}>
                          <time dateTime={u.date}>{formatDate(u.date)}</time>
                          <p className="body">{u.text}</p>
                        </li>
                      ))}
                    </ol>
                    {updates.length > UPDATES_SHOWN && (
                      <button type="button" className="text-link update-list__more" onClick={() => setAllUpdates(!allUpdates)} aria-expanded={allUpdates}>
                        {allUpdates ? 'Show fewer updates' : `View ${updates.length - UPDATES_SHOWN} more`}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="body">[Updates with bills, receipts and photos appear here as funds are used.]</p>
                )}
              </div>

              <div className="detail-block">
                <h2 className="h3">Verified documents</h2>
                <ul className="check-list">
                  {(c.documents?.length ? c.documents : [{ name: '[Document name]' }, { name: '[Document name]' }]).map((d, i) => (
                    <li key={i}>
                      <Icon name="check" size={20} strokeWidth={2.4} />
                      {d.name} — verified by GiveHope {d.date ? `on ${formatDate(d.date)}` : 'on [date]'}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-block">
                <h2 className="h3">Organisers</h2>
                <ul className="organiser-list" role="list">
                  <li>
                    <span className="organiser-list__avatar" aria-hidden="true">
                      {c.organiser.replace(/[[\]]/g, '').charAt(0)}
                    </span>
                    <span>
                      <strong>{ngo ? <Link to={ngoPath(ngo.id)}>{ngo.name}</Link> : c.organiser}</strong>
                      <span className="small">{ngo ? 'Verified NGO · Organiser' : 'Organiser'}</span>
                    </span>
                  </li>
                  <li>
                    <span className="organiser-list__avatar organiser-list__avatar--lime" aria-hidden="true">
                      <Icon name="homeHeart" size={20} />
                    </span>
                    <span>
                      <strong>{c.beneficiary || '[Hospital, NGO or beneficiary account]'}</strong>
                      <span className="small">Money is paid to</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <aside className="detail-layout__aside" aria-label="Donate to this fundraiser">
              <QuickDonateCard campaign={c} showTitle={false} />
              <div className="share-row">
                <button type="button" className="btn btn--dark" onClick={() => shareFundraiser({ title: c.title, path })}>
                  <Icon name="message" size={18} /> Share
                </button>
                <button type="button" className="btn btn--outline" onClick={copyLink} aria-live="polite">
                  <Icon name="link" size={18} /> {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
              <p className="small share-hint">Can’t give right now? Sharing on WhatsApp helps this fundraiser reach more people.</p>
              {c.topDonations?.length > 0 && (
                <div className="top-donations">
                  <h2 className="feature__title">Top donations</h2>
                  <ol role="list">
                    {c.topDonations.slice(0, 5).map((d, i) => (
                      <li key={i}>
                        <span>{d.name}</span>
                        <strong>{inr(d.amount)}</strong>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Why give through GiveHope */}
      <section className="section section--flush-top" aria-label="Why give through GiveHope">
        <div className="container">
          <ul className="promise-strip" role="list">
            {PROMISES.map((p) => (
              <li key={p.title}>
                <span className="icon-tile icon-tile--sm icon-tile--lime-tint">
                  <Icon name={p.icon} size={22} />
                </span>
                <span>
                  <strong>{p.title}</strong>
                  <span className="small">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--flush-top" aria-labelledby="fr-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="fr-faq-title">
              Before you give
            </h2>
            <p className="body">Straight answers about tax benefits, verification and where your money goes.</p>
          </div>
          <div className="faq-layout__list">
            <Faq items={donorFaqs} />
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="more-title">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">Keep giving</span>
              <h2 className="h2" id="more-title">
                More fundraisers that need you
              </h2>
            </div>
            <a href="/#fundraisers" className="text-link">
              View all <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </a>
          </div>
          <div className="grid-fill section-body">
            {more.map((m, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={m.slug}>
                <CampaignCard campaign={m} />
              </div>
            ))}
          </div>
          <p className="small consent-note">
            Disclaimer: Photos, videos and stories of beneficiaries, including children, are used to raise awareness and
            donations for their cause, only with consent from them or their guardians.
          </p>
        </div>
      </section>

      {/* Phones: a donate bar that stays at the bottom of the screen */}
      <div className="sticky-donate">
        <Link to={donatePath} className="btn btn--primary btn--block">
          Donate now
        </Link>
        <button type="button" className="icon-btn" aria-label="Share this fundraiser" onClick={() => shareFundraiser({ title: c.title, path })}>
          <Icon name="share" size={20} />
        </button>
      </div>
    </>
  )
}
