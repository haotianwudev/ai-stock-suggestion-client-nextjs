import { Activity, TrendingUp, BarChart3, Brain, Eye, Shield, Zap, RefreshCw, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-cyan-900">{title}</h3>
    </div>
  );
}

export function VolatilityContent() {
  const config = getTopicConfig('volatility');
  
  if (!config) return null;

  const heroColorScheme = {
    border: "border-cyan-200",
    background: "bg-gradient-to-br from-cyan-50 to-blue-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    titleColor: "text-cyan-900",
    descriptionColor: "text-cyan-700",
    cardBg: "bg-white",
    cardBorder: "border border-cyan-100",
    cardText: "text-cyan-900",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-800",
    sectionTitle: "text-cyan-900"
  };

  const contentSections = (
    <>
      {/* 1. Understanding Volatility */}
      <ChapterHeading number={1} title="Understanding Volatility" colorClass="bg-cyan-600" />
      <Card className="border-blue-200 bg-blue-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm leading-relaxed">
            Volatility measures the magnitude of price movements in financial markets. In options trading, 
            we distinguish between <strong>Historical Volatility</strong> (what happened) and 
            <strong>Implied Volatility</strong> (what the market expects).
          </p>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-mono text-center">
              <span className="text-blue-600 font-bold">Volatility = Standard Deviation of Returns</span>
            </p>
            <p className="text-xs text-center mt-2 text-gray-600">
              Higher volatility = larger expected price swings
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Types of Volatility */}
      <ChapterHeading number={2} title="Types of Volatility" colorClass="bg-cyan-600" />
      <div className="ml-8 md:ml-9 grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
              <span className="leading-tight">Historical Volatility</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Backward-looking measure calculated from past price movements. Shows how much 
              the asset actually moved over a specific period.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Eye className="h-4 w-4 md:h-5 md:w-5 text-purple-600 flex-shrink-0" />
              <span className="leading-tight">Implied Volatility</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Forward-looking measure derived from option prices. Represents the market's 
              collective expectation of future price movements.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. The Volatility Smile Phenomenon */}
      <ChapterHeading number={3} title="The Volatility Smile Phenomenon" colorClass="bg-cyan-600" />
      <Card className="border-orange-200 bg-orange-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm leading-relaxed">
            The volatility smile is a persistent pattern where implied volatility varies with strike price, 
            contradicting the Black-Scholes assumption of constant volatility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2 text-cyan-700">Volatility Smile (FX Markets)</h4>
              <p className="text-xs text-gray-600">
                Symmetrical U-shape where IV is lowest at-the-money and increases for both 
                in-the-money and out-of-the-money options.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2 text-red-700">Volatility Skew (Equity Markets)</h4>
              <p className="text-xs text-gray-600">
                Asymmetrical pattern where out-of-the-money puts have much higher IV than 
                out-of-the-money calls, reflecting crash fears.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Market Psychology */}
      <ChapterHeading number={4} title="Market Psychology" colorClass="bg-cyan-600" />
      <div className="ml-8 md:ml-9 grid grid-cols-1 sm:grid-cols-3 gap-1.5 md:gap-4">
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Brain className="h-4 w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
              <span className="leading-tight">Crash-o-phobia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Post-1987 crash, markets developed permanent fear of sudden drops, 
              creating structural demand for downside protection.
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Activity className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 flex-shrink-0" />
              <span className="leading-tight">Fat Tails</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Markets exhibit more extreme moves than normal distribution predicts, 
              leading to higher volatility for out-of-the-money options.
            </p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 flex-shrink-0" />
              <span className="leading-tight">Supply/Demand</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Asymmetric usage: puts for protection, calls for speculation and income, 
              creating imbalanced supply and demand dynamics.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5. Trading Applications */}
      <ChapterHeading number={5} title="Trading Applications" colorClass="bg-cyan-600" />
      <Card className="border-slate-200 bg-slate-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-1.5 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-sm mb-2">Sentiment Analysis</h4>
              <p className="text-xs text-gray-600">
                Use volatility patterns to gauge market fear and complacency levels
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">⚖️</div>
              <h4 className="font-semibold text-sm mb-2">Risk Management</h4>
              <p className="text-xs text-gray-600">
                Advanced Greeks (Vanna, Volga) help manage smile risk in portfolios
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-sm mb-2">Arbitrage</h4>
              <p className="text-xs text-gray-600">
                Exploit inconsistencies across strikes and expirations for relative value trades
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Key Concepts to Master */}
      <ChapterHeading number={6} title="Key Concepts to Master" colorClass="bg-cyan-600" />
      <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-cyan-100">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed">
              <strong>Black-Scholes' constant-volatility assumption fails empirically</strong> — the entire volatility
              smile/skew phenomenon exists specifically because real markets violate the model's core assumption, which
              is why practitioners use it as a quoting convention rather than a literal pricing truth.
            </p>
          </CardContent>
        </Card>
        <Card className="border-cyan-100">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed">
              <strong>Put-call parity</strong> is the no-arbitrage relationship linking call price, put price, strike,
              and underlying — a useful sanity check, since skew shows up as calls and puts at the same strike no
              longer implying the same "fair" volatility once you look past parity's core relationship.
            </p>
          </CardContent>
        </Card>
        <Card className="border-cyan-100">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed">
              <strong>Negative skewness</strong> means real return distributions have a longer left tail than a normal
              curve — large crashes happen more often than large rallies of the same size, which is exactly what
              equity skew (expensive downside puts) is pricing in.
            </p>
          </CardContent>
        </Card>
        <Card className="border-cyan-100">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed">
              <strong>Excess kurtosis</strong> ("fat tails") means extreme moves in either direction happen more often
              than a normal distribution predicts — the statistical basis for why far OTM options are priced higher
              than Black-Scholes alone would suggest.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 7. Advanced Volatility Models */}
      <ChapterHeading number={7} title="Advanced Volatility Models" colorClass="bg-cyan-600" />
      <Card className="border-purple-200 bg-purple-50/50 ml-8 md:ml-9">
        <CardContent className="pt-4 space-y-3">
          <div className="text-sm text-purple-600 space-y-1.5 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Heston Model:</span>
              <span>Stochastic volatility with mean reversion and correlation effects</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• SABR Model:</span>
              <span>Stochastic Alpha Beta Rho for interest rates and FX</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Local Volatility:</span>
              <span>Dupire model making volatility function of spot and time</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold">• Jump-Diffusion:</span>
              <span>Merton model incorporating discontinuous price jumps</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8. Related & Advanced Topics */}
      <ChapterHeading number={8} title="Related &amp; Advanced Topics" colorClass="bg-cyan-600" />
      <div className="ml-8 md:ml-9 space-y-3">
        <div className="flex gap-2">
          <Zap className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-cyan-900 text-sm md:text-base">Volatility Risk Premium</h4>
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed mt-1">
              Elevated implied volatility relative to what actually realizes is the entire basis of the VRP trade —
              see{" "}
              <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-cyan-900 inline-flex items-center gap-0.5">
                VRP <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <RefreshCw className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-cyan-900 text-sm md:text-base">Gamma Exposure (GEX)</h4>
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed mt-1">
              Dealer hedging flows are a major driver of realized volatility, feeding directly back into the IV-RV
              relationship — see{" "}
              <Link href="/option/topics/gex" className="underline underline-offset-2 hover:text-cyan-900 inline-flex items-center gap-0.5">
                GEX <ArrowRight className="h-3 w-3" />
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Shield className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-cyan-900 text-sm md:text-base">Derivatives Pricing</h4>
            <p className="text-xs md:text-sm text-cyan-700 leading-relaxed mt-1">
              For how the models above (Heston, SABR, local vol) actually get implemented in pricing engines — see{" "}
              <Link href="/quant/topics/derivatives-pricing" className="underline underline-offset-2 hover:text-cyan-900 inline-flex items-center gap-0.5">
                Derivatives Pricing <ArrowRight className="h-3 w-3" />
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
      heroIcon={<Activity className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Volatility Concepts Visual Guide"
    />
  );
}