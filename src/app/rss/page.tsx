'use client';

import Link from 'next/link';
import { ArrowLeft, Rss, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Disclaimer } from '@/components/ui/disclaimer';
import { SlotKicker } from '@/components/articles/article-frame';
import { Badge } from '@/components/ui/badge';

export default function RSSPage() {
  const rssFeeds = [
    {
      title: 'All Articles',
      description: 'Complete feed of all articles from SOPHIE\'s Daddy Quant Blog',
      url: '/rss.xml',
      category: 'Main Feed',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Quantitative Finance',
      description: 'Advanced quantitative methods, mathematical models, and systematic trading strategies',
      url: '/rss/quantitative-finance',
      category: 'Specialized',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Options Trading',
      description: 'Options strategies, Greeks analysis, volatility trading, and derivatives',
      url: '/rss/options-trading',
      category: 'Specialized',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      title: 'Deep Research',
      description: 'Comprehensive analysis articles with detailed research and documentation',
      url: '/rss/deep-research',
      category: 'Content Type',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Video Content',
      description: 'YouTube tutorials and video explanations of complex financial concepts',
      url: '/rss/video-content',
      category: 'Content Type',
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'Podcast Episodes',
      description: 'Audio content and podcast episodes on Spotify',
      url: '/rss/podcast',
      category: 'Content Type',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Gen AI',
      description: 'Generative AI applications, LLMs, AI agents, and RAG architectures in finance',
      url: '/rss/gen-ai',
      category: 'Specialized',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'Machine Learning',
      description: 'Machine learning algorithms, deep learning models, and predictive analytics',
      url: '/rss/machine-learning',
      category: 'Specialized',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Stock Analysis',
      description: 'Individual stock analysis, DCF models, and equity research',
      url: '/rss/stock-analysis',
      category: 'Specialized',
      color: 'bg-teal-100 text-teal-800'
    },
    {
      title: 'Macro Views',
      description: 'Macroeconomic analysis, market outlook, and economic commentary',
      url: '/rss/macro-views',
      category: 'Specialized',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Finance 101',
      description: 'Educational content for beginners and foundational concepts',
      url: '/rss/finance-101',
      category: 'Educational',
      color: 'bg-cyan-100 text-cyan-800'
    },
    {
      title: 'Book Reviews',
      description: 'Reviews and summaries of finance and trading books',
      url: '/rss/book-review',
      category: 'Educational',
      color: 'bg-pink-100 text-pink-800'
    }
  ];

  const groupedFeeds = rssFeeds.reduce((acc, feed) => {
    if (!acc[feed.category]) {
      acc[feed.category] = [];
    }
    acc[feed.category].push(feed);
    return acc;
  }, {} as Record<string, typeof rssFeeds>);

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center space-y-3">
          <div className="flex justify-center">
            <SlotKicker icon={Rss} label="Syndication & Feeds" tone="accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
            RSS Feeds
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Stay updated with quantitative finance insights, options strategies, and market analysis in your favorite feed reader.
          </p>
        </div>

        {/* RSS Feeds */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 space-y-10">
          {Object.entries(groupedFeeds).map(([category, feeds]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xs font-bold font-mono text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {feeds.map((feed) => (
                  <div 
                    key={feed.url}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] shrink-0">
                            <Rss className="h-4 w-4" />
                          </div>
                          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">{feed.title}</h3>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400 shrink-0">
                          {feed.category}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-4 text-xs sm:text-sm leading-relaxed">
                        {feed.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/60">
                      <Link
                        href={feed.url}
                        className="inline-flex items-center px-3.5 py-1.5 bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] rounded-xl font-semibold transition-colors text-xs shadow-xs"
                      >
                        <Rss className="mr-1.5 h-3.5 w-3.5" />
                        Subscribe
                      </Link>
                      <Link
                        href={feed.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-xl transition-colors text-xs font-medium"
                      >
                        <ExternalLink className="mr-1.5 h-3 w-3" />
                        XML
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* How to Use Section */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100 mb-4">How to Use RSS Feeds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 font-mono uppercase tracking-wider text-xs">Popular RSS Readers</h3>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                  <li>• <strong>Feedly</strong> — Web-based reader with rich organization</li>
                  <li>• <strong>Inoreader</strong> — Power features and rule automation</li>
                  <li>• <strong>NetNewsWire / Reeder</strong> — Fast native macOS & iOS apps</li>
                  <li>• <strong>NewsBlur</strong> — Open-source reader and trainer</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 font-mono uppercase tracking-wider text-xs">Getting Started</h3>
                <ol className="space-y-1.5 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                  <li>Choose your preferred RSS client</li>
                  <li>Copy any feed link above or click &ldquo;Subscribe&rdquo;</li>
                  <li>Paste the XML URL into your reader</li>
                  <li>Receive updates automatically as new research publishes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Disclaimer />
    </div>
  );
}