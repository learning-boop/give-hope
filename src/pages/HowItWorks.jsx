import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Faq from '../components/Faq'
import { CheckList, Photo, SectionHead } from '../components/ui'

// The journey of a donation. Keep this in step with what the team really does.
const JOURNEY = [
  {
    icon: 'search',
    title: 'We screen every NGO and fundraiser',
    text: 'Before anyone can raise money on GiveHope, our team checks that they are genuine and eligible.',
    points: [
      'Registration, 12A, 80G, PAN and bank documents collected and checked',
      'A meeting with the team to understand their work and plans',
      'A visit in person to see past projects and meet beneficiaries',
      'For medical fundraisers, the estimate is confirmed with the hospital',
    ],
  },
  {
    icon: 'badgeCheck',
    title: 'Verified causes go live',
    text: 'Once checked, NGOs can launch fundraisers and join monthly missions, and individuals can raise for someone in need.',
    points: ['Every fundraiser shows who organises it and who the money is paid to', 'Documents we checked are listed on the page'],
  },
  {
    icon: 'lock',
    title: 'You donate securely',
    text: 'Give once or every month by UPI, card or netbanking. Your 80G receipt is emailed for eligible donations.',
    points: ['Your details are only used for your receipt and updates', 'Tips to GiveHope are always optional'],
  },
  {
    icon: 'wallet',
    title: 'We pay the money out',
    text: 'Donations are paid to the verified NGO, hospital or beneficiary account — in stages where that makes sense.',
    points: ['Never to an unverified personal account', 'Large amounts released against bills and progress'],
  },
  {
    icon: 'fileText',
    title: 'You see what it did',
    text: 'Organisers post updates with bills, receipts and photos, and we send them to you.',
    points: ['Updates on every fundraiser page', 'Reports from monthly missions on what your gifts paid for'],
  },
]

const FAQS = [
  {
    q: 'How much of my donation reaches the cause?',
    a: '[State your platform fee and payment gateway charges here, e.g. “Payment gateway charges of about 2% are deducted; GiveHope does not charge NGOs a fee and runs on optional tips.”]',
  },
  {
    q: 'What happens if a fundraiser is found to be false?',
    a: '[Describe your policy here: e.g. the fundraiser is taken down, unspent money is refunded to donors or moved to a similar verified cause with their consent.]',
  },
  {
    q: 'When is the money paid to the NGO or hospital?',
    a: '[Describe how often payouts happen and whether large amounts are released in stages against bills.]',
  },
  {
    q: 'Can I visit the NGO I donated to?',
    a: 'Many partner NGOs welcome visits. Message us and we will put you in touch.',
  },
]

/** /how-your-donation-works/ — the journey of a rupee, from screening to reporting back. */
export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How your donation works"
        description="What happens to your money when you donate on GiveHope: how we screen NGOs, verify fundraisers, pay out donations and report back to you."
        path="/how-your-donation-works/"
      />

      <section className="page-hero dark-hero">
        <div className="hero-bg">
          <Photo name="family-visit" alt="" priority />
        </div>
        <div className="container">
          <div className="page-hero__copy page-hero__copy--wide">
            <span className="eyebrow eyebrow--on-dark load-in">How your donation works</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span>What happens to your money</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  when you give
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              From checking an NGO in person to sending you the bills, here is every step your donation goes through.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <h2 className="sr-only" id="journey-title">
            The five steps
          </h2>
          <ol className="journey">
            {JOURNEY.map((s, i) => (
              <li className="journey__step" key={s.title} data-reveal>
                <span className="journey__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="journey__card">
                  <span className="icon-tile icon-tile--md icon-tile--lime-tint">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="body">{s.text}</p>
                  <CheckList items={s.points} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="hiw-faq-title">
        <div className="container faq-layout">
          <div className="faq-layout__intro">
            <span className="eyebrow">Questions</span>
            <h2 className="h2" id="hiw-faq-title">
              Money questions, answered
            </h2>
            <p className="body">If something is not covered here, message us and we will explain.</p>
          </div>
          <div className="faq-layout__list">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="hiw-cta-title">
        <div className="container">
          <div className="ngo-join">
            <div>
              <SectionHead eyebrow="Ready?" title="Give to a cause you can follow" id="hiw-cta-title" />
              <p className="body">See our audited reports, or pick a verified fundraiser and give in under a minute.</p>
            </div>
            <div className="cta-row">
              <a href="/#fundraisers" className="btn btn--primary btn--lg">
                Donate now
              </a>
              <Link to="/impact/" className="btn btn--outline btn--lg">
                See our impact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
