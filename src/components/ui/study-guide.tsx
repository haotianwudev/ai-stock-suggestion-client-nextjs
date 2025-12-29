"use client";

import { BookOpen, ExternalLink, Play, Image, FileText, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudyGuideItem {
  text: string;
  url: string;
  videoUrl?: string;
  visualGuideUrl?: string;
  type?: 'article' | 'video' | 'external' | 'guide';
}

interface StudyGuideProps {
  title?: string;
  items: StudyGuideItem[];
  className?: string;
  onItemSelect?: (item: StudyGuideItem) => void;  // Callback when item is selected
}

export function StudyGuide({ 
  title = "Study Guide",
  items,
  className = "",
  onItemSelect
}: StudyGuideProps) {
  if (items.length === 0) return null;

  const getItemIcon = (item: StudyGuideItem) => {
    if (item.type === 'video' || item.text.toLowerCase().includes('[youtube]')) {
      return <Youtube className="h-4 w-4 text-red-500" />;
    }
    if (item.type === 'guide' || item.visualGuideUrl) {
      return <Image className="h-4 w-4 text-purple-500" />;
    }
    if (item.type === 'article') {
      return <FileText className="h-4 w-4 text-blue-500" />;
    }
    return <ExternalLink className="h-4 w-4 text-gray-500" />;
  };

  const getItemTypeColor = (item: StudyGuideItem) => {
    if (item.type === 'video' || item.text.toLowerCase().includes('[youtube]')) {
      return 'border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-600 dark:hover:bg-red-900/20';
    }
    if (item.type === 'guide' || item.visualGuideUrl) {
      return 'border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-600 dark:hover:bg-purple-900/20';
    }
    if (item.type === 'article') {
      return 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/20';
    }
    return 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800';
  };

  const handleItemClick = (item: StudyGuideItem) => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    // Always open the main URL
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.stopPropagation();
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleVisualGuideClick = (e: React.MouseEvent, visualGuideUrl: string) => {
    e.stopPropagation();
    window.open(visualGuideUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 text-base">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="group">
            <div 
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${getItemTypeColor(item)}`}
              onClick={() => handleItemClick(item)}
            >
              {/* Main content row */}
              <div className="flex items-start gap-3 mb-2">
                {getItemIcon(item)}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200 leading-relaxed font-medium">
                    {item.text}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 flex-shrink-0 mt-0.5" />
              </div>

              {/* Action buttons row */}
              {(item.videoUrl || item.visualGuideUrl) && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  {item.videoUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/40"
                      onClick={(e) => handleVideoClick(e, item.videoUrl!)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Video
                    </Button>
                  )}
                  {item.visualGuideUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/40"
                      onClick={(e) => handleVisualGuideClick(e, item.visualGuideUrl!)}
                    >
                      <Image className="h-3 w-3 mr-1" />
                      Visual Guide
                    </Button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}