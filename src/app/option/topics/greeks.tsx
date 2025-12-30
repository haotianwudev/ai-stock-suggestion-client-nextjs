import { Calculator } from "lucide-react";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";
import { GreeksTab } from "@/components/options/greeks-tab";

export function GreeksContent() {
  const config = getTopicConfig('greeks');
  
  if (!config) return null;

  const heroColorScheme = {
    border: "border-orange-200",
    background: "bg-gradient-to-br from-orange-50 to-amber-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    descriptionColor: "text-orange-700",
    cardBg: "bg-white",
    cardBorder: "border border-orange-100",
    cardText: "text-orange-900",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-800",
    sectionTitle: "text-orange-900"
  };



  const contentSections = (
    <div className="mt-3 md:mt-6">
      <GreeksTab />
    </div>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Calculator className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
    />
  );
}