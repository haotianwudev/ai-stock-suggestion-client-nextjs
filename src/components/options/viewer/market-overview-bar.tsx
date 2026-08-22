"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Market-wide SPX picture. Everything here is WHOLE BOOK or index-level — never a single
 * expiration. Per-cycle numbers live in the cycle summary panel below the date strip; keeping
 * the two visually and structurally separate is the point of this component, since the previous
 * HUD showed selected-expiration figures in a banner that read as a market summary.
 *
 * Styling follows the same theme-aware card language as every other panel in the viewer
 * (white / gray-900 surfaces, #A8672E / #D08F52 accent). Stat cells are plain tinted blocks
 * rather than individually bordered boxes — at this density, a border on every cell reads as
 * noise and made the panel feel much heavier than the information in it warranted.
 */

export type VolRegimeLabel = 'Harvest' | 'Thin' | 'Stressed Premium' | 'Crisis' | string;

export interface MarketOverviewProps {
  ticker: string;
  spotPrice: number;
  priceChange: number;
  percentChange: number;

  vix: number | null;
  vixPercentChange: number | null;

  regime: VolRegimeLabel | null;
  vrp: number | null;
  vrpZ: number | null;
  realizedVol20d: number | null;
  vixRank: number | null;
  termSlope: number | null;
  regimeAsOf: string | null;

  netGex: number | null;
  gammaFlip: number | null;
  callWall: number | null;
  putWall: number | null;

  bookPutCallVolRatio: number | null;
  bookPutCallOIRatio: number | null;
  bookTotalVolume: number;
  bookTotalOpenInterest: number | null;
  cycleCount: number;

  loading: boolean;
  onRefresh: () => void;
  canRefreshNow: boolean;
  cacheAgeSeconds: number | null;
}

/** Regime pill colours — tuned so both themes keep readable contrast on a tinted background. */
const REGIME_STYLE: Record<string, string> = {
  'Harvest':
    'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  'Thin':
    'bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-500/30',
  'Stressed Premium':
    'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
  'Crisis':
    'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
};

const REGIME_MEANING: Record<string, string> = {
  'Harvest': 'Implied running well above realized in a calm tape — historically the most favourable backdrop for selling premium.',
  'Thin': 'Implied barely exceeds realized. Gap risk for a thin credit.',
  'Stressed Premium': 'Sellers are paid more than usual, but vol is elevated or the curve is backwardated. ~27% chance of becoming Crisis within a month.',
  'Crisis': 'Implied is below realized — the index is delivering more movement than options are pricing. Short vol is uncompensated here.',
};

const POS = 'text-emerald-600 dark:text-emerald-400';
const NEG = 'text-rose-600 dark:text-rose-400';
const ACCENT = 'text-[#A8672E] dark:text-[#D08F52]';

function fmtSigned(n: number | null, digits = 2): string {
  if (n === null || Number.isNaN(n)) return '—';
  return `${n >= 0 ? '+' : ''}${n.toFixed(digits)}`;
}

function fmtCompact(n: number | null): string {
  if (n === null || Number.isNaN(n)) return '—';
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}M`;
  return `${n.toFixed(0)}k`;
}

/** One stat cell. No border by design — the tint alone separates it from the surface. */
function Stat({
  label,
  value,
  sub,
  tone,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: string;
  hint?: string;
}) {
  return (
    <div
      className="rounded-lg bg-gray-50 dark:bg-gray-800/40 px-3 py-2 min-w-0"
      title={hint}
    >
      <div className="text-[10px] font-mono uppercase tracking-wide text-slate-500 dark:text-slate-400 truncate">
        {label}
      </div>
      <div className={`font-mono font-bold text-sm mt-0.5 truncate ${tone ?? 'text-slate-900 dark:text-slate-100'}`}>
        {value}
      </div>
      {sub && (
        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">{sub}</div>
      )}
    </div>
  );
}

/** Small caps label that introduces a group of stats. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
      {children}
    </div>
  );
}

export function MarketOverviewBar(props: MarketOverviewProps) {
  const {
    ticker, spotPrice, priceChange, percentChange,
    vix, vixPercentChange, regime, vrp, vrpZ, realizedVol20d, vixRank, termSlope, regimeAsOf,
    netGex, gammaFlip, callWall, putWall,
    bookPutCallVolRatio, bookPutCallOIRatio, bookTotalVolume, bookTotalOpenInterest, cycleCount,
    loading, onRefresh, canRefreshNow, cacheAgeSeconds,
  } = props;

  const isPositive = priceChange >= 0;
  const longGamma = netGex !== null && netGex >= 0;
  const flipDistance = gammaFlip !== null ? gammaFlip - spotPrice : null;
  const flipPct = flipDistance !== null && spotPrice > 0 ? (flipDistance / spotPrice) * 100 : null;
  const backwardated = termSlope !== null && termSlope < 0;

  const formatCacheTime = (sec: number | null) => {
    if (sec === null) return 'Live';
    if (sec < 60) return `${sec}s ago`;
    return `${Math.floor(sec / 60)}m ago`;
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
      {/* Header — index level, scope badge, refresh */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif font-bold text-sm tracking-wide text-slate-900 dark:text-slate-100">
            {ticker}
          </span>
          <span className="text-2xl font-mono font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-slate-100">
            ${spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={`flex items-center text-xs font-mono font-semibold ${isPositive ? POS : NEG}`}>
            {isPositive ? <TrendingUp className="h-3.5 w-3.5 mr-1" /> : <TrendingDown className="h-3.5 w-3.5 mr-1" />}
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
          </span>

          {regime && (
            <span
              className={`inline-flex items-baseline gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-bold ${
                REGIME_STYLE[regime] ?? REGIME_STYLE['Thin']
              }`}
              title={REGIME_MEANING[regime] ?? ''}
            >
              {regime}
              {regimeAsOf && <span className="font-normal opacity-70 text-[10px]">as of {regimeAsOf}</span>}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Badge
            variant="outline"
            className="text-[10px] font-mono px-2 py-0.5 border-gray-200 dark:border-gray-800 text-slate-500 dark:text-slate-400"
          >
            Whole book · {cycleCount} cycles
          </Badge>
          <span className="hidden md:flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            {formatCacheTime(cacheAgeSeconds)}
            <span className="opacity-70">· {canRefreshNow ? 'ready' : 'locked'}</span>
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-slate-700 dark:text-slate-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all text-xs font-semibold ${
              loading ? 'opacity-70' : ''
            }`}
            title={canRefreshNow ? 'Fetch fresh quotes from Cboe' : 'Quotes cached (cooldown active)'}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? `animate-spin ${ACCENT}` : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{loading ? 'Updating…' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Two stat groups, same visual weight — volatility regime, then dealer positioning */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4 py-3">
        <div className="min-w-0">
          <GroupLabel>Volatility regime</GroupLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Stat
              label="VIX"
              value={vix !== null ? vix.toFixed(2) : '—'}
              sub={vixPercentChange !== null ? `${vixPercentChange >= 0 ? '+' : ''}${vixPercentChange.toFixed(1)}%` : undefined}
              tone={ACCENT}
              hint="Index-level 30-day implied volatility, live from the Cboe feed."
            />
            <Stat
              label="VRP"
              value={fmtSigned(vrp, 2)}
              sub={vrpZ !== null ? `z ${fmtSigned(vrpZ, 2)}` : undefined}
              tone={vrp !== null && vrp >= 0 ? POS : NEG}
              hint="Quoted variance risk premium: VIX minus trailing 20-session realized vol, in vol points. Point-in-time — no lookahead."
            />
            <Stat
              label="Realized 20d"
              value={realizedVol20d !== null ? realizedVol20d.toFixed(2) : '—'}
              sub={vixRank !== null ? `rank ${(vixRank * 100).toFixed(0)}%` : undefined}
              hint="Annualized stdev of the last 20 sessions' log returns (sample, × √252) — the realized side of VRP."
            />
            <Stat
              label="Term"
              value={termSlope !== null ? fmtSigned(termSlope, 2) : '—'}
              sub={termSlope !== null ? (backwardated ? 'backwardated' : 'contango') : undefined}
              tone={backwardated ? NEG : undefined}
              hint="VIX3M minus VIX. Negative (backwardation) means near-term stress is being priced above 3-month vol."
            />
          </div>
        </div>

        <div className="min-w-0">
          <GroupLabel>Dealer book</GroupLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div
              className={`rounded-lg px-3 py-2 min-w-0 ${
                longGamma
                  ? 'bg-emerald-50 dark:bg-emerald-500/10'
                  : 'bg-rose-50 dark:bg-rose-500/10'
              }`}
              title={
                longGamma
                  ? 'Net long gamma: dealer hedging leans against moves, which historically damps realized volatility and favours mean reversion.'
                  : 'Net SHORT gamma: dealer hedging amplifies moves — selling into weakness and buying into strength. Trend and gap risk both rise.'
              }
            >
              <div className="text-[10px] font-mono uppercase tracking-wide text-slate-500 dark:text-slate-400 truncate">
                Net GEX
              </div>
              <div className={`font-mono font-bold text-sm mt-0.5 truncate ${longGamma ? POS : NEG}`}>
                {netGex !== null ? `${netGex >= 0 ? '+' : ''}$${(netGex / 1000).toFixed(2)}B` : '—'}
              </div>
              <div className={`text-[10px] font-mono mt-0.5 truncate ${longGamma ? POS : NEG} opacity-80`}>
                {netGex === null ? '' : longGamma ? 'long · damped' : 'short · amplified'}
              </div>
            </div>

            <Stat
              label="Gamma flip"
              value={gammaFlip !== null ? `$${gammaFlip.toLocaleString()}` : '—'}
              sub={flipPct !== null ? `${flipPct >= 0 ? '+' : ''}${flipPct.toFixed(2)}%` : undefined}
              tone={gammaFlip !== null && gammaFlip > spotPrice ? NEG : POS}
              hint="Spot level where whole-book net gamma crosses zero, found by re-pricing every contract's gamma with Black-Scholes. Above spot means the book is currently short gamma."
            />
            <Stat
              label="Walls C / P"
              value={
                callWall !== null || putWall !== null
                  ? `${callWall !== null ? callWall.toLocaleString() : '—'} / ${putWall !== null ? putWall.toLocaleString() : '—'}`
                  : '—'
              }
              sub="gamma peaks"
              hint="Strike carrying the largest call-side gamma above spot, and the largest put-side gamma below — commonly read as resistance and support."
            />
            <Stat
              label="P/C vol / OI"
              value={`${bookPutCallVolRatio !== null ? bookPutCallVolRatio.toFixed(2) : '—'} / ${
                bookPutCallOIRatio !== null ? bookPutCallOIRatio.toFixed(2) : '—'
              }`}
              tone={bookPutCallVolRatio !== null && bookPutCallVolRatio > 1 ? NEG : undefined}
              sub={`OI ${fmtCompact(
                bookTotalOpenInterest !== null ? bookTotalOpenInterest / 1000 : null
              )} · vol ${fmtCompact(bookTotalVolume / 1000)}`}
              hint="Put/call ratio by today's volume and by resting open interest, with total book OI and volume across every listed cycle. SPX and SPXW are summed, since both carry real size."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
