"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, DollarSign, LineChart, BarChart4, BookOpen } from "lucide-react";
import { GreeksTab } from "@/components/options/greeks-tab";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
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

export default function OptionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-xl mx-auto py-4 md:py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Options Education</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master the fundamentals of options trading through interactive learning modules, 
              from basic concepts to advanced strategies.
            </p>
          </div>

          <Tabs defaultValue="when-to-trade" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="when-to-trade">When to Trade</TabsTrigger>
              <TabsTrigger value="option-greeks">Option Greeks</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="articles">Research Articles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="when-to-trade" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">When to Use Options</CardTitle>
                  <CardDescription>
                    Understand the key scenarios where options can be an effective trading and investment tool.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Use Case Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          Hedging Risk
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Protect existing positions from adverse price movements. 
                          Buy puts to hedge long stock positions or calls to hedge short positions.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          Speculation with Leverage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Control a larger position with less capital. 
                          Options provide leveraged exposure to price movements with defined risk.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                          Income Generation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Sell covered calls or cash-secured puts to generate premium income 
                          on existing holdings or available cash.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart4 className="h-5 w-5 text-orange-600" />
                          Volatility Betting
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Trade on your expectations of volatility changes rather than just price direction. 
                          Profit from volatility expansion or contraction.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-indigo-200 bg-indigo-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <LineChart className="h-5 w-5 text-indigo-600" />
                          Capital Efficiency
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Achieve similar exposure to stocks with less capital, 
                          freeing up funds for other investments or risk management.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Warning Section */}
                  <Card className="border-red-200 bg-red-50/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-700">
                        ⚠️ When NOT to Use Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-red-600 space-y-2">
                        <p><strong>• As a "get rich quick" scheme:</strong> Options require skill and knowledge to use effectively.</p>
                        <p><strong>• Without understanding the Greeks:</strong> Don't trade what you don't understand.</p>
                        <p><strong>• When you can't afford the maximum loss:</strong> Options can expire worthless.</p>
                        <p><strong>• Without a clear strategy:</strong> Random option buying often leads to losses.</p>
                        <p><strong>• In illiquid options:</strong> Wide bid-ask spreads can hurt profitability.</p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="option-greeks" className="mt-6">
              <GreeksTab />
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Option Strategies</CardTitle>
                  <CardDescription>
                    Learn about different option trading strategies (Coming Soon).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    This section will cover various option strategies including covered calls, 
                    protective puts, straddles, strangles, iron condors, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="articles" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Options Research Article Summaries
                  </CardTitle>
                  <CardDescription>
                    Comprehensive summaries of essential options trading books and research articles covering key concepts, strategies, and common pitfalls to avoid.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {articles
                      .filter(article => article.options === true)
                      .map((article) => (
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
                        />
                      ))}
                  </div>
                  {articles.filter(article => article.options === true).length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No options articles available yet. Check back soon!
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Disclaimer />
    </div>
  );
} 