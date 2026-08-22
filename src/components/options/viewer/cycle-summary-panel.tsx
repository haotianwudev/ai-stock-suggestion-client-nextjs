"use client";

import React, { useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Scale, Activity, Layers, CalendarClock } from 'lucide-react';
import { OptionContractData } from './options-matrix-table';
import { computeGexProfile, type GexExpirationInput } from '@/lib/options/gex';

/**
 * Everything specific to ONE selected expiration cycle. The market-wide read lives in
 * MarketOverviewBar above; this panel answers "what is this particular date telling me",
 * which is what the old HUD was actually computing while presenting it as market-wide.
 */

export interface CycleSummaryProps {
  expiration: string;
  expirationLabel: string;
  daysToExpiration: number;
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  /** Whole-book totals, so this cycle can be expressed as a share of the board. */
  bookTotalOpenInterest: number | null;
  bookNetGex: number | null;
  /** Third-Friday standard monthly (AM-settled SPX shares the date with PM-settled SPXW). */
  isMonthly: boolean;
}

function StatCard({
  label, value, accent, sub, icon, hint,
}: {
  label: string;
  value: string;
  accent?: string;
  sub?: string;
  icon: React.ReactNode;
  hint?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all flex items-center justify-between"
      title={hint}
    >
      <div className="min-w-0">
        <p className="text-[11px] font-serif font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100">{value}</span>
          {accent && <span className="text-[11px] font-mono font-medium text-[#A8672E] dark:text-[#D08F52]">{accent}</span>}
        </div>
        {sub && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{sub}</p>}
      </div>
      <div className="p-2.5 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] shrink-0 ml-2">
        {icon}
      </div>
    </div>
  );
}

export function CycleSummaryPanel({
  expiration,
  expirationLabel,
  daysToExpiration,
  calls,
  puts,
  spotPrice,
  bookTotalOpenInterest,
  bookNetGex,
  isMonthly,
}: CycleSummaryProps) {
  const m = useMemo(() => {
    const hasOI = calls.some(c => c.openInterest != null) || puts.some(p => p.openInterest != null);

    let callVol = 0, putVol = 0, callOI = 0, putOI = 0;
    calls.forEach(c => { callVol += c.volume || 0; callOI += c.openInterest || 0; });
    puts.forEach(p => { putVol += p.volume || 0; putOI += p.openInterest || 0; });

    // ATM contracts — nearest strike to spot on each side.
    const atmCall = calls.length
      ? calls.reduce((b, c) => (Math.abs(c.strike - spotPrice) < Math.abs(b.strike - spotPrice) ? c : b), calls[0])
      : null;
    const atmPut = puts.length
      ? puts.reduce((b, p) => (Math.abs(p.strike - spotPrice) < Math.abs(b.strike - spotPrice) ? p : b), puts[0])
      : null;
    const atmIV = atmCall?.impliedVolatilityMid ?? null;

    // Expected move: ATM straddle x0.85, falling back to the Black-Scholes closed form.
    let expMove: { dollars: number; percent: number } | null = null;
    if (atmCall?.midPrice && atmPut?.midPrice) {
      const straddle = (atmCall.midPrice + atmPut.midPrice) * 0.85;
      expMove = { dollars: straddle, percent: (straddle / spotPrice) * 100 };
    } else if (atmIV && daysToExpiration > 0) {
      const move = spotPrice * atmIV * Math.sqrt(daysToExpiration / 365);
      expMove = { dollars: move, percent: (move / spotPrice) * 100 };
    }

    // Max pain — meaningless without real OI, so report nothing rather than an arbitrary strike.
    let maxPain: number | null = null;
    if (hasOI) {
      const strikes = Array.from(new Set([...calls.map(c => c.strike), ...puts.map(p => p.strike)])).sort((a, b) => a - b);
      let minLoss = Infinity;
      for (const k of strikes) {
        let loss = 0;
        calls.forEach(c => { if (k > c.strike) loss += (k - c.strike) * (c.openInterest || 0); });
        puts.forEach(p => { if (k < p.strike) loss += (p.strike - k) * (p.openInterest || 0); });
        if (loss < minLoss) { minLoss = loss; maxPain = k; }
      }
    }

    // This cycle's gamma contribution, from the same shared lib the GEX tab uses.
    const slice: GexExpirationInput = { expiration, daysToExpiration, calls, puts };
    const gex = computeGexProfile([slice], spotPrice);

    const cycleOI = hasOI ? callOI + putOI : null;
    const oiShare =
      cycleOI !== null && bookTotalOpenInterest && bookTotalOpenInterest > 0
        ? (cycleOI / bookTotalOpenInterest) * 100
        : null;
    const gexShare =
      bookNetGex && Math.abs(bookNetGex) > 0 ? (gex.totalNetGex / Math.abs(bookNetGex)) * 100 : null;

    return {
      hasOI, callVol, putVol, callOI, putOI, atmIV, expMove, maxPain, gex,
      cycleOI, oiShare, gexShare,
      pcVol: callVol > 0 ? putVol / callVol : null,
      pcOI: hasOI && callOI > 0 ? putOI / callOI : null,
      totalVol: callVol + putVol,
    };
  }, [calls, puts, spotPrice, daysToExpiration, expiration, bookTotalOpenInterest, bookNetGex]);

  const is0DTE = daysToExpiration === 0;
  const cycleLongGamma = m.gex.totalNetGex >= 0;
  const maxPainGap = m.maxPain !== null ? m.maxPain - spotPrice : null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xs space-y-3">
      {/* Header — which cycle, and what kind */}
      <div className="flex flex-wrap items-center gap-2">
        <CalendarClock className="h-3.5 w-3.5 text-[#A8672E] dark:text-[#D08F52]" />
        <span className="font-serif font-bold text-sm text-slate-800 dark:text-slate-200">
          {expirationLabel}
        </span>
        <Badge
          variant="outline"
          className={`text-[9px] px-1.5 py-0 font-mono font-bold ${
            is0DTE
              ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-gray-700'
          }`}
        >
          {daysToExpiration}DTE
        </Badge>
        {isMonthly && (
          <Badge
            variant="outline"
            className="text-[9px] px-1.5 py-0 font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
            title="Standard monthly (3rd Friday). AM-settled SPX shares this date with PM-settled SPXW — both are summed here, since open interest and gamma are additive across the two products."
          >
            MONTHLY · SPX+SPXW
          </Badge>
        )}
        {m.oiShare !== null && (
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 ml-auto">
            {m.oiShare.toFixed(1)}% of book OI
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard
          label="Expected Move"
          value={m.expMove ? `±$${m.expMove.dollars.toFixed(2)}` : '—'}
          accent={m.expMove ? `±${m.expMove.percent.toFixed(1)}%` : undefined}
          sub="ATM straddle × 0.85"
          icon={<Zap className="h-4 w-4" />}
          hint="The move this cycle's options are pricing, from the ATM straddle. Falls back to the Black-Scholes closed form when the straddle isn't quotable."
        />
        <StatCard
          label="ATM IV"
          value={m.atmIV !== null ? `${(m.atmIV * 100).toFixed(1)}%` : '—'}
          sub={`${daysToExpiration}d tenor`}
          icon={<Activity className="h-4 w-4" />}
          hint="Implied volatility at the strike nearest spot for this cycle — this cycle's point on the term structure."
        />
        <StatCard
          label="Max Pain"
          value={m.maxPain !== null ? `$${m.maxPain.toLocaleString()}` : '—'}
          accent={maxPainGap !== null ? `${maxPainGap >= 0 ? '+' : ''}${maxPainGap.toFixed(0)}` : undefined}
          sub={m.hasOI ? 'Min seller payout' : 'No OI in feed'}
          icon={<Target className="h-4 w-4" />}
          hint="Settlement price minimising total option-seller payout for this cycle. Most relevant on expiration day itself, weakest early in a cycle's life."
        />
        <StatCard
          label="Cycle Net GEX"
          value={`${m.gex.totalNetGex >= 0 ? '+' : ''}$${m.gex.totalNetGex.toFixed(0)}M`}
          accent={m.gexShare !== null ? `${m.gexShare >= 0 ? '+' : ''}${m.gexShare.toFixed(0)}% of book` : undefined}
          sub={cycleLongGamma ? 'long gamma' : 'short gamma'}
          icon={<Layers className="h-4 w-4" />}
          hint="This cycle's gamma exposure per 1% move, summed across SPX and SPXW at each strike. Its sign can differ from the whole book's."
        />
        <StatCard
          label="Cycle Walls"
          value={m.gex.callWall !== null ? `$${m.gex.callWall.toLocaleString()}` : '—'}
          accent={m.gex.putWall !== null ? `/ $${m.gex.putWall.toLocaleString()}` : undefined}
          sub="Call / Put gamma peak"
          icon={<Scale className="h-4 w-4" />}
          hint="Largest call-side gamma above spot and put-side gamma below, for this cycle only — these often differ from the whole-book walls in the band above."
        />
        <StatCard
          label="P/C · Vol / OI"
          value={m.pcVol !== null ? m.pcVol.toFixed(2) : '—'}
          accent={m.pcOI !== null ? `/ ${m.pcOI.toFixed(2)}` : undefined}
          sub={`${(m.totalVol / 1000).toFixed(1)}k vol${m.cycleOI !== null ? ` · ${(m.cycleOI / 1000).toFixed(0)}k OI` : ''}`}
          icon={<Scale className="h-4 w-4" />}
          hint="Put/call ratio for this cycle by today's volume and by resting open interest. Volume resets daily; OI updates once per session."
        />
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500">
        All figures on this row are for <span className="font-semibold">{expiration}</span> only. Market-wide
        readings are in the band above.
      </p>
    </div>
  );
}
