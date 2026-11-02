import { SITE } from '../site'

/** Opens the native share sheet on phones; falls back to WhatsApp on desktop. */
export function shareFundraiser({ title, path }) {
  const url = SITE.url + path
  const text = `${title} — please support this fundraiser on GiveHope`
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({ title, text, url }).catch(() => {})
    return
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, '_blank', 'noopener')
}
