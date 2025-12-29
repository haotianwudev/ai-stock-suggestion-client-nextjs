// Predefined label enum - maximum 10 labels
export enum ArticleLabel {
  DEEP_RESEARCH = "Deep Research",
  OPTIONS = "Options Trading",
  VIDEO = "Youtube",
  PODCAST = "Podcast",
  QUANT = "Quantitative Finance",
  AI_ML = "AI & Machine Learning",
  STOCK_ANALYSIS = "Stock Analysis",
  MARCO = "Macro Views",
  FORM13F = "13F Analysis",
  CRYPTO = "Crypto",
  FINANCE101 = "Finance 101",
}

export interface Article {
  title: string;
  description: string;
  slug?: string;
  date: string;
  imageUrl?: string;
  googleDoc?: string;
  deepResearch?: boolean;
  youtubeUrl?: string;
  isVideo?: boolean;
  options?: boolean;
  pinned?: boolean;
  bookSummary?: boolean;
  noSummary?: boolean;
  podcastUrl?: string;
  labels?: ArticleLabel[]; // Array of predefined labels for filtering
}

// Helper function to generate slug from title
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 60); // Truncate to 60 characters
}

// Postprocess articles to add automatic labels based on flags
export function postprocessArticles(articles: Article[]): Article[] {
  return articles.map(article => {
    const autoLabels: ArticleLabel[] = [];
    
    // Add labels based on flags
    if (article.deepResearch) autoLabels.push(ArticleLabel.DEEP_RESEARCH);
    if (article.options) autoLabels.push(ArticleLabel.OPTIONS);
    if (article.isVideo) autoLabels.push(ArticleLabel.VIDEO);
    if (article.podcastUrl) autoLabels.push(ArticleLabel.PODCAST);
    
    // Merge with existing labels (if any) and remove duplicates
    const existingLabels = article.labels || [];
    const allLabels = [...new Set([...autoLabels, ...existingLabels])];
    
    return {
      ...article,
      labels: allLabels.length > 0 ? allLabels : undefined
    };
  });
}
