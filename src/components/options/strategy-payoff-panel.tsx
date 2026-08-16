"use client";
import { LineChart, Lightbulb } from 'lucide-react';
import { Strategy } from './strategy-config';
import { PayoffChart } from './strategy-payoff-fallback-chart';
import { SpxPayoffBuilder } from './spx-payoff-builder';

/**
 * Restyled Payoff content, connected directly into the Playbook flow by StrategyDetailShell
 * (no separate tab) — same underlying payoff diagram as the legacy view, just re-skinned to
 * the ArticleFrame card system with dark mode. Video/paper/wiki live in the sidebar instead
 * (driven by whichever related article is selected there), and there's no infographic on this
 * track. Does not touch SpxPayoffBuilder/PayoffChartView internals.
 */
export function StrategyPayoffPanel({ strategy }: { strategy: Strategy }) {
    const CustomBuilder = strategy.customPayoffBuilder;
    const payoffSection = strategy.payoffPresetId
        ? <SpxPayoffBuilder initialPresetId={strategy.payoffPresetId} lockPreset initialExpirationTargetDte={strategy.payoffExpirationTargetDte} />
        : CustomBuilder
        ? <CustomBuilder strategy={strategy} />
        : <PayoffChart strategy={strategy} />;

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-4">
                <LineChart className="h-4 w-4" />
                Risk Profile (Payoff Diagram)
            </h3>
            {strategy.payoffExplanation && (
                <div className="mb-4 bg-gray-50 dark:bg-gray-950/50 border-l-4 border-[#A8672E] dark:border-[#D08F52] rounded-r-lg p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#A8672E] dark:text-[#D08F52] mb-1.5">
                        <Lightbulb className="h-3.5 w-3.5" />
                        How to Read
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{strategy.payoffExplanation}</p>
                </div>
            )}
            {payoffSection}
        </div>
    );
}
