"use client";

import React, { useState, useMemo, useCallback } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Info,
  Circle,
  Search,
  RotateCcw
} from 'lucide-react';
import { computeLiquidity, LiquidityTier } from '@/lib/options/liquidity';

export interface OptionContractData {
  strike: number;
  lastPrice: number;
  impliedVolatilityMid?: number | null;
  delta?: number | null;
  gamma?: number | null;
  theta?: number | null;
  vega?: number | null;
  rho?: number | null;
  theo?: number | null;
  contractSymbol: string;
  lastTradeDate?: string;
  bid?: number | null;
  ask?: number | null;
  midPrice?: number | null;
  volume?: number | null;
  openInterest?: number | null;
}

interface OptionsMatrixTableProps {
  calls: OptionContractData[];
  puts: OptionContractData[];
  spotPrice: number;
  expiration: string;
  dte: number;
}

type SelectedContract = {
  strike: number;
  side: 'call' | 'put';
} | null;

const TIER_STYLE: Record<LiquidityTier, string> = {
  excellent: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  good: 'bg-blue-100 text-blue-800 border-blue-300',
  fair: 'bg-amber-100 text-amber-800 border-amber-300',
  poor: 'bg-rose-100 text-rose-800 border-rose-300',
  unknown: 'bg-slate-100 text-slate-500 border-slate-300',
};
const TIER_LABEL: Record<LiquidityTier, string> = {
  excellent: 'Excellent', good: 'Good', fair: 'Fair', poor: 'Poor', unknown: '—',
};

type StrikeRangeOption = 15 | 25 | 'all';
type StrikeStepOption = 'all' | 25 | 50 | 100;
type MoneynessOption = 'all' | 'itm_calls' | 'itm_puts' | 'near_atm';

/* ─── Liquidity dot: small colored circle indicating tier ─── */
const LIQ_DOT: Record<LiquidityTier, string> = {
  excellent: 'text-emerald-500',
  good: 'text-blue-500',
  fair: 'text-amber-500',
  poor: 'text-rose-500',
  unknown: 'text-slate-300 dark:text-slate-600',
};

/* ─── IV heat: returns a Tailwind bg class based on IV magnitude ─── */
function ivHeatBg(iv: number | null | undefined): string {
  if (iv == null || iv <= 0) return '';
  const pct = iv * 100;
  if (pct >= 50) return 'bg-purple-200/50 dark:bg-purple-900/30';
  if (pct >= 35) return 'bg-purple-100/50 dark:bg-purple-950/20';
  if (pct >= 25) return 'bg-purple-50/50 dark:bg-purple-950/10';
  return '';
}

/* ─── Volume heat: returns an inline style for proportional background bar ─── */
function volBarStyle(vol: number | null | undefined, maxVol: number, side: 'call' | 'put'): React.CSSProperties {
  if (!vol || vol <= 0 || maxVol <= 0) return {};
  const pct = Math.min(100, (vol / maxVol) * 100);
  const color = side === 'call' ? 'rgba(20,184,166,0.15)' : 'rgba(245,158,11,0.15)'; // teal / amber
  const dir = side === 'call' ? 'left' : 'right';
  return {
    backgroundImage: `linear-gradient(to ${dir}, ${color} ${pct}%, transparent ${pct}%)`,
  };
}

/* ─── Delta color intensity ─── */
function deltaColor(delta: number | null | undefined, side: 'call' | 'put'): string {
  if (delta == null) return '';
  const abs = Math.abs(delta);
  if (side === 'call') {
    if (abs >= 0.7) return 'text-teal-800 dark:text-teal-200 font-bold';
    if (abs >= 0.4) return 'text-teal-700 dark:text-teal-300 font-semibold';
    return 'text-teal-600 dark:text-teal-400';
  }
  if (abs >= 0.7) return 'text-amber-800 dark:text-amber-200 font-bold';
  if (abs >= 0.4) return 'text-amber-700 dark:text-amber-300 font-semibold';
  return 'text-amber-600 dark:text-amber-400';
}

/* ─────────────── Detail Inspector Panel ─────────────── */
function ContractDetailPanel({
  contract,
  side,
  spotPrice,
  dte,
  onClose,
}: {
  contract: OptionContractData;
  side: 'call' | 'put';
  spotPrice: number;
  dte: number;
  onClose: () => void;
}) {
  const liq = computeLiquidity(contract.bid, contract.ask, contract.midPrice, contract.volume, contract.openInterest);
  const spread = (contract.bid != null && contract.ask != null) ? contract.ask - contract.bid : null;
  const isITM = side === 'call' ? contract.strike < spotPrice : contract.strike > spotPrice;
  const moneyness = ((contract.strike - spotPrice) / spotPrice) * 100;
  const intrinsicValue = side === 'call'
    ? Math.max(0, spotPrice - contract.strike)
    : Math.max(0, contract.strike - spotPrice);
  const extrinsicValue = (contract.midPrice != null) ? Math.max(0, contract.midPrice - intrinsicValue) : null;
  const leverageRatio = (contract.midPrice && contract.midPrice > 0) ? spotPrice / (contract.midPrice * 100) : null;

  const accentBorder = side === 'call' ? 'border-teal-500/30 dark:border-teal-500/20' : 'border-amber-500/30 dark:border-amber-500/20';
  const accentBg = side === 'call' ? 'bg-teal-500/10 dark:bg-teal-950/30' : 'bg-amber-500/10 dark:bg-amber-950/30';
  const accentText = side === 'call' ? 'text-teal-700 dark:text-teal-300' : 'text-amber-700 dark:text-amber-300';
  const headerBg = side === 'call' ? 'bg-teal-600 dark:bg-teal-700' : 'bg-amber-600 dark:bg-amber-700';

  const MetricCell = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{label}</span>
      <span className={`text-sm font-bold font-mono ${color || 'text-slate-900 dark:text-slate-100'}`}>{value}</span>
      {sub && <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{sub}</span>}
    </div>
  );

  return (
    <div className={`border ${accentBorder} ${accentBg} rounded-xl mx-2 mb-2 overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className={`${headerBg} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {side === 'call' ? <TrendingUp className="w-4 h-4 text-white/90" /> : <TrendingDown className="w-4 h-4 text-white/90" />}
            <span className="font-bold text-white text-sm uppercase tracking-wide">
              {side === 'call' ? 'Call' : 'Put'} @ {contract.strike.toLocaleString()}
            </span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
            isITM ? 'bg-white/25 text-white' : 'bg-black/20 text-white/80'
          }`}>
            {isITM ? 'ITM' : 'OTM'}
          </span>
          {liq.tier !== 'unknown' && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${TIER_STYLE[liq.tier]}`}>
              {TIER_LABEL[liq.tier]}
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-white/20 transition-colors">
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Body — 3-column grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pricing */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-1">
            Pricing
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCell label="Bid" value={contract.bid != null ? contract.bid.toFixed(2) : '—'} />
            <MetricCell label="Ask" value={contract.ask != null ? contract.ask.toFixed(2) : '—'} />
            <MetricCell label="Mid" value={contract.midPrice != null ? contract.midPrice.toFixed(2) : '—'} color="text-slate-900 dark:text-white font-extrabold" />
            <MetricCell label="Last" value={contract.lastPrice != null ? contract.lastPrice.toFixed(2) : '—'} />
            <MetricCell label="Spread" value={spread != null ? `$${spread.toFixed(2)}` : '—'} sub={liq.spreadPct != null ? `${(liq.spreadPct * 100).toFixed(2)}%` : undefined} />
            <MetricCell label="Theo" value={contract.theo != null ? contract.theo.toFixed(2) : '—'} color="text-purple-600 dark:text-purple-400" />
            <MetricCell label="Intrinsic" value={`$${intrinsicValue.toFixed(2)}`} />
            <MetricCell label="Extrinsic" value={extrinsicValue != null ? `$${extrinsicValue.toFixed(2)}` : '—'} />
          </div>
        </div>

        {/* Greeks */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-1">
            Greeks
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCell
              label="Delta (Δ)"
              value={contract.delta != null ? contract.delta.toFixed(4) : '—'}
              color={accentText}
              sub={contract.delta != null ? `${Math.abs(contract.delta * 100).toFixed(1)}% equiv` : undefined}
            />
            <MetricCell
              label="Gamma (Γ)"
              value={contract.gamma != null ? contract.gamma.toFixed(5) : '—'}
              color="text-blue-600 dark:text-blue-400"
              sub={contract.gamma != null ? `$/pt²: ${(contract.gamma * spotPrice / 100).toFixed(4)}` : undefined}
            />
            <MetricCell
              label="Theta (Θ)"
              value={contract.theta != null ? contract.theta.toFixed(3) : '—'}
              color="text-rose-600 dark:text-rose-400"
              sub={contract.theta != null ? `${(contract.theta * 365).toFixed(1)}/yr` : undefined}
            />
            <MetricCell
              label="Vega (ν)"
              value={contract.vega != null ? contract.vega.toFixed(3) : '—'}
              color="text-violet-600 dark:text-violet-400"
            />
            <MetricCell
              label="Rho (ρ)"
              value={contract.rho != null ? contract.rho.toFixed(4) : '—'}
              color="text-sky-600 dark:text-sky-400"
            />
            <MetricCell
              label="IV"
              value={contract.impliedVolatilityMid != null && contract.impliedVolatilityMid > 0
                ? `${(contract.impliedVolatilityMid * 100).toFixed(2)}%`
                : '—'}
              color="text-purple-600 dark:text-purple-400"
            />
          </div>
        </div>

        {/* Activity & Position */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-1">
            Activity & Position
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCell label="Volume" value={contract.volume != null && contract.volume > 0 ? contract.volume.toLocaleString() : '—'} />
            <MetricCell label="Open Interest" value={contract.openInterest != null && contract.openInterest > 0 ? contract.openInterest.toLocaleString() : '—'} />
            <MetricCell
              label="Vol/OI Ratio"
              value={
                contract.volume && contract.openInterest && contract.openInterest > 0
                  ? (contract.volume / contract.openInterest).toFixed(2) : '—'
              }
              sub={
                contract.volume && contract.openInterest && contract.openInterest > 0
                  ? (contract.volume / contract.openInterest) > 1 ? 'High activity' : 'Normal' : undefined
              }
            />
            <MetricCell
              label="Liquidity Score"
              value={liq.score != null ? `${liq.score}/100` : '—'}
              color={liq.tier === 'excellent' ? 'text-emerald-600 dark:text-emerald-400' :
                     liq.tier === 'good' ? 'text-blue-600 dark:text-blue-400' :
                     liq.tier === 'fair' ? 'text-amber-600 dark:text-amber-400' :
                     liq.tier === 'poor' ? 'text-rose-600 dark:text-rose-400' : ''}
            />
            <MetricCell
              label="Moneyness"
              value={`${moneyness >= 0 ? '+' : ''}${moneyness.toFixed(2)}%`}
              sub={`$${(contract.strike - spotPrice).toFixed(2)} from spot`}
            />
            <MetricCell
              label="DTE"
              value={`${dte}d`}
              sub={leverageRatio != null ? `${leverageRatio.toFixed(1)}x leverage` : undefined}
            />
          </div>
          {contract.contractSymbol && (
            <div className="pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Symbol</span>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 break-all">{contract.contractSymbol}</div>
            </div>
          )}
          {contract.lastTradeDate && (
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Last Traded</span>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">{contract.lastTradeDate}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Column Toggle Chip ─────────────── */
function ColToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
        active
          ? 'border-[#A8672E]/60 bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52]/60 dark:bg-[#D08F52]/15 dark:text-[#D08F52]'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-400 dark:text-slate-500 hover:border-[#A8672E]/30 hover:text-slate-600'
      }`}
    >
      {label}
    </button>
  );
}

/* ═══════════════ MAIN COMPONENT ═══════════════ */

export function OptionsMatrixTable({
  calls,
  puts,
  spotPrice,
  expiration,
  dte
}: OptionsMatrixTableProps) {
  const [strikeRange, setStrikeRange] = useState<StrikeRangeOption>(15);
  const [strikeStep, setStrikeStep] = useState<StrikeStepOption>('all');
  const [moneynessFilter, setMoneynessFilter] = useState<MoneynessOption>('all');
  const [strikeSearch, setStrikeSearch] = useState<string>('');
  const [liquidityFilter, setLiquidityFilter] = useState<'all' | 'excellent'>('all');
  const [hoveredStrike, setHoveredStrike] = useState<number | null>(null);
  const [selectedContract, setSelectedContract] = useState<SelectedContract>(null);

  // Toggleable optional column groups
  const [showTheta, setShowTheta] = useState(true);
  const [showVega, setShowVega] = useState(true);
  const [showOI, setShowOI] = useState(true);

  const handleContractClick = useCallback((strike: number, side: 'call' | 'put', contract: OptionContractData | null) => {
    if (!contract) return;
    setSelectedContract(prev =>
      prev && prev.strike === strike && prev.side === side ? null : { strike, side }
    );
  }, []);

  // Group by strike
  const strikeRows = useMemo(() => {
    const callMap = new Map<number, OptionContractData>();
    const putMap = new Map<number, OptionContractData>();
    const allStrikesSet = new Set<number>();

    calls.forEach(c => { callMap.set(c.strike, c); allStrikesSet.add(c.strike); });
    puts.forEach(p => { putMap.set(p.strike, p); allStrikesSet.add(p.strike); });

    return Array.from(allStrikesSet).sort((a, b) => a - b).map(strike => ({
      strike,
      call: callMap.get(strike) || null,
      put: putMap.get(strike) || null,
      isCallITM: strike < spotPrice,
      isPutITM: strike > spotPrice,
      diffPctFromSpot: ((strike - spotPrice) / spotPrice) * 100
    }));
  }, [calls, puts, spotPrice]);

  const atmStrike = useMemo(() => {
    if (strikeRows.length === 0) return 0;
    return strikeRows.reduce((prev, curr) =>
      Math.abs(curr.strike - spotPrice) < Math.abs(prev.strike - spotPrice) ? curr : prev
    ).strike;
  }, [strikeRows, spotPrice]);

  const filteredRows = useMemo(() => {
    let list = strikeRows;

    // 1. Text search / specific strike or range filter (e.g. "5850" or "5800-6000")
    const query = strikeSearch.trim();
    if (query) {
      const rangeMatch = query.match(/^(\d+(?:\.\d+)?)\s*[-:]\s*(\d+(?:\.\d+)?)$/);
      if (rangeMatch) {
        const minS = parseFloat(rangeMatch[1]);
        const maxS = parseFloat(rangeMatch[2]);
        list = list.filter(r => r.strike >= Math.min(minS, maxS) && r.strike <= Math.max(minS, maxS));
      } else {
        list = list.filter(r => String(r.strike).includes(query));
      }
    } else {
      // 2. Percentage range filter around spot (±15%, ±25%, or All)
      if (strikeRange !== 'all') {
        const minStrike = spotPrice * (1 - strikeRange / 100);
        const maxStrike = spotPrice * (1 + strikeRange / 100);
        list = list.filter(r => r.strike >= minStrike && r.strike <= maxStrike);
      }
    }

    // 3. Strike Step (Milestone intervals: 25pt, 50pt, 100pt)
    if (strikeStep !== 'all') {
      list = list.filter(r => r.strike % strikeStep === 0);
    }

    // 4. Moneyness filter
    if (moneynessFilter === 'itm_calls') {
      list = list.filter(r => r.strike <= spotPrice);
    } else if (moneynessFilter === 'itm_puts') {
      list = list.filter(r => r.strike >= spotPrice);
    } else if (moneynessFilter === 'near_atm') {
      list = list.filter(r => Math.abs(r.strike - spotPrice) / spotPrice <= 0.05);
    }

    // 5. Liquidity tier filter
    if (liquidityFilter === 'excellent') {
      list = list.filter(r => {
        const cLiq = computeLiquidity(r.call?.bid, r.call?.ask, r.call?.midPrice, r.call?.volume, r.call?.openInterest);
        const pLiq = computeLiquidity(r.put?.bid, r.put?.ask, r.put?.midPrice, r.put?.volume, r.put?.openInterest);
        return cLiq.tier === 'excellent' || pLiq.tier === 'excellent';
      });
    }

    return list;
  }, [strikeRows, strikeSearch, strikeRange, spotPrice, strikeStep, moneynessFilter, liquidityFilter]);

  // Max volume for proportional bar rendering
  const maxVol = useMemo(() => {
    let m = 0;
    filteredRows.forEach(r => {
      if (r.call?.volume && r.call.volume > m) m = r.call.volume;
      if (r.put?.volume && r.put.volume > m) m = r.put.volume;
    });
    return m;
  }, [filteredRows]);

  const fmtNum = (val: number | null | undefined, dec = 2) => {
    if (val === null || val === undefined || isNaN(val)) return '—';
    return val.toFixed(dec);
  };

  const fmtInt = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val) || val === 0) return '—';
    return val.toLocaleString();
  };

  const fmtIV = (val: number | null | undefined) => {
    if (val === null || val === undefined || isNaN(val) || val <= 0) return '—';
    return `${(val * 100).toFixed(1)}%`;
  };

  const hasActiveFilters = strikeSearch !== '' || strikeRange !== 'all' || strikeStep !== 'all' || moneynessFilter !== 'all' || liquidityFilter !== 'all';

  const handleResetFilters = () => {
    setStrikeSearch('');
    setStrikeRange('all');
    setStrikeStep('all');
    setMoneynessFilter('all');
    setLiquidityFilter('all');
  };

  // Column count for detail row colspan
  // Always: (per side: Vol + [OI] + IV + Δ + Γ + [Θ] + [ν] + Bid + Ask + Mid + Liq) + Strike
  const perSideCols = 7 + (showOI ? 1 : 0) + (showTheta ? 1 : 0) + (showVega ? 1 : 0);
  const totalCols = perSideCols * 2 + 1; // calls + strike + puts

  return (
    <div className="space-y-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
      {/* ═══ Control Bar with Comprehensive Strike Filters ═══ */}
      <div className="p-3 bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-800 flex flex-col gap-2.5 text-xs">
        {/* Row 1: Primary Strike Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Strike Range Selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mr-1 hidden sm:inline">Range:</span>
              {([15, 25, 'all'] as StrikeRangeOption[]).map(r => (
                <button
                  key={String(r)}
                  onClick={() => { setStrikeRange(r); if (strikeSearch) setStrikeSearch(''); }}
                  className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border transition-all ${
                    strikeRange === r && !strikeSearch
                      ? 'border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/15 dark:text-[#D08F52] ring-1 ring-[#A8672E]/30'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:border-[#A8672E]/40'
                  }`}
                >
                  {r === 'all' ? 'All' : `±${r}%`}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

            {/* Direct Strike Search Input */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                placeholder="Strike (e.g. 5850 or 5800-6000)"
                value={strikeSearch}
                onChange={e => setStrikeSearch(e.target.value)}
                className="pl-7 pr-6 py-0.5 h-6 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#A8672E] w-52 sm:w-56"
              />
              {strikeSearch && (
                <button
                  onClick={() => setStrikeSearch('')}
                  className="absolute right-1.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

            {/* Strike Step (Interval) Filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mr-0.5 hidden md:inline">Step:</span>
              {(['all', 25, 50, 100] as StrikeStepOption[]).map(step => (
                <button
                  key={String(step)}
                  onClick={() => setStrikeStep(step)}
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border transition-all ${
                    strikeStep === step
                      ? 'border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/15 dark:text-[#D08F52]'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400 hover:border-[#A8672E]/30'
                  }`}
                >
                  {step === 'all' ? 'All' : `${step}pt`}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

            {/* Moneyness Filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mr-0.5 hidden lg:inline">Side:</span>
              <button
                onClick={() => setMoneynessFilter('all')}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                  moneynessFilter === 'all'
                    ? 'border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/15 dark:text-[#D08F52]'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400 hover:border-[#A8672E]/30'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMoneynessFilter('itm_calls')}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                  moneynessFilter === 'itm_calls'
                    ? 'border-teal-500 bg-teal-50 text-teal-800 dark:border-teal-600 dark:bg-teal-950/40 dark:text-teal-300'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400 hover:border-teal-500/40'
                }`}
              >
                ITM Calls
              </button>
              <button
                onClick={() => setMoneynessFilter('itm_puts')}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                  moneynessFilter === 'itm_puts'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400 hover:border-amber-500/40'
                }`}
              >
                ITM Puts
              </button>
              <button
                onClick={() => setMoneynessFilter('near_atm')}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border transition-all ${
                  moneynessFilter === 'near_atm'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800 dark:border-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-500 dark:text-slate-400 hover:border-indigo-500/40'
                }`}
              >
                ATM ±5%
              </button>
            </div>
          </div>

          {/* Right: Stats, Reset & Clear */}
          <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 font-mono text-xs">
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                title="Reset all strike filters"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}
            <span className="text-[11px] text-[#A8672E] dark:text-[#D08F52] font-semibold">
              {filteredRows.length} of {strikeRows.length} Strikes
            </span>
          </div>
        </div>

        {/* Row 2: Liquidity, Column Toggles & Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1.5 border-t border-gray-200/60 dark:border-gray-800/60">
          <div className="flex flex-wrap items-center gap-2">
            {/* Liquidity Filter */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mr-0.5">Liq:</span>
              <button
                onClick={() => setLiquidityFilter('all')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
                  liquidityFilter === 'all'
                    ? 'border-[#A8672E]/60 bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52]/60 dark:bg-[#D08F52]/15 dark:text-[#D08F52]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-400 dark:text-slate-500 hover:border-[#A8672E]/30 hover:text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLiquidityFilter(prev => prev === 'excellent' ? 'all' : 'excellent')}
                title="Filter strikes to only those with Excellent liquidity"
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
                  liquidityFilter === 'excellent'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 ring-1 ring-emerald-500/30 font-semibold'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-400 dark:text-slate-500 hover:border-emerald-500/40 hover:text-slate-600'
                }`}
              >
                <Circle className={`w-1.5 h-1.5 ${liquidityFilter === 'excellent' ? 'fill-emerald-500 text-emerald-500' : 'fill-slate-400 text-slate-400'}`} />
                Excellent Only
              </button>
            </div>

            <div className="h-3.5 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

            {/* Optional Column Toggles */}
            <div className="flex items-center gap-1">
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mr-0.5">Cols:</span>
              <ColToggle label="Θ" active={showTheta} onClick={() => setShowTheta(v => !v)} />
              <ColToggle label="ν" active={showVega} onClick={() => setShowVega(v => !v)} />
              <ColToggle label="OI" active={showOI} onClick={() => setShowOI(v => !v)} />
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-teal-500/20 border border-teal-500/40 inline-block" />
              <span className="text-[11px]">ITM Calls</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-amber-500/20 border border-amber-500/40 inline-block" />
              <span className="text-[11px]">ITM Puts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
              <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
              <Circle className="w-2 h-2 fill-amber-500 text-amber-500" />
              <Circle className="w-2 h-2 fill-rose-500 text-rose-500" />
              <span className="text-[10px]">Liq</span>
            </div>
            {selectedContract && (
              <>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear Selection
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hint */}
      {!selectedContract && (
        <div className="mx-3 mt-2 mb-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>Click any <strong className="text-teal-600 dark:text-teal-400">Call</strong> or <strong className="text-amber-600 dark:text-amber-400">Put</strong> side to inspect full contract details</span>
        </div>
      )}

      {/* ═══ Matrix Table ═══ */}
      <div className="overflow-x-auto max-h-[700px] overflow-y-auto mt-1">
        <table className="w-full text-xs font-mono border-collapse min-w-[1100px]">
          <thead className="sticky top-0 z-20 bg-slate-900 text-white shadow-xs text-center">
            {/* Top header: Calls | Strike | Puts */}
            <tr>
              <th colSpan={perSideCols} className="py-2 px-3 text-center border-r border-gray-700 bg-teal-950/80 uppercase font-serif font-bold text-[11px] tracking-wider text-teal-200">
                Calls
              </th>
              <th className="py-2 px-4 bg-slate-950 text-[#D08F52] font-serif font-bold uppercase text-[11px] tracking-wider border-x border-gray-700 w-28">
                Strike
              </th>
              <th colSpan={perSideCols} className="py-2 px-3 text-center border-l border-gray-700 bg-amber-950/80 uppercase font-serif font-bold text-[11px] tracking-wider text-amber-200">
                Puts
              </th>
            </tr>
            {/* Sub-header: column labels */}
            <tr className="bg-slate-800 text-slate-300 text-[10px] font-semibold tracking-normal border-b border-gray-700">
              {/* Call columns (right-aligned) */}
              <th className="py-1.5 px-1.5 text-right w-6" title="Liquidity">
                <Circle className="w-2.5 h-2.5 inline-block text-slate-400" />
              </th>
              <th className="py-1.5 px-1.5 text-right">Vol</th>
              {showOI && <th className="py-1.5 px-1.5 text-right">OI</th>}
              <th className="py-1.5 px-1.5 text-right text-purple-300">IV</th>
              <th className="py-1.5 px-1.5 text-right text-teal-300">Δ</th>
              <th className="py-1.5 px-1.5 text-right text-teal-300">Γ</th>
              {showTheta && <th className="py-1.5 px-1.5 text-right text-teal-300">Θ</th>}
              {showVega && <th className="py-1.5 px-1.5 text-right text-teal-300">ν</th>}
              <th className="py-1.5 px-1.5 text-right">Bid</th>
              <th className="py-1.5 px-1.5 text-right border-r border-gray-700 font-bold text-white">Ask</th>

              {/* Strike */}
              <th className="py-1.5 px-3 text-center font-bold text-[#D08F52] border-x border-gray-700">Strike</th>

              {/* Put columns (left-aligned) */}
              <th className="py-1.5 px-1.5 text-left border-l border-gray-700 font-bold text-white">Bid</th>
              <th className="py-1.5 px-1.5 text-left">Ask</th>
              {showVega && <th className="py-1.5 px-1.5 text-left text-amber-300">ν</th>}
              {showTheta && <th className="py-1.5 px-1.5 text-left text-amber-300">Θ</th>}
              <th className="py-1.5 px-1.5 text-left text-amber-300">Γ</th>
              <th className="py-1.5 px-1.5 text-left text-amber-300">Δ</th>
              <th className="py-1.5 px-1.5 text-left text-purple-300">IV</th>
              {showOI && <th className="py-1.5 px-1.5 text-left">OI</th>}
              <th className="py-1.5 px-1.5 text-left">Vol</th>
              <th className="py-1.5 px-1.5 text-left w-6" title="Liquidity">
                <Circle className="w-2.5 h-2.5 inline-block text-slate-400" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={totalCols} className="py-8 text-center text-slate-400 dark:text-slate-500 font-mono">
                  No strikes match the selected filters.
                  <button
                    onClick={handleResetFilters}
                    className="ml-2 text-[#A8672E] dark:text-[#D08F52] underline hover:no-underline font-semibold"
                  >
                    Reset filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredRows.map(row => {
                const isATM = row.strike === atmStrike;
                const isHovered = hoveredStrike === row.strike;
                const call = row.call;
                const put = row.put;
                const callLiq = computeLiquidity(call?.bid, call?.ask, call?.midPrice, call?.volume, call?.openInterest);
                const putLiq = computeLiquidity(put?.bid, put?.ask, put?.midPrice, put?.volume, put?.openInterest);
                const isCallSelected = selectedContract?.strike === row.strike && selectedContract?.side === 'call';
                const isPutSelected = selectedContract?.strike === row.strike && selectedContract?.side === 'put';
                const isRowSelected = isCallSelected || isPutSelected;

                const callClick = call ? () => handleContractClick(row.strike, 'call', call) : undefined;
                const putClick = put ? () => handleContractClick(row.strike, 'put', put) : undefined;
                const callCursor = call ? 'cursor-pointer' : '';
                const putCursor = put ? 'cursor-pointer' : '';
                const callRing = isCallSelected ? 'ring-2 ring-teal-500/60 ring-inset' : '';
                const putRing = isPutSelected ? 'ring-2 ring-amber-500/60 ring-inset' : '';

                // ITM background
                const cITM = row.isCallITM ? 'bg-teal-500/8 dark:bg-teal-950/15' : '';
                const pITM = row.isPutITM ? 'bg-amber-500/8 dark:bg-amber-950/15' : '';

                return (
                  <React.Fragment key={row.strike}>
                    <tr
                      onMouseEnter={() => setHoveredStrike(row.strike)}
                      onMouseLeave={() => setHoveredStrike(null)}
                      className={`transition-colors text-[11px] ${
                        isRowSelected ? 'bg-slate-100 dark:bg-slate-800/80' :
                        isHovered ? 'bg-gray-50/80 dark:bg-gray-800/50' : ''
                      }`}
                    >
                      {/* ══════ CALL SIDE ══════ */}

                      {/* Liquidity dot */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right ${callCursor} ${cITM} ${callRing}`}>
                        <Circle className={`w-2 h-2 inline-block ${LIQ_DOT[callLiq.tier]} ${callLiq.tier !== 'unknown' ? 'fill-current' : ''}`} />
                      </td>

                      {/* Volume with proportional bar */}
                      <td
                        onClick={callClick}
                        style={volBarStyle(call?.volume, maxVol, 'call')}
                        className={`py-1 px-1.5 text-right ${callCursor} ${cITM} ${callRing} ${row.isCallITM ? 'text-teal-800 dark:text-teal-300 font-medium' : ''}`}
                      >
                        {fmtInt(call?.volume)}
                      </td>

                      {/* OI */}
                      {showOI && (
                        <td onClick={callClick} className={`py-1 px-1.5 text-right text-slate-500 dark:text-slate-400 ${callCursor} ${cITM} ${callRing}`}>
                          {fmtInt(call?.openInterest)}
                        </td>
                      )}

                      {/* IV with heat */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right text-purple-600 dark:text-purple-400 ${callCursor} ${cITM} ${callRing} ${ivHeatBg(call?.impliedVolatilityMid)}`}>
                        {fmtIV(call?.impliedVolatilityMid)}
                      </td>

                      {/* Delta */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right ${deltaColor(call?.delta, 'call')} ${callCursor} ${cITM} ${callRing}`}>
                        {fmtNum(call?.delta, 3)}
                      </td>

                      {/* Gamma */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right text-slate-600 dark:text-slate-400 ${callCursor} ${cITM} ${callRing}`}>
                        {fmtNum(call?.gamma, 4)}
                      </td>

                      {/* Theta */}
                      {showTheta && (
                        <td onClick={callClick} className={`py-1 px-1.5 text-right text-slate-500 dark:text-slate-400 ${callCursor} ${cITM} ${callRing}`}>
                          {fmtNum(call?.theta, 2)}
                        </td>
                      )}

                      {/* Vega */}
                      {showVega && (
                        <td onClick={callClick} className={`py-1 px-1.5 text-right text-slate-500 dark:text-slate-400 ${callCursor} ${cITM} ${callRing}`}>
                          {fmtNum(call?.vega, 2)}
                        </td>
                      )}

                      {/* Bid */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right text-slate-600 dark:text-slate-400 ${callCursor} ${cITM} ${callRing}`}>
                        {fmtNum(call?.bid)}
                      </td>

                      {/* Ask (border) */}
                      <td onClick={callClick} className={`py-1 px-1.5 text-right font-bold border-r border-gray-200 dark:border-gray-800 ${callCursor} ${callRing} ${row.isCallITM ? 'bg-teal-500/15 dark:bg-teal-950/35 text-teal-900 dark:text-teal-100' : 'bg-gray-50/50 dark:bg-gray-800/30 text-slate-900 dark:text-slate-100'}`}>
                        {fmtNum(call?.ask)}
                      </td>

                      {/* ══════ CENTER STRIKE ══════ */}
                      <td className={`py-1 px-3 text-center font-bold border-x border-gray-200 dark:border-gray-800 tracking-tight ${
                        isATM
                          ? 'bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shadow-inner'
                          : isHovered
                          ? 'bg-slate-900 text-[#D08F52] dark:bg-gray-800'
                          : 'bg-gray-50/80 dark:bg-gray-800/40 text-slate-800 dark:text-slate-200'
                      }`}>
                        <div className="flex items-center justify-center gap-1 font-mono">
                          <span>{row.strike.toLocaleString()}</span>
                          {isATM && (
                            <span className="text-[8px] px-1 py-0.5 bg-black/30 text-white rounded font-bold uppercase leading-none">
                              ATM
                            </span>
                          )}
                          {isRowSelected && (
                            <ChevronDown className="w-3 h-3 inline-block ml-0.5 animate-bounce" />
                          )}
                        </div>
                      </td>

                      {/* ══════ PUT SIDE ══════ */}

                      {/* Bid (border) */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left font-bold border-l border-gray-200 dark:border-gray-800 ${putCursor} ${putRing} ${row.isPutITM ? 'bg-amber-500/15 dark:bg-amber-950/35 text-amber-900 dark:text-amber-100' : 'bg-gray-50/50 dark:bg-gray-800/30 text-slate-900 dark:text-slate-100'}`}>
                        {fmtNum(put?.bid)}
                      </td>

                      {/* Ask */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left text-slate-600 dark:text-slate-400 ${putCursor} ${pITM} ${putRing}`}>
                        {fmtNum(put?.ask)}
                      </td>

                      {/* Vega */}
                      {showVega && (
                        <td onClick={putClick} className={`py-1 px-1.5 text-left text-slate-500 dark:text-slate-400 ${putCursor} ${pITM} ${putRing}`}>
                          {fmtNum(put?.vega, 2)}
                        </td>
                      )}

                      {/* Theta */}
                      {showTheta && (
                        <td onClick={putClick} className={`py-1 px-1.5 text-left text-slate-500 dark:text-slate-400 ${putCursor} ${pITM} ${putRing}`}>
                          {fmtNum(put?.theta, 2)}
                        </td>
                      )}

                      {/* Gamma */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left text-slate-600 dark:text-slate-400 ${putCursor} ${pITM} ${putRing}`}>
                        {fmtNum(put?.gamma, 4)}
                      </td>

                      {/* Delta */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left ${deltaColor(put?.delta, 'put')} ${putCursor} ${pITM} ${putRing}`}>
                        {fmtNum(put?.delta, 3)}
                      </td>

                      {/* IV with heat */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left text-purple-600 dark:text-purple-400 ${putCursor} ${pITM} ${putRing} ${ivHeatBg(put?.impliedVolatilityMid)}`}>
                        {fmtIV(put?.impliedVolatilityMid)}
                      </td>

                      {/* OI */}
                      {showOI && (
                        <td onClick={putClick} className={`py-1 px-1.5 text-left text-slate-500 dark:text-slate-400 ${putCursor} ${pITM} ${putRing}`}>
                          {fmtInt(put?.openInterest)}
                        </td>
                      )}

                      {/* Volume with proportional bar */}
                      <td
                        onClick={putClick}
                        style={volBarStyle(put?.volume, maxVol, 'put')}
                        className={`py-1 px-1.5 text-left ${putCursor} ${pITM} ${putRing} ${row.isPutITM ? 'text-amber-800 dark:text-amber-300 font-medium' : ''}`}
                      >
                        {fmtInt(put?.volume)}
                      </td>

                      {/* Liquidity dot */}
                      <td onClick={putClick} className={`py-1 px-1.5 text-left ${putCursor} ${pITM} ${putRing}`}>
                        <Circle className={`w-2 h-2 inline-block ${LIQ_DOT[putLiq.tier]} ${putLiq.tier !== 'unknown' ? 'fill-current' : ''}`} />
                      </td>
                    </tr>

                    {/* ══════ DETAIL INSPECTOR ROW ══════ */}
                    {isRowSelected && (
                      <tr>
                        <td colSpan={totalCols} className="p-0 bg-white dark:bg-gray-900">
                          {isCallSelected && call && (
                            <ContractDetailPanel contract={call} side="call" spotPrice={spotPrice} dte={dte} onClose={() => setSelectedContract(null)} />
                          )}
                          {isPutSelected && put && (
                            <ContractDetailPanel contract={put} side="put" spotPrice={spotPrice} dte={dte} onClose={() => setSelectedContract(null)} />
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
