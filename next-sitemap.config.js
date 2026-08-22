/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.sophie-ai-finance.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.sophie-ai-finance.com/sitemap.xml',
      'https://www.sophie-ai-finance.com/rss.xml',
      'https://www.sophie-ai-finance.com/feed.xml',
    ],
  },
  // '/option' and '/option/viewer/chain' both 308 elsewhere. Submitting a redirecting URL makes
  // Google report it as "Page with redirect" and refuse to index it, so list the destinations
  // instead (see additionalPaths below).
  exclude: ['/api/*', '/option', '/option/viewer/chain'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = 0.7;
    let changefreq = 'daily';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/articles/')) {
      // Articles get different priorities based on type
      // This will be handled by the Next.js build process
      // which only generates pages for published articles
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/stock/')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/option')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/rss' || path.startsWith('/rss/')) {
      priority = 0.6;
      changefreq = 'daily';
    } else if (path === '/seo-audit') {
      priority = 0.5;
      changefreq = 'weekly';
    } else if (path === '/about') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  // Routes served by dynamic segments ('/option/[tab]', '/option/strategies/[[...slug]]') are
  // not enumerated by next-sitemap's static scan, so the viewer -- the destination /option now
  // redirects to -- was missing from the sitemap entirely while the redirect itself was listed.
  // These are the real landing pages and are added explicitly.
  additionalPaths: async (config) => [
    await config.transform(config, '/option/viewer'),
    await config.transform(config, '/option/strategies'),
  ],
}; 