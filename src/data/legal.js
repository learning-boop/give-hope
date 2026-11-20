// Privacy, Terms and Refund policies. These are DRAFTS written as a starting point for an Indian charity
// platform. Have a lawyer review them and fill every [placeholder] before launch, then set draft: false.
import { SITE } from '../site'

const org = `[Legal entity name, e.g. ${SITE.organisation.name}]`
const contactLine = `Email ${SITE.contact.email} or write to ${org}, ${SITE.contact.address}.`

export const LEGAL = {
  privacy: {
    path: '/privacy-policy/',
    title: 'Privacy policy',
    description: 'How Give Hope collects, uses and protects your personal data.',
    updated: '[Date]',
    draft: true,
    intro: `This policy explains how ${org} ("we"), which runs Give Hope, collects and uses personal data when you visit the site, donate, or start a fundraiser. We follow the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.`,
    sections: [
      {
        heading: 'What we collect',
        items: [
          'Details you give us: your name, phone number, email address and, for donations, your PAN and address so we can issue 80G receipts.',
          'Fundraiser details: the story, documents, photos and bank details that organisers upload for verification.',
          `Payment details are collected by our payment partner, ${SITE.paymentGateway}. We do not see or store your full card or bank details.`,
          'Basic technical data, such as your browser and the pages you visit, to keep the site working and secure.',
        ],
      },
      {
        heading: 'How we use it',
        items: [
          'To process donations and send receipts and updates on the fundraisers you support.',
          'To verify fundraisers, including in-person visits, and to transfer funds to the hospital, NGO or beneficiary.',
          'To reply to you, and to meet our legal and tax reporting duties.',
          'We do not sell your personal data.',
        ],
      },
      {
        heading: 'Who we share it with',
        items: [
          'Our payment partner, to complete payments.',
          'Our form service, which passes the answers from forms on this site to our team.',
          'The organiser of a fundraiser you donate to, only if you agree to share your name.',
          'Government authorities, when the law requires it, for example for 80G reporting to the Income Tax Department.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: ['We keep donation and receipt records for as long as tax law requires, currently [X] years, and other personal data only as long as we need it for the purposes above.'],
      },
      {
        heading: 'Your rights',
        paragraphs: [`You can ask to see, correct or delete your personal data, or withdraw your consent, at any time. ${contactLine}`],
      },
      {
        heading: 'Grievance officer',
        paragraphs: [`[Name], Grievance Officer, ${SITE.contact.email}. We reply within [X] days.`],
      },
    ],
  },

  terms: {
    path: '/terms/',
    title: 'Terms of use',
    description: 'The rules for donating, raising funds and using the Give Hope website.',
    updated: '[Date]',
    draft: true,
    intro: `These terms apply when you use Give Hope, run by ${org}. By using the site, donating or starting a fundraiser, you agree to them.`,
    sections: [
      {
        heading: 'What Give Hope does',
        paragraphs: [
          'Give Hope lets people donate to fundraisers and lets individuals and organisations raise funds. We check each fundraiser in person before it goes live, but we cannot guarantee how every rupee is finally used by an organiser.',
        ],
      },
      {
        id: 'organisers',
        heading: 'Rules for organisers',
        items: [
          'Everything you tell us and donors must be true, and you must have the beneficiary’s consent.',
          'You must upload the documents we ask for and allow our team to visit and verify the fundraiser.',
          'Funds are released in stages to the hospital, NGO or beneficiary account against bills.',
          'You must post updates with bills, receipts and photos as the money is used.',
          'We may pause or remove a fundraiser and hold its funds if we find false information or misuse.',
        ],
      },
      {
        heading: 'Rules for donors',
        items: [
          'Donations are voluntary gifts. 80G tax benefits apply only to fundraisers marked 80G.',
          'You must give correct details, including your PAN if you want an 80G receipt.',
          'See our refund policy for when a donation can be returned.',
        ],
      },
      {
        heading: 'Fees',
        paragraphs: ['Our platform and payment fees are shown on the Crowdfunding page and before any withdrawal.'],
      },
      {
        heading: 'Things you must not do',
        items: ['Use the site for fraud, money laundering or anything illegal.', 'Upload content that is false, hateful or belongs to someone else.', 'Try to break or misuse the site.'],
      },
      {
        heading: 'Liability and law',
        paragraphs: [
          'We are not liable for losses caused by an organiser’s false statements, beyond what the law requires. These terms are governed by the laws of India, and the courts of [City] have jurisdiction.',
          `Questions? ${contactLine}`,
        ],
      },
    ],
  },

  refund: {
    path: '/refund-policy/',
    title: 'Refund and cancellation policy',
    description: 'When a donation to Give Hope can be refunded or a monthly gift cancelled.',
    updated: '[Date]',
    draft: true,
    intro: 'Donations are gifts to a cause, so they are usually not refundable. We will refund a donation in the cases below.',
    sections: [
      {
        heading: 'When we refund',
        items: [
          'You were charged more than once, or the wrong amount, because of a technical error.',
          'The payment failed but money left your account. These are usually reversed by the bank or payment partner within [X] working days.',
          'A fundraiser is removed for false information before its funds are released.',
        ],
      },
      {
        heading: 'How to ask for a refund',
        paragraphs: [
          `Write to ${SITE.contact.email} within [X] days of the donation with your name, the amount, the date and the payment reference. We reply within [X] working days, and approved refunds go back to the original payment method.`,
          'If an 80G receipt was issued for a refunded donation, it will be cancelled.',
        ],
      },
      {
        heading: 'Cancelling a monthly gift',
        paragraphs: ['You can pause or cancel a monthly gift at any time from your account, or by writing to us. Cancelling stops future payments; past payments are not refunded.'],
      },
    ],
  },
}
