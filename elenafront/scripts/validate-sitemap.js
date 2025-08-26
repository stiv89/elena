const fs = require('fs')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found at', sitemapPath)
  process.exit(2)
}

const xml = fs.readFileSync(sitemapPath, 'utf8')
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' })
let parsed
try {
  parsed = parser.parse(xml)
} catch (err) {
  console.error('XML parse error:', err.message)
  process.exit(3)
}

if (!parsed || !parsed.urlset || !parsed.urlset.url) {
  console.error('Invalid sitemap structure: missing urlset/url')
  process.exit(4)
}

const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url]
let ok = true
urls.forEach((u, i) => {
  if (!u.loc) {
    console.error(`Entry ${i} missing <loc>`)
    ok = false
  }
  if (!u.lastmod) {
    console.warn(`Entry ${i} missing <lastmod>`)
  }
  // Optional: validate date format YYYY-MM-DD
  if (u.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(u.lastmod)) {
    console.warn(`Entry ${i} has non-ISO lastmod: ${u.lastmod}`)
  }
})

if (!ok) process.exit(5)
console.log('sitemap.xml is well-formed and basic checks passed (loc present for all entries).')
process.exit(0)
