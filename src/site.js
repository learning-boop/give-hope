// Site-wide settings. Replace every [placeholder] with real, verifiable details before launch.
export const SITE = {
  name: 'GiveHope',
  // Your live domain, no trailing slash. Used for canonical URLs, share previews and the sitemap.
  url: 'https://www.givehope.in',
  tagline: 'Donate to verified causes across India',
  description:
    'Donate to verified fundraisers for medical care, education, disaster relief and animal welfare across India — and see how every rupee is spent.',
  ogImage: '/og-image.png',

  contact: {
    address: '[Registered address]',
    email: '[support@domain]',
    phone: '[+91 phone number]',
    whatsapp: '', // e.g. '919876543210' — enables the WhatsApp contact link when filled
  },

  registration: {
    type: '[Trust / Section 8 company]',
    twelveA: '[Number]',
    eightyG: '[Number]',
    csr1: '[Number]',
    pan: '[Number]',
  },

  paymentGateway: '[Payment gateway]',

  announcement: {
    show: true,
    text: 'Flood relief: ration kits are needed for families in [District, State].',
    linkText: 'Give now',
    href: '/#fundraisers',
  },
}

// Formats a number as Indian rupees (₹1,00,000). Returns the placeholder when the value is missing.
export function inr(value, placeholder = '₹[Amount]') {
  if (value === null || value === undefined || Number.isNaN(value)) return placeholder
  return '₹' + Number(value).toLocaleString('en-IN')
}

export function num(value, placeholder = '[N]') {
  if (value === null || value === undefined || Number.isNaN(value)) return placeholder
  return Number(value).toLocaleString('en-IN')
}
