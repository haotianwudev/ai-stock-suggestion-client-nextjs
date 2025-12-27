'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, Brain, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { VideoTutorial } from "@/components/ui/video-tutorial";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export function MachineLearningContent() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  // Get related articles with AI/ML labels
  const relatedArticles = articles.filter(article => 
    article.labels?.some((label: string) => label === 'AI & Machine Learning') ||
    article.title.toLowerCase().includes('ai') ||
    article.title.toLowerCase().includes('machine learning') ||
    article.title.toLowerCase().includes('neural') ||
    article.title.toLowerCase().includes('algorithm')
  ).slice(0, 4);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Hero Section */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
              <Brain className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-3xl text-purple-900 mb-2">
                Machine Learning in Finance
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-purple-700">
                Explore AI and machine learning applications in quantitative finance. From algorithmic trading 
                to risk modeling, portfolio optimization, and predictive analytics using cutting-edge ML techniques.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6">
          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-100">
              <Brain className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-purple-900">Neural Networks</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-100">
              <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-purple-900">Predictive Models</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-100">
              <Zap className="h-4 w-4 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-purple-900">Algorithmic Trading</span>
            </div>
          </div>

          {/* Video Tutorial */}
          <VideoTutorial
            title="AI-Powered Trading Algorithms"
            description="Discover how artificial intelligence and machine learning are revolutionizing quantitative finance and algorithmic trading strategies."
            videoId="aViyh1n08v4"
            className="mb-4"
          />

          {/* Infographic Section */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-purple-900">Visual Guide</h3>
            <div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-purple-200 cursor-pointer group"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-purple-800 font-medium">ML in Finance Infographic</p>
                  <p className="text-purple-600 text-sm mt-2">Click to view detailed visualization</p>
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
            <h3 className="text-lg md:text-xl font-semibold text-purple-900">Key Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Sentiment Analysis</h4>
                <p className="text-sm text-purple-700">Analyze market sentiment from news, social media, and financial reports.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Price Prediction</h4>
                <p className="text-sm text-purple-700">Use deep learning models to forecast asset prices and market movements.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Risk Management</h4>
                <p className="text-sm text-purple-700">Implement ML-based risk models for better portfolio protection.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Pattern Recognition</h4>
                <p className="text-sm text-purple-700">Identify complex market patterns and trading opportunities.</p>
              </div>
            </div>
          </div>

          {/* ML Techniques */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-semibold text-purple-900">Popular ML Techniques</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Random Forest</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">LSTM Networks</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Support Vector Machines</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Reinforcement Learning</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Ensemble Methods</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Deep Neural Networks</Badge>
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
              Explore AI and machine learning applications in quantitative finance
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
        src="https://i.imgur.com/YourMLInfographic.jpeg"
        alt="Machine Learning in Finance Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </div>
  );
}