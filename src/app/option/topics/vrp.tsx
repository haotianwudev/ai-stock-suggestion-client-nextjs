import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, BarChart4, LineChart } from "lucide-react";
import { VideoTutorial, Infographic, RelatedArticles } from "./components";
import { getTopicConfig } from "./config";

export function VRPContent() {
  const config = getTopicConfig('vrp');
  
  if (!config) return null;

  return (
    <Card>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl">{config.title}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {config.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-6">
        {/* Video Tutorial */}
        {config.videoUrl && (
          <VideoTutorial 
            videoUrl={config.videoUrl} 
          />
        )}

        {/* Infographic */}
        {config.infographicUrl && (
          <Infographic 
            imageUrl={config.infographicUrl} 
          />
        )}

        {/* Related Articles */}
        {config.relatedArticles && (
          <RelatedArticles 
            articleSlugs={config.relatedArticles}
            title="Related Articles"
          />
        )}

        {/* Core Concept */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg text-blue-700">
              📊 What is VRP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">
              The Volatility Risk Premium is the systematic difference between <strong>Implied Volatility</strong> (IV) - 
              what options markets price in - and <strong>Realized Volatility</strong> (RV) - what actually happens.
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

        {/* Why VRP Exists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-4">
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

        {/* How to Harvest VRP */}
        <Card className="border-slate-200 bg-slate-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg">
              💰 How to Harvest the VRP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 md:space-y-4">
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

        {/* Key Metrics */}
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg text-yellow-700">
              📊 Key VRP Metrics to Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-4 text-sm">
              <div>
                <h5 className="font-semibold mb-2">IV Rank (IVR)</h5>
                <p className="text-xs text-gray-600 mb-2">
                  Where current IV sits relative to its 52-week range. Higher IVR = better VRP opportunity.
                </p>
                <div className="bg-white p-2 rounded border text-xs font-mono">
                  IVR &gt; 50% = Good entry conditions
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-2">IV Percentile (IVP)</h5>
                <p className="text-xs text-gray-600 mb-2">
                  Percentage of days in past year when IV was lower than today. Similar to IVR but different calculation.
                </p>
                <div className="bg-white p-2 rounded border text-xs font-mono">
                  IVP &gt; 70% = Premium rich environment
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-2">VIX Term Structure</h5>
                <p className="text-xs text-gray-600 mb-2">
                  Shape of volatility curve across time. Contango (upward sloping) favors VRP harvesting.
                </p>
                <div className="bg-white p-2 rounded border text-xs font-mono">
                  VIX &lt; VIX3M = Contango structure
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-2">HV vs IV Spread</h5>
                <p className="text-xs text-gray-600 mb-2">
                  Direct comparison of historical vs implied volatility. Larger spread = larger VRP.
                </p>
                <div className="bg-white p-2 rounded border text-xs font-mono">
                  IV - HV &gt; 5% = Significant premium
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risks and Considerations */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 md:pb-4">
            <CardTitle className="text-base md:text-lg text-red-700">
              ⚠️ VRP Risks & Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
      </CardContent>
    </Card>
  );
}
