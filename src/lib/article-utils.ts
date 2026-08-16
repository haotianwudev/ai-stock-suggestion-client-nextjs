import { articles } from '@/data/articles';
import { Article } from '@/data/articles/types';
import { BaseConfig, ResolvedStudyGuideItem, StudyGuideItem } from '@/components/shared/config-types';
import { SITE_URL } from '@/lib/site';

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
export function getArticleUrl(article: Article, baseUrl: string = SITE_URL): string {
  // For video articles, link directly to YouTube
  if (article.isVideo && article.youtubeUrl) {
    return article.youtubeUrl;
  }
  // For regular articles, link to the article page
  return `${baseUrl}/articles/${article.slug}`;
}

// Look up a single article by slug — shared by the study-guide/topic-media resolvers below
// and anywhere else that needs one article instead of a filtered list.
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

// Resolves a topic's studyGuide item against the article registry: when `articleSlug` is set,
// url/videoUrl/visualGuideUrl are derived from that article instead of being hand-duplicated in
// the topic config. Explicit fields on the item still win. Returns null (and warns in dev) for a
// stale articleSlug so callers can filter it out rather than rendering a broken link.
export function resolveStudyGuideItem(item: StudyGuideItem): ResolvedStudyGuideItem | null {
  if (item.articleSlug) {
    const article = getArticleBySlug(item.articleSlug);
    if (!article) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`resolveStudyGuideItem: no article found for articleSlug "${item.articleSlug}"`);
      }
      return null;
    }
    return {
      text: item.text ?? article.title,
      // Always the article page itself (not getArticleUrl's youtube-redirect-for-video-articles
      // behavior) — matches the convention every existing studyGuide item already used.
      url: item.url ?? `https://www.sophie-ai-finance.com/articles/${article.slug}`,
      videoUrl: item.videoUrl ?? article.youtubeUrl,
      visualGuideUrl: item.visualGuideUrl ?? article.infographicUrl,
    };
  }

  if (!item.url) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`resolveStudyGuideItem: item "${item.text}" has neither articleSlug nor url`);
    }
    return null;
  }

  return {
    text: item.text ?? '',
    url: item.url,
    videoUrl: item.videoUrl,
    visualGuideUrl: item.visualGuideUrl,
  };
}

export function resolveStudyGuideItems(items: StudyGuideItem[]): ResolvedStudyGuideItem[] {
  return items
    .map(resolveStudyGuideItem)
    .filter((item): item is ResolvedStudyGuideItem => item !== null);
}

// Resolves a topic's hero video/infographic: when `primaryArticleSlug` is set, the fields fall
// back to that article's youtubeUrl/infographicUrl instead of being hand-duplicated in the config.
export function resolveTopicMedia(config: BaseConfig): { videoUrl?: string; infographicUrl?: string } {
  if (!config.primaryArticleSlug) {
    return { videoUrl: config.videoUrl, infographicUrl: config.infographicUrl };
  }
  const article = getArticleBySlug(config.primaryArticleSlug);
  return {
    videoUrl: config.videoUrl ?? article?.youtubeUrl,
    infographicUrl: config.infographicUrl ?? article?.infographicUrl,
  };
}

// A topic's "Related Articles" list, derived rather than hand-maintained: every article slug
// worth showing already appears as primaryArticleSlug or a studyGuide item's articleSlug, so a
// separate relatedArticles array in the config would just be a third copy of the same list.
// Order: primaryArticleSlug first (if any), then studyGuide items in their curated order,
// deduped, dropping any articleSlug that doesn't resolve to a real article.
export function resolveRelatedArticleSlugs(config: BaseConfig): string[] {
  const slugs: string[] = [];
  if (config.primaryArticleSlug) slugs.push(config.primaryArticleSlug);
  for (const item of config.studyGuide?.items ?? []) {
    if (item.articleSlug) slugs.push(item.articleSlug);
  }
  return [...new Set(slugs)].filter((slug) => getArticleBySlug(slug) !== undefined);
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
        case 'Gen AI':
          keywords.push('Gen AI', 'generative AI', 'LLM', 'AI agents', 'RAG');
          break;
        case 'Machine Learning':
          keywords.push('machine learning', 'deep learning', 'statistical learning', 'financial ML');
          break;
        case 'Stock Analysis':
          keywords.push('equity analysis', 'stock valuation', 'fundamental analysis');
          break;
        case 'Macro Views':
          keywords.push('macroeconomic analysis', 'market outlook', 'economic trends');
          break;
      }
    });
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}