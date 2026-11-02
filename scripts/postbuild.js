// Runs after `vite-react-ssg build`:
//  1. copies dist/404/index.html → dist/404.html (what most static hosts serve for missing pages)
//  2. writes sitemap.xml and robots.txt from the prerendered pages, using SITE.url from src/site.js
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE } from '../src/site.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

async function findPages(dir, base = '') {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = path.posix.join(base, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue
      out.push(...(await findPages(path.join(dir, entry.name), rel)))
    } else if (entry.name === 'index.html') {
      out.push('/' + base)
    }
  }
  return out
}

const notFound = path.join(dist, '404', 'index.html')
try {
  await fs.copyFile(notFound, path.join(dist, '404.html'))
} catch {
  console.warn('postbuild: no 404 page found to copy')
}

const pages = (await findPages(dist))
  .map((p) => p.replace(/\/$/, '') || '/')
  .filter((p) => p !== '/404')
  .sort()

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`
await fs.writeFile(path.join(dist, 'robots.txt'), robots)

console.log(`postbuild: sitemap.xml with ${pages.length} pages, robots.txt, 404.html`)
