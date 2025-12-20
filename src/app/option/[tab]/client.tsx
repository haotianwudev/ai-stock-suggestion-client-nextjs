"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, DollarSign, LineChart, BarChart4, BookOpen } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GreeksTab } from "@/components/options/greeks-tab";
import { OptionsViewer } from "@/components/options/options-viewer";
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
}

// Options Articles Tab Component with Filtering
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

export default function OptionsTabClient({ tab }: OptionsTabClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);

  // Update active tab when prop changes
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = `/option/${value}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-xl mx-auto py-4 px-4 md:py-8 md:px-6">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Options Education</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Master the fundamentals of options trading through interactive learning modules, 
              from basic concepts to advanced strategies.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto md:h-10 gap-1 md:gap-0 p-1">
              <TabsTrigger 
                value="viewer" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Options Viewer
              </TabsTrigger>
              <TabsTrigger 
                value="when-to-trade" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                When to Trade
              </TabsTrigger>
              <TabsTrigger 
                value="greeks" 
                className="text-xs md:text-sm py-2 md:py-1.5 px-2 md:px-3 min-h-[44px] md:min-h-auto"
              >
                Option Greeks
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
            
            <TabsContent value="when-to-trade" className="space-y-4 md:space-y-6 mt-4 md:mt-6">
              <Card>
                <CardHeader className="pb-4 md:pb-6">
                  <CardTitle className="text-xl md:text-2xl">When to Use Options</CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Understand the key scenarios where options can be an effective trading and investment tool.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  {/* Use Case Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                          <span className="leading-tight">Hedging Risk</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          Protect existing positions from adverse price movements. 
                          Buy puts to hedge long stock positions or calls to hedge short positions.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                          <span className="leading-tight">Speculation with Leverage</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          Control a larger position with less capital. 
                          Options provide leveraged exposure to price movements with defined risk.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50/50">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
                          <span className="leading-tight">Income Generation</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          Sell covered calls or cash-secured puts to generate premium income 
                          on existing holdings or available cash.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50/50">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <BarChart4 className="h-4 w-4 md:h-5 md:w-5 text-orange-600 flex-shrink-0" />
                          <span className="leading-tight">Volatility Betting</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          Trade on your expectations of volatility changes rather than just price direction. 
                          Profit from volatility expansion or contraction.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-indigo-200 bg-indigo-50/50 sm:col-span-2 lg:col-span-1">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <LineChart className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 flex-shrink-0" />
                          <span className="leading-tight">Capital Efficiency</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          Achieve similar exposure to stocks with less capital, 
                          freeing up funds for other investments or risk management.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Warning Section */}
                  <Card className="border-red-200 bg-red-50/50">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="text-base md:text-lg text-red-700">
                        ⚠️ When NOT to Use Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-red-600 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                          <span className="font-semibold">• As a "get rich quick" scheme:</span>
                          <span>Options require skill and knowledge to use effectively.</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                          <span className="font-semibold">• Without understanding the Greeks:</span>
                          <span>Don't trade what you don't understand.</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                          <span className="font-semibold">• When you can't afford the maximum loss:</span>
                          <span>Options can expire worthless.</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                          <span className="font-semibold">• Without a clear strategy:</span>
                          <span>Random option buying often leads to losses.</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                          <span className="font-semibold">• In illiquid options:</span>
                          <span>Wide bid-ask spreads can hurt profitability.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="greeks" className="mt-4 md:mt-6">
              <GreeksTab />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-4 md:mt-6">
              <OptionsArticlesTab />
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-4 md:mt-6">
              <StrategyExplorer />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Disclaimer />
    </div>
  );
}