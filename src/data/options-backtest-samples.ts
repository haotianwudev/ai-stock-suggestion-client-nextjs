// Empirical grounding for the Strategy Explorer's illustrative payoff diagrams.
//
// The diagrams use a synthetic $100 demo spot price (same convention for every strategy, so
// charts stay comparable) — these constants are NOT live prices, they're real backtested
// strike-distance and credit ratios rescaled onto that $100 base, replacing arbitrary round
// numbers with values a real 45 DTE SPX position actually produced.
//
// Source: sophie-option-research (F:/workspace/sophie-option-research), OptionsDX SPX EOD
// chains, 2010-2023 — historical, not live/current. Computed 2026-08-14 from local backtest
// results (results/trades/*.parquet), joined against real SPX daily closes at entry.

// Iron Condor's static illustration (previously grounded here from the same 165-trade sample)
// was superseded by the fully interactive real-chain builder — see iron-condor-builder.tsx and
// sophie-option-research/scripts/export_spx_chain_sample.py.

export const SHORT_PUT_DEMO = {
    // Source: short_put_45dte baseline config (result hash 53ebc2077897), 275 real trades.
    // Real medians: short strike 2.2% OTM, credit 0.88% of spot.
    strike1: 97.8,
    premium: 0.88,
};
