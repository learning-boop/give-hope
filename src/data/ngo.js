// NGO registration: shared by the Register your NGO page and the Crowdfunding page.

export const NGO_TYPES = ['Trust', 'Society', 'Section 8 company', 'Other']

// Certificates the NGO can tick that it already holds
export const NGO_CERTIFICATES = ['12A', '80G', 'CSR-1', 'FCRA', 'NGO Darpan ID']

export const NGO_CAUSES = [
  'Medical',
  'Children',
  'Education',
  'Elderly',
  'Animals',
  'Disaster relief',
  'Hunger',
  'Women',
  'Disability',
  'Community',
  'Environment',
  'Other',
]

export const DOCS_NGO = [
  'Registration certificate (Trust, Society or Section 8)',
  '12A and 80G certificates',
  'PAN of the organisation',
  'Bank account details and a cancelled cheque',
]

export const NGO_STEPS = [
  { icon: 'fileText', title: 'Send your details', text: 'Fill in the form with your organisation, certificates and the work you want to raise funds for.' },
  { icon: 'headset', title: 'We call you', text: 'Our team calls the contact person and tells you where to send copies of your documents.' },
  { icon: 'shieldCheck', title: 'We verify', text: 'We check your registration, 12A, 80G and bank details, and visit your work in person.' },
  { icon: 'chart', title: 'Start raising', text: 'Once verified, we help you set up your first fundraiser and share it with donors.' },
]
