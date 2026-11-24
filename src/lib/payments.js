import { sendForm } from './forms'
import { inr } from '../site'

/**
 * Starts a donation.
 *
 * Online payments are not connected yet, so for now the donation is sent to the team as a pledge
 * (WhatsApp, email or the form service, see lib/forms.js) and the team shares a secure payment link.
 * When a payment gateway (e.g. Razorpay) is added, create the order on the server and open checkout here
 * instead. Every page that takes a donation calls this one function, so nothing else needs to change.
 *
 * Resolves 'sent', 'whatsapp' or 'email' (how the pledge went out), or rejects if it could not go.
 */
export async function startDonation(d) {
  const total = d.amount + d.tip
  return sendForm(`Donation pledge: ${inr(total)} for ${d.title}`, {
    'Giving to': `${d.title} (${d.kind})`,
    Link: d.url,
    Frequency: d.monthly ? 'Every month' : 'One time',
    Amount: inr(d.amount),
    'Tip to GiveHope': d.tip ? inr(d.tip) : 'None',
    Total: inr(total),
    'Gift card': d.giftCard || 'None',
    Name: d.name,
    Email: d.email,
    Phone: d.phone,
    '80G receipt': d.wants80g ? `Yes. PAN ${d.pan}, ${d.address}, ${d.city}, ${d.state} ${d.pincode}` : 'No',
    'Show name publicly': d.anonymous ? 'No, give anonymously' : 'Yes',
    Message: d.message || 'None',
    'Indian citizen': 'Confirmed',
  })
}
