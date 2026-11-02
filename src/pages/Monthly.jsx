import { useState, useSyncExternalStore } from 'react'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import MonthlyForm from '../components/MonthlyForm'
import { CheckList, Photo, SectionHead } from '../components/ui'
import { MONTHLY_PLANS } from '../data/monthly'

const STEPS = [
  { title: 'Pick a programme', text: 'Choose the cause you want to stand behind month after month.' },
  { title: 'Set your amount', text: 'Pick a suggested amount or enter one that suits your budget.' },
  { title: 'Give automatically', text: 'Your gift is charged once a month, so there is nothing to remember.' },
  { title: 'See where it goes', text: 'Get updates with bills, receipts and photos as the money is used.' },
]

const BENEFITS = [
  { icon: 'chart', title: 'Income they can plan around', text: 'Shelters, schools and care homes can budget ahead when they know what is coming.' },
  { icon: 'fileText', title: 'Updates you can check', text: 'See bills, receipts and photos instead of taking our word for it.' },
  { icon: 'receipt', title: '80G tax receipts', text: 'Receive a receipt for your gifts and keep them all in your account.' },
  { icon: 'wallet', title: 'You stay in control', text: 'Pause or cancel from your account whenever you need to.' },
]

const subscribeToNothing = () => () => {}
const readLinkedCause = () => new URLSearchParams(window.location.search).get('cause')

export default function Monthly() {
  const [picked, setCause] = useState(null)
  // Homepage links preselect a programme with ?cause=. The prerendered HTML has no query string,
  // so the server snapshot is null and React updates the form straight after hydration.
  const linked = useSyncExternalStore(subscribeToNothing, readLinkedCause, () => null)
  const cause = picked ?? (MONTHLY_PLANS.some((p) => p.id === linked) ? linked : MONTHLY_PLANS[0].id)

  return (
    <>
      <Seo
        title="Monthly giving"
        description="Give a set amount every month to care for street animals, support elders, keep children in school and more. Pause or cancel anytime."
        path="/monthly/"
      />

      <section className="page-hero dark-hero">
        <div className="hero-bg">
          <Photo name="students" alt="" priority position="center 30%" />
        </div>
        <div className="container split">
          <div className="page-hero__copy">
            <span className="eyebrow eyebrow--on-dark load-in">Monthly giving</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span>Be there for them</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  every single month
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              One-off gifts help in a crisis. A monthly gift keeps the work going once the crisis has passed.
            </p>
            <div className="load-in" style={{ '--d': 2 }}>
              <CheckList variant="lime" items={['Six programmes to choose from', 'Updates on how your money is used', 'Pause or cancel anytime']} />
            </div>
          </div>
          <MonthlyForm
            cause={cause}
            onCauseChange={setCause}
            onSubmit={(data) => {
              // TODO: start the recurring-payment checkout here (e.g. Razorpay Subscriptions), created on your server
              console.info('Monthly gift', data)
            }}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="programmes-title">
        <div className="container">
          <div data-reveal>
            <SectionHead eyebrow="Programmes" title="Choose what you want to stand behind" id="programmes-title" />
          </div>
          <div className="grid-fill section-body">
            {MONTHLY_PLANS.map((p, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={p.id}>
                <a className="media-tile type-tile" href="#monthly-form" onClick={() => setCause(p.id)}>
                  <Photo name={p.photo} alt="" position={p.position} sizes="(max-width: 720px) 100vw, 400px" />
                  <span className="media-tile__title">{p.title}</span>
                  <span className="media-tile__text">{p.text}</span>
                  <span className="media-tile__cta">
                    Give monthly <Icon name="arrowRight" size={16} strokeWidth={2.2} />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="monthly-how-title">
        <div className="container">
          <div className="panel panel--dark" data-reveal>
            <SectionHead eyebrow="How it works" title="Set it up once, keep helping" onDark id="monthly-how-title" />
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

      <section className="section section--cream" aria-labelledby="monthly-why-title">
        <div className="container">
          <div data-reveal>
            <SectionHead eyebrow="Why give monthly" title="Small gifts that add up to something steady" id="monthly-why-title" />
          </div>
          <div className="grid-auto section-body" style={{ '--min': '250px', '--grid-gap': '20px' }}>
            {BENEFITS.map((b, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i }} key={b.title}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="icon-tile icon-tile--md">
                    <Icon name={b.icon} />
                  </span>
                  <h3 className="feature__title">{b.title}</h3>
                  <p className="small">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
