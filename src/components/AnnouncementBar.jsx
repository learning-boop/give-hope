import Icon from './Icon'
import { SITE } from '../site'

export default function AnnouncementBar() {
  const { show, text, linkText, href } = SITE.announcement
  if (!show) return null
  return (
    <div className="announcement" role="region" aria-label="Announcement">
      <span>{text}</span>
      <a href={href}>
        {linkText}
        <Icon name="arrowRight" size={16} strokeWidth={2.2} />
      </a>
    </div>
  )
}
