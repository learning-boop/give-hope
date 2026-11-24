import { useState } from 'react'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Faq from '../components/Faq'
import { SectionHead } from '../components/ui'
import { sendForm } from '../lib/forms'
import { campaigns } from '../data/campaigns'
import { MONTHLY_PLANS } from '../data/monthly'
import { SITE, inr } from '../site'

const OCCASIONS = [
  { id: 'birthday', title: 'Birthday', line: 'Wish them a happy birthday!', text: 'Make their birthday count for someone else too.', icon: 'heart', tone: 'coral' },
  { id: 'wedding', title: 'Wedding', line: 'Wishing you a lifetime of happiness', text: 'Celebrate a new beginning with a gift that does good.', icon: 'users', tone: 'lime' },
  { id: 'anniversary', title: 'Anniversary', line: 'To another year together!', text: 'Mark their years together with a meaningful gift.', icon: 'homeHeart', tone: 'sand' },
  { id: 'memory', title: 'In memory', line: 'In loving memory', text: 'Honour someone you have lost by helping others.', icon: 'diya', tone: 'ink' },
  { id: 'festival', title: 'Festival', line: 'Happy festivities!', text: 'Diwali, Sankranti, Eid, Christmas — share the joy.', icon: 'gift', tone: 'coral' },
  { id: 'thanks', title: 'Thank you', line: 'Thank you for everything', text: 'Say thanks to a teacher, colleague or friend.', icon: 'badgeCheck', tone: 'lime' },
]

const AMOUNTS = [500, 1000, 2500, 5000]

const STEPS = [
  { title: 'Build your card', text: 'Pick an occasion, an amount and write a message.' },
  { title: 'We send it', text: 'Your card reaches them by email or WhatsApp with a unique code.' },
  { title: 'They choose a cause', text: 'They pick a verified fundraiser or mission, and the gift goes there.' },
]

const FAQS = [
  { q: 'Who gets the 80G tax receipt?', a: '[Decide and state this: usually the person who buys the gift card gets the 80G receipt, since they paid.]' },
  { q: 'How long is a gift card valid?', a: '[State the validity, e.g. 12 months, and what happens to unclaimed cards — e.g. they go to a mission of our choice.]' },
  { q: 'Can the person choose any cause?', a: 'Yes. They can choose any live verified fundraiser or monthly mission on GiveHope.' },
  { q: 'Can I buy gift cards for my whole team?', a: 'Yes. Message us with how many you need and we will set it up.' },
]

const EMPTY = { toName: '', toContact: '', fromName: '', fromEmail: '', fromPhone: '', message: '', date: '' }

/** /gift-cards/ — buy a donation gift card for an occasion, or claim one you received. */
export default function GiftCards() {
  const [occasion, setOccasion] = useState(OCCASIONS[0].id)
  const [amount, setAmount] = useState(1000)
  const [custom, setCustom] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const o = OCCASIONS.find((x) => x.id === occasion)
  const value = custom ? Number(custom) : amount
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  function pick(id) {
    setOccasion(id)
    document.getElementById('build-card')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function buy(e) {
    e.preventDefault()
    const next = {}
    if (!value || value < 100) next.amount = 'Enter an amount of ₹100 or more.'
    if (!form.toName.trim()) next.toName = 'Enter their name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.toContact.trim()) && !/^[6-9]\d{9}$/.test(form.toContact.replace(/\D/g, '').slice(-10)))
      next.toContact = 'Enter their email or 10-digit mobile number.'
    if (!form.fromName.trim()) next.fromName = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.fromEmail.trim())) next.fromEmail = 'Enter a valid email address.'
    if (!/^[6-9]\d{9}$/.test(form.fromPhone)) next.fromPhone = 'Enter a valid 10-digit mobile number.'
    setErrors(next)
    if (Object.keys(next).length) {
      const el = e.currentTarget
      setTimeout(() => el.querySelector('[aria-invalid="true"]')?.focus(), 0)
      return
    }
    setSending(true)
    try {
      const how = await sendForm(`Gift card order: ${inr(value)} (${o.title})`, {
        Occasion: o.title,
        Amount: inr(value),
        'For (name)': form.toName.trim(),
        'Send to': form.toContact.trim(),
        Message: form.message.trim() || o.line,
        'Send on': form.date || 'As soon as paid',
        'From (name)': form.fromName.trim(),
        'From email': form.fromEmail.trim(),
        'From phone': `+91${form.fromPhone}`,
      })
      setStatus({ ok: true, how })
    } catch (err) {
      setStatus({ ok: false, notConfigured: err.message === 'not-configured' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo
        title="Donation gift cards"
        description="Give a gift of purpose for a birthday, wedding, anniversary, festival or in memory of someone. They choose a verified cause on GiveHope."
        path="/gift-cards/"
      />

      <section className="gift-hero">
        <div className="container gift-hero__inner">
          <div className="gift-hero__copy">
            <span className="eyebrow">Gift cards</span>
            <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.5rem)' }}>
              Give a gift of purpose
            </h1>
            <p className="lead">
              For birthdays, weddings, festivals or to remember someone: a gift card lets them choose a verified cause and
              give in their own name.
            </p>
            <a href="#build-card" className="btn btn--primary btn--lg btn--pill">
              Build a gift card
            </a>
          </div>
          <div className="gift-hero__cards" aria-hidden="true">
            {OCCASIONS.slice(0, 3).map((x, i) => (
              <div className={`gift-card gift-card--${x.tone}`} style={{ '--i': i }} key={x.id}>
                <Icon name={x.icon} size={26} />
                <span className="gift-card__line">{x.line}</span>
                <span className="gift-card__brand">GiveHope gift card</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="occasions-title">
        <div className="container">
          <SectionHead eyebrow="Occasions" title="What are you celebrating?" id="occasions-title" />
          <div className="gift-occasions section-body">
            {OCCASIONS.map((x) => (
              <button type="button" className={`gift-occasion gift-occasion--${x.tone}`} onClick={() => pick(x.id)} key={x.id}>
                <span className="gift-occasion__icon">
                  <Icon name={x.icon} size={22} />
                </span>
                <span className="feature__title">{x.title}</span>
                <span className="small">{x.text}</span>
                <span className="text-link">
                  Build my card <Icon name="arrowRight" size={16} strokeWidth={2.4} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="build-card" className="section section--cream" aria-labelledby="build-title">
        <div className="container gift-builder">
          <div className="gift-builder__preview">
            <SectionHead eyebrow="Build your card" title="Make it personal" id="build-title" />
            <div className={`gift-card gift-card--big gift-card--${o.tone}`} aria-label="Card preview">
              <Icon name={o.icon} size={34} />
              <span className="gift-card__line">{form.message.trim() || o.line}</span>
              <span className="gift-card__to">
                {form.toName.trim() ? `For ${form.toName.trim()}` : 'For [their name]'}
                {form.fromName.trim() ? ` · from ${form.fromName.trim()}` : ''}
              </span>
              <span className="gift-card__amount">{value >= 100 ? inr(value) : '₹—'}</span>
              <span className="gift-card__brand">GiveHope gift card · choose any verified cause</span>
            </div>
            <ol className="gift-steps">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span aria-hidden="true">{i + 1}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p className="small">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {status?.ok ? (
            <div className="form-card" aria-live="polite">
              <div className="form-success">
                <h2 className="h3">Your gift card is on its way to our team</h2>
                <p className="small">
                  {status.how === 'whatsapp'
                    ? 'WhatsApp has opened with your order. Press send there, and our team will reply with a payment link. Once paid, we send the card.'
                    : status.how === 'email'
                      ? 'Your email app has opened with your order. Press send there, and our team will reply with a payment link.'
                      : 'We have your order. Our team will send you a payment link, and the card goes out once it is paid.'}
                </p>
              </div>
              <button type="button" className="btn btn--outline" onClick={() => setStatus(null)}>
                Build another card
              </button>
            </div>
          ) : (
            <form className="form-card" onSubmit={buy} noValidate aria-label="Gift card details">
              <div className="field">
                <fieldset>
                  <legend>Occasion</legend>
                  <div className="choice-grid ngo-form__chips">
                    {OCCASIONS.map((x) => (
                      <button type="button" className="chip chip--tile" aria-pressed={occasion === x.id} onClick={() => setOccasion(x.id)} key={x.id}>
                        {x.title}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="field">
                <fieldset aria-describedby={errors.amount ? 'gc-amount-err' : undefined}>
                  <legend>Gift amount</legend>
                  <div className="amounts">
                    {AMOUNTS.map((a) => (
                      <button
                        type="button"
                        className="chip chip--square"
                        aria-pressed={!custom && amount === a}
                        onClick={() => {
                          setAmount(a)
                          setCustom('')
                        }}
                        key={a}
                      >
                        {inr(a)}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="input-group" aria-invalid={Boolean(errors.amount)}>
                  <span className="input-group__prefix" aria-hidden="true">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Or enter your own amount"
                    placeholder="Or enter your own amount"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, ''))}
                    aria-invalid={Boolean(errors.amount)}
                  />
                </div>
                {errors.amount && (
                  <span id="gc-amount-err" className="field-error">
                    {errors.amount}
                  </span>
                )}
              </div>

              <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
                <GiftField id="toName" label="Their name" form={form} set={set} errors={errors} />
                <GiftField id="toContact" label="Their email or mobile" form={form} set={set} errors={errors} />
              </div>
              <div className="field">
                <label htmlFor="gc-message">
                  Your message <span className="donate-flow__optional">(optional)</span>
                </label>
                <textarea id="gc-message" className="input textarea" rows={2} maxLength={160} placeholder={o.line} value={form.message} onChange={set('message')} />
              </div>
              <div className="field">
                <label htmlFor="gc-date">
                  Send on <span className="donate-flow__optional">(optional)</span>
                </label>
                <input id="gc-date" className="input" type="date" value={form.date} onChange={set('date')} />
              </div>

              <p className="ngo-form__legend" style={{ float: 'none' }}>
                Your details
              </p>
              <GiftField id="fromName" label="Your name" form={form} set={set} errors={errors} autoComplete="name" />
              <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
                <GiftField id="fromEmail" label="Your email" form={form} set={set} errors={errors} type="email" autoComplete="email" />
                <GiftField
                  id="fromPhone"
                  label="Your mobile"
                  form={form}
                  set={(k) => (e) => setForm({ ...form, [k]: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  errors={errors}
                  inputMode="numeric"
                  autoComplete="tel-national"
                />
              </div>

              {status && !status.ok && (
                <p className="form-notice" role="alert">
                  {status.notConfigured ? 'Gift card orders are not connected yet, so nothing was sent.' : 'Your order could not be sent. Please try again.'}
                  {!SITE.contact.phone.includes('[') && ` Please call us on ${SITE.contact.phone}.`}
                </p>
              )}
              <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
                {sending ? 'Sending…' : `Buy gift card${value >= 100 ? ` · ${inr(value)}` : ''}`}
              </button>
              <p className="small" style={{ fontSize: 13 }}>
                Online payment is being set up. When you send your order, our team replies with a secure payment link and sends
                the card once it is paid.
              </p>
            </form>
          )}
        </div>
      </section>

      <ClaimCard />

      <section className="section section--cream" aria-labelledby="gift-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="gift-faq-title">
              About gift cards
            </h2>
          </div>
          <div className="faq-layout__list">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>
    </>
  )
}

function GiftField({ id, label, form, set, errors, ...props }) {
  return (
    <div className="field">
      <label htmlFor={`gc-${id}`}>{label}</label>
      <input
        id={`gc-${id}`}
        className="input"
        type="text"
        value={form[id]}
        onChange={set(id)}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `gc-${id}-err` : undefined}
        {...props}
      />
      {errors[id] && (
        <span id={`gc-${id}-err`} className="field-error">
          {errors[id]}
        </span>
      )}
    </div>
  )
}

/** Someone who received a card enters its code and picks where the gift should go. */
function ClaimCard() {
  const options = [
    ...MONTHLY_PLANS.map((m) => ({ value: `Mission: ${m.title}`, group: 'Monthly missions' })),
    ...campaigns.map((c) => ({ value: c.title, group: 'Fundraisers' })),
  ]
  const [code, setCode] = useState('')
  const [cause, setCause] = useState(options[0].value)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)

  async function claim(e) {
    e.preventDefault()
    if (code.replace(/[^A-Z0-9]/g, '').length < 6 || !name.trim()) {
      setError('Enter the code from your card and your name.')
      return
    }
    setError('')
    try {
      setDone(await sendForm(`Gift card claim: ${code}`, { Code: code, 'Give to': cause, Name: name.trim() }))
    } catch (err) {
      setError(err.message === 'not-configured' ? 'Claiming is not connected yet, so nothing was sent.' : 'Could not send. Please try again.')
    }
  }

  return (
    <section id="claim" className="section" aria-labelledby="claim-title">
      <div className="container gift-claim">
        <div>
          <SectionHead eyebrow="Received a gift card?" title="Choose where your gift goes" id="claim-title" />
          <p className="body">Enter the code from your card and pick a verified fundraiser or monthly mission. The full value goes there in your name.</p>
        </div>
        {done ? (
          <div className="form-success">
            <h3 className="h3">Thank you, {name.trim().split(' ')[0]}!</h3>
            <p className="small">
              {done === 'whatsapp' ? 'WhatsApp has opened with your claim. Press send there and we will confirm once it is applied.' : 'We have your claim and will confirm once it is applied.'}
            </p>
          </div>
        ) : (
          <form className="form-card" onSubmit={claim} noValidate aria-label="Claim a gift card">
            <div className="field">
              <label htmlFor="claim-code">Gift card code</label>
              <input id="claim-code" className="input" placeholder="e.g. GIVE-1234-5678" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} aria-invalid={Boolean(error) && !code} />
            </div>
            <div className="field">
              <label htmlFor="claim-cause">Give it to</label>
              <select id="claim-cause" className="select" value={cause} onChange={(e) => setCause(e.target.value)}>
                {['Monthly missions', 'Fundraisers'].map((g) => (
                  <optgroup label={g} key={g}>
                    {options
                      .filter((x) => x.group === g)
                      .map((x) => (
                        <option key={x.value}>{x.value}</option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="claim-name">Your name</label>
              <input id="claim-name" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(error) && !name.trim()} />
            </div>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn btn--dark btn--lg">
              Claim my gift
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
