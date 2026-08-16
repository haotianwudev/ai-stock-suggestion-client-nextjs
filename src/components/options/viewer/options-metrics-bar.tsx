"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  RefreshCw, 
  Zap, 
  Target, 
  Scale, 
  ShieldAlert,
  Clock
} from 'lucide-react';

interface OptionsMetricsBarProps {
  ticker: string;
  spotPrice: number;
  previousClose: number;
  priceChange: number;
  percentChange: number;
  timestamp: string;
  expectedMove: { dollars: number; percent: number } | null;
  maxPainStrike: number | null;
  putCallVolumeRatio: number;
  putCallOIRatio: number | null;
  totalVolume: number;
  totalOpenInterest: number | null;
  atmIV: number | null;
  loading: boolean;
  onRefresh: () => void;
  canRefreshNow: boolean;
  cacheAgeSeconds: number | null;
}

export function OptionsMetricsBar({
  ticker,
  spotPrice,
  previousClose,
  priceChange,
  percentChange,
  timestamp,
  expectedMove,
  maxPainStrike,
  putCallVolumeRatio,
  putCallOIRatio,
  totalVolume,
  totalOpenInterest,
  atmIV,
  loading,
  onRefresh,
  canRefreshNow,
  cacheAgeSeconds
}: OptionsMetricsBarProps) {
  const isPositive = priceChange >= 0;

  const formatCacheTime = (sec: number | null) => {
    if (sec === null) return 'Live';
    if (sec < 60) return `${sec}s ago`;
    const mins = Math.floor(sec / 60);
    return `${mins}m ago`;
  };

  return (
    <div className="space-y-3">
      {/* Top Banner: Price, Ticker, and Refresh Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#1C1B19] text-white rounded-2xl shadow-xs border border-[#2D2B28]">
        <div className="flex flex-wrap items-center gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold tracking-tight text-white">{ticker}</span>
              <Badge variant="outline" className="border-white/15 bg-white/5 text-slate-300 text-[10px] font-mono px-2 py-0.5">
                Cboe Delayed Feed
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

          {/* Quick Metrics Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {atmIV !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <span className="text-slate-400 block text-[10px] font-mono uppercase">ATM IV</span>
                <span className="font-mono font-bold text-[#D08F52]">{(atmIV * 100).toFixed(1)}%</span>
              </div>
            )}
            {expectedMove && (
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <span className="text-slate-400 block text-[10px] font-mono uppercase">Expected Move</span>
                <span className="font-mono font-bold text-amber-300">±${expectedMove.dollars.toFixed(2)} (±{expectedMove.percent.toFixed(1)}%)</span>
              </div>
            )}
            {maxPainStrike !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                <span className="text-slate-400 block text-[10px] font-mono uppercase">Max Pain</span>
                <span className="font-mono font-bold text-teal-300">${maxPainStrike.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cache & Refresh Controls */}
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white transition-all text-xs font-semibold shadow-xs ${
              loading ? 'opacity-70' : ''
            }`}
            title={canRefreshNow ? "Fetch fresh quotes from Cboe" : "Quotes cached (cooldown active)"}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-[#D08F52]' : 'text-slate-400'}`} />
            <span>{loading ? 'Updating…' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* 4 Key Institutional Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Expected Move */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Expected Move</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
                {expectedMove ? `±$${expectedMove.dollars.toFixed(2)}` : '—'}
              </span>
              <span className="text-xs text-[#A8672E] dark:text-[#D08F52] font-mono font-medium">
                {expectedMove ? `(±${expectedMove.percent.toFixed(1)}%)` : ''}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">ATM Straddle implied range</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52]">
            <Zap className="h-4 w-4" />
          </div>
        </div>

        {/* Card 2: Max Pain Strike */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Max Pain Strike</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
                {maxPainStrike !== null ? `$${maxPainStrike.toLocaleString()}` : '—'}
              </span>
              {maxPainStrike !== null && (
                <span className={`text-[11px] font-mono font-medium ${maxPainStrike >= spotPrice ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {maxPainStrike >= spotPrice ? `+${(maxPainStrike - spotPrice).toFixed(1)}` : `${(maxPainStrike - spotPrice).toFixed(1)}`}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Minimum expiry payout</p>
          </div>
          <div className="p-2.5 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400">
            <Target className="h-4 w-4" />
          </div>
        </div>

        {/* Card 3: Put/Call Ratios */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">P/C Ratio (Vol / OI)</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
                {putCallVolumeRatio.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-normal">/</span>
              <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-300">
                {putCallOIRatio !== null ? `${putCallOIRatio.toFixed(2)} OI` : '— OI'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              {putCallVolumeRatio > 1.0 ? 'Put Heavy (Bearish skew)' : 'Call Heavy (Bullish skew)'}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
            <Scale className="h-4 w-4" />
          </div>
        </div>

        {/* Card 4: Total Volume & Open Interest */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all flex items-center justify-between">
          <div>
            <p className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Volume / OI</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">
                {(totalVolume / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-slate-400 font-normal">/</span>
              <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-300">
                {totalOpenInterest !== null ? `${(totalOpenInterest / 1000).toFixed(1)}k OI` : '— OI'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Combined activity</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
