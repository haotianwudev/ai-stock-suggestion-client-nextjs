"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, BookOpen, ExternalLink, Maximize2, PlayCircle, ImageIcon, X } from "lucide-react";
import { articles } from "@/data/articles";
import { Article, ArticleLabel } from "@/data/articles/types";
import { StructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data";
import { Header } from "@/components/layout/header";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube";
import { stripFrontmatter, wikiPathToPublicFile, wikiPathToRoute } from "@/lib/wiki";
import { getWikiEntryForArticle, type WikiEntry } from "@/data/wiki";
import { WikiMarkdown } from "@/components/wiki/wiki-markdown";
import { CommentSection } from "@/components/comments/comment-section";
import { YoutubeSubscribeGate } from "@/components/articles/youtube-subscribe-gate";

interface ArticleFrameProps {
  /** Slug of the article entry in src/data/articles — the frame looks up all metadata from it. */
  slug: string;
  /** Externally-authored body content, rendered as-is. Place <InfographicSlot> inline
   * wherever an infographic naturally belongs in the argument — the frame no longer
   * forces one to the top of the page. */
  children: React.ReactNode;
  hideWikiTab?: boolean;
  hideComments?: boolean;
  titleOverride?: string;
  descriptionOverride?: string;
  /**
   * Optional article-specific disclaimer addendum (e.g. risk notes particular to this
   * article's topic), shown ALONGSIDE — never instead of — the universal disclaimer below.
   * Use this instead of adding a second disclaimer box inside the body.
   */
  additionalDisclaimer?: string;
}

// The single, reused-everywhere disclaimer. Topic-agnostic on purpose — article-specific
// risk language (e.g. options risk, a particular metric's limitations) belongs in
// `additionalDisclaimer`, not here, since not every article covers the same territory.
const UNIVERSAL_DISCLAIMER =
  "This content is for educational purposes only and does not constitute financial advice. " +
  "Past performance does not guarantee future results. Always conduct your own research and " +
  "consult a qualified financial professional before making investment decisions.";

function toEmbedUrl(googleDoc: string): string | null {
  if (!googleDoc.includes("/pub")) return null;
  const separator = googleDoc.includes("?") ? "&" : "?";
  return googleDoc.includes("embedded=true") ? googleDoc : `${googleDoc}${separator}embedded=true`;
}

function SlotKicker({ icon: Icon, label, tone }: { icon: React.ElementType; label: string; tone: "accent" | "red" }) {
  const toneClass = tone === "red" ? "text-red-600 dark:text-red-400" : "text-[#A8672E] dark:text-[#D08F52]";
  return (
    <div className={`flex items-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-wider ${toneClass}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

// Exposes the current article (looked up once, by ArticleFrame itself) to body
// content nested inside it — e.g. InfographicSlot reads `infographicUrl` off of
// this instead of every page.tsx re-deriving the same `articles.find(...)` lookup.
const CurrentArticleContext = createContext<Article | null>(null);

export function useCurrentArticle(): Article | null {
  return useContext(CurrentArticleContext);
}

/**
 * Import and place inline wherever an infographic naturally fits the article's own
 * argument (e.g. mid-way through, next to the section it illustrates) — not forced
 * to a fixed top/bottom slot by the frame.
 *
 * `src` is optional — omit it to use the current article's `infographicUrl` from
 * the registry (the standard path for anything written after this field existed).
 * Pass it explicitly only for an article with multiple distinct infographics, since
 * the registry only holds one.
 */
export function InfographicSlot({
  src,
  alt,
  label = "Featured Infographic",
}: {
  src?: string;
  alt: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const currentArticle = useCurrentArticle();
  const resolvedSrc = src ?? currentArticle?.infographicUrl;

  if (!resolvedSrc) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `InfographicSlot: no src provided and no infographicUrl set on the current article (alt="${alt}").`
      );
    }
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto my-8 sm:my-10">
      <SlotKicker icon={ImageIcon} label={label} tone="accent" />
      <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          className="w-full h-auto object-contain cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <button
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="View full screen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      <FullScreenImageViewer src={resolvedSrc} alt={alt} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

// Persistent, sticky mini-player — stays mounted and playing in the right panel while
// the reader scrolls the main column, so watching and reading aren't mutually exclusive.
function VideoCard({ youtubeUrl, title }: { youtubeUrl: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = youtubeEmbedUrl(youtubeUrl);
  const thumbnailUrl = youtubeThumbnailUrl(youtubeUrl);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-4 pt-4 pb-2">
        <SlotKicker icon={PlayCircle} label="Watch" tone="red" />
      </div>
      <div className="relative aspect-video bg-black">
        {playing && embedUrl ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={title}
            className="w-full h-full"
            allow="accelerate-compute; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group touch-manipulation"
            aria-label={`Play video: ${title}`}
          >
            {thumbnailUrl && (
              <img src={thumbnailUrl} alt={title} loading="lazy" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// Sits directly below "Return to Home" — previousArticle is the chronologically
// older entry (next index, since `articles` is newest-first), nextArticle is newer
// (previous index). Either side is omitted when there's no adjacent article.
function ArticleNavLinks({
  previousArticle,
  nextArticle,
}: {
  previousArticle?: Article;
  nextArticle?: Article;
}) {
  if (!previousArticle && !nextArticle) return null;
  const linkClass =
    "flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] text-sm shadow-sm transition-colors";
  const kickerClass = "block text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500 font-semibold";
  return (
    <div className="flex flex-col gap-2">
      {previousArticle && (
        <Link href={`/articles/${previousArticle.slug}`} className={linkClass}>
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="min-w-0">
            <span className={kickerClass}>Previous</span>
            <span className="block truncate font-medium">{previousArticle.title}</span>
          </span>
        </Link>
      )}
      {nextArticle && (
        <Link href={`/articles/${nextArticle.slug}`} className={`${linkClass} justify-end text-right`}>
          <span className="min-w-0">
            <span className={kickerClass}>Next</span>
            <span className="block truncate font-medium">{nextArticle.title}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      )}
    </div>
  );
}

function PaperCard({ googleDoc, onExpand }: { googleDoc: string; onExpand: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <SlotKicker icon={FileText} label="Research Paper" tone="accent" />
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        The full source paper behind this article — read it inline or open it in Google Docs.
      </p>
      <div className="flex flex-col gap-2">
        <button
          onClick={onExpand}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-[#A8672E] hover:bg-[#8f5726] dark:bg-[#D08F52] dark:hover:bg-[#c17f47] text-white dark:text-[#14171B] transition-colors"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Read inline
        </button>
        <a
          href={googleDoc}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#A8672E] dark:text-[#D08F52] hover:text-[#8f5726] dark:hover:text-[#e2a877] py-1"
        >
          Open in Google Docs
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

// Teaser from the registry (title + summary) with the same two-action shape as
// PaperCard: an inline "Read inline" modal for the full entry, plus a link to the
// standalone page. Mirrors the Research Paper card on purpose — both are "the full
// source material behind this article," so they should behave the same way.
function WikiCard({ entry, onExpand }: { entry: WikiEntry; onExpand: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
      <SlotKicker icon={BookOpen} label="Wiki" tone="accent" />
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{entry.title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3">{entry.summary}</p>
      <div className="flex flex-col gap-2">
        <button
          onClick={onExpand}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-[#A8672E] hover:bg-[#8f5726] dark:bg-[#D08F52] dark:hover:bg-[#c17f47] text-white dark:text-[#14171B] transition-colors"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Read inline
        </button>
        <Link
          href={wikiPathToRoute(entry.path)}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#A8672E] dark:text-[#D08F52] hover:text-[#8f5726] dark:hover:text-[#e2a877] py-1"
        >
          View full page
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

// Opened from the Wiki card's "Read inline" action — same modal-over-the-article
// shape as PaperModal, so both "source material" cards behave identically. Fetches
// the markdown lazily (only once opened) since the teaser card never needed it.
function WikiModal({ entry, onClose }: { entry: WikiEntry; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(wikiPathToPublicFile(entry.path))
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then((raw) => {
        if (cancelled) return;
        setContent(stripFrontmatter(raw).content);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [entry]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <Link
            href={wikiPathToRoute(entry.path)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A8672E] dark:text-[#D08F52] hover:text-[#8f5726] dark:hover:text-[#e2a877]"
          >
            View full wiki page
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 dark:bg-gray-950">
          {status === "loading" && (
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
            </div>
          )}
          {status === "missing" && (
            <div className="flex flex-col items-center text-center py-12">
              <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Wiki entry coming soon for this article.</p>
            </div>
          )}
          {status === "ready" && <WikiMarkdown content={content ?? ""} />}
        </div>
      </div>
    </div>
  );
}

// Opened from the Research Paper card's "Read inline" action — a roomy overlay rather
// than a cramped sidebar iframe, and it doesn't disturb the reader's scroll position
// in the main article underneath.
function PaperModal({ googleDoc, onClose }: { googleDoc: string; onClose: () => void }) {
  const embedUrl = toEmbedUrl(googleDoc);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <a
            href={googleDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A8672E] dark:text-[#D08F52] hover:text-[#8f5726] dark:hover:text-[#e2a877]"
          >
            Open in Google Docs
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 bg-gray-50 dark:bg-gray-950">
          {embedUrl ? (
            <iframe src={embedUrl} title="Research paper" className="w-full h-full" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                This document isn&apos;t embeddable — open it directly in Google Docs.
              </p>
              <a
                href={googleDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A8672E] dark:text-[#D08F52] underline"
              >
                Open Research Paper <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArticleFrame({
  slug,
  children,
  hideWikiTab = false,
  hideComments = false,
  titleOverride,
  descriptionOverride,
  additionalDisclaimer,
}: ArticleFrameProps) {
  const [paperOpen, setPaperOpen] = useState(false);
  const [wikiOpen, setWikiOpen] = useState(false);
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const currentArticle = currentIndex >= 0 ? articles[currentIndex] : undefined;
  // `articles` is newest-first, so walking toward higher indices finds older
  // (Previous) articles and lower indices finds newer (Next) ones. Legacy
  // isVideo/noSummary entries have no page at /articles/{slug} (they're a
  // video-only or external-link card, never migrated to their own route), so
  // skip past them rather than linking somewhere that 404s.
  const findAdjacentArticle = (step: 1 | -1) => {
    for (let i = currentIndex + step; i >= 0 && i < articles.length; i += step) {
      const candidate = articles[i];
      if (!candidate.isVideo && !candidate.noSummary) return candidate;
    }
    return undefined;
  };
  const previousArticle = currentIndex >= 0 ? findAdjacentArticle(1) : undefined;
  const nextArticle = currentIndex >= 0 ? findAdjacentArticle(-1) : undefined;

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">Article not found.</p>
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 underline">
            Return to Home
          </Link>
        </main>
      </div>
    );
  }

  const title = titleOverride ?? currentArticle.title;
  const description = descriptionOverride ?? currentArticle.description;
  const wikiEntry = getWikiEntryForArticle(currentArticle.slug || slug);
  // Each panel card is optional and only appears when there's actually something to show.
  const hasVideo = Boolean(currentArticle.youtubeUrl);
  const hasPaper = Boolean(currentArticle.googleDoc);
  const hasWiki = !hideWikiTab && Boolean(wikiEntry);
  const hasPanel = hasVideo || hasPaper || hasWiki;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <StructuredData article={currentArticle} />
      <BreadcrumbStructuredData articleTitle={title} articleSlug={currentArticle.slug || slug} />
      <Header />

      <main className="flex-1">
        {/* Return to Home — only shown up here when there's no support-material panel
            to hold it; when the panel exists it moves there instead (see below). */}
        {!hasPanel && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex flex-col gap-2 items-start">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] font-medium text-sm shadow-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
            <div className="w-full max-w-md">
              <ArticleNavLinks previousArticle={previousArticle} nextArticle={nextArticle} />
            </div>
          </div>
        )}

        {/* Hero meta: title, description, badges, date */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {currentArticle.options && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                Options
              </span>
            )}
            {currentArticle.labels
              // Options already gets its own dedicated badge above, and Deep Research
              // is intentionally not shown at all — postprocessArticles()
              // (src/data/articles/types.ts) auto-merges both into `labels` from the
              // deepResearch/options flags, so this array needs filtering either way.
              ?.filter((label) => label !== ArticleLabel.DEEP_RESEARCH && label !== ArticleLabel.OPTIONS)
              .map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                >
                  {label}
                </span>
              ))}
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">{currentArticle.date}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            {title}
          </h1>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Body + support-material panel. On mobile the panel cards stack below the
            article in source order; on desktop (lg+) they sit in a sticky right rail
            so video/paper/wiki stay reachable without leaving the article's scroll
            position. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <CurrentArticleContext.Provider value={currentArticle}>
            {hasPanel ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_336px] gap-8 lg:gap-10 items-start">
                <article>
                  {hasVideo ? (
                    <YoutubeSubscribeGate videoUrl={currentArticle.youtubeUrl!}>{children}</YoutubeSubscribeGate>
                  ) : (
                    children
                  )}
                </article>
                <aside className="lg:sticky lg:top-24 space-y-4">
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] font-medium text-sm shadow-sm transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Home
                  </Link>
                  <ArticleNavLinks previousArticle={previousArticle} nextArticle={nextArticle} />
                  {hasVideo && <VideoCard youtubeUrl={currentArticle.youtubeUrl!} title={title} />}
                  {hasPaper && (
                    <PaperCard googleDoc={currentArticle.googleDoc!} onExpand={() => setPaperOpen(true)} />
                  )}
                  {hasWiki && wikiEntry && <WikiCard entry={wikiEntry} onExpand={() => setWikiOpen(true)} />}
                </aside>
              </div>
            ) : (
              <article className="max-w-5xl mx-auto">{children}</article>
            )}
          </CurrentArticleContext.Provider>
        </div>

        {!hideComments && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <CommentSection contentSlug={currentArticle.slug || slug} title={title} />
          </div>
        )}

        {/* Educational Disclaimer — universal text is always shown and reused verbatim across
            every article; additionalDisclaimer appends article-specific wording, it never
            replaces the universal text. Pass it instead of adding a second box in the body. */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Educational Disclaimer</h4>
            <p className="text-amber-800 dark:text-amber-400 text-sm">{UNIVERSAL_DISCLAIMER}</p>
            {additionalDisclaimer && (
              <p className="text-amber-800 dark:text-amber-400 text-sm mt-2">{additionalDisclaimer}</p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2026 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>

      {hasPaper && paperOpen && (
        <PaperModal googleDoc={currentArticle.googleDoc!} onClose={() => setPaperOpen(false)} />
      )}
      {hasWiki && wikiEntry && wikiOpen && (
        <WikiModal entry={wikiEntry} onClose={() => setWikiOpen(false)} />
      )}
    </div>
  );
}
