import { Shield, TrendingUp, DollarSign, LineChart, BarChart4 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function Option101Content() {
  const config = getTopicConfig('option101');
  
  if (!config) return null;

  const heroColorScheme = {
    border: "border-teal-200",
    background: "bg-gradient-to-br from-teal-50 to-cyan-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    titleColor: "text-teal-900",
    descriptionColor: "text-teal-700",
    cardBg: "bg-white",
    cardBorder: "border border-teal-100",
    cardText: "text-teal-900",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-800",
    sectionTitle: "text-teal-900"
  };



  const contentSections = (
    <>
      {/* Use Case Cards */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">Primary Use Cases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-4">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                <span className="leading-tight">Hedging Risk</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Protect existing positions from adverse price movements. 
                Buy puts to hedge long stock positions or calls to hedge short positions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                <span className="leading-tight">Speculation with Leverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Control a larger position with less capital. 
                Options provide leveraged exposure to price movements with defined risk.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
                <span className="leading-tight">Income Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Sell covered calls or cash-secured puts to generate premium income 
                on existing holdings or available cash.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <BarChart4 className="h-4 w-4 md:h-5 md:w-5 text-orange-600 flex-shrink-0" />
                <span className="leading-tight">Volatility Betting</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Trade on your expectations of volatility changes rather than just price direction. 
                Profit from volatility expansion or contraction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/50 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2 md:pb-4">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <LineChart className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 flex-shrink-0" />
                <span className="leading-tight">Capital Efficiency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Achieve similar exposure to stocks with less capital, 
                freeing up funds for other investments or risk management.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Warning Section */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-teal-900">When NOT to Use Options</h3>
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg text-red-700">
              ⚠️ Important Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <div className="text-sm text-red-600 space-y-1.5 md:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold">• As a "get rich quick" scheme:</span>
                <span>Options require skill and knowledge to use effectively.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold">• Without understanding the Greeks:</span>
                <span>Don't trade what you don't understand.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold">• When you can't afford the maximum loss:</span>
                <span>Options can expire worthless.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold">• Without a clear strategy:</span>
                <span>Random option buying often leads to losses.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-semibold">• In illiquid options:</span>
                <span>Wide bid-ask spreads can hurt profitability.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Shield className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="When to Use Options Infographic"
    />
  );
}