"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Flame, Search, ArrowUpDown } from "lucide-react";
import { GET_QUANT_TRENDING } from "@/lib/graphql/queries";
import { QuantTrendingResult, QuantTrendingItem } from "@/lib/graphql/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-2">
        {/* Title */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold leading-snug hover:underline line-clamp-2 block"
        >
          {item.title}
        </a>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/40">
          <Badge
            variant="outline"
            className={`text-[10px] px-2 py-0 font-semibold ${sourceBadgeClass(item.source)}`}
          >
            {sourceLabel(item.source)}
          </Badge>
          <HeatBar score={item.heatScore} />
          {item.author && <span className="truncate max-w-[140px]">{item.author}</span>}
          <span className="ml-auto">{timeAgo(item.publishedAt || item.fetchedAt)}</span>
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 5).map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
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
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="h-5 w-5 text-orange-500" />
            <h1 className="text-2xl font-bold tracking-tight">Quant Trending</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Trending quant finance content from ArXiv, GitHub, Reddit, Hacker News, and Google News.
            {lastUpdated && <> Updated {timeAgo(lastUpdated)}.</>}
          </p>
        </div>
        {/* Count badge */}
        {allItems.length > 0 && (
          <Badge variant="outline" className="self-start sm:self-auto text-xs shrink-0">
            {allItems.length} items
          </Badge>
        )}
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by title, author, or tag..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-muted/60 p-1 rounded-lg border text-xs">
          <span className="text-muted-foreground px-1.5 flex items-center gap-1 font-medium">
            <ArrowUpDown className="h-3 w-3" /> Sort:
          </span>
          <button
            type="button"
            onClick={() => setSortBy("date")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              sortBy === "date"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Newest Date
          </button>
          <button
            type="button"
            onClick={() => setSortBy("heat")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              sortBy === "heat"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
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
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load trending data. Please try again later.
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="flex-wrap h-auto gap-1 mb-4">
            {SOURCES.map(s => (
              <TabsTrigger key={s.key} value={s.key} className="text-xs sm:text-sm">
                {s.label}
                <span className="ml-1.5 text-[10px] text-muted-foreground">
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
