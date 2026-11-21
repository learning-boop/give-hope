// CHANGE NGO's projects and programmes, shown as scrolling cards on the homepage
// (projects above Monthly giving, programmes below it). Each card links to its page on change.ngo.
// Images: public/images/offer-<id>.webp, 360×400 crops of the stock photos in photo-library/ — stand-ins until you have real ones.
// The one-line descriptions were written from the names only (change.ngo blocks automated reading).
// Please check each line, especially the ones marked "confirm".
const project = (id, name) => `https://www.change.ngo/projectlist.html?id=${id}&name=${name}`
const program = (id, name) => `https://www.change.ngo/programlist.html?program_id=${id}&name=${name}`
const category = (name) => `https://www.change.ngo/programlist.html?category=${encodeURIComponent(name)}`

// "Get involved" cards above "Why people choose GiveHope". These link to pages on GiveHope itself.
export const GET_INVOLVED = [
  { id: 'tax', tag: 'Tax benefit', name: 'Save tax as you give', text: 'Fundraisers marked 80G come with a tax receipt by email', to: '/#faq', cta: 'How it works' },
  { id: 'monthly', tag: 'Monthly giving', name: 'Give every month', text: 'Steady help for a cause you care about. Pause anytime.', to: '/monthly/', cta: 'Start monthly' },
  { id: 'fundraiser', tag: 'For individuals', name: 'Start a fundraiser', text: 'Raise money for someone who needs help. We verify it first.', to: '/crowdfunding/', cta: 'Start now' },
  { id: 'ngo', tag: 'For NGOs', name: 'Register your NGO', text: 'Raise funds for your programmes on GiveHope', to: '/crowdfunding/#documents', cta: 'See what’s needed' },
]

export const PROJECTS = [
  { id: 'arogya', name: 'Arogya', tag: 'Health', text: 'Medical help for families who can’t afford treatment', href: project(21, 'Arogya') },
  { id: 'rare', name: 'Rare', text: 'Support for people living with rare conditions', href: project(41, 'Rare') }, // confirm
  { id: 'annapurna', name: 'Annapurna', tag: 'Food distribution', text: 'Meals and ration kits for families in need', href: project(24, 'Annapurna') },
  { id: 'suraksha', name: 'Suraksha', tag: 'Child welfare', text: 'Safety, care and support for children', href: project(23, 'Suraksha') },
  { id: 'smile', name: 'Smile', text: 'Bringing smiles to children who need them', href: project(38, 'Smile') }, // confirm
  { id: 'haritha', name: 'Haritha', text: 'Planting trees and caring for green spaces', href: project(16, 'Haritha') }, // confirm
  { id: 'jeeva', name: 'Jeeva', text: 'Care and compassion for every life', href: project(20, 'Jeeva') }, // confirm
  { id: 'sahaya', name: 'Sahaya', text: 'A helping hand when it’s needed most', href: project(18, 'Sahaya') }, // confirm
  { id: 'vikas', name: 'Vikas', text: 'Development work in villages and towns', href: project(19, 'Vikas') }, // confirm
  { id: 'yuva', name: 'Yuva', text: 'Young people leading change in their communities', href: 'https://www.change.ngo/' }, // confirm; no page link yet
  { id: 'naari', name: 'Naari', text: 'Skills, health and dignity for women', href: project(35, 'Naari') }, // confirm
  { id: 'nyaya', name: 'Nyaya', text: 'Helping people reach justice and their rights', href: project(36, 'Nyaya') }, // confirm
]

export const PROGRAMS = [
  { id: 'support-my-school', name: 'Support My School', text: 'Books, uniforms and supplies for schools', href: program(4, 'Support-My-School') },
  { id: 'swach-mann', name: 'Swach Mann', text: 'Clean surroundings and healthy communities', href: program(3, 'Swach-mann') }, // confirm
  { id: 'life-saver', name: 'Life Saver', text: 'Help that can save a life in an emergency', href: program(15, 'Life-Saver') }, // confirm
  { id: 'life-changer', name: 'Life Changer', text: 'Support that changes the course of a life', href: category('Life-Changer') }, // confirm
  { id: 'the-wtr', name: 'The Wtr', text: 'Safe water for communities', href: category('The-Wtr') }, // confirm
  { id: 'social-passport', name: 'Social Passport', text: 'Your way into volunteering and social work', href: category('Social-Passport') }, // confirm
  { id: 'change-one', name: 'Change One', text: 'Change one life, one step at a time', href: category('Change One') }, // confirm
  { id: 'human-library', name: 'Human Library', text: 'Real people sharing their life stories', href: category('Human-Library') }, // confirm
  { id: 'kindness-bank', name: 'Kindness Bank', text: 'Give your time, skills or things you can spare', href: category('Kindness-Bank') }, // confirm
  { id: 'second-life', name: 'Second Life', text: 'Give things you no longer use a second life', href: category('Second-Life') }, // confirm
  { id: 'change-lab', name: 'Change Lab', text: 'New ideas for social change', href: category('Change-Lab') }, // confirm
  { id: 'wish', name: 'Wish', text: 'Make someone’s wish come true', href: category('Wish') }, // confirm
]
