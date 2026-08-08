'use client';

import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function BooksContent() {
  // Get configuration for books
  const config = getTopicConfig('books');

  const heroColorScheme = {
    border: "border-indigo-200",
    background: "bg-gradient-to-br from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    descriptionColor: "text-indigo-700",
    cardBg: "bg-white",
    cardBorder: "border border-indigo-100",
    cardText: "text-indigo-900",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    sectionTitle: "text-indigo-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-indigo-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">Trading Psychology</h4>
            <p className="text-sm text-indigo-700">The mindset and behavioral traps that separate winning traders from losing ones.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">Personal Finance</h4>
            <p className="text-sm text-indigo-700">Foundational lessons on building wealth and financial independence.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">Behavioral Finance</h4>
            <p className="text-sm text-indigo-700">Randomness, cognitive bias, and how not to be your own worst enemy as an investor.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-indigo-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Trading Psychology</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Behavioral Finance</Badge>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Personal Finance</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<BookOpen className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Books Guide"
    />
  );
}
