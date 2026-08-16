"use client";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Zap, DollarSign, Shield, Star } from 'lucide-react';
import { strategies, strategyIdToSlug, slugToStrategyId } from './strategy-config';
import { StrategyDetailShell } from './strategy-detail-shell';
import { StrategyDetailLegacy } from './strategy-detail-legacy';

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
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${FEATURED_BADGE}`}>
                <Star className="h-3 w-3" />
                {category}
            </span>
        );
    }
    const classes = DIRECTIONAL_BADGE[category] ?? NEUTRAL_BADGE;
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${classes}`}>
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
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Sync with URL parameter
    useEffect(() => {
        if (selectedStrategyId) {
            const strategyId = slugToStrategyId(selectedStrategyId);
            setSelectedId(strategyId);
        } else {
            setSelectedId(null);
        }
    }, [selectedStrategyId]);

    const filteredStrategies = filter === 'All' ? strategies : strategies.filter(s => s.category.includes(filter as any));
    const selectedStrategy = selectedId ? strategies.find(s => s.id === selectedId) : null;

    const handleStrategyClick = (strategyId: string) => {
        const slug = strategyIdToSlug(strategyId);
        if (onStrategySelect) {
            onStrategySelect(slug);
        } else {
            setSelectedId(strategyId);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            setSelectedId(null);
        }
    };

    if (selectedStrategy) {
        return selectedStrategy.detailSections
            ? <StrategyDetailShell strategy={selectedStrategy} onBack={handleBack} />
            : <StrategyDetailLegacy strategy={selectedStrategy} onBack={handleBack} />;
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

            <div className="flex flex-wrap gap-2 p-3 md:p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800">
                {FILTERS.map((f) => {
                    const Icon = FILTER_ICONS[f];
                    const active = filter === f;
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
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
