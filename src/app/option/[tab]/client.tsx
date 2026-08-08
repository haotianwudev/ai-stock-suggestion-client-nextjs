"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { OptionsViewer } from "@/components/options/options-viewer";
import { VRPContent } from "../topics/vrp";
import { Option101Content } from "../topics/option101";
import { GreeksContent } from "../topics/greeks";
import { GEXContent } from "../topics/gex";
import { RollContent } from "../topics/roll";
import { VolatilityContent } from "../topics/volatility";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { ArticleFilter, getFilteredArticles, getAllLabels } from "@/components/articles/article-filter";
import { useUser } from "@/hooks/use-user";
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
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-6 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
          <TabsTrigger 
            value="option101" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block md:hidden">101</span>
            <span className="hidden md:block">Option 101</span>
          </TabsTrigger>
          <TabsTrigger 
            value="greeks" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block md:hidden">Greeks</span>
            <span className="hidden md:block">Option Greeks</span>
          </TabsTrigger>
          <TabsTrigger 
            value="roll" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block md:hidden">Roll</span>
            <span className="hidden md:block">Art of Roll</span>
          </TabsTrigger>
          <TabsTrigger 
            value="volatility" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            <span className="block md:hidden">Vol</span>
            <span className="hidden md:block">Volatility</span>
          </TabsTrigger>
          <TabsTrigger 
            value="vrp" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            VRP
          </TabsTrigger>
          <TabsTrigger 
            value="gex" 
            className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto data-[state=active]:bg-slate-200 leading-tight font-medium touch-manipulation"
          >
            GEX
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
      </Tabs>
    </div>
  );
}
function OptionsArticlesTab() {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const availableLabels = getAllLabels();
  const { profile } = useUser();
  const canViewPremium = canAccessPremiumContent(profile?.tier ?? 1);

  const optionsArticles = getFilteredArticles(articles, searchText, selectedLabels)
    .filter(article => article.options === true && (canViewPremium || !article.premiumContent));

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
          <BookOpen className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
          <span>Options Research Articles</span>
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Comprehensive articles on options trading covering key concepts, strategies, and common pitfalls to avoid.
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
            <p className="text-base md:text-lg text-muted-foreground">No articles found matching your filters.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Results Count */}
        {optionsArticles.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing {optionsArticles.length} article{optionsArticles.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
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
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-2 px-3 md:py-8 md:px-6">
          <div className="text-center mb-4 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4">
              <div 
                className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-md border-2 border-purple-300 flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Options Education
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-purple-600 font-medium">SOPHIE Daddy Quant Blog</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto md:h-10 gap-1 md:gap-0 p-1 touch-manipulation">
              <TabsTrigger 
                value="viewer" 
                className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                <span className="block md:hidden">Viewer</span>
                <span className="hidden md:block">Options Viewer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="topics" 
                className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                <span className="block md:hidden">Articles</span>
                <span className="hidden md:block">Research Articles</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strategies" 
                className="text-xs md:text-sm py-3 md:py-1.5 px-1 md:px-3 min-h-[48px] md:min-h-auto leading-tight font-medium touch-manipulation"
              >
                Strategies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewer" className="mt-2 md:mt-6">
              <OptionsViewer />
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