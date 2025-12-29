'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calculator } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { StudyGuide } from "@/components/ui/study-guide";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { TopicConfig } from "./config";

export function MonteCarloContent({ config }: { config?: TopicConfig }) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles from config
  const relatedArticles = config?.relatedArticles 
    ? articles.filter(article => config.relatedArticles?.includes(article.slug || ''))
    : [];

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-3xl text-blue-900 mb-2">
                Monte Carlo Simulation
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-blue-700">
                Master Monte Carlo methods for financial modeling, risk assessment, and portfolio robustness. 
                Learn to simulate complex financial scenarios and price derivatives using probabilistic approaches.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Video Tutorial and Study Guide */}
          {config?.videoUrl && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Study Guide */}
              <div className="lg:col-span-1">
                <StudyGuide
                  title="Study Guide"
                  items={[
                    {
                      text: "Monte Carlo Simulation Overview",
                      url: "https://www.sophie-ai-finance.com/articles/monte-carlo-simulation-quantitative-finance-stochastic-modeling"
                    },
                    {
                      text: "[Youtube] Monte Carlo Simulation in Risk Management",
                      url: "https://youtu.be/5gA1ifx7wPg"
                    },
                    {
                      text: "Monte Carlo Simulation for Trading Robustness",
                      url: "https://www.sophie-ai-finance.com/articles/monte-carlo-robustness-protocols-stress-testing-systematic-trading"
                    },
                    {
                      text: "[Youtube] Monte Carlo Simulation for Quant Trading",
                      url: "https://youtu.be/sA57KkA-v-Q"
                    },
                    {
                      text: "Monte Carlo Simulation for Derivative Pricing and Simulation Models",
                      url: "https://www.sophie-ai-finance.com/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva"
                    }, 
                    {
                      text: "[Youtube] Monte Carlo Simulation in Derivative Pricing and CVA",
                      url: "https://youtu.be/nBAnWHAzD6I"
                    },                   
                    {
                      text: "Portfolio Monte Carlo Simulation Tools",
                      url: "https://www.portfoliovisualizer.com/monte-carlo-simulation"
                    },
                  ]}
                />
              </div>
              
              {/* Video */}
              <div className="lg:col-span-2">
                <VideoTutorial
                  title="Video Overview"
                  description="Learn the fundamentals of Monte Carlo methods and their applications in financial modeling and risk management."
                  videoId={config.videoUrl.split('/').pop() || ''}
                />
              </div>
            </div>
          )}

          {/* Infographic Section */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Visual Guide</h3>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-blue-200 cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={config?.infographicUrl} 
                alt="Monte Carlo Simulation in Quantitative Finance" 
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

        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Related Articles
            </CardTitle>
            <CardDescription>
              Deep dive into Monte Carlo methods and quantitative finance applications
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

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src={config?.infographicUrl || "https://i.imgur.com/vGkVKOa.jpeg"}
        alt="Monte Carlo Simulation in Quantitative Finance"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}