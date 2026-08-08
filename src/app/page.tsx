"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LineChart, Users, Globe, TrendingUp, Sigma, Rss, Check, Crown } from "lucide-react";
import { useEffect, useState, Suspense, lazy } from "react";
import Image from "next/image";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleFilter, getFilteredArticles, getAllLabels } from "@/components/articles/article-filter";
import { articles } from "@/data/articles";
import { useUser } from "@/hooks/use-user";
import { canAccessPremiumContent } from "@/lib/tiers";

// Lazy load heavy components
const DynamicApolloComponents = lazy(() => import("@/components/stock/apollo-stock-data"));
const DynamicStickyPodcastPlayer = lazy(() => import("@/components/ui/sticky-podcast-player").then(module => ({ default: module.StickyPodcastPlayer })));
const DynamicClockWidget = lazy(() => import("@/components/investment-clock/clock-widget").then(m => ({ default: m.InvestmentClockWidget })));
const DynamicTrendingWidget = lazy(() => import("@/components/quant-trending/trending-widget").then(m => ({ default: m.QuantTrendingWidget })));

// Loading skeleton for the compact hero stock cards
const CompactStockSkeleton = () => (
  <div className="grid gap-2 grid-cols-1 min-[480px]:grid-cols-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="animate-pulse bg-muted rounded-lg h-20" />
    ))}
  </div>
);

// Core feature pillars shown under the hero
const FEATURE_PILLARS = [
  {
    href: "/trending",
    icon: TrendingUp,
    title: "Stocks Analysis",
    description: "AI-assisted analysis of trending stocks",
  },
  {
    href: "/option",
    icon: LineChart,
    title: "Option Strategies",
    description: "Options strategy research and trade ideas",
  },
  {
    href: "/quant",
    icon: Sigma,
    title: "Quant Finance",
    description: "Quantitative models and market research",
  },
  {
    href: "/neighborhood",
    icon: Globe,
    title: "Quant Neighborhood",
    description: "Curated voices from the quant community",
  },
];

// External channels, collapsed into a compact icon row
const SOCIAL_LINKS = [
  {
    href: "https://www.youtube.com/@SOPHIEAIFinance",
    label: "YouTube Channel",
    colorClass: "bg-red-600 hover:bg-red-700 text-white",
    icon: (
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://open.spotify.com/show/1LVAoacNfDyzrEf9bwrVM9",
    label: "Podcast on Spotify",
    colorClass: "bg-green-600 hover:bg-green-700 text-white",
    icon: (
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.295.479-1.02.659-1.559.359z" />
      </svg>
    ),
  },
  {
    href: "https://space.bilibili.com/1485896958",
    label: "Bilibili频道",
    colorClass: "bg-pink-500 hover:bg-pink-600 text-white",
    icon: (
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906l-1.174 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.764.283 1.396.789 1.894.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.13.789-1.894v-7.52c-.02-.765-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
      </svg>
    ),
  },
  {
    href: "https://xhslink.com/m/26R3QGSdpiH",
    label: "小红书互动加群",
    colorClass: "bg-red-500 hover:bg-red-600 text-white",
    icon: (
      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.185-.459-.185-.628 0l-2.24 2.24c-.169.169-.169.459 0 .628l2.24 2.24c.169.169.459.169.628 0 .169-.169.169-.459 0-.628L15.256 12l2.312-2.312c.169-.169.169-.459 0-.628zM8.432 15.84c.169.185.459.185.628 0l2.24-2.24c.169-.169.169-.459 0-.628l-2.24-2.24c-.169-.169-.459-.169-.628 0-.169.169-.169.459 0 .628L10.744 12l-2.312 2.312c-.169.169-.169.459 0 .628z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [showStockData, setShowStockData] = useState(false);
  const [rssCopied, setRssCopied] = useState(false);

  const { profile } = useUser();
  const canViewPremium = canAccessPremiumContent(profile?.tier ?? 1);
  const isAdmin = profile?.tier === 9;

  // Get all predefined labels
  const availableLabels = getAllLabels();

  // Lazy load stock data after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStockData(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setShowAllArticles(false);
  };

  const handleLabelsChange = (labels: string[]) => {
    setSelectedLabels(labels);
    setShowAllArticles(false);
  };

  const handleCopyRSSFeed = async () => {
    try {
      await navigator.clipboard.writeText('https://www.sophie-ai-finance.com/rss.xml');
    } catch (err) {
      // Fallback for browsers that don't support clipboard API — still show feedback
    }
    setRssCopied(true);
    setTimeout(() => setRssCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero: value prop on the left, live product widgets on the right */}
        <section className="pb-4 pt-6 md:pt-10 lg:pt-12">
          <div className="container max-w-screen-2xl mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center max-w-6xl mx-auto">

              {/* Left: headline, tagline, CTAs, social icons */}
              <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
                <div className="flex items-center gap-4">
                  <Link href="/about">
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-primary/40 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200">
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
                    <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl cursor-pointer hover:scale-105 transition-transform duration-200">
                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
                    </h1>
                  </Link>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground">
                  SOPHIE Daddy Quant Blog
                </p>

                {/* Core feature shortcuts */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                  {FEATURE_PILLARS.map((pillar) => (
                    <Link
                      key={pillar.href}
                      href={pillar.href}
                      className="group rounded-xl border bg-card p-3 sm:p-5 text-left transition-all hover:shadow-md hover:border-primary/40"
                    >
                      <div className="flex items-center gap-2">
                        <pillar.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                        <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground hidden sm:block">
                        {pillar.description}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Compact social/utility row */}
                <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-colors ${social.colorClass}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                  <button
                    onClick={handleCopyRSSFeed}
                    aria-label="Copy RSS Feed URL"
                    title={rssCopied ? "Copied!" : "Copy RSS Feed URL"}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${rssCopied
                        ? "border-primary/40 text-primary bg-accent"
                        : "border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent"
                      }`}
                  >
                    {rssCopied ? <Check className="h-4 w-4" /> : <Rss className="h-4 w-4" />}
                  </button>
                  <span className="mx-1 h-4 w-px bg-border hidden sm:block" />
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Meet SOPHIE Daddy
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                    >
                      <Crown className="h-3.5 w-3.5" />
                      Admin
                    </Link>
                  )}

                </div>
              </div>

              {/* Right: live product UI as the hero visual */}
              <div className="space-y-3 w-full">
                <Suspense fallback={<div className="animate-pulse rounded-xl border border-border bg-card h-64" />}>
                  <DynamicClockWidget />
                </Suspense>
                <Suspense fallback={<div className="animate-pulse rounded-xl border border-border bg-card h-24" />}>
                  <DynamicTrendingWidget />
                </Suspense>
                {showStockData ? (
                  <Suspense fallback={<CompactStockSkeleton />}>
                    <DynamicApolloComponents compact />
                  </Suspense>
                ) : (
                  <CompactStockSkeleton />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="container max-w-screen-2xl mx-auto space-y-6 py-8 md:py-12 border-t border-border px-4">
          <div className="flex flex-col items-center space-y-4 text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Interactive Articles
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Explore {articles.filter(a => canViewPremium ? true : !a.premiumContent).length}+ articles on quantitative finance, options trading, and market analysis
            </p>
          </div>

          {/* Article Filter */}
          <div className="max-w-4xl mx-auto">
            <ArticleFilter
              searchText={searchText}
              onSearchChange={handleSearchChange}
              selectedLabels={selectedLabels}
              onLabelsChange={handleLabelsChange}
              availableLabels={availableLabels}
            />
          </div>

          {/* Pinned Article as Featured */}
          {(() => {
            const pinnedArticle = getFilteredArticles(articles, '', []).find(article => article.pinned && (canViewPremium || !article.premiumContent));
            const shouldShowPinned = searchText === '' && selectedLabels.length === 0;
            return pinnedArticle && shouldShowPinned && (
              <div className="mb-8 relative">
                <div className="absolute -top-3 left-3 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded shadow">Featured</span>
                </div>
                <ArticleCard
                  key={pinnedArticle.slug}
                  title={pinnedArticle.title}
                  description={pinnedArticle.description}
                  slug={pinnedArticle.slug}
                  date={pinnedArticle.date}
                  imageUrl={pinnedArticle.imageUrl}
                  googleDoc={pinnedArticle.googleDoc}
                  deepResearch={pinnedArticle.deepResearch}
                  youtubeUrl={pinnedArticle.youtubeUrl}
                  isVideo={pinnedArticle.isVideo}
                  options={pinnedArticle.options}
                  noSummary={pinnedArticle.noSummary}
                  podcastUrl={pinnedArticle.podcastUrl}
                  websiteUrl={pinnedArticle.websiteUrl}
                />
              </div>
            );
          })()}

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {getFilteredArticles(articles, searchText, selectedLabels)
              .filter(article => !article.pinned && (canViewPremium || !article.premiumContent))
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
                  websiteUrl={article.websiteUrl}
                />
              ))}
          </div>

          {/* Results Count and Show More/Less Button */}
          {(() => {
            const filteredArticles = getFilteredArticles(articles, searchText, selectedLabels)
              .filter(article => !article.pinned && (canViewPremium || !article.premiumContent));
            const displayedCount = showAllArticles ? filteredArticles.length : Math.min(12, filteredArticles.length);

            return (
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-sm text-muted-foreground">
                  Showing {displayedCount} of {filteredArticles.length} articles
                </p>
                {filteredArticles.length > 12 && (
                  <Button
                    onClick={() => setShowAllArticles(!showAllArticles)}
                    variant="outline"
                    size="lg"
                  >
                    {showAllArticles ? 'Show Less' : `Show All ${filteredArticles.length} Articles`}
                  </Button>
                )}
                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No articles found matching your filters.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* Disclaimer */}
        <Disclaimer />
      </main>

      {/* Lazy load podcast player */}
      <div className="hidden sm:block">
        <Suspense fallback={null}>
          <DynamicStickyPodcastPlayer />
        </Suspense>
      </div>
    </div>
  );
}
