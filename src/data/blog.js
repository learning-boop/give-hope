// Blog posts for /blog/ and /blog/<slug>/. Newest first.
// Body blocks: { h: 'Heading' } · { p: 'Paragraph' } · { list: ['item', ...] } · { note: 'Highlighted note' }
// Tax and legal information here is general; review it each year and when rules change.
export const POSTS = [
  {
    slug: 'section-80g-tax-benefits-on-donations',
    title: 'Section 80G: how to save tax when you donate',
    category: 'Tax and giving',
    date: '2026-11-20',
    photo: 'woman-orange',
    excerpt: 'Who can claim the 80G deduction, how much you can save, and what you need for your receipt to count.',
    body: [
      { p: 'Section 80G of the Income Tax Act lets you deduct donations to eligible charities from your taxable income. Done right, a donation helps a cause and lowers your tax bill.' },
      { h: 'How much can you deduct?' },
      { p: 'It depends on the organisation. For most registered NGOs the deduction is 50% of the amount donated, within an overall limit of 10% of your adjusted gross total income. Some government funds qualify for 100%. Your receipt states which applies.' },
      { h: 'What you need' },
      {
        list: [
          'A donation to an NGO with valid 80G registration — check the receipt shows its 80G number',
          'Your PAN, given at the time of donating, so the NGO can report your donation',
          'Payment by UPI, card, netbanking or cheque. Cash donations above ₹2,000 do not qualify',
          'Money only. Donations of clothes, food or other goods are not eligible',
        ],
      },
      { h: 'Form 10BE: your official certificate' },
      { p: 'NGOs now report donations to the Income Tax Department and issue a certificate in Form 10BE after the financial year ends. Your deduction is matched against what the NGO reported, so make sure your PAN and name are correct when you give.' },
      { h: 'Old or new tax regime?' },
      { p: 'The 80G deduction is available only under the old tax regime. If you have chosen the new regime, you cannot claim it — though your donation still does just as much good.' },
      { note: 'This is general information, not tax advice. Rules change; check the latest position or speak to a tax adviser before filing.' },
    ],
  },
  {
    slug: 'how-to-check-an-ngo-is-genuine',
    title: 'How to check an NGO is genuine before you donate',
    category: 'Giving wisely',
    date: '2026-11-12',
    photo: 'men-group',
    excerpt: 'Six checks anyone can do in a few minutes, and what we look at before an NGO can raise funds on GiveHope.',
    body: [
      { p: 'Most NGOs do honest, hard work. But a few minutes of checking before you give protects your money and makes sure it reaches people who need it.' },
      { h: 'Six things to check' },
      {
        list: [
          'Registration: a Trust deed, Society registration or Section 8 company certificate',
          '12A and 80G: registration for tax exemption, and the right to give donors 80G receipts',
          'NGO Darpan ID: a unique ID from NITI Aayog’s NGO Darpan portal, which you can search online',
          'FCRA: only needed if the NGO takes money from abroad — Indian donors do not need to check this',
          'Audited accounts and an annual report, ideally published on their website',
          'Real updates: photos, bills and stories that show the work, not just appeals for money',
        ],
      },
      { h: 'Warning signs' },
      { p: 'Be careful with requests to pay into a personal bank account, pressure to give immediately, no fixed address, or stories that cannot be verified. A genuine organisation will happily answer your questions.' },
      { h: 'What GiveHope checks' },
      { p: 'Before an NGO or fundraiser goes live on GiveHope, our team collects and checks its documents, meets the people behind it and visits the work in person. For medical fundraisers we confirm the estimate with the hospital. You can read more on our How your donation works page.' },
    ],
  },
  {
    slug: 'why-monthly-giving-matters',
    title: 'Why a small monthly gift can do more than a big one-off',
    category: 'Monthly giving',
    date: '2026-11-05',
    photo: 'school-lane',
    excerpt: 'Shelters, schools and care homes can plan around steady support. Here is why monthly giving works.',
    body: [
      { p: 'A one-time gift in an emergency is precious. But most of the work NGOs do never stops: children need meals every day, elders need medicines every month, and animals need feeding whether or not they are in the news.' },
      { h: 'Steady money means better planning' },
      { p: 'When an NGO knows money is coming each month, it can hire a cook, sign up another student or stock medicines in advance — instead of scrambling from one appeal to the next.' },
      { h: 'Easier on your budget' },
      { p: '₹500 or ₹1,000 a month is easier to plan for than a large single gift, and over a year it often adds up to more than people would give at once.' },
      { h: 'You stay in control' },
      { list: ['Choose the mission you care about', 'Change the amount whenever you like', 'Pause or cancel anytime', 'Get updates on what your gifts paid for'] },
      { p: 'If you want to start, our monthly missions cover street animals, elders, education, meals, urgent treatment and disaster readiness.' },
    ],
  },
  {
    slug: 'celebrate-special-days-by-giving',
    title: 'Celebrate birthdays and special days by giving',
    category: 'Ideas',
    date: '2026-10-28',
    photo: 'flower-work',
    excerpt: 'Birthdays, anniversaries, festivals and remembrance days — simple ways to mark them with a gift that helps others.',
    body: [
      { p: 'Many families already mark special days with annadanam or a visit to an orphanage or old age home. Giving online makes it easy to do the same from anywhere.' },
      { h: 'Ideas for every occasion' },
      {
        list: [
          'Birthdays: give ₹100 for every year of your age, or ask friends to give instead of buying gifts',
          'Anniversaries: sponsor a month of meals for children',
          'Remembrance: give in memory of a loved one to a cause they cared about',
          'Festivals: share Sankranti, Eid, Deepavali or Christmas with a family in need',
          'Thank-yous: send a donation gift card to a teacher or colleague',
        ],
      },
      { h: 'Gift cards make it personal' },
      { p: 'With a GiveHope gift card, the person you are celebrating chooses which verified cause the money goes to. Our festival calendar has a giving idea for every major day of the year.' },
    ],
  },
]

export const postPath = (slug) => `/blog/${slug}/`
export const formatPostDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
export const getPost = (slug) => POSTS.find((p) => p.slug === slug)
export const readingTime = (post) => {
  const words = post.body.map((b) => b.p || b.h || b.note || (b.list || []).join(' ')).join(' ').split(/\s+/).length
  return Math.max(2, Math.round(words / 200))
}
