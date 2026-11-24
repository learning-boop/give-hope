import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { startDonation } from '../lib/payments'
import { SITE, inr } from '../site'

const TIPS = [0, 5, 10, 15]

// What the donor sees after confirming, depending on how the pledge went out (see lib/payments.js)
const SENT = {
  sent: 'We have your donation details. Our team will send you a secure payment link on WhatsApp or email shortly.',
  whatsapp: 'WhatsApp has opened with your donation details. Press send there, and our team will reply with a secure payment link.',
  email: 'Your email app has opened with your donation details. Press send there, and our team will reply with a secure payment link.',
}

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
]

const EMPTY = { name: '', email: '', phone: '', pan: '', address: '', city: '', state: 'Andhra Pradesh', pincode: '', message: '' }

/**
 * Three-step donation: amount → your details → review.
 * `target` describes what the money is for: { kind, title, url, taxBenefit, presets, popular, monthly }.
 * Monthly targets (missions) use the same flow with monthly amounts.
 */
export default function DonateFlow({ target }) {
  const presets = target.presets || [1000, 2500, 5000]
  const popular = target.popular ?? presets[1]
  const [step, setStep] = useState(1)
  const [preset, setPreset] = useState(popular)
  const [custom, setCustom] = useState('')
  const [tipPct, setTipPct] = useState(0)
  const [showGift, setShowGift] = useState(false)
  const [giftCard, setGiftCard] = useState('')
  const [citizen, setCitizen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [wants80g, setWants80g] = useState(Boolean(target.taxBenefit))
  const [anonymous, setAnonymous] = useState(false)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [sent, setSent] = useState(null)

  // A link like /donate/<slug>/?amount=5000 preselects that amount (read after load: pages are prerendered)
  useEffect(() => {
    const a = Number(new URLSearchParams(window.location.search).get('amount'))
    if (!a) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable after hydration
    if (presets.includes(a)) setPreset(a)
    else {
      setPreset(null)
      setCustom(String(a))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on load
  }, [])

  const amount = preset ?? (Number(custom.replace(/[^\d]/g, '')) || 0)
  const tip = Math.round((amount * tipPct) / 100)
  const total = amount + tip
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  // Focus the first field with a problem, so keyboard and screen-reader users land on it
  function focusFirstError(formEl) {
    setTimeout(() => formEl.querySelector('[aria-invalid="true"]')?.focus(), 0)
  }

  function nextFromAmount(e) {
    e.preventDefault()
    const next = {}
    if (amount < 100) next.amount = 'Enter an amount of ₹100 or more.'
    if (!citizen) next.citizen = 'Please confirm that you are an Indian citizen.'
    setErrors(next)
    if (Object.keys(next).length) return focusFirstError(e.currentTarget)
    setStep(2)
  }

  function nextFromDetails(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (wants80g) {
      if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(form.pan)) next.pan = 'Enter a valid 10-character PAN, e.g. ABCDE1234F.'
      if (form.address.trim().length < 5) next.address = 'Enter your address.'
      if (!form.city.trim()) next.city = 'Enter your city.'
      if (!/^\d{6}$/.test(form.pincode)) next.pincode = 'Enter a 6-digit pincode.'
    }
    setErrors(next)
    if (Object.keys(next).length) return focusFirstError(e.currentTarget)
    setStep(3)
  }

  async function confirm() {
    setSendError('')
    setSending(true)
    try {
      const how = await startDonation({
        kind: target.kind,
        title: target.title,
        url: SITE.url + target.url,
        monthly: Boolean(target.monthly),
        amount,
        tip,
        giftCard: giftCard.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: `+91${form.phone}`,
        wants80g,
        pan: form.pan,
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state,
        pincode: form.pincode,
        anonymous,
        message: form.message.trim(),
      })
      setSent(how)
    } catch (err) {
      const call = SITE.contact.phone.includes('[') ? '' : ` Please call us on ${SITE.contact.phone}.`
      setSendError(
        err.message === 'not-configured'
          ? `Donations are not connected yet, so nothing was sent.${call}`
          : `Your donation could not be sent. Please try again in a moment.${call}`,
      )
    } finally {
      setSending(false)
    }
  }

  // A text field with its label and error message
  const field = (key, label, props = {}) => (
    <div className="field">
      <label htmlFor={`dn-${key}`}>{label}</label>
      <input
        id={`dn-${key}`}
        className="input"
        type="text"
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `dn-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <span id={`dn-${key}-err`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  )

  if (sent) {
    return (
      <div className="form-card donate-flow" aria-live="polite">
        <div className="form-success">
          <h2 className="h3">Thank you, {form.name.trim().split(' ')[0]}!</h2>
          <p className="small">{SENT[sent]}</p>
          <p className="small">
            Your gift of <strong>{inr(total)}</strong>
            {target.monthly ? ' every month' : ''} to <strong>{target.title}</strong> is noted.
            {wants80g && ' Your 80G receipt will be emailed after the payment is received.'}
          </p>
        </div>
        <Link to={target.url} className="btn btn--outline">
          Back to {target.kind === 'mission' ? 'the mission' : target.kind === 'ngo' ? 'the NGO' : 'the fundraiser'}
        </Link>
      </div>
    )
  }

  return (
    <div className="form-card donate-flow">
      <div className="stack" style={{ '--stack-gap': '10px' }}>
        <div className="donate-flow__head">
          <h2 className="h3" id="donate-step-title">
            {step === 1 ? (target.monthly ? 'Choose a monthly amount' : 'Choose an amount') : step === 2 ? 'Your details' : 'Review and confirm'}
          </h2>
          <span className="small" style={{ fontWeight: 600, fontSize: 14 }}>
            Step {step} of 3
          </span>
        </div>
        <div className="steps-bar" aria-hidden="true">
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= step ? 'is-done' : undefined} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <form className="donate-flow__form" onSubmit={nextFromAmount} noValidate aria-labelledby="donate-step-title">
          <div className="field">
            <fieldset aria-describedby={errors.amount ? 'dn-amount-err' : undefined}>
              <legend className="sr-only">Amount</legend>
              <div className="donate-flow__amounts">
                {presets.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className="chip chip--tile donate-flow__amount"
                    aria-pressed={preset === a}
                    onClick={() => {
                      setPreset(a)
                      setCustom('')
                    }}
                  >
                    {a === popular && <span className="donate-flow__popular">Popular</span>}
                    {inr(a)}
                    {target.monthly && <small>/month</small>}
                  </button>
                ))}
              </div>
            </fieldset>
            <label htmlFor="dn-custom" className="sr-only">
              Or enter your own amount
            </label>
            <div className="input-group" aria-invalid={Boolean(errors.amount)}>
              <span className="input-group__prefix" aria-hidden="true">
                ₹
              </span>
              <input
                id="dn-custom"
                type="text"
                inputMode="numeric"
                placeholder="Or enter your own amount"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value.replace(/[^\d]/g, ''))
                  setPreset(null)
                }}
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? 'dn-amount-err' : undefined}
              />
            </div>
            {errors.amount && (
              <span id="dn-amount-err" className="field-error">
                {errors.amount}
              </span>
            )}
          </div>

          <div className="field donate-flow__tip">
            <label htmlFor="dn-tip">
              Add a tip for GiveHope <span className="donate-flow__optional">(optional)</span>
            </label>
            <p className="small" style={{ fontSize: 14 }}>
              Tips help us verify fundraisers and run the platform. Your full donation still goes to the cause.
            </p>
            <div className="donate-flow__tip-row">
              <select id="dn-tip" className="select" value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))}>
                {TIPS.map((t) => (
                  <option key={t} value={t}>
                    {t ? `${t}%` : 'No tip'}
                  </option>
                ))}
              </select>
              <span className="donate-flow__tip-amount">{tip ? inr(tip) : '₹0'}</span>
            </div>
          </div>

          <div className="donate-flow__total">
            <span>Total {target.monthly ? 'every month' : 'donation'}</span>
            <strong>{inr(total)}</strong>
          </div>

          <div className="field">
            {showGift ? (
              <>
                <label htmlFor="dn-gift">Gift card code</label>
                <input
                  id="dn-gift"
                  className="input"
                  type="text"
                  autoCapitalize="characters"
                  value={giftCard}
                  onChange={(e) => setGiftCard(e.target.value.toUpperCase())}
                  placeholder="e.g. GIVE-1234-5678"
                />
                <span className="small" style={{ fontSize: 13 }}>
                  We’ll check your code and take it off the amount we ask you to pay.
                </span>
              </>
            ) : (
              <button type="button" className="add-link" onClick={() => setShowGift(true)}>
                Have a gift card?
              </button>
            )}
          </div>

          <div className="field">
            <label className="check-field">
              <input
                type="checkbox"
                checked={citizen}
                onChange={(e) => setCitizen(e.target.checked)}
                aria-invalid={Boolean(errors.citizen)}
                aria-describedby={errors.citizen ? 'dn-citizen-err' : 'dn-citizen-help'}
              />
              <span>I confirm that I am an Indian citizen</span>
            </label>
            <span id="dn-citizen-help" className="small" style={{ fontSize: 13 }}>
              We can only accept donations from Indian citizens. Donations from abroad need separate government (FCRA)
              approval.
            </span>
            {errors.citizen && (
              <span id="dn-citizen-err" className="field-error">
                {errors.citizen}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="donate-flow__form" onSubmit={nextFromDetails} noValidate aria-labelledby="donate-step-title">
          {field('name', 'Full name', { autoComplete: 'name' })}
          <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
            {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
            <div className="field">
              <label htmlFor="dn-phone">Mobile number</label>
              <div className="input-group" aria-invalid={Boolean(errors.phone)}>
                <span className="input-group__prefix" aria-hidden="true">
                  +91
                </span>
                <input
                  id="dn-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'dn-phone-err' : undefined}
                />
              </div>
              {errors.phone && (
                <span id="dn-phone-err" className="field-error">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          {target.taxBenefit ? (
            <div className="donate-flow__80g">
              <label className="check-field">
                <input type="checkbox" checked={wants80g} onChange={(e) => setWants80g(e.target.checked)} />
                <span>I want an 80G tax receipt</span>
              </label>
              {wants80g && (
                <>
                  <p className="small" style={{ fontSize: 13 }}>
                    The Income Tax Department needs your PAN and address on 80G receipts.
                  </p>
                  {field('pan', 'PAN', {
                    maxLength: 10,
                    placeholder: 'ABCDE1234F',
                    autoCapitalize: 'characters',
                    onChange: (e) => setForm({ ...form, pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }),
                  })}
                  {field('address', 'Address', { autoComplete: 'street-address' })}
                  <div className="grid-auto" style={{ '--min': '140px', '--grid-gap': '14px' }}>
                    {field('city', 'City', { autoComplete: 'address-level2' })}
                    <div className="field">
                      <label htmlFor="dn-state">State</label>
                      <select id="dn-state" className="select" value={form.state} onChange={set('state')} autoComplete="address-level1">
                        {STATES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    {field('pincode', 'Pincode', {
                      inputMode: 'numeric',
                      maxLength: 6,
                      autoComplete: 'postal-code',
                      onChange: (e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '') }),
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="form-notice" style={{ margin: 0 }}>
              This fundraiser is not eligible for 80G tax receipts.
            </p>
          )}

          <div className="field">
            <label htmlFor="dn-message">
              Message for the organiser <span className="donate-flow__optional">(optional)</span>
            </label>
            <textarea id="dn-message" className="input textarea" rows={2} value={form.message} onChange={set('message')} />
          </div>

          <label className="check-field">
            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            <span>Don’t show my name on the list of donors</span>
          </label>

          <div className="donate-flow__nav">
            <button type="button" className="btn btn--outline" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn btn--primary btn--lg">
              Continue
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="donate-flow__form">
          <dl className="donate-flow__summary">
            <div>
              <dt>Giving to</dt>
              <dd>{target.title}</dd>
            </div>
            <div>
              <dt>Donation</dt>
              <dd>
                {inr(amount)}
                {target.monthly ? ' every month' : ''}
              </dd>
            </div>
            {tip > 0 && (
              <div>
                <dt>Tip for GiveHope</dt>
                <dd>{inr(tip)}</dd>
              </div>
            )}
            {giftCard.trim() && (
              <div>
                <dt>Gift card</dt>
                <dd>{giftCard.trim()}</dd>
              </div>
            )}
            <div className="donate-flow__summary-total">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
            <div>
              <dt>Donor</dt>
              <dd>
                {form.name.trim()}
                {anonymous ? ' (shown as Anonymous)' : ''}
                <br />
                {form.email.trim()} · +91 {form.phone}
              </dd>
            </div>
            <div>
              <dt>80G receipt</dt>
              <dd>{wants80g ? `Yes, PAN ${form.pan}` : 'No'}</dd>
            </div>
          </dl>

          <p className="donate-flow__note">
            <Icon name="lock" size={18} />
            <span>
              Online payment is being set up. When you confirm, we send your donation details to our team, and they reply
              with a secure UPI, card or netbanking link to complete it. Nothing is charged until then.
            </span>
          </p>

          {sendError && (
            <p className="form-notice" role="alert">
              {sendError}
            </p>
          )}
          <div className="donate-flow__nav">
            <button type="button" className="btn btn--outline" onClick={() => setStep(2)}>
              Back
            </button>
            <button type="button" className="btn btn--primary btn--lg" onClick={confirm} disabled={sending}>
              {sending ? 'Sending…' : `Confirm ${inr(total)}`}
            </button>
          </div>
          <p className="small" style={{ fontSize: 13 }}>
            By confirming you agree to our <Link to="/terms/">Terms</Link>, <Link to="/privacy-policy/">Privacy policy</Link>{' '}
            and <Link to="/refund-policy/">Refund policy</Link>.
          </p>
        </div>
      )}
    </div>
  )
}
