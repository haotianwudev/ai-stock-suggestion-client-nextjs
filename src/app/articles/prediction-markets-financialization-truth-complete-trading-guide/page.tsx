'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Scale, AlertTriangle, Vote, Brain, Activity, BookOpen, Lightbulb, Cpu, MousePointer, Maximize2, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const GuideData = {
  intro: {
    title: "The Financialization of Truth",
    content: "Prediction markets have evolved from experimental economic theory to a multi-billion dollar asset class. By allowing participants to stake capital on binary outcomes, these markets aggregate the world's information into a single, tradable price. For the modern investor, they offer a new frontier for generating alpha (profit) and hedging beta (lifestyle risk), but they function differently than traditional equities.",
    badge: "Market Research 2026"
  },
  sections: [
    {
      id: "duopoly",
      title: "The Structural Duopoly",
      subtitle: "Regulated (Kalshi) vs. Decentralized (Polymarket)",
      icon: <Scale className="w-6 h-6" />,
      color: "blue",
      content: "The market is currently bifurcated. Your choice of platform dictates your legal protection, available liquidity, and settlement risk. This is not just a choice of app; it is a choice of financial jurisdiction.",
      proTip: "US Citizens technically cannot trade on Polymarket without a VPN (which violates TOS), while Kalshi is fully CFTC-compliant and links directly to US bank accounts.",
      details: [
        {
          head: "Kalshi: The 'New York Stock Exchange' Model",
          text: "Kalshi operates as a Designated Contract Market (DCM) under the CFTC. This means your funds are segregated, and the exchange cannot trade against you. \n\n• Onboarding: Requires SSN, standard KYC, and bank link (Plaid).\n• Mechanics: Trades in 'event contracts' priced 1-99 cents.\n• Limits: Historically capped position limits, though these have been raised significantly post-2024 court victories."
        },
        {
          head: "Polymarket: The 'DeFi' Model",
          text: "Polymarket is an interface for smart contracts on the Polygon blockchain. It is non-custodial, meaning you own the wallet keys.\n\n• Onboarding: Requires a Web3 wallet (Metamask, Phantom) and USDC on the Polygon network. No name/address required for pure crypto users, though on-ramps (MoonPay) require KYC.\n• Mechanics: Uses a Hybrid CLOB (Central Limit Order Book). Orders are matched off-chain for speed, but settled on-chain for security."
        }
      ],
      table: {
        headers: ["Feature", "Kalshi (Regulated)", "Polymarket (Decentralized)"],
        rows: [
          ["Currency", "USD (Fiat)", "USDC (Stablecoin)"],
          ["Settlement Logic", "CFTC Rules & Master Settlement", "UMA Optimistic Oracle"],
          ["Max Position", "$7M+ (varies by contract)", "Unlimited (Liquidity constrained)"],
          ["Dispute Resolution", "Federal Court / CFTC", "$UMA Tokenholder Vote"]
        ]
      }
    },
    {
      id: "mechanics",
      title: "Market Mechanics & Pricing Architecture",
      subtitle: "The Mathematics of Binary Derivatives",
      icon: <Activity className="w-6 h-6" />,
      color: "indigo",
      content: "Prediction markets function as 'Binary Options'. Unlike a stock that can go from $10 to $1000, a prediction contract has a hard ceiling of $1.00 (event happens) and a hard floor of $0.00 (event does not happen). This bounded range transforms trading into a pure probability game.",
      proTip: "NEVER use 'Market Orders' on illiquid contracts. Slippage can eat 10-20% of your capital instantly. Always use 'Limit Orders' to set your maximum price.",
      details: [
        {
          head: "1. The Probability Price Equivalence",
          text: "Price is Probability. A contract trading at 60¢ implies a 60% chance of the event occurring.\n• If you believe the true probability is 70%, buying at 60¢ offers Positive Expected Value (+EV).\n• If you buy 'Yes' at 60¢, you are implicitly selling 'No' at 40¢."
        },
        {
          head: "2. The Central Limit Order Book (CLOB)",
          text: "Modern platforms (Kalshi, Polymarket) use CLOBs, similar to the Nasdaq.\n• The Bid: The highest price someone is waiting to pay (e.g., 58¢).\n• The Ask: The lowest price someone is willing to sell for (e.g., 62¢).\n• The Spread: The 4¢ gap between them. To buy instantly, you must pay 62¢. To sell instantly, you only get 58¢. This spread is the 'cost of immediacy'."
        },
        {
          head: "3. Calculating Expected Value (EV)",
          text: "The formula for profit is simple: EV = (True Probability × $1.00) - Cost.\n• Example: You buy 'Fed Cut' at $0.40. You estimate 50% odds.\n• EV = (0.50 × $1.00) - $0.40 = +$0.10 per share.\n• If your probability assessment is wrong, your EV is negative."
        },
        {
          head: "4. Execution: Maker vs. Taker",
          text: "• Makers (Limit Orders): You set a price (e.g., 'Buy at 59¢') and wait. You ADD liquidity to the market. Often 0% fees.\n• Takers (Market Orders): You accept the current price. You REMOVE liquidity. You pay the spread + platform fees. Beginners often lose money by being Takers in thin markets."
        }
      ],
      table: {
        headers: ["Order Type", "Action", "Pros & Cons"],
        rows: [
          ["Limit Order", "Buy ONLY at X price", "✅ Zero Slippage, Lower Fees. ❌ Might not fill if price moves."],
          ["Market Order", "Buy NOW at any price", "✅ Instant fill. ❌ High Slippage, Higher Fees."],
          ["AMMs (Old Tech)", "Trade vs Algorithm", "✅ Always liquid. ❌ Terrible pricing for large bets (Bonding Curves)."]
        ]
      }
    },
    {
      id: "strategy",
      title: "Strategic Trading & Portfolio Management",
      subtitle: "From Hedging Beta to Generating Alpha",
      icon: <Brain className="w-6 h-6" />,
      color: "emerald",
      content: "Sophisticated investors treat prediction markets not as a casino, but as an insurance firm. You are buying coverage against adverse real-world events ('Hedging') or selling coverage to others when the premiums are too high ('Alpha Generation').",
      proTip: "Use the Kelly Criterion Formula: f* = (bp - q) / b. \nWhere 'b' is odds received (e.g. 1 to 1), 'p' is probability of winning, 'q' is probability of losing. This prevents you from 'betting the farm' on a single edge.",
      details: [
        {
          head: "Strategy 1: Macro-Hedging (Personal Insurance)",
          text: "Use markets to offset real-life financial risks.\n• Mortgage Hedge: Do you have a variable rate mortgage? If rates rise, your payments go up. Hedge this by buying 'Yes' on 'Fed Hikes Rates'. If rates rise, your market winnings subsidize your higher mortgage payment.\n• Inflation Hedge: Hold a lot of cash? Buy 'Yes' on 'CPI > 3%'. If inflation devalues your cash, your contract profit restores your purchasing power."
        },
        {
          head: "Strategy 2: Correlation & 'Parplay' Mechanics",
          text: "Markets are highly correlated. If 'Candidate A' wins Florida, their odds of winning the election jump from 50% to 85% instantly.\n• The Play: Don't bet on the main event (Election Winner). Bet on the 'Indicator State' (e.g., Pennsylvania). Or, if you miss the Pennsylvania news, immediately buy the General Election winner before the price fully adjusts. This is 'Latency Arbitrage' on information flow."
        },
        {
          head: "Strategy 3: Cross-Platform Arbitrage",
          text: "Prices for the exact same event often diverge between Kalshi (US regulated) and Polymarket (Global crypto).\n• Example: Kalshi trades 'Yes' at 65¢ while Polymarket trades at 62¢. \n• Execution: Buy on Polymarket, Sell on Kalshi (if you have access to both). You capture the 3¢ spread risk-free, minus fees. This forces markets to become efficient."
        },
        {
          head: "Strategy 4: Fading the 'Dumb Money'",
          text: "Prediction markets attract 'fans' who bet with their heart, not their head. This creates 'Sentiment Bubbles'.\n• The Play: Look for emotionally charged markets (e.g., 'Will popular celebrity X go to jail?'). Fans will overbuy 'No' because they like the person. The true probability might be 50%, but the market trades at 80% 'No'. You sell 'No' (or buy 'Yes') to act as the House, collecting the premium from irrational exuberance."
        }
      ],
      table: {
        headers: ["Strategy Style", "Risk Profile", "Capital Req", "Ideal For"],
        rows: [
          ["Macro-Hedging", "Low (Offset)", "High", "Homeowners, Bond Holders"],
          ["News Trading", "High (Speed)", "Medium", "Day Traders, Coders"],
          ["Arbitrage", "Zero/Low", "High", "Quants, Market Makers"],
          ["Sentiment Fade", "Medium", "Low", "Contrarian Investors"]
        ]
      }
    },
    {
      id: "whales",
      title: "Market Efficiency & Whales",
      subtitle: "Case Study: The 'French Whale'",
      icon: <Vote className="w-6 h-6" />,
      color: "purple",
      content: "Do markets reflect wisdom or wealth? The 2024 election highlighted the impact of 'Whales'—individuals with massive capital who can move the probability line single-handedly.",
      proTip: "Always check the 'Holders' tab. If 50% of the volume is driven by 3 accounts, the price is not a consensus; it is a reflection of three people's opinions.",
      details: [
        {
          head: "The Théo Case Study (2024)",
          text: "A French trader known as 'Théo' bet over $30M on Trump, significantly skewing the Polymarket odds away from national polling averages. Critics called it manipulation; proponents called it conviction. \n• Outcome: Théo was right. The market signal, heavily influenced by one smart actor, outperformed the aggregate data of millions of poll respondents. This validates the 'Skin in the Game' thesis."
        },
        {
          head: "Liquidity Fragmentation",
          text: "Efficiency breaks down in niche markets. A market for 'Who will win the Iowa 3rd District House Seat' might only have $5,000 in volume. A single $500 bet can move the price 10%. Avoid trading these 'thin' markets unless you have insider knowledge."
        }
      ]
    },
    {
      id: "pitfalls",
      title: "Common Pitfalls & Risks",
      subtitle: "How to Lose When You're Right",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "rose",
      content: "The most dangerous aspect of prediction markets is not being wrong about the event, but being wrong about the contract.",
      proTip: "ALWAYS read the 'Rules' tab. The specific wording of the resolution criteria overrides common sense. If the contract says 'announced by AP', and CNN announces it but AP waits 2 days, you might lose time-value or panic sell.",
      details: [
        {
          head: "Resolution Risk (The 'Ambiguity' Trap)",
          text: "Example: A market asks 'Will Taylor Swift announce a tour in 2025?'. \n• Scenario: She posts a teaser image on Dec 31st but official tickets drop Jan 1st. \n• Result: The Oracle (UMA or Kalshi judges) must decide. These edge cases often result in 50/50 splits or prolonged disputes where capital is locked for weeks."
        },
        {
          head: "Capital Lockup & Opportunity Cost",
          text: "To win 5% on a 'Sure Thing' (e.g., buying 'No' on an alien invasion at 95 cents to win $1), you must lock your capital until the contract expires. If that takes 6 months, your annualized return is only 10%—barely beating the S&P 500, but with full Principal Risk. Always calculate Annualized ROI (APY), not just raw ROI."
        }
      ]
    },
    {
      id: "advanced_tools",
      title: "Advanced Tools & Ecosystem",
      subtitle: "Beyond the Interface",
      icon: <Cpu className="w-6 h-6" />,
      color: "orange",
      content: "Professional traders do not use the web interface. They use APIs and aggregator tools to find edge across hundreds of markets simultaneously.",
      proTip: "Check out 'Polymarket Whales' on X (Twitter) for real-time tracking of large positions.",
      details: [
        {
          head: "Programmatic Trading",
          text: "Both Kalshi and Polymarket offer robust APIs. Python scripts can be written to:\n1. Monitor spreads between similar markets.\n2. Auto-hedge positions when probability hits a certain threshold.\n3. Scrape news feeds (using LLMs) to trade sentiment before humans can react."
        },
        {
          head: "Analytical Dashboards",
          text: "Tools like 'Gamma' (for Kalshi) allow for historical probability charting and correlation matrices. Understanding the 'Implied Probability' over time helps identify if a current price is a reaction to news or just noise."
        }
      ]
    }
  ]
};

const SectionCard = ({ section }: { section: any }) => {
  const getColorClasses = (color: string) => {
    const maps: Record<string, string> = {
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
      purple: "bg-purple-50 border-purple-200 text-purple-900",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
      orange: "bg-orange-50 border-orange-200 text-orange-900",
      red: "bg-red-50 border-red-200 text-red-900",
      rose: "bg-rose-50 border-rose-200 text-rose-900",
    };
    return maps[color] || maps.blue;
  };

  const getBadgeColor = (color: string) => {
    const maps: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700",
      indigo: "bg-indigo-100 text-indigo-700",
      purple: "bg-purple-100 text-purple-700",
      emerald: "bg-emerald-100 text-emerald-700",
      orange: "bg-orange-100 text-orange-700",
      red: "bg-red-100 text-red-700",
      rose: "bg-rose-100 text-rose-700",
    };
    return maps[color] || maps.blue;
  };

  return (
    <div className={`mb-8 rounded-3xl border-2 overflow-hidden ${getColorClasses(section.color)}`}>
      <div className="p-6 sm:p-8 flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`p-2 rounded-xl ${getBadgeColor(section.color)}`}>
              {section.icon}
            </span>
            <span className="font-bold tracking-wide uppercase text-sm opacity-70">
              Module {section.id.toUpperCase().slice(0, 3)}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">{section.title}</h2>
          <p className="text-lg opacity-80 font-medium">{section.subtitle}</p>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-8 pt-0 border-t border-black/5">
        {/* Pro Tip Box */}
        {section.proTip && (
          <div className="mt-8 bg-white/50 border border-white p-4 rounded-xl flex gap-4 items-start shadow-sm">
            <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-1">Trader's Insight</h4>
              <p className="text-sm font-medium leading-relaxed">{section.proTip}</p>
            </div>
          </div>
        )}

        <p className="mt-6 text-lg leading-relaxed mb-8 font-light">{section.content}</p>

        <div className="grid grid-cols-1 gap-6">
          {section.details.map((detail: any, idx: number) => (
            <div key={idx} className="bg-white/60 p-6 rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-slate-800">
                <MousePointer className="w-4 h-4 opacity-50" />
                {detail.head}
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{detail.text}</p>
            </div>
          ))}
        </div>

        {section.table && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-white/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className={`text-xs uppercase ${getBadgeColor(section.color)}`}>
                  <tr>
                    {section.table.headers.map((h: string, i: number) => (
                      <th key={i} className="px-6 py-4 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/80">
                  {section.table.rows.map((row: string[], i: number) => (
                    <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-white">
                      <td className="px-6 py-4 font-bold text-slate-700">{row[0]}</td>
                      <td className="px-6 py-4 text-slate-600">{row[1]}</td>
                      <td className="px-6 py-4 text-slate-600">{row[2]}</td>
                      {row[3] && <td className="px-6 py-4 text-slate-600">{row[3]}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PredictionMarketsGuide() {
  const currentArticle = articles.find(article => article.slug === 'prediction-markets-financialization-truth-complete-trading-guide');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-yellow-200">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500" />
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-widest mb-8 border border-slate-200">
              <BookOpen className="w-4 h-4" />
              Strategic Research 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900">
              Prediction Markets
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From political betting to economic hedging. <br/>
              <span className="text-slate-400 text-lg mt-4 block">A deep-dive tutorial on mechanics, strategy, and risk.</span>
            </p>
          </div>
        </div>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/YjJeuYv.jpeg" 
              alt="Prediction Markets Complete Guide Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(true);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/YjJeuYv.jpeg"
          alt="Prediction Markets Complete Guide Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-6 py-12">
          {/* Intro Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl shadow-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                  {GuideData.intro.badge}
                </span>
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-bold mb-6">{GuideData.intro.title}</h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">{GuideData.intro.content}</p>
            </div>
          </div>

          {/* Tutorial Sections */}
          <div className="space-y-6">
            {GuideData.sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-24 text-center pb-12">
            <div className="inline-flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 w-full mb-8">
              <div className="text-left max-w-lg">
                <h4 className="font-bold text-slate-900 mb-2">Research Disclaimer</h4>
                <p className="text-sm text-slate-500">
                  This guide is for educational purposes only. Prediction markets involve a high degree of risk and the potential for the loss of principal. Past performance of specific strategies (e.g., 'French Whale') does not guarantee future results.
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </main>
      </div>
    </>
  );
}