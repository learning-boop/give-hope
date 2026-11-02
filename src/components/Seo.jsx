import { Head } from 'vite-react-ssg'
import { SITE } from '../site'

/**
 * Per-page <head> tags. Pages are prerendered at build time, so these tags are in the
 * HTML that Google, WhatsApp, Facebook and LinkedIn read — every page gets its own preview.
 */
export default function Seo({ title, description = SITE.description, path = '/', image = SITE.ogImage, noindex = false, jsonLd }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
  const url = SITE.url + path
  const imageUrl = image.startsWith('http') ? image : SITE.url + image

  const tags = [
    <title key="title">{fullTitle}</title>,
    <meta key="description" name="description" content={description} />,
    <link key="canonical" rel="canonical" href={url} />,
    <meta key="og:type" property="og:type" content="website" />,
    <meta key="og:site_name" property="og:site_name" content={SITE.name} />,
    <meta key="og:locale" property="og:locale" content="en_IN" />,
    <meta key="og:title" property="og:title" content={fullTitle} />,
    <meta key="og:description" property="og:description" content={description} />,
    <meta key="og:url" property="og:url" content={url} />,
    <meta key="og:image" property="og:image" content={imageUrl} />,
    <meta key="og:image:width" property="og:image:width" content="1200" />,
    <meta key="og:image:height" property="og:image:height" content="630" />,
    <meta key="tw:card" name="twitter:card" content="summary_large_image" />,
    <meta key="tw:title" name="twitter:title" content={fullTitle} />,
    <meta key="tw:description" name="twitter:description" content={description} />,
    <meta key="tw:image" name="twitter:image" content={imageUrl} />,
  ]
  if (noindex) tags.push(<meta key="robots" name="robots" content="noindex" />)
  if (jsonLd) tags.push(<script key="ld" type="application/ld+json">{JSON.stringify(jsonLd)}</script>)

  return <Head>{tags}</Head>
}
