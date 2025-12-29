export interface StudyGuideItem {
  text: string;
  url: string;
  videoUrl?: string;  // Optional custom video URL for this specific item
  visualGuideUrl?: string;  // Optional custom visual guide URL for this specific item
}

export interface BaseConfig {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  infographicUrl?: string;
  relatedArticles?: string[];
  studyGuide?: {
    title: string;
    items: StudyGuideItem[];
  };
}