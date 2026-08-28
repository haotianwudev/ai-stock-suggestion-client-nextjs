"use client";

import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import { History, TrendingUp, TrendingDown, Activity, Hourglass, Compass } from 'lucide-react';
import { GET_OPTION_SNAPSHOT } from '@/lib/graphql/queries';
import type {
  OptionSnapshotResult, DivergenceState, FlowState,
} from '@/lib/graphql/types';

// Matches MIN_HISTORY in the server's db/option-snapshot.js. Below this the server returns null
// ranks, and this view shows how far along the series is instead of a meaningless percentile.
const MIN_HISTORY = 20;

const DIVERGENCE_COPY: Record<DivergenceState, { label: string; tone: string; detail: string }> = {
  WALL_OF_WORRY: {
    label: 'Wall of Worry',
    tone: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    detail: 'Price rising while skew steepens — participants are still paying for protection. Historically the healthier way for a market to advance.',
  },
  EUPHORIA: {
    label: 'Euphoria',
    tone: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
    detail: 'Price rising while skew flattens — the same rally with the hedges stripped out. Fragile: an unhedged book has further to fall on a shock.',
  },
  FEAR_CONFIRMING: {
    label: 'Fear Confirming',
    tone: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
    detail: 'Price falling while skew steepens — hedging demand building into weakness. The textbook risk-off signature.',
  },
  CAPITULATION_RELIEF: {
    label: 'Capitulation / Relief',
    tone: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
    detail: 'Price falling while skew flattens — protection being sold into the decline, often late in a move once hedges have already paid.',
  },
};

const FLOW_COPY: Record<FlowState, { label: string; tone: string }> = {
  BUILDING: { label: 'Building', tone: 'text-emerald-600 dark:text-emerald-400' },
  CLOSING: { label: 'Closing', tone: 'text-rose-600 dark:text-rose-400' },
  CHURNING: { label: 'Churning', tone: 'text-slate-500 dark:text-slate-400' },
};

/**
 * Skew Stickiness Ratio bands.
 *
 * Worth reading carefully because the GEX tab's gamma-flip solver *assumes* sticky strike when
 * it reprices the book. SSR is the only number on the platform that says whether that assumption
 * actually held — a reading far from 1 means the flip level is standing on a shakier footing
 * than usual.
 */
function classifySSR(ssr: number): { label: string; tone: string; detail: string } {
  if (ssr < 0) return {
    label: 'Inverted',
    tone: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
    detail: 'ATM vol moved opposite to what the skew implied — usually a vol-regime shift rather than a spot-driven move.',
  };
  if (ssr < 0.4) return {
    label: 'Sticky Delta',
    tone: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
    detail: 'The smile travelled with spot and ATM vol barely moved — the market is treating this move as trend, not shock.',
  };
  if (ssr < 0.75) return {
    label: 'Mixed',
    tone: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/30',
    detail: 'Between the two regimes — the surface partly rode with spot and partly stayed pinned to strikes.',
  };
  if (ssr <= 1.3) return {
    label: 'Sticky Strike',
    tone: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    detail: 'The smile stayed pinned to strikes and ATM vol slid along the existing skew — the regime the gamma-flip solver assumes.',
  };
  if (ssr <= 2) return {
    label: 'Repricing',
    tone: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
    detail: 'ATM vol moved further than the skew implied — the surface repriced rather than merely shifted. Treat the gamma flip level with extra caution.',
  };
  return {
    label: 'Extreme',
    tone: 'bg-rose-500/15 text-rose-800 dark:text-rose-200 border-rose-500/40',
    detail: 'Readings this far from 1 are more often the prior session’s skew slope having been close to flat than a genuinely extreme repricing day — SSR only guards against a flat spot move, not a flat skew, so a small denominator on that side amplifies ordinary IV noise the same way. Check the ATM slope figure above before reading this as a real regime shift rather than an artifact.',
  };
}

function rankTone(rank: number): string {
  if (rank >= 0.8) return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30';
  if (rank <= 0.2) return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
  return 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/30';
}

function fmt(v: number | null | undefined, digits = 2): string {
  return v == null ? '—' : v.toLocaleString(undefined, {
    minimumFractionDigits: digits, maximumFractionDigits: digits,
  });
}

/** Percentile card. Renders the value always, the rank only once it means something. */
function RankCard({ label, value, rank, digits = 2, suffix = '', hint }: {
  label: string; value?: number | null; rank?: number | null;
  digits?: number; suffix?: string; hint?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all"
      title={hint}
    >
      <span className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
          {fmt(value, digits)}{value != null && suffix}
        </span>
        {rank != null && (
          <Badge variant="outline" className={`text-[10px] font-mono px-1.5 py-0 ${rankTone(rank)}`}>
            {(rank * 100).toFixed(0)}th
          </Badge>
        )}
      </div>
      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
        {rank != null ? 'percentile vs. stored history' : 'rank pending history'}
      </p>
    </div>
  );
}

export function SnapshotHistoryView() {
  const { data, loading, error } = useQuery<{ optionSnapshot: OptionSnapshotResult }>(
    GET_OPTION_SNAPSHOT,
    { variables: { historySessions: 120, divergenceWindow: 20 }, fetchPolicy: 'cache-and-network' }
  );

  const result = data?.optionSnapshot;
  const current = result?.current;
  const divergence = result?.divergence;
  const flow = result?.flow;

  const chartData = useMemo(
    () => (result?.history ?? []).map(h => ({
      date: h.bizDate?.slice(5) ?? '',
      normalizedSkew: h.normalizedSkew,
      spot: h.spot,
      atmIv: h.atmIv,
    })),
    [result?.history]
  );

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-10 text-center">
        <Activity className="h-5 w-5 mx-auto text-[#A8672E] dark:text-[#D08F52] animate-pulse" />
        <p className="text-sm font-serif text-slate-500 dark:text-slate-400 mt-2">Loading stored history…</p>
      </div>
    );
  }

  // A missing table or an unreachable API is the same story to a reader: there is no history to
  // show yet. Surfacing a raw GraphQL error here would be noise.
  if (error || !current) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-10 text-center space-y-2">
        <Hourglass className="h-5 w-5 mx-auto text-slate-400" />
        <p className="text-sm font-serif font-semibold text-slate-700 dark:text-slate-200">No stored sessions yet</p>
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          The daily snapshot ETL writes one row per session after the close. Percentile ranks,
          open-interest flow and the skew/price divergence read all appear here once history accumulates.
        </p>
      </div>
    );
  }

  const n = current.sampleSize;
  const building = n < MIN_HISTORY;

  return (
    <div className="space-y-4">
      {/* Progress banner while the series is too thin to rank against */}
      {building && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3.5 flex items-start gap-2.5">
          <Hourglass className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Building history — {n} of {MIN_HISTORY} sessions.
            </span>{' '}
            <span className="text-slate-600 dark:text-slate-400">
              Percentile ranks stay hidden until there are enough observations to rank against;
              a percentile drawn from {n} session{n === 1 ? '' : 's'} would look precise and mean nothing.
              Values below are live and correct now.
            </span>
          </div>
        </div>
      )}

      {/* Tier 3 — percentile ranks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <RankCard label="Normalised Skew" value={current.normalizedSkew} rank={current.normalizedSkewRank}
                  hint="25Δ risk reversal divided by ATM IV — level-independent, so it compares across regimes." />
        <RankCard label="25Δ Risk Reversal" value={current.rr25} rank={current.rr25Rank} suffix="%"
                  hint="Put IV minus call IV, in vol points. Platform convention is put-minus-call, the inverse of the FX/dealer convention." />
        <RankCard label="25Δ Butterfly" value={current.fly25} rank={current.fly25Rank} suffix="%"
                  hint="Wing curvature over the ATM baseline — how much the market pays for tails on both sides." />
        <RankCard label="ATM IV" value={current.atmIv} rank={current.atmIvRank} digits={1} suffix="%"
                  hint="At-the-money implied vol on the ~30 DTE reference cycle." />
        <RankCard label="Net GEX" value={current.netGexM} rank={current.netGexRank} digits={0}
                  hint="Whole-book dealer gamma, $M per 1% move. Positive dampens, negative amplifies." />
        <RankCard label="Put/Call OI" value={current.pcrOi} rank={current.pcrOiRank}
                  hint="Accumulated structural positioning across the whole book." />
      </div>

      {/* Surface dynamics — Skew Stickiness Ratio */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
          <span className="font-serif font-bold text-slate-900 dark:text-slate-100">Skew Stickiness Ratio</span>
          {current.atmSkewSlope != null && (
            <span className="text-[11px] font-mono text-slate-400 ml-auto">
              ATM slope {fmt(current.atmSkewSlope, 1)} /ln(K/S)
            </span>
          )}
        </div>
        <div className="p-4">
          {current.ssr != null ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                  {fmt(current.ssr)}
                </span>
                <Badge variant="outline" className={`text-xs font-mono px-2 py-0.5 ${classifySSR(current.ssr).tone}`}>
                  {classifySSR(current.ssr).label}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {classifySSR(current.ssr).detail}
              </p>
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Needs a prior session and a real move in the index — the ratio divides by the spot
              change, so a flat tape has no stickiness to measure.
            </p>
          )}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
            How far ATM implied vol moved per unit log-spot, divided by the skew that was already
            in place. <strong>~1</strong> means the smile stayed pinned to strikes (sticky strike);
            <strong> ~0</strong> means it travelled with spot (sticky delta). The Gamma tab&rsquo;s flip
            level assumes sticky strike, so a reading far from 1 is a warning about that number too.
            Readings past <strong>~2</strong> are usually the prior session&rsquo;s skew slope having
            been close to flat rather than a genuinely bigger repricing — check the ATM slope figure
            above before reading it as a real regime shift.
          </p>
        </div>
      </div>

      {/* Tier 3 — skew vs. price divergence */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
          <span className="font-serif font-bold text-slate-900 dark:text-slate-100">Skew vs. Price Divergence</span>
          {divergence?.sessions != null && (
            <span className="text-[11px] font-mono text-slate-400 ml-auto">
              {divergence.sessions} session{divergence.sessions === 1 ? '' : 's'}
              {divergence.fromDate && ` · ${divergence.fromDate} → ${divergence.toDate}`}
            </span>
          )}
        </div>
        <div className="p-4">
          {divergence?.state ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`text-xs font-mono px-2 py-0.5 ${DIVERGENCE_COPY[divergence.state].tone}`}>
                  {DIVERGENCE_COPY[divergence.state].label}
                </Badge>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  price {divergence.priceChangePct != null && divergence.priceChangePct >= 0 ? '+' : ''}
                  {fmt(divergence.priceChangePct)}% · skew {divergence.skewChange != null && divergence.skewChange >= 0 ? '+' : ''}
                  {fmt(divergence.skewChange, 3)}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {DIVERGENCE_COPY[divergence.state].detail}
              </p>
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Needs at least 2 stored sessions — a single session has no change to measure.
            </p>
          )}
        </div>
      </div>

      {/* Tier 2 — open-interest flow */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <History className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
          <span className="font-serif font-bold text-slate-900 dark:text-slate-100">Open Interest Flow</span>
          {flow?.priorDate && (
            <span className="text-[11px] font-mono text-slate-400 ml-auto">
              {flow.priorDate} → {flow.bizDate}
            </span>
          )}
        </div>
        <div className="p-4">
          {flow && flow.sessionsAvailable >= 2 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {(['call', 'put'] as const).map(side => {
                  const change = side === 'call' ? flow.callOiChange : flow.putOiChange;
                  const oi = side === 'call' ? flow.callOi : flow.putOi;
                  const vol = side === 'call' ? flow.callVolume : flow.putVolume;
                  const state = side === 'call' ? flow.callState : flow.putState;
                  const Icon = (change ?? 0) >= 0 ? TrendingUp : TrendingDown;
                  return (
                    <div key={side} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-serif font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {side}s
                        </span>
                        {state && (
                          <span className={`text-[11px] font-mono font-bold ${FLOW_COPY[state].tone}`}>
                            {FLOW_COPY[state].label}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <Icon className={`h-4 w-4 ${(change ?? 0) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} />
                        <span className="text-lg font-mono font-extrabold text-slate-900 dark:text-slate-100">
                          {(change ?? 0) >= 0 ? '+' : ''}{fmt(change, 0)}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                        OI {fmt(oi, 0)} · vol {fmt(vol, 0)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                Volume says how much traded; open interest says whether that trading opened or closed
                positions. Rising OI on heavy volume is conviction being built — falling OI on the same
                volume is an unwind wearing the identical signature.
              </p>
              {/* Only worth the reader's attention when the basis is actually thin. In steady state
                  this sits near 1 and saying so every session would be noise. */}
              {typeof flow.comparableShare === 'number' && flow.comparableShare < 0.9 && (
                <p className="text-[11px] font-mono text-amber-600 dark:text-amber-500 mt-2 leading-relaxed">
                  Measured on {(flow.comparableShare * 100).toFixed(0)}% of stored contracts — the rest
                  were not stored last session, so they have no prior value to difference against and are
                  excluded rather than counted as new.
                </p>
              )}
            </>
          ) : (
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Needs 2 stored sessions to difference — currently {flow?.sessionsAvailable ?? 0}.
            </p>
          )}
        </div>
      </div>

      {/* History chart */}
      {chartData.length >= 2 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <span className="font-serif font-bold text-slate-900 dark:text-slate-100">Normalised Skew History</span>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              Skew relative to ATM IV across stored sessions
            </p>
          </div>
          <div className="h-[280px] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 30, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:opacity-10" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} dy={5} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" height={36} />
                {/* The Normal Smirk band from the volatility tab's morphology classifier, so the
                    two views cut the same series at the same thresholds. */}
                <ReferenceLine y={0.20} stroke="#f59e0b" strokeDasharray="4 4" />
                <ReferenceLine y={0.35} stroke="#f59e0b" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="normalizedSkew" name="Normalised Skew"
                      stroke="#A8672E" strokeWidth={2.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 text-center">
        Stored session {current.bizDate} · reference cycle {current.refExpiration} ({current.refDte} DTE) ·
        {' '}{current.contractCount?.toLocaleString()} contracts across {current.expirationCount} expirations
      </p>
    </div>
  );
}
