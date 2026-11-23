import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { DOCS_NGO } from '../data/ngo'
import Icon from '../components/Icon'
import Faq from '../components/Faq'
import StartFundraiserForm from '../components/StartFundraiserForm'
import { sendForm } from '../lib/forms'
import { CheckList, Photo, ProgressBar, SectionHead } from '../components/ui'
import { crowdfundingFaqs } from '../data/faqs'
import { SITE } from '../site'

const TYPES = [
  { photo: 'operating-room', title: 'Medical emergencies', text: 'Surgeries, cancer treatment, transplants, ICU stays and long-term care.' },
  { photo: 'men-group', title: 'NGO and charity projects', text: 'Programmes, relief drives, equipment and buildings for registered NGOs and trusts.' },
  { photo: 'children-group', title: 'Education', text: 'School and college fees, books, scholarships and learning centres.' },
  { photo: 'flood-car', title: 'Disaster relief', text: 'Food and hygiene kits, shelter and rebuilding after floods, cyclones and fires.' },
  { photo: 'street-cows', title: 'Animal welfare', text: 'Rescue, treatment, shelters and feeding drives for street and farm animals.' },
  { photo: 'town-street', title: 'Community causes', text: 'Water, sanitation, libraries and other projects that help a whole village or ward.' },
]

const STEPS = [
  { title: 'Create', text: 'Tell the story in your own words, add photos and upload the supporting documents.' },
  { title: 'Get verified', text: 'Our team visits you in person, checks the documents and confirms details with the hospital or NGO.' },
  { title: 'Share', text: 'Send your fundraiser link on WhatsApp, Instagram and Facebook — it shows a proper preview everywhere.' },
  { title: 'Withdraw', text: 'Request funds in stages. Money is transferred to the hospital, NGO or beneficiary account.' },
]

const TOOLS = [
  { icon: 'chart', title: 'Live dashboard', text: 'See every donation, share and comment as it happens.' },
  { icon: 'share', title: 'Share kit', text: 'WhatsApp messages in English and regional languages, posters and a QR code.' },
  { icon: 'fileText', title: 'Donor updates', text: 'Post progress, bills and photos — every donor is notified.' },
  { icon: 'wallet', title: 'Staged withdrawals', text: 'Withdraw as bills come in, with the exact amount shown before you confirm.' },
  { icon: 'headset', title: 'Fundraiser manager', text: 'A real person to help you write, share and withdraw.' },
]

// Set your real fees before launch
const FEES = [
  { label: 'Platform fee', value: '[X]%', text: 'Covers verification, support and fundraiser tools.' },
  { label: 'Payment gateway', value: '[X]%', text: `Charged by ${SITE.paymentGateway} on each donation.` },
  { label: 'Withdrawals', value: '[₹X / Free]', text: 'Per transfer to the hospital, NGO or beneficiary.' },
]

const DOCS_PERSON = [
  'Organiser’s ID proof (Aadhaar or PAN)',
  'Beneficiary’s ID and written consent',
  'Medical estimate or hospital letter (for medical fundraisers)',
  'Hospital or beneficiary bank account details',
]

export default function Crowdfunding() {
  return (
    <>
      <Seo
        title="Crowdfunding — start a fundraiser"
        description="Start a verified fundraiser for medical treatment, an NGO project, education, disaster relief or animal welfare. Share on WhatsApp and withdraw funds directly to the hospital or NGO."
        path="/crowdfunding/"
      />

      {/* Hero + start form */}
      <section className="cf-hero dark-hero">
        <div className="hero-bg">
          <Photo name="woman-orange" alt="" priority />
        </div>
        <div className="container split">
          <div className="cf-hero__copy">
            <span className="eyebrow eyebrow--on-dark load-in">Crowdfunding</span>
            <h1 className="display" style={{ fontSize: 'clamp(2.75rem, 5.4vw, 4.75rem)' }}>
              <span className="rise-line">
                <span>Raise funds for the causes</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  you care about
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              Start a fundraiser for a medical emergency, an NGO project or your community. We verify it, help you share it,
              and send the money straight to where it is needed.
            </p>
            <div className="load-in" style={{ '--d': 2 }}>
              <CheckList
                variant="lime"
                items={[
                  'Funds go directly to the hospital, NGO or beneficiary account',
                  'A ready-made WhatsApp message, poster and QR code to share',
                  'A fundraiser manager to guide you from start to withdrawal',
                ]}
              />
            </div>
          </div>
          <StartFundraiserForm
            onSubmit={(data) =>
              sendForm('New fundraiser request', {
                Name: data.name,
                Phone: data.phone,
                Email: data.email,
                'Raising for': data.forWhom,
                Cause: data.cause,
                'Amount needed': `₹${data.goal.toLocaleString('en-IN')}`,
                'What the money is for': data.story,
                Links: data.links.join(', ') || 'None',
              })
            }
          />
        </div>
      </section>

      {/* Fundraiser types */}
      <section className="section" aria-labelledby="types-title">
        <div className="container">
          <SectionHead eyebrow="Fundraiser types" title="What can you raise funds for?" id="types-title" />
          <div className="grid-auto section-body" style={{ '--min': '300px', '--grid-gap': '20px' }}>
            {TYPES.map((t, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={t.title}>
                <div className="media-tile type-tile">
                  <Photo name={t.photo} alt="" position={t.position} sizes="(max-width: 720px) 100vw, 400px" />
                  <h3 className="media-tile__title">{t.title}</h3>
                  <p className="media-tile__text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-crowdfunding-works" className="section section--flush-top" aria-labelledby="cf-how-title">
        <div className="container">
          <div className="panel panel--dark" data-reveal>
            <SectionHead eyebrow="How it works" title="From story to support in four steps" onDark id="cf-how-title" />
            <ol className="grid-auto section-body" style={{ '--min': '230px', '--grid-gap': '16px' }}>
              {STEPS.map((s, i) => (
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

      {/* Tools + dashboard preview */}
      <section className="section section--flush-top" aria-labelledby="tools-title">
        <div className="container split">
          <div className="stack" style={{ flex: '1 1 420px', '--stack-gap': '28px' }}>
            <SectionHead eyebrow="Fundraiser tools" title="Everything you need to raise more" id="tools-title" />
            <div className="stack" style={{ '--stack-gap': '20px' }}>
              {TOOLS.map((t) => (
                <div className="feature" key={t.title}>
                  <span className="icon-tile icon-tile--sm icon-tile--lime-tint">
                    <Icon name={t.icon} size={22} />
                  </span>
                  <div className="feature__text">
                    <h3 className="feature__title">{t.title}</h3>
                    <p className="small">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard" aria-label="Example fundraiser dashboard" data-reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <span className="small" style={{ fontSize: 14, fontWeight: 700 }}>
                Your fundraiser
              </span>
              <span className="tag tag--live">Example</span>
            </div>
            <p className="h3" style={{ fontSize: 22 }}>
              [Fundraiser title]
            </p>
            <div className="stack" style={{ '--stack-gap': '8px' }}>
              <ProgressBar percent={46} large />
              <div className="progress-meta">
                <span>
                  <strong>₹[Raised]</strong> of ₹[Goal]
                </span>
                <span>[N] days left</span>
              </div>
            </div>
            <div className="dashboard__stats">
              <div className="dashboard__stat">
                <strong>[N]</strong>
                <span>Donors</span>
              </div>
              <div className="dashboard__stat">
                <strong>[N]</strong>
                <span>Shares</span>
              </div>
              <div className="dashboard__stat">
                <strong>₹[N]</strong>
                <span>Withdrawn</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Recent donations</p>
              {[
                { initials: '[A]', name: '[Donor name]', tint: 'var(--coral-tint-2)' },
                { initials: '?', name: 'Anonymous', tint: 'var(--lime-tint)' },
                { initials: '[B]', name: '[Donor name]', tint: 'var(--amber-tint)' },
              ].map((d, i) => (
                <div className="donation-row" key={i}>
                  <span className="avatar avatar--sm" style={{ background: d.tint }} aria-hidden="true">
                    {d.initials}
                  </span>
                  <span className="donation-row__name">{d.name}</span>
                  <span className="donation-row__amount">₹[Amount]</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <span className="btn btn--dark" style={{ flex: '1 1 180px', fontSize: 16 }}>
                <Icon name="message" size={18} /> Share on WhatsApp
              </span>
              <span className="btn btn--outline" style={{ flex: '1 1 140px', fontSize: 16 }}>
                Post an update
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="section section--cream" aria-labelledby="fees-title">
        <div className="container">
          <SectionHead
            eyebrow="Fees"
            title="Clear fees, shown upfront"
            text="You always see the exact amount you will receive before you withdraw."
            id="fees-title"
          />
          <div className="grid-auto section-body" style={{ '--min': '260px', '--grid-gap': '20px' }}>
            {FEES.map((f) => (
              <div className="card" key={f.label} style={{ gap: 8 }}>
                <span className="small" style={{ fontWeight: 700 }}>
                  {f.label}
                </span>
                <span className="fee-value">{f.value}</span>
                <span className="small">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="section" aria-labelledby="docs-title">
        <div className="container">
          <SectionHead eyebrow="Documents" title="What you will need" id="docs-title" />
          <div className="grid-auto section-body" style={{ '--min': '320px' }}>
            <div className="doc-card card--outline" style={{ border: '1px solid var(--line)' }}>
              <h3 className="h3" style={{ fontSize: 22, fontWeight: 800 }}>
                Raising for a person
              </h3>
              <CheckList items={DOCS_PERSON} />
              <a href="#main" className="btn btn--primary">
                Start a fundraiser
              </a>
            </div>
            <div className="doc-card" style={{ background: 'var(--coral-tint)' }}>
              <h3 className="h3" style={{ fontSize: 22, fontWeight: 800 }}>
                Raising as an NGO or trust
              </h3>
              <CheckList items={DOCS_NGO} variant="ink" />
              <Link to="/register-ngo/" className="btn btn--dark">
                Register your NGO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section section--flush-top" aria-labelledby="cf-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="cf-faq-title">
              Crowdfunding questions
            </h2>
            <p className="body">Not sure where to start? A fundraiser manager can walk you through it.</p>
            <a href={`tel:${SITE.contact.phone.replace(/[^\d+]/g, '')}`} className="text-link">
              Request a call back <Icon name="arrowRight" size={18} strokeWidth={2.2} />
            </a>
          </div>
          <div className="faq-layout__list">
            <Faq items={crowdfundingFaqs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--flush-top">
        <div className="container">
          <div className="panel panel--coral final-cta" data-reveal>
            <div>
              <h2 className="h2">Someone is counting on you. Start today.</h2>
              <p className="body">Set up your fundraiser in a few steps — our team will help with the rest.</p>
            </div>
            <a href="#main" className="btn btn--dark btn--lg">
              Start a fundraiser <Icon name="arrowRight" size={20} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
