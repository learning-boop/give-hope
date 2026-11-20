import Icon from './Icon'
import { SITE } from '../site'

const MESSAGE = 'Hi Give Hope, I would like to know more about donating or starting a fundraiser.'

/** Floating chat button. Shows only once SITE.contact.whatsapp has a real number. */
export default function WhatsAppButton() {
  const number = SITE.contact.whatsapp
  if (!/^\d{11,15}$/.test(number)) return null
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${number}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Give Hope on WhatsApp"
    >
      <Icon name="whatsapp" size={28} strokeWidth={1.8} />
    </a>
  )
}
