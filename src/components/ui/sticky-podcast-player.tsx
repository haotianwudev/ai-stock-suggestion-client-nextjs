"use client";

import { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

export function StickyPodcastPlayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isExpanded ? 'w-96 h-80' : 'w-80 h-64'
    } max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">SOPHIE's NotebookLM</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Spotify Embed */}
        <div className="relative w-full h-full bg-gray-50">
          <iframe
            src="https://open.spotify.com/embed/show/1LVAoacNfDyzrEf9bwrVM9?utm_source=generator&theme=0"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-b-lg"
            title="SOPHIE's NotebookLM Podcast"
          />
        </div>
      </div>
      
      {/* Show podcast button when hidden */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          title="Show Podcast Player"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            🎧
          </div>
        </button>
      )}
    </div>
  );
} 