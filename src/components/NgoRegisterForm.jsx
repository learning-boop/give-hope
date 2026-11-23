import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../site'
import { NGO_CAUSES, NGO_CERTIFICATES, NGO_TYPES } from '../data/ngo'

// What the NGO sees after sending, depending on how the answers went out (see lib/forms.js)
const SENT_MESSAGES = {
  sent: 'We have your details. Our team will call the contact person to collect copies of your documents and plan a verification visit.',
  whatsapp: 'WhatsApp has opened with your details filled in. Press send there, and our team will call you back.',
  email: 'Your email app has opened with your details filled in. Press send there, and our team will call you back.',
}

const EMPTY = {
  orgName: '',
  orgType: NGO_TYPES[0],
  regNumber: '',
  pan: '',
  year: '',
  city: '',
  state: 'Andhra Pradesh',
  website: '',
  work: '',
  contactName: '',
  role: '',
  phone: '',
  email: '',
}

/** Toggle a value in a list (for the multi-select chips) */
const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

/**
 * Register-your-NGO form.
 * `onSubmit(data)` sends the answers and resolves 'sent', 'whatsapp' or 'email', or rejects if they could not go.
 */
export default function NgoRegisterForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY)
  const [certs, setCerts] = useState([])
  const [causes, setCauses] = useState([])
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  function validate() {
    const next = {}
    if (form.orgName.trim().length < 3) next.orgName = 'Enter your organisation’s registered name.'
    if (!form.regNumber.trim()) next.regNumber = 'Enter your registration number.'
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(form.pan)) next.pan = 'Enter a valid 10-character PAN, e.g. AAATG1234K.'
    if (form.year && !/^(19|20)\d{2}$/.test(form.year)) next.year = 'Enter a 4-digit year, or leave it empty.'
    if (!form.city.trim()) next.city = 'Enter the city or town.'
    if (!form.state.trim()) next.state = 'Enter the state.'
    if (!causes.length) next.causes = 'Pick at least one area you work in.'
    if (form.work.trim().length < 30) next.work = 'Tell us a little more, in at least 30 characters.'
    if (!form.contactName.trim()) next.contactName = 'Enter the contact person’s name.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!confirmed) next.confirmed = 'Please confirm before sending.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) {
      // Move focus to the first problem so keyboard and screen-reader users land on it
      const formEl = e.currentTarget
      setTimeout(() => formEl.querySelector(':is(input, select, textarea, button)[aria-invalid="true"]')?.focus(), 0)
      return
    }
    const data = {
      ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])),
      phone: `+91${form.phone}`,
      certificates: certs,
      causes,
    }
    setSendError('')
    setSending(true)
    try {
      setSubmitted((await onSubmit?.(data)) || 'sent')
    } catch (err) {
      const call = SITE.contact.phone.includes('[') ? '' : ` Please call us on ${SITE.contact.phone}.`
      setSendError(
        err.message === 'not-configured'
          ? `Online registration is not connected yet, so your details were not sent.${call}`
          : `Your details could not be sent. Please try again in a moment.${call}`,
      )
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-card" aria-live="polite">
        <div className="form-success">
          <h2 className="h3">Thank you for registering {form.orgName.trim()}</h2>
          <p className="small">{SENT_MESSAGES[submitted]}</p>
        </div>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => {
            setForm(EMPTY)
            setCerts([])
            setCauses([])
            setConfirmed(false)
            setSubmitted(null)
          }}
        >
          Register another organisation
        </button>
      </div>
    )
  }

  // A text field with its label and error message
  const text = (key, label, props = {}) => (
    <div className="field">
      <label htmlFor={`ngo-${key}`}>{label}</label>
      <input
        id={`ngo-${key}`}
        className="input"
        type="text"
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `ngo-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <span id={`ngo-${key}-err`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  )

  return (
    <form className="form-card ngo-form" onSubmit={handleSubmit} noValidate aria-labelledby="ngo-form-title">
      <div className="stack" style={{ '--stack-gap': '6px' }}>
        <h2 id="ngo-form-title" style={{ fontSize: 24, fontWeight: 800 }}>
          Register your NGO
        </h2>
        <p className="small">It takes about 5 minutes. Fields marked optional can be left empty.</p>
      </div>

      {/* Organisation */}
      <fieldset className="ngo-form__group">
        <legend className="ngo-form__legend">1. Your organisation</legend>
        {text('orgName', 'Registered name of the organisation', { autoComplete: 'organization' })}
        <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
          <div className="field">
            <label htmlFor="ngo-orgType">Registered as</label>
            <select id="ngo-orgType" className="select" value={form.orgType} onChange={set('orgType')}>
              {NGO_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          {text('regNumber', 'Registration number')}
        </div>
        <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
          {text('pan', 'PAN of the organisation', {
            maxLength: 10,
            placeholder: 'AAATG1234K',
            autoCapitalize: 'characters',
            onChange: (e) => setForm({ ...form, pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }),
          })}
          {text('year', 'Year founded (optional)', {
            inputMode: 'numeric',
            maxLength: 4,
            placeholder: 'e.g. 2012',
            onChange: (e) => setForm({ ...form, year: e.target.value.replace(/\D/g, '') }),
          })}
        </div>
        <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
          {text('city', 'City or town', { autoComplete: 'address-level2' })}
          {text('state', 'State', { autoComplete: 'address-level1' })}
        </div>
        {text('website', 'Website or social page (optional)', { type: 'url', inputMode: 'url', placeholder: 'https://' })}
      </fieldset>

      {/* Certificates and work */}
      <fieldset className="ngo-form__group">
        <legend className="ngo-form__legend">2. Certificates and work</legend>
        <div className="field">
          <fieldset>
            <legend>Which of these do you already have? (optional)</legend>
            <div className="choice-grid ngo-form__chips">
              {NGO_CERTIFICATES.map((c) => (
                <button key={c} type="button" className="chip chip--tile" aria-pressed={certs.includes(c)} onClick={() => setCerts(toggle(certs, c))}>
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
          <span className="small" style={{ fontSize: 14 }}>
            Donors only get 80G tax receipts for fundraisers run by NGOs with a valid 80G certificate.
          </span>
        </div>
        <div className="field">
          <fieldset aria-describedby={errors.causes ? 'ngo-causes-err' : undefined}>
            <legend>Areas you work in</legend>
            <div className="choice-grid ngo-form__chips">
              {NGO_CAUSES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip chip--tile"
                  aria-pressed={causes.includes(c)}
                  aria-invalid={errors.causes ? true : undefined}
                  onClick={() => setCauses(toggle(causes, c))}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
          {errors.causes && (
            <span id="ngo-causes-err" className="field-error">
              {errors.causes}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="ngo-work">What do you want to raise funds for?</label>
          <textarea
            id="ngo-work"
            className="input textarea"
            rows={4}
            placeholder="The project or programme, who it helps, and roughly how much you need."
            value={form.work}
            onChange={set('work')}
            aria-invalid={Boolean(errors.work)}
            aria-describedby={errors.work ? 'ngo-work-err' : undefined}
          />
          {errors.work && (
            <span id="ngo-work-err" className="field-error">
              {errors.work}
            </span>
          )}
        </div>
      </fieldset>

      {/* Contact person */}
      <fieldset className="ngo-form__group">
        <legend className="ngo-form__legend">3. Contact person</legend>
        <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
          {text('contactName', 'Full name', { autoComplete: 'name' })}
          {text('role', 'Role in the NGO (optional)', { placeholder: 'e.g. Secretary', autoComplete: 'organization-title' })}
        </div>
        <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
          <div className="field">
            <label htmlFor="ngo-phone">Mobile number</label>
            <div className="input-group" aria-invalid={Boolean(errors.phone)}>
              <span className="input-group__prefix" aria-hidden="true">
                +91
              </span>
              <input
                id="ngo-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'ngo-phone-err' : undefined}
              />
            </div>
            {errors.phone && (
              <span id="ngo-phone-err" className="field-error">
                {errors.phone}
              </span>
            )}
          </div>
          {text('email', 'Email address', { type: 'email', autoComplete: 'email' })}
        </div>
      </fieldset>

      <div className="field">
        <label className="ngo-form__confirm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            aria-invalid={Boolean(errors.confirmed)}
            aria-describedby={errors.confirmed ? 'ngo-confirmed-err' : undefined}
          />
          <span>I confirm these details are correct and I am allowed to register this organisation.</span>
        </label>
        {errors.confirmed && (
          <span id="ngo-confirmed-err" className="field-error">
            {errors.confirmed}
          </span>
        )}
      </div>

      {sendError && (
        <p className="form-notice" role="alert">
          {sendError}
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
        {sending ? 'Sending…' : 'Send for verification'}
      </button>
      <p className="small" style={{ fontSize: 13 }}>
        Please don’t attach documents here. Our team will tell you where to send copies after we call. By sending you agree
        to our <Link to="/terms/">Terms</Link> and <Link to="/privacy-policy/">Privacy policy</Link>.
      </p>
    </form>
  )
}
