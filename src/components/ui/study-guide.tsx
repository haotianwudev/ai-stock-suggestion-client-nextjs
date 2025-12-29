"use client";

import { BookOpen, ExternalLink, FileText, Youtube, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const getItemIcon = (item: StudyGuideItem) => {
    const getMainIcon = () => {
      switch (item.type) {
        case 'video':
          return <Youtube className="h-4 w-4 text-red-500" />;
        case 'guide':
          return <Image className="h-4 w-4 text-purple-500" />;
        case 'article':
          return <FileText className="h-4 w-4 text-blue-500" />;
        case 'external':
          return <ExternalLink className="h-4 w-4 text-gray-500" />;
        default:
          return <FileText className="h-4 w-4 text-gray-500" />;
      }
    };

    const hasAdditionalContent = item.videoUrl || item.visualGuideUrl;

    if (!hasAdditionalContent) {
      return getMainIcon();
    }

    return (
      <div className="flex items-center gap-1">
        {getMainIcon()}
        <div className="flex gap-0.5">
          {item.videoUrl && (
            <Youtube className="h-4 w-4 text-red-400" />
          )}
          {item.visualGuideUrl && (
            <Image className="h-4 w-4 text-purple-400" />
          )}
        </div>
      </div>
    );
  };

  const getItemTypeColor = (item: StudyGuideItem, index: number, isSelected: boolean) => {
    const baseColors = {
      video: isSelected 
        ? 'border-red-400 bg-red-100 dark:border-red-600 dark:bg-red-900/40' 
        : 'border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-600 dark:hover:bg-red-900/20',
      guide: isSelected 
        ? 'border-purple-400 bg-purple-100 dark:border-purple-600 dark:bg-purple-900/40' 
        : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-600 dark:hover:bg-purple-900/20',
      article: isSelected 
        ? 'border-blue-400 bg-blue-100 dark:border-blue-600 dark:bg-blue-900/40' 
        : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/20',
      external: isSelected 
        ? 'border-gray-400 bg-gray-100 dark:border-gray-600 dark:bg-gray-700' 
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800',
      default: isSelected 
        ? 'border-gray-400 bg-gray-100 dark:border-gray-600 dark:bg-gray-700' 
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800'
    };

    switch (item.type) {
      case 'video':
        return baseColors.video;
      case 'guide':
        return baseColors.guide;
      case 'article':
        return baseColors.article;
      case 'external':
        return baseColors.external;
      default:
        return baseColors.default;
    }
  };

  const hasCustomContent = (item: StudyGuideItem) => {
    return !!(item.videoUrl || item.visualGuideUrl);
  };

  const handleItemClick = (item: StudyGuideItem, index: number) => {
    if (hasCustomContent(item)) {
      // If item has custom content, select it and update main sections
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item);
      }
    } else {
      // If no custom content, go directly to URL
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUrlClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 text-base">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          const itemHasCustomContent = hasCustomContent(item);
          
          return (
            <li key={index} className="group">
              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${getItemTypeColor(item, index, isSelected)}`}
                onClick={() => handleItemClick(item, index)}
              >
                {/* Icon */}
                {getItemIcon(item)}
                
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm leading-relaxed font-medium transition-colors duration-200 ${
                    isSelected 
                      ? 'text-gray-900 dark:text-gray-100' 
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                  }`}>
                    {item.text}
                  </span>
                  {itemHasCustomContent}
                </div>

                {/* URL Button - always show */}
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/40"
                  onClick={(e) => handleUrlClick(e, item.url)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}