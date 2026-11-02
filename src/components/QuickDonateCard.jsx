import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from './ui'
import { inr, num } from '../site'
import { fundraiserPath, progressOf } from '../data/campaigns'

const AMOUNTS = [500, 1000, 2500, 5000]

/**
 * Amount picker + donate button for one fundraiser.
 * `onDonate(amount)` is where you open your payment gateway checkout (Razorpay etc.).
 */
export default function QuickDonateCard({ campaign, showTitle = true, onDonate, className = '' }) {
  const [amount, setAmount] = useState(1000)
  const c = campaign
  const path = fundraiserPath(c)
  const TitleTag = showTitle ? 'h2' : 'p'

  function handleDonate(e) {
    if (onDonate) {
      e.preventDefault()
      onDonate(amount)
    }
  }

  return (
    <div className={`donate-card ${className}`}>
      <div className="tags">
        {c.urgent && <span className="tag tag--urgent">Urgent</span>}
        {c.taxBenefit && <span className="tag tag--lime">80G</span>}
      </div>
      {showTitle ? (
        <TitleTag className="h3">
          <Link to={path} style={{ color: 'inherit' }}>
            {c.title}
          </Link>
        </TitleTag>
      ) : (
        <TitleTag className="h3">Choose an amount</TitleTag>
      )}
      <div className="stack" style={{ '--stack-gap': '8px' }}>
        <ProgressBar percent={progressOf(c)} />
        <div className="progress-meta">
          <span>
            <strong>{inr(c.raised, '₹[Raised]')}</strong> of {inr(c.goal, '₹[Goal]')}
          </span>
          <span>{num(c.donors)} donors</span>
        </div>
      </div>
      <div className="amounts" role="group" aria-label="Choose an amount">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            className="chip chip--square"
            aria-pressed={amount === a}
            onClick={() => setAmount(a)}
          >
            {inr(a)}
          </button>
        ))}
      </div>
      <Link to={`${path}?amount=${amount}`} className="btn btn--primary btn--block" style={{ minHeight: 52 }} onClick={handleDonate}>
        Donate {inr(amount)}
      </Link>
    </div>
  )
}
