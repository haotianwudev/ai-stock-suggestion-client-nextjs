export interface StudyGuideItem {
  text?: string;  // Curated label; falls back to the article's title when articleSlug is set
  articleSlug?: string;  // Preferred: resolves url/videoUrl/visualGuideUrl from the article registry by slug
  url?: string;  // Required only when articleSlug is absent (a non-article external resource)
  videoUrl?: string;  // Explicit override, or the external resource's video
  visualGuideUrl?: string;  // Explicit override, or the external resource's image
}

// Shape after resolveStudyGuideItem() fills in the article-derived fields — what StudyGuide actually renders.
export interface ResolvedStudyGuideItem {
  text: string;
  url: string;
  videoUrl?: string;
  visualGuideUrl?: string;
}

export interface BaseConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  primaryArticleSlug?: string;  // When set, videoUrl/infographicUrl derive from this article unless given explicitly
  // No relatedArticles field: the "Related Articles" list is derived (see resolveRelatedArticleSlugs
  // in lib/article-utils.ts) from primaryArticleSlug + studyGuide.items[].articleSlug — every
  // article a topic curates already appears in one of those, so a separate list was pure duplication.
  studyGuide?: {
    title?: string;
    items: StudyGuideItem[];
  };
}