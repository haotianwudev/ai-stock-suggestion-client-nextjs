"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Flame, Search, ArrowUpDown } from "lucide-react";
import { GET_QUANT_TRENDING } from "@/lib/graphql/queries";
import { QuantTrendingResult, QuantTrendingItem } from "@/lib/graphql/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SlotKicker } from "@/components/articles/article-frame";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ---------------------------------------------------------------------------
// Source config
// ---------------------------------------------------------------------------

const SOURCES = [
  { key: "all",        label: "All" },
  { key: "arxiv",      label: "ArXiv" },
  { key: "github",     label: "GitHub" },
  { key: "reddit",     label: "Reddit" },
  { key: "hackernews", label: "Hacker News" },
  { key: "googlenews", label: "Google News" },
];

const SOURCE_BADGE: Record<string, string> = {
  arxiv:      "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
  github:     "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  reddit:     "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800",
  hackernews: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
  googlenews: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
};

function normalizeSource(source?: string): string {
  if (!source) return "";
  const s = source.toLowerCase().replace(/[-_\s]/g, "");
  if (s === "google" || s === "googlenews" || s === "gnews" || s === "news") return "googlenews";
  if (s === "hn" || s === "hackernews") return "hackernews";
  return s;
}

function sourceLabel(source: string) {
  const norm = normalizeSource(source);
  return SOURCES.find(s => s.key === norm)?.label ?? source;
}

function sourceBadgeClass(source: string) {
  const norm = normalizeSource(source);
  return SOURCE_BADGE[norm] ?? "bg-slate-100 text-slate-700";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function timeAgo(isoStr?: string): string {
  if (!isoStr) return "";
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-full" />
        </div>
      ))}
    </div>
  );
}

function HeatBar({ score }: { score: number }) {
  const pct = Math.round(Math.min(Math.max(score, 0), 100));
  const color =
    pct >= 75 ? "bg-red-500" :
    pct >= 50 ? "bg-orange-400" :
    pct >= 25 ? "bg-yellow-400" :
    "bg-blue-300";
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{pct}</span>
    </div>
  );
}

function ItemCard({ item }: { item: QuantTrendingItem }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-2 shadow-xs transition-all duration-200 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:shadow-md">
      {/* Title */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors leading-snug line-clamp-2 block"
      >
        {item.title}
      </a>

      {/* Description */}
      {item.description && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-gray-200/80 dark:border-gray-800/80">
        <Badge
          variant="outline"
          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${sourceBadgeClass(item.source)}`}
        >
          {sourceLabel(item.source)}
        </Badge>
        <HeatBar score={item.heatScore} />
        {item.author && <span className="truncate max-w-[140px]">{item.author}</span>}
        <span className="ml-auto font-mono text-[11px]">{timeAgo(item.publishedAt || item.fetchedAt)}</span>
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {item.tags.slice(0, 5).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemList({ items }: { items: QuantTrendingItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No items found.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {items.map(item => (
        <ItemCard key={`${item.source}-${item.id}`} item={item} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

export function QuantTrendingClient() {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "heat">("date");

  // Fetch all sources up front — tab switching is instant (no re-fetch)
  const { data, loading, error } = useQuery<{ quantTrending: QuantTrendingResult }>(
    GET_QUANT_TRENDING,
    { variables: { limit: 200 }, fetchPolicy: "cache-and-network" }
  );

  const rawItems = data?.quantTrending?.items ?? [];
  const lastUpdated = data?.quantTrending?.lastUpdated;

  // Sort items (default by Latest ETL Run Date DESC)
  const allItems = useMemo(() => {
    return [...rawItems].sort((a, b) => {
      const fetchA = a.fetchedAt ? new Date(a.fetchedAt).getTime() : 0;
      const fetchB = b.fetchedAt ? new Date(b.fetchedAt).getTime() : 0;
      const pubA = a.publishedAt ? new Date(a.publishedAt).getTime() : fetchA;
      const pubB = b.publishedAt ? new Date(b.publishedAt).getTime() : fetchB;

      if (sortBy === "date") {
        if (fetchB !== fetchA) return fetchB - fetchA; // Newest ETL fetch first
        if (pubB !== pubA) return pubB - pubA;       // Newest publish date second
        return (b.heatScore ?? 0) - (a.heatScore ?? 0);
      } else {
        const heatA = a.heatScore ?? 0;
        const heatB = b.heatScore ?? 0;
        if (heatB !== heatA) return heatB - heatA;
        if (fetchB !== fetchA) return fetchB - fetchA;
        return pubB - pubA;
      }
    });
  }, [rawItems, sortBy]);

  // Filter by search text
  const filtered = useMemo(() => {
    if (!searchText.trim()) return allItems;
    const q = searchText.toLowerCase();
    return allItems.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [allItems, searchText]);

  // Per-source slices for tab content
  const bySource = useMemo(() => {
    const map: Record<string, QuantTrendingItem[]> = { all: filtered };
    for (const s of SOURCES.slice(1)) {
      map[s.key] = filtered.filter(item => normalizeSource(item.source) === s.key);
    }
    return map;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-1.5">
          <SlotKicker icon={Flame} label="Real-Time Quant Pulse" tone="accent" />
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Quant Trending
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Trending quant finance content from ArXiv, GitHub, Reddit, Hacker News, and Google News.
            {lastUpdated && <> Updated {timeAgo(lastUpdated)}.</>}
          </p>
        </div>
        {/* Count badge */}
        {allItems.length > 0 && (
          <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-mono font-semibold text-[#A8672E] dark:text-[#D08F52] shadow-xs shrink-0">
            {allItems.length} items
          </span>
        )}
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, author, or tag..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 text-xs sm:text-sm shadow-xs transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs text-xs">
          <span className="text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1 font-medium text-[11px]">
            <ArrowUpDown className="h-3 w-3" /> Sort:
          </span>
          <button
            type="button"
            onClick={() => setSortBy("date")}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              sortBy === "date"
                ? "bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52]"
            }`}
          >
            Newest Date
          </button>
          <button
            type="button"
            onClick={() => setSortBy("heat")}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              sortBy === "heat"
                ? "bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52]"
            }`}
          >
            Heat Score
          </button>
        </div>
      </div>

      {/* Content */}
      {loading && !data ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-4 text-xs sm:text-sm text-red-700 dark:text-red-300">
          Failed to load trending data. Please try again later.
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="flex-wrap h-auto gap-1 mb-4 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
            {SOURCES.map(s => (
              <TabsTrigger
                key={s.key}
                value={s.key}
                className="text-xs sm:text-sm py-1.5 px-3 rounded-xl text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
              >
                {s.label}
                <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                  {bySource[s.key]?.length ?? 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {SOURCES.map(s => (
            <TabsContent key={s.key} value={s.key}>
              <ItemList items={bySource[s.key] ?? []} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
