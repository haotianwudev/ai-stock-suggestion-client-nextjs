"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, User, Check, MessageSquare } from "lucide-react";
import { StockAgentSuggestion } from "@/lib/graphql/types";

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
          background: 'bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900 dark:to-emerald-950',
          border: 'border-green-300 dark:border-green-700',
          text: 'text-green-900 dark:text-green-50'
        };
      case 'bearish':
        return {
          background: 'bg-gradient-to-br from-red-100 to-rose-50 dark:from-red-900 dark:to-rose-950',
          border: 'border-red-300 dark:border-red-700',
          text: 'text-red-900 dark:text-red-50'
        };
      case 'neutral':
        return {
          background: 'bg-gradient-to-br from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-yellow-950',
          border: 'border-amber-300 dark:border-amber-700',
          text: 'text-amber-900 dark:text-amber-50'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-gray-100 to-slate-50 dark:from-gray-800 dark:to-slate-950',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-900 dark:text-gray-50'
        };
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>AI Agent Analysis</CardTitle>
            <CardDescription>
              AI Bot's analysis and stock recommendations learning from the master's investment philosophy
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Section 1: Agent Selection (Left) - Made Smaller */}
          <div className="w-full lg:w-44 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {agents.map((agent, index) => (
              <Button
                key={agent}
                variant={currentAgentIndex === index ? "default" : "outline"}
                className="flex items-center p-2 h-auto w-[140px] lg:w-full relative"
                onClick={() => handleSelectAgent(index)}
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getAgentImageSrc(agent)}
                    alt={formatAgentName(agent)}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(agent)}
                  />
                </div>
                <div className="flex flex-col h-full justify-between min-w-0 ml-2 flex-1">
                  <span className="text-xs font-medium text-left truncate">{formatAgentName(agent)}</span>
                  <Badge className={`${getSignalColor(agentMap[agent].signal)} text-xs px-1.5 py-0.5 mt-1 w-fit`}>
                    {agentMap[agent].signal.toUpperCase()}
                  </Badge>
                </div>
                {currentAgentIndex === index && (
                  <div className="absolute top-1 right-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </Button>
            ))}
          </div>
          
          {/* Section 2: Analysis Details (Middle) */}
          <div className="flex-1 min-w-0 lg:border-l lg:border-r lg:px-6">
            <div className="flex flex-col space-y-6">
              {/* Enhanced Agent Profile - Made Bigger */}
              <div className="flex items-center space-x-5 bg-muted/30 p-4 rounded-lg">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-background shadow-md">
                  <Image
                    src={getAgentImageSrc(currentAgent)}
                    alt={formatAgentName(currentAgent)}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(currentAgent)}
                    priority
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{formatAgentName(currentAgent)}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getSignalColor(currentSuggestion.signal)} px-3 py-1 text-sm`}>
                      {currentSuggestion.signal.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground">
                      {currentSuggestion.biz_date}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full" 
                      style={{ width: getConfidenceWidth(currentSuggestion.confidence) }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium">Confidence: {currentSuggestion.confidence}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">AI Bot's Comment Borrowing the Philosophy</h4>
                {(() => {
                  const styles = getChatBubbleStyle(currentSuggestion.signal);
                  return (
                    <div className={`relative rounded-lg border p-5 shadow-md ${styles.background} ${styles.border}`}>
                      <div className="absolute -top-2 -left-2">
                        <div className={`rounded-full p-1.5 shadow-sm ${styles.background} ${styles.border}`}>
                          <MessageSquare className={`h-5 w-5 ${styles.text}`} />
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className={`text-base leading-relaxed whitespace-pre-line font-medium ${styles.text}`}>
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
          <div className="w-full lg:w-96">
            <h4 className="font-medium mb-2">
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