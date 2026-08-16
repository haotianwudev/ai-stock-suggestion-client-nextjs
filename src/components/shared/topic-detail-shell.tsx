"use client";
import { useEffect, useMemo, useState } from "react";
import { LucideIcon, GraduationCap, ExternalLink, Maximize2, Image as ImageIcon, PanelRight, Rows3 } from "lucide-react";
import { BaseConfig } from "./config-types";
import { TopicAccessGate, FREE_TOPIC_IDS, PREMIUM_TOPIC_IDS } from "./topic-access-gate";
import { VideoCard, PaperCard, PaperModal, WikiCard, WikiModal, SlotKicker } from "@/components/articles/article-frame";
import { getArticleBySlug, resolveTopicMedia } from "@/lib/article-utils";
import { getWikiEntryForArticle, type WikiEntry } from "@/data/wiki";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { CommentSection } from "@/components/comments/comment-section";
import { useUser } from "@/hooks/use-user";
import { getPreferredTopicLayout } from "@/lib/topics/topic-layout-preference";

interface ResolvedItem {
    text: string;
    url: string;
    videoUrl?: string;
    visualGuideUrl?: string;
    articleSlug?: string;
    bilibiliUrl?: string;
    googleDoc?: string;
}

type LayoutMode = "sidebar" | "classic";

// Study Guide selector, shared by both layouts — picking an item drives the Video/Paper/Wiki
// cards elsewhere on the page (article-backed items only; plain external resources just open in
// a new tab). `scrollable` caps the list height with an internal scrollbar (used by the sidebar
// layout, where the list sits in a narrow sticky column); the classic layout shows the full list
// with no internal scroll, since it has the full row width to spread into.
function StudyGuideCard({
    items,
    selectedIndex,
    onSelect,
    title = "Study Guide",
    scrollable = true,
}: {
    items: ResolvedItem[];
    selectedIndex: number | null;
    onSelect: (index: number) => void;
    title?: string;
    scrollable?: boolean;
}) {
    if (items.length === 0) return null;
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <SlotKicker icon={GraduationCap} label={title} tone="accent" />
            <div className={`flex flex-col gap-2 pr-1 ${scrollable ? "max-h-[480px] overflow-y-auto" : ""}`}>
                {items.map((item, index) => {
                    const active = index === selectedIndex;
                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-1 rounded-lg border transition-colors ${
                                active
                                    ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10"
                                    : "border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
                            }`}
                        >
                            <button
                                onClick={() => onSelect(index)}
                                className={`flex-1 min-w-0 text-left text-sm font-medium px-3 py-2 truncate transition-colors ${
                                    active ? "text-[#A8672E] dark:text-[#D08F52]" : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                                {item.text}
                            </button>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 pr-3 text-gray-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
                                title="Open"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * ArticleFrame-styled shell for the Options topic pages. Header (icon + serif title +
 * description, always visible) → TopicAccessGate → a Study Guide selector that drives reactive
 * Video/Paper/Wiki cards (reused directly from article-frame.tsx), in either of two layouts the
 * reader can toggle between:
 *  - "sidebar" — the ArticleFrame two-column pattern (narrow sticky right rail), matching the
 *    strategy pages.
 *  - "classic" — closer to the original PageTemplate: Study Guide + Video side by side in a row
 *    near the top (video showing by default), full list with no internal scroll, not sticky.
 * Then, full width: the Visual Guide infographic (reactive to selection) and the topic's own
 * bespoke content. No separate "Related Articles" section — every article a topic curates
 * already appears in the Study Guide list.
 */
export function TopicDetailShell({
    config,
    icon: Icon,
    children,
}: {
    config: BaseConfig;
    icon: LucideIcon;
    children: React.ReactNode;
}) {
    const { profile } = useUser();
    const [paperOpen, setPaperOpen] = useState(false);
    const [wikiOpen, setWikiOpen] = useState(false);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    // Defaults to "classic" (matches the SSR render); once mounted, adopt the reader's saved
    // preference from profile settings (localStorage, tier-gated — see topic-layout-preference.ts).
    // The in-page Sidebar/Classic buttons below only change this for the current view, session-only
    // — Profile Settings is the one place that actually persists a new default.
    const [layout, setLayout] = useState<LayoutMode>("classic");
    useEffect(() => {
        setLayout(getPreferredTopicLayout(profile?.tier ?? 1));
    }, [profile?.tier]);

    const items = useMemo(() => {
        const resolved: ResolvedItem[] = [];
        for (const item of config.studyGuide?.items ?? []) {
            const article = item.articleSlug ? getArticleBySlug(item.articleSlug) : undefined;
            const text = item.text ?? article?.title;
            if (!text) continue;
            resolved.push({
                text,
                url: item.url ?? (article ? `/articles/${article.slug}` : "#"),
                videoUrl: item.videoUrl ?? article?.youtubeUrl,
                visualGuideUrl: item.visualGuideUrl ?? article?.infographicUrl,
                articleSlug: article?.slug,
                bilibiliUrl: article?.bilibiliUrl,
                googleDoc: article?.googleDoc,
            });
        }
        return resolved;
    }, [config.studyGuide]);

    const defaultIndex = config.primaryArticleSlug
        ? items.findIndex((item) => item.articleSlug === config.primaryArticleSlug)
        : -1;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(defaultIndex >= 0 ? defaultIndex : null);
    const selected = selectedIndex !== null ? items[selectedIndex] : null;

    // Nothing selected yet (e.g. a topic like Greeks/GEX whose hero video/infographic is set
    // directly on the config, with no primaryArticleSlug to preselect) falls back to the topic's
    // own default media instead of showing nothing — this is also what makes the video show by
    // default in the classic layout's right column.
    const topicMedia = resolveTopicMedia(config);
    const videoUrl = selected?.videoUrl ?? (selectedIndex === null ? topicMedia.videoUrl : undefined);
    const infographicUrl = selected?.visualGuideUrl ?? (selectedIndex === null ? topicMedia.infographicUrl : undefined);
    const wikiEntry: WikiEntry | undefined = selected?.articleSlug ? getWikiEntryForArticle(selected.articleSlug) : undefined;

    const hasVideo = Boolean(videoUrl);
    const hasPaper = Boolean(selected?.googleDoc);
    const hasWiki = Boolean(wikiEntry);
    const hasPanel = items.length > 0;

    const isGatedTopic = !FREE_TOPIC_IDS.includes(config.id);
    const isPremiumTopic = PREMIUM_TOPIC_IDS.includes(config.id);

    const infographicBlock = infographicUrl && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-4">
                <ImageIcon className="h-4 w-4" />
                Visual Guide
            </h3>
            <div
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setIsImageViewerOpen(true)}
            >
                <img
                    src={infographicUrl}
                    alt={`${config.title} visual guide`}
                    className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsImageViewerOpen(true);
                    }}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="View full screen"
                >
                    <Maximize2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );

    const videoCard = hasVideo && videoUrl && (
        <VideoCard youtubeUrl={videoUrl} bilibiliUrl={selected?.bilibiliUrl} title={config.title} articleSlug={selected?.articleSlug} />
    );
    const paperCard = hasPaper && selected?.googleDoc && (
        <PaperCard googleDoc={selected.googleDoc} onExpand={() => setPaperOpen(true)} />
    );
    const wikiCard = hasWiki && wikiEntry && <WikiCard entry={wikiEntry} onExpand={() => setWikiOpen(true)} />;

    const bodyContent = (
        <>
            {infographicBlock}
            {children}
            <CommentSection contentSlug={config.id} title={config.title} />
        </>
    );

    return (
        <div className="animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-3 md:gap-4 min-w-0">
                    <div className="flex items-center justify-center size-10 md:size-12 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] shrink-0">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-1.5 leading-tight">
                            {config.title}
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            {config.description}
                        </p>
                    </div>
                </div>
                {hasPanel && (
                    <div className="hidden sm:inline-flex shrink-0 rounded-lg border border-gray-200 dark:border-gray-800 p-0.5 bg-gray-50 dark:bg-gray-950">
                        <button
                            onClick={() => setLayout("sidebar")}
                            title="Sidebar layout"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                layout === "sidebar"
                                    ? "bg-white dark:bg-gray-900 text-[#A8672E] dark:text-[#D08F52] shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            <PanelRight className="h-3.5 w-3.5" />
                            Sidebar
                        </button>
                        <button
                            onClick={() => setLayout("classic")}
                            title="Classic layout"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                layout === "classic"
                                    ? "bg-white dark:bg-gray-900 text-[#A8672E] dark:text-[#D08F52] shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            <Rows3 className="h-3.5 w-3.5" />
                            Classic
                        </button>
                    </div>
                )}
            </div>

            <TopicAccessGate enabled={isGatedTopic || isPremiumTopic} strictTierOnly={isPremiumTopic}>
                {!hasPanel ? (
                    <div className="max-w-5xl mx-auto space-y-6">{bodyContent}</div>
                ) : layout === "sidebar" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_336px] gap-8 lg:gap-10 items-start">
                        <div className="min-w-0 order-2 lg:order-1 space-y-6">{bodyContent}</div>
                        <aside className="order-1 lg:order-2 lg:sticky lg:top-24 space-y-4">
                            <StudyGuideCard
                                items={items}
                                selectedIndex={selectedIndex}
                                onSelect={setSelectedIndex}
                                title={config.studyGuide?.title || "Study Guide"}
                            />
                            {videoCard}
                            {paperCard}
                            {wikiCard}
                        </aside>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                            <div className="lg:col-span-1">
                                <StudyGuideCard
                                    items={items}
                                    selectedIndex={selectedIndex}
                                    onSelect={setSelectedIndex}
                                    title={config.studyGuide?.title || "Study Guide"}
                                    scrollable={false}
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                {videoCard}
                                {paperCard}
                                {wikiCard}
                            </div>
                        </div>
                        {bodyContent}
                    </div>
                )}
            </TopicAccessGate>

            {hasPaper && paperOpen && selected?.googleDoc && (
                <PaperModal googleDoc={selected.googleDoc} onClose={() => setPaperOpen(false)} />
            )}
            {hasWiki && wikiOpen && wikiEntry && <WikiModal entry={wikiEntry} onClose={() => setWikiOpen(false)} />}
            {infographicUrl && (
                <FullScreenImageViewer
                    src={infographicUrl}
                    alt={`${config.title} visual guide`}
                    isOpen={isImageViewerOpen}
                    onClose={() => setIsImageViewerOpen(false)}
                />
            )}
        </div>
    );
}
