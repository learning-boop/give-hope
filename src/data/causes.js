// Photo (a 240px square thumbnail: public/images/<photo>-thumb.webp), icon and short line for each cause.
// Used by the home page cause circles and the navbar's Donate menu. Labels come from CATEGORIES in campaigns.js.
// Disability and Faith use stand-in photos until you have real ones.
export const CAUSE_DETAILS = {
  all: { icon: 'grid', text: 'Every verified fundraiser' },
  urgent: { photo: 'flood-car', icon: 'alert', text: 'Help needed in the next few days' },
  medical: { photo: 'operating-room', icon: 'pulse', text: 'Surgeries and hospital bills' },
  children: { photo: 'children-group', icon: 'users', text: 'Care and safety for children' },
  education: { photo: 'classroom', icon: 'book', text: 'Fees, books and uniforms' },
  elderly: { photo: 'elder-turban', icon: 'homeHeart', text: 'Meals and medicines for elders' },
  animals: { photo: 'cow-care', icon: 'paw', text: 'Food and treatment for animals' },
  disaster: { photo: 'flood-boat', icon: 'lifebuoy', text: 'Relief after floods and cyclones' },
  hunger: { photo: 'community-kitchen', icon: 'bowl', text: 'Meals and ration kits' },
  women: { photo: 'women-circle', icon: 'woman', text: 'Skills, health and safety' },
  disability: { photo: 'field-care', icon: 'accessibility', text: 'Aids, therapy and support' },
  community: { photo: 'village-lane', icon: 'village', text: 'Water and village projects' },
  faith: { photo: 'flower-work', icon: 'diya', text: 'Projects at places of worship' },
}

/** Link to the home page fundraisers, filtered to one cause. */
export const causePath = (id) => (id === 'all' ? '/#fundraisers' : `/?cause=${id}#fundraisers`)
