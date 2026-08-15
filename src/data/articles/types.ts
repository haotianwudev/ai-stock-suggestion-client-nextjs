// Predefined label enum - maximum 10 labels
export enum ArticleLabel {
  OPTIONS = "Options Trading",
  VIDEO = "Youtube",
  PODCAST = "Podcast",
  QUANT = "Quantitative Finance",
  GEN_AI = "Gen AI",
  MACHINE_LEARNING = "Machine Learning",
  STOCK_ANALYSIS = "Stock Analysis",
  MACRO = "Macro Views",
  FORM13F = "13F Analysis",
  FINANCE101 = "Finance 101",
  BOOK = "Book Review",
  PREMIUM = "Premium",
}

export interface Article {
  title: string;
  description: string;
  slug?: string;
  date: string;
  imageUrl?: string;
  infographicUrl?: string; // shown by <InfographicSlot> in the article body; distinct from imageUrl (article-card thumbnail, which becomes the YouTube thumbnail once a video is attached)
  googleDoc?: string;
  websiteUrl?: string;   // External tool / product page — renders a "Go to Website" button
  deepResearch?: boolean;
  youtubeUrl?: string;
  bilibiliUrl?: string; // same video cross-posted to Bilibili; VideoCard shows a source toggle when both are set
  bilibiliTitle?: string; // the video's Chinese-language title on Bilibili, kept for reference/display
  isVideo?: boolean;
  options?: boolean;
  pinned?: boolean;
  premiumContent?: boolean;
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
    if (article.options) autoLabels.push(ArticleLabel.OPTIONS);
    if (article.isVideo) autoLabels.push(ArticleLabel.VIDEO);
    if (article.podcastUrl) autoLabels.push(ArticleLabel.PODCAST);
    if (article.premiumContent) autoLabels.push(ArticleLabel.PREMIUM);
    
    // Merge with existing labels (if any) and remove duplicates
    const existingLabels = article.labels || [];
    const allLabels = [...new Set([...autoLabels, ...existingLabels])];
    
    return {
      ...article,
      labels: allLabels.length > 0 ? allLabels : undefined
    };
  });
}
