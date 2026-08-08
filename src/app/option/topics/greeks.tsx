import { Calculator, TrendingUp, Activity, Clock, Waves, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-4 md:space-y-6">
      {/* Key Terms — grounding before the interactive calculator below */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-orange-600 text-white text-xs md:text-sm font-bold flex-shrink-0">
            1
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-orange-900">Key Terms</h3>
        </div>
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-600 flex-shrink-0" /> Delta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-orange-700 leading-relaxed">
                How much the option's price moves for a $1 move in the underlying — also a rough proxy for the
                probability the option finishes in-the-money.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-600 flex-shrink-0" /> Gamma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-orange-700 leading-relaxed">
                How much Delta itself changes for a $1 move in the underlying — the "acceleration" of an option's
                price sensitivity, highest for at-the-money options near expiration.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" /> Theta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-orange-700 leading-relaxed">
                How much value the option loses per day simply from time passing — always working against a long
                option holder and in favor of a seller, all else equal.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Waves className="h-4 w-4 text-orange-600 flex-shrink-0" /> Vega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-orange-700 leading-relaxed">
                How much the option's price changes for a 1-point move in implied volatility — the Greek most exposed
                to the VRP dynamics covered elsewhere on this site.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-100 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Percent className="h-4 w-4 text-orange-600 flex-shrink-0" /> Rho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-orange-700 leading-relaxed">
                How much the option's price changes for a 1% move in interest rates — usually the smallest-impact
                Greek for short-dated equity options, but more material for long-dated options (LEAPS) and rates
                products.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive calculator */}
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