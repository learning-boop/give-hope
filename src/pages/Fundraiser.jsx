import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import CampaignCard from '../components/CampaignCard'
import QuickDonateCard from '../components/QuickDonateCard'
import { shareFundraiser } from '../lib/share'
import { Photo } from '../components/ui'
import { campaigns, fundraiserPath, getCampaign } from '../data/campaigns'
import { SITE, num } from '../site'
import NotFound from './NotFound'

export default function Fundraiser() {
  const { slug } = useParams()
  const campaign = getCampaign(slug)
  const [copied, setCopied] = useState(false)

  if (!campaign) return <NotFound />

  const c = campaign
  const path = fundraiserPath(c)
  const more = campaigns.filter((x) => x.slug !== c.slug).slice(0, 3)

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
            <a href="/#fundraisers">Fundraisers</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.categoryLabel}</span>
          </nav>

          <div className="detail-layout">
            <div className="detail-layout__main">
              <figure className="detail-photo">
                <Photo name={c.photo} position={c.photoPosition} priority sizes="(max-width: 900px) 100vw, 760px" />
                {c.photoIllustrative && <figcaption className="photo-note">Illustrative photo, not the beneficiary</figcaption>}
              </figure>
              <div className="stack">
                <div className="tags">
                  {c.urgent && <span className="tag tag--urgent">Urgent</span>}
                  <span className="tag">{c.categoryLabel}</span>
                  {c.taxBenefit && <span className="tag tag--lime">80G tax benefit</span>}
                </div>
                <h1 className="h2">{c.title}</h1>
                <p className="organiser" style={{ fontSize: 15 }}>
                  <Icon name="badgeCheck" size={18} strokeWidth={2.2} />
                  <span>Organised by {c.organiser}</span>
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

              <div className="detail-block">
                <h2 className="h3">About this fundraiser</h2>
                <p className="body">{c.summary}</p>
                <p className="body">
                  [Full story — who the beneficiary is, what happened, what the money will pay for and by when. Written by the
                  organiser and reviewed by GiveHope.]
                </p>
              </div>

              <div className="detail-block">
                <h2 className="h3">Verified documents</h2>
                <ul className="check-list">
                  <li>
                    <Icon name="check" size={20} strokeWidth={2.4} />
                    [Document name] — verified by GiveHope on [date]
                  </li>
                  <li>
                    <Icon name="check" size={20} strokeWidth={2.4} />
                    [Document name] — verified by GiveHope on [date]
                  </li>
                </ul>
              </div>

              <div className="detail-block">
                <h2 className="h3">Updates</h2>
                <p className="body">[Updates with bills, receipts and photos appear here as funds are used.]</p>
              </div>
            </div>

            <aside className="detail-layout__aside" aria-label="Donate to this fundraiser">
              <QuickDonateCard
                campaign={c}
                showTitle={false}
                onDonate={(amount) => {
                  // TODO: open your payment gateway checkout here (e.g. Razorpay) with `amount` and `c.slug`
                  console.info('Donate', { fundraiser: c.slug, amount })
                }}
              />
              <div className="share-row">
                <button type="button" className="btn btn--dark" onClick={() => shareFundraiser({ title: c.title, path })}>
                  <Icon name="message" size={18} /> Share
                </button>
                <button type="button" className="btn btn--outline" onClick={copyLink} aria-live="polite">
                  <Icon name="link" size={18} /> {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </aside>
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
            <Link to="/" className="text-link">
              View all <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </Link>
          </div>
          <div className="grid-fill section-body">
            {more.map((m, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={m.slug}>
                <CampaignCard campaign={m} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
