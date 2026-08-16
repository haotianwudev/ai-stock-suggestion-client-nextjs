"use client";
import { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { lognormalDensity, impliedPriceRange } from '@/lib/options/analytics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

// Shades the 68%/80% probability bands and draws dashed reference lines for the boundaries and
// any strategy-strike markers, reading its config from chart.options.plugins.probabilityBands —
// registered globally but a no-op (early-return) for any chart that doesn't pass that config, so
// it can't affect PayoffChartView's charts elsewhere in this same directory.
const probabilityBandsPlugin = {
    id: 'probabilityBands',
    beforeDatasetsDraw(chart: any) {
        const opts = chart.config.options.plugins?.probabilityBands;
        if (!opts) return;
        const { ctx, chartArea, scales } = chart;
        ctx.save();
        opts.bands.forEach((band: { lower: number; upper: number; color: string }) => {
            const x0 = scales.x.getPixelForValue(band.lower);
            const x1 = scales.x.getPixelForValue(band.upper);
            ctx.fillStyle = band.color;
            ctx.fillRect(x0, chartArea.top, x1 - x0, chartArea.bottom - chartArea.top);
        });
        ctx.restore();
    },
    afterDraw(chart: any) {
        const opts = chart.config.options.plugins?.probabilityBands;
        if (!opts) return;
        const { ctx, chartArea, scales } = chart;
        ctx.save();
        opts.lines.forEach((line: { value: number; color: string; label: string; dash?: number[] }, i: number) => {
            const x = scales.x.getPixelForValue(line.value);
            if (x < chartArea.left || x > chartArea.right) return;
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash(line.dash ?? [5, 4]);
            ctx.beginPath();
            ctx.moveTo(x, chartArea.top);
            ctx.lineTo(x, chartArea.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = line.color;
            ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            // Stagger label rows so overlapping lines (e.g. a strike sitting near a boundary) stay readable.
            ctx.fillText(line.label, x, chartArea.top + 11 + (i % 3) * 12);
        });
        ctx.restore();
    }
};
ChartJS.register(probabilityBandsPlugin);

export interface ProbabilityMarker {
    price: number;
    label: string;
    color: string;
}

/**
 * The market's own implied probability distribution for the underlying at expiration — a
 * risk-neutral lognormal built from the position's ATM IV (same model as probabilityOfProfit),
 * with 68%/80% two-sided confidence ranges shaded and, optionally, the strategy's own strikes
 * marked so they can be compared directly against the statistically likely range.
 */
export interface SkewAdjustedRanges {
    r68: { lower: number; upper: number };
    r80: { lower: number; upper: number };
}

export interface Skew25Delta {
    callIV: number;
    putIV: number;
    riskReversal: number;
}

export const ProbabilityRangeView = ({
    spot, T, r, q, iv, markers = [], skewRanges, skew25Delta
}: {
    spot: number; T: number; r: number; q: number; iv: number; markers?: ProbabilityMarker[];
    /** Skew-aware (asymmetric) boundaries — each side repriced with its own market IV instead of
     * one flat ATM IV. Optional: renders as a second set of reference lines when provided. */
    skewRanges?: SkewAdjustedRanges | null;
    skew25Delta?: Skew25Delta | null;
}) => {
    const { labels, density, range68, range80, wideRange } = useMemo(() => {
        const range68 = impliedPriceRange(spot, T, r, q, iv, 0.68);
        const range80 = impliedPriceRange(spot, T, r, q, iv, 0.80);
        // z ≈ 3 (99.7%-ish) as the plotting domain edge — comfortably wider than the 80% band so
        // both shaded regions and their tails are visible, not cropped at the chart's own edge.
        // Also widened to cover the skew-adjusted 80% range if it's wider (real put skew usually
        // pushes the downside boundary further out than the flat model's).
        let wideRange = impliedPriceRange(spot, T, r, q, iv, 0.9973);
        if (skewRanges) {
            wideRange = {
                lower: Math.min(wideRange.lower, skewRanges.r80.lower * 0.99),
                upper: Math.max(wideRange.upper, skewRanges.r80.upper * 1.01),
            };
        }
        const points = Array.from({ length: 121 }, (_, i) => wideRange.lower + i * ((wideRange.upper - wideRange.lower) / 120));
        return {
            labels: points,
            density: points.map(p => lognormalDensity(p, spot, T, r, q, iv)),
            range68, range80, wideRange
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spot, T, r, q, iv, skewRanges?.r80.lower, skewRanges?.r80.upper]);

    const fmtPrice = (v: number) => `$${Math.round(v).toLocaleString()}`;
    const fmtTick = (v: number) => `$${Math.round(v).toLocaleString()}`;
    const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`;

    if (T <= 0 || iv <= 0) return null;

    const markerLines = markers.map(m => ({ value: m.price, color: m.color, label: m.label }));
    const skewLines = skewRanges ? [
        { value: skewRanges.r68.lower, color: '#a855f7', label: 'skew 68%', dash: [5, 4] },
        { value: skewRanges.r68.upper, color: '#a855f7', label: 'skew 68%', dash: [5, 4] },
        { value: skewRanges.r80.lower, color: '#d8b4fe', label: 'skew 80%', dash: [3, 3] },
        { value: skewRanges.r80.upper, color: '#d8b4fe', label: 'skew 80%', dash: [3, 3] },
    ] : [];

    const chartData = {
        labels,
        datasets: [{
            label: 'Implied probability density',
            data: density,
            borderColor: '#475569',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.25,
            fill: false,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            probabilityBands: {
                bands: [
                    { lower: range80.lower, upper: range80.upper, color: 'rgba(59, 130, 246, 0.07)' },
                    { lower: range68.lower, upper: range68.upper, color: 'rgba(59, 130, 246, 0.14)' },
                ],
                lines: [
                    { value: range68.lower, color: '#3b82f6', label: '68%', dash: [5, 4] },
                    { value: range68.upper, color: '#3b82f6', label: '68%', dash: [5, 4] },
                    { value: range80.lower, color: '#93c5fd', label: '80%', dash: [3, 3] },
                    { value: range80.upper, color: '#93c5fd', label: '80%', dash: [3, 3] },
                    ...skewLines,
                    ...markerLines,
                ]
            }
        },
        scales: {
            x: {
                type: 'linear' as const,
                min: wideRange.lower,
                max: wideRange.upper,
                title: { display: true, text: 'Underlying Price at Expiration', color: '#898781', font: { size: 11 } },
                grid: { color: '#e1e0d9' },
                ticks: { color: '#898781', maxTicksLimit: 7, callback: (val: any) => fmtTick(Number(val)) }
            },
            y: {
                display: false,
            }
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-mono shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-slate-500 dark:text-slate-400 font-medium font-serif">68% range:</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{fmtPrice(range68.lower)} – {fmtPrice(range68.upper)}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-mono shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-300 flex-shrink-0" />
                    <span className="text-slate-500 dark:text-slate-400 font-medium font-serif">80% range:</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{fmtPrice(range80.lower)} – {fmtPrice(range80.upper)}</span>
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">Implied by this expiration's ATM IV — the market's own view, not a directional forecast.</span>
            </div>
            {skewRanges && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-mono shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                        <span className="text-slate-500 dark:text-slate-400 font-medium font-serif">Skew-adjusted 68%:</span>
                        <span className="text-slate-900 dark:text-slate-100 font-bold">{fmtPrice(skewRanges.r68.lower)} – {fmtPrice(skewRanges.r68.upper)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-mono shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0" />
                        <span className="text-slate-500 dark:text-slate-400 font-medium font-serif">Skew-adjusted 80%:</span>
                        <span className="text-slate-900 dark:text-slate-100 font-bold">{fmtPrice(skewRanges.r80.lower)} – {fmtPrice(skewRanges.r80.upper)}</span>
                    </span>
                    {skew25Delta && (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 px-3 py-1.5 font-mono shadow-xs">
                            <span className="text-slate-500 dark:text-slate-400 font-medium font-serif">25Δ skew (put − call IV):</span>
                            <span className={`font-bold ${skew25Delta.riskReversal >= 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {fmtPct(skew25Delta.riskReversal)}
                            </span>
                        </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">Uses each side's own real market IV instead of one flat IV — reflects the actual put/call skew.</span>
                </div>
            )}
            <div className="h-[180px] w-full bg-gray-50/70 dark:bg-gray-800/30 rounded-2xl p-3 border border-gray-100 dark:border-gray-800">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};
