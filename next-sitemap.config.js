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
  exclude: ['/api/*'],
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
}; 