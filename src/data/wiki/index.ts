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
    path: "quant/sdlc-quantitative-development",
    title: "SDLC for Quantitative Development",
    articleSlug: "advanced-gitlab-sdlc-quantitative-development-ci-cd-best-practices",
    date: "2026-07-30",
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
    summary:
      "A structured DevSecOps lifecycle for quant finance teams — covering GitLab CI/CD pipelines, trunk-based development, Jupyter notebook tooling (nbstripout, Jupytext, ReviewNB), DVC for large data versioning, DAG-optimized pipeline execution, and continuous compliance via the Four Eyes principle, CODEOWNERS, SAST/DAST, and secret detection.",
  },
  {
    path: "option-strategy/volatility-surface",
    title: "The Volatility Surface",
    articleSlug: "decoding-volatility-surface-advanced-market-prediction-options-flow",
    date: "2026-08-01",
    labels: [ArticleLabel.QUANT, ArticleLabel.OPTIONS],
    summary:
      "A three-dimensional map of implied volatility across strikes and maturities. Covers skew morphology (smirk → flattening → forward/mania), sticky-strike vs. sticky-delta regimes, and the four quantitative compass metrics — 25Δ risk reversal, put-call ratio, normalized skew, and gamma exposure (GEX) — for identifying sustainable trends vs. fragile, leverage-fueled rallies.",
  },
  {
    path: "finance101/form-13f",
    title: "Form 13F Disclosures",
    articleSlug: "hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk",
    date: "2026-08-13",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "How the SEC's quarterly 13F disclosure regime creates predictable microstructure events — covering HFT latency arbitrage (~70ms parse times), the economics of copycat investing (5.5–8.5% excess alpha), the originator's performance tax (~2.6% drag), confidential treatment mechanics, and the systemic implications of Form SHO integration in 2026.",
  },
  {
    path: "macro/fixed-income-turning-points",
    title: "Fixed-Income Market Turning Points",
    articleSlug: "quantitative-assessment-fixed-income-market-turning-points",
    date: "2026-08-10",
    labels: [ArticleLabel.MARCO],
    summary:
      "A quantitative framework for identifying structural turning points in fixed-income markets — covering yield curve dynamics, term premium decomposition, the neutral rate (r*), OAS credit spread analysis, and technical signals for bear-market termination.",
  },
  {
    path: "finance101/etf-architecture",
    title: "ETF Architecture",
    articleSlug: "architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks",
    date: "2026-08-07",
    labels: [ArticleLabel.QUANT, ArticleLabel.FINANCE101],
    summary:
      "A comprehensive deep dive into ETF mechanics — from regulatory frameworks and the dual-market architecture to tax efficiency via the heartbeat trade, execution strategies for low-liquidity ETFs, volatility decay in leveraged products, and the USO contango anomaly.",
  },
  {
    path: "quant/mean-reversion",
    title: "Mean Reversion & Statistical Arbitrage",
    articleSlug: "quantitative-trading-mean-reversion-factor-models-execution-dynamics",
    date: "2026-08-04",
    labels: [ArticleLabel.QUANT],
    summary:
      "A quantitative framework that exploits temporary pricing inefficiencies across diversified portfolios. Covers factor models, Ornstein-Uhlenbeck stochastic processes, execution dynamics, and robust research practices.",
  },
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
