import Seo from '../components/Seo'
import { LEGAL } from '../data/legal'

/** One page per policy in data/legal.js */
export default function Legal({ doc }) {
  const page = LEGAL[doc]
  return (
    <>
      <Seo title={page.title} description={page.description} path={page.path} />
      <section className="section legal">
        <div className="container legal__inner">
          <header className="legal__head">
            <span className="eyebrow">Policies</span>
            <h1 className="h2">{page.title}</h1>
            <p className="small">Last updated: {page.updated}</p>
            {page.draft && (
              <p className="form-notice" role="note">
                Draft for review. This policy is a starting point and must be checked by a lawyer, with every [placeholder]
                filled in, before the site goes live.
              </p>
            )}
            <p className="body">{page.intro}</p>
          </header>
          {page.sections.map((s) => (
            <section className="legal__section" id={s.id} key={s.heading}>
              <h2 className="feature__title">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p className="body" key={p}>
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="legal__list">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
