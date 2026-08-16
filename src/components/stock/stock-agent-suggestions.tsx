"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, User, Check, MessageSquare } from "lucide-react";
import { StockAgentSuggestion } from "@/lib/graphql/types";
import { VideoTutorial } from "@/components/ui/video-tutorial";

// Base64 placeholder images (simple SVG circles with initials)
const PLACEHOLDER_IMAGES: Record<string, string> = {
  warren_buffett: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM0Mjg1RjQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5XQjwvdGV4dD48L3N2Zz4=',
  charlie_munger: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM5QzI3QjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5DTTwvdGV4dD48L3N2Zz4=',
  cathie_wood: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNGRjQ4NDgiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5DVzwvdGV4dD48L3N2Zz4=',
  stanley_druckenmiller: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM2QjI4RjQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5TRDwvdGV4dD48L3N2Zz4=',
  ben_graham: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5CRzwvdGV4dD48L3N2Zz4='
};

interface StockAgentSuggestionsProps {
  suggestions: StockAgentSuggestion[];
}

export function StockAgentSuggestions({ suggestions }: StockAgentSuggestionsProps) {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  // Group suggestions by agent
  const agentMap: Record<string, StockAgentSuggestion> = {};
  const agents: string[] = [];
  
  suggestions.forEach(suggestion => {
    if (!agentMap[suggestion.agent]) {
      agents.push(suggestion.agent);
      agentMap[suggestion.agent] = suggestion;
    }
  });
  
  const currentAgent = agents[currentAgentIndex];
  const currentSuggestion = agentMap[currentAgent];
  
  const handleSelectAgent = (index: number) => {
    setCurrentAgentIndex(index);
  };
  
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  // Format agent name for display (warren_buffett -> Warren Buffett)
  const formatAgentName = (name: string) => {
    if (name === 'stanley_druckenmiller') {
      return 'Stan Druckenmiller';
    }
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get image source - try external file first, then fallback to placeholder
  const getAgentImageSrc = (agent: string) => {
    return imageError[agent] 
      ? PLACEHOLDER_IMAGES[agent] || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM5RTlFOUUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj4ke2FnZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfTwvdGV4dD48L3N2Zz4=`
      : `/images/agents/${agent}.png`;
  };
  
  // Get signal color
  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'bullish': return 'bg-green-500';
      case 'bearish': return 'bg-red-500';
      case 'neutral': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Get confidence bar width
  const getConfidenceWidth = (confidence: number) => {
    return `${confidence}%`;
  };
  
  // Handle image error
  const handleImageError = (agent: string) => {
    setImageError(prev => ({ ...prev, [agent]: true }));
  };
  
  // Get background color for chat bubble
  const getChatBubbleStyle = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'bullish':
        return {
          background: 'bg-gradient-to-br from-emerald-50 to-green-50/40 dark:from-emerald-950/40 dark:to-green-950/20',
          border: 'border-emerald-200 dark:border-emerald-800/60',
          text: 'text-emerald-900 dark:text-emerald-200'
        };
      case 'bearish':
        return {
          background: 'bg-gradient-to-br from-rose-50 to-red-50/40 dark:from-rose-950/40 dark:to-red-950/20',
          border: 'border-rose-200 dark:border-rose-800/60',
          text: 'text-rose-900 dark:text-rose-200'
        };
      case 'neutral':
        return {
          background: 'bg-gradient-to-br from-amber-50 to-yellow-50/40 dark:from-amber-950/40 dark:to-yellow-950/20',
          border: 'border-amber-200 dark:border-amber-800/60',
          text: 'text-amber-900 dark:text-amber-200'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-slate-50 to-gray-50/40 dark:from-slate-900/60 dark:to-gray-900/40',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-900 dark:text-gray-100'
        };
    }
  };

  return (
    <Card className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="flex items-center">
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">AI Agent Analysis</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              AI Bot's analysis and stock recommendations learning from legendary investment philosophies
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        {/* AI Agent Analysis Video Tutorial */}
        <VideoTutorial
          title="AI Agent Video Tutorial: How It Works"
          description="Learn how AI agents analyze stocks using legendary investors' methodologies and decision-making frameworks."
          videoId="QkRPgEI5PZM"
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Section 1: Agent Selection (Left) */}
          <div className="w-full lg:w-48 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {agents.map((agent, index) => (
              <button
                key={agent}
                className={`flex items-center p-2.5 rounded-xl border text-left transition-all relative w-[150px] lg:w-full ${
                  currentAgentIndex === index
                    ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] ring-1 ring-[#A8672E] dark:ring-[#D08F52] shadow-xs"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
                onClick={() => handleSelectAgent(index)}
              >
                <div className="relative h-9 w-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={getAgentImageSrc(agent)}
                    alt={formatAgentName(agent)}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(agent)}
                  />
                </div>
                <div className="flex flex-col min-w-0 ml-2.5 flex-1">
                  <span className="text-xs font-semibold truncate text-gray-900 dark:text-gray-100">{formatAgentName(agent)}</span>
                  <Badge className={`${getSignalColor(agentMap[agent].signal)} text-[10px] px-1.5 py-0 mt-1 w-fit`}>
                    {agentMap[agent].signal.toUpperCase()}
                  </Badge>
                </div>
                {currentAgentIndex === index && (
                  <div className="absolute top-2 right-2 text-[#A8672E] dark:text-[#D08F52]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Section 2: Analysis Details (Middle) */}
          <div className="flex-1 min-w-0 lg:border-l lg:border-r border-gray-100 dark:border-gray-800 lg:px-6">
            <div className="flex flex-col space-y-5">
              {/* Enhanced Agent Profile */}
              <div className="flex items-center space-x-4 bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-xs">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-[#A8672E]/30 dark:border-[#D08F52]/40 flex items-center justify-center bg-background shadow-md flex-shrink-0">
                  <Image
                    src={getAgentImageSrc(currentAgent)}
                    alt={formatAgentName(currentAgent)}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(currentAgent)}
                    priority
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{formatAgentName(currentAgent)}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getSignalColor(currentSuggestion.signal)} px-2.5 py-0.5 text-xs font-semibold`}>
                      {currentSuggestion.signal.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {currentSuggestion.biz_date}
                    </span>
                  </div>
                  <div className="mt-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#A8672E] dark:bg-[#D08F52] h-2 rounded-full transition-all" 
                      style={{ width: getConfidenceWidth(currentSuggestion.confidence) }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Confidence: <span className="text-gray-900 dark:text-gray-100 font-semibold">{currentSuggestion.confidence}%</span></span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-2">AI Bot Commentary</h4>
                {(() => {
                  const styles = getChatBubbleStyle(currentSuggestion.signal);
                  return (
                    <div className={`relative rounded-2xl border p-4 sm:p-5 shadow-sm ${styles.background} ${styles.border}`}>
                      <div className="absolute -top-2.5 -left-2.5">
                        <div className={`rounded-full p-1.5 shadow-sm ${styles.background} ${styles.border}`}>
                          <MessageSquare className={`h-4 w-4 ${styles.text}`} />
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium ${styles.text}`}>
                          {currentSuggestion.reasoning}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
          
          {/* Section 3: Methodology (Right) */}
          <div className="w-full lg:w-96 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] mb-2">
              {currentAgent === 'warren_buffett' 
                ? "Warren Buffett's Investment Philosophy" 
                : currentAgent === 'charlie_munger'
                  ? "Charlie Munger's Investment Philosophy"
                  : currentAgent === 'cathie_wood'
                    ? "Cathie Wood's Investment Philosophy"
                    : currentAgent === 'stanley_druckenmiller'
                      ? "Stanley Druckenmiller's Investment Philosophy"
                      : currentAgent === 'ben_graham'
                        ? "Benjamin Graham's Investment Philosophy"
                        : "Investment Methodology"}
            </h4>
            <div className="text-sm text-muted-foreground">
              {currentAgent === 'warren_buffett' ? (
                <div className="space-y-2">
                  <p>
                    Warren Buffett evolved from Graham-style value investing to focus on business quality. His approach combines quantitative valuation with qualitative assessment of competitive advantages.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-xs">Fundamental Analysis</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Profitability: ROE {'>'}15%, strong margins</li>
                        <li>Financial Health: Low debt, good liquidity</li>
                        <li>Consistency: Stable earnings patterns</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Economic Moat</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Stable ROE {'>'}15% across periods</li>
                        <li>Strong operating margins {'>'}15%</li>
                        <li>Pricing power and market dominance</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Management Quality</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Shareholder-friendly decisions</li>
                        <li>Effective capital allocation</li>
                        <li>Transparency and integrity</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Valuation Approach</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>"Owner earnings" focus</li>
                        <li>Margin of safety principle</li>
                        <li>Long-term business perspective</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : currentAgent === 'charlie_munger' ? (
                <div className="space-y-2">
                  <p>
                    Charlie Munger is known for his multidisciplinary approach and mental models. He emphasizes investing in high-quality businesses with durable competitive advantages at reasonable prices.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-xs">Moat Strength</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>ROIC Consistency: High returns ({'>'}15%)</li>
                        <li>Pricing Power: Strong gross margins</li>
                        <li>Capital Efficiency: Low requirements</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Management Quality</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Capital Allocation excellence</li>
                        <li>Insider Activity: "Skin in the game"</li>
                        <li>Decreasing share count preferred</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Business Predictability</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Consistent revenue growth</li>
                        <li>Positive operating income trends</li>
                        <li>Low margin volatility over time</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Mental Models Applied</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Inversion (avoiding mistakes)</li>
                        <li>Microeconomics (supply/demand)</li>
                        <li>Psychology (market sentiment)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : currentAgent === 'cathie_wood' ? (
                <div className="space-y-2">
                  <p>
                    Cathie Wood is known for her focus on disruptive innovation and exponential growth potential. She pioneered thematic investing in areas like genomics, AI, fintech, and blockchain, embracing volatility for long-term gains.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-xs">Disruptive Potential</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Revenue Growth Acceleration</li>
                        <li>Gross Margin Expansion</li>
                        <li>Operating Leverage</li>
                        <li>R&D Intensity</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Innovation Growth</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>R&D Growth Rate</li>
                        <li>Free Cash Flow</li>
                        <li>Operating Efficiency</li>
                        <li>Capital Allocation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Exponential Valuation</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>High-Growth DCF</li>
                        <li>TAM Analysis</li>
                        <li>Margin of Safety</li>
                        <li>Scoring Summary</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Key Metrics</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Exponential Growth Potential</li>
                        <li>Innovation Intensity</li>
                        <li>Disruptive Valuation</li>
                        <li>Signal Generation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : currentAgent === 'stanley_druckenmiller' ? (
                <div className="space-y-2">
                  <p>
                    Stanley Druckenmiller is known for his aggressive but disciplined approach, focusing on asymmetric risk-reward opportunities and capital preservation. He achieved 30%+ annual returns over 30 years by riding strong trends and managing risk effectively.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-xs">Growth & Momentum</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Revenue Growth {'>'}30%</li>
                        <li>EPS Growth {'>'}30%</li>
                        <li>Price Momentum {'>'}50%</li>
                        <li>Trend Strength</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Risk-Reward Analysis</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Debt-to-Equity {'<'}0.3</li>
                        <li>Price Volatility</li>
                        <li>Upside/Downside Ratio</li>
                        <li>Capital Preservation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Valuation Metrics</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>P/E Ratio {'<'}15</li>
                        <li>P/FCF Ratio {'<'}15</li>
                        <li>EV/EBIT {'<'}15</li>
                        <li>EV/EBITDA {'<'}10</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Market Signals</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>News Sentiment</li>
                        <li>Insider Activity</li>
                        <li>Institutional Interest</li>
                        <li>Market Psychology</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : currentAgent === 'ben_graham' ? (
                <div className="space-y-2">
                  <p>
                    Benjamin Graham, the father of value investing, pioneered quantitative security analysis and emphasized buying stocks trading below their intrinsic value with a margin of safety. His approach focuses strictly on valuation metrics rather than qualitative factors.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-xs">Earnings Stability</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Positive EPS Years</li>
                        <li>EPS Growth Rate</li>
                        <li>Earnings Consistency</li>
                        <li>Profit Stability</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Financial Strength</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Current Ratio {'>'}2.0</li>
                        <li>Debt Ratio {'<'}0.5</li>
                        <li>Dividend Record</li>
                        <li>Working Capital</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Valuation Metrics</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Net-Net Working Capital</li>
                        <li>Graham Number</li>
                        <li>Margin of Safety</li>
                        <li>Intrinsic Value</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-xs">Key Principles</p>
                      <ul className="list-disc pl-4 text-xs space-y-0.5">
                        <li>Margin of Safety</li>
                        <li>Quantitative Focus</li>
                        <li>Conservative Approach</li>
                        <li>Value vs. Price</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p>This agent analyzes stocks based on fundamental analysis, valuation metrics, and industry expertise.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 