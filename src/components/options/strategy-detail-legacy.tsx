"use client";
import { useState } from "react";
import { Maximize2 } from 'lucide-react';
import { Strategy, getStrategyDetailComponent } from './strategy-config';
import { PayoffChart } from './strategy-payoff-fallback-chart';
import { SpxPayoffBuilder } from './spx-payoff-builder';
import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/articles/article-card';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { resolveStrategyMedia } from '@/lib/article-utils';

/**
 * Verbatim extraction of the pre-redesign per-strategy detail view (unmodified, no styling
 * changes) — kept so the ~16 strategies not yet migrated to `StrategyDetailShell` keep
 * rendering exactly as before. Do not restyle this file; restyle StrategyDetailShell instead
 * and migrate the strategy to `detailSections` per the sophie-option-strategy skill.
 */
export const StrategyDetailLegacy = ({ strategy, onBack }: { strategy: Strategy, onBack: () => void }) => {
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const media = resolveStrategyMedia(strategy);

    return (
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
                const hasVideo = media.youtubeId;
                const CustomBuilder = strategy.customPayoffBuilder;
                const payoffSection = strategy.payoffPresetId
                    ? <SpxPayoffBuilder initialPresetId={strategy.payoffPresetId} lockPreset initialExpirationTargetDte={strategy.payoffExpirationTargetDte} />
                    : CustomBuilder
                    ? <CustomBuilder strategy={strategy} />
                    : <PayoffChart strategy={strategy} />;

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
                                {payoffSection}
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
                                        src={`https://www.youtube.com/embed/${media.youtubeId}`}
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
                        {payoffSection}
                    </div>
                );
            })()}

            {/* Infographic Section - Display if available */}
            {media.infographicUrl && (
                <section className="mb-6">
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                        onClick={() => setIsImageViewerOpen(true)}
                    >
                        <img
                            src={media.infographicUrl}
                            alt={`${strategy.name} Strategy Infographic`}
                            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                        {/* Full-screen button overlay */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageViewerOpen(true);
                            }}
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                            title="View full screen"
                        >
                            <Maximize2 className="h-4 w-4" />
                        </button>
                        {/* Click hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                                Click to view full screen
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Related Articles Section */}
            {strategy.relatedArticles && strategy.relatedArticles.length > 0 && (
                <div className="mt-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-2xl">📚</span>
                            Related Articles
                        </h3>
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
                                    bilibiliUrl={article.bilibiliUrl}
                                    bilibiliTitle={article.bilibiliTitle}
                                    isVideo={article.isVideo}
                                    options={article.options}
                                    noSummary={article.noSummary}
                                    podcastUrl={article.podcastUrl}
                                    websiteUrl={article.websiteUrl}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Strategy Detail Component */}
            {(() => {
                const StrategyDetailComponent = getStrategyDetailComponent(strategy.id);
                return <StrategyDetailComponent strategy={strategy} onBack={onBack} />;
            })()}

            {/* Full-screen image viewer */}
            {media.infographicUrl && (
                <FullScreenImageViewer
                    src={media.infographicUrl}
                    alt={`${strategy.name} Strategy Infographic`}
                    isOpen={isImageViewerOpen}
                    onClose={() => setIsImageViewerOpen(false)}
                />
            )}
        </div>
    );
};
