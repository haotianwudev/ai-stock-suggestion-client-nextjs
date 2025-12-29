export interface StudyGuideItem {
  text: string;
  url: string;
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