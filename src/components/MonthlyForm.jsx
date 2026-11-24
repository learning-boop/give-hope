import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { inr } from '../site'
import { MONTHLY_AMOUNTS, MONTHLY_MINIMUM, MONTHLY_PLANS, missionDonatePath } from '../data/monthly'

/**
 * Picks a mission and a monthly amount, then opens that mission's donation steps with the amount chosen.
 */
export default function MonthlyForm({ cause, onCauseChange }) {
  const navigate = useNavigate()
  const [amount, setAmount] = useState(1000)
  const [custom, setCustom] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [error, setError] = useState('')

  const value = isCustom ? Number(custom) : amount

  function handleSubmit(e) {
    e.preventDefault()
    if (!value || value < MONTHLY_MINIMUM) {
      setError(`Enter an amount of ${inr(MONTHLY_MINIMUM)} or more.`)
      return
    }
    setError('')
    navigate(missionDonatePath(cause, value))
  }

  return (
    <form id="monthly-form" className="form-card" onSubmit={handleSubmit} noValidate aria-labelledby="monthly-form-title">
      <h2 id="monthly-form-title" style={{ fontSize: 24, fontWeight: 800 }}>
        Set up your monthly gift
      </h2>

      <div className="field">
        <label htmlFor="mg-cause">Mission</label>
        <select id="mg-cause" className="select" value={cause} onChange={(e) => onCauseChange(e.target.value)}>
          {MONTHLY_PLANS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <fieldset>
          <legend>Amount each month</legend>
          <div className="amounts">
            {MONTHLY_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                className="chip chip--square"
                aria-pressed={!isCustom && amount === a}
                onClick={() => {
                  setAmount(a)
                  setIsCustom(false)
                  setError('')
                }}
              >
                {inr(a)}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="field">
        <label htmlFor="mg-custom">Or enter your own amount</label>
        <div className="input-group" aria-invalid={Boolean(error)}>
          <span className="input-group__prefix" aria-hidden="true">
            ₹
          </span>
          <input
            id="mg-custom"
            type="text"
            inputMode="numeric"
            placeholder={`${MONTHLY_MINIMUM} or more`}
            value={custom}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '')
              setCustom(digits)
              setIsCustom(digits !== '')
              setError('')
            }}
            aria-describedby={error ? 'mg-custom-err' : undefined}
          />
        </div>
        {error && (
          <span id="mg-custom-err" className="field-error">
            {error}
          </span>
        )}
      </div>

      <button type="submit" className="btn btn--primary btn--lg">
        Give {value >= MONTHLY_MINIMUM ? inr(value) : ''} monthly
      </button>
      <p className="small" style={{ fontSize: 13 }}>
        Pause or cancel anytime from your account.
      </p>
    </form>
  )
}
