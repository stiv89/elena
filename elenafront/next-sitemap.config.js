/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.elenabenitez.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 45000,
  exclude: ['/admin', '/api/*'],
}
