"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { findBreakevens } from '@/lib/options/payoff';

// Deliberately a leaf module: no import from strategy-config.ts or strategy-explorer.tsx. Both
// the static per-strategy diagrams and the interactive Iron Condor builder (itself imported by
// strategy-config.ts) render through this component, so it must not import anything upstream of
// either of them — doing so previously created a circular import (strategy-config.ts ->
// iron-condor-builder.tsx -> strategy-explorer.tsx -> strategy-config.ts) that only failed at
// runtime depending on which page loaded first.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Status colors: profit/loss is good/bad, not series identity, so it's colored
// by point sign rather than picked once for the whole line.
const GOOD = '#0ca30c';
const GOOD_FILL = 'rgba(12, 163, 12, 0.1)';
const CRITICAL = '#d03b3b';
const CRITICAL_FILL = 'rgba(208, 59, 59, 0.1)';
const BASELINE = '#c3c2b7';
const OVERLAY = '#1c5cab';
const GRID = '#e1e0d9';
const MUTED = '#898781';

// Comma-format magnitudes >= 1000 (real SPX position P&L runs into the thousands) so a chip
// reads "+$1,565.00" instead of "+$1565.00"; small (illustrative ~$100-scale) values keep cents
// without commas.
const fmtMagnitude = (v: number) => Math.abs(v) >= 1000
    ? Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : Math.abs(v).toFixed(2);
const fmtCurrency = (v: number) => `${v >= 0 ? '+' : '-'}$${fmtMagnitude(v)}`;
const fmtPrice = (v: number) => `$${fmtMagnitude(v)}`;

// Ticks show cents for small (illustrative, ~$100-scale) numbers and whole dollars for large
// (real SPX-scale) ones, so a $4,577.34 underlying-price tick doesn't render 3 decimal places.
const fmtTick = (v: number) => (Math.abs(v) >= 1000 ? `$${Math.round(v).toLocaleString()}` : `$${v}`);

const StatChip = ({ tone, label, value }: { tone: 'good' | 'critical' | 'neutral'; label: string; value: string }) => {
    const dot = tone === 'good' ? GOOD : tone === 'critical' ? CRITICAL : BASELINE;
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-2.5 py-1 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
            <span className="text-gray-500 font-medium">{label}:</span>
            <span className="text-gray-900 font-semibold">{value}</span>
        </span>
    );
};

export interface OverlaySeries {
    label: string;
    data: number[];
}

export interface StatChipSpec {
    tone: 'good' | 'critical' | 'neutral';
    label: string;
    value: string;
}

/**
 * Pure presentation: renders a payoff chart + Max Profit/Max Loss/Breakeven stat chips from an
 * already-computed price/P&L series. No knowledge of where payoffData came from — a strategy's
 * payoffCalculator, or a user-assembled set of real chain legs via legsPnL — so this is shared by
 * both the static per-strategy diagrams and the interactive builders.
 *
 * `overlaySeries` (same `labels`, its own P&L values) renders as a second dashed line — e.g. a
 * "value today" (T+0) curve alongside the expiration payoff. `additionalStats` appends more chips
 * (e.g. net Greeks, probability of profit) after the standard three. Both optional and additive:
 * existing callers that omit them see no change.
 */
export const PayoffChartView = ({
    labels, payoffData, profile, overlaySeries, additionalStats
}: {
    labels: number[];
    payoffData: number[];
    profile: string;
    overlaySeries?: OverlaySeries;
    additionalStats?: StatChipSpec[];
}) => {
    const maxProfit = Math.max(...payoffData);
    const maxLoss = Math.min(...payoffData);
    const unlimitedProfit = /unlimited profit/i.test(profile);
    const unlimitedRisk = /unlimited risk/i.test(profile);

    const breakevens = findBreakevens(labels, payoffData);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Profit / Loss',
                data: payoffData,
                borderColor: GOOD,
                backgroundColor: GOOD_FILL,
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                tension: 0,
                // Color each segment by where it lands relative to $0, not by whether the
                // strategy has profit potential anywhere — a defined-risk spread's loss
                // wings must not render the same color as its profit zone.
                segment: {
                    borderColor: (ctx: any) => (ctx.p1.parsed.y < 0 ? CRITICAL : GOOD),
                    backgroundColor: (ctx: any) => (ctx.p1.parsed.y < 0 ? CRITICAL_FILL : GOOD_FILL),
                }
            },
            {
                label: 'Breakeven',
                data: labels.map(() => 0),
                borderColor: BASELINE,
                borderWidth: 1,
                pointRadius: 0,
                borderDash: [4, 4]
            },
            ...(overlaySeries ? [{
                label: overlaySeries.label,
                data: overlaySeries.data,
                borderColor: OVERLAY,
                borderWidth: 2,
                borderDash: [6, 3],
                fill: false,
                pointRadius: 0,
                tension: 0.15,
            }] : [])
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index' as const, intersect: false },
        plugins: {
            legend: { display: !!overlaySeries, position: 'bottom' as const, labels: { color: MUTED, boxWidth: 16, filter: (item: any) => item.text !== 'Breakeven' } },
            tooltip: {
                filter: (item: any) => item.dataset.label !== 'Breakeven',
                callbacks: {
                    title: (items: any) => `Underlying: ${fmtTick(Number(items[0].label))}`,
                    label: (item: any) => `${item.dataset.label === 'Profit / Loss' ? 'P/L at expiration' : item.dataset.label}: ${fmtCurrency(item.raw as number)}`,
                    labelColor: (item: any) => {
                        const positive = (item.raw as number) >= 0;
                        return { borderColor: positive ? GOOD : CRITICAL, backgroundColor: positive ? GOOD : CRITICAL };
                    }
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Underlying Price at Expiration', color: MUTED },
                grid: { color: GRID },
                ticks: { color: MUTED, maxTicksLimit: 9, callback: (_val: any, idx: number) => fmtTick(labels[idx]) }
            },
            y: {
                title: { display: true, text: 'Profit / Loss', color: MUTED },
                grid: { color: GRID },
                ticks: { color: MUTED, callback: (val: any) => fmtCurrency(Number(val)) }
            }
        }
    };

    return (
        <>
            <div className="chart-container h-[280px] md:h-[350px] bg-gray-50 rounded-lg p-4">
                <Line data={chartData} options={options} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatChip tone="good" label="Max Profit" value={unlimitedProfit ? 'Unlimited' : fmtCurrency(maxProfit)} />
                <StatChip tone="critical" label="Max Loss" value={unlimitedRisk ? 'Unlimited' : fmtCurrency(maxLoss)} />
                {breakevens.length > 0 && (
                    <StatChip
                        tone="neutral"
                        label={breakevens.length > 1 ? 'Breakevens' : 'Breakeven'}
                        value={breakevens.map(fmtPrice).join(' / ')}
                    />
                )}
                {additionalStats?.map((s, i) => (
                    <StatChip key={i} tone={s.tone} label={s.label} value={s.value} />
                ))}
            </div>
        </>
    );
};
