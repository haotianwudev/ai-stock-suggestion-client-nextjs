/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sophie-ai-finance.com', // Replace with your actual domain
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://sophie-ai-finance.com/sitemap.xml',
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
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/stock/')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/option')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
}; 