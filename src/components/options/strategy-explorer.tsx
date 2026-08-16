"use client";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Zap, DollarSign, Shield, Star } from 'lucide-react';
import { strategies, strategyIdToSlug, slugToStrategyId } from './strategy-config';
import { StrategyDetailShell } from './strategy-detail-shell';

const FILTERS = ['All', 'Featured', 'Bullish', 'Bearish', 'Neutral', 'Volatility', 'Income', 'Risk Defined'] as const;

const FILTER_ICONS: Record<string, typeof Star> = {
    Featured: Star,
    Bullish: TrendingUp,
    Bearish: TrendingDown,
    Neutral: Minus,
    Volatility: Zap,
    Income: DollarSign,
    'Risk Defined': Shield,
};

const DIRECTIONAL_BADGE: Record<string, string> = {
    Bullish: "bg-[#1D8A70]/10 text-[#1D8A70] dark:bg-[#3CBF9C]/10 dark:text-[#3CBF9C] border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30",
    Bearish: "bg-[#BC4128]/10 text-[#BC4128] dark:bg-[#E2694A]/10 dark:text-[#E2694A] border border-[#BC4128]/30 dark:border-[#E2694A]/30",
};
const NEUTRAL_BADGE = "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800";
const FEATURED_BADGE = "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800";

function CategoryBadge({ category }: { category: string }) {
    if (category === 'Featured') {
        return (
            <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${FEATURED_BADGE}`}>
                <Star className="h-3 w-3" />
                {category}
            </span>
        );
    }
    const classes = DIRECTIONAL_BADGE[category] ?? NEUTRAL_BADGE;
    return (
        <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${classes}`}>
            {category}
        </span>
    );
}

interface StrategyExplorerProps {
    selectedStrategyId?: string;
    onStrategySelect?: (slug: string) => void;
    onBack?: () => void;
}

export const StrategyExplorer = ({ selectedStrategyId, onStrategySelect, onBack }: StrategyExplorerProps) => {
    const [filter, setFilter] = useState('Featured');

    useEffect(() => {
        if (selectedStrategyId) {
            const found = strategies.find(s => s.id === selectedStrategyId);
            if (found) {
                // If a strategy is explicitly passed in from an external tab/URL, show all or ensure it's visible
                setFilter('All');
            }
        }
    }, [selectedStrategyId]);

    const filteredStrategies = strategies.filter(s => {
        if (filter === 'All') return true;
        if (filter === 'Featured') return s.category.includes('Featured');
        if (filter === 'Bullish') return s.category.includes('Bullish');
        if (filter === 'Bearish') return s.category.includes('Bearish');
        if (filter === 'Neutral') return s.category.includes('Neutral');
        if (filter === 'Volatility') return s.category.includes('Volatility');
        if (filter === 'Income') return s.category.includes('Income');
        if (filter === 'Risk Defined') return s.category.includes('Risk Defined');
        return true;
    });

    const handleStrategyClick = (strategyId: string) => {
        const slug = strategyIdToSlug(strategyId);
        if (onStrategySelect) {
            onStrategySelect(slug);
        }
    };

    const selectedStrategy = selectedStrategyId ? strategies.find(s => s.id === selectedStrategyId) : undefined;

    if (selectedStrategy) {
        return <StrategyDetailShell strategy={selectedStrategy} onBack={onBack || (() => {})} />;
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3">Strategy Explorer</h2>
                <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Explore a comprehensive taxonomy of options strategies. Each strategy is designed for a specific market outlook.
                    Use the filters below to discover strategies based on your view of the market's direction and volatility.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 p-2.5 md:p-3 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
                {FILTERS.map((f) => {
                    const Icon = FILTER_ICONS[f];
                    const active = filter === f;
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                                active
                                    ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-[#14171B]'
                                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40'
                            }`}
                        >
                            {Icon && <Icon className="h-3.5 w-3.5" />}
                            {f}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredStrategies.map(s => (
                    <div
                        key={s.id}
                        onClick={() => handleStrategyClick(s.id)}
                        className="group bg-white dark:bg-gray-900 p-5 md:p-6 cursor-pointer border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-colors rounded-2xl shadow-sm min-h-[160px] flex flex-col"
                    >
                        <div className="flex flex-col gap-3 mb-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight flex-1 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">{s.name}</h3>
                                {s.category.length <= 2 && (
                                    <div className="flex flex-wrap gap-1">
                                        {s.category.map((cat) => <CategoryBadge key={cat} category={cat} />)}
                                    </div>
                                )}
                            </div>
                            {s.category.length > 2 && (
                                <div className="flex flex-wrap gap-1 justify-end">
                                    {s.category.map((cat) => <CategoryBadge key={cat} category={cat} />)}
                                </div>
                            )}
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                            {s.description.split('.')[0]}.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
