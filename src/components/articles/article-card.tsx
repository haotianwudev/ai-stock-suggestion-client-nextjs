"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Music, Maximize2, PlayCircle, ImageIcon } from "lucide-react";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { useState } from "react";
import { youtubeThumbnailUrl } from "@/lib/youtube";

interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  imageUrl?: string;
  googleDoc?: string;
  websiteUrl?: string;
  deepResearch?: boolean;
  youtubeUrl?: string;
  isVideo?: boolean;
  options?: boolean;
  noSummary?: boolean;
  podcastUrl?: string;
}

export function ArticleCard({ title, description, slug, date, imageUrl, googleDoc, websiteUrl, deepResearch, youtubeUrl, isVideo, options, noSummary, podcastUrl }: ArticleCardProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  // Consolidated card: an article with an attached YouTube video can toggle its
  // thumbnail between the article infographic and the video thumbnail.
  const hasAttachedVideo = Boolean(youtubeUrl) && !isVideo;
  const videoThumbnail = hasAttachedVideo ? youtubeThumbnailUrl(youtubeUrl!) : null;
  const [showVideoThumb, setShowVideoThumb] = useState(false);
  const displayImageUrl = hasAttachedVideo && showVideoThumb && videoThumbnail ? videoThumbnail : imageUrl;

  return (
    <>
      <Card className="overflow-hidden flex flex-col shadow-sm border border-border h-auto">
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 p-2 md:p-3 pb-0">
          {displayImageUrl && (
            <div className="relative flex-shrink-0 w-full sm:w-64 h-48 sm:h-48 rounded-lg overflow-hidden bg-gray-100 group">
              <img
                src={displayImageUrl}
                alt={title}
                className="h-full w-full object-contain hover:object-cover transition-all duration-300 cursor-pointer"
                onClick={() => setIsImageViewerOpen(true)}
                onError={(e) => {
                  e.currentTarget.className = "h-full w-full object-cover hover:object-contain transition-all duration-300 cursor-pointer";
                }}
              />
              {/* Full-screen button overlay */}
              <button
                onClick={() => setIsImageViewerOpen(true)}
                className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                title="View full screen"
              >
                <Maximize2 className="h-3 w-3" />
              </button>
              {deepResearch && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-xs text-primary-foreground font-semibold shadow group-hover:left-12 transition-all duration-200">
                  Deep Research
                </span>
              )}
              {(isVideo || hasAttachedVideo) && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-gradient-to-r from-red-600 to-red-700 text-xs text-white font-semibold shadow">
                  Video
                </span>
              )}
              {podcastUrl && !isVideo && !hasAttachedVideo && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-gradient-to-r from-green-600 to-green-700 text-xs text-white font-semibold shadow">
                  Podcast
                </span>
              )}
              {options && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-gradient-to-r from-orange-500 to-yellow-600 text-xs text-white font-semibold shadow">
                  Options
                </span>
              )}
              {/* Toggle chip: swap between infographic and YouTube thumbnail */}
              {hasAttachedVideo && videoThumbnail && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideoThumb((prev) => !prev);
                  }}
                  className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-white text-[10px] font-medium shadow transition-colors z-10 touch-manipulation"
                  title={showVideoThumb ? "Show infographic" : "Show video thumbnail"}
                >
                  {showVideoThumb ? <ImageIcon className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                  {showVideoThumb ? "Infographic" : "Video"}
                </button>
              )}
            </div>
          )}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2 mb-0.5">{title}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground mb-1 gap-2">
              <span>{date}</span>
              {googleDoc && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={googleDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    Google Doc
                  </a>
                </>
              )}
              {youtubeUrl && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-700"
                  >
                    YouTube
                  </a>
                </>
              )}
              {podcastUrl && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={podcastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-green-700"
                  >
                    Podcast
                  </a>
                </>
              )}
              {websiteUrl && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-700"
                  >
                    Website
                  </a>
                </>
              )}
            </div>
            <CardDescription className="mb-2 text-sm text-muted-foreground line-clamp-5">
              {description}
            </CardDescription>
          </div>
          {(() => {
            // Count the number of buttons
            const buttonCount = (isVideo && youtubeUrl ? 1 : 0) +
                               (websiteUrl ? 1 : 0) +
                               (podcastUrl ? 1 : 0) +
                               (hasAttachedVideo ? 1 : 0) +
                               (!noSummary ? 1 : 0);

            return (
              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1 mb-1">
                {isVideo && youtubeUrl ? (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow hover:from-red-700 hover:to-red-800 transition-colors text-sm"
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                ) : (
                  <>
                    {hasAttachedVideo && (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow hover:from-red-700 hover:to-red-800 transition-colors text-sm"
                      >
                        <svg className="mr-1.5 h-4 w-4 shrink-0 hidden sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="truncate">YouTube</span>
                      </a>
                    )}
                    {podcastUrl && (
                      <a
                        href={podcastUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow hover:from-green-700 hover:to-green-800 transition-colors text-sm"
                      >
                        <Music className="mr-1.5 h-4 w-4 shrink-0 hidden sm:block" />
                        <span className="truncate">Podcast</span>
                      </a>
                    )}
                    {websiteUrl && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm"
                      >
                        <span className="truncate">Website</span>
                      </a>
                    )}
                    {!noSummary && (
                      <Link 
                        href={`/articles/${slug}`} 
                        className="flex-1 inline-flex items-center justify-center px-2 py-2 rounded-lg border border-primary/40 text-primary font-semibold bg-card hover:bg-accent transition-colors text-sm"
                      >
                        <span className="truncate">Read Article</span>
                        <ArrowRight className="ml-1.5 h-4 w-4 shrink-0 hidden sm:block" />
                      </Link>
                    )}
                  </>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </Card>

    {/* Full-screen image viewer */}
    {displayImageUrl && (
      <FullScreenImageViewer
        src={displayImageUrl}
        alt={title}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    )}
  </>
  );
} 