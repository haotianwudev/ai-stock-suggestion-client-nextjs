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
import { OptionsMetricsBar } from './viewer/options-metrics-bar';
import { OptionsMatrixTable, OptionContractData } from './viewer/options-matrix-table';
import { VolatilityChartView } from './viewer/volatility-chart-view';
import { VolRegimePanel } from './viewer/vol-regime-panel';
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
}

type ExpirationCategory = 'all' | '0dte' | 'weeklies' | 'monthlies';
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
  const [expCategory, setExpCategory] = useState<ExpirationCategory>('all');
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
            return exists ? prev : adapted.expirationDates[0].expiration;
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
            return exists ? prev : result.expirationDates[0].expiration;
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

  // Filtered Expiration cycles (0DTE, Weeklies, Monthlies, All)
  const filteredExpirations = useMemo(() => {
    if (!data) return [];
    if (expCategory === '0dte') {
      return data.expirationDates.filter(e => e.daysToExpiration <= 1);
    }
    if (expCategory === 'weeklies') {
      return data.expirationDates.filter(e => e.daysToExpiration <= 30);
    }
    if (expCategory === 'monthlies') {
      return data.expirationDates.filter(e => e.daysToExpiration >= 30);
    }
    return data.expirationDates;
  }, [data, expCategory]);

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

      {/* Hero Metrics HUD */}
      {data && (
        <OptionsMetricsBar
          ticker="^SPX"
          spotPrice={data.stock.price}
          previousClose={data.stock.previousClose}
          priceChange={data.stock.price - data.stock.previousClose}
          percentChange={data.stock.percentChange}
          timestamp={data.stock.timestamp}
          expectedMove={expectedMove}
          maxPainStrike={maxPainStrike}
          putCallVolumeRatio={putCallVolumeRatio}
          putCallOIRatio={putCallOIRatio}
          totalVolume={totalVolume}
          totalOpenInterest={totalOpenInterest}
          atmIV={atmIV}
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
              <span className="font-serif font-bold text-sm">SPX Expiration Cycles ({data.expirationDates.length} Total)</span>
            </div>

            {/* Quick Filter: 0DTE / Weeklies / Monthlies / All */}
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-0.5 text-xs">
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
              <button
                onClick={() => setExpCategory('0dte')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
                  expCategory === '0dte' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                0DTE & 1DTE
              </button>
              <button
                onClick={() => setExpCategory('weeklies')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
                  expCategory === 'weeklies' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                &lt; 30 Days
              </button>
              <button
                onClick={() => setExpCategory('monthlies')}
                className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
                  expCategory === 'monthlies' 
                    ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-xs font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Monthlies & LEAPS
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Dates */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
            {filteredExpirations.map(exp => {
              const isSelected = exp.expiration === selectedExpiration;
              const is0DTE = exp.daysToExpiration === 0;
              const is1DTE = exp.daysToExpiration === 1;

              return (
                <button
                  key={exp.expiration}
                  onClick={() => setSelectedExpiration(exp.expiration)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-[#A8672E] bg-[#A8672E]/10 dark:border-[#D08F52] dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] ring-1 ring-[#A8672E]/30'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold font-mono ${isSelected ? 'text-[#A8672E] dark:text-[#D08F52]' : 'text-slate-800 dark:text-slate-200'}`}>
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
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-medium font-mono">
                    {exp.expirationLabel.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
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
            {/* Regime context first: is premium worth selling today, before
                looking at which strike to sell. */}
            {/* Regime context first: is premium worth selling today, before
                looking at which strike to sell. */}
            <VolRegimePanel />
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