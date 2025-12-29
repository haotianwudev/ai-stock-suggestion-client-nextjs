'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, Activity, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export function SystematicStrategiesContent() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles with systematic trading strategies
  const relatedArticles = articles.filter(article => 
    article.title.toLowerCase().includes('systematic') ||
    article.title.toLowerCase().includes('momentum') ||
    article.title.toLowerCase().includes('strategy') ||
    article.title.toLowerCase().includes('quantitative') ||
    article.labels?.some((label: string) => label === 'Quantitative Finance')
  ).slice(0, 4);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-3xl text-green-900 mb-2">
                Systematic Trading Strategies
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-green-700">
                Learn rule-based trading approaches, momentum strategies, mean reversion, and systematic 
                portfolio construction methods for consistent market outperformance.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-100">
              <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-900">Momentum Strategies</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-100">
              <BarChart3 className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-900">Mean Reversion</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-100">
              <Activity className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-900">Rule-Based Systems</span>
            </div>
          </div>

          {/* Video Tutorial */}
          <VideoTutorial
            title="Systematic Trading Strategies"
            description="Learn how to build, test, and implement systematic trading strategies using quantitative methods and rule-based approaches."
            videoId="L0aVoPLqcFw"
            className="mb-4"
          />

          {/* Infographic Section */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-green-900">Visual Guide</h3>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-green-200 cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <Activity className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-green-800 font-medium">Systematic Strategies Framework</p>
                  <p className="text-green-600 text-sm mt-2">Click to view detailed visualization</p>
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

          {/* Strategy Types */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-green-900">Core Strategy Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 mb-2">Momentum Strategies</h4>
                <p className="text-sm text-green-700">Capitalize on trending markets and price momentum patterns using systematic rules.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 mb-2">Mean Reversion</h4>
                <p className="text-sm text-green-700">Profit from price reversals and statistical arbitrage opportunities.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 mb-2">Factor Investing</h4>
                <p className="text-sm text-green-700">Systematic exposure to risk factors like value, quality, and low volatility.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 mb-2">Statistical Arbitrage</h4>
                <p className="text-sm text-green-700">Exploit statistical relationships between correlated assets systematically.</p>
              </div>
            </div>
          </div>

          {/* Implementation Framework */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-green-900">Implementation Framework</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Signal Generation</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Portfolio Construction</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Risk Management</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Rebalancing Rules</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Performance Monitoring</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Transaction Costs</Badge>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-green-900">Best Practices</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Define clear, objective rules for entry and exit signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Implement robust risk management and position sizing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Account for transaction costs and market impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Regular strategy monitoring and performance attribution</span>
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
              Explore systematic trading strategies and quantitative approaches
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
        src="https://i.imgur.com/YourSystematicStrategiesInfographic.jpeg"
        alt="Systematic Trading Strategies Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}