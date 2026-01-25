"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BookOpen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MonteCarloContent } from "../topics/monte-carlo";
import { StatisticalAnalysisContent } from "../topics/statistical-analysis";
import { DerivativesPricingContent } from "../topics/derivatives-pricing";
import { getTopicConfig } from "../topics/config";
import { SystematicStrategiesContent } from "@/app/quant/quanttrading/systematic-strategies";
import { MachineLearningContent } from "@/app/quant/quanttrading/machine-learning";
import { BacktestContent } from "@/app/quant/quanttrading/backtest";
import { TradingSystemContent } from "@/app/quant/quanttrading/trading-system";
import { AssetAllocationContent } from "@/app/quant/quanttrading/asset-allocation";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { ArticleFilter, getFilteredArticles, getAllLabels } from "@/components/articles/article-filter";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";

interface QuantTabClientProps {
  tab: string;
  subtopic?: string;
}

// Topics Tab Component with Sub-navigation
function TopicsTab({ subtopic }: { subtopic?: string }) {
  const router = useRouter();
  const [activeSubtopic, setActiveSubtopic] = useState(subtopic || 'monte-carlo');

  // Update active subtopic when prop changes
  useEffect(() => {
    if (subtopic) {
      setActiveSubtopic(subtopic);
    }
  }, [subtopic]);

  // Handle subtopic change and update URL
  const handleSubtopicChange = (value: string) => {
    setActiveSubtopic(value);
    const newUrl = `/quant/topics/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      {/* Sub-navigation for Topics */}
      <Tabs value={activeSubtopic} onValueChange={handleSubtopicChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
          <TabsTrigger 
            value="monte-carlo" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Monte Carlo</span>
            <span className="hidden sm:block">Monte Carlo Simulation</span>
          </TabsTrigger>
          <TabsTrigger 
            value="statistical-analysis" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Statistics</span>
            <span className="hidden sm:block">Statistical Analysis</span>
          </TabsTrigger>
          <TabsTrigger 
            value="derivatives-pricing" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Derivatives</span>
            <span className="hidden sm:block">Derivatives Pricing</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="monte-carlo" className="mt-0">
          <MonteCarloContent config={getTopicConfig('monte-carlo') || undefined} />
        </TabsContent>
        
        <TabsContent value="statistical-analysis" className="mt-0">
          <StatisticalAnalysisContent />
        </TabsContent>
        
        <TabsContent value="derivatives-pricing" className="mt-0">
          <DerivativesPricingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Quantitative Trading Tab Component with Sub-navigation
function QuantTradingTab({ subtopic }: { subtopic?: string }) {
  const router = useRouter();
  const [activeSubtopic, setActiveSubtopic] = useState(subtopic || 'systematic-strategies');

  // Update active subtopic when prop changes
  useEffect(() => {
    if (subtopic) {
      setActiveSubtopic(subtopic);
    }
  }, [subtopic]);

  // Handle subtopic change and update URL
  const handleSubtopicChange = (value: string) => {
    setActiveSubtopic(value);
    const newUrl = `/quant/quanttrading/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      {/* Sub-navigation for Quantitative Trading */}
      <Tabs value={activeSubtopic} onValueChange={handleSubtopicChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
          <TabsTrigger 
            value="systematic-strategies" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Strategies</span>
            <span className="hidden sm:block">Systematic/Factors</span>
          </TabsTrigger>
          <TabsTrigger 
            value="machine-learning" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">ML</span>
            <span className="hidden sm:block">Machine Learning</span>
          </TabsTrigger>
          <TabsTrigger 
            value="backtest" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Backtest</span>
            <span className="hidden sm:block">Backtesting</span>
          </TabsTrigger>
          <TabsTrigger 
            value="trading-system" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">System</span>
            <span className="hidden sm:block">Trading System</span>
          </TabsTrigger>
          <TabsTrigger 
            value="asset-allocation" 
            className="text-sm md:text-sm py-4 md:py-1.5 px-2 md:px-3 min-h-[52px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block sm:hidden">Assets</span>
            <span className="hidden sm:block">Asset Allocation</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="systematic-strategies" className="mt-0">
          <SystematicStrategiesContent />
        </TabsContent>
        
        <TabsContent value="machine-learning" className="mt-0">
          <MachineLearningContent />
        </TabsContent>
        
        <TabsContent value="backtest" className="mt-0">
          <BacktestContent />
        </TabsContent>
        
        <TabsContent value="trading-system" className="mt-0">
          <TradingSystemContent />
        </TabsContent>
        
        <TabsContent value="asset-allocation" className="mt-0">
          <AssetAllocationContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QuantArticlesTab() {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const availableLabels = getAllLabels();

  // Filter articles with QUANT label only, excluding premiumContent
  const quantArticles = getFilteredArticles(articles, searchText, selectedLabels)
    .filter(article => 
      !article.premiumContent && 
      article.labels?.some((label: string) => 
        label === 'Quantitative Finance'
      )
    );

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
          <BookOpen className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
          <span>Quantitative Finance Research Articles</span>
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Comprehensive articles on quantitative finance covering mathematical models, algorithms, and systematic trading approaches.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Filter Component */}
        <ArticleFilter 
          searchText={searchText}
          onSearchChange={setSearchText}
          selectedLabels={selectedLabels}
          onLabelsChange={setSelectedLabels}
          availableLabels={availableLabels}
        />

        {/* Articles Grid */}
        <div className="grid gap-3 md:gap-6 grid-cols-1 lg:grid-cols-2">
          {quantArticles.map((article) => (
            <ArticleCard 
              key={article.slug}
              title={article.title}
              description={article.description}
              slug={article.slug}
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

        {/* No Results Message */}
        {quantArticles.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <p className="text-base md:text-lg text-muted-foreground">No articles found matching your filters.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Results Count */}
        {quantArticles.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing {quantArticles.length} article{quantArticles.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function QuantTabClient({ tab, subtopic }: QuantTabClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  // Update active tab when prop changes
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'topics') {
      // For topics, always default to monte-carlo
      router.push(`/quant/topics/monte-carlo`, { scroll: false });
    } else if (value === 'quanttrading') {
      // For quanttrading, always default to systematic-strategies
      router.push(`/quant/quanttrading/systematic-strategies`, { scroll: false });
    } else {
      const newUrl = `/quant/${value}`;
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-2 px-3 md:py-8 md:px-6">
          <div className="text-center mb-4 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4">
              <div 
                className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-md border-2 border-blue-300 flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
                onClick={() => setIsImageViewerOpen(true)}
                title="Click to view full screen"
              >
                <Image 
                  src="/images/agents/SOPHIE.png"
                  alt="SOPHIE AI Agent" 
                  width={80} 
                  height={80}
                  className="object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                  Quantitative Finance
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-blue-600 font-medium">SOPHIE Daddy Quant Blog</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 touch-manipulation">
              <TabsTrigger 
                value="topics" 
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger 
                value="quanttrading" 
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                <span className="block sm:hidden">Quant Trading</span>
                <span className="hidden sm:block">Quantitative Trading</span>
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="text-sm sm:text-xs md:text-sm py-4 md:py-1.5 px-2 sm:px-2 md:px-3 min-h-[52px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                <span className="block sm:hidden">Articles</span>
                <span className="hidden sm:block">Research Articles</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="topics" className="mt-0">
              <TopicsTab subtopic={subtopic} />
            </TabsContent>
            
            <TabsContent value="quanttrading" className="mt-0">
              <QuantTradingTab subtopic={subtopic} />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-2 md:mt-6">
              <QuantArticlesTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Full-screen image viewer for SOPHIE image */}
      <FullScreenImageViewer
        src="/images/agents/SOPHIE.png"
        alt="SOPHIE AI Agent"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
      
      <Disclaimer />
    </div>
  );
}