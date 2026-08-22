"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  RefreshCw,
  AlertCircle,
  BarChart3,
  Gauge,
  Layers,
  Zap,
  Calendar,
  ShieldCheck,
  Clock,
  Database,
  Lock,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';
import { canAccessLiveOptions, MIN_LIVE_OPTIONS_TIER, getTierName } from '@/lib/tiers';
import { getPreferredOptionSource, OptionDataSource } from '@/lib/options/options-preferences';
import { LIVE_CHAIN_API_ENDPOINT as API_ENDPOINT, getChainSnapshot } from '@/lib/options/chain-provider';
import { adaptSnapshotToOptionsAPIResponse } from '@/lib/options/chain-adapters';
import {
  fetchWithOptionsCache,
  getCacheAgeSeconds,
  canRefresh,
  getValidCachedData,
  getLiveCacheIntervalMs
} from '@/lib/options/options-cache';
import { useQuery } from '@apollo/client';
import { GET_VOL_REGIME } from '@/lib/graphql/queries';
import { VolRegimeResult } from '@/lib/graphql/types';
import { computeGexProfile, type GexExpirationInput } from '@/lib/options/gex';
import { MarketOverviewBar } from './viewer/market-overview-bar';
import { CycleSummaryPanel } from './viewer/cycle-summary-panel';
import { OptionsMatrixTable, OptionContractData } from './viewer/options-matrix-table';
import { VolatilityChartView } from './viewer/volatility-chart-view';
import { PositioningChartView } from './viewer/positioning-chart-view';
import { GexChartView } from './viewer/gex-chart-view';

interface StockData {
  price: number;
  previousClose: number;
  percentChange: number;
  timestamp: string;
}

interface ExpirationData {
  expiration: string;
  daysToExpiration: number;
  expirationLabel: string;
  calls: OptionContractData[];
  puts: OptionContractData[];
}

export interface OptionsAPIResponse {
  ticker: string;
  stock: StockData;
  expirationDates: ExpirationData[];
  /** Live VIX from the Cboe feed. Absent on the historical-snapshot source, which has no
   *  index-level quote — the market band falls back to the pipeline's stored VIX there. */
  vix?: {
    value: number;
    previousClose: number;
    percentChange: number;
    timestamp: string;
  } | null;
}

type ExpirationCategory = 'key' | 'all';

// SPX lists ~55 expirations (near-dated dailies plus weeklies and LEAPS), but open
// interest is heavily concentrated in a handful of them. These helpers pick out the
// cycles that actually carry liquidity so the default strip isn't 55 chips wide.

/** Standard monthly expiration: the 3rd Friday, which always falls on the 15th-21st.
 *  AM-settled on SPX and the deepest open interest of any cycle. */
function isThirdFriday(dateStr: string): boolean {
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime()) || d.getDay() !== 5) return false;
  const dom = d.getDate();
  return dom >= 15 && dom <= 21;
}

function isFriday(dateStr: string): boolean {
  const d = new Date(`${dateStr}T00:00:00`);
  return !Number.isNaN(d.getTime()) && d.getDay() === 5;
}

// How many of each cycle type the default strip keeps. Non-Friday dailies are only
// worth showing at the very front (0DTE/1DTE trade heavily); past that, liquidity
// lives on Fridays, so mid-week cycles at 3-5 DTE just pad the strip.
const KEY_SHORT_TERM_MAX_DTE = 2;  // today + next session, any weekday
const KEY_WEEKLY_COUNT = 4;        // next 4 Friday weeklies
const KEY_MONTHLY_COUNT = 4;       // next 4 standard monthlies (~4 months out)
const KEY_LEAPS_TARGET_DTES = [365]; // ~1y long-term anchor

/** Compact open-interest label, e.g. 5354461 -> "5.4M", 404444 -> "404K". */
function formatOpenInterest(oi: number): string {
  if (oi >= 1_000_000) return `${(oi / 1_000_000).toFixed(1)}M`;
  if (oi >= 1_000) return `${Math.round(oi / 1_000)}K`;
  return `${oi}`;
}

/** Rank a cycle by its share of the busiest visible cycle's open interest.
 *  The cut-offs match how SPX OI actually clusters: monthlies sit far above
 *  everything else, Friday weeklies form a middle band, and mid-week dailies
 *  trail well below both. */
type LiquidityTier = 'deep' | 'active' | 'thin';
function liquidityTier(share: number): LiquidityTier {
  if (share >= 0.25) return 'deep';
  if (share >= 0.05) return 'active';
  return 'thin';
}

/** The liquid subset shown by default: near-term dailies, Friday weeklies, standard
 *  monthlies, and a couple of long-dated anchors — rather than all ~56 cycles. */
type ExpirationLike = { expiration: string; daysToExpiration: number };

function selectKeyExpirations<T extends ExpirationLike>(all: T[]): T[] {
  const keep = new Set<string>();

  // 1. Really short term — 0DTE/1DTE are among the most active SPX cycles, and at
  //    this horizon the weekday doesn't matter.
  for (const e of all) {
    if (e.daysToExpiration <= KEY_SHORT_TERM_MAX_DTE) keep.add(e.expiration);
  }

  // 2. Friday weeklies (monthlies get their own allowance below, so exclude them
  //    here or they'd eat into the weekly count).
  all.filter(e => isFriday(e.expiration) && !isThirdFriday(e.expiration))
    .slice(0, KEY_WEEKLY_COUNT)
    .forEach(e => keep.add(e.expiration));

  // 3. Standard monthlies — the deepest open interest on the board.
  const monthlies = all.filter(e => isThirdFriday(e.expiration));
  monthlies
    .filter(e => e.daysToExpiration > KEY_SHORT_TERM_MAX_DTE)
    .slice(0, KEY_MONTHLY_COUNT)
    .forEach(e => keep.add(e.expiration));

  // 4. One or two long-term anchors: the monthly nearest each LEAPS target, so the
  //    strip still reaches out a year or two without listing every LEAPS cycle.
  for (const target of KEY_LEAPS_TARGET_DTES) {
    const candidates = monthlies.filter(e => !keep.has(e.expiration));
    if (!candidates.length) continue;
    const nearest = candidates.reduce((best, e) =>
      Math.abs(e.daysToExpiration - target) < Math.abs(best.daysToExpiration - target) ? e : best
    );
    keep.add(nearest.expiration);
  }

  return all.filter(e => keep.has(e.expiration));
}

/** Default landing expiration: the standard monthly nearest 30 DTE — the most liquid
 *  "front month" cycle — rather than expirationDates[0], which is whatever expires
 *  soonest (often today's 0DTE). Falls back to the nearest-dated cycle if the chain
 *  has no monthly for some reason. */
function pickDefaultExpiration<T extends ExpirationLike>(expirations: T[]): T | undefined {
  const monthlies = expirations.filter(e => isThirdFriday(e.expiration));
  const pool = monthlies.length > 0 ? monthlies : expirations;
  return pool.reduce<T | undefined>((best, e) =>
    !best || Math.abs(e.daysToExpiration - 30) < Math.abs(best.daysToExpiration - 30) ? e : best
  , undefined);
}

type DataSource = 'historical' | 'live';

export function OptionsViewer() {
  const SPX_URL = `${API_ENDPOINT}?ticker=%5ESPX`;
  const { profile } = useUser();
  const userTier = profile?.tier ?? 1;
  const isTier4Plus = canAccessLiveOptions(userTier);

  const [source, setSource] = useState<DataSource>(() => getPreferredOptionSource(userTier));
  const [data, setData] = useState<OptionsAPIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpiration, setSelectedExpiration] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'matrix' | 'volatility' | 'positioning' | 'gex'>('matrix');
  const [expCategory, setExpCategory] = useState<ExpirationCategory>('key');
  const [cacheAge, setCacheAge] = useState<number | null>(null);
  const [readyToRefresh, setReadyToRefresh] = useState(true);

  // Load either historical snapshot or live Cloud Run API
  const loadSource = useCallback(async (nextSource: DataSource, manualRefresh = false) => {
    // Tier gate check for Live data
    if (nextSource === 'live' && !canAccessLiveOptions(userTier)) {
      toast.error(`Live Real-Time SPX options data is exclusive to Senior Quant (Tier ${MIN_LIVE_OPTIONS_TIER}+).`);
      return;
    }

    setSource(nextSource);
    setLoading(true);
    setError(null);

    try {
      if (nextSource === 'historical') {
        const snapshot = await getChainSnapshot(manualRefresh);
        const adapted = adaptSnapshotToOptionsAPIResponse(snapshot);
        setData(adapted);
        setCacheAge(null);
        setReadyToRefresh(true);

        if (adapted.expirationDates && adapted.expirationDates.length > 0) {
          setSelectedExpiration(prev => {
            const exists = adapted.expirationDates.some((e: any) => e.expiration === prev);
            if (exists) return prev;
            return (pickDefaultExpiration(adapted.expirationDates) ?? adapted.expirationDates[0]).expiration;
          });
        }
      } else {
        // Live Cloud Run feed
        const result = await fetchWithOptionsCache<OptionsAPIResponse>(SPX_URL, {
          forceRefresh: manualRefresh,
          minIntervalMs: getLiveCacheIntervalMs(),
        });
        setData(result);

        if (result.expirationDates && result.expirationDates.length > 0) {
          setSelectedExpiration(prev => {
            const exists = result.expirationDates.some(e => e.expiration === prev);
            if (exists) return prev;
            return (pickDefaultExpiration(result.expirationDates) ?? result.expirationDates[0]).expiration;
          });
        }

        const age = getCacheAgeSeconds(SPX_URL);
        setCacheAge(age);
        setReadyToRefresh(canRefresh(SPX_URL, getLiveCacheIntervalMs()));
      }
    } catch (err) {
      console.error('Error loading SPX option chain:', err);
      setError(err instanceof Error ? err.message : 'Failed to load SPX options chain data');
    } finally {
      setLoading(false);
    }
  }, [SPX_URL, userTier]);

  // Load initial source based on user preferences and tier
  useEffect(() => {
    const initialSource = getPreferredOptionSource(userTier);
    loadSource(initialSource);
  }, [userTier, loadSource]);

  // Periodic check for cache timer when on live source
  useEffect(() => {
    if (source === 'live') {
      const interval = setInterval(() => {
        setCacheAge(getCacheAgeSeconds(SPX_URL));
        setReadyToRefresh(canRefresh(SPX_URL, getLiveCacheIntervalMs()));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [source, SPX_URL]);

  const handleManualRefresh = () => {
    loadSource(source, true);
  };

  // Filtered Expiration cycles (Key, All, Weeklies, Monthlies).
  // 0DTE/1DTE have no chip of their own — the Key filter's front-week rule always
  // includes them, and they stay visually flagged by the rose 0d/1d badge.
  const filteredExpirations = useMemo(() => {
    if (!data) return [];
    const all = data.expirationDates;

    let subset = expCategory === 'key' ? selectKeyExpirations(all) : all;

    // Never hide the cycle currently being analysed — otherwise switching filters
    // leaves the chart showing an expiration with no visible selected chip.
    if (selectedExpiration && !subset.some(e => e.expiration === selectedExpiration)) {
      const selected = all.find(e => e.expiration === selectedExpiration);
      if (selected) {
        subset = [...subset, selected].sort((a, b) => a.daysToExpiration - b.daysToExpiration);
      }
    }
    return subset;
  }, [data, expCategory, selectedExpiration]);

  // Total open interest per expiration, straight from the chain. SPX OI spans ~3
  // orders of magnitude across cycles (monthlies clear 5M while a mid-week daily can
  // sit under 2K), so this is what actually ranks a cycle's importance — the
  // weekday heuristics above only decide which ones get listed.
  const openInterestByExpiration = useMemo(() => {
    const map = new Map<string, number>();
    if (!data) return map;
    for (const exp of data.expirationDates) {
      let oi = 0;
      for (const c of exp.calls) oi += c.openInterest ?? 0;
      for (const p of exp.puts) oi += p.openInterest ?? 0;
      map.set(exp.expiration, oi);
    }
    return map;
  }, [data]);

  // Scale bars/tiers against the busiest cycle currently on screen, so the strip
  // stays readable whichever filter is active.
  const maxVisibleOpenInterest = useMemo(() => {
    let max = 0;
    for (const exp of filteredExpirations) {
      max = Math.max(max, openInterestByExpiration.get(exp.expiration) ?? 0);
    }
    return max;
  }, [filteredExpirations, openInterestByExpiration]);

  // Selected expiration payload
  const currentExpData = useMemo(() => {
    if (!data || !selectedExpiration) return null;
    return data.expirationDates.find(e => e.expiration === selectedExpiration) || data.expirationDates[0] || null;
  }, [data, selectedExpiration]);

  // Calculations for institutional metrics
  const { expectedMove, maxPainStrike, putCallVolumeRatio, putCallOIRatio, totalVolume, totalOpenInterest, atmIV } = useMemo(() => {
    if (!currentExpData || !data) {
      return {
        expectedMove: null,
        maxPainStrike: null,
        putCallVolumeRatio: 1.0,
        putCallOIRatio: null,
        totalVolume: 0,
        totalOpenInterest: null,
        atmIV: null
      };
    }

    const spot = data.stock.price;
    const calls = currentExpData.calls;
    const puts = currentExpData.puts;

    // 1. Total Volume & OI
    let callVol = 0;
    let putVol = 0;
    let callOI = 0;
    let putOI = 0;
    // OptionsDX's EOD schema (the Historical Snapshot source) has no open-interest column at
    // all — every contract's openInterest is null there, not a real zero. Detect that so OI-
    // derived figures (P/C OI ratio, total OI, max pain) can report "no data" instead of a
    // misleading computed value that happens to be all-zero.
    const hasOpenInterest = calls.some(c => c.openInterest != null) || puts.some(p => p.openInterest != null);

    calls.forEach(c => {
      callVol += c.volume || 0;
      callOI += c.openInterest || 0;
    });

    puts.forEach(p => {
      putVol += p.volume || 0;
      putOI += p.openInterest || 0;
    });

    const pcVolRatio = callVol > 0 ? putVol / callVol : 1.0;
    const pcOIRatio = hasOpenInterest ? (callOI > 0 ? putOI / callOI : 1.0) : null;

    // 2. ATM Contract & IV
    const atmCall = calls.reduce((best, c) => 
      Math.abs(c.strike - spot) < Math.abs(best.strike - spot) ? c : best, calls[0]
    );
    const atmPut = puts.reduce((best, p) => 
      Math.abs(p.strike - spot) < Math.abs(best.strike - spot) ? p : best, puts[0]
    );

    const iv = atmCall?.impliedVolatilityMid ?? null;

    // 3. Expected Move Calculation (ATM Straddle: (Call Mid + Put Mid) * 0.85)
    let expMove: { dollars: number; percent: number } | null = null;
    if (atmCall && atmPut && atmCall.midPrice && atmPut.midPrice) {
      const straddle = (atmCall.midPrice + atmPut.midPrice) * 0.85;
      expMove = {
        dollars: Number(straddle.toFixed(2)),
        percent: Number(((straddle / spot) * 100).toFixed(2))
      };
    } else if (iv && currentExpData.daysToExpiration > 0) {
      const dteYears = currentExpData.daysToExpiration / 365;
      const move = spot * iv * Math.sqrt(dteYears);
      expMove = {
        dollars: Number(move.toFixed(2)),
        percent: Number(((move / spot) * 100).toFixed(2))
      };
    }

    // 4. Max Pain Strike Calculation — meaningless without real OI data (every strike's total
    // loss would tie at 0, and the "lowest strike wins ties" iteration order would present an
    // arbitrary strike as if it were a computed answer), so skip it entirely when OI is absent.
    let maxPain: number | null = null;
    if (hasOpenInterest) {
      const allStrikes = Array.from(new Set([...calls.map(c => c.strike), ...puts.map(p => p.strike)])).sort((a, b) => a - b);
      let minLoss = Infinity;

      allStrikes.forEach(testStrike => {
        let totalLoss = 0;
        calls.forEach(c => {
          if (testStrike > c.strike) {
            totalLoss += (testStrike - c.strike) * (c.openInterest || 0);
          }
        });
        puts.forEach(p => {
          if (testStrike < p.strike) {
            totalLoss += (p.strike - testStrike) * (p.openInterest || 0);
          }
        });

        if (totalLoss < minLoss) {
          minLoss = totalLoss;
          maxPain = testStrike;
        }
      });
    }

    return {
      expectedMove: expMove,
      maxPainStrike: maxPain,
      putCallVolumeRatio: pcVolRatio,
      putCallOIRatio: pcOIRatio,
      totalVolume: callVol + putVol,
      totalOpenInterest: hasOpenInterest ? callOI + putOI : null,
      atmIV: iv
    };
  }, [currentExpData, data]);

  // ---- Market-wide (whole book) aggregates -------------------------------------------------
  // Deliberately separate from the per-expiration block above: every metric here spans EVERY
  // listed cycle, which is what the top band claims to show. SPX and SPXW contracts at the same
  // strike are both counted, since volume and open interest are additive across the two.
  const bookTotals = useMemo(() => {
    if (!data) {
      return {
        putCallVolRatio: null as number | null,
        putCallOIRatio: null as number | null,
        totalVolume: 0,
        totalOpenInterest: null as number | null,
      };
    }
    let callVol = 0, putVol = 0, callOI = 0, putOI = 0;
    let sawOI = false;
    for (const exp of data.expirationDates) {
      for (const c of exp.calls) {
        callVol += c.volume || 0;
        if (c.openInterest != null) { sawOI = true; callOI += c.openInterest; }
      }
      for (const p of exp.puts) {
        putVol += p.volume || 0;
        if (p.openInterest != null) { sawOI = true; putOI += p.openInterest; }
      }
    }
    return {
      putCallVolRatio: callVol > 0 ? putVol / callVol : null,
      putCallOIRatio: sawOI && callOI > 0 ? putOI / callOI : null,
      totalVolume: callVol + putVol,
      totalOpenInterest: sawOI ? callOI + putOI : null,
    };
  }, [data]);

  // Whole-book gamma, from the same shared lib the GEX tab and cycle panel use.
  const bookGex = useMemo(() => {
    if (!data || data.expirationDates.length === 0) return null;
    return computeGexProfile(data.expirationDates as GexExpirationInput[], data.stock.price);
  }, [data]);

  // Vol regime / VRP. Precomputed daily in the pipeline — a 252-day percentile and an EWM
  // z-score can't be derived from a live quote, so this comes from Postgres, not the chain feed.
  const { data: volRegimeData } = useQuery<{ volRegime: VolRegimeResult }>(GET_VOL_REGIME, {
    variables: { days: 400 },
    fetchPolicy: 'cache-and-network',
  });
  const regimeLatest = volRegimeData?.volRegime?.latestData ?? null;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto">
      {/* SPX Dedicated Header Sub-Banner with Source Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
            <span className="font-serif font-bold text-slate-900 dark:text-slate-100 tracking-wide uppercase">
              S&P 500 Index Options (^SPX)
            </span>
          </div>

          {/* Source Toggle: Historical (Default) vs Live */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-800/80 p-0.5 shadow-2xs">
            <button
              onClick={() => source !== 'historical' && loadSource('historical')}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-all ${
                source === 'historical' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Historical Snapshot
            </button>
            <button
              onClick={() => {
                if (!isTier4Plus) {
                  toast.error(`Live Real-Time SPX options data is exclusive to Senior Quant (Tier ${MIN_LIVE_OPTIONS_TIER}+).`);
                  return;
                }
                if (source !== 'live') loadSource('live');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold text-xs transition-all ${
                source === 'live' 
                  ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs' 
                  : isTier4Plus
                  ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
              }`}
              title={isTier4Plus ? "Switch to Live Cboe Feed" : `Requires Tier ${MIN_LIVE_OPTIONS_TIER} (Senior Quant)`}
            >
              {!isTier4Plus && <Lock className="h-3 w-3 text-[#A8672E] dark:text-[#D08F52]" />}
              <span>Live ^SPX (Cboe)</span>
              {!isTier4Plus && (
                <Badge variant="outline" className="text-[9px] px-1 py-0 border-[#A8672E]/40 text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 font-mono font-semibold">
                  Tier 4+
                </Badge>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
          <span className="hidden sm:inline">European Exercise • Cash Settled</span>
          <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">|</span>
          <span>Multiplier: <strong className="text-slate-900 dark:text-slate-100 font-bold">$100/pt</strong></span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="rounded-xl border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          <AlertDescription className="text-xs font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Market-wide picture — whole book + index-level vol regime. Never per-expiration. */}
      {data && (
        <MarketOverviewBar
          ticker="^SPX"
          spotPrice={data.stock.price}
          priceChange={data.stock.price - data.stock.previousClose}
          percentChange={data.stock.percentChange}
          vix={data.vix?.value ?? regimeLatest?.vix ?? null}
          vixPercentChange={data.vix?.percentChange ?? null}
          regime={regimeLatest?.regime ?? null}
          vrp={regimeLatest?.vrp ?? null}
          vrpZ={regimeLatest?.vrpZ ?? null}
          realizedVol20d={regimeLatest?.realizedVol20d ?? null}
          vixRank={regimeLatest?.vixRank ?? null}
          termSlope={regimeLatest?.termSlope ?? null}
          regimeAsOf={regimeLatest?.bizDate ?? null}
          netGex={bookGex?.totalNetGex ?? null}
          gammaFlip={bookGex?.gammaFlip ?? null}
          callWall={bookGex?.callWall ?? null}
          putWall={bookGex?.putWall ?? null}
          bookPutCallVolRatio={bookTotals.putCallVolRatio}
          bookPutCallOIRatio={bookTotals.putCallOIRatio}
          bookTotalVolume={bookTotals.totalVolume}
          bookTotalOpenInterest={bookTotals.totalOpenInterest}
          cycleCount={data.expirationDates.length}
          loading={loading}
          onRefresh={handleManualRefresh}
          canRefreshNow={source === 'historical' ? true : readyToRefresh}
          cacheAgeSeconds={source === 'historical' ? null : cacheAge}
        />
      )}

      {/* SPX Expiration Date Carousel Strip with Filter Category Chips */}
      {data && data.expirationDates.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <Calendar className="h-3.5 w-3.5 text-[#A8672E] dark:text-[#D08F52]" />
              <span className="font-serif font-bold text-sm">
                SPX Expiration Cycles ({filteredExpirations.length}
                {filteredExpirations.length !== data.expirationDates.length
                  ? ` of ${data.expirationDates.length}`
                  : ' Total'}
                )
              </span>
            </div>

            {/* Quick Filter: Key Expiries (default, liquid subset) / All */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs">
              <button
                onClick={() => setExpCategory('key')}
                title="0DTE plus the next session, 4 Friday weeklies, 4 standard monthlies, and a ~1y long-term anchor — where SPX open interest actually sits"
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
                  expCategory === 'key'
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Key Expiries
              </button>
              <button
                onClick={() => setExpCategory('all')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
                  expCategory === 'all' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
            <span>Bar + number is open interest — the actual liquidity, not a guess from the date.</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52]" />deep
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A8672E]/50 dark:bg-[#D08F52]/50" />active
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />thin
            </span>
          </div>

          {/* Horizontal Scrollable Dates */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
            {filteredExpirations.map(exp => {
              const isSelected = exp.expiration === selectedExpiration;
              const is0DTE = exp.daysToExpiration === 0;
              const is1DTE = exp.daysToExpiration === 1;
              const isMonthly = isThirdFriday(exp.expiration);

              const openInterest = openInterestByExpiration.get(exp.expiration) ?? 0;
              const oiShare = maxVisibleOpenInterest > 0 ? openInterest / maxVisibleOpenInterest : 0;
              const tier = liquidityTier(oiShare);
              const isThin = tier === 'thin';

              return (
                <button
                  key={exp.expiration}
                  title={`${exp.expirationLabel} — ${openInterest.toLocaleString()} contracts open interest${
                    isMonthly ? ' · standard monthly (3rd Friday), deepest OI on the board' : ''
                  }`}
                  onClick={() => setSelectedExpiration(exp.expiration)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-[#A8672E] bg-[#A8672E]/10 dark:border-[#D08F52] dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] ring-1 ring-[#A8672E]/30'
                      : tier === 'deep'
                      ? 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-slate-800 dark:text-slate-200'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-slate-800 dark:text-slate-200'
                  } ${isThin && !isSelected ? 'opacity-65 hover:opacity-100' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${tier === 'deep' ? 'font-extrabold' : 'font-bold'} ${isSelected ? 'text-[#A8672E] dark:text-[#D08F52]' : 'text-slate-800 dark:text-slate-200'}`}>
                      {exp.expiration.slice(5)}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] px-1 py-0 font-mono font-bold ${
                        is0DTE 
                          ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30' 
                          : is1DTE 
                          ? 'bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52] border-[#A8672E]/30' 
                          : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {exp.daysToExpiration}d
                    </Badge>
                    {isMonthly && (
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1 py-0 font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
                      >
                        M
                      </Badge>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-medium font-mono">
                    {exp.expirationLabel.split(',')[0]}
                  </span>
                  {/* Open interest: the actual liquidity signal, not just a weekday guess */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="h-1 flex-1 min-w-[28px] rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          tier === 'deep'
                            ? 'bg-[#A8672E] dark:bg-[#D08F52]'
                            : tier === 'active'
                            ? 'bg-[#A8672E]/50 dark:bg-[#D08F52]/50'
                            : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                        style={{ width: `${Math.max(4, oiShare * 100)}%` }}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-mono tabular-nums shrink-0 ${
                        tier === 'deep'
                          ? 'font-bold text-slate-700 dark:text-slate-300'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {formatOpenInterest(openInterest)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary for the selected cycle — the per-expiration counterpart to the market band */}
      {data && currentExpData && (
        <CycleSummaryPanel
          expiration={currentExpData.expiration}
          expirationLabel={currentExpData.expirationLabel}
          daysToExpiration={currentExpData.daysToExpiration}
          calls={currentExpData.calls}
          puts={currentExpData.puts}
          spotPrice={data.stock.price}
          bookTotalOpenInterest={bookTotals.totalOpenInterest}
          bookNetGex={bookGex?.totalNetGex ?? null}
          isMonthly={isThirdFriday(currentExpData.expiration)}
        />
      )}

      {/* Main Analysis Views Switcher */}
      {data && currentExpData && (
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 p-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs h-auto gap-1">
            <TabsTrigger 
              value="matrix" 
              className="text-xs sm:text-sm py-2.5 px-1 sm:px-3 rounded-lg font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all flex items-center justify-center gap-1.5"
            >
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">SPX</span> Matrix
            </TabsTrigger>
            <TabsTrigger 
              value="volatility" 
              className="text-xs sm:text-sm py-2.5 px-1 sm:px-3 rounded-lg font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all flex items-center justify-center gap-1.5"
            >
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Volatility</span> (Vol)
            </TabsTrigger>
            <TabsTrigger 
              value="positioning" 
              className="text-xs sm:text-sm py-2.5 px-1 sm:px-3 rounded-lg font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all flex items-center justify-center gap-1.5"
            >
              <BarChart3 className="h-4 w-4" />
              OI / Volume
            </TabsTrigger>
            <TabsTrigger 
              value="gex" 
              className="text-xs sm:text-sm py-2.5 px-1 sm:px-3 rounded-lg font-medium data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="h-4 w-4" />
              Gamma (GEX)
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: SPX Option Matrix Table */}
          <TabsContent value="matrix" className="mt-0 space-y-3">
            <OptionsMatrixTable
              calls={currentExpData.calls}
              puts={currentExpData.puts}
              spotPrice={data.stock.price}
              expiration={currentExpData.expiration}
              dte={currentExpData.daysToExpiration}
            />
          </TabsContent>

          {/* Tab 2: SPX Volatility Viewer */}
          <TabsContent value="volatility" className="mt-0 space-y-3">
            <VolatilityChartView
              currentExpiration={currentExpData.expiration}
              expirations={data.expirationDates}
              spotPrice={data.stock.price}
              ticker="^SPX"
            />
          </TabsContent>

          {/* Tab 3: SPX Positioning (OI & Volume) Profile */}
          <TabsContent value="positioning" className="mt-0 space-y-3">
            <PositioningChartView
              calls={currentExpData.calls}
              puts={currentExpData.puts}
              spotPrice={data.stock.price}
              maxPainStrike={maxPainStrike}
              expiration={currentExpData.expiration}
              dte={currentExpData.daysToExpiration}
            />
          </TabsContent>

          {/* Tab 4: SPX Net Gamma Exposure (GEX) */}
          <TabsContent value="gex" className="mt-0 space-y-3">
            <GexChartView
              calls={currentExpData.calls}
              puts={currentExpData.puts}
              spotPrice={data.stock.price}
              ticker="^SPX"
              expiration={currentExpData.expiration}
              dte={currentExpData.daysToExpiration}
              allExpirations={data.expirationDates}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Loading Overlay */}
      {loading && !data && (
        <div className="flex flex-col justify-center items-center py-20 px-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
          <RefreshCw className="h-9 w-9 animate-spin text-[#A8672E] dark:text-[#D08F52] mb-3" />
          <span className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">Loading SPX Options Matrix & Vol Surface…</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">Retrieving 30,000+ contracts, Greeks, and volatility curves</span>
        </div>
      )}
    </div>
  );
}