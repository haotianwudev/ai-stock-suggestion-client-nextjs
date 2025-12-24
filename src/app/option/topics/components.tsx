"use client";

import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";
import { FullScreenImageViewer } from "@/components/ui/full-screen-image-viewer";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

interface VideoTutorialProps {
  videoUrl: string;
  title?: string;
}

export function VideoTutorial({ videoUrl, title = "Video Tutorial" }: VideoTutorialProps) {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 md:p-6 rounded-xl border border-red-200 mb-3 md:mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎥</span>
        {title}
      </h3>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

interface InfographicProps {
  imageUrl: string;
  title?: string;
  alt?: string;
}

export function Infographic({ imageUrl, title = "Infographic", alt = "Educational Infographic" }: InfographicProps) {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 md:p-6 rounded-xl border border-blue-200 mb-3 md:mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {title}
        </h3>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
          <img 
            src={imageUrl} 
            alt={alt}
            className="w-full h-auto cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
            onClick={() => setIsFullScreenOpen(true)}
          />
          {/* Full-screen button overlay */}
          <button
            onClick={() => setIsFullScreenOpen(true)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {/* Click hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src={imageUrl}
        alt={alt}
        isOpen={isFullScreenOpen}
        onClose={() => setIsFullScreenOpen(false)}
      />
    </>
  );
}

interface RelatedArticlesProps {
  articleSlugs: string[];
  title?: string;
}

export function RelatedArticles({ articleSlugs, title = "Related Articles" }: RelatedArticlesProps) {
  if (!articleSlugs || articleSlugs.length === 0) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 md:p-6 rounded-xl border border-indigo-200 mb-3 md:mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          {title}
        </h3>
      </div>
      
      <div className="grid gap-2 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {articleSlugs.map((slug: string) => {
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
    </>
  );
}