'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Clock, Zap, DollarSign, AlertTriangle, BookOpen, Target, Shield, ExternalLink, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Type definitions
interface GreekData {
  name: string;
  symbol: string;
  poem: string;
  intuition: {
    summary: string;
    bullets: string[];
  };
  trading: {
    summary: string;
    bullets: string[];
  };
  colorClasses: {
    border: string;
    text: string;
    shadow: string;
  };
}

// Expanded data from the document, now with bullet points
const greeksData: GreekData[] = [
  {
    name: "Delta",
    symbol: "Δ",
    poem: `A shadow of the stock, it moves in part,
A 0.30 chance to win the heart.
It measures speed, the first to see,
And proxies a probability.`,
    intuition: {
      summary: "Delta is the 'speed' of the option. It measures how much the option's price will change for every $1 move in the underlying stock. It's also used as a rough 'probability' of the option expiring in-the-money (ITM).",
      bullets: [
        "Ranges from 0 to 1.0 for calls, and -1.0 to 0 for puts.",
        "An 'at-the-money' (ATM) option usually has a Delta of ~0.50 (or -0.50 for puts).",
        "Deep 'in-the-money' (ITM) options behave like stock, with a Delta near 1.0 (or -1.0).",
        "Far 'out-of-the-money' (OTM) options barely move, with a Delta near 0."
      ]
    },
    trading: {
      summary: "Used for directional bets and hedging. The 'position delta' of your portfolio tells you your overall directional exposure, as if it were shares of stock.",
      bullets: [
        "Buying a 0.70 delta call is a strong bullish bet, similar to owning 70 shares of stock per contract.",
        "Traders create 'delta-neutral' positions by balancing positive and negative deltas to 0. This removes directional risk, allowing them to trade volatility (Vega) or time decay (Theta) instead.",
        "Position Delta = (Delta of Option 1 * # of Contracts * 100) + (Delta of Option 2 * ...)"
      ]
    },
    colorClasses: {
      border: "border-blue-500",
      text: "text-blue-600",
      shadow: "hover:shadow-blue-500/20"
    }
  },
  {
    name: "Gamma",
    symbol: "Γ",
    poem: `The delta's change, the risk that's coiled,
Where neutral plans are quickly spoiled.
A positive arc, the move you ride,
A negative pit, where sellers hide.`,
    intuition: {
      summary: "Gamma is the 'acceleration.' It measures how much your Delta will change for every $1 move in the stock. It's the 'risk' in a delta-neutral position and represents the *instability* of your hedge.",
      bullets: [
        "Gamma is highest for at-the-money (ATM) options.",
        "Gamma is also highest for options very close to expiration. This 'gamma risk' can cause wild, last-minute price swings.",
        "Option buyers are 'long gamma' (positive), meaning their deltas improve in their favor as the stock moves.",
        "Option sellers are 'short gamma' (negative), meaning their deltas get worse as the stock moves against them."
      ]
    },
    trading: {
      summary: "Gamma dictates how often a neutral trader must re-hedge. 'Long gamma' profits from large, fast moves, while 'short gamma' profits from a stable stock.",
      bullets: [
        "Long Straddles/Strangles are 'long gamma' plays. You buy both a call and a put, betting on a large move in *either* direction.",
        "Sellers (like Iron Condor traders) are 'short gamma.' They face significant risk if the stock makes a sudden, large move, as their losses will accelerate.",
        "'Gamma scalping' is an advanced strategy where a trader stays delta-neutral by repeatedly buying/selling stock against their long-gamma position as the price oscillates."
      ]
    },
    colorClasses: {
      border: "border-purple-500",
      text: "text-purple-600",
      shadow: "hover:shadow-purple-500/20"
    }
  },
  {
    name: "Theta",
    symbol: "θ",
    poem: `An ice cube sits on a summer stone,
A slow decay, a daily drone.
It melts at noon, a frantic pace,
The seller's friend, the buyer's race.`,
    intuition: {
      summary: "Theta is 'time decay.' It's the 'ice cube melting'—the amount of value an option loses each day just from the passage of time, assuming all else stays the same.",
      bullets: [
        "Theta is almost always a negative number for a single option, as time only moves forward.",
        "This decay is not linear; it accelerates exponentially as the option nears its expiration date.",
        "ATM options have the highest Theta because they have the most 'time premium' (extrinsic value) to lose.",
        "ITM and OTM options have lower Theta, as they have less extrinsic value."
      ]
    },
    trading: {
      summary: "Theta is the primary profit engine for option sellers. It's the daily 'rent' they collect. For buyers, Theta is the enemy—the clock is always ticking against them.",
      bullets: [
        "Strategies like Covered Calls, Credit Spreads, and Iron Condors are 'positive theta' plays. The goal is to let time pass and have the options expire worthless.",
        "A 'Theta/Gamma' tradeoff exists: positions with high positive Theta (selling) usually have negative Gamma (risk).",
        "Calendar Spreads are a way to 'buy' and 'sell' theta at the same time, selling a short-term option (high decay) and buying a long-term option (low decay)."
      ]
    },
    colorClasses: {
      border: "border-red-500",
      text: "text-red-600",
      shadow: "hover:shadow-red-500/20"
    }
  },
  {
    name: "Vega",
    symbol: "ν",
    poem: `The price of fear, the cost of doubt,
When panic reigns, the premiums sprout.
It's not a Greek, this star of night,
But measures the unseen, volatile light.`,
    intuition: {
      summary: "Vega measures the 'price of fear'—an option's sensitivity to a 1% change in Implied Volatility (IV). It tells you how much the option price will change if the *market's expectation* of future movement changes.",
      bullets: [
        "Implied Volatility (IV) is different from historical volatility. It's the 'fear' or 'uncertainty' premium priced into the option.",
        "IV is often mean-reverting: it spikes during panics (e.g., earnings, market crashes) and falls during calm periods.",
        "Options are more expensive when IV is high, and cheaper when IV is low.",
        "Longer-dated options have higher Vega, as there's more time for volatility to have an impact."
      ]
    },
    trading: {
      summary: "Traders buy options ('long vega') when they expect volatility to increase, and sell options ('short vega') when they expect it to fall.",
      bullets: [
        "A classic 'short vega' trade is selling options before a company's earnings report, betting on the 'IV crush'—the rapid drop in volatility *after* the news is released.",
        "A 'long vega' trade might be buying options when the market is very calm, believing a big move is coming soon.",
        "Straddles and Strangles are 'long vega' and 'long gamma,' making them pure bets on a large move and an increase in volatility."
      ]
    },
    colorClasses: {
      border: "border-teal-500",
      text: "text-teal-600",
      shadow: "hover:shadow-teal-500/20"
    }
  },
  {
    name: "Rho",
    symbol: "ρ",
    poem: `The cost to carry, the rate unseen,
The slowest Greek, on LEAPS it's keen.
It helps the call, it hurts the put,
A boring number, but it stays afoot.`,
    intuition: {
      summary: "Rho measures the option's sensitivity to a 1% change in interest rates. It's the 'cost to carry' the position and is generally the least impactful greek for most traders.",
      bullets: [
        "Rho is positive for calls: higher interest rates make calls slightly more valuable. (It's more expensive to *own* stock, so the *option* to buy becomes more attractive).",
        "Rho is negative for puts: higher interest rates make puts slightly less valuable. (You earn more interest on the cash you've set aside to buy the stock, offsetting the put's value).",
        "Its effect is tiny on short-term options but becomes noticeable on LEAPS (long-term options)."
      ]
    },
    trading: {
      summary: "99% of retail traders ignore Rho. Its impact is tiny compared to Delta, Gamma, Theta, and Vega. It's only a consideration for very long-term strategies or large institutional portfolios.",
      bullets: [
        "If you are trading LEAPS (options 1-2+ years out), a significant change in Fed interest rate policy could have a small but measurable impact on your position.",
        "It's primarily a risk factor for market makers and large funds managing complex, long-dated portfolios."
      ]
    },
    colorClasses: {
      border: "border-amber-500",
      text: "text-amber-600",
      shadow: "hover:shadow-amber-500/20"
    }
  }
];

/**
 * A single card component to display a Greek's full details.
 */
const GreekCard = ({ greek }: { greek: GreekData }) => {
  const { colorClasses } = greek;
  
  return (
    <div className={`rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 border-t-4 bg-white ${colorClasses.border} ${colorClasses.shadow}`}>
      {/* Card Header: Symbol + Name */}
      <div className="flex items-center mb-5">
        <span className={`text-5xl font-bold mr-4 ${colorClasses.text}`} style={{textShadow: `0 0 10px var(--tw-shadow-color)`}}>
          {greek.symbol}
        </span>
        <h2 className={`text-3xl font-semibold ${colorClasses.text}`}>
          {greek.name}
        </h2>
      </div>

      {/* Poem Content */}
      <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line font-mono italic mb-6">
        {greek.poem}
      </p>

      <hr className="my-4 md:my-6" />

      {/* Intuition Section */}
      <div className="mb-6">
        <h3 className={`text-xl font-semibold mb-2 ${colorClasses.text}`}>
          Intuition
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          {greek.intuition.summary}
        </p>
        
        {/* Render Theta Decay Chart */}
        {greek.name === "Theta" && (
          <div className="my-4 p-4 bg-gray-50 rounded-lg border">
            <p className="text-center text-sm font-medium text-gray-700 mb-2">
              Theta Decay Curve
            </p>
            <p className="text-center text-xs text-gray-500 mb-2">
              Value decays slowly, then accelerates rapidly in the last 30-45 days.
            </p>
          </div>
        )}
        
        <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
          {greek.intuition.bullets.map((bullet: string, index: number) => (
            <li key={`intuition-${index}`}>{bullet}</li>
          ))}
        </ul>
      </div>

      {/* Trading Section */}
      <div>
        <h3 className={`text-xl font-semibold mb-2 ${colorClasses.text}`}>
          Trading Applications
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          {greek.trading.summary}
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700">
          {greek.trading.bullets.map((bullet: string, index: number) => (
            <li key={`trading-${index}`}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Main application component.
 */
export default function OptionGreeksArticle() {
  const currentArticle = articles.find(article => article.slug === 'option-greeks-traders-poetic-guide-risk');

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      {/* Main container with light theme and responsive padding */}
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8 md:p-12 font-sans">
        {/* Return to Home Button */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Badges */}
        <div className="relative mb-8">
          {/* Deep Research Badge - Top Left */}
          <div className="absolute top-0 left-0 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <BookOpen className="w-3 h-3 mr-1" />
              Deep Research
            </span>
          </div>
          
          {/* Options Badge - Bottom Right */}
          <div className="absolute bottom-0 right-0 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <Target className="w-3 h-3 mr-1" />
              Options
            </span>
          </div>
        </div>

        {/* Page Header */}
        <header className="text-center mb-16 max-w-3xl mx-auto pt-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-red-600">
            The Option Greeks
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-4">
            A Trader's Poetic Guide to Risk
          </p>
          <p className="text-lg text-gray-700 mt-6 leading-relaxed">
            Master the five fundamental risk measures that govern options pricing through intuitive poetry, 
            practical trading applications, and comprehensive analysis. Transform complex derivatives mathematics 
            into actionable trading knowledge.
          </p>
        </header>

        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Greeks</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Option Greeks are mathematical measures that quantify how an option's price changes in response to various factors. 
                  They are essential tools for risk management, position sizing, and strategic decision-making in options trading.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Each Greek measures a different dimension of risk: <strong>Delta</strong> (directional exposure), 
                  <strong>Gamma</strong> (delta stability), <strong>Theta</strong> (time decay), 
                  <strong>Vega</strong> (volatility sensitivity), and <strong>Rho</strong> (interest rate risk).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid container for the cards */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {greeksData.map(greek => (
            <GreekCard key={greek.name} greek={greek} />
          ))}
        </main>

        {/* Key Takeaways Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 text-green-600 mr-3" />
              Key Trading Insights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Option Buyers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Long Delta, Gamma, and Vega exposure
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    Fighting against Theta decay daily
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    Need large, fast moves to profit
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">For Option Sellers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <DollarSign className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Collect Theta premium daily
                  </li>
                  <li className="flex items-start">
                    <TrendingDown className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    Short Gamma creates acceleration risk
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    Profit from stable, range-bound markets
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Risk Disclosure</h3>
                <p className="text-red-700 text-sm leading-relaxed">
                  Options trading involves substantial risk and is not suitable for all investors. 
                  The Greeks are theoretical models that may not perfectly predict actual price movements. 
                  Past performance does not guarantee future results. Always consult with a qualified 
                  financial advisor and understand the risks before trading options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Research Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 text-purple-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  Deep Research Analysis
                  <span className="ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Comprehensive Study
                  </span>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This comprehensive analysis draws from extensive research in options pricing theory, 
                  behavioral finance, and quantitative trading strategies. The poetic approach to explaining 
                  the Greeks makes complex mathematical concepts accessible while maintaining technical accuracy.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Research Methodology</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Black-Scholes-Merton model analysis</li>
                      <li>• Historical volatility studies</li>
                      <li>• Market maker behavior patterns</li>
                      <li>• Risk management frameworks</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Practical Applications</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Portfolio hedging strategies</li>
                      <li>• Volatility trading techniques</li>
                      <li>• Risk-adjusted position sizing</li>
                      <li>• Multi-leg strategy construction</li>
                    </ul>
                  </div>
                </div>

                {currentArticle?.googleDoc && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Research Document
                    </a>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>Comprehensive analysis with detailed mathematical foundations and trading examples</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 border-t border-gray-200 pt-8">
          <p className="mb-2">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          <p className="text-sm">This analysis is not financial advice and is intended for educational purposes only.</p>
        </footer>
      </div>
    </>
  );
}