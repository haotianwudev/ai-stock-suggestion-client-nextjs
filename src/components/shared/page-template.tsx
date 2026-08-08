'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { StudyGuide } from "@/components/ui/study-guide";
import { ArticleCard } from "@/components/articles/article-card";
import { resolveStudyGuideItems, resolveTopicMedia, resolveRelatedArticleSlugs, getArticleBySlug } from "@/lib/article-utils";
import { BaseConfig, ResolvedStudyGuideItem } from "@/components/shared/config-types";

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
  showKeyConceptsSection = false,
  showVideoSection = true,
  showInfographicSection = true,
  showRelatedArticlesSection = true
}: PageTemplateProps) {
  const topicMedia = config ? resolveTopicMedia(config) : {};
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(topicMedia.videoUrl || '');
  const [currentInfographicUrl, setCurrentInfographicUrl] = useState(topicMedia.infographicUrl || '');

  // Related articles are derived from primaryArticleSlug + studyGuide, not a separately
  // maintained list — see resolveRelatedArticleSlugs in lib/article-utils.ts.
  const relatedArticles = config
    ? resolveRelatedArticleSlugs(config)
        .map(getArticleBySlug)
        .filter((article): article is NonNullable<typeof article> => article !== undefined)
    : [];

  const studyGuideItems = config?.studyGuide ? resolveStudyGuideItems(config.studyGuide.items) : [];

  // Handle study guide item selection
  const handleStudyGuideItemSelect = (item: ResolvedStudyGuideItem) => {
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
    setCurrentVideoUrl(topicMedia.videoUrl || '');
    setCurrentInfographicUrl(topicMedia.infographicUrl || '');
  }, [topicMedia.videoUrl, topicMedia.infographicUrl]);

  return (
    <div className="space-y-4 md:space-y-8 px-1 md:px-0">
      {/* Hero Section */}
      <Card className={`${heroColorScheme.border} ${heroColorScheme.background}`}>
        <CardHeader className="pb-3 md:pb-6 px-2 md:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className={`p-2 md:p-3 ${heroColorScheme.iconBg} rounded-lg flex-shrink-0`}>
              <div className={`h-6 w-6 md:h-8 md:w-8 ${heroColorScheme.iconColor}`}>
                {heroIcon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className={`text-xl md:text-3xl ${heroColorScheme.titleColor} mb-2 leading-tight`}>
                {config?.title || "Loading..."}
              </CardTitle>
              <CardDescription className={`text-sm md:text-base ${heroColorScheme.descriptionColor} leading-relaxed`}>
                {config?.description || "Loading description..."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6 px-2 md:px-6">
          {/* Key Concepts */}
          {showKeyConceptsSection && keyConceptsItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {keyConceptsItems.map((item, index) => (
                <div key={index} className={`flex items-center gap-2 p-2 md:p-3 ${heroColorScheme.cardBg} rounded-lg ${heroColorScheme.cardBorder} min-w-0`}>
                  <div className={`h-4 w-4 ${heroColorScheme.iconColor} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-medium ${heroColorScheme.cardText} truncate`}>{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Video Tutorial with Study Guide */}
          {showVideoSection && currentVideoUrl && (
            <>
              {customVideoComponent || (
                <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
                  {/* Study Guide */}
                  {config?.studyGuide && (
                    <div className="lg:col-span-1 order-2 lg:order-1">
                      <StudyGuide
                        title={config.studyGuide.title || "Study Guide (click to select)"}
                        items={studyGuideItems}
                        onItemSelect={handleStudyGuideItemSelect}
                      />
                    </div>
                  )}
                  
                  {/* Video */}
                  <div className={`${config?.studyGuide ? "lg:col-span-2" : "lg:col-span-3"} order-1 lg:order-2`}>
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
                      className={`relative rounded-xl overflow-hidden shadow-lg ${heroColorScheme.cardBorder} cursor-pointer group touch-manipulation`}
                      onClick={() => setIsImageViewerOpen(true)}
                    >
                      <img 
                        src={currentInfographicUrl} 
                        alt={infographicAlt} 
                        className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" size="sm" className="text-xs md:text-sm">
                          <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">View Full Screen</span>
                          <span className="sm:hidden">Full Screen</span>
                        </Button>
                      </div>
                      {/* Mobile tap hint */}
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-70 sm:hidden">
                        Tap to expand
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
          <div className="space-y-4 md:space-y-6">
            {contentSections}
          </div>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {showRelatedArticlesSection && relatedArticles.length > 0 && (
        <>
          {customRelatedArticlesComponent || (
            <Card className="mx-1 md:mx-0">
              <CardHeader className="px-2 md:px-6">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <span>Related Articles</span>
                </CardTitle>
                <CardDescription>
                  Explore related topics and quantitative approaches
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 md:px-6">
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
                      websiteUrl={article.websiteUrl}
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