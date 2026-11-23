// Photo, icon and short line for each cause, plus the content of its own page at /causes/<id>/.
// Photos: <photo>-thumb.webp (240px square) for the circles and menus, <photo>-1600/-800.webp for the page banner.
// Used by the home page cause circles, the navbar's Donate menu and the cause pages. Labels come from CATEGORIES in campaigns.js.
// Disability and Faith use stand-in photos until you have real ones.
// `monthly` links a cause to a monthly-giving plan in monthly.js. Page text is general and makes no claims about numbers.
export const CAUSE_DETAILS = {
  all: { icon: 'grid', text: 'Every verified fundraiser' },
  urgent: {
    photo: 'flood-car',
    icon: 'alert',
    text: 'Help needed in the next few days',
    headline: 'Help that can’t wait',
    intro: 'A surgery date, a family after a flood, a bill that falls due this week. These fundraisers need support now.',
    about: [
      'Some needs have a deadline. A hospital will only operate once a deposit is paid, and relief kits matter most in the first days after a disaster. Urgent fundraisers are the ones where the timing of your gift decides what happens next.',
      'Each one is checked by our team like every other fundraiser on GiveHope, with documents and a call to the organiser, so you can give quickly and still know where the money goes.',
    ],
    monthly: 'treatment',
  },
  medical: {
    photo: 'operating-room',
    icon: 'pulse',
    text: 'Surgeries and hospital bills',
    headline: 'Help someone get the treatment they need',
    intro: 'Surgeries, cancer care, transplants and long hospital stays can cost more than a family earns in years.',
    about: [
      'When someone falls seriously ill, the cost of care often arrives all at once. Families sell land, take loans or stop treatment halfway. A medical fundraiser lets friends, neighbours and strangers share that cost.',
      'Medical fundraisers on GiveHope come with a hospital estimate or letter, and money is paid to the hospital or the patient’s verified account. Organisers post bills and updates as treatment goes on.',
    ],
    monthly: 'treatment',
  },
  children: {
    photo: 'children-smile',
    icon: 'users',
    text: 'Care and safety for children',
    headline: 'Give every child a fair start',
    intro: 'Nutritious meals, safe homes, healthcare and the chance to grow up as a child should.',
    about: [
      'Many children grow up without enough to eat, without regular healthcare or without a safe place to live. What happens in these early years shapes the rest of their lives.',
      'Fundraisers for children support care homes, nutrition programmes, medical help and protection for children at risk. Your gift reaches the organisation caring for them, and you get updates on how it is used.',
    ],
    monthly: 'meals',
  },
  education: {
    photo: 'classroom',
    icon: 'book',
    text: 'Fees, books and uniforms',
    headline: 'Keep a child in school',
    intro: 'School fees, books, uniforms and learning centres, so no child has to drop out for lack of money.',
    about: [
      'For many families, a fee increase or a bad harvest is enough to take a child out of school, and girls are often the first to leave. A small amount at the right time can keep them learning.',
      'Education fundraisers cover fees, books, uniforms, travel and support for schools and learning centres. Where possible, money is paid straight to the school or institution.',
    ],
    monthly: 'school',
  },
  elderly: {
    photo: 'elder-turban',
    icon: 'homeHeart',
    text: 'Meals and medicines for elders',
    headline: 'Care for elders who have no one',
    intro: 'Meals, medicines, check-ups and company for elders living alone or in care homes.',
    about: [
      'More elders are living alone, without family nearby or a pension that covers their needs. Many go without regular meals or the medicines they need every day.',
      'Fundraisers for elders support old age homes, meal programmes, medical care and home visits. Even a small, regular gift helps someone grow old with dignity.',
    ],
    monthly: 'elders',
  },
  animals: {
    photo: 'cow-care',
    icon: 'paw',
    text: 'Food and treatment for animals',
    headline: 'Be kind to those who can’t ask',
    intro: 'Food, rescue, vaccines and treatment for street dogs, cows, cats and injured animals.',
    about: [
      'Street animals live with hunger, injuries from traffic and illness that nobody treats. Shelters and rescuers often run on very little, paying for food and treatment themselves.',
      'Animal welfare fundraisers support shelters, feeding drives, vaccination, sterilisation and emergency treatment. Organisers share photos and bills so you can see the animals your gift helped.',
    ],
    monthly: 'animals',
  },
  disaster: {
    photo: 'flood-boat',
    icon: 'lifebuoy',
    text: 'Relief after floods and cyclones',
    headline: 'Stand with families after a disaster',
    intro: 'Food, water, shelter and hygiene kits for families hit by floods, cyclones and other disasters.',
    about: [
      'Floods and cyclones can take a family’s home, food stock and income in a single night. The first days and weeks decide how quickly they can recover.',
      'Disaster relief fundraisers pay for ration kits, drinking water, temporary shelter, medicines and rebuilding. Teams on the ground post updates from the places they reach.',
    ],
    monthly: 'relief',
  },
  hunger: {
    photo: 'community-kitchen',
    icon: 'bowl',
    text: 'Meals and ration kits',
    headline: 'No one should go to bed hungry',
    intro: 'Cooked meals, ration kits and nutrition for families, children and elders who go without.',
    about: [
      'For daily-wage families, a lost day of work can mean a day without food. Children who go hungry find it hard to learn, and elders living alone often skip meals.',
      'Hunger fundraisers support community kitchens, school meals and monthly ration kits. Your gift turns directly into food on someone’s plate.',
    ],
    monthly: 'meals',
  },
  women: {
    photo: 'women-circle',
    icon: 'woman',
    text: 'Skills, health and safety',
    headline: 'Help women build their own future',
    intro: 'Skills training, health care, safety and support for women to earn and stand on their own.',
    about: [
      'When a woman can earn, stay healthy and feel safe, the whole family benefits. Yet many women never get the chance to learn a skill or reach the care they need.',
      'Fundraisers for women support livelihood training, self-help groups, maternal health and help for survivors of violence.',
    ],
  },
  disability: {
    photo: 'field-care',
    icon: 'accessibility',
    text: 'Aids, therapy and support',
    headline: 'Make everyday life possible',
    intro: 'Wheelchairs, hearing aids, therapy and support so people with disabilities can live more independently.',
    about: [
      'A wheelchair, a hearing aid or regular therapy can change what a person with a disability is able to do every day, but these often cost more than a family can manage.',
      'Fundraisers in this cause pay for assistive devices, therapy, special education and support for caregivers.',
    ],
  },
  community: {
    photo: 'village-lane',
    icon: 'village',
    text: 'Water and village projects',
    headline: 'Build something a whole village shares',
    intro: 'Clean water, sanitation, roads, community halls and projects that help a whole neighbourhood.',
    about: [
      'Some needs belong to everyone in a place: a working borewell, a toilet block at the school, a repaired road or a community hall.',
      'Community fundraisers are run by local groups and NGOs who know the place, and they post photos as the work is done.',
    ],
  },
  faith: {
    photo: 'flower-work',
    icon: 'diya',
    text: 'Projects at places of worship',
    headline: 'Support the work of places of worship',
    intro: 'Annadanam, repairs, festivals and the community work that places of worship carry out.',
    about: [
      'Places of worship often feed people, shelter travellers and bring a community together. Many of them depend entirely on what devotees give.',
      'Fundraisers in this cause support meals, repairs and community programmes run from temples, churches, mosques and gurudwaras.',
    ],
  },
}

// Every cause except "All causes" gets its own page
export const CAUSE_IDS = Object.keys(CAUSE_DETAILS).filter((id) => id !== 'all')

/** Link to a cause's own page ("all" goes to the home page fundraisers). */
export const causePath = (id) => (id === 'all' ? '/#fundraisers' : `/causes/${id}/`)
