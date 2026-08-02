"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Newspaper, BookOpen, ExternalLink, Maximize2, PlayCircle } from "lucide-react";
import { articles } from "@/data/articles";
import { StructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data";
import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { WikiPanel } from "@/components/wiki/wiki-panel";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube";

interface ArticleFrameProps {
  /** Slug of the article entry in src/data/articles — the frame looks up all metadata from it. */
  slug: string;
  /** Externally-authored body content, rendered as-is inside the "Article" tab. */
  children: React.ReactNode;
  /**
   * 0–2 dedicated infographic slots, shown in ADDITION to whatever images the body
   * already contains. Not defaulted from article.imageUrl — pasted body content
   * typically already embeds its own hero image, so auto-defaulting would duplicate it.
   * infographicUrls[0] renders before the body, infographicUrls[1] after.
   */
  infographicUrls?: string[];
  hideWikiTab?: boolean;
  titleOverride?: string;
  descriptionOverride?: string;
}

function toEmbedUrl(googleDoc: string): string | null {
  if (!googleDoc.includes("/pub")) return null;
  const separator = googleDoc.includes("?") ? "&" : "?";
  return googleDoc.includes("embedded=true") ? googleDoc : `${googleDoc}${separator}embedded=true`;
}

function InfographicSlot({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8 sm:my-10">
      <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
        <img
          src={src}
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
      <FullScreenImageViewer src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function YouTubeSlot({ youtubeUrl, thumbnailUrl, title }: { youtubeUrl: string; thumbnailUrl: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = youtubeEmbedUrl(youtubeUrl);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8 sm:my-10">
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-black aspect-video">
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
            <img src={thumbnailUrl} alt={title} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
              <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export function ArticleFrame({
  slug,
  children,
  infographicUrls = [],
  hideWikiTab = false,
  titleOverride,
  descriptionOverride,
}: ArticleFrameProps) {
  const [activatedTabs, setActivatedTabs] = useState<Set<string>>(new Set(["article"]));
  const currentArticle = articles.find((a) => a.slug === slug);

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
  const embedUrl = currentArticle.googleDoc ? toEmbedUrl(currentArticle.googleDoc) : null;
  const hasPaperTab = Boolean(currentArticle.googleDoc);
  const hasWikiTab = !hideWikiTab;
  const tabCount = 1 + (hasPaperTab ? 1 : 0) + (hasWikiTab ? 1 : 0);

  const handleTabChange = (value: string) => {
    setActivatedTabs((prev) => {
      if (prev.has(value)) return prev;
      const next = new Set(prev);
      next.add(value);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <StructuredData article={currentArticle} />
      <BreadcrumbStructuredData articleTitle={title} articleSlug={currentArticle.slug || slug} />
      <Header />

      <main className="flex-1">
        {/* Return to Home + meta bar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero meta: title, description, badges, date */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {currentArticle.deepResearch && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                Deep Research
              </span>
            )}
            {currentArticle.options && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                Options
              </span>
            )}
            {currentArticle.labels?.map((label) => (
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
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <Tabs defaultValue="article" onValueChange={handleTabChange} className="w-full">
            <TabsList className={`grid w-full sm:w-auto sm:inline-grid gap-1 mb-6`} style={{ gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))` }}>
              <TabsTrigger value="article" className="flex items-center gap-1.5">
                <Newspaper className="h-4 w-4" />
                Article
              </TabsTrigger>
              {hasPaperTab && (
                <TabsTrigger value="paper" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Research </span>Paper
                </TabsTrigger>
              )}
              {hasWikiTab && (
                <TabsTrigger value="wiki" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  Wiki
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="article">
              {infographicUrls[0] && <InfographicSlot src={infographicUrls[0]} alt={title} />}

              {currentArticle.youtubeUrl && (
                <YouTubeSlot
                  youtubeUrl={currentArticle.youtubeUrl}
                  thumbnailUrl={youtubeThumbnailUrl(currentArticle.youtubeUrl) || currentArticle.imageUrl || ""}
                  title={title}
                />
              )}

              <article className="max-w-5xl mx-auto">{children}</article>

              {infographicUrls[1] && <InfographicSlot src={infographicUrls[1]} alt={`${title} — additional infographic`} />}

              {currentArticle.googleDoc && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-6 sm:p-8 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Continue Learning
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                      Dive into the full research behind this article, complete with data, citations, and methodology.
                    </p>
                    <a
                      href={currentArticle.googleDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-colors text-sm"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Read Full Research Paper
                    </a>
                  </div>
                </div>
              )}
            </TabsContent>

            {hasPaperTab && activatedTabs.has("paper") && (
              <TabsContent value="paper" forceMount>
                <div className="mb-3 flex justify-end">
                  <a
                    href={currentArticle.googleDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Open in Google Docs
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title="Research paper"
                    loading="lazy"
                    className="w-full h-[70vh] sm:h-[80vh] rounded-lg border border-slate-200 dark:border-slate-800"
                  />
                ) : (
                  <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      This document isn&apos;t embeddable — open it directly in Google Docs.
                    </p>
                    <a
                      href={currentArticle.googleDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 underline"
                    >
                      Open Research Paper <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </TabsContent>
            )}

            {hasWikiTab && activatedTabs.has("wiki") && (
              <TabsContent value="wiki" forceMount>
                <WikiPanel articleSlug={currentArticle.slug || slug} />
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Educational Disclaimer */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Educational Disclaimer</h4>
            <p className="text-amber-800 dark:text-amber-400 text-sm">
              This content is for educational purposes only and does not constitute financial advice. Always conduct
              your own research and consult a qualified financial professional before making investment decisions.
            </p>
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
    </div>
  );
}
