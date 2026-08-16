"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Flame, ExternalLink } from "lucide-react";
import { GET_QUANT_TRENDING } from "@/lib/graphql/queries";
import { QuantTrendingResult, QuantTrendingItem } from "@/lib/graphql/types";

// ---------------------------------------------------------------------------
// Source styles
// ---------------------------------------------------------------------------

const SOURCE_STYLES: Record<string, { badge: string; label: string }> = {
  arxiv:      { badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",       label: "ArXiv" },
  github:     { badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",       label: "GitHub" },
  reddit:     { badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300", label: "Reddit" },
  hackernews: { badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300", label: "HN" },
  googlenews: { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", label: "Google News" },
};

function normalizeSource(source?: string): string {
  if (!source) return "";
  const s = source.toLowerCase().replace(/[-_\s]/g, "");
  if (s === "google" || s === "googlenews" || s === "gnews" || s === "news") return "googlenews";
  if (s === "hn" || s === "hackernews") return "hackernews";
  return s;
}

function timeAgo(isoStr?: string): string {
  if (!isoStr) return "";
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ---------------------------------------------------------------------------
// Widget
// ---------------------------------------------------------------------------

export function QuantTrendingWidget() {
  const router = useRouter();
  const { data, loading } = useQuery<{ quantTrending: QuantTrendingResult }>(
    GET_QUANT_TRENDING,
    { variables: { limit: 50 }, fetchPolicy: "cache-and-network" }
  );

  // Pick a random item from the top 10 newest results (stable per render via useMemo)
  const item: QuantTrendingItem | null = useMemo(() => {
    const items = data?.quantTrending?.items;
    if (!items || items.length === 0) return null;
    const sorted = [...items].sort((a, b) => {
      const fetchA = a.fetchedAt ? new Date(a.fetchedAt).getTime() : 0;
      const fetchB = b.fetchedAt ? new Date(b.fetchedAt).getTime() : 0;
      if (fetchB !== fetchA) return fetchB - fetchA;
      const pubA = a.publishedAt ? new Date(a.publishedAt).getTime() : fetchA;
      const pubB = b.publishedAt ? new Date(b.publishedAt).getTime() : fetchB;
      return pubB - pubA;
    });
    const topRecent = sorted.slice(0, 10);
    return topRecent[Math.floor(Math.random() * topRecent.length)];
  }, [data]);

  const total = data?.quantTrending?.total ?? 0;

  if (loading && !data) {
    return <div className="animate-pulse rounded-xl border border-border bg-card h-24" />;
  }

  if (!item) return null;

  const normSource = normalizeSource(item.source);
  const src = SOURCE_STYLES[normSource] ?? { badge: "bg-slate-100 text-slate-700", label: item.source };
  const heat = Math.round(Math.min(Math.max(item.heatScore, 0), 100));
  const heatColor =
    heat >= 75 ? "bg-red-500" :
    heat >= 50 ? "bg-orange-400" :
    heat >= 25 ? "bg-yellow-400" :
    "bg-blue-300";

  return (
    <div
      className="block group cursor-pointer"
      onClick={() => router.push("/forum?tab=quant-trending")}
    >
      <div className="rounded-xl border-2 border-purple-500/20 bg-purple-500/5 px-4 py-3 transition-all hover:shadow-lg hover:scale-[1.005]">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Quant Trending
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${src.badge}`}>
              {src.label}
            </span>
          </div>
          <Link
            href="/forum?tab=quant-trending"
            onClick={e => e.stopPropagation()}
            className="shrink-0 text-[11px] font-medium flex items-center gap-0.5 text-purple-500 hover:gap-1.5 transition-all"
          >
            {total > 0 ? `${total} items` : "See all"} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Item title + description — clicking goes to /quant-trending */}
        <p className="text-sm font-medium leading-snug line-clamp-2">
          {item.title}
        </p>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border/40">
          {/* Heat bar */}
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full ${heatColor}`} style={{ width: `${heat}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground">{heat}</span>
          </div>
          {item.author && (
            <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{item.author}</span>
          )}
          <span className="text-[10px] text-muted-foreground">
            {timeAgo(item.publishedAt || item.fetchedAt)}
          </span>
          {/* External link — opens source directly, stops navigation to /quant-trending */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Open source <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
