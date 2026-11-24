import { useState } from 'react'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Photo, SectionHead } from '../components/ui'
import { sendForm } from '../lib/forms'

// Open roles. Leave empty when there are none; the page then invites applications for future roles.
// e.g. { title: 'Fundraiser manager', type: 'Full time', place: 'Vijayawada', text: 'What the role does, in two lines.' }
const ROLES = []

const WAYS = [
  { id: 'job', icon: 'briefcase', title: 'Work with us', text: 'Join the team that verifies fundraisers, supports organisers and keeps donors informed.' },
  { id: 'internship', icon: 'book', title: 'Internships', text: 'Students in social work, communications, design or tech can learn while helping real causes.' },
  { id: 'volunteer', icon: 'heart', title: 'Volunteer', text: 'Help with field visits, relief drives, photography, writing or translating into Telugu.' },
]

const VALUES = [
  { title: 'Honest first', text: 'We only say what we can prove, to donors and to each other.' },
  { title: 'Close to the ground', text: 'We visit, listen and know the communities we work with.' },
  { title: 'Every rupee matters', text: 'We treat donors’ money with the same care as our own.' },
]

/** /careers/ — open roles, internships and volunteering, with one application form. */
export default function Careers() {
  const [type, setType] = useState('volunteer')
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', link: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function apply(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (form.message.trim().length < 20) next.message = 'Tell us a little about yourself, in at least 20 characters.'
    setErrors(next)
    if (Object.keys(next).length) {
      const el = e.currentTarget
      setTimeout(() => el.querySelector('[aria-invalid="true"]')?.focus(), 0)
      return
    }
    try {
      const way = WAYS.find((w) => w.id === type).title
      setStatus({
        ok: true,
        how: await sendForm(`Application: ${way}`, {
          'Interested in': way,
          Name: form.name.trim(),
          Email: form.email.trim(),
          Phone: `+91${form.phone}`,
          City: form.city.trim() || 'Not given',
          'CV or LinkedIn': form.link.trim() || 'Not given',
          About: form.message.trim(),
        }),
      })
    } catch (err) {
      setStatus({ ok: false, notConfigured: err.message === 'not-configured' })
    }
  }

  const field = (key, label, props = {}) => (
    <div className="field">
      <label htmlFor={`cr-${key}`}>{label}</label>
      <input
        id={`cr-${key}`}
        className="input"
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `cr-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <span id={`cr-${key}-err`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  )

  return (
    <>
      <Seo title="Careers and volunteering" description="Work, intern or volunteer with GiveHope and CHANGE NGO in Vijayawada, and help make giving in India more honest and effective." path="/careers/" />

      <section className="page-hero dark-hero">
        <div className="hero-bg">
          <Photo name="flood-relief" alt="" priority />
        </div>
        <div className="container">
          <div className="page-hero__copy page-hero__copy--wide">
            <span className="eyebrow eyebrow--on-dark load-in">Join us</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span>Do work that</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  changes lives
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              Work, intern or volunteer with GiveHope and CHANGE NGO, and help people across India give with confidence.
            </p>
            <a href="#apply" className="btn btn--primary btn--lg btn--pill load-in" style={{ '--d': 2, alignSelf: 'flex-start' }}>
              Apply now
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ways-title">
        <div className="container">
          <SectionHead eyebrow="Ways to join" title="Find your place in the team" id="ways-title" />
          <div className="grid-auto section-body" style={{ '--min': '260px', '--grid-gap': '18px' }}>
            {WAYS.map((w) => (
              <div className="card" key={w.id}>
                <span className="icon-tile icon-tile--md">
                  <Icon name={w.icon} />
                </span>
                <h3 className="feature__title">{w.title}</h3>
                <p className="small">{w.text}</p>
                <a href="#apply" className="text-link" onClick={() => setType(w.id)}>
                  Apply <Icon name="arrowRight" size={16} strokeWidth={2.4} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="roles-title">
        <div className="container">
          <SectionHead eyebrow="Open roles" title="Current openings" id="roles-title" />
          {ROLES.length ? (
            <ul className="roles section-body" role="list">
              {ROLES.map((r) => (
                <li key={r.title}>
                  <div>
                    <h3 className="feature__title">{r.title}</h3>
                    <p className="small">
                      {r.type} · {r.place}
                    </p>
                    <p className="small">{r.text}</p>
                  </div>
                  <a href="#apply" className="btn btn--outline" onClick={() => setType('job')}>
                    Apply
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="body section-body">
              There are no open roles right now. If you would like to work with us in future, send us your details below and we
              will get in touch when something fits.
            </p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <SectionHead eyebrow="How we work" title="What we value" id="values-title" />
          <div className="mission-how section-body">
            {VALUES.map((v) => (
              <div className="mission-how__item" key={v.title}>
                <h3 className="feature__title">{v.title}</h3>
                <p className="small">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section section--cream" aria-labelledby="apply-title">
        <div className="container" style={{ maxWidth: 720 }}>
          {status?.ok ? (
            <div className="form-card" aria-live="polite">
              <div className="form-success">
                <h2 className="h3">Thank you, {form.name.trim().split(' ')[0]}!</h2>
                <p className="small">
                  {status.how === 'whatsapp'
                    ? 'WhatsApp has opened with your details. Press send there and our team will get back to you.'
                    : 'We have your details and will get back to you.'}
                </p>
              </div>
            </div>
          ) : (
            <form className="form-card" onSubmit={apply} noValidate aria-labelledby="apply-title">
              <h2 id="apply-title" style={{ fontSize: 24, fontWeight: 800 }}>
                Apply or volunteer
              </h2>
              <div className="field">
                <fieldset>
                  <legend>I am interested in</legend>
                  <div className="choice-grid">
                    {WAYS.map((w) => (
                      <button type="button" className="chip chip--tile" aria-pressed={type === w.id} onClick={() => setType(w.id)} key={w.id}>
                        {w.title}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              {field('name', 'Full name', { autoComplete: 'name' })}
              <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
                {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
                {field('phone', 'Mobile', {
                  inputMode: 'numeric',
                  maxLength: 10,
                  autoComplete: 'tel-national',
                  onChange: (e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') }),
                })}
              </div>
              <div className="grid-auto" style={{ '--min': '180px', '--grid-gap': '14px' }}>
                {field('city', 'City (optional)', { autoComplete: 'address-level2' })}
                {field('link', 'CV or LinkedIn link (optional)', { type: 'url', placeholder: 'https://' })}
              </div>
              <div className="field">
                <label htmlFor="cr-message">About you</label>
                <textarea
                  id="cr-message"
                  className="input textarea"
                  rows={4}
                  placeholder="Your skills, experience, languages, and when you are available."
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'cr-message-err' : undefined}
                />
                {errors.message && (
                  <span id="cr-message-err" className="field-error">
                    {errors.message}
                  </span>
                )}
              </div>
              {status && !status.ok && (
                <p className="form-notice" role="alert">
                  {status.notConfigured ? 'Applications are not connected yet, so nothing was sent.' : 'Could not send. Please try again.'}
                </p>
              )}
              <button type="submit" className="btn btn--primary btn--lg">
                Send
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
