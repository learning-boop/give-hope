import { useState } from 'react'

const FOR_WHOM = [
  { id: 'myself', label: 'Myself' },
  { id: 'family', label: 'Family member' },
  { id: 'friend', label: 'A friend' },
  { id: 'ngo', label: 'NGO / Trust' },
  { id: 'community', label: 'Community' },
  { id: 'other', label: 'Someone else' },
]

const CAUSES = ['Medical treatment', 'NGO or charity project', 'Education', 'Disaster relief', 'Animal welfare', 'Community cause', 'Other']

/**
 * Step 1 of the start-a-fundraiser flow.
 * `onSubmit(data)` is where you call your API (save the lead, send OTP, etc.).
 */
export default function StartFundraiserForm({ onSubmit }) {
  const [forWhom, setForWhom] = useState('family')
  const [cause, setCause] = useState(CAUSES[0])
  const [goal, setGoal] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [story, setStory] = useState('')
  const [links, setLinks] = useState([''])
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const next = {}
    const goalNumber = Number(goal.replace(/[^\d]/g, ''))
    if (!goalNumber || goalNumber < 1000) next.goal = 'Enter an amount of ₹1,000 or more.'
    if (!/^[6-9]\d{9}$/.test(phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (!name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (story.trim().length < 30) next.story = 'Tell us a little more, in at least 30 characters.'
    setErrors(next)
    return { ok: Object.keys(next).length === 0, goalNumber }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { ok, goalNumber } = validate()
    if (!ok) return
    const data = {
      forWhom,
      cause,
      goal: goalNumber,
      phone: `+91${phone}`,
      name: name.trim(),
      email: email.trim(),
      story: story.trim(),
      links: links.map((l) => l.trim()).filter(Boolean),
    }
    if (onSubmit) await onSubmit(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-card" aria-live="polite">
        <div className="form-success">
          <h2 className="h3">Thank you — you’re on your way</h2>
          <p className="small">
            A fundraiser manager will call you on +91 {phone} to help you set up your fundraiser and upload documents.
          </p>
        </div>
        <button type="button" className="btn btn--outline" onClick={() => setSubmitted(false)}>
          Start another fundraiser
        </button>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate aria-labelledby="start-form-title">
      <div className="stack" style={{ '--stack-gap': '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h2 id="start-form-title" style={{ fontSize: 24, fontWeight: 800 }}>
            Start your fundraiser
          </h2>
          <span className="small" style={{ fontWeight: 600, fontSize: 14 }}>
            Step 1 of 3
          </span>
        </div>
        <div className="steps-bar" aria-hidden="true">
          <span className="is-done" />
          <span />
          <span />
        </div>
      </div>

      <div className="field">
        <fieldset>
          <legend>Who are you raising funds for?</legend>
          <div className="choice-grid">
            {FOR_WHOM.map((o) => (
              <button
                key={o.id}
                type="button"
                className="chip chip--tile"
                aria-pressed={forWhom === o.id}
                onClick={() => setForWhom(o.id)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="field">
        <label htmlFor="cf-cause">Cause</label>
        <select id="cf-cause" className="select" value={cause} onChange={(e) => setCause(e.target.value)}>
          {CAUSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
        <div className="field">
          <label htmlFor="cf-goal">How much do you need?</label>
          <div className="input-group" aria-invalid={Boolean(errors.goal)}>
            <span className="input-group__prefix" aria-hidden="true">
              ₹
            </span>
            <input
              id="cf-goal"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 2,00,000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              aria-describedby={errors.goal ? 'cf-goal-err' : undefined}
            />
          </div>
          {errors.goal && (
            <span id="cf-goal-err" className="field-error">
              {errors.goal}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Your mobile number</label>
          <div className="input-group" aria-invalid={Boolean(errors.phone)}>
            <span className="input-group__prefix" aria-hidden="true">
              +91
            </span>
            <input
              id="cf-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
            />
          </div>
          {errors.phone && (
            <span id="cf-phone-err" className="field-error">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input
            id="cf-name"
            className="input"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />
          {errors.name && (
            <span id="cf-name-err" className="field-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email address</label>
          <input
            id="cf-email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />
          {errors.email && (
            <span id="cf-email-err" className="field-error">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-story">What is the money for?</label>
        <textarea
          id="cf-story"
          className="input textarea"
          rows={4}
          placeholder="Who needs help, what happened and what the money will pay for."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          aria-invalid={Boolean(errors.story)}
          aria-describedby={errors.story ? 'cf-story-err' : undefined}
        />
        {errors.story && (
          <span id="cf-story-err" className="field-error">
            {errors.story}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="cf-link-0">Social or website links (optional)</label>
        {links.map((link, i) => (
          <input
            key={i}
            id={`cf-link-${i}`}
            className="input"
            type="url"
            inputMode="url"
            placeholder="https://"
            aria-label={i > 0 ? `Link ${i + 1}` : undefined}
            value={link}
            onChange={(e) => setLinks(links.map((l, j) => (j === i ? e.target.value : l)))}
          />
        ))}
        {links.length < 3 && (
          <button type="button" className="add-link" onClick={() => setLinks([...links, ''])}>
            + Add another link
          </button>
        )}
      </div>

      <button type="submit" className="btn btn--primary btn--lg">
        Continue
      </button>
      <p className="small" style={{ fontSize: 13 }}>
        By continuing you agree to our <a href="#terms">Terms</a> and <a href="#guidelines">Fundraiser guidelines</a>. Our
        team will call you to help set it up.
      </p>
    </form>
  )
}
