'use client';

import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function BooksContent() {
  // Get configuration for books
  const config = getTopicConfig('books');

  const heroColorScheme = {
    border: "border-amber-200",
    background: "bg-gradient-to-br from-amber-50 to-yellow-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    descriptionColor: "text-amber-700",
    cardBg: "bg-white",
    cardBorder: "border border-amber-100",
    cardText: "text-amber-900",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    sectionTitle: "text-amber-900"
  };

  const contentSections = (
    <>
      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Trading Mindset</h4>
            <p className="text-sm text-amber-700">The psychology and discipline behind consistently profitable options trading.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Strategy Deep Dives</h4>
            <p className="text-sm text-amber-700">Book-length treatments of the Iron Condor and diagonal spread vs. covered call.</p>
          </div>
        </div>
      </div>

      {/* Core Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-amber-900">Core Concepts</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Trading Psychology</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Iron Condor</Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">Diagonal Spreads</Badge>
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
      infographicAlt="Options Books Guide"
    />
  );
}
