'use client';

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Globe, ExternalLink, BookOpen, TrendingUp, Brain, BarChart2 } from "lucide-react";
import { SlotKicker } from "@/components/articles/article-frame";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

export interface NeighborhoodSite {
  name: string;
  url: string;
  description: string;
  tags: string[];
  category: 'blog' | 'tool' | 'research' | 'community' | 'data';
  featured?: boolean;
  imageUrl?: string;
  selectedArticles?: string[];
}

const categoryConfig: Record<NeighborhoodSite['category'], { label: string; color: string; icon: React.ReactNode }> = {
  blog: { label: 'Blog', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20', icon: <BookOpen className="h-3 w-3" /> },
  tool: { label: 'Tool', color: 'bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20', icon: <TrendingUp className="h-3 w-3" /> },
  research: { label: 'Research', color: 'bg-[#A8672E]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20', icon: <Brain className="h-3 w-3" /> },
  community: { label: 'Community', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20', icon: <Globe className="h-3 w-3" /> },
  data: { label: 'Data', color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20', icon: <BarChart2 className="h-3 w-3" /> },
};

const neighborhoodSites: NeighborhoodSite[] = [
  {
    name: "Theta.md",
    url: "https://theta.md",
    description: "An independent quant research platform with a falsification-first approach. Their supply chain signal work demonstrates how naive cross-industry correlations (69% hit rate) collapse to statistical insignificance (55%, p=0.416) once industry beta, SOX index, and FX factors are controlled — a masterclass in separating real alpha from noise.",
    tags: ["Supply Chain", "Signal Isolation", "Multi-Factor", "Cross-Industry", "Options"],
    category: "research",
    featured: true,
    imageUrl: "https://i.imgur.com/vqAxsnD.png",
    selectedArticles: [
      "supply-chain",
    ],
  },
  {
    name: "The Gift of the Phantom Trader",
    url: "https://tradertom.com/resource/the-phantom-of-the-pits/",
    description: "The original writings of the 'Phantom of the Pits' — a legendary anonymous floor trader whose insights were chronicled by Art Simpson on the Futures Magazine forums in the late 1990s. A timeless masterclass on why trading success is about superior behavior modification, not superior knowledge.",
    tags: ["Trading Psychology", "Risk Management", "Behavior", "Floor Trading", "Classic"],
    category: "research",
    featured: true,
    imageUrl: "https://i.imgur.com/UAA2o4e.png",
    selectedArticles: [
      "gift-phantom-trader-psychology-winning-through-losing",
    ],
  },
  {
    name: "SqueezeMetrics DIX",
    url: "https://squeezemetrics.com/monitor/dix",
    description: "The Dark Index (DIX) tracks dark pool short volume as a contrarian sentiment indicator. When dark pool participants are heavily shorting, it often signals institutional accumulation — a unique window into smart money positioning.",
    tags: ["Dark Pool", "Sentiment", "Market Structure", "GEX", "Options Flow"],
    category: "data",
    featured: true,
    imageUrl: "https://i.imgur.com/CHqsRTd.png",
    selectedArticles: [
      "dark-index-dix-understanding-short-is-long-market-microstructure",
    ],
  },
];

function NeighborhoodEntry({ site }: { site: NeighborhoodSite }) {
  const cat = categoryConfig[site.category];
  const relatedArticles = site.selectedArticles
    ? site.selectedArticles
        .map(slug => articles.find(a => a.slug === slug))
        .filter((a): a is NonNullable<typeof a> => a !== undefined)
    : [];

  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-xs hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all duration-200 ${site.featured ? 'ring-1 ring-[#A8672E]/20 dark:ring-[#D08F52]/20' : ''}`}>
      {/* Clickable site header */}
      <a href={site.url} target="_blank" rel="noopener noreferrer" className="block group">
        {site.imageUrl && (
          <div className="overflow-hidden border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
            <img
              src={site.imageUrl}
              alt={`${site.name} preview`}
              className="w-full h-auto max-h-48 object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="p-5 pb-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-serif font-bold text-base md:text-lg text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors truncate">
                {site.name}
              </h3>
              {site.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] text-[10px] font-bold font-mono uppercase tracking-wider shrink-0">
                  Featured
                </span>
              )}
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors shrink-0 mt-0.5" />
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold w-fit ${cat.color}`}>
            {cat.icon}
            {cat.label}
          </span>
        </div>
        <div className="px-5 pb-5 pt-0 space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {site.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {site.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] hover:underline truncate">{site.url}</p>
        </div>
      </a>

      {/* Related articles inside the card */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-800/80 px-5 pb-5 pt-4 space-y-3 bg-gray-50/40 dark:bg-gray-800/20">
          <h4 className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider font-mono">Related Articles</h4>
          <div className="space-y-3">
            {relatedArticles.map(article => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug ?? ''}
                date={article.date}
                imageUrl={article.imageUrl}
                googleDoc={article.googleDoc}
                websiteUrl={article.websiteUrl}
                deepResearch={article.deepResearch}
                youtubeUrl={article.youtubeUrl}
                bilibiliUrl={article.bilibiliUrl}
                bilibiliTitle={article.bilibiliTitle}
                isVideo={article.isVideo}
                options={article.options}
                noSummary={article.noSummary}
                podcastUrl={article.podcastUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NeighborhoodPage() {
  const featured = neighborhoodSites.filter(s => s.featured);
  const rest = neighborhoodSites.filter(s => !s.featured);

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-8 px-4 md:py-12 md:px-6">
          {/* Hero */}
          <div className="text-center mb-10 md:mb-14 space-y-2">
            <div className="flex justify-center">
              <SlotKicker icon={Globe} label="Curated Ecosystem" tone="accent" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Quant Neighborhood
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Interesting websites, blogs, and tools from the quant and options community worth bookmarking.
            </p>
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="space-y-4 mb-10">
              <h2 className="text-xs font-bold font-mono text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider">Featured Research & Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                {featured.map(site => (
                  <NeighborhoodEntry key={site.url} site={site} />
                ))}
              </div>
            </div>
          )}

          {/* All Sites */}
          {rest.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">All Community Sites</h2>
              <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 items-start">
                {rest.map(site => <NeighborhoodEntry key={site.url} site={site} />)}
              </div>
            </div>
          )}
        </div>
      </main>

      <Disclaimer />
    </div>
  );
}
