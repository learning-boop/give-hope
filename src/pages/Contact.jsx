import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { sendForm } from '../lib/forms'
import { SITE } from '../site'

const TOPICS = [
  { id: 'donation', label: 'My donation or 80G receipt' },
  { id: 'monthly', label: 'My monthly gift' },
  { id: 'fundraiser', label: 'Starting or running a fundraiser' },
  { id: 'ngo', label: 'NGO partnership' },
  { id: 'report', label: 'Report a concern about a fundraiser' },
  { id: 'media', label: 'Media and other questions' },
]

const HELP = [
  { icon: 'receipt', title: 'Tax receipts', text: 'How 80G works and who can claim it.', to: '/blog/section-80g-tax-benefits-on-donations/' },
  { icon: 'shieldCheck', title: 'How we verify', text: 'What we check before a fundraiser goes live.', to: '/how-your-donation-works/' },
  { icon: 'users', title: 'Start a fundraiser', text: 'Documents you need and how it works.', to: '/crowdfunding/' },
]

const real = (v) => v && !v.includes('[')

/** /contact/ — ways to reach the team, a message form and quick links to common answers. */
export default function Contact() {
  const { contact } = SITE
  const [topic, setTopic] = useState(TOPICS[0].id)
  const [form, setForm] = useState({ name: '', email: '', phone: '', link: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit mobile number, or leave it empty.'
    if (form.message.trim().length < 10) next.message = 'Tell us a little more.'
    setErrors(next)
    if (Object.keys(next).length) {
      const el = e.currentTarget
      setTimeout(() => el.querySelector('[aria-invalid="true"]')?.focus(), 0)
      return
    }
    setSending(true)
    try {
      const t = TOPICS.find((x) => x.id === topic).label
      const how = await sendForm(`Message: ${t}`, {
        Topic: t,
        Name: form.name.trim(),
        Email: form.email.trim(),
        Phone: form.phone ? `+91${form.phone}` : 'Not given',
        'Fundraiser or donation': form.link.trim() || 'Not given',
        Message: form.message.trim(),
      })
      setStatus({ ok: true, how })
    } catch (err) {
      setStatus({ ok: false, notConfigured: err.message === 'not-configured' })
    } finally {
      setSending(false)
    }
  }

  const field = (key, label, props = {}) => (
    <div className="field">
      <label htmlFor={`ct-${key}`}>{label}</label>
      <input
        id={`ct-${key}`}
        className="input"
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `ct-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <span id={`ct-${key}-err`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  )

  return (
    <>
      <Seo title="Contact us" description="Questions about a donation, an 80G receipt, a fundraiser or partnering with GiveHope? Message our team on WhatsApp or through the form." path="/contact/" />

      <section className="section blog-head">
        <div className="container">
          <span className="eyebrow">Contact us</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            How can we help?
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>
            Our team in Vijayawada reads every message. The quickest way to reach us is WhatsApp.
          </p>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Ways to reach us">
        <div className="container contact-grid">
          <div className="contact-ways">
            {real(contact.whatsapp) && (
              <a className="contact-way contact-way--wa" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={26} />
                <span>
                  <strong>WhatsApp</strong>
                  <span className="small">+{contact.whatsapp.slice(0, 2)} {contact.whatsapp.slice(2, 7)} {contact.whatsapp.slice(7)}</span>
                </span>
              </a>
            )}
            <div className="contact-way">
              <Icon name="mail" size={24} />
              <span>
                <strong>Email</strong>
                {real(contact.email) ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <span className="small">{contact.email}</span>}
              </span>
            </div>
            <div className="contact-way">
              <Icon name="phone" size={24} />
              <span>
                <strong>Phone</strong>
                {real(contact.phone) ? <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a> : <span className="small">{contact.phone}</span>}
              </span>
            </div>
            <div className="contact-way">
              <Icon name="mapPin" size={24} />
              <span>
                <strong>Office</strong>
                <span className="small">{contact.address}</span>
              </span>
            </div>
            <p className="small">[Office hours, e.g. Monday to Saturday, 10 am to 6 pm]</p>

            <h2 className="feature__title" style={{ marginTop: 12 }}>
              Quick answers
            </h2>
            {HELP.map((h) => (
              <Link to={h.to} className="contact-help" key={h.title}>
                <span className="icon-tile icon-tile--sm icon-tile--lime-tint">
                  <Icon name={h.icon} size={20} />
                </span>
                <span>
                  <strong>{h.title}</strong>
                  <span className="small">{h.text}</span>
                </span>
                <Icon name="arrowRight" size={16} strokeWidth={2.4} />
              </Link>
            ))}
          </div>

          {status?.ok ? (
            <div className="form-card" aria-live="polite">
              <div className="form-success">
                <h2 className="h3">Thank you, {form.name.trim().split(' ')[0]}</h2>
                <p className="small">
                  {status.how === 'whatsapp'
                    ? 'WhatsApp has opened with your message. Press send there and we will reply soon.'
                    : status.how === 'email'
                      ? 'Your email app has opened with your message. Press send there and we will reply soon.'
                      : 'We have your message and will reply soon.'}
                </p>
              </div>
              <button type="button" className="btn btn--outline" onClick={() => setStatus(null)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="form-card" onSubmit={submit} noValidate aria-labelledby="contact-form-title">
              <h2 id="contact-form-title" style={{ fontSize: 24, fontWeight: 800 }}>
                Send us a message
              </h2>
              <div className="field">
                <label htmlFor="ct-topic">What is it about?</label>
                <select id="ct-topic" className="select" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  {TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              {field('name', 'Your name', { autoComplete: 'name' })}
              <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
                {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
                {field('phone', 'Mobile (optional)', {
                  inputMode: 'numeric',
                  maxLength: 10,
                  autoComplete: 'tel-national',
                  onChange: (e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') }),
                })}
              </div>
              {['donation', 'monthly', 'fundraiser', 'report'].includes(topic) &&
                field('link', 'Fundraiser link or donation date (optional)', { placeholder: 'Helps us find it faster' })}
              <div className="field">
                <label htmlFor="ct-message">Message</label>
                <textarea
                  id="ct-message"
                  className="input textarea"
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'ct-message-err' : undefined}
                />
                {errors.message && (
                  <span id="ct-message-err" className="field-error">
                    {errors.message}
                  </span>
                )}
              </div>
              {status && !status.ok && (
                <p className="form-notice" role="alert">
                  {status.notConfigured ? 'Messages are not connected yet, so nothing was sent.' : 'Your message could not be sent. Please try again.'}
                </p>
              )}
              <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
