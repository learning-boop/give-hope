# GiveHope — donation & crowdfunding website

React 19 + Vite 8 + React Router 6, prerendered to static HTML with **vite-react-ssg**.
Every page — including each fundraiser — is built as its own HTML file with its own title, description and
share preview, so links shared on WhatsApp/Facebook show a proper card and Google can index every page.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173 (client-side dev server)
npm run build     # prerenders every route into dist/
npm run preview   # serve dist/ locally — open /crowdfunding/ (with the trailing slash)
```

Node 20.19+ or 22.12+ is required (Vite 8).

## Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/pages/Home.jsx` | Hero with quick-donate card, cause filter, monthly giving, impact, FAQ |
| `/crowdfunding/` | `src/pages/Crowdfunding.jsx` | Start-a-fundraiser form, types, steps, tools, fees, documents, FAQ |
| `/fundraiser/:slug/` | `src/pages/Fundraiser.jsx` | One prerendered page per fundraiser in `src/data/campaigns.js` |
| `/monthly/` | `src/pages/Monthly.jsx` | Programme and amount picker, steps and benefits. Programmes are in `src/data/monthly.js` |
| `/about/` | `src/pages/About.jsx` | Story, vision, mission, principles and recognition |
| `/documents/` | `src/pages/Documents.jsx` | Registrations and reports. Put PDFs in `public/documents/` and set `file` |
| `/404` | `src/pages/NotFound.jsx` | Copied to `dist/404.html` by `scripts/postbuild.js` |

## Where to edit

- **`src/site.js`** — domain (`SITE.url`), contact details, registration numbers (12A / 80G / CSR-1),
  payment gateway name and the announcement bar. Change `SITE.url` to your live domain before building.
- **`src/data/campaigns.js`** — fundraisers. Set `raised`, `goal`, `donors`, `daysLeft` to numbers and the UI
  formats them (₹1,00,000) and calculates progress automatically. `null` shows a `[placeholder]`.
- **`src/data/faqs.js`** — donor and crowdfunding FAQs.
- **`src/styles/tokens.css`** — colours, radii, fonts. Palette: coral `#F04951`, charcoal `#1D1D1B`,
  lime `#A9C74E`, amber `#FFAC00`. Fonts: Roboto Slab for headings, Open Sans for text, Caveat for the footer line.
- **`public/og-image.png`** — default 1200×630 share image.
- **`src/data/photos.js`** and **`public/images/`** — photos (800px and 1600px WebP, plus a 1200×630 JPEG in `og/` for
  share previews). `src/lib/usePageEffects.js` and `src/styles/effects.css` hold the motion effects.

Everything in `[square brackets]` is a placeholder — fill it with real, verifiable details before launch
(impact figures, fees, registration numbers, testimonials with permission, photos with consent).

The current photos are free Unsplash stock images, used to show the kind of work each cause funds. They are not the
people or animals a fundraiser helps, so fundraisers show an "Illustrative photo" label and the footer says so. When a
fundraiser gets its own consented photo, add it to `photos.js`, point `photo` at it in `campaigns.js` and remove
`photoIllustrative`. Unsplash's licence does not cover model releases, so get consent or check for releases before using
identifiable people in marketing.

## Accessibility notes

- Lime is only used as text on dark backgrounds (it fails contrast on white).
- Small coral text uses `--coral-ink` (`#D1323B`); white-on-coral button labels are kept at 19px bold.
- Real `<button>`/`<a>`/`<label>` elements, `aria-pressed` on filters and amounts, `aria-expanded` on the FAQ
  and mobile menu, a skip link, and visible focus outlines.

## Wiring up the backend (next steps)

1. **Payments** — `QuickDonateCard` takes an `onDonate(amount)` prop; open Razorpay Checkout there
   (see the TODO in `src/pages/Fundraiser.jsx`). Create the order on your server, never in the browser.
2. **Fundraiser leads** — `StartFundraiserForm` takes `onSubmit(data)`; POST it to your API
   (TODO in `src/pages/Crowdfunding.jsx`).
3. **Live campaign data** — replace the array in `src/data/campaigns.js` with a fetch from your API at build time
   (use a route `loader`, see the vite-react-ssg docs) and rebuild when campaigns change, or fetch progress
   numbers on the client after load.
4. **Monthly checkout** — `MonthlyForm` takes `onSubmit({ cause, amount })`; start the recurring payment there
   (TODO in `src/pages/Monthly.jsx`). Until then the form says that no payment was taken.
5. **Pages still to build** — login, blog, contact, privacy/terms/refund policies (footer links currently point to `#`).

## Deploying

`dist/` is plain static files. Use **trailing-slash URLs** (`/crowdfunding/`) — every page is a folder with an
`index.html`, which works the same on every host.

- **cPanel / Apache** — upload the contents of `dist/` to `public_html/`. The included `.htaccess` forces HTTPS,
  serves a real 404 status via `/404.html`, and sets caching.
- **Netlify / Cloudflare Pages** — build command `npm run build`, publish directory `dist`.
- **Vercel** — framework "Other", output `dist`, and set `"trailingSlash": true` in `vercel.json`.

`npm run build` also writes `dist/sitemap.xml` and `dist/robots.txt` using `SITE.url`.
