import { useId, useState } from 'react'
import Icon from './Icon'

export default function Faq({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div className="faq__item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={btnId}
                className="faq__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <Icon name="chevronDown" size={22} strokeWidth={2.2} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="faq__panel">
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
