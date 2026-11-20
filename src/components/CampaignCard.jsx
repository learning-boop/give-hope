import { Link } from 'react-router-dom'
import Icon from './Icon'
import ShareButton from './ShareButton'
import { Photo, ProgressBar } from './ui'
import { inr, num } from '../site'
import { fundraiserPath, hasProgress, progressOf } from '../data/campaigns'

export default function CampaignCard({ campaign, headingLevel = 3 }) {
  const c = campaign
  const H = `h${headingLevel}`
  const path = fundraiserPath(c)
  return (
    <article className="campaign-card">
      <div className="campaign-card__media">
        <Photo name={c.photo} position={c.photoPosition} sizes="(max-width: 720px) 100vw, 400px" />
        <div className="tags">
          {c.urgent && <span className="tag tag--urgent">Urgent</span>}
          <span className="tag">{c.categoryLabel}</span>
          {c.taxBenefit && <span className="tag tag--lime">80G</span>}
        </div>
        <span className="verified-seal">
          <Icon name="badgeCheck" size={15} strokeWidth={2.4} />
          Verified in person
        </span>
        {c.photoIllustrative && <span className="photo-note">Illustrative photo</span>}
      </div>
      <div className="campaign-card__body">
        <H className="h3 campaign-card__title">
          <Link to={path}>{c.title}</Link>
        </H>
        <p className="organiser">
          <Icon name="badgeCheck" size={16} strokeWidth={2.2} />
          <span>{c.organiser}</span>
          <span aria-hidden="true">·</span>
          <span>{c.location}</span>
        </p>
        {hasProgress(c) && (
          <div className="campaign-card__progress">
            <ProgressBar percent={progressOf(c)} />
            <div className="progress-meta">
              <span>
                <strong>{inr(c.raised)}</strong> of {inr(c.goal)}
              </span>
              {c.donors != null && <span>{num(c.donors)} donors</span>}
            </div>
          </div>
        )}
        <div className="campaign-card__actions">
          <Link to={path} className="btn btn--primary">
            Donate
          </Link>
          <ShareButton title={c.title} path={path} />
        </div>
      </div>
    </article>
  )
}
