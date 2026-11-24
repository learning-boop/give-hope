// Indian festival calendar for /indian-festival-calendar/, with a giving idea for each day.
// Dates for 2027 are from timeanddate.com (Indian holiday list, checked Nov 2026). Islamic festivals depend on the moon
// sighting, so they are marked tentative. Check dates again each year before updating.
// `link` points to a mission (/missions/<id>/) or cause page (/causes/<id>/) on GiveHope.
export const FESTIVAL_YEAR = '2027'

export const FESTIVALS = [
  { date: '2026-12-25', name: 'Christmas', type: 'Festival', about: 'Celebrates the birth of Jesus Christ with prayer, carols and sharing.', idea: 'Give a warm meal to a family this Christmas.', link: '/missions/meals/' },
  { date: '2027-01-14', name: 'Makar Sankranti / Pongal', type: 'Harvest festival', about: 'Marks the sun’s move into Capricorn and the winter harvest. In Andhra Pradesh, Sankranti is the biggest festival of the year.', idea: 'Share the harvest: feed cows and street animals.', link: '/missions/animals/' },
  { date: '2027-01-26', name: 'Republic Day', type: 'National day', about: 'Marks the day India’s Constitution came into force in 1950.', idea: 'Keep a child in school, the start of every citizen’s future.', link: '/missions/school/' },
  { date: '2027-03-06', name: 'Maha Shivaratri', type: 'Festival', about: 'The great night of Lord Shiva, observed with fasting and night-long prayer.', idea: 'Support annadanam and the work of places of worship.', link: '/causes/faith/' },
  { date: '2027-03-08', name: 'International Women’s Day', type: 'Observance', about: 'Celebrates women’s achievements and the push for equal rights.', idea: 'Help women learn skills and earn their own income.', link: '/causes/women/' },
  { date: '2027-03-10', name: 'Ramzan Id (Eid ul-Fitr)', type: 'Festival', tentative: true, about: 'Marks the end of Ramadan’s month of fasting. Zakat and giving to the needy are central to it.', idea: 'Give a ration kit so every family can celebrate.', link: '/missions/meals/' },
  { date: '2027-03-22', name: 'Holi', type: 'Festival', about: 'The festival of colours, welcoming spring and the victory of good over evil.', idea: 'Bring colour to a child’s life with books and fees.', link: '/missions/school/' },
  { date: '2027-03-26', name: 'Good Friday', type: 'Festival', about: 'Remembers the crucifixion of Jesus Christ, a day of prayer and reflection.', idea: 'Help a patient who cannot afford treatment.', link: '/missions/treatment/' },
  { date: '2027-04-07', name: 'Ugadi', type: 'New year', about: 'The Telugu and Kannada new year, welcomed with Ugadi pachadi — a mix of six tastes for life’s many flavours.', idea: 'Start the new year with a monthly gift.', link: '/monthly/' },
  { date: '2027-04-15', name: 'Sri Rama Navami', type: 'Festival', about: 'Celebrates the birth of Lord Rama. Bhadrachalam’s celebrations draw devotees from across the Telugu states.', idea: 'Support meals and care for elders living alone.', link: '/missions/elders/' },
  { date: '2027-05-09', name: 'Mother’s Day', type: 'Observance', about: 'A day to thank mothers and the women who raised us.', idea: 'Give in your mother’s name with a gift card.', link: '/gift-cards/' },
  { date: '2027-05-17', name: 'Bakrid (Eid ul-Adha)', type: 'Festival', tentative: true, about: 'The festival of sacrifice, when food is shared with family, friends and those in need.', idea: 'Share a meal with families who go without.', link: '/causes/hunger/' },
  { date: '2027-05-20', name: 'Buddha Purnima', type: 'Festival', about: 'Marks the birth, enlightenment and passing of Gautama Buddha.', idea: 'Practise compassion: care for injured animals.', link: '/missions/animals/' },
  { date: '2027-06-05', name: 'World Environment Day', type: 'Observance', about: 'A United Nations day for protecting the environment.', idea: 'Support clean water and village projects.', link: '/causes/community/' },
  { date: '2027-08-15', name: 'Independence Day', type: 'National day', about: 'Marks India’s independence in 1947.', idea: 'Help a family stand on its own after a disaster.', link: '/missions/relief/' },
  { date: '2027-08-17', name: 'Raksha Bandhan', type: 'Festival', about: 'Celebrates the bond between brothers and sisters.', idea: 'Give a gift that protects a girl’s education.', link: '/missions/school/' },
  { date: '2027-08-25', name: 'Krishna Janmashtami', type: 'Festival', about: 'Celebrates the birth of Lord Krishna, with fasting, songs and dahi handi.', idea: 'Feed cows and care for street animals.', link: '/missions/animals/' },
  { date: '2027-09-04', name: 'Vinayaka Chavithi', type: 'Festival', about: 'Ganesh Chaturthi, welcoming Lord Ganesha, the remover of obstacles, with pandals across Andhra Pradesh.', idea: 'Remove an obstacle: keep a child in school.', link: '/missions/school/' },
  { date: '2027-09-05', name: 'Teachers’ Day', type: 'Observance', about: 'Honours teachers on the birthday of Dr S. Radhakrishnan.', idea: 'Thank a teacher with a donation in their name.', link: '/gift-cards/' },
  { date: '2027-10-01', name: 'International Day of Older Persons', type: 'Observance', about: 'A United Nations day for the rights and care of older people.', idea: 'Support an elder with meals and medicines.', link: '/missions/elders/' },
  { date: '2027-10-02', name: 'Gandhi Jayanti and Daan Utsav', type: 'National day', about: 'Gandhi’s birthday also begins Daan Utsav, India’s week of giving (2–8 October).', idea: 'Join Daan Utsav: give to a verified fundraiser.', link: '/#fundraisers' },
  { date: '2027-10-04', name: 'World Animal Day', type: 'Observance', about: 'A global day for animal rights and welfare.', idea: 'Give food and treatment to street animals.', link: '/missions/animals/' },
  { date: '2027-10-09', name: 'Dasara (Vijayadashami)', type: 'Festival', about: 'Celebrates good over evil. In Vijayawada, Dasara at Kanaka Durga temple is one of the largest in the state.', idea: 'Support women’s skills and safety this Dasara.', link: '/causes/women/' },
  { date: '2027-10-29', name: 'Deepavali', type: 'Festival', about: 'The festival of lights, celebrated with lamps, sweets and new beginnings.', idea: 'Light up a home: give to a family in need.', link: '/missions/meals/' },
  { date: '2027-11-14', name: 'Children’s Day and Guru Nanak Jayanti', type: 'Observance and festival', about: 'Children’s Day marks Jawaharlal Nehru’s birthday; Guru Nanak Jayanti celebrates the first Sikh Guru, known for langar.', idea: 'Feed and care for a child today.', link: '/causes/children/' },
  { date: '2027-12-25', name: 'Christmas', type: 'Festival', about: 'Celebrates the birth of Jesus Christ with prayer, carols and sharing.', idea: 'Give a warm meal to a family this Christmas.', link: '/missions/meals/' },
]
