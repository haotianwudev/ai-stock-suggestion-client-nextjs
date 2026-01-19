import { articles } from '@/data/articles';
import { Article } from '@/data/articles/types';

export interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
  strengths: string[];
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'content' | 'technical' | 'metadata' | 'structure';
  message: string;
  articleSlug?: string;
  priority: 'high' | 'medium' | 'low';
}

// Audit individual article SEO
export function auditArticleSEO(article: Article): SEOAuditResult {
  const issues: SEOIssue[] = [];
  const recommendations: string[] = [];
  const strengths: string[] = [];
  let score = 100;

  // Title optimization
  if (article.title.length < 30) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `Title too short (${article.title.length} chars). Optimal: 50-60 characters`,
      articleSlug: article.slug,
      priority: 'medium'
    });
    score -= 5;
  } else if (article.title.length > 60) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `Title too long (${article.title.length} chars). May be truncated in search results`,
      articleSlug: article.slug,
      priority: 'medium'
    });
    score -= 3;
  } else {
    strengths.push('Title length is optimal for search results');
  }

  // Description optimization
  if (article.description.length < 120) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `Description too short (${article.description.length} chars). Optimal: 150-160 characters`,
      articleSlug: article.slug,
      priority: 'medium'
    });
    score -= 5;
  } else if (article.description.length > 160) {
    issues.push({
      type: 'info',
      category: 'content',
      message: `Description long (${article.description.length} chars). May be truncated in search results`,
      articleSlug: article.slug,
      priority: 'low'
    });
    score -= 2;
  } else {
    strengths.push('Meta description length is optimal');
  }

  // Image optimization
  if (!article.imageUrl) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: 'Missing featured image. Images improve click-through rates',
      articleSlug: article.slug,
      priority: 'medium'
    });
    score -= 8;
  } else {
    strengths.push('Has featured image for social sharing');
  }

  // Content type indicators
  if (article.deepResearch) {
    strengths.push('Deep research content - high value for SEO');
  }
  if (article.isVideo) {
    strengths.push('Video content - good for engagement metrics');
  }
  if (article.podcastUrl) {
    strengths.push('Multi-format content (podcast) - increases dwell time');
  }

  // Slug optimization
  if (article.slug && article.slug.length > 60) {
    issues.push({
      type: 'info',
      category: 'technical',
      message: 'URL slug is quite long. Shorter URLs are preferred',
      articleSlug: article.slug,
      priority: 'low'
    });
    score -= 2;
  }

  // Content freshness
  const articleDate = new Date(article.date);
  const daysSincePublished = Math.floor((Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSincePublished < 7) {
    strengths.push('Fresh content - recently published');
  } else if (daysSincePublished > 365) {
    recommendations.push('Consider updating older content to maintain relevance');
  }

  // Generate recommendations
  if (issues.length === 0) {
    recommendations.push('Article SEO is well optimized!');
  } else {
    if (issues.some(i => i.category === 'content')) {
      recommendations.push('Focus on optimizing title and description lengths');
    }
    if (!article.imageUrl) {
      recommendations.push('Add a high-quality featured image');
    }
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    strengths
  };
}

// Audit entire site SEO
export function auditSiteSEO(): SEOAuditResult {
  const issues: SEOIssue[] = [];
  const recommendations: string[] = [];
  const strengths: string[] = [];
  let totalScore = 0;
  let articleCount = 0;

  // Audit each article
  articles.forEach(article => {
    const articleAudit = auditArticleSEO(article);
    totalScore += articleAudit.score;
    articleCount++;
    issues.push(...articleAudit.issues);
  });

  const averageScore = articleCount > 0 ? totalScore / articleCount : 0;

  // Site-wide analysis
  const totalArticles = articles.length;
  const articlesWithImages = articles.filter(a => a.imageUrl).length;
  const deepResearchArticles = articles.filter(a => a.deepResearch).length;
  const videoArticles = articles.filter(a => a.isVideo).length;
  const podcastArticles = articles.filter(a => a.podcastUrl).length;

  // Content diversity analysis
  const imagePercentage = (articlesWithImages / totalArticles) * 100;
  if (imagePercentage < 80) {
    issues.push({
      type: 'warning',
      category: 'content',
      message: `Only ${imagePercentage.toFixed(1)}% of articles have images. Target: 90%+`,
      priority: 'medium'
    });
  } else {
    strengths.push(`Excellent image coverage: ${imagePercentage.toFixed(1)}% of articles have images`);
  }

  // Content type diversity
  if (deepResearchArticles > 0) {
    strengths.push(`${deepResearchArticles} deep research articles - excellent for authority`);
  }
  if (videoArticles > 0) {
    strengths.push(`${videoArticles} video articles - great for engagement`);
  }
  if (podcastArticles > 0) {
    strengths.push(`${podcastArticles} podcast episodes - multi-format content strategy`);
  }

  // Publication frequency analysis
  const recentArticles = articles.filter(article => {
    const articleDate = new Date(article.date);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return articleDate >= thirtyDaysAgo;
  }).length;

  if (recentArticles >= 4) {
    strengths.push(`Strong publishing frequency: ${recentArticles} articles in last 30 days`);
  } else if (recentArticles < 2) {
    recommendations.push('Consider increasing publishing frequency for better SEO momentum');
  }

  // RSS feed integration
  strengths.push('RSS feeds implemented - helps with content syndication and indexing');

  // Generate site-wide recommendations
  if (averageScore >= 90) {
    recommendations.push('Excellent SEO optimization across all articles!');
  } else if (averageScore >= 80) {
    recommendations.push('Good SEO foundation. Focus on addressing remaining issues.');
  } else {
    recommendations.push('Significant SEO improvements needed. Prioritize high-impact issues.');
  }

  return {
    score: Math.round(averageScore),
    issues,
    recommendations,
    strengths
  };
}

// Get SEO insights for content planning
export function getSEOInsights() {
  const insights = {
    totalArticles: articles.length,
    contentTypes: {
      deepResearch: articles.filter(a => a.deepResearch).length,
      videos: articles.filter(a => a.isVideo).length,
      podcasts: articles.filter(a => a.podcastUrl).length,
      options: articles.filter(a => a.options).length,
      premium: articles.filter(a => a.premiumContent).length,
    },
    recentContent: {
      last7Days: articles.filter(a => {
        const articleDate = new Date(a.date);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return articleDate >= sevenDaysAgo;
      }).length,
      last30Days: articles.filter(a => {
        const articleDate = new Date(a.date);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return articleDate >= thirtyDaysAgo;
      }).length,
    },
    imageOptimization: {
      withImages: articles.filter(a => a.imageUrl).length,
      withoutImages: articles.filter(a => !a.imageUrl).length,
      percentage: Math.round((articles.filter(a => a.imageUrl).length / articles.length) * 100),
    },
    labelDistribution: articles.reduce((acc, article) => {
      if (article.labels) {
        article.labels.forEach(label => {
          acc[label] = (acc[label] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>),
  };

  return insights;
}

// Check for duplicate content issues
export function checkDuplicateContent(): Array<{title: string, articles: Article[]}> {
  const duplicates: Array<{title: string, articles: Article[]}> = [];
  const titleMap = new Map<string, Article[]>();

  articles.forEach(article => {
    const normalizedTitle = article.title.toLowerCase().trim();
    if (!titleMap.has(normalizedTitle)) {
      titleMap.set(normalizedTitle, []);
    }
    titleMap.get(normalizedTitle)!.push(article);
  });

  titleMap.forEach((articleList, title) => {
    if (articleList.length > 1) {
      duplicates.push({ title, articles: articleList });
    }
  });

  return duplicates;
}