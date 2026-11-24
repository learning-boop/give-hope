// Figures for the Our Impact page (/impact/). Use only numbers backed by your records or audited report.
// Anything left as null shows as [N] or a placeholder, so nothing is invented.
export const IMPACT_REPORT = {
  period: '[2025–26]',
  livesImpacted: null,
  donations: null,
  amountRaised: null, // in rupees, e.g. 2500000
  ngos: null,
  fundraisers: null,
  // Where donations reached, e.g. [{ name: 'Krishna', state: 'Andhra Pradesh' }]
  districts: [],
  // Share of donations by cause, e.g. [{ cause: 'medical', percent: 42 }]. Should add up to 100.
  causeShare: [],
  // Stories of change, e.g. [{ name: 'Lakshmi*', title: 'Back in school', ngo: 'Partner NGO', place: 'Guntur', text: '...', photo: 'photo-key' }]
  // Use first names only (with * when changed) and only with consent.
  stories: [],
}
