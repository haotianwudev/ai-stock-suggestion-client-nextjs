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
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-sm border border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">{ticker}</span>
              <Badge variant="outline" className="border-slate-700 bg-slate-800/80 text-slate-300 text-xs px-2 py-0.5">
                Cboe Delayed Feed
              </Badge>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ${spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`flex items-center text-sm sm:text-base font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4 mr-1 inline" /> : <TrendingDown className="h-4 w-4 mr-1 inline" />}
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-10 w-px bg-slate-800" />

          {/* Quick Metrics Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {atmIV !== null && (
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
                <span className="text-slate-400 block text-[10px] uppercase font-medium">ATM IV</span>
                <span className="font-semibold text-purple-300">{(atmIV * 100).toFixed(1)}%</span>
              </div>
            )}
            {expectedMove && (
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
                <span className="text-slate-400 block text-[10px] uppercase font-medium">Expected Move</span>
                <span className="font-semibold text-amber-300">±${expectedMove.dollars.toFixed(2)} (±{expectedMove.percent.toFixed(1)}%)</span>
              </div>
            )}
            {maxPainStrike !== null && (
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
                <span className="text-slate-400 block text-[10px] uppercase font-medium">Max Pain</span>
                <span className="font-semibold text-cyan-300">${maxPainStrike.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cache & Refresh Controls */}
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="text-right hidden md:block">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Cached: {formatCacheTime(cacheAgeSeconds)}</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              15m cooldown ({canRefreshNow ? 'Ready' : 'Locked'})
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className={`border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-all ${
              loading ? 'opacity-70' : ''
            }`}
            title={canRefreshNow ? "Fetch fresh quotes from Cboe" : "Quotes cached (cooldown active)"}
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
            <span className="text-xs font-medium">{loading ? 'Updating…' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      {/* 4 Key Institutional Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Card 1: Expected Move */}
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Expected Move</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {expectedMove ? `±$${expectedMove.dollars.toFixed(2)}` : '—'}
                </span>
                <span className="text-xs text-amber-600 font-medium">
                  {expectedMove ? `(±${expectedMove.percent.toFixed(1)}%)` : ''}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">ATM Straddle implied range</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Zap className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Max Pain Strike */}
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Max Pain Strike</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {maxPainStrike !== null ? `$${maxPainStrike.toLocaleString()}` : '—'}
                </span>
                {maxPainStrike !== null && (
                  <span className={`text-[11px] font-medium ${maxPainStrike >= spotPrice ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {maxPainStrike >= spotPrice ? `+${(maxPainStrike - spotPrice).toFixed(1)}` : `${(maxPainStrike - spotPrice).toFixed(1)}`}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Minimum expiry payout</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Target className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Put/Call Ratios */}
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">P/C Ratio (Vol / OI)</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {putCallVolumeRatio.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-normal">/</span>
                <span className="text-sm font-semibold text-slate-700">
                  {putCallOIRatio !== null ? `${putCallOIRatio.toFixed(2)} OI` : '— OI'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {putCallVolumeRatio > 1.0 ? 'Put Heavy (Bearish skew)' : 'Call Heavy (Bullish skew)'}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Scale className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Total Volume & Open Interest */}
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Volume / OI</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {(totalVolume / 1000).toFixed(1)}k
                </span>
                <span className="text-xs text-slate-400 font-normal">/</span>
                <span className="text-sm font-semibold text-slate-700">
                  {totalOpenInterest !== null ? `${(totalOpenInterest / 1000).toFixed(1)}k OI` : '— OI'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Combined activity</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Activity className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
