"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, User } from "lucide-react";
import { StockAgentSuggestion } from "@/lib/graphql/types";

// Base64 placeholder images (simple SVG circles with initials)
const PLACEHOLDER_IMAGES: Record<string, string> = {
  warren_buffett: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM0Mjg1RjQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5XQjwvdGV4dD48L3N2Zz4=',
  charlie_munger: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiM5QzI3QjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5DTTwvdGV4dD48L3N2Zz4='
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
  
  const handleNextAgent = () => {
    setCurrentAgentIndex((currentAgentIndex + 1) % agents.length);
  };
  
  const handlePrevAgent = () => {
    setCurrentAgentIndex((currentAgentIndex - 1 + agents.length) % agents.length);
  };
  
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  // Format agent name for display (warren_buffett -> Warren Buffett)
  const formatAgentName = (name: string) => {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Agent Analysis</CardTitle>
            <CardDescription>
              Expert investor AI analysis and stock recommendations
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevAgent}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextAgent}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100">
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
              <h3 className="text-xl font-bold">{formatAgentName(currentAgent)}</h3>
              <div className="flex items-center space-x-2">
                <Badge className={`${getSignalColor(currentSuggestion.signal)}`}>
                  {currentSuggestion.signal.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {currentSuggestion.biz_date}
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: getConfidenceWidth(currentSuggestion.confidence) }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Confidence: {currentSuggestion.confidence}%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Analysis</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {currentSuggestion.reasoning}
            </p>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">
              {currentAgent === 'warren_buffett' 
                ? "Warren Buffett's Investment Philosophy" 
                : currentAgent === 'charlie_munger'
                  ? "Charlie Munger's Investment Philosophy"
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