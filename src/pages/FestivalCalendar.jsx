import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { FESTIVALS, FESTIVAL_YEAR } from '../data/festivals'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const TYPES = ['All', 'Festival', 'National day', 'Observance']

const parts = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d, weekday: new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short' }) }
}

/** /indian-festival-calendar/ — festival and observance dates for the year, each with a way to give. */
export default function FestivalCalendar() {
  const [type, setType] = useState('All')
  const list = FESTIVALS.filter((f) => type === 'All' || f.type.toLowerCase().includes(type.toLowerCase()))

  // Group by month and year, in date order
  const groups = []
  for (const f of list) {
    const { y, m } = parts(f.date)
    const key = `${MONTHS[m]} ${y}`
    if (groups.at(-1)?.key !== key) groups.push({ key, items: [] })
    groups.at(-1).items.push(f)
  }

  return (
    <>
      <Seo
        title={`Indian festival calendar ${FESTIVAL_YEAR}`}
        description={`Dates of Indian festivals and national days in ${FESTIVAL_YEAR} — Sankranti, Ugadi, Ramzan, Vinayaka Chavithi, Dasara, Deepavali, Christmas and more — with an idea for giving on each.`}
        path="/indian-festival-calendar/"
      />

      <section className="section blog-head">
        <div className="container">
          <span className="eyebrow">Festival calendar</span>
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Indian festival calendar {FESTIVAL_YEAR}
          </h1>
          <p className="lead" style={{ maxWidth: 680 }}>
            Festivals bring families together and have always been a time for sharing. Here are the dates for the year ahead,
            with a simple way to give on each.
          </p>
          <div className="ngo-causes" role="group" aria-label="Filter by type">
            {TYPES.map((t) => (
              <button type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)} key={t}>
                {t === 'All' ? 'All days' : `${t}s`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Calendar">
        <div className="container fest">
          {groups.map((g) => (
            <section className="fest__month" key={g.key} aria-labelledby={`m-${g.key.replace(' ', '-')}`}>
              <h2 className="fest__month-title" id={`m-${g.key.replace(' ', '-')}`}>
                {g.key}
              </h2>
              <ul className="fest__list" role="list">
                {g.items.map((f) => {
                  const { d, weekday } = parts(f.date)
                  return (
                    <li className="fest__item" key={f.date + f.name}>
                      <time className="fest__date" dateTime={f.date}>
                        <strong>{d}</strong>
                        <span>{weekday}</span>
                      </time>
                      <div className="fest__copy">
                        <h3 className="feature__title">
                          {f.name}
                          {f.tentative && <span className="fest__tentative">Tentative date</span>}
                        </h3>
                        <span className="fest__type">{f.type}</span>
                        <p className="small">{f.about}</p>
                      </div>
                      <Link to={f.link} className="fest__idea">
                        <Icon name="heart" size={18} />
                        <span>{f.idea}</span>
                        <Icon name="arrowRight" size={16} strokeWidth={2.4} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
          <p className="small" style={{ marginTop: 24 }}>
            Dates follow the national holiday list and can differ by a day in some states. Islamic festivals depend on the
            sighting of the moon and are confirmed closer to the day.
          </p>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="fest-cta-title">
        <div className="container">
          <div className="ngo-join">
            <div>
              <h2 className="h2" id="fest-cta-title">
                Celebrate someone with a gift that gives
              </h2>
              <p className="body">Send a GiveHope gift card for a festival, birthday or anniversary. They choose the cause.</p>
            </div>
            <Link to="/gift-cards/" className="btn btn--primary btn--lg">
              Send a gift card
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
