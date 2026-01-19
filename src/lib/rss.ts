import { articles } from '@/data/articles';
import { Article } from '@/data/articles/types';

// RSS feed configuration
const SITE_URL = 'https://sophie-ai-finance.com';
const SITE_NAME = "SOPHIE's Daddy Quant Blog";
const SITE_DESCRIPTION = 'Advanced quantitative finance, options trading strategies, and market analysis for sophisticated investors';
const SITE_AUTHOR = "SOPHIE's Daddy Quant Blog";
const SITE_EMAIL = 'contact@sophie-ai-finance.com';

// Helper function to escape XML characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Helper function to format date for RSS (RFC 822 format)
function formatRSSDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

// Helper function to generate article URL
function getArticleUrl(article: Article): string {
  return `${SITE_URL}/articles/${article.slug}`;
}

// Helper function to get article categories from labels
function getArticleCategories(article: Article): string[] {
  const categories: string[] = [];
  
  // Add labels as categories
  if (article.labels) {
    categories.push(...article.labels);
  }
  
  // Add type-based categories
  if (article.deepResearch) categories.push('Deep Research');
  if (article.options) categories.push('Options Trading');
  if (article.isVideo) categories.push('Video Content');
  if (article.podcastUrl) categories.push('Podcast');
  if (article.premiumContent) categories.push('Premium Content');
  
  return [...new Set(categories)]; // Remove duplicates
}

// Helper function to generate SEO-optimized keywords from article
function generateSEOKeywords(article: Article): string[] {
  const keywords: string[] = [];
  
  // Base keywords
  keywords.push('quantitative finance', 'investment analysis', 'financial education');
  
  // Content-specific keywords
  if (article.options) {
    keywords.push('options trading', 'derivatives', 'volatility trading', 'options strategies');
  }
  if (article.deepResearch) {
    keywords.push('financial research', 'market analysis', 'investment research');
  }
  if (article.isVideo) {
    keywords.push('financial education video', 'trading tutorial', 'investment tutorial');
  }
  if (article.podcastUrl) {
    keywords.push('finance podcast', 'investment podcast', 'trading podcast');
  }
  
  // Label-based keywords
  if (article.labels) {
    article.labels.forEach(label => {
      switch (label) {
        case 'Quantitative Finance':
          keywords.push('quant trading', 'algorithmic trading', 'mathematical finance');
          break;
        case 'AI & Machine Learning':
          keywords.push('AI trading', 'machine learning finance', 'algorithmic strategies');
          break;
        case 'Stock Analysis':
          keywords.push('equity analysis', 'stock valuation', 'fundamental analysis');
          break;
        case 'Macro Views':
          keywords.push('macroeconomic analysis', 'market outlook', 'economic trends');
          break;
        case 'Crypto':
          keywords.push('cryptocurrency', 'bitcoin analysis', 'blockchain finance');
          break;
      }
    });
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Generate RSS item for a single article
function generateRSSItem(article: Article): string {
  const url = getArticleUrl(article);
  const categories = getArticleCategories(article);
  const keywords = generateSEOKeywords(article);
  const pubDate = formatRSSDate(article.date);
  
  // Create content description with proper formatting
  let contentDescription = escapeXml(article.description);
  
  // Add content type indicators
  const contentTypes: string[] = [];
  if (article.deepResearch) contentTypes.push('📊 Deep Research');
  if (article.isVideo) contentTypes.push('🎥 Video Tutorial');
  if (article.podcastUrl) contentTypes.push('🎧 Podcast Available');
  if (article.options) contentTypes.push('📈 Options Strategy');
  if (article.premiumContent) contentTypes.push('⭐ Premium Content');
  
  if (contentTypes.length > 0) {
    contentDescription += `\n\n${contentTypes.join(' • ')}`;
  }
  
  // Add links to additional resources
  if (article.googleDoc) {
    contentDescription += `\n\n📄 Full Research Paper: ${article.googleDoc}`;
  }
  if (article.youtubeUrl) {
    contentDescription += `\n\n🎥 Watch Video: ${article.youtubeUrl}`;
  }
  if (article.podcastUrl) {
    contentDescription += `\n\n🎧 Listen to Podcast: ${article.podcastUrl}`;
  }

  // Add SEO-friendly content with keywords
  contentDescription += `\n\nTopics: ${keywords.slice(0, 5).join(', ')}`;
  
  return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${contentDescription}]]></description>
      <content:encoded><![CDATA[
        <p>${escapeXml(article.description)}</p>
        ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${escapeXml(article.title)}" style="max-width: 100%; height: auto;" />` : ''}
        ${contentTypes.length > 0 ? `<p><strong>Content Features:</strong> ${contentTypes.join(' • ')}</p>` : ''}
        ${article.googleDoc ? `<p><a href="${article.googleDoc}" target="_blank">📄 Read Full Research Paper</a></p>` : ''}
        ${article.youtubeUrl ? `<p><a href="${article.youtubeUrl}" target="_blank">🎥 Watch Video Tutorial</a></p>` : ''}
        ${article.podcastUrl ? `<p><a href="${article.podcastUrl}" target="_blank">🎧 Listen to Podcast</a></p>` : ''}
        <p><strong>Topics:</strong> ${keywords.slice(0, 8).join(', ')}</p>
        <p><a href="${url}">Read full article on SOPHIE's Daddy Quant Blog</a></p>
      ]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${SITE_EMAIL} (${SITE_AUTHOR})</author>
      <dc:creator>${SITE_AUTHOR}</dc:creator>
      ${article.imageUrl ? `<enclosure url="${article.imageUrl}" type="image/jpeg" />` : ''}
      <media:content url="${article.imageUrl || `${SITE_URL}/apple-icon.png`}" type="image/jpeg" medium="image">
        <media:title>${escapeXml(article.title)}</media:title>
        <media:description>${escapeXml(article.description)}</media:description>
      </media:content>
      ${categories.map(cat => `<category domain="${SITE_URL}/category/${cat.toLowerCase().replace(/\s+/g, '-')}">${escapeXml(cat)}</category>`).join('\n      ')}
      ${keywords.slice(0, 10).map(keyword => `<dc:subject>${escapeXml(keyword)}</dc:subject>`).join('\n      ')}
      <source url="${SITE_URL}/rss.xml">${SITE_NAME}</source>
      <comments>${url}#comments</comments>
      <wfw:commentRss>${url}/feed</wfw:commentRss>
    </item>`;
}

// Generate complete RSS feed
export function generateRSSFeed(): string {
  const buildDate = new Date().toUTCString();
  const latestArticleDate = articles.length > 0 ? formatRSSDate(articles[0].date) : buildDate;
  
  // Sort articles by date (newest first) and take the most recent 50
  const sortedArticles = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50);
  
  const rssItems = sortedArticles.map(generateRSSItem).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:georss="http://www.georss.org/georss"
     xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <copyright>© 2026 ${SITE_NAME}. All rights reserved.</copyright>
    <managingEditor>${SITE_EMAIL} (${SITE_AUTHOR})</managingEditor>
    <webMaster>${SITE_EMAIL} (${SITE_AUTHOR})</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${latestArticleDate}</pubDate>
    <generator>SOPHIE's Daddy Quant Blog RSS Generator</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
    <rating>(PICS-1.1 "http://www.rsac.org/ratingsv01.html" l gen true for "${SITE_URL}" r (n 0 s 0 v 0 l 0))</rating>
    <image>
      <url>${SITE_URL}/apple-icon.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
      <description>Logo for ${escapeXml(SITE_NAME)}</description>
    </image>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <atom:link href="${SITE_URL}" rel="alternate" type="text/html" />
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <category domain="${SITE_URL}/category/finance">Finance</category>
    <category domain="${SITE_URL}/category/quantitative-analysis">Quantitative Analysis</category>
    <category domain="${SITE_URL}/category/options-trading">Options Trading</category>
    <category domain="${SITE_URL}/category/investment-strategy">Investment Strategy</category>
    <category domain="${SITE_URL}/category/market-analysis">Market Analysis</category>
    <category domain="${SITE_URL}/category/ai-ml">AI & Machine Learning</category>
    <category domain="${SITE_URL}/category/cryptocurrency">Cryptocurrency</category>
    <textInput>
      <title>Search ${SITE_NAME}</title>
      <description>Search articles on ${SITE_NAME}</description>
      <name>q</name>
      <link>${SITE_URL}/search</link>
    </textInput>
    ${rssItems}
  </channel>
</rss>`.trim();
}

// Generate RSS feed for specific categories/labels
export function generateCategoryRSSFeed(categoryFilter: string): string {
  const filteredArticles = articles.filter(article => {
    const categories = getArticleCategories(article);
    return categories.some(cat => cat.toLowerCase().includes(categoryFilter.toLowerCase()));
  });
  
  const buildDate = new Date().toUTCString();
  const latestArticleDate = filteredArticles.length > 0 ? formatRSSDate(filteredArticles[0].date) : buildDate;
  
  const sortedArticles = [...filteredArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 25);
  
  const rssItems = sortedArticles.map(generateRSSItem).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>${escapeXml(SITE_NAME)} - ${escapeXml(categoryFilter)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)} - ${escapeXml(categoryFilter)} articles</description>
    <language>en-US</language>
    <managingEditor>${SITE_EMAIL} (${SITE_AUTHOR})</managingEditor>
    <webMaster>${SITE_EMAIL} (${SITE_AUTHOR})</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${latestArticleDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/apple-icon.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
    <atom:link href="${SITE_URL}/rss/${categoryFilter.toLowerCase().replace(/\s+/g, '-')}.xml" rel="self" type="application/rss+xml" />
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <category>${escapeXml(categoryFilter)}</category>
    ${rssItems}
  </channel>
</rss>`.trim();
}