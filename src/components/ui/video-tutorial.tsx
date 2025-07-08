"use client";

import { useState } from "react";

interface VideoTutorialProps {
  title: string;
  description: string;
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
  const [showVideo, setShowVideo] = useState(false);

  const videoUrl = `https://www.youtube.com/embed/${videoId}${startTime > 0 ? `?start=${startTime}` : ''}`;

  return (
    <div className={`p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">{title}</h4>
        </div>
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
        >
          {showVideo ? "Hide Video" : "Show Video"}
        </button>
      </div>
      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
        {description}
      </p>
      {showVideo && (
        <div className="relative aspect-video w-full max-w-2xl mx-auto">
          <iframe
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
} 