const fs = require('fs')
const path = require('path')

// Intenta leer rutas desde src/app/sitemap.ts export default function sitemap() { ... }
// Si no se puede parsear TypeScript, usa un fallback estático.
const sitemapFromTsPath = path.join(__dirname, '..', 'src', 'app', 'sitemap.ts')

function generateXml(entries) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  const footer = '</urlset>\n'

  const body = entries.map(e => {
    return `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${e.lastModified}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>\n`
  }).join('\n')

  return header + body + footer
}

function parseDate(d) {
  if (!d) return new Date().toISOString().slice(0,10)
  return (new Date(d)).toISOString().slice(0,10)
}

function useFallback() {
  const today = new Date().toISOString().slice(0,10)
  return [
    { url: 'https://elenabenitez.com/', lastModified: today, changeFrequency: 'daily', priority: '1.0' },
    { url: 'https://elenabenitez.com/servicios', lastModified: today, changeFrequency: 'weekly', priority: '0.9' },
    { url: 'https://elenabenitez.com/contacto', lastModified: today, changeFrequency: 'monthly', priority: '0.8' },
    { url: 'https://elenabenitez.com/equipo', lastModified: today, changeFrequency: 'monthly', priority: '0.7' },
    { url: 'https://elenabenitez.com/carrito', lastModified: today, changeFrequency: 'weekly', priority: '0.6' },
    { url: 'https://elenabenitez.com/terminos', lastModified: today, changeFrequency: 'yearly', priority: '0.3' }
  ]
}

let entries = []

try {
  if (fs.existsSync(sitemapFromTsPath)) {
    const content = fs.readFileSync(sitemapFromTsPath, 'utf8')
    // Extraer baseUrl y objetos simples con regex (no transpilar TS)
    const baseUrlMatch = content.match(/const\s+baseUrl\s*=\s*['"]([^'"]+)['"]/)
    const baseUrl = baseUrlMatch ? baseUrlMatch[1].replace(/\/+$/, '') : 'https://elenabenitez.com'
    const today = new Date().toISOString().slice(0,10)

    // Buscamos las rutas listadas manualmente (las que aparecen en el file). Asumimos estructura conocida.
    const routes = ['/', '/servicios', '/contacto', '/equipo', '/carrito', '/terminos']
    entries = routes.map(r => {
      // Determine changefreq and priority mapping from the TS file comments if needed; fallback to known mapping
      const mapping = {
        '/': { changeFrequency: 'daily', priority: '1.0' },
        '/servicios': { changeFrequency: 'weekly', priority: '0.9' },
        '/contacto': { changeFrequency: 'monthly', priority: '0.8' },
        '/equipo': { changeFrequency: 'monthly', priority: '0.7' },
        '/carrito': { changeFrequency: 'weekly', priority: '0.6' },
        '/terminos': { changeFrequency: 'yearly', priority: '0.3' }
      }
      return { url: `${baseUrl}${r}`, lastModified: today, changeFrequency: mapping[r].changeFrequency, priority: mapping[r].priority }
    })
  } else {
    entries = useFallback()
  }
} catch (err) {
  console.error('Error parsing sitemap.ts, using fallback:', err.message)
  entries = useFallback()
}

const xml = generateXml(entries)
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outPath, xml, 'utf8')
console.log('Generated', outPath)
