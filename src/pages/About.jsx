import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Photo, SectionHead } from '../components/ui'

const PRINCIPLES = [
  { icon: 'shieldCheck', title: 'Check first', text: 'We visit the organiser in person and review the documents and beneficiary before a fundraiser goes live.' },
  { icon: 'wallet', title: 'Pay where it is needed', text: 'Funds go to the hospital, NGO or beneficiary account, in stages where that makes sense.' },
  { icon: 'fileText', title: 'Show the spending', text: 'Fundraisers post bills, receipts and photos so donors can see how money is used.' },
  { icon: 'headset', title: 'Stay close to organisers', text: 'A fundraiser manager helps with the story, the sharing and the withdrawals.' },
]

// Only list recognition you can link to or show proof of. Remove this section if there is none yet.
const RECOGNITION = [
  { title: '[Award name]', text: '[Awarding body], [Year]' },
  { title: '[Publication name]', text: '[Article headline and link]' },
  { title: '[Partner or certification]', text: '[What it covers], [Year]' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About us"
        description="Why GiveHope exists, how we check fundraisers and how we show donors where their money goes."
        path="/about/"
      />

      <section className="page-hero dark-hero">
        <div className="hero-bg">
          <Photo name="community" alt="" priority />
        </div>
        <div className="container">
          <div className="page-hero__copy page-hero__copy--wide">
            <span className="eyebrow eyebrow--on-dark load-in">About GiveHope</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span>Giving works better</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  when you can see it
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              GiveHope helps people across India raise funds for medical care, education, relief and animal welfare, openly and
              accountably.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="story-title">
        <div className="container split" style={{ '--split-gap': '56px' }}>
          <div className="about-story" data-reveal>
            <SectionHead eyebrow="Our story" title="Why we started" id="story-title" />
            <p className="body">[Who founded GiveHope, when and where, and the moment or problem that led to it.]</p>
            <p className="body">[What you have done so far and who you work with, using only details you can verify.]</p>
          </div>
          <div className="about-photo" data-reveal>
            <Photo name="community" sizes="(max-width: 900px) 100vw, 560px" />
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="purpose-title">
        <div className="container">
          <h2 className="sr-only" id="purpose-title">
            Our vision and mission
          </h2>
          <div className="grid-auto" style={{ '--min': '320px', '--grid-gap': '20px' }}>
            <div className="reveal-cell" data-reveal>
              <div className="bento-card bento-card--dark" data-spotlight>
                <span className="eyebrow eyebrow--on-dark">Our vision</span>
                <h3 className="feature__title">An India where no one goes without urgent help because they cannot pay for it.</h3>
              </div>
            </div>
            <div className="reveal-cell" data-reveal style={{ '--d': 1 }}>
              <div className="bento-card bento-card--lime">
                <span className="eyebrow eyebrow--ink">Our mission</span>
                <h3 className="feature__title">Connect people who need help with people who want to give, and make every step easy to check.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="principles-title">
        <div className="container">
          <div data-reveal>
            <SectionHead eyebrow="How we work" title="Four things we hold ourselves to" id="principles-title" />
          </div>
          <div className="grid-auto section-body" style={{ '--min': '250px', '--grid-gap': '20px' }}>
            {PRINCIPLES.map((p, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={p.title}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="icon-tile icon-tile--md">
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="feature__title">{p.title}</h3>
                  <p className="small">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="recognition-title">
        <div className="container">
          <div data-reveal>
            <SectionHead eyebrow="Recognition" title="Awards and press" id="recognition-title" />
          </div>
          <div className="grid-auto section-body" style={{ '--min': '280px', '--grid-gap': '20px' }}>
            {RECOGNITION.map((r, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={r.title}>
                <div className="stat" style={{ height: '100%' }}>
                  <h3 className="feature__title">{r.title}</h3>
                  <p className="stat__label">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="about-cta-title">
        <div className="container">
          <div className="media-tile closing" data-reveal>
            <Photo name="women-field" alt="" sizes="(max-width: 1240px) 100vw, 1200px" />
            <h2 className="h2" id="about-cta-title">
              Check our documents, then decide.
            </h2>
            <p className="body">Our registrations and reports are in one place, so you can review them before you give.</p>
            <div className="cta-row">
              <Link to="/documents/" className="btn btn--primary btn--lg">
                View documents <Icon name="arrowRight" size={20} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
