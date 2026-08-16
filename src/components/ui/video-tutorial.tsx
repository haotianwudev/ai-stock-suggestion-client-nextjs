"use client";

import { PlayCircle } from "lucide-react";

interface VideoTutorialProps {
  title: string;
  description?: string;
  videoId: string;
  startTime?: number;
  className?: string;
}

export function VideoTutorial({ 
  title, 
  description, 
  videoId, 
  startTime = 0, 
  className = ""
}: VideoTutorialProps) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}${startTime > 0 ? `?start=${startTime}` : ''}`;

  return (
    <div className={`p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
      <div className="flex items-center gap-1.5 mb-1 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
        <PlayCircle className="h-3.5 w-3.5" />
        <span>Video Tutorial</span>
      </div>
      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-1">{title}</h4>
      {description && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
          {description}
        </p>
      )}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black">
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
} 