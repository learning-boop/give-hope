// Monthly missions: each has its own page at /missions/<id>/ and its own monthly donation steps at /donate/mission/<id>/.
// Shown on the homepage, the Monthly giving page, the cause pages and the navbar's Donate menu.
//
// Text in [brackets] is something only you can fill in truthfully — what an amount really pays for,
// impact so far, stories and partner NGOs. Sections with no real data yet are hidden, not invented:
//   impact:   { value: '[N]', label: 'animals fed and treated so far' }   shown as a highlight once set
//   stories:  [{ name: 'Lakshmi', text: 'What changed for her', photo: 'photo-key' }]
//   partners: [{ name: 'NGO name', city: 'Vijayawada' }]
export const MONTHLY_PLANS = [
  {
    id: 'animals',
    cause: 'animals',
    photo: 'cow-feed',
    title: 'Care for street animals',
    text: 'Food, vaccines and treatment for rescued cows, dogs and cats.',
    tagline: 'Hungry, hurt and on their own, street animals need someone who keeps showing up.',
    about: [
      'Street dogs, cows and cats live with hunger, traffic injuries and illness that nobody treats. Rescuers and shelters do what they can, often paying for food and medicines themselves.',
      'A monthly gift lets shelters plan ahead: regular feeding, vaccination drives and treatment for injured animals, instead of scrambling from one emergency to the next.',
    ],
    needs: [
      { icon: 'bowl', label: 'Food' },
      { icon: 'shieldCheck', label: 'Vaccines' },
      { icon: 'pulse', label: 'Treatment' },
      { icon: 'homeHeart', label: 'Shelter' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for, e.g. feeding one street dog]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
  {
    id: 'elders',
    cause: 'elderly',
    photo: 'elder-visit',
    title: 'Support an elder',
    text: 'Meals, medicines and check-ups for elders with no family support.',
    tagline: 'Alone, unwell and often hungry — grandparents with no one should not be forgotten.',
    about: [
      'Many elders live alone, without family nearby or a pension that covers food and medicines. Missing meals and skipping daily medicines quickly turns into a hospital stay.',
      'Your monthly gift supports old age homes and home-visit programmes that bring meals, medicines, check-ups and company to elders who have no one else.',
    ],
    needs: [
      { icon: 'bowl', label: 'Meals' },
      { icon: 'pulse', label: 'Medicines' },
      { icon: 'users', label: 'Company' },
      { icon: 'homeHeart', label: 'Safe home' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for, e.g. one elder’s monthly medicines]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
  {
    id: 'school',
    cause: 'education',
    photo: 'students-bench',
    title: 'Keep a child in school',
    text: 'Fees, books and uniforms so a child never has to drop out.',
    tagline: 'A fee increase or a bad harvest should not end a child’s education.',
    about: [
      'For families living on daily wages, school costs add up: fees, books, uniforms and travel. When money runs short, children — often girls — are the first to leave school.',
      'A monthly gift covers these costs year round, so children can stay in class, finish school and have choices their parents never had.',
    ],
    needs: [
      { icon: 'book', label: 'Books' },
      { icon: 'users', label: 'Uniforms' },
      { icon: 'receipt', label: 'Fees' },
      { icon: 'bowl', label: 'School meals' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for, e.g. one child’s school costs]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
  {
    id: 'meals',
    cause: 'hunger',
    photo: 'school-meal',
    title: 'Put meals on the table',
    text: 'Regular, nutritious meals for children and families who go without.',
    tagline: 'No child should have to learn, play or sleep on an empty stomach.',
    about: [
      'For many families, a lost day of work means a day without food. Children who go hungry fall ill more often and find it hard to concentrate in school.',
      'Your monthly gift supports community kitchens, school meals and ration kits, so families can count on food every day, not only in an emergency.',
    ],
    needs: [
      { icon: 'bowl', label: 'Cooked meals' },
      { icon: 'homeHeart', label: 'Ration kits' },
      { icon: 'users', label: 'Children' },
      { icon: 'pulse', label: 'Nutrition' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for, e.g. number of meals]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
  {
    id: 'treatment',
    cause: 'medical',
    photo: 'ward-care',
    title: 'Help with urgent treatment',
    text: 'A standing fund for patients who cannot pay for care when they need it.',
    tagline: 'When someone falls seriously ill, the money should already be there.',
    about: [
      'Emergencies do not wait for a fundraiser to fill up. Families often delay surgery or stop treatment halfway because they cannot pay a deposit in time.',
      'Your monthly gift builds a standing fund that pays hospitals directly for patients who cannot afford urgent care, the moment it is needed.',
    ],
    needs: [
      { icon: 'pulse', label: 'Surgery' },
      { icon: 'shieldCheck', label: 'Medicines' },
      { icon: 'homeHeart', label: 'Hospital stay' },
      { icon: 'receipt', label: 'Tests' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
  {
    id: 'relief',
    cause: 'disaster',
    photo: 'flood-relief',
    title: 'Be ready for the next disaster',
    text: 'Ration and hygiene kits that can reach families soon after a flood or cyclone.',
    tagline: 'Floods and cyclones come every year. Help be ready before the next one does.',
    about: [
      'Andhra Pradesh’s coast is hit by cyclones and floods again and again. In the first days, families need food, clean water and hygiene supplies most.',
      'Your monthly gift keeps ration and hygiene kits ready and funds relief teams, so help can reach families within days instead of weeks.',
    ],
    needs: [
      { icon: 'bowl', label: 'Ration kits' },
      { icon: 'lifebuoy', label: 'Rescue' },
      { icon: 'shieldCheck', label: 'Hygiene kits' },
      { icon: 'homeHeart', label: 'Shelter' },
    ],
    amounts: [
      { amount: 500, text: '[What ₹500 a month pays for]' },
      { amount: 1000, text: '[What ₹1,000 a month pays for, e.g. one family’s ration kit]' },
      { amount: 2500, text: '[What ₹2,500 a month pays for]' },
    ],
  },
]

export const MONTHLY_AMOUNTS = [500, 1000, 2500, 5000]
export const MONTHLY_MINIMUM = 100

export const missionPath = (id) => `/missions/${id}/`
export const missionDonatePath = (id, amount) => `/donate/mission/${id}/${amount ? `?amount=${amount}` : ''}`
export const getMission = (id) => MONTHLY_PLANS.find((p) => p.id === id)

// Questions shown on every mission page. Text in [brackets] is a policy you still need to decide.
export const MISSION_FAQS = [
  {
    q: 'How does monthly giving work?',
    a: 'You pledge an amount once, and it is paid automatically every month until you stop it. There is nothing to remember, and the NGOs you support can plan their work around it.',
  },
  {
    q: 'Can I pause, change or cancel my monthly gift?',
    a: 'Yes. You can change the amount, pause or cancel anytime, and no further payments are taken. [Until online accounts are live, message us on WhatsApp and we will do it for you.]',
  },
  {
    q: 'Will I get a tax receipt?',
    a: 'Yes. Monthly gifts are eligible for deduction under Section 80G of the Income Tax Act, and you get a receipt for your gifts. [State whether receipts are sent monthly or once a year.]',
  },
  {
    q: 'Where does my money go?',
    a: 'Your gifts go to verified partner NGOs working on this mission. [Describe how money is split between partners and how often it is paid out.]',
  },
  {
    q: 'How will I know what my gifts did?',
    a: 'We send you updates with photos and reports from the partner NGOs about what your gifts paid for. [State how often, e.g. every six months.]',
  },
]
