import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import NgoRegisterForm from '../components/NgoRegisterForm'
import { sendForm } from '../lib/forms'
import { CheckList, Photo, SectionHead } from '../components/ui'
import { DOCS_NGO, NGO_STEPS } from '../data/ngo'

const list = (items) => (items.length ? items.join(', ') : 'None selected')

export default function RegisterNgo() {
  return (
    <>
      <Seo
        title="Register your NGO"
        description="Register your NGO, trust or Section 8 company on GiveHope. Send your details, our team verifies your documents and work, and helps you raise funds from donors across India."
        path="/register-ngo/"
      />

      {/* Hero + form */}
      <section className="cf-hero dark-hero ngo-hero">
        <div className="hero-bg">
          <Photo name="women-craft" alt="" priority />
        </div>
        <div className="container split">
          <div className="cf-hero__copy ngo-hero__copy">
            <span className="eyebrow eyebrow--on-dark load-in">For NGOs and trusts</span>
            <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)' }}>
              <span className="rise-line">
                <span>Register your NGO</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  on GiveHope
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              Raise funds for your programmes from donors who want to see where their money goes. Tell us about your
              organisation, and our team will verify it and help you start.
            </p>
            <div className="load-in" style={{ '--d': 2 }}>
              <CheckList
                variant="lime"
                items={[
                  'For registered Trusts, Societies and Section 8 companies',
                  'Our team checks your documents and visits your work',
                  'Funds go straight to your organisation’s bank account',
                ]}
              />
            </div>
          </div>
          <NgoRegisterForm
            onSubmit={(data) =>
              sendForm(`New NGO registration: ${data.orgName}`, {
                Organisation: data.orgName,
                'Registered as': data.orgType,
                'Registration number': data.regNumber,
                PAN: data.pan,
                'Year founded': data.year || 'Not given',
                City: data.city,
                State: data.state,
                Website: data.website || 'None',
                'Certificates held': list(data.certificates),
                'Areas of work': list(data.causes),
                'Wants to raise funds for': data.work,
                'Contact person': data.role ? `${data.contactName} (${data.role})` : data.contactName,
                Phone: data.phone,
                Email: data.email,
              })
            }
          />
        </div>
      </section>

      {/* How registration works */}
      <section className="section" aria-labelledby="ngo-how-title">
        <div className="container">
          <div className="panel panel--dark" data-reveal>
            <SectionHead eyebrow="How it works" title="From sign-up to your first fundraiser" onDark id="ngo-how-title" />
            <ol className="grid-auto section-body" style={{ '--min': '230px', '--grid-gap': '16px' }}>
              {NGO_STEPS.map((s, i) => (
                <li className="card card--dark" data-spotlight key={s.title} style={{ padding: 26, gap: 12 }}>
                  <span className="step-num-lg" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="h3" style={{ color: 'var(--white)' }}>
                    {s.title}
                  </h3>
                  <p className="small">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section section--flush-top" aria-labelledby="ngo-docs-title">
        <div className="container">
          <div className="grid-auto" style={{ '--min': '320px' }}>
            <div className="doc-card" style={{ background: 'var(--coral-tint)' }} data-reveal>
              <SectionHead eyebrow="Documents" title="Keep these ready" id="ngo-docs-title" />
              <CheckList items={DOCS_NGO} variant="ink" />
              <p className="small">You send copies after our call, not through this website.</p>
            </div>
            <div className="doc-card" style={{ border: '1px solid var(--line)' }} data-reveal>
              <span className="icon-tile icon-tile--md">
                <Icon name="users" />
              </span>
              <h2 className="h3" style={{ fontSize: 22, fontWeight: 800 }}>
                Raising for one person instead?
              </h2>
              <p className="small">
                If you are raising money for a patient, a student or a family rather than your organisation, start a regular
                fundraiser.
              </p>
              <Link to="/crowdfunding/" className="btn btn--outline">
                Start a fundraiser
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
