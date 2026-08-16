"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Layers } from "lucide-react";
import { SlotKicker } from "@/components/articles/article-frame";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { OptionsViewer } from "@/components/options/options-viewer";
import { SpxPayoffBuilder } from "@/components/options/spx-payoff-builder";
import { VRPContent } from "../topics/vrp";
import { Option101Content } from "../topics/option101";
import { GreeksContent } from "../topics/greeks";
import { GEXContent } from "../topics/gex";
import { RollContent } from "../topics/roll";
import { VolatilityContent } from "../topics/volatility";
import { BooksContent } from "../topics/books";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { ArticleFilter, getFilteredArticles, getAllLabels } from "@/components/articles/article-filter";
import { useUser } from "@/hooks/use-user";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { canAccessPremiumContent } from "@/lib/tiers";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StrategyExplorer } from "@/components/options/strategy-explorer";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OptionsTabClientProps {
  tab: string;
  strategyId?: string;
  subtopic?: string;
}

// Topics Tab Component with Sub-navigation
function TopicsTab({ subtopic }: { subtopic?: string }) {
  const router = useRouter();
  const [activeSubtopic, setActiveSubtopic] = useState(subtopic || 'option101');

  // Update active subtopic when prop changes
  useEffect(() => {
    if (subtopic) {
      setActiveSubtopic(subtopic);
    }
  }, [subtopic]);

  // Handle subtopic change and update URL
  const handleSubtopicChange = (value: string) => {
    setActiveSubtopic(value);
    const newUrl = `/option/topics/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      {/* Sub-navigation for Topics */}
      <Tabs value={activeSubtopic} onValueChange={handleSubtopicChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 h-auto p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs touch-manipulation gap-1">
          <TabsTrigger 
            value="option101" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">101</span>
            <span className="hidden md:block">Option 101</span>
          </TabsTrigger>
          <TabsTrigger 
            value="greeks" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Greeks</span>
            <span className="hidden md:block">Option Greeks</span>
          </TabsTrigger>
          <TabsTrigger 
            value="roll" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Roll</span>
            <span className="hidden md:block">Art of Roll</span>
          </TabsTrigger>
          <TabsTrigger 
            value="volatility" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            <span className="block md:hidden">Vol</span>
            <span className="hidden md:block">Volatility</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vrp" 
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            VRP
          </TabsTrigger>
          <TabsTrigger
            value="gex"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            GEX
          </TabsTrigger>
          <TabsTrigger
            value="books"
            className="text-xs md:text-sm py-2 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
          >
            Books
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="option101" className="mt-0">
          <Option101Content />
        </TabsContent>
        
        <TabsContent value="greeks" className="mt-0">
          <GreeksContent />
        </TabsContent>
        
        <TabsContent value="roll" className="mt-0">
          <RollContent />
        </TabsContent>

        <TabsContent value="volatility" className="mt-0">
          <VolatilityContent />
        </TabsContent>

        <TabsContent value="vrp" className="mt-0">
          <VRPContent />
        </TabsContent>
        
        <TabsContent value="gex" className="mt-0">
          <GEXContent />
        </TabsContent>

        <TabsContent value="books" className="mt-0">
          <BooksContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
// Options Viewer Tab — two sub-tools: the live chain lookup and the SPX payoff builder.
// Local state only (no deep-linking sub-routes), same pattern as TopicsTab above.
function ViewerTab() {
  const [activeTool, setActiveTool] = useState('chain');
  return (
    <Tabs value={activeTool} onValueChange={setActiveTool} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 h-auto md:h-10 gap-1 md:gap-0 p-1 touch-manipulation">
        <TabsTrigger value="chain" className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation">
          Options Chain
        </TabsTrigger>
        <TabsTrigger value="builder" className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation">
          Payoff Builder
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chain" className="mt-0">
        <OptionsViewer />
      </TabsContent>

      <TabsContent value="builder" className="mt-0">
        <Card>
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-lg md:text-2xl">SPX Payoff Builder</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Build any multi-leg SPX position from a real option chain — presets, net Greeks, solved IV, probability of profit, and a today-vs-expiration payoff comparison.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SpxPayoffBuilder />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function OptionsArticlesTab() {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const availableLabels = getAllLabels();
  const { profile } = useUser();
  const canViewPremium = canAccessPremiumContent(profile?.tier ?? 1);
  const { bookmarkedSlugs } = useBookmarks();

  const optionsArticles = getFilteredArticles(articles, searchText, selectedLabels, bookmarkedSlugs, bookmarkedOnly)
    .filter(article => article.options === true && (canViewPremium || !article.premiumContent));

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-serif font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <BookOpen className="h-5 w-5 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0" />
          <span>Options Research Articles</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Comprehensive articles on options trading covering key concepts, strategies, and common pitfalls to avoid.
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
        {optionsArticles.map((article) => (
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
      {optionsArticles.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-base text-slate-500">No articles found matching your filters.</p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Results Count */}
      {optionsArticles.length > 0 && (
        <p className="text-xs sm:text-sm text-slate-500 text-center font-mono">
          Showing {optionsArticles.length} article{optionsArticles.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default function OptionsTabClient({ tab, strategyId, subtopic }: OptionsTabClientProps) {
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
      // For topics, use the subtopic or default to option101
      const defaultSubtopic = subtopic || 'option101';
      router.push(`/option/topics/${defaultSubtopic}`, { scroll: false });
    } else {
      const newUrl = `/option/${value}`;
      router.push(newUrl, { scroll: false });
    }
  };

  // Handle strategy selection
  const handleStrategySelect = (strategySlug: string) => {
    router.push(`/option/strategies/${strategySlug}`, { scroll: true });
  };

  // Handle back from strategy detail
  const handleStrategyBack = () => {
    router.push('/option/strategies', { scroll: false });
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
                <SlotKicker icon={Layers} label="Options Derivatives & Volatility" tone="accent" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Options Education
                </h1>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs touch-manipulation gap-1">
              <TabsTrigger 
                value="viewer" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                <span className="block md:hidden">Viewer</span>
                <span className="hidden md:block">Options Viewer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="topics" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                <span className="block md:hidden">Articles</span>
                <span className="hidden md:block">Research Articles</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strategies" 
                className="text-xs md:text-sm py-2.5 px-1 md:px-3 rounded-xl font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all leading-tight touch-manipulation"
              >
                Strategies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewer" className="mt-2 md:mt-6">
              <ViewerTab />
            </TabsContent>
            
            <TabsContent value="topics" className="mt-0">
              <TopicsTab subtopic={subtopic} />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-2 md:mt-6">
              <OptionsArticlesTab />
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-2 md:mt-6">
              <StrategyExplorer 
                selectedStrategyId={strategyId}
                onStrategySelect={handleStrategySelect}
                onBack={handleStrategyBack}
              />
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