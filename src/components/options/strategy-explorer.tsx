"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { strategies, type Strategy } from './strategy-config';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/articles/article-card';
import { WheelStrategyDetail } from './strategies/wheel-strategy';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PayoffChart = ({ strategy }: { strategy: Strategy }) => {
    const stockPrice = 100, strike1 = 100, strike2 = 105, strike3 = 95, strike4 = 90, premium = 2.5;
    const labels = Array.from({ length: 41 }, (_, i) => stockPrice - 20 + i);
    
    // Use the strategy's payoff calculator
    const payoffData = labels.map(p => strategy.payoffCalculator(p, { stockPrice, strike1, strike2, strike3, strike4, premium }));

    const hasProfit = payoffData.some((v: number) => v > 0);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Profit / Loss',
                data: payoffData,
                borderColor: hasProfit ? '#10b981' : '#ef4444',
                backgroundColor: hasProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                tension: 0.1
            },
            {
                label: 'Breakeven',
                data: labels.map(() => 0),
                borderColor: '#6b7280',
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items: any) => `Stock Price: $${items[0].label}`,
                    label: (item: any) => `P/L: $${item.raw.toFixed(2)}`
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Underlying Price at Expiration' },
                grid: { color: 'rgba(200, 200, 200, 0.1)' }
            },
            y: {
                title: { display: true, text: 'Profit / Loss' },
                grid: { color: 'rgba(200, 200, 200, 0.1)' }
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

const StrategyDetail = ({ strategy, onBack }: { strategy: any, onBack: () => void }) => (
    <div className="animate-fade-in">
        <button 
            onClick={onBack} 
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
            aria-label="Back to all strategies"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to all strategies</span>
        </button>
        
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 rounded-xl border border-blue-200 shadow-lg mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">{strategy.name}</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{strategy.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Risk / Reward</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.profile}</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Volatility View</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.volatility}</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Time Decay View</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.time}</p>
            </div>
        </div>

        {/* Payoff Diagram and Video Section */}
        {(() => {
            const hasVideo = strategy.youtubeId;

            if (hasVideo) {
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Payoff Diagram */}
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">📊</span>
                                Risk Profile (Payoff Diagram)
                            </h3>
                            {strategy.payoffExplanation && (
                                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                        <span className="font-semibold text-blue-700">💡 How to Read:</span>
                                        <br />
                                        {strategy.payoffExplanation}
                                    </p>
                                </div>
                            )}
                            <div className="chart-container h-[280px] md:h-[350px] bg-gray-50 rounded-lg p-4">
                                <PayoffChart strategy={strategy} />
                            </div>
                        </div>

                        {/* YouTube Video */}
                        <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🎥</span>
                                Video Tutorial
                            </h3>
                            <div className="relative w-full h-[280px] md:h-[350px] bg-gray-50 rounded-lg overflow-hidden">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${strategy.youtubeId}`}
                                    title={`${strategy.name} Tutorial`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            // Payoff Diagram Only - For strategies without videos
            return (
                <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Risk Profile (Payoff Diagram)
                    </h3>
                    {strategy.payoffExplanation && (
                        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                <span className="font-semibold text-blue-700">💡 How to Read:</span>
                                <br />
                                {strategy.payoffExplanation}
                            </p>
                        </div>
                    )}
                    <div className="chart-container h-[280px] md:h-[350px] bg-gray-50 rounded-lg p-4">
                        <PayoffChart strategy={strategy} />
                    </div>
                </div>
            );
        })()}

        {/* Related Articles Section */}
        {strategy.relatedArticles && strategy.relatedArticles.length > 0 && (
            <div className="mt-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        Related Articles
                    </h3>
                    <p className="text-gray-600">
                        Deep dive into this strategy with comprehensive research and analysis
                    </p>
                </div>
                
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                    {strategy.relatedArticles.map((slug: string) => {
                        const article = articles.find(a => a.slug === slug);
                        if (!article || !article.title || !article.slug) return null;
                        
                        return (
                            <ArticleCard 
                                key={article.slug}
                                title={article.title}
                                description={article.description}
                                slug={article.slug}
                                date={article.date}
                                imageUrl={article.imageUrl}
                                googleDoc={article.googleDoc}
                                deepResearch={article.deepResearch}
                                youtubeUrl={article.youtubeUrl}
                                isVideo={article.isVideo}
                                options={article.options}
                                noSummary={article.noSummary}
                                podcastUrl={article.podcastUrl}
                            />
                        );
                    })}
                </div>
            </div>
        )}

        {/* Special expanded content for Wheel Strategy */}
        {strategy.id === 'wheel_strategy' && (
            <WheelStrategyDetail strategy={strategy} onBack={onBack} />
        )}


    </div>
);

// Convert strategy ID to URL slug
const strategyIdToSlug = (id: string): string => {
    return id.replace(/_/g, '-');
};

// Convert URL slug to strategy ID
const slugToStrategyId = (slug: string): string => {
    return slug.replace(/-/g, '_');
};

interface StrategyExplorerProps {
    selectedStrategyId?: string;
    onStrategySelect?: (slug: string) => void;
    onBack?: () => void;
}

export const StrategyExplorer = ({ selectedStrategyId, onStrategySelect, onBack }: StrategyExplorerProps) => {
    const [filter, setFilter] = useState('All');
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

    const filteredStrategies = filter === 'All' ? strategies : strategies.filter(s => s.category === filter);
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
        return <StrategyDetail strategy={selectedStrategy} onBack={handleBack} />;
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl border border-blue-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">Strategy Explorer</h2>
                <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                    Explore a comprehensive taxonomy of options strategies. Each strategy is designed for a specific market outlook. 
                    Use the filters below to discover strategies based on your view of the market's direction and volatility.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                {['All', 'Bullish', 'Bearish', 'Neutral', 'Volatility'].map(f => (
                    <button 
                        key={f} 
                        onClick={() => setFilter(f)} 
                        className={`btn px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base min-h-[44px] flex-1 sm:flex-initial transition-all duration-200 shadow-sm ${
                            filter === f 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md hover:scale-102'
                        }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {f}
                            <span className="text-lg">{{Bullish: '🐂', Bearish: '🐻', Neutral: '😐', Volatility: '⚡'}[f] || ''}</span>
                        </span>
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredStrategies.map(s => (
                    <div
                        key={s.id}
                        onClick={() => handleStrategyClick(s.id)}
                        className="group content-card p-5 md:p-6 cursor-pointer strategy-card border-2 border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 rounded-xl min-h-[160px] flex flex-col transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight flex-1 group-hover:text-blue-600 transition-colors">{s.name}</h3>
                            <span className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full inline-block self-start shadow-sm ${
                                {
                                    Bullish: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
                                    Bearish: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
                                    Neutral: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
                                    Volatility: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                                }[s.category]
                            }`}>
                                {s.category}
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors">
                            {s.description.split('.')[0]}.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 