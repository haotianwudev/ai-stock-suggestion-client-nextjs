'use client';

import { Zap, TrendingUp, BarChart4, Target, AlertTriangle, Shield, RefreshCw, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-orange-900">{title}</h3>
    </div>
  );
}

export function GEXContent() {
  const config = getTopicConfig('gex');
  
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
    <>
      {/* 1. What is GEX? */}
      <ChapterHeading number={1} title="What is GEX?" colorClass="bg-orange-600" />
      <Card className="border-blue-200 bg-blue-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm leading-relaxed">
            <strong>Gamma Exposure (GEX)</strong> measures the aggregate gamma position of market makers across all options. 
            It reveals how market makers must hedge their positions, directly influencing market volatility and price action.
          </p>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-mono text-center">
              <span className="text-blue-600 font-bold">GEX = Σ (Gamma × Open Interest × Spot Price²)</span>
            </p>
            <p className="text-xs text-center mt-2 text-gray-600">
              Positive GEX = Suppressed volatility | Negative GEX = Amplified volatility
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. GEX Mechanics */}
      <ChapterHeading number={2} title="GEX Mechanics" colorClass="bg-orange-600" />
      <div className="ml-8 md:ml-9 grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
              <span className="leading-tight">Positive GEX</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">Volatility Suppression</Badge>
              <p className="text-sm leading-relaxed">
                Market makers are <strong>long gamma</strong>. They buy when prices fall and sell when prices rise, 
                acting as a stabilizing force that reduces volatility.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
              <span className="leading-tight">Negative GEX</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">Volatility Amplification</Badge>
              <p className="text-sm leading-relaxed">
                Market makers are <strong>short gamma</strong>. They sell when prices fall and buy when prices rise, 
                creating momentum that amplifies market moves.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
              <span className="leading-tight">Zero Gamma</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Transition Zone</Badge>
              <p className="text-sm leading-relaxed">
                Critical inflection point where market behavior shifts from suppressed to amplified volatility. 
                Often acts as strong support/resistance.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <BarChart4 className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 flex-shrink-0" />
              <span className="leading-tight">GEX Levels</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">Strike Clustering</Badge>
              <p className="text-sm leading-relaxed">
                High GEX strikes act as magnets, pulling price toward them. Low GEX areas allow for 
                more volatile price discovery.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. GEX Trading Applications */}
      <ChapterHeading number={3} title="GEX Trading Applications" colorClass="bg-orange-600" />
      <Card className="border-slate-200 bg-slate-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-1.5 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Support/Resistance</h4>
              <p className="text-xs text-gray-600">
                High positive GEX levels act as strong support/resistance where price tends to gravitate
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-sm mb-2">Volatility Regime</h4>
              <p className="text-xs text-gray-600">
                Positive GEX = range-bound markets. Negative GEX = trending, volatile markets
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-2">Breakout Prediction</h4>
              <p className="text-xs text-gray-600">
                Monitor zero gamma levels for potential breakout points and regime changes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Market Maker Hedging Mechanics */}
      <ChapterHeading number={4} title="Market Maker Hedging Mechanics" colorClass="bg-orange-600" />
      <Card className="border-yellow-200 bg-yellow-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-green-700">When Long Gamma (Positive GEX)</h4>
              <div className="text-sm text-green-600 space-y-1">
                <div>• Price ↓ → MM buys stock (support)</div>
                <div>• Price ↑ → MM sells stock (resistance)</div>
                <div>• Result: Volatility suppression</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-red-700">When Short Gamma (Negative GEX)</h4>
              <div className="text-sm text-red-600 space-y-1">
                <div>• Price ↓ → MM sells stock (momentum)</div>
                <div>• Price ↑ → MM buys stock (momentum)</div>
                <div>• Result: Volatility amplification</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Key GEX Concepts */}
      <ChapterHeading number={5} title="Key GEX Concepts" colorClass="bg-orange-600" />
      <Card className="border-teal-200 bg-teal-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Gamma Flip</h4>
                <p className="text-xs text-gray-600">
                  The price level where aggregate gamma changes from positive to negative, 
                  marking a shift in market dynamics.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Charm Effect</h4>
                <p className="text-xs text-gray-600">
                  As options approach expiration, gamma concentrates at-the-money, 
                  creating stronger pin effects.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Dealer Positioning</h4>
                <p className="text-xs text-gray-600">
                  Market makers typically sell options to retail, making them short gamma 
                  and long delta, requiring constant hedging.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Expiration Effects</h4>
                <p className="text-xs text-gray-600">
                  OpEx days see increased volatility as large gamma positions expire, 
                  reducing market maker hedging flows.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Risks and Limitations */}
      <ChapterHeading number={6} title="Risks &amp; Limitations" colorClass="bg-red-500" />
      <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-base md:text-lg text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where GEX Analysis Breaks Down
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="text-sm text-red-600 space-y-1.5 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Data Quality:</span>
              <span>GEX calculations rely on estimated open interest and positioning data</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Market Regime:</span>
              <span>GEX effects can be overwhelmed by fundamental news or macro events</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Timing:</span>
              <span>GEX levels change throughout the day as positions are opened/closed</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Complexity:</span>
              <span>Multiple factors influence market maker hedging beyond just gamma</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• False Signals:</span>
              <span>GEX levels can provide false breakout signals during low volume periods</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. Related & Advanced Topics */}
      <ChapterHeading number={7} title="Related &amp; Advanced Topics" colorClass="bg-orange-600" />
      <div className="ml-8 md:ml-9 space-y-3">
        <div className="flex gap-2">
          <Shield className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-900 text-sm md:text-base">Volatility Risk Premium</h4>
            <p className="text-xs md:text-sm text-orange-700 leading-relaxed mt-1">
              GEX describes dealer hedging flows; VRP describes why premium sellers have an edge on average — the two
              interact directly, since dealer positioning is a byproduct of who's selling that premium — see{" "}
              <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-orange-900 inline-flex items-center gap-0.5">
                VRP <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <RefreshCw className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-900 text-sm md:text-base">The Greeks</h4>
            <p className="text-xs md:text-sm text-orange-700 leading-relaxed mt-1">
              GEX is built entirely from aggregated gamma — a solid grip on what gamma actually measures makes GEX
              much more intuitive — see{" "}
              <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-orange-900 inline-flex items-center gap-0.5">
                Greeks <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Compass className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-900 text-sm md:text-base">Options 101</h4>
            <p className="text-xs md:text-sm text-orange-700 leading-relaxed mt-1">
              New to options? Build the fundamentals before diving into dealer positioning — see{" "}
              <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-orange-900 inline-flex items-center gap-0.5">
                Options 101 <ArrowRight className="h-3 w-3" />
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
      heroIcon={<Zap className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Gamma Exposure (GEX) Visual Guide"
    />
  );
}