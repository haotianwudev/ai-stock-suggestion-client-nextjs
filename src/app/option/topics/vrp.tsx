import { Shield, TrendingUp, BarChart4, LineChart, Compass, Layers, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-purple-900">{title}</h3>
    </div>
  );
}

export function VRPContent() {
  const config = getTopicConfig('vrp');
  
  if (!config) return null;

  const heroColorScheme = {
    border: "border-purple-200",
    background: "bg-gradient-to-br from-purple-50 to-indigo-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-900",
    descriptionColor: "text-purple-700",
    cardBg: "bg-white",
    cardBorder: "border border-purple-100",
    cardText: "text-purple-900",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    sectionTitle: "text-purple-900"
  };



  const contentSections = (
    <>
      {/* 1. What is VRP? */}
      <ChapterHeading number={1} title="What is VRP?" colorClass="bg-purple-600" />
      <Card className="border-blue-200 bg-blue-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm leading-relaxed">
            The Volatility Risk Premium is the systematic difference between <strong>Implied Volatility</strong> (IV) -
            what options markets price in - and <strong>Realized Volatility</strong> (RV) - what actually happens. It's
            the structural reason option <em>sellers</em> have a statistical edge on average, even though buyers are
            the ones getting the "insurance."
          </p>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-mono text-center">
              <span className="text-blue-600 font-bold">VRP = Implied Volatility - Realized Volatility</span>
            </p>
            <p className="text-xs text-center mt-2 text-gray-600">
              Historically positive, meaning IV &gt; RV on average
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Why VRP Exists */}
      <ChapterHeading number={2} title="Why VRP Exists" colorClass="bg-purple-600" />
      <div className="ml-8 md:ml-9 grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-4">
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
              <span className="leading-tight">Insurance Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Options are insurance contracts. Like all insurance, buyers pay a premium above expected claims 
              to compensate sellers for taking on risk.
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-orange-600 flex-shrink-0" />
              <span className="leading-tight">Fear Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Markets systematically overprice tail risk. Investors pay extra for protection 
              against large moves that occur less frequently than feared.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <BarChart4 className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
              <span className="leading-tight">Supply & Demand</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              More natural buyers (hedgers, speculators) than sellers creates structural 
              imbalance that keeps option prices elevated.
            </p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <LineChart className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 flex-shrink-0" />
              <span className="leading-tight">Behavioral Bias</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Investors exhibit volatility clustering bias, overweighting recent volatility 
              when forming expectations about future moves.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. How to Harvest the VRP */}
      <ChapterHeading number={3} title="How to Harvest the VRP" colorClass="bg-purple-600" />
      <Card className="border-slate-200 bg-slate-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-1.5 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-sm mb-2">Covered Calls</h4>
              <p className="text-xs text-gray-600">
                Own stock + sell calls to generate income from VRP while maintaining upside participation
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📉</div>
              <h4 className="font-semibold text-sm mb-2">Cash-Secured Puts</h4>
              <p className="text-xs text-gray-600">
                Sell puts with cash backing to get paid while waiting to buy stocks at desired prices
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Iron Condors</h4>
              <p className="text-xs text-gray-600">
                Pure VRP play - profit when realized volatility is less than implied volatility
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Risks and Considerations */}
      <ChapterHeading number={4} title="Risks &amp; Considerations" colorClass="bg-red-500" />
      <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-base md:text-lg text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" /> When Selling Premium Goes Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="text-sm text-red-600 space-y-1.5 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Volatility Explosions:</span>
              <span>VRP can turn negative during market crises (2008, 2020, etc.)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Regime Changes:</span>
              <span>VRP magnitude varies across market cycles and economic conditions</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Tail Risk:</span>
              <span>Small probability of large losses when "selling insurance"</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Liquidity Risk:</span>
              <span>Options markets can become illiquid during stress periods</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Model Risk:</span>
              <span>VRP strategies rely on statistical relationships that can break down</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Related & Advanced Topics */}
      <ChapterHeading number={5} title="Related &amp; Advanced Topics" colorClass="bg-purple-600" />
      <div className="ml-8 md:ml-9 space-y-3">
        <div className="flex gap-2">
          <Compass className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-900 text-sm md:text-base">Options 101</h4>
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
              New to options? Start with the fundamentals before harvesting VRP — see{" "}
              <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                Options 101 <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Layers className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-900 text-sm md:text-base">Gamma Exposure (GEX)</h4>
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
              Dealer positioning from selling premium affects market volatility itself — see{" "}
              <Link href="/option/topics/gex" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                GEX <ArrowRight className="h-3 w-3" />
              </Link>{" "}
              for the other side of the trade.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-purple-900 text-sm md:text-base">Rolling &amp; Adjustments</h4>
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
              Managing a VRP-harvesting position when it moves against you — see{" "}
              <Link href="/option/topics/roll" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                Rolling Options <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Shield className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Volatility Risk Premium Visual Guide"
    />
  );
}