"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, ExternalLinkIcon, TrendingUpIcon, InfoIcon, LineChart } from "lucide-react";
import { useEffect, useState, Suspense, lazy } from "react";
import Image from "next/image";
import { TrendingUp, Trophy, GraduationCap, LucideLineChart, Shield, Users, BookOpen, Mic } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleFilter, getFilteredArticles } from "@/components/articles/article-filter";
import type { ArticleFilter as ArticleFilterType } from "@/components/articles/article-filter";
import { articles } from "@/data/articles";
import { useRouter } from "next/navigation";

// Lazy load heavy components
const DynamicApolloComponents = lazy(() => import("@/components/stock/apollo-stock-data"));
const DynamicStickyPodcastPlayer = lazy(() => import("@/components/ui/sticky-podcast-player").then(module => ({ default: module.StickyPodcastPlayer })));

// Loading skeletons
const StockCardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-4 h-32"></div>
);

const StockDataSkeleton = () => (
  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:max-w-4xl mx-auto">
    {[1, 2, 3].map(i => (
      <StockCardSkeleton key={i} />
    ))}
  </div>
);

export default function Home() {
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookPassword, setBookPassword] = useState("");
  const [bookError, setBookError] = useState("");
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<ArticleFilterType>('all');
  const [showStockData, setShowStockData] = useState(false);
  const router = useRouter();
  
  // Lazy load stock data after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStockData(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Reset show all articles when filter changes
  const handleFilterChange = (filter: ArticleFilterType) => {
    setSelectedFilter(filter);
    setShowAllArticles(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-4 pb-2 pt-6 md:pb-4 md:pt-8 lg:py-8">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center max-w-[64rem] mx-auto">
              <div className="flex items-center gap-4">
                <Link href="/about">
                  <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-purple-300 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200">
                    <Image 
                      src="/images/agents/SOPHIE.png"
                      alt="SOPHIE" 
                      width={96} 
                      height={96}
                      className="object-cover"
                      priority
                    />
                  </div>
                </Link>
                <Link href="/about">
                  <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl cursor-pointer hover:scale-105 transition-transform duration-200">
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
                  </h1>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/trending">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    AI Stocks Analysis
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/option">
                    <LineChart className="mr-2 h-4 w-4" />
                    Option Strategies
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/book-summary">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Premium Books
                  </Link>
                </Button>

                <Button asChild size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                  <a 
                    href="https://www.youtube.com/@SOPHIEAIFinance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube Channel
                  </a>
                </Button>

                <Button asChild size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                  <a 
                    href="https://open.spotify.com/show/1LVAoacNfDyzrEf9bwrVM9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.295.479-1.02.659-1.559.359z"/>
                    </svg>
                    Spotify Podcast
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a 
                    href="https://expo.dev/artifacts/eas/suf2rGRxaZbbecneq36JrS.apk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12" y2="20" />
                    </svg>
                    Download Android App
                  </a>
                </Button>
                
                <Button asChild size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
                  <a 
                    href="https://discord.com/channels/1379865130665250927/1379865132213076051" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.767 18.767 0 00-5.487 0 12.683 12.683 0 00-.617-1.25.07.07 0 00-.073-.035A19.736 19.736 0 003.683 4.369a.064.064 0 00-.03.027C.533 9.09-.32 13.579.099 18.021a.07.07 0 00.028.048c2.052 1.507 4.042 2.422 5.992 3.029a.07.07 0 00.076-.027c.461-.63.873-1.295 1.226-1.994a.07.07 0 00-.038-.098c-.652-.247-1.27-.549-1.872-.892a.07.07 0 01-.007-.117c.126-.094.252-.192.372-.291a.07.07 0 01.071-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.072.009c.12.099.246.198.372.292a.07.07 0 01-.006.117 12.298 12.298 0 01-1.873.891.07.07 0 00-.038.099c.36.698.772 1.362 1.225 1.993a.07.07 0 00.076.028c1.95-.607 3.94-1.522 5.992-3.029a.07.07 0 00.028-.048c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" fill="currentColor"/></svg>
                    Connect in Discord
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/about">
                    <Users className="mr-2 h-4 w-4" />
                    Meet SOPHIE's Daddy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Access Stock Cards - Lazy loaded */}
        <section className="container max-w-screen-xl mx-auto py-0 md:py-1 px-4">
          {showStockData ? (
            <Suspense fallback={<StockDataSkeleton />}>
              <DynamicApolloComponents />
            </Suspense>
          ) : (
            <StockDataSkeleton />
          )}
        </section>
        
        {/* Articles Section */}
        <section className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12 border-t border-border px-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Interactive Articles
            </h2>
          </div>
          
          {/* Article Filter */}
          <div className="flex justify-center">
            <ArticleFilter 
              selectedFilter={selectedFilter} 
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Pinned Article as Featured */}
          {articles.find(article => article.pinned && !article.bookSummary) && (
            <div className="mb-8 relative">
              <div className="absolute -top-3 left-3 z-10">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded shadow">Featured</span>
              </div>
              <ArticleCard
                key={articles.find(article => article.pinned && !article.bookSummary)!.slug}
                title={articles.find(article => article.pinned && !article.bookSummary)!.title}
                description={articles.find(article => article.pinned && !article.bookSummary)!.description}
                slug={articles.find(article => article.pinned && !article.bookSummary)!.slug}
                date={articles.find(article => article.pinned && !article.bookSummary)!.date}
                imageUrl={articles.find(article => article.pinned && !article.bookSummary)!.imageUrl}
                googleDoc={articles.find(article => article.pinned && !article.bookSummary)!.googleDoc}
                deepResearch={articles.find(article => article.pinned && !article.bookSummary)!.deepResearch}
                youtubeUrl={articles.find(article => article.pinned && !article.bookSummary)!.youtubeUrl}
                isVideo={articles.find(article => article.pinned && !article.bookSummary)!.isVideo}
                options={articles.find(article => article.pinned && !article.bookSummary)!.options}
                noSummary={articles.find(article => article.pinned && !article.bookSummary)!.noSummary}
                podcastUrl={articles.find(article => article.pinned && !article.bookSummary)!.podcastUrl}
              />
            </div>
          )}
          
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {getFilteredArticles(articles, selectedFilter)
              .filter(article => !article.pinned && !article.bookSummary) // Exclude pinned articles and book summaries (premium content)
              .slice(0, showAllArticles ? undefined : 12)
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
                noSummary={article.noSummary}
                podcastUrl={article.podcastUrl}
              />
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {(() => {
            const filteredArticles = getFilteredArticles(articles, selectedFilter).filter(article => !article.pinned && !article.bookSummary);
            return filteredArticles.length > 12 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setShowAllArticles(!showAllArticles)}
                  variant="outline"
                  size="lg"
                >
                  {showAllArticles ? 'Show Less' : `Show All ${filteredArticles.length} Articles`}
                </Button>
              </div>
            );
          })()}
        </section>
        
        {/* Disclaimer */}
        <Disclaimer />
      </main>
      
      {/* Lazy load podcast player */}
      <Suspense fallback={null}>
        <DynamicStickyPodcastPlayer />
      </Suspense>
    </div>
  );
}
