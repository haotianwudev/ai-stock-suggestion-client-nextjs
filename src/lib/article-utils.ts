import { articles } from '@/data/articles';
import { Article } from '@/data/articles/types';

/**
 * Shared utility functions for article filtering and processing
 * Used by RSS feeds, SEO audit, sitemap generation, and other systems
 */

// Helper function to check if article is published (not in future)
export function isArticlePublished(article: Article): boolean {
  const articleDate = new Date(article.date);
  const now = new Date();
  return articleDate <= now;
}

// Helper function to filter published articles only
export function getPublishedArticles(articles: Article[]): Article[] {
  return articles.filter(isArticlePublished);
}

// Get all published articles (main export for other modules)
export function getAllPublishedArticles(): Article[] {
  return getPublishedArticles(articles);
}

// Get published articles sorted by date (newest first)
export function getPublishedArticlesSorted(): Article[] {
  return getPublishedArticles(articles)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get published articles for a specific category/label
export function getPublishedArticlesByCategory(categoryFilter: string): Article[] {
  const publishedArticles = getPublishedArticles(articles);
  
  return publishedArticles.filter(article => {
    // Check labels
    if (article.labels) {
      const hasMatchingLabel = article.labels.some(label => 
        label.toLowerCase().includes(categoryFilter.toLowerCase())
      );
      if (hasMatchingLabel) return true;
    }
    
    // Check content type flags
    const contentTypes: string[] = [];
    if (article.deepResearch) contentTypes.push('Deep Research');
    if (article.options) contentTypes.push('Options Trading');
    if (article.isVideo) contentTypes.push('Video Content');
    if (article.podcastUrl) contentTypes.push('Podcast');
    if (article.premiumContent) contentTypes.push('Premium Content');
    
    return contentTypes.some(cat => 
      cat.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  });
}

// Get article statistics for published articles only
export function getPublishedArticleStats() {
  const publishedArticles = getPublishedArticles(articles);
  
  return {
    total: publishedArticles.length,
    withImages: publishedArticles.filter(a => a.imageUrl).length,
    deepResearch: publishedArticles.filter(a => a.deepResearch).length,
    videos: publishedArticles.filter(a => a.isVideo).length,
    podcasts: publishedArticles.filter(a => a.podcastUrl).length,
    options: publishedArticles.filter(a => a.options).length,
    premium: publishedArticles.filter(a => a.premiumContent).length,
    recent30Days: publishedArticles.filter(a => {
      const articleDate = new Date(a.date);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return articleDate >= thirtyDaysAgo;
    }).length,
    recent7Days: publishedArticles.filter(a => {
      const articleDate = new Date(a.date);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return articleDate >= sevenDaysAgo;
    }).length,
  };
}

// Generate article URL (used by RSS, sitemap, etc.)
export function getArticleUrl(article: Article, baseUrl: string = 'https://sophie-ai-finance.com'): string {
  // For video articles, link directly to YouTube
  if (article.isVideo && article.youtubeUrl) {
    return article.youtubeUrl;
  }
  // For regular articles, link to the article page
  return `${baseUrl}/articles/${article.slug}`;
}

// Get article categories (used by RSS, SEO, etc.)
export function getArticleCategories(article: Article): string[] {
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

// Generate SEO-optimized keywords from article
export function generateSEOKeywords(article: Article): string[] {
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