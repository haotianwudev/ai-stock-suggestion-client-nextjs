"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, BookOpen } from "lucide-react";
import { SlotKicker } from "@/components/articles/article-frame";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MonteCarloContent } from "../topics/monte-carlo";
import { StatisticalAnalysisContent } from "../topics/statistical-analysis";
import { DerivativesPricingContent } from "../topics/derivatives-pricing";
import { AiInQuantContent } from "../topics/ai-in-quant";
import { RiskManagementContent } from "../topics/risk-management";
import { BooksContent } from "../topics/books";
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
import { useUser } from "@/hooks/use-user";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { canAccessPremiumContent } from "@/lib/tiers";

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
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs touch-manipulation gap-1">
          <TabsTrigger
            value="monte-carlo"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Monte Carlo</span>
            <span className="hidden md:block">Monte Carlo Simulation</span>
          </TabsTrigger>
          <TabsTrigger
            value="statistical-analysis"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Statistics</span>
            <span className="hidden md:block">Statistical Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="derivatives-pricing"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Derivatives</span>
            <span className="hidden md:block">Derivatives Pricing</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai-in-quant"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">AI</span>
            <span className="hidden md:block">AI in Quant</span>
          </TabsTrigger>
          <TabsTrigger
            value="risk-management"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Risk</span>
            <span className="hidden md:block">Risk Management</span>
          </TabsTrigger>
          <TabsTrigger
            value="books"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            Books
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

        <TabsContent value="ai-in-quant" className="mt-0">
          <AiInQuantContent />
        </TabsContent>

        <TabsContent value="risk-management" className="mt-0">
          <RiskManagementContent />
        </TabsContent>

        <TabsContent value="books" className="mt-0">
          <BooksContent />
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
        <TabsList className="grid w-full grid-cols-5 h-auto p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs touch-manipulation gap-1">
          <TabsTrigger
            value="systematic-strategies"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block sm:hidden">Systematic</span>
            <span className="hidden sm:block">Systematic</span>
          </TabsTrigger>
          <TabsTrigger 
            value="asset-allocation" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block sm:hidden">Portfolio</span>
            <span className="hidden sm:block">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger 
            value="machine-learning" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block sm:hidden">ML</span>
            <span className="hidden sm:block">Machine Learning</span>
          </TabsTrigger>
          <TabsTrigger 
            value="backtest" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block sm:hidden">Backtest</span>
            <span className="hidden sm:block">Backtesting</span>
          </TabsTrigger>
          <TabsTrigger
            value="trading-system"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block sm:hidden">System</span>
            <span className="hidden sm:block">Trading System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="systematic-strategies" className="mt-0">
          <SystematicStrategiesContent />
        </TabsContent>

        <TabsContent value="asset-allocation" className="mt-0">
          <AssetAllocationContent />
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
      </Tabs>
    </div>
  );
}

function QuantArticlesTab() {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const availableLabels = getAllLabels();
  const { profile } = useUser();
  const canViewPremium = canAccessPremiumContent(profile?.tier ?? 1);
  const { bookmarkedSlugs } = useBookmarks();

  // Filter articles with QUANT label only, gating premiumContent by tier
  const quantArticles = getFilteredArticles(articles, searchText, selectedLabels, bookmarkedSlugs, bookmarkedOnly)
    .filter(article =>
      (canViewPremium || !article.premiumContent) &&
      article.labels?.some((label: string) =>
        label === 'Quantitative Finance'
      )
    );

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-serif font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <BookOpen className="h-5 w-5 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0" />
          <span>Quantitative Finance Research Articles</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Comprehensive articles on quantitative finance covering mathematical models, algorithms, and systematic trading approaches.
        </p>
      </div>

      {/* Filter Component */}
      <ArticleFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedLabels={selectedLabels}
        onLabelsChange={setSelectedLabels}
        availableLabels={availableLabels}
        bookmarkedOnly={bookmarkedOnly}
        onBookmarkedOnlyChange={setBookmarkedOnly}
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
            bilibiliUrl={article.bilibiliUrl}
            bilibiliTitle={article.bilibiliTitle}
            isVideo={article.isVideo}
            options={article.options}
            noSummary={article.noSummary}
            podcastUrl={article.podcastUrl}
            websiteUrl={article.websiteUrl}
          />
        ))}
      </div>

      {/* No Results Message */}
      {quantArticles.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-base text-slate-500">No articles found matching your filters.</p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Results Count */}
      {quantArticles.length > 0 && (
        <p className="text-xs sm:text-sm text-slate-500 text-center font-mono">
          Showing {quantArticles.length} article{quantArticles.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
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
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-6 px-4 md:py-10 md:px-6">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-3">
              <div 
                className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-md border-2 border-[#A8672E]/30 dark:border-[#D08F52]/30 flex-shrink-0 cursor-pointer hover:shadow-lg transition-all duration-200 group"
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
              <div className="text-center sm:text-left space-y-1">
                <SlotKicker icon={Calculator} label="Systematic Research & Modeling" tone="accent" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Quantitative Finance
                </h1>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs touch-manipulation gap-1">
              <TabsTrigger 
                value="topics" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger 
                value="quanttrading" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                <span className="block sm:hidden">Quant Trading</span>
                <span className="hidden sm:block">Quantitative Trading</span>
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
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