"use client";

import { BookOpen, ExternalLink } from "lucide-react";

interface StudyGuideItem {
  text: string;
  url?: string;
}

interface StudyGuideProps {
  title?: string;
  items: (string | StudyGuideItem)[];
  className?: string;
}

export function StudyGuide({ 
  title = "Study Guide",
  items,
  className = ""
}: StudyGuideProps) {
  if (items.length === 0) return null;

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 text-base">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const isString = typeof item === 'string';
          const text = isString ? item : item.text;
          const url = isString ? undefined : item.url;
          
          return (
            <li key={index} className="group">
              {url ? (
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-blue-500 font-bold mt-0.5 text-base flex-shrink-0">•</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 leading-relaxed">
                      {text}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 flex-shrink-0 mt-0.5" />
                </a>
              ) : (
                <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <span className="text-blue-500 font-bold mt-0.5 text-base flex-shrink-0">•</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}