// Provenance for the bundled SPX chain snapshot used by the interactive Iron Condor builder.
//
// The actual data lives at /public/data/spx-chain-sample.json (not imported here — at ~1.5MB it
// would bloat the JS bundle if statically imported, so it's fetched on-demand at runtime by
// getChainSnapshot() in src/lib/options/chain-provider.ts, only when the interactive tool opens).
//
// Source: sophie-option-research (F:/workspace/sophie-option-research), OptionsDX SPX EOD chains
// — historical, not live. Exported via scripts/export_spx_chain_sample.py, quote_date 2023-12-29
// (the most recent trading day in the local dataset), all 55 expirations / 18,080 contracts.

export const SPX_CHAIN_SAMPLE_PATH = '/data/spx-chain-sample.json';
export const SPX_CHAIN_SAMPLE_QUOTE_DATE = '2023-12-29';
