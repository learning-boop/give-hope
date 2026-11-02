import Icon from './Icon'
import { shareFundraiser } from '../lib/share'

export default function ShareButton({ title, path, className = 'icon-btn' }) {
  return (
    <button type="button" className={className} aria-label={`Share: ${title}`} onClick={() => shareFundraiser({ title, path })}>
      <Icon name="share" size={20} />
    </button>
  )
}
