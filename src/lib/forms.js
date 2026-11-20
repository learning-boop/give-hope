import { SITE } from '../site'

const isEmail = (value) => /^[^\s@[\]]+@[^\s@[\]]+\.[^\s@[\]]+$/.test(value || '')
const isWhatsApp = (value) => /^\d{11,15}$/.test(value || '')

/**
 * Sends a form's answers to the team.
 *  - With SITE.forms.endpoint set (a Web3Forms or Formspree URL), posts them and resolves 'sent'.
 *  - Otherwise opens WhatsApp, or the email app, with the answers filled in and resolves
 *    'whatsapp' or 'email' — the visitor still has to press send there.
 * Rejects when nothing is set up yet, or when the form service fails.
 */
export async function sendForm(subject, fields) {
  const { endpoint, accessKey } = SITE.forms

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...(accessKey ? { access_key: accessKey } : {}), subject, ...fields }),
    })
    if (!res.ok) throw new Error(`The form service replied ${res.status}`)
    return 'sent'
  }

  const text = [subject, '', ...Object.entries(fields).map(([label, value]) => `${label}: ${value}`)].join('\n')
  if (isWhatsApp(SITE.contact.whatsapp)) {
    window.open(`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    return 'whatsapp'
  }
  if (isEmail(SITE.contact.email)) {
    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    return 'email'
  }
  throw new Error('not-configured')
}
