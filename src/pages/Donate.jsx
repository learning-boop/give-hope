import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import DonateFlow from '../components/DonateFlow'
import { Photo, ProgressBar } from '../components/ui'
import { fundraiserPath, getCampaign, hasProgress, progressOf } from '../data/campaigns'
import { getMission, missionDonatePath, missionPath } from '../data/monthly'
import { cityName, getNgo, ngoPath } from '../data/ngos'
import { inr, num } from '../site'
import NotFound from './NotFound'

/**
 * The donation steps beside a summary of what you are giving to.
 *   /donate/<fundraiser>/          one-time gift to a fundraiser
 *   /donate/mission/<mission>/     monthly pledge to a mission (kind="mission")
 *   /donate/ngo/<ngo>/             one-time gift to an NGO's work (kind="ngo")
 */
export default function Donate({ kind = 'fundraiser' }) {
  const { slug } = useParams()

  if (kind === 'mission') {
    const m = getMission(slug)
    if (!m) return <NotFound />
    const path = missionPath(m.id)
    return (
      <DonateLayout
        seo={{ title: `Pledge monthly: ${m.title}`, description: m.tagline, path: missionDonatePath(m.id) }}
        back={{ to: path, label: 'Back to mission' }}
        photo={m.photo}
        position={m.position}
        tags={
          <>
            <span className="tag">Monthly mission</span>
            <span className="tag tag--lime">80G tax benefit</span>
          </>
        }
        title={`Mission: ${m.title}`}
        byline={m.text}
        trust={['Goes to verified partner NGOs', 'Pay by UPI, card or netbanking', 'Pause or cancel anytime']}
        target={{
          kind: 'mission',
          title: `Mission: ${m.title}`,
          url: path,
          taxBenefit: true,
          monthly: true,
          presets: m.amounts.map((a) => a.amount),
          popular: m.amounts[1]?.amount,
        }}
      />
    )
  }

  if (kind === 'ngo') {
    const n = getNgo(slug)
    if (!n) return <NotFound />
    const path = ngoPath(n.id)
    return (
      <DonateLayout
        seo={{ title: `Donate to ${n.name}`, description: n.tagline, path: `/donate/ngo/${n.id}/` }}
        back={{ to: path, label: 'Back to NGO' }}
        photo={n.photo}
        tags={
          <>
            <span className="tag">Verified NGO</span>
            <span className="tag tag--lime">80G tax benefit</span>
          </>
        }
        title={n.name}
        byline={`${cityName(n.city)}, ${n.state}`}
        trust={['Verified by our team in person', 'Pay by UPI, card or netbanking', '80G receipt emailed to you']}
        target={{ kind: 'ngo', title: n.name, url: path, taxBenefit: true }}
      />
    )
  }

  const c = getCampaign(slug)
  if (!c) return <NotFound />
  const path = fundraiserPath(c)
  return (
    <DonateLayout
      seo={{ title: `Donate: ${c.title}`, description: c.summary, path: `/donate/${c.slug}/` }}
      back={{ to: path, label: 'Back to fundraiser' }}
      photo={c.photo}
      position={c.photoPosition}
      tags={
        <>
          {c.urgent && <span className="tag tag--urgent">Urgent</span>}
          {c.taxBenefit && <span className="tag tag--lime">80G tax benefit</span>}
        </>
      }
      title={c.title}
      byline={`by ${c.organiser}`}
      progress={
        hasProgress(c) && (
          <>
            <ProgressBar percent={progressOf(c)} />
            <div className="progress-meta">
              <span>
                <strong>{inr(c.raised)}</strong> of {inr(c.goal)}
              </span>
              {c.donors != null && <span>{num(c.donors)} donors</span>}
            </div>
          </>
        )
      }
      trust={[
        'Verified by our team before it went live',
        'Pay by UPI, card or netbanking',
        ...(c.taxBenefit ? ['80G receipt emailed to you'] : []),
      ]}
      target={{ kind: 'fundraiser', title: c.title, url: path, taxBenefit: c.taxBenefit }}
    />
  )
}

const TRUST_ICONS = ['shieldCheck', 'lock', 'receipt']

function DonateLayout({ seo, back, photo, position, tags, title, byline, progress, trust, target }) {
  return (
    <>
      <Seo {...seo} noindex />
      <section className="section donate-page">
        <div className="container donate-page__grid">
          <aside className="donate-page__summary" aria-label="You are donating to">
            <Link to={back.to} className="donate-page__back">
              <Icon name="arrowLeft" size={18} strokeWidth={2.2} /> {back.label}
            </Link>
            <div className="donate-page__card">
              <div className="donate-page__photo">
                <Photo name={photo} alt="" position={position} sizes="(max-width: 900px) 100vw, 420px" />
              </div>
              <div className="stack" style={{ '--stack-gap': '10px', padding: 20 }}>
                <div className="tags">{tags}</div>
                <h1 className="h3">{title}</h1>
                <p className="small">{byline}</p>
                {progress}
              </div>
            </div>
            <ul className="donate-page__trust" role="list">
              {trust.map((t, i) => (
                <li key={t}>
                  <Icon name={TRUST_ICONS[i]} size={18} /> {t}
                </li>
              ))}
            </ul>
          </aside>

          <DonateFlow target={target} />
        </div>
      </section>
    </>
  )
}
