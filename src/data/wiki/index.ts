import { ArticleLabel } from "@/data/articles/types";

export interface WikiEntry {
  path: string; // e.g. "option-strategy/gex"
  title: string;
  articleSlug: string;
  date: string; // ISO date
  labels?: ArticleLabel[];
  summary: string;
}

// Newest first. New entries are prepended here by the sophie-deep-research-article skill.
export const wikiEntries: WikiEntry[] = [
  {
    path: "option-strategy/vix",
    title: "Cboe Volatility Index (VIX)",
    articleSlug: "mathematics-microstructure-cboe-vix",
    date: "2026-07-24",
    labels: [ArticleLabel.QUANT],
    summary:
      "A comprehensive quantitative guide to the VIX — from stochastic variance replication and discrete approximation to market microstructure dynamics, derivatives ecosystems, and the August 2024 liquidity shock.",
  },
  {
    path: "option-strategy/gex",
    title: "Gamma Exposure (GEX)",
    articleSlug: "gamma-exposure-gex-gps-market-volatility",
    date: "2026-08-02",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "How dealer gamma positioning drives market maker hedging flows, and why positive vs. negative gamma regimes dampen or amplify volatility.",
  },
];

export function getWikiEntryByPath(path: string): WikiEntry | undefined {
  return wikiEntries.find((entry) => entry.path === path);
}

export function getWikiEntryForArticle(articleSlug: string): WikiEntry | undefined {
  return wikiEntries.find((entry) => entry.articleSlug === articleSlug);
}

export function getWikiCategories(): string[] {
  const categories = wikiEntries.map((entry) => entry.path.split("/")[0]);
  return [...new Set(categories)];
}

export function getWikiEntriesByCategory(category: string): WikiEntry[] {
  return wikiEntries.filter((entry) => entry.path.split("/")[0] === category);
}
