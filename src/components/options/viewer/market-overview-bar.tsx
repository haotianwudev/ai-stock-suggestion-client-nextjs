"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Clock, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

/**
 * Market-wide SPX picture. Everything here is WHOLE BOOK or index-level — never a single
 * expiration. Per-cycle numbers live in the cycle summary panel below the date strip; keeping
 * the two visually and structurally separate is the point of this component, since the previous
 * HUD showed selected-expiration figures in a banner that read as a market summary.
 */

export type VolRegimeLabel = 'Harvest' | 'Thin' | 'Stressed Premium' | 'Crisis' | string;

export interface MarketOverviewProps {
  ticker: string;
  spotPrice: number;
  priceChange: number;
  percentChange: number;

  /** Index-level implied vol. */
  vix: number | null;
  vixPercentChange: number | null;

  /** Vol regime / VRP — precomputed daily in the pipeline, point-in-time (no lookahead). */
  regime: VolRegimeLabel | null;
  vrp: number | null;
  vrpZ: number | null;
  realizedVol20d: number | null;
  vixRank: number | null;
  termSlope: number | null;
  regimeAsOf: string | null;

  /** Whole-book gamma exposure, $M per 1% move. */
  netGex: number | null;
  gammaFlip: number | null;
  callWall: number | null;
  putWall: number | null;

  /** Whole-book positioning across every listed cycle. */
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

const REGIME_STYLE: Record<string, string> = {
  'Harvest': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Thin': 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  'Stressed Premium': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Crisis': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const REGIME_MEANING: Record<string, string> = {
  'Harvest': 'Implied running well above realized in a calm tape — historically the most favourable backdrop for selling premium.',
  'Thin': 'Implied barely exceeds realized. Gap risk for a thin credit.',
  'Stressed Premium': 'Sellers are paid more than usual, but vol is elevated or the curve is backwardated. ~27% chance of becoming Crisis within a month.',
  'Crisis': 'Implied is below realized — the index is delivering more movement than options are pricing. Short vol is uncompensated here.',
};

function fmtSigned(n: number | null, digits = 2): string {
  if (n === null || Number.isNaN(n)) return '—';
  return `${n >= 0 ? '+' : ''}${n.toFixed(digits)}`;
}

function fmtCompact(n: number | null): string {
  if (n === null || Number.isNaN(n)) return '—';
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}M`;
  return `${n.toFixed(0)}k`;
}

/** One labelled cell in the dark band. */
function BandStat({
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
      className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 min-w-[104px]"
      title={hint}
    >
      <div className="flex items-center gap-1">
        <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wide">{label}</span>
        {hint && <HelpCircle className="h-2.5 w-2.5 text-slate-600" />}
      </div>
      <div className={`font-mono font-bold text-sm mt-0.5 ${tone ?? 'text-slate-100'}`}>{value}</div>
      {sub && <div className="text-[10px] text-slate-500 font-mono mt-0.5">{sub}</div>}
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

  const formatCacheTime = (sec: number | null) => {
    if (sec === null) return 'Live';
    if (sec < 60) return `${sec}s ago`;
    return `${Math.floor(sec / 60)}m ago`;
  };

  const backwardated = termSlope !== null && termSlope < 0;

  return (
    <div className="rounded-2xl border border-[#2D2B28] bg-[#1C1B19] text-white shadow-xs overflow-hidden">
      {/* Row 1 — index level */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 pb-4">
        <div className="flex flex-wrap items-center gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold tracking-tight text-white">{ticker}</span>
              <Badge variant="outline" className="border-white/15 bg-white/5 text-slate-300 text-[10px] font-mono px-2 py-0.5">
                Cboe Delayed Feed
              </Badge>
              <Badge variant="outline" className="border-white/15 bg-white/5 text-slate-400 text-[10px] font-mono px-2 py-0.5">
                Whole book · {cycleCount} cycles
              </Badge>
            </div>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold tracking-tight">
                ${spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`flex items-center text-xs sm:text-sm font-mono font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="h-3.5 w-3.5 mr-1 inline" /> : <TrendingDown className="h-3.5 w-3.5 mr-1 inline" />}
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-10 w-px bg-white/10" />

          {/* Vol regime — the "is premium rich / is the tape stressed" read */}
          <div className="flex flex-wrap items-center gap-2">
            <BandStat
              label="VIX"
              value={vix !== null ? vix.toFixed(2) : '—'}
              sub={vixPercentChange !== null ? `${vixPercentChange >= 0 ? '+' : ''}${vixPercentChange.toFixed(1)}%` : undefined}
              tone="text-[#D08F52]"
              hint="Index-level 30-day implied volatility, live from the Cboe feed."
            />
            {regime && (
              <div
                className={`rounded-xl px-3 py-2 border ${REGIME_STYLE[regime] ?? REGIME_STYLE['Thin']}`}
                title={REGIME_MEANING[regime] ?? ''}
              >
                <span className="block text-[10px] font-mono uppercase tracking-wide opacity-70">Regime</span>
                <span className="font-mono font-bold text-sm">{regime}</span>
                {regimeAsOf && <span className="block text-[10px] font-mono opacity-60 mt-0.5">as of {regimeAsOf}</span>}
              </div>
            )}
            <BandStat
              label="VRP"
              value={fmtSigned(vrp, 2)}
              sub={vrpZ !== null ? `z ${fmtSigned(vrpZ, 2)}` : undefined}
              tone={vrp !== null && vrp >= 0 ? 'text-emerald-400' : 'text-rose-400'}
              hint="Quoted variance risk premium: VIX minus trailing 20-session realized vol, in vol points. Point-in-time — no lookahead."
            />
            <BandStat
              label="Realized 20d"
              value={realizedVol20d !== null ? realizedVol20d.toFixed(2) : '—'}
              sub={vixRank !== null ? `VIX rank ${(vixRank * 100).toFixed(0)}%` : undefined}
              hint="Annualized stdev of the last 20 sessions' log returns (sample, x sqrt(252)) — the realized side of VRP."
            />
            <BandStat
              label="Term"
              value={termSlope !== null ? fmtSigned(termSlope, 2) : '—'}
              sub={termSlope !== null ? (backwardated ? 'backwardated' : 'contango') : undefined}
              tone={backwardated ? 'text-rose-400' : 'text-slate-100'}
              hint="VIX3M minus VIX. Negative (backwardation) means near-term stress is being priced above 3-month vol."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right hidden md:block">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Cached: {formatCacheTime(cacheAgeSeconds)}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              15m cooldown ({canRefreshNow ? 'Ready' : 'Locked'})
            </span>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white transition-all text-xs font-semibold shadow-xs ${loading ? 'opacity-70' : ''}`}
            title={canRefreshNow ? 'Fetch fresh quotes from Cboe' : 'Quotes cached (cooldown active)'}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-[#D08F52]' : 'text-slate-400'}`} />
            <span>{loading ? 'Updating…' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Row 2 — dealer positioning across the whole book */}
      <div className="border-t border-white/10 bg-black/20 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-1">
            Dealer book
          </span>

          <div
            className={`rounded-xl px-3 py-2 border ${
              longGamma
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-rose-500/10 border-rose-500/30'
            }`}
            title={
              longGamma
                ? 'Net long gamma: dealer hedging leans against moves, which historically damps realized volatility and favours mean reversion.'
                : 'Net SHORT gamma: dealer hedging amplifies moves — selling into weakness and buying into strength. Trend and gap risk both rise.'
            }
          >
            <span className="block text-[10px] font-mono uppercase tracking-wide text-slate-400">Net GEX</span>
            <span className={`font-mono font-bold text-sm ${longGamma ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netGex !== null ? `${netGex >= 0 ? '+' : ''}$${(netGex / 1000).toFixed(2)}B` : '—'}
            </span>
            <span className={`block text-[10px] font-mono mt-0.5 ${longGamma ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
              {netGex === null ? '' : longGamma ? 'long gamma · damped' : 'short gamma · amplified'}
            </span>
          </div>

          <BandStat
            label="Gamma flip"
            value={gammaFlip !== null ? `$${gammaFlip.toLocaleString()}` : '—'}
            sub={flipPct !== null ? `${flipPct >= 0 ? '+' : ''}${flipPct.toFixed(2)}% from spot` : undefined}
            tone={gammaFlip !== null && gammaFlip > spotPrice ? 'text-rose-400' : 'text-emerald-400'}
            hint="Spot level where whole-book net gamma crosses zero, found by re-pricing every contract's gamma with Black-Scholes. Above spot means the book is currently short gamma."
          />
          <BandStat
            label="Call wall"
            value={callWall !== null ? `$${callWall.toLocaleString()}` : '—'}
            sub={callWall !== null ? `+${(((callWall - spotPrice) / spotPrice) * 100).toFixed(1)}%` : undefined}
            hint="Strike carrying the largest call-side gamma above spot — commonly read as overhead resistance."
          />
          <BandStat
            label="Put wall"
            value={putWall !== null ? `$${putWall.toLocaleString()}` : '—'}
            sub={putWall !== null ? `${(((putWall - spotPrice) / spotPrice) * 100).toFixed(1)}%` : undefined}
            hint="Strike carrying the largest put-side gamma below spot — commonly read as downside support."
          />

          <div className="hidden lg:block h-9 w-px bg-white/10 mx-1" />

          <BandStat
            label="P/C vol"
            value={bookPutCallVolRatio !== null ? bookPutCallVolRatio.toFixed(2) : '—'}
            sub={
              bookPutCallVolRatio === null
                ? undefined
                : bookPutCallVolRatio > 1 ? 'put heavy' : 'call heavy'
            }
            hint="Put/call ratio by today's volume, summed across every listed cycle."
          />
          <BandStat
            label="P/C OI"
            value={bookPutCallOIRatio !== null ? bookPutCallOIRatio.toFixed(2) : '—'}
            hint="Put/call ratio by open interest across the whole book — resting positioning rather than today's flow."
          />
          <BandStat
            label="Book OI"
            value={fmtCompact(bookTotalOpenInterest !== null ? bookTotalOpenInterest / 1000 : null)}
            sub={`vol ${fmtCompact(bookTotalVolume / 1000)}`}
            hint="Total open interest and volume across all listed expirations. SPX and SPXW contracts are summed — they are separate products that both carry real size."
          />
        </div>
      </div>
    </div>
  );
}
