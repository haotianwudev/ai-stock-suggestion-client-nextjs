"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GraduationCap } from 'lucide-react';
import { Strategy } from './strategy-config';
import { StrategyPayoffPanel } from './strategy-payoff-panel';
import { VideoCard, PaperCard, PaperModal, WikiCard, WikiModal, SlotKicker } from '@/components/articles/article-frame';
import { getArticleBySlug } from '@/lib/article-utils';
import { getWikiEntryForArticle } from '@/data/wiki';
import { Article } from '@/data/articles/types';

const statAccent = {
    profile: "border-[#A8672E] dark:border-[#D08F52]",
    volatility: "border-[#1D8A70] dark:border-[#3CBF9C]",
    time: "border-[#BC4128] dark:border-[#E2694A]",
} as const;

function StatChip({ label, value, accent }: { label: string; value: string; accent: keyof typeof statAccent }) {
    return (
        <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-l-4 ${statAccent[accent]} rounded-2xl p-4 md:p-5 shadow-sm`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1.5">{label}</p>
            <p className="font-mono text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">{value}</p>
        </div>
    );
}

// First sidebar section: every article tied to this strategy, in reading order (primary article
// first), as a selector rather than a plain link list — picking one drives which article's
// Video/Paper/Wiki cards render below it, so the reader can preview each article's supporting
// material without leaving the strategy page. The small external-link icon still navigates
// straight to the article for readers who just want that.
function StudyGuideCard({
    articles,
    selectedSlug,
    onSelect,
}: {
    articles: Article[];
    selectedSlug: string | undefined;
    onSelect: (slug: string) => void;
}) {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <SlotKicker icon={GraduationCap} label="Study Guide" tone="accent" />
            <div className="flex flex-col gap-2">
                {articles.map((article) => {
                    const active = article.slug === selectedSlug;
                    return (
                        <div
                            key={article.slug}
                            className={`flex items-center gap-1 rounded-lg border transition-colors ${
                                active
                                    ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10"
                                    : "border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
                            }`}
                        >
                            <button
                                onClick={() => onSelect(article.slug!)}
                                className={`flex-1 min-w-0 text-left text-sm font-medium px-3 py-2 truncate transition-colors ${
                                    active
                                        ? "text-[#A8672E] dark:text-[#D08F52]"
                                        : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                                {article.title}
                            </button>
                            <Link
                                href={`/articles/${article.slug}`}
                                className="shrink-0 pr-3 text-gray-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
                                title="Open article"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * New ArticleFrame-styled per-strategy shell, used only when strategy.detailSections is set
 * (see strategy-explorer.tsx's branch). One continuous scrolling page — no tabs — mirroring
 * how article pages read: Overview flows straight into a connected Payoff+Playbook section.
 * The sticky sidebar leads with a Study Guide — every related article, primary one first —
 * and selecting one drives the Video/Paper/Wiki cards below it (reusing ArticleFrame's own
 * components, not reimplementations) to that article's media — no strategy-level infographic.
 */
export function StrategyDetailShell({ strategy, onBack }: { strategy: Strategy; onBack: () => void }) {
    const sections = strategy.detailSections;
    const [paperOpen, setPaperOpen] = useState(false);
    const [wikiOpen, setWikiOpen] = useState(false);

    const relatedArticles = useMemo(() => {
        const found = (strategy.relatedArticles ?? [])
            .map((slug) => getArticleBySlug(slug))
            .filter((a): a is Article & { slug: string; title: string } => Boolean(a?.slug && a?.title));
        // Study guide reading order: the primary article leads, regardless of where it sits in
        // the config's relatedArticles list, since it's the strategy's main companion piece.
        const primaryIndex = strategy.primaryArticleSlug ? found.findIndex((a) => a.slug === strategy.primaryArticleSlug) : -1;
        if (primaryIndex <= 0) return found;
        return [found[primaryIndex], ...found.slice(0, primaryIndex), ...found.slice(primaryIndex + 1)];
    }, [strategy.relatedArticles, strategy.primaryArticleSlug]);

    const [selectedSlug, setSelectedSlug] = useState(relatedArticles[0]?.slug);

    // Study Guide list shows a short label when the strategy provides one — real article
    // titles run long and the sidebar column is only 336px. Everything else (VideoCard title,
    // etc.) still uses the article's real title.
    const studyGuideArticles = useMemo(
        () =>
            relatedArticles.map((a) =>
                strategy.studyGuideLabels?.[a.slug] ? { ...a, title: strategy.studyGuideLabels[a.slug] } : a
            ),
        [relatedArticles, strategy.studyGuideLabels]
    );

    if (!sections) return null;
    const { overview: Overview, playbook: Playbook } = sections;

    const selectedArticle = relatedArticles.find((a) => a.slug === selectedSlug);
    const hasVideo = Boolean(selectedArticle?.youtubeUrl);
    const hasPaper = Boolean(selectedArticle?.googleDoc);
    const wikiEntry = selectedArticle ? getWikiEntryForArticle(selectedArticle.slug) : undefined;
    const hasWiki = Boolean(wikiEntry);
    const hasPanel = relatedArticles.length > 0;

    const mainContent = (
        <>
            <Overview strategy={strategy} />
            <div>
                <h2 className="font-serif text-2xl text-gray-900 dark:text-gray-100 mb-1">The Playbook</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">The risk profile, then how to trade and manage it.</p>
                <div className="space-y-6">
                    <StrategyPayoffPanel strategy={strategy} />
                    <Playbook strategy={strategy} />
                </div>
            </div>
        </>
    );

    return (
        <div className="animate-fade-in">
            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] text-sm font-medium shadow-sm transition-colors"
                aria-label="Back to all strategies"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to all strategies
            </button>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
                {strategy.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-6">
                {strategy.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-10">
                <StatChip label="Risk / Reward" value={strategy.profile} accent="profile" />
                <StatChip label="Volatility View" value={strategy.volatility} accent="volatility" />
                <StatChip label="Time Decay View" value={strategy.time} accent="time" />
            </div>

            {hasPanel ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_336px] gap-8 lg:gap-10 items-start">
                    <div className="min-w-0 order-2 lg:order-1 space-y-10">{mainContent}</div>
                    <aside className="order-1 lg:order-2 lg:sticky lg:top-24 space-y-4">
                        <StudyGuideCard articles={studyGuideArticles} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
                        {hasVideo && selectedArticle?.youtubeUrl && (
                            <VideoCard
                                youtubeUrl={selectedArticle.youtubeUrl}
                                bilibiliUrl={selectedArticle.bilibiliUrl}
                                title={selectedArticle.title}
                                articleSlug={selectedArticle.slug}
                            />
                        )}
                        {hasPaper && selectedArticle?.googleDoc && (
                            <PaperCard googleDoc={selectedArticle.googleDoc} onExpand={() => setPaperOpen(true)} />
                        )}
                        {hasWiki && wikiEntry && <WikiCard entry={wikiEntry} onExpand={() => setWikiOpen(true)} />}
                    </aside>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto space-y-10">{mainContent}</div>
            )}

            {hasPaper && paperOpen && selectedArticle?.googleDoc && (
                <PaperModal googleDoc={selectedArticle.googleDoc} onClose={() => setPaperOpen(false)} />
            )}
            {hasWiki && wikiOpen && wikiEntry && <WikiModal entry={wikiEntry} onClose={() => setWikiOpen(false)} />}
        </div>
    );
}
