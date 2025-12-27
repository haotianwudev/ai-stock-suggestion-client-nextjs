'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export function BacktestingContent() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles with backtesting and validation
  const relatedArticles = articles.filter(article => 
    article.title.toLowerCase().includes('backtesting') ||
    article.title.toLowerCase().includes('validation') ||
    article.title.toLowerCase().includes('performance') ||
    article.title.toLowerCase().includes('testing') ||
    article.labels?.some((label: string) => label === 'Quantitative Finance')
  ).slice(0, 4);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-3xl text-blue-900 mb-2">
                Backtesting & Validation
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-blue-700">
                Master backtesting methodologies, performance metrics, and validation techniques 
                for algorithmic trading strategies. Learn to avoid common pitfalls and biases.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <BarChart3 className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Performance Metrics</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Validation Methods</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
              <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-900">Bias Prevention</span>
            </div>
          </div>

          {/* Video Tutorial */}
          <VideoTutorial
            title="Backtesting Trading Strategies"
            description="Learn proper backtesting methodologies, performance evaluation, and how to avoid common pitfalls in strategy validation."
            videoId="BacktestingVideoId"
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
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800 font-medium">Backtesting Framework</p>
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

          {/* Key Metrics */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Essential Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Return Metrics</h4>
                <p className="text-sm text-blue-700">Total return, CAGR, excess return, and risk-adjusted returns (Sharpe, Sortino).</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Risk Metrics</h4>
                <p className="text-sm text-blue-700">Volatility, maximum drawdown, VaR, and downside deviation.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Trade Statistics</h4>
                <p className="text-sm text-blue-700">Win rate, profit factor, average trade duration, and trade frequency.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Robustness Tests</h4>
                <p className="text-sm text-blue-700">Out-of-sample testing, walk-forward analysis, and Monte Carlo simulation.</p>
              </div>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Common Pitfalls to Avoid</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Look-ahead bias:</strong> Using future information in historical analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Survivorship bias:</strong> Only testing on assets that survived the entire period</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Overfitting:</strong> Optimizing too many parameters on limited data</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Transaction costs:</strong> Ignoring realistic trading costs and slippage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Validation Methods */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Validation Techniques</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Out-of-Sample Testing</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Walk-Forward Analysis</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Cross-Validation</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Monte Carlo Simulation</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Bootstrap Analysis</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Regime Analysis</Badge>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">Best Practices</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Reserve at least 30% of data for out-of-sample testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Include realistic transaction costs and market impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Test across different market regimes and time periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Document all assumptions and limitations clearly</span>
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
              Explore backtesting methodologies and validation techniques
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
        src="https://i.imgur.com/YourBacktestingInfographic.jpeg"
        alt="Backtesting Framework Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}