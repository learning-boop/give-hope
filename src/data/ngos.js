// Verified NGOs: the directory at /ngos/, city pages at /ngos/city/<city>/ and a profile at /ngos/<id>/.
//
// Only CHANGE NGO is real. The four entries marked `sample: true` show how a partner listing looks — they are
// shown with a "Sample listing" label. Replace them with real partners once verified, or delete them.
// Fundraisers link to their NGO with `ngo: '<id>'` in campaigns.js.
//
// Leave raised / donations as null until you have real figures: the numbers then stay hidden.
//   utilisation: [{ date: '2026-07-19', text: 'How the money was used' }]   newest first
//   gallery:     ['photo-key', ...]   keys from data/photos.js, shown under "NGO in action"
import { SITE } from '../site'

export const NGO_CITIES = [
  { id: 'vijayawada', name: 'Vijayawada' },
  { id: 'guntur', name: 'Guntur' },
  { id: 'visakhapatnam', name: 'Visakhapatnam' },
]

export const NGOS = [
  {
    id: 'change-ngo',
    operator: true, // runs GiveHope, so it is labelled "Runs GiveHope" rather than "Verified"
    name: 'CHANGE NGO',
    tagline: SITE.organisation.tagline,
    city: 'vijayawada',
    state: 'Andhra Pradesh',
    causes: ['medical', 'children', 'education', 'hunger', 'women', 'community'],
    photo: 'women-craft',
    about: [
      'CHANGE NGO runs GiveHope. From Vijayawada, its teams work on health, food, child welfare, education, women’s rights and community development through long-running projects such as Arogya, Annapurna, Suraksha and Naari.',
      'Alongside its own projects, CHANGE NGO verifies other organisations and fundraisers before they go live on GiveHope, so donors can give with confidence.',
    ],
    founded: null,
    partnerSince: null,
    registration: {
      type: SITE.registration.type,
      number: '[Registration number]',
      twelveA: SITE.registration.twelveA,
      eightyG: SITE.registration.eightyG,
    },
    website: 'https://www.change.ngo/',
    social: {},
    raised: null,
    donations: null,
    showProjects: true,
    utilisation: [],
    // Real photos of CHANGE NGO's own work only (add them to data/photos.js first). Stock or AI images would mislead here.
    gallery: [],
  },
  {
    id: 'partner-relief',
    sample: true,
    name: '[Relief partner NGO]',
    tagline: '[One line about the organisation]',
    city: 'visakhapatnam',
    state: 'Andhra Pradesh',
    causes: ['disaster', 'hunger', 'community'],
    photo: 'flood-boat',
    about: ['[What the organisation does, where it works and who it helps. Two or three sentences, from the NGO and checked by GiveHope.]'],
    founded: null,
    partnerSince: null,
    registration: { type: '[Trust / Society / Section 8]', number: '[Number]', twelveA: '[Number]', eightyG: '[Number]' },
    website: null,
    social: {},
    raised: null,
    donations: null,
    utilisation: [],
    gallery: [],
  },
  {
    id: 'partner-education',
    sample: true,
    name: '[Education partner NGO]',
    tagline: '[One line about the organisation]',
    city: 'guntur',
    state: 'Andhra Pradesh',
    causes: ['education', 'children', 'women'],
    photo: 'classroom',
    about: ['[What the organisation does, where it works and who it helps.]'],
    founded: null,
    partnerSince: null,
    registration: { type: '[Trust / Society / Section 8]', number: '[Number]', twelveA: '[Number]', eightyG: '[Number]' },
    website: null,
    social: {},
    raised: null,
    donations: null,
    utilisation: [],
    gallery: [],
  },
  {
    id: 'partner-elders',
    sample: true,
    name: '[Elder care home]',
    tagline: '[One line about the organisation]',
    city: 'vijayawada',
    state: 'Andhra Pradesh',
    causes: ['elderly', 'medical'],
    photo: 'elder-turban',
    about: ['[What the organisation does, where it works and who it helps.]'],
    founded: null,
    partnerSince: null,
    registration: { type: '[Trust / Society / Section 8]', number: '[Number]', twelveA: '[Number]', eightyG: '[Number]' },
    website: null,
    social: {},
    raised: null,
    donations: null,
    utilisation: [],
    gallery: [],
  },
  {
    id: 'partner-animals',
    sample: true,
    name: '[Animal shelter]',
    tagline: '[One line about the organisation]',
    city: 'vijayawada',
    state: 'Andhra Pradesh',
    causes: ['animals'],
    photo: 'cow-care',
    about: ['[What the organisation does, where it works and who it helps.]'],
    founded: null,
    partnerSince: null,
    registration: { type: '[Trust / Society / Section 8]', number: '[Number]', twelveA: '[Number]', eightyG: '[Number]' },
    website: null,
    social: {},
    raised: null,
    donations: null,
    utilisation: [],
    gallery: [],
  },
]

export const ngoPath = (id) => `/ngos/${id}/`
export const cityPath = (id) => `/ngos/city/${id}/`
export const getNgo = (id) => NGOS.find((n) => n.id === id)
export const cityName = (id) => NGO_CITIES.find((c) => c.id === id)?.name || id

/** NGOs matching a cause ('all' for every cause), a city (null for anywhere) and a search query. */
export function filterNgos({ cause = 'all', city = null, query = '' }) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  return NGOS.filter((n) => {
    if (cause !== 'all' && !n.causes.includes(cause)) return false
    if (city && n.city !== city) return false
    const haystack = `${n.name} ${n.tagline} ${cityName(n.city)} ${n.state}`.toLowerCase()
    return words.every((w) => haystack.includes(w))
  })
}
