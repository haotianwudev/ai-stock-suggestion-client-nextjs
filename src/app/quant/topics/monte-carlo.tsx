'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, TrendingUp, BarChart3, Calculator } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export function MonteCarloContent() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles with Monte Carlo or quantitative methods
  const relatedArticles = articles.filter(article => 
    article.title.toLowerCase().includes('monte carlo') ||
    article.title.toLowerCase().includes('simulation') ||
    article.title.toLowerCase().includes('risk') ||
    article.labels?.some(label => label === 'Quantitative Finance')
  ).slice(0, 4);

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
                Master Monte Carlo methods for financial modeling, risk assessment, and portfolio optimization. 
                Learn to simulate complex financial scenarios and price derivatives using probabilistic approaches.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Risk Assessment</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <BarChart3 className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Portfolio Optimization</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <Calculator className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Derivative Pricing</span>
            </div>
          </div>

          {/* Video Tutorial */}
          <VideoTutorial
            title="Monte Carlo Simulation in Finance"
            description="Learn the fundamentals of Monte Carlo methods and their applications in financial modeling and risk management."
            videoId="7ESK5SaP-bc"
            className="mb-4"
          />

          {/* Infographic Section */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Visual Guide</h3>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-blue-200 cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800 font-medium">Monte Carlo Simulation Infographic</p>
                  <p className="text-blue-600 text-sm mt-2">Click to view detailed visualization</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Screen
                </Button>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Key Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Value at Risk (VaR)</h4>
                <p className="text-sm text-blue-700">Calculate potential losses in portfolios under normal market conditions.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Option Pricing</h4>
                <p className="text-sm text-blue-700">Price complex derivatives and exotic options using simulation methods.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Stress Testing</h4>
                <p className="text-sm text-blue-700">Evaluate portfolio performance under extreme market scenarios.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Asset Allocation</h4>
                <p className="text-sm text-blue-700">Optimize portfolio weights using simulated return distributions.</p>
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
        src="https://i.imgur.com/YourMonteCarloInfographic.jpeg"
        alt="Monte Carlo Simulation Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}