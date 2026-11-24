// Sample fundraisers. Replace with data from your API/CMS.
// Leave raised / goal / donors / daysLeft as null until you have real figures: the progress bar and counts stay hidden;
// fill them with numbers and the cards format them as ₹1,00,000 automatically.
// photo is a key from data/photos.js. Remove photoIllustrative once a fundraiser has its own consented photo.
//
// ngo: '<id>' links a fundraiser to its NGO in data/ngos.js (shown under Organisers and on the NGO's profile).
//
// Optional fields for the fundraiser page (each section shows a placeholder until filled):
//   story:        ['paragraph', 'paragraph', ...]                       the full story
//   storyHeadings: { 2: 'A heading shown before paragraph 3' }           optional sub-headings inside the story
//   updates:      [{ date: '2026-10-26', text: 'What the money did' }]  newest first
//   documents:    [{ name: 'Hospital estimate', date: '2026-09-12' }]   what GiveHope checked, and when
//   beneficiary:  'Who the money is paid to', e.g. the hospital or NGO
//   topDonations: [{ name: 'Anonymous', amount: 25000 }]               real donations only, largest first

export const CATEGORIES = [
  { id: 'all', label: 'All causes' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'medical', label: 'Medical' },
  { id: 'children', label: 'Children' },
  { id: 'education', label: 'Education' },
  { id: 'elderly', label: 'Elderly' },
  { id: 'animals', label: 'Animals' },
  { id: 'disaster', label: 'Disaster relief' },
  { id: 'hunger', label: 'Hunger' },
  { id: 'women', label: 'Women' },
  { id: 'disability', label: 'Disability' },
  { id: 'community', label: 'Community' },
  { id: 'faith', label: 'Faith' },
]

export const campaigns = [
  {
    slug: 'heart-surgery-for-a-6-year-old',
    category: 'medical',
    categoryLabel: 'Medical',
    urgent: true,
    taxBenefit: true,
    featured: false,
    title: 'Heart surgery for a 6-year-old from a daily-wage family',
    summary: 'Help a daily-wage family pay for their 6-year-old’s heart surgery. Hospital estimate verified by GiveHope.',
    organiser: '[Organiser name]',
    location: '[City, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    photo: 'hospital',
    photoIllustrative: true,
  },
  {
    slug: 'ration-kits-for-flood-affected-families',
    ngo: 'partner-relief',
    category: 'disaster',
    categoryLabel: 'Disaster relief',
    urgent: true,
    taxBenefit: true,
    featured: true,
    title: 'Ration and hygiene kits for flood-affected families',
    summary: 'Send ration and hygiene kits to families who lost everything in the floods in [District, State].',
    organiser: '[Partner NGO]',
    location: '[District, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    alsoIn: ['hunger', 'community'],
    photo: 'flood',
    photoIllustrative: true,
  },
  {
    slug: 'school-fees-for-girls-in-rural-schools',
    ngo: 'partner-education',
    category: 'education',
    categoryLabel: 'Education',
    urgent: false,
    taxBenefit: true,
    featured: false,
    title: 'School fees and books for girls in rural government schools',
    summary: 'Keep girls in rural government schools in class with fees, books and uniforms.',
    organiser: '[Partner NGO]',
    location: '[Village, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    alsoIn: ['children', 'women'],
    photo: 'students',
    photoIllustrative: true,
  },
  {
    slug: 'meals-and-medicines-for-elders-living-alone',
    ngo: 'partner-elders',
    category: 'elderly',
    categoryLabel: 'Elderly',
    urgent: false,
    taxBenefit: true,
    featured: false,
    title: 'Daily meals and medicines for elders living alone',
    summary: 'Provide daily meals, medicines and check-ups for elders with no family support.',
    organiser: '[Care home name]',
    location: '[City, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    alsoIn: ['hunger'],
    photo: 'elder',
    photoPosition: 'center 25%',
    photoIllustrative: true,
  },
  {
    slug: 'food-and-treatment-for-injured-street-dogs',
    ngo: 'partner-animals',
    category: 'animals',
    categoryLabel: 'Animals',
    urgent: false,
    taxBenefit: true,
    featured: false,
    title: 'Food and treatment for injured street dogs',
    summary: 'Fund food, vaccines and treatment for rescued and injured street dogs.',
    organiser: '[Animal shelter name]',
    location: '[City, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    photo: 'dog',
    photoPosition: 'center 35%',
    photoIllustrative: true,
  },
  {
    slug: 'meals-for-children-at-a-learning-centre',
    ngo: 'partner-education',
    category: 'children',
    categoryLabel: 'Children',
    urgent: false,
    taxBenefit: true,
    featured: false,
    title: 'Nutritious meals for children at a community learning centre',
    summary: 'Give children at a community learning centre a nutritious meal every school day.',
    organiser: '[Partner NGO]',
    location: '[City, State]',
    raised: null,
    goal: null,
    donors: null,
    daysLeft: null,
    alsoIn: ['hunger', 'education'],
    photo: 'meal',
    photoIllustrative: true,
  },
]

export const fundraiserPath = (c) => `/fundraiser/${c.slug}/`

export const getCampaign = (slug) => campaigns.find((c) => c.slug === slug)

export const featuredCampaign = campaigns.find((c) => c.featured) || campaigns[0]

export function filterCampaigns(categoryId) {
  if (categoryId === 'all') return campaigns
  if (categoryId === 'urgent') return campaigns.filter((c) => c.urgent)
  return campaigns.filter((c) => c.category === categoryId || c.alsoIn?.includes(categoryId))
}

/** True once a fundraiser has real raised and goal amounts. Until then no progress bar is shown. */
export const hasProgress = (c) => c.raised != null && Boolean(c.goal)

export function progressOf(c) {
  return hasProgress(c) ? Math.round((c.raised / c.goal) * 100) : 0
}
