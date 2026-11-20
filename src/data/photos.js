// Stock photos in public/images (free Unsplash licence: https://unsplash.com/license).
// They show the kind of work each cause funds — they are NOT the people or animals a fundraiser helps.
// People photos were chosen from Andhra Pradesh and Vijayawada searches to look South Indian; few are confirmed local.
// Replace them with real photos, taken with consent, before launch.
// No photo repeats on a page. A fundraiser's own photo is shared by its card and its page,
// and a monthly programme's photo by the homepage and the Monthly page.
// Spare photos that are not on the site are kept in photo-library/ at the project root.
const unsplash = (slug) => `https://unsplash.com/photos/${slug}`

export const PHOTOS = {
  // Fundraiser cards and pages
  hospital: { alt: 'A hospital room with a made bed and a patient monitor', source: unsplash('a-modern-hospital-room-with-an-adjustable-bed-3EIraOmufG4') },
  flood: { alt: 'People helping each other through a flooded street', source: unsplash('a-group-of-people-stand-in-a-flooded-street-bXWEmibzfjY') },
  students: { alt: 'Five smiling girls in school uniform standing together outdoors', source: unsplash('five-smiling-girls-stand-together-outdoors-hHqDfVGZN1g') },
  elder: { alt: 'An elderly man in a white shirt and blue scarf', source: unsplash('man-in-white-dress-shirt-and-blue-scarf-zb-FFqPSLaU') },
  dog: { alt: 'A brown street dog standing on a road', source: unsplash('a-dog-standing-on-a-road-qFfLfa1lk9c') },
  meal: { alt: 'A steel plate with rotis, vegetables and dal', source: unsplash('cooked-food-on-round-tray-mlwXrYYAOms') },

  // Home hero slides use the transparent cut-outs public/images/cutout-*.webp (supplied by you).
  // Slides 1 and 3 have their bottom edges faded so they can sit mid-height.
  // hero-girl.webp / cutout-girl.webp are the earlier slide 1 picture, kept but no longer used.
  'operating-room': { alt: 'An empty operating room with a surgical table and overhead lights', source: unsplash('operating-room-with-surgical-table-LPurJnihmQI') },

  // Home "Categories" circles use 240px square thumbnails: public/images/<name>-thumb.webp
  // (also made for flood-car, operating-room, children-group, field-care, flower-work). Full sizes of these 7 stay in photo-library/.
  classroom: { alt: 'Young children sitting at green desks in a classroom', source: unsplash('a-group-of-young-children-sitting-at-a-table-R7liKyziWG8') },
  'elder-turban': { alt: 'An elderly man in a white turban, smiling', source: unsplash('an-old-man-with-a-white-turban-holding-a-stick-Jp4s-ol0RcY') },
  'cow-care': { alt: 'A woman feeding a cow beside a blue wall', source: unsplash('woman-feeding-cow-b1Ywo-ZKtTs') },
  'flood-boat': { alt: 'People travelling by boat across floodwater', source: unsplash('a-group-of-people-in-a-boat-on-a-river-YNyw3bQYgG0') },
  'community-kitchen': { alt: 'People cooking together in a community kitchen', source: unsplash('a-group-of-people-cooking-in-a-kitchen-JZg6JVZW0DE') },
  'women-circle': { alt: 'A group of women in saris sitting together outdoors', source: unsplash('a-group-of-women-sitting-next-to-each-other-V-3YgB-GsFg') },
  'village-lane': { alt: 'A woman pushing a bicycle past a blue building in a village', source: unsplash('woman-in-brown-shirt-riding-on-black-bicycle-beside-blue-concrete-building-during-daytime-kxZUe3M024I') },

  // Monthly programmes (homepage and Monthly page)
  'flood-relief': { alt: 'Two young volunteers hand a ration bag and a bucket of hygiene supplies to a mother and her daughter after a flood', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'elder-visit': { alt: 'A young volunteer visits an elderly woman at home with a tiffin of food and her medicines', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'ward-care': { alt: 'A nurse checks on an elderly man in a hospital bed while his wife holds his hand', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'school-meal': { alt: 'A smiling woman with two schoolchildren eating rice and curry from steel plates', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'cow-feed': { alt: 'A young woman feeding fresh greens to two cows', source: 'Supplied by GiveHope (AI-generated illustration)' },
  // dogs-street (A group of street dogs standing together, unsplash rKf9c9-ICGc) was the earlier animals photo; files kept in public/images.
  'dogs-street': { alt: 'A group of street dogs standing together', source: unsplash('black-and-white-short-coated-dogs-rKf9c9-ICGc') },
  'elder-moustache': { alt: 'An elderly man with a white moustache and an orange scarf', source: unsplash('JH2yXTmkhnc') },
  'students-bench': { alt: 'Two young boys in uniform sitting on a classroom bench', source: unsplash('a-couple-of-young-boys-sitting-at-a-table-TMJlg3xVJdg') },
  // uniform-smile was the earlier school photo (it cropped the face); files kept in public/images.
  'uniform-smile': { alt: 'Schoolboys in blue shirts and striped ties', source: unsplash('a-group-of-young-boys-wearing-blue-shirts-and-ties-EddF0lavUgA') },
  'roti-rice': { alt: 'Rotis, rice, lime and dal on a plate', source: unsplash('bread-on-black-ceramic-plate--25EaNk7VKM') },
  'hospital-hallway': { alt: 'A nurse wheeling an incubator down a hospital corridor', source: unsplash('person-walking-on-hallway-in-blue-scrub-suit-near-incubator-ZCO_5Y29s8k') },
  'food-packets': { alt: 'Hands holding packets of rice and groceries', source: unsplash('a-close-up-of-a-person-holding-a-bag-of-food-iIZXUKjWFAA') },

  // Home sections
  'donor-update': { alt: 'A man at home smiles at a photo update of a child recovering in hospital on his phone', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'family-visit': { alt: 'A GiveHope volunteer sits on a mat with a mother and her elderly father, going through a hospital bill together', source: 'Supplied by GiveHope (AI-generated illustration)' },
  'women-group': { alt: 'A group of women in saris sitting together on steps', source: unsplash('a-group-of-women-sitting-on-the-steps-of-a-building-QczbkNLUR4g') },
  'woman-speaking': { alt: 'A woman in glasses and a colourful sari, speaking', source: unsplash('woman-in-glasses-wearing-a-colorful-sari-talking-vP-y3ckJDS4') },
  // coconut-workers and puppies were the earlier Why GiveHope photos; files kept in public/images.
  'coconut-workers': { alt: 'People walking through a green field beneath large trees', source: unsplash('people-walking-on-green-grass-field-during-daytime-_ssmNHkymiA') },
  puppies: { alt: 'Two puppies sitting on a wooden board', source: unsplash('two-puppy-sitting-on-brown-board-dpn6K9e1vzY') },
  'giving-plate': { alt: 'A woman handing another woman a plate of food', source: unsplash('a-woman-handing-another-woman-a-plate-of-food-11y9Eu0JwEI') },
  'boys-steps': { alt: 'A large group of boys in colourful clothes sitting on stone steps', source: unsplash('boys-in-traditional-clothing-on-steps-iWtL2nLjk2s') },
  plate: { alt: 'Hands holding a steel plate of rice and curry', source: unsplash('a-woman-holding-a-bowl-of-rice-and-meat-_GJxmypaMcU') },
  'sari-street': { alt: 'Two women in saris on a street outside a shop', source: unsplash('woman-in-yellow-and-blue-sari-standing-on-sidewalk-during-daytime-ryRXiFhMZ3I') },
  'elder-women': { alt: 'Two elderly women in saris talking together', source: unsplash('a-woman-sitting-next-to-a-woman-who-is-holding-a-piece-of-paper-gkOHzSbC7I8') },
  'field-smile': { alt: 'A smiling woman in an orange shirt and striped headscarf among palm trees', source: unsplash('smiling-woman-in-orange-button-up-shirt-wearing-gray-and-white-striped-knit-cap-O9KuCTihxLk') },
  thali: { alt: 'A plate of rotis, vegetables and chutney', source: unsplash('cooked-roti-dish-EGNB5qZfscw') },
  children: { alt: 'A group of smiling schoolchildren in uniform waving at the camera', source: unsplash('group-of-children-taking-picture-j9jZSqfH5YI') },

  // Crowdfunding
  'woman-orange': { alt: 'A smiling woman in an orange and green sari', source: unsplash('woman-in-orange-and-green-sari-MoRZkuHxl0M') },
  'men-group': { alt: 'A group of men standing together, one in an orange turban', source: unsplash('WWPncw8NQqk') },
  'children-group': { alt: 'A group of young children standing together', source: unsplash('a-group-of-young-children-standing-next-to-each-other-UNLA9A41QAA') },
  'flood-car': { alt: 'A car and people in a flooded street', source: unsplash('a-couple-of-people-standing-next-to-a-car-in-a-flooded-street-aby-GGLtD-A') },
  'street-cows': { alt: 'Cows resting on a street at sunset', source: unsplash('cows-on-a-dusty-street-at-sunset-dS8-QhO-Qq0') },
  'town-street': { alt: 'People riding motorcycles down a street in a town in Andhra Pradesh', source: unsplash('a-group-of-people-riding-motorcycles-down-a-street-Ijq8uI9lw_E') },

  // Monthly, About and Documents
  'field-care': { alt: 'A woman caring for others in a group sitting in a field', source: unsplash('a-group-of-women-sitting-in-a-field-lSShwZG4tDQ') },
  'boat-river': { alt: 'A man rowing a small boat on a river', source: unsplash('a-man-is-rowing-a-boat-in-the-water-bQB5e_IqvWM') },
  'women-craft': { alt: 'Women working side by side on a craft', source: unsplash('a-group-of-people-standing-next-to-each-other-FJC13sgIo3Q') },
  'flower-work': { alt: 'Women sorting flowers at a market', source: unsplash('a-group-of-women-sitting-on-the-floor-of-a-market-wXVV77pcB-E') },
  'school-lane': { alt: 'Three boys walking down a colourful lane', source: unsplash('three-boys-walking-between-buildings-at-daytime-o9CQk3UnGM8') },
}
