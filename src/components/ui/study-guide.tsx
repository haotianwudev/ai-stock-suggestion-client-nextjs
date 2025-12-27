"use client";

import { BookOpen } from "lucide-react";

interface StudyGuideProps {
  title?: string;
  items: string[];
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
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-blue-500 font-bold mt-1 text-base flex-shrink-0">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}