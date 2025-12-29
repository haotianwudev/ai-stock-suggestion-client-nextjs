'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";
import React from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { StudyGuide } from "@/components/ui/study-guide";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export interface StudyGuideItem {
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
  relatedArticles?: string[];
  studyGuide?: {
    title: string;
    items: StudyGuideItem[];
  };
}

interface PageTemplateProps {
  config?: BaseConfig | null;
  heroIcon: ReactNode;
  heroColorScheme: {
    border: string;
    background: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
    descriptionColor: string;
    cardBg: string;
    cardBorder: string;
    cardText: string;
    badgeBg: string;
    badgeText: string;
    sectionTitle: string;
  };
  keyConceptsItems?: Array<{
    icon: ReactNode;
    text: string;
  }>;
  contentSections?: ReactNode;
  infographicAlt?: string;
  fallbackInfographic?: ReactNode;
  customVideoComponent?: ReactNode;
  customInfographicComponent?: ReactNode;
  customRelatedArticlesComponent?: ReactNode;
  showKeyConceptsSection?: boolean;
  showVideoSection?: boolean;
  showInfographicSection?: boolean;
  showRelatedArticlesSection?: boolean;
}

export function PageTemplate({
  config,
  heroIcon,
  heroColorScheme,
  keyConceptsItems = [],
  contentSections,
  infographicAlt = "Visual Guide",
  fallbackInfographic,
  customVideoComponent,
  customInfographicComponent,
  customRelatedArticlesComponent,
  showKeyConceptsSection = true,
  showVideoSection = true,
  showInfographicSection = true,
  showRelatedArticlesSection = true
}: PageTemplateProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(config?.videoUrl || '');
  const [currentInfographicUrl, setCurrentInfographicUrl] = useState(config?.infographicUrl || '');
  
  // Get related articles from config or fallback to empty array
  const relatedArticles = config?.relatedArticles 
    ? articles.filter(article => config.relatedArticles?.includes(article.slug || ''))
    : [];

  // Handle study guide item selection
  const handleStudyGuideItemSelect = (item: StudyGuideItem) => {
    // Update video URL if the item has a custom video
    if (item.videoUrl) {
      setCurrentVideoUrl(item.videoUrl);
    }
    
    // Update infographic URL if the item has a custom visual guide
    if (item.visualGuideUrl) {
      setCurrentInfographicUrl(item.visualGuideUrl);
    }
  };

  // Reset to default when config changes
  useEffect(() => {
    setCurrentVideoUrl(config?.videoUrl || '');
    setCurrentInfographicUrl(config?.infographicUrl || '');
  }, [config?.videoUrl, config?.infographicUrl]);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className={`${heroColorScheme.border} ${heroColorScheme.background}`}>
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className={`p-2 md:p-3 ${heroColorScheme.iconBg} rounded-lg`}>
              <div className={`h-6 w-6 md:h-8 md:w-8 ${heroColorScheme.iconColor}`}>
                {heroIcon}
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className={`text-xl md:text-3xl ${heroColorScheme.titleColor} mb-2`}>
                {config?.title || "Loading..."}
              </CardTitle>
              <CardDescription className={`text-sm md:text-base ${heroColorScheme.descriptionColor}`}>
                {config?.description || "Loading description..."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          {showKeyConceptsSection && keyConceptsItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {keyConceptsItems.map((item, index) => (
                <div key={index} className={`flex items-center gap-2 p-3 ${heroColorScheme.cardBg} rounded-lg ${heroColorScheme.cardBorder}`}>
                  <div className={`h-4 w-4 ${heroColorScheme.iconColor} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-medium ${heroColorScheme.cardText}`}>{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Video Tutorial with Study Guide */}
          {showVideoSection && currentVideoUrl && (
            <>
              {customVideoComponent || (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Study Guide */}
                  {config?.studyGuide && (
                    <div className="lg:col-span-1">
                      <StudyGuide
                        title={config.studyGuide.title}
                        items={config.studyGuide.items}
                        onItemSelect={handleStudyGuideItemSelect}
                      />
                    </div>
                  )}
                  
                  {/* Video */}
                  <div className={config?.studyGuide ? "lg:col-span-2" : "lg:col-span-3"}>
                    <VideoTutorial
                      title="Video Tutorial"
                      videoId={currentVideoUrl.split('/').pop() || ''}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Infographic Section */}
          {showInfographicSection && (
            <>
              {customInfographicComponent || (
                currentInfographicUrl ? (
                  <div className="space-y-3">
                    <h3 className={`text-lg md:text-xl font-semibold ${heroColorScheme.sectionTitle}`}>Visual Guide</h3>
                    <div 
                      className={`relative rounded-xl overflow-hidden shadow-lg ${heroColorScheme.cardBorder} cursor-pointer group`}
                      onClick={() => setIsImageViewerOpen(true)}
                    >
                      <img 
                        src={currentInfographicUrl} 
                        alt={infographicAlt} 
                        className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Screen
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : fallbackInfographic && (
                  <div className="space-y-3">
                    <h3 className={`text-lg md:text-xl font-semibold ${heroColorScheme.sectionTitle}`}>Visual Guide</h3>
                    {fallbackInfographic}
                  </div>
                )
              )}
            </>
          )}

          {/* Custom Content Sections */}
          {contentSections}
        </CardContent>
      </Card>

      {/* Related Articles */}
      {showRelatedArticlesSection && relatedArticles.length > 0 && (
        <>
          {customRelatedArticlesComponent || (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Related Articles
                </CardTitle>
                <CardDescription>
                  Explore related topics and quantitative approaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                  {relatedArticles.map((article) => (
                    <ArticleCard 
                      key={article.slug || ''}
                      title={article.title}
                      description={article.description}
                      slug={article.slug || ''}
                      date={article.date}
                      imageUrl={article.imageUrl}
                      googleDoc={article.googleDoc}
                      deepResearch={article.deepResearch}
                      youtubeUrl={article.youtubeUrl}
                      isVideo={article.isVideo}
                      options={article.options}
                      noSummary={article.noSummary}
                      podcastUrl={article.podcastUrl}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src={currentInfographicUrl}
        alt={infographicAlt}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}