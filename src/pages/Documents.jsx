import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Photo } from '../components/ui'
import { SITE } from '../site'

const { registration } = SITE

// file: put the PDF in public/documents/ and set its path, e.g. '/documents/80g-certificate.pdf'
const DOCUMENTS = [
  { title: 'Registration certificate', text: 'Shows how GiveHope is legally registered.', value: registration.type, file: null },
  { title: '12A certificate', text: 'Income-tax registration for charitable organisations.', value: registration.twelveA, file: null },
  { title: '80G certificate', text: 'Lets eligible donors claim a tax deduction on their gifts.', value: registration.eightyG, file: null },
  { title: 'CSR-1 registration', text: 'Allows companies to fund our work from their CSR budgets.', value: registration.csr1, file: null },
  { title: 'PAN of the organisation', text: 'The tax identity shown on 80G receipts.', value: registration.pan, file: null },
  { title: 'Audited annual report', text: 'Independently audited accounts for the year.', value: '[Year]', file: null },
]

export default function Documents() {
  return (
    <>
      <Seo
        title="Documents and registrations"
        description="GiveHope's registration, 12A, 80G and CSR-1 details and audited annual reports, all in one place."
        path="/documents/"
      />

      <section className="page-hero dark-hero">
        <div className="hero-bg">
          <Photo name="school-lane" alt="" priority />
        </div>
        <div className="container">
          <div className="page-hero__copy page-hero__copy--wide">
            <span className="eyebrow eyebrow--on-dark load-in">Documents</span>
            <h1 className="display page-hero__title">
              <span className="rise-line">
                <span>Check us before</span>
              </span>
              <span className="rise-line">
                <span className="accent" style={{ '--d': 1 }}>
                  you give
                </span>
              </span>
            </h1>
            <p className="lead load-in" style={{ '--d': 1 }}>
              Give Hope is an initiative of {SITE.organisation.name}. Our registrations and reports are in one place, so you can
              see who you are giving to.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Documents and registrations">
        <div className="container">
          <div className="grid-fill" style={{ '--grid-gap': '20px' }}>
            {DOCUMENTS.map((d, i) => (
              <div className="reveal-cell" data-reveal style={{ '--d': i % 3 }} key={d.title}>
                <article className="stat document-card">
                  <span className="icon-tile icon-tile--md">
                    <Icon name="fileText" />
                  </span>
                  <h2 className="feature__title">{d.title}</h2>
                  <p className="small">{d.text}</p>
                  <p className="document-card__value">{d.value}</p>
                  {d.file ? (
                    <a className="text-link" href={d.file}>
                      View document <Icon name="arrowRight" size={18} strokeWidth={2.2} />
                    </a>
                  ) : (
                    <span className="small">Document to be added</span>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
