'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, Zap, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export function ExecutionContent() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles with execution and implementation
  const relatedArticles = articles.filter(article => 
    article.title.toLowerCase().includes('execution') ||
    article.title.toLowerCase().includes('implementation') ||
    article.title.toLowerCase().includes('slippage') ||
    article.title.toLowerCase().includes('microstructure') ||
    article.labels?.some((label: string) => label === 'Quantitative Finance')
  ).slice(0, 4);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-3xl text-orange-900 mb-2">
                Execution & Implementation
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-orange-700">
                Learn about trade execution algorithms, market microstructure, slippage management, 
                and implementation shortfall to optimize trading performance.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-100">
              <Zap className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-900">Execution Algorithms</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-100">
              <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-900">Market Timing</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-100">
              <DollarSign className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-orange-900">Cost Management</span>
            </div>
          </div>

          {/* Video Tutorial */}
          <VideoTutorial
            title="Algorithmic Execution Strategies"
            description="Learn about different execution algorithms, market microstructure, and how to minimize trading costs and market impact."
            videoId="ExecutionVideoId"
            className="mb-4"
          />

          {/* Infographic Section */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-orange-900">Visual Guide</h3>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-orange-200 cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <p className="text-orange-800 font-medium">Execution Framework</p>
                  <p className="text-orange-600 text-sm mt-2">Click to view detailed visualization</p>
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

          {/* Execution Algorithms */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-orange-900">Common Execution Algorithms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">TWAP (Time-Weighted Average Price)</h4>
                <p className="text-sm text-orange-700">Spread trades evenly over time to minimize market impact.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">VWAP (Volume-Weighted Average Price)</h4>
                <p className="text-sm text-orange-700">Execute trades in proportion to historical volume patterns.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">Implementation Shortfall</h4>
                <p className="text-sm text-orange-700">Balance market impact against timing risk optimally.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">Participation Rate</h4>
                <p className="text-sm text-orange-700">Limit trading to a percentage of market volume.</p>
              </div>
            </div>
          </div>

          {/* Cost Components */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-orange-900">Trading Cost Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">Explicit Costs</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Commissions and fees</li>
                  <li>• Taxes and regulatory costs</li>
                  <li>• Exchange and clearing fees</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-2">Implicit Costs</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Bid-ask spread</li>
                  <li>• Market impact</li>
                  <li>• Timing risk</li>
                  <li>• Opportunity cost</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Market Microstructure */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-orange-900">Market Microstructure Factors</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Order Book Dynamics</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Liquidity Patterns</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Price Discovery</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Market Impact Models</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Intraday Seasonality</Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Venue Selection</Badge>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-orange-900">Execution Best Practices</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-orange-800">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Choose execution algorithm based on order size and urgency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Monitor and measure execution quality consistently</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Consider market conditions and liquidity patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Balance speed vs. cost based on strategy requirements</span>
                </li>
              </ul>
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
              Explore execution algorithms and implementation strategies
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
        src="https://i.imgur.com/YourExecutionInfographic.jpeg"
        alt="Execution Framework Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}