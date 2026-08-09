/**
 * Canonical origin for the site.
 *
 * Must match the host that actually serves the app (non-www 301-redirects to
 * www) and the Application home page registered on the Google OAuth consent
 * screen. Canonical tags, og:url, structured data and the sitemap all have to
 * agree on this host — a mismatch points canonical URLs at a redirect and
 * breaks Google Search Console domain matching.
 */
export const SITE_URL = 'https://www.sophie-ai-finance.com';
