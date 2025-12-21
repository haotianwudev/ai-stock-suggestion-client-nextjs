"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, DollarSign, LineChart, BarChart4, BookOpen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { OptionsViewer } from "@/components/options/options-viewer";
import { VRPContent } from "../topics/vrp";
import { WhenToTradeContent } from "../topics/when-to-trade";
import { GreeksContent } from "../topics/greeks";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { ArticleFilter, getFilteredArticles, getAllLabels } from "@/components/articles/article-filter";
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
  const [activeSubtopic, setActiveSubtopic] = useState(subtopic || 'when-to-trade');

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
        <TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t">
          <TabsTrigger 
            value="when-to-trade" 
            className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto data-[state=active]:bg-slate-200"
          >
            When to Trade
          </TabsTrigger>
          <TabsTrigger 
            value="greeks" 
            className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto data-[state=active]:bg-slate-200"
          >
            Option Greeks
          </TabsTrigger>
          <TabsTrigger 
            value="vrp" 
            className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto data-[state=active]:bg-slate-200"
          >
            VRP
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="when-to-trade" className="mt-0">
          <WhenToTradeContent />
        </TabsContent>
        
        <TabsContent value="greeks" className="mt-0">
          <GreeksContent />
        </TabsContent>
        
        <TabsContent value="vrp" className="mt-0">
          <VRPContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
function OptionsArticlesTab() {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const availableLabels = getAllLabels();

  const optionsArticles = getFilteredArticles(articles, searchText, selectedLabels)
    .filter(article => article.options === true && !article.bookSummary);

  return (
    <Card>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
          <span>Options Research Articles</span>
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Comprehensive articles on options trading covering key concepts, strategies, and common pitfalls to avoid.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filter Component */}
        <ArticleFilter 
          searchText={searchText}
          onSearchChange={setSearchText}
          selectedLabels={selectedLabels}
          onLabelsChange={setSelectedLabels}
          availableLabels={availableLabels}
        />

        {/* Articles Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
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
            />
          ))}
        </div>

        {/* No Results Message */}
        {optionsArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found matching your filters.</p>
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

  // Update active tab when prop changes
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'topics') {
      // For topics, use the subtopic or default to when-to-trade
      const defaultSubtopic = subtopic || 'when-to-trade';
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
        <div className="container max-w-screen-xl mx-auto py-4 px-4 md:py-8 md:px-6">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-md border-2 border-purple-300 flex-shrink-0">
                <Image 
                  src="/images/agents/SOPHIE.png"
                  alt="SOPHIE AI Agent" 
                  width={80} 
                  height={80}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Options Education
                </h1>
                <p className="text-sm md:text-base text-purple-600 font-medium">SOPHIE Daddy Quant Blog</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto md:h-10 gap-1 md:gap-0 p-1">
              <TabsTrigger 
                value="viewer" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Options Viewer
              </TabsTrigger>
              <TabsTrigger 
                value="topics" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger 
                value="articles" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Research Articles
              </TabsTrigger>
              <TabsTrigger 
                value="strategies" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Strategies
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewer" className="mt-4 md:mt-6">
              <OptionsViewer />
            </TabsContent>
            
            <TabsContent value="topics" className="mt-0">
              <TopicsTab subtopic={subtopic} />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-4 md:mt-6">
              <OptionsArticlesTab />
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-4 md:mt-6">
              <StrategyExplorer 
                selectedStrategyId={strategyId}
                onStrategySelect={handleStrategySelect}
                onBack={handleStrategyBack}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Disclaimer />
    </div>
  );
}