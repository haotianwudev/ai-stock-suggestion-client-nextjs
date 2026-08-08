'use client';

import React from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 border-b border-slate-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-2xl font-semibold text-indigo-700 ${className}`}>
    {children}
  </h2>
);

const CardSubtitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-slate-500 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 space-y-4 text-slate-700 ${className}`}>
    {children}
  </div>
);

const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`mb-12 ${className}`}>
    {children}
  </section>
);

const SubHeading = ({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) => (
  <h3 id={id} className={`text-2xl font-bold text-gray-800 mb-6 ${className}`}>
    {children}
  </h3>
);

const q2Portfolio = [
  { name: "UnitedHealth ($UNH) Call Options", value: "$109.2 million (18.88% of portfolio)" },
  { name: "Regeneron ($REGN) Call Options", value: "$105.0 million (18.16% of portfolio)" },
  { name: "Lululemon ($LULU) Call Options", value: "$95.0 million (16.43% of portfolio)" },
  { name: "Meta Platforms ($META) Call Options", value: "$73.8 million (12.76% of portfolio)" },
  { name: "Estee Lauder ($EL) Call Options", value: "$40.4 million (6.99% of portfolio)" },
  { name: "Alibaba ($BABA) & JD.com ($JD) Call Options", value: "Significant positions" },
];

const q3Sells = [
  "Sold: UnitedHealth ($UNH) Call (was 18.88% of portfolio)",
  "Sold: Regeneron ($REGN) Call (was 18.16% of portfolio)",
  "Sold: Lululemon ($LULU) Call (was 16.43% of portfolio)",
  "Sold: Meta Platforms ($META) Call (was 12.76% of portfolio)",
  "Sold: Estee Lauder ($EL) Call (was 6.99% of portfolio)",
];

const q3Holdings = [
  { company: "Palantir Technologies ($PLTR)", type: "Put Option", equivalent: "5,000,000", value: "$912.10", portfolio: "66.04%" },
  { company: "Nvidia Corporation ($NVDA)", type: "Put Option", equivalent: "1,000,000", value: "$186.58", portfolio: "13.51%" },
  { company: "Pfizer Inc. ($PFE)", type: "Call Option", equivalent: "6,000,000", value: "$152.88", portfolio: "11.07%" },
  { company: "Halliburton Company ($HAL)", type: "Call Option", equivalent: "2,500,000", value: "$61.50", portfolio: "4.45%" },
  { company: "Molina Healthcare ($MOH)", type: "Equity", equivalent: "125,000", value: "$23.92", portfolio: "1.73%" },
  { company: "Lululemon Athletica ($LULU)", type: "Equity", equivalent: "100,000", value: "$17.79", portfolio: "1.29%" },
  { company: "SLM Corporation ($SLM)", type: "Equity", equivalent: "480,054", value: "$13.29", portfolio: "0.96%" },
  { company: "Bruker Corp ($BRKR)", type: "Equity (Preferred)", equivalent: "48,334", value: "$13.14", portfolio: "0.95%" },
];

const circularFinancingSteps = [
  "Step 1: An AI leader (like Nvidia) makes a large strategic investment in an AI startup or partner.",
  "Step 2: The startup, flush with new cash, uses that exact same capital to buy GPUs and cloud services from the AI leader (Nvidia).",
  "Step 3: The AI leader books this purchase as 'revenue,' justifying its massive valuation and stock price.",
];

const augustMarketDropReasons = [
  "Weak Labor Market: A 'weaker-than-expected labor market report' on August 1 was the primary catalyst, fueling fears of a slowing economy.",
  "Tariff Policy: The market was simultaneously reacting to new 'Trump tariff moves', which had been challenged by a federal court, creating high uncertainty.",
  "Fed Uncertainty: The combination of weak labor data and tariff-driven inflation concerns 'whipsawed' Treasury yields and increased market expectations for a Federal Reserve rate cut in September.",
];

const counterArguments = [
  "The 'Early' Problem: A 'bubble' call is only actionable with correct timing. Burry's primary criticism has historically been that he is 'early'.",
  "The 'This Time Is Different' Bull Case: The bull case argues that AI is not a bubble, but a genuine, society-altering technological revolution.",
  "The 13F Fallacy: 13F data is 45 days stale. By November 4, Burry could have already adjusted or even closed these positions.",
  "The 'Ignore Burry' Thesis: Critics point out that Burry's 2008 call was a single, career-defining moment. His more recent public calls... have been demonstrably wrong.",
];

export default function AIAntithesisArticle() {
  return (
    <ArticleFrame
      slug="ai-antithesis-deconstructing-michael-burry-q3-2025-pivot"
      additionalDisclaimer="This analysis is based on public 13F filings, which are reported on a 45-day delay and may not reflect a fund's current positions."
    >
      <div className="max-w-4xl mx-auto px-4 text-slate-800 space-y-8">
        {/* Section I: Executive Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileText className="w-7 h-7 text-indigo-600" />
              <CardTitle>I. Executive Analysis: The Q3 2025 Pivot</CardTitle>
            </div>
            <CardSubtitle>Short the &ldquo;Bubble,&rdquo; Long the &ldquo;Real&rdquo;</CardSubtitle>
          </CardHeader>
          <CardContent>
            <p>
              The Q3 2025 Form 13F details one of the most concentrated and high-conviction strategic shifts in Scion&apos;s recent history. The filing revealed a 138% surge in the market value of its reportable assets, climbing to $1.38 billion from $580 million. This increase is primarily attributed to massive new derivative positions constructing a single, cohesive, two-part narrative.
            </p>

            <p className="font-semibold text-indigo-800">1. The Aggressive &ldquo;Bubble&rdquo; Short:</p>
            <p>
              Burry is making an aggressive, directional bet against the perceived &ldquo;bubble&rdquo; in Artificial Intelligence. This is a dominant portfolio theme, with new put options against AI leaders Nvidia ($NVDA) and Palantir ($PLTR) consuming approximately 80% of the fund&apos;s entire reported value. This move appears predicated on a &ldquo;circular financing&rdquo; scheme, rather than sustainable, organic demand.
            </p>

            <p className="font-semibold text-indigo-800">2. The &ldquo;Anti-Bubble&rdquo; Long:</p>
            <p>
              Burry has rotated capital into an &ldquo;anti-bubble&rdquo; portfolio. This involves bullish call option positions on out-of-favor, tangible, and defensive sectors&mdash;specifically, traditional energy (Halliburton, $HAL) and pharmaceuticals (Pfizer, $PFE). This is complemented by classic, deep-contrarian equity purchases in distressed sectors like Molina Healthcare ($MOH) and SLM Corp ($SLM).
            </p>
          </CardContent>
        </Card>

        {/* Section II: Portfolio Transformation */}
        <Card>
          <CardHeader>
            <CardTitle>II. Scion&apos;s Portfolio Transformation: Q2 vs. Q3 2025</CardTitle>
            <CardSubtitle>A comparative analysis of two diametrically opposed market theses.</CardSubtitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-indigo-700">A. The Q2 2025 Portfolio: Bullish on the &ldquo;Rebound&rdquo;</h3>
            <p>
              Scion&apos;s Q2 2025 filing showed an aggressive reversal from a near-total liquidation in Q1. In Q2, he reversed course entirely, establishing a large, bullishly-levered portfolio defined by large call option positions. The Q2 story was unambiguously &ldquo;risk-on.&rdquo;
            </p>

            <p className="font-medium text-slate-800">Top Q2 Holdings Included:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {q2Portfolio.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold text-slate-800">{item.name}:</span> {item.value}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">B. The Q3 2025 Liquidation: Wiping the Slate Clean</h3>
            <p>
              In Q3, Burry systematically liquidated 100% of his Q2 option positions. The top five &ldquo;sells&rdquo; were a mirror image of Q2&apos;s top &ldquo;buys,&rdquo; demonstrating a complete abandonment of the previous quarter&apos;s thesis.
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {q3Sells.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">C. The New Bastion: Scion&apos;s Q3 2025 Holdings (The 8 Positions)</h3>
            <p>
              The new $1.38 billion portfolio is a case study in concentration, consisting of only eight positions in total.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company (Ticker)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Share/Contract Equivalent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notional Value ($M)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">% of Portfolio</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {q3Holdings.map((holding) => (
                    <tr key={holding.company}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{holding.company}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                        holding.type.includes('Put') ? 'text-rose-600' : 'text-emerald-600'
                      }`}>
                        {holding.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{holding.equivalent}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{holding.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{holding.portfolio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Section III: The $1.1B Short Thesis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingDown className="w-7 h-7 text-rose-600" />
              <CardTitle>III. Deconstructing the Thesis: The $1.1B Short Against AI</CardTitle>
            </div>
            <CardSubtitle>The intellectual &ldquo;why&rdquo; behind the dominant bearish bet.</CardSubtitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-indigo-700">A. The Bearish Core: NVDA and PLTR</h3>
            <p>
              The puts on Palantir ($912 million notional value) and Nvidia ($187 million notional value) consume a combined 79.55% of the filed portfolio. This is an &ldquo;all-in&rdquo; bet against the two companies that have become poster children for the AI narrative, predicated on the idea that their valuations are indefensible.
            </p>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">B. The &ldquo;Circular Financing&rdquo; Doctrine</h3>
            <p>
              This is not just a simple valuation call; it is a bet against the <em>sustainability</em> of the AI boom itself. On November 3, Burry shared a graphic detailing &ldquo;circular financing concerns&rdquo; related to Nvidia. This thesis argues that the AI revenue boom is, in part, an illusion built on a self-referential loop:
            </p>

            <ul className="list-decimal list-inside space-y-2 text-indigo-800 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              {circularFinancingSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <p className="mt-4">
              If this thesis is correct, the reported revenue is not from genuine, external, end-customer demand, but is rather a closed-loop system&mdash;a venture capital echo chamber.
            </p>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">C. The Missing Disclaimer: Why This Time Is Different</h3>
            <p>
              When Scion previously disclosed a put position on Nvidia in Q1 2025, the filing included a specific disclaimer that the puts &ldquo;may serve to hedge long positions.&rdquo;
            </p>

            <p className="font-medium text-amber-900 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-md">
              The Q3 2025 filing contains <em>no such disclaimer</em>.
            </p>

            <p>
              The removal of this specific legal language is a deliberate and powerful signal. The Q3 short is naked, unhedged, and unambiguously directional. This is not a hedge; this is a &ldquo;Big Short.&rdquo;
            </p>
          </CardContent>
        </Card>

        {/* Section IV: The "Anti-Bubble" Portfolio */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
              <CardTitle>IV. The Other Side of the Ledger: The &ldquo;Anti-Bubble&rdquo; Portfolio</CardTitle>
            </div>
            <CardSubtitle>Burry&apos;s new bullish convictions in the physical, defensive, and tangible.</CardSubtitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-indigo-700">A. Pivoting to &ldquo;Real-World&rdquo; Value: PFE and HAL Calls</h3>
            <p>
              Burry&apos;s new bullish bets are expressed through call options on two unloved S&amp;P 500 giants: a $153 million position in Pfizer ($PFE) and a $61.5 million position in Halliburton ($HAL). This is a clear rotation from high-multiple tech to defensive, cash-flow-oriented &ldquo;value&rdquo; sectors.
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><span className="font-semibold text-slate-800">Pfizer ($PFE):</span> A classic defensive, non-cyclical healthcare play.</li>
              <li><span className="font-semibold text-slate-800">Halliburton ($HAL):</span> Represents a bet on the &ldquo;real world&rdquo; economy, hard assets, and a potential hedge against persistent inflation.</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">B. The Contrarian Equity Book: MOH, SLM, and LULU</h3>
            <p>
              Burry&apos;s small-cap equity positions reveal his classic, bottom-up, deep-value investing style.
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><span className="font-semibold text-slate-800">Molina Healthcare ($MOH):</span> A profoundly contrarian &ldquo;buy the blood&rdquo; move. Molina&apos;s stock was down 49% year-to-date, and Burry initiated his position precisely when the news was at its absolute worst.</li>
              <li><span className="font-semibold text-slate-800">SLM Corp ($SLM):</span> A classic Burry bet on a distressed, controversial sector: private student loans.</li>
              <li><span className="font-semibold text-slate-800">Lululemon ($LULU):</span> A sophisticated two-part maneuver. He <em>doubled</em> his equity stake while simultaneously <em>selling</em> his large Q2 call option. He is &ldquo;de-levering&rdquo; his bullish bet, converting a speculative trade into a long-term investment.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section V: Market Catalyst and Consensus */}
        <Card>
          <CardHeader>
            <CardTitle>V. Market Catalyst and Consensus: Disambiguating Two Downturns</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-indigo-700">A. The &ldquo;Burry Effect&rdquo;: Anatomy of the November 4, 2025 AI Sell-off</h3>
            <p>
              The Q3 13F, filed on Monday, November 3, was not a passive event. The reaction was immediate, severe, and highly specific to the AI sector.
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><span className="font-semibold text-slate-800">The Impact:</span> Palantir ($PLTR) shares were hit hardest, closing the day down between 8% and 9.5%.</li>
              <li><span className="font-semibold text-slate-800">The &ldquo;Tell&rdquo;:</span> This drop occurred <em>despite</em> Palantir reporting strong Q3 earnings and <em>raising</em> its full-year guidance. The market, spooked by Burry, completely ignored the positive fundamental news.</li>
              <li><span className="font-semibold text-slate-800">Contagion:</span> Nvidia ($NVDA) shares fell in sympathy, dropping between 3.8% and 4%. The Nasdaq lost 2% on the day.</li>
              <li><span className="font-semibold text-slate-800">CEO Reaction:</span> Palantir CEO Alex Karp personally attacked Burry on CNBC, calling his thesis &ldquo;bats--- crazy&rdquo; and accusing him of &ldquo;market manipulation,&rdquo; inadvertently giving massive credibility to the bear case.</li>
            </ul>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">B. The Mid-August 2025 Weakness: A Macro-Driven Event</h3>
            <p>
              The market weakness in mid-August was an entirely separate and unrelated event, driven by macroeconomic factors:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {augustMarketDropReasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Section VI: Concluding Synthesis */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
              <CardTitle>VI. Concluding Synthesis and Strategic Implications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-indigo-700">A. The Unified Field Theory of Scion&apos;s Q3</h3>
            <p>
              Michael Burry&apos;s Q3 2025 portfolio is a single, unified, high-conviction narrative. He is shorting a specific, perceived vulnerability&mdash;the &ldquo;circular financing&rdquo; that he believes is inflating AI revenues. Simultaneously, he has built an &ldquo;anti-bubble&rdquo; portfolio. This portfolio is a clear, decisive bet that the market is at an inflection point.
            </p>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">B. The Counter-Argument and Strategic Risks</h3>
            <p>
              This thesis, while compelling, is not without significant risks and counter-arguments:
            </p>

            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {counterArguments.map((arg, index) => (
                <li key={index}>{arg}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-indigo-700 mt-6">C. Final Analyst Assessment</h3>
            <p>
              Despite the risks and the data&apos;s limitations, the <em>narrative</em> of the Q3 2025 filing is too powerful to ignore. The market&apos;s violent reaction on November 4, and particularly the panicked response from Palantir&apos;s CEO, prove that Burry&apos;s 13F has transcended its status as a simple regulatory filing. It has become a powerful, market-moving catalyst.
            </p>

            <p className="mt-4 font-semibold text-indigo-800">
              This portfolio should not be read as eight individual stock picks. It is a single, macro-economic document: a $1.38 billion bet on a paradigm shift.
            </p>
          </CardContent>
        </Card>

        {/* Deep Research Section */}
        <Section>
          <SubHeading id="section-deep-research">Deep Research: Academic Foundations &amp; Market Microstructure</SubHeading>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">I. Theoretical Framework: Information Asymmetry and Market Efficiency</h4>
              <p className="mb-4">
                The academic literature on institutional investor behavior provides crucial context for understanding Burry&apos;s strategic pivot. Grossman and Stiglitz (1980) established that markets cannot be perfectly efficient if information acquisition is costly, creating opportunities for informed traders to generate alpha through superior analysis.
              </p>
              <p className="mb-4">
                Burry&apos;s concentrated position represents what Kyle (1985) termed &ldquo;informed trading,&rdquo; where private information about asset values creates temporary pricing inefficiencies. The 13F filing mechanism, while creating transparency, introduces a 45-day lag that preserves some informational advantage for sophisticated investors.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">II. Empirical Evidence: Hedge Fund Performance and Concentration</h4>
              <p className="mb-4">
                Research by Kacperczyk, Sialm, and Zheng (2005) demonstrates that fund managers with more concentrated portfolios tend to outperform those with diversified holdings, supporting Burry&apos;s strategy of extreme concentration in eight positions representing $1.38 billion in notional exposure.
              </p>
              <p className="mb-4">
                The academic evidence on &ldquo;smart money&rdquo; effects, documented by Gruber (1996) and Zheng (1999), suggests that sophisticated investors&apos; portfolio changes contain predictive information about future returns, lending credence to the market&apos;s violent reaction to Burry&apos;s AI short positions.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">III. Behavioral Finance: Bubble Formation and Contrarian Strategies</h4>
              <p className="mb-4">
                Shiller&apos;s (2000) work on irrational exuberance provides theoretical support for Burry&apos;s &ldquo;circular financing&rdquo; thesis. The feedback loops between investor sentiment, media coverage, and price momentum can create self-reinforcing bubbles that eventually collapse when fundamental reality reasserts itself.
              </p>
              <p className="mb-4">
                De Long et al. (1990) showed that rational arbitrageurs can profit from noise trader sentiment, but face limits to arbitrage including capital constraints and synchronization risk&mdash;factors that may explain the timing and concentration of Burry&apos;s positions.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">IV. Market Microstructure: Options Markets and Price Discovery</h4>
              <p className="mb-4">
                The heavy use of options in Burry&apos;s strategy aligns with research by Pan and Poteshman (2006) showing that options markets often lead equity markets in price discovery. Put option volumes, in particular, have been shown to predict negative stock returns, suggesting that Burry&apos;s massive put positions may create self-fulfilling prophecies.
              </p>
              <p className="mb-4">
                Cremers and Weinbaum (2010) documented that deviations from put-call parity can predict future stock returns, indicating that options markets process information more efficiently than equity markets in certain circumstances.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">V. Risk Management Theory: Concentration vs. Diversification</h4>
              <p className="mb-4">
                Modern Portfolio Theory suggests diversification reduces risk, but Kelly (1956) and subsequent research on optimal portfolio concentration shows that when investors have superior information and high conviction, concentration can be optimal despite higher volatility.
              </p>
              <p className="mb-4">
                The academic literature on &ldquo;conviction weighting&rdquo; by Brands, Brown, and Gallagher (2005) supports strategies where portfolio weights reflect confidence levels rather than risk-parity principles, explaining Burry&apos;s willingness to allocate 79.55% of assets to AI shorts.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">VI. Future Research Directions</h4>
              <p className="mb-4">
                The intersection of artificial intelligence valuations, circular financing mechanisms, and institutional investor behavior represents a fertile area for future academic research. Key questions include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
                <li>How do venture capital feedback loops affect public market valuations?</li>
                <li>What role do celebrity investors play in modern market efficiency?</li>
                <li>How has social media changed the speed and magnitude of institutional investor influence?</li>
                <li>What are the optimal disclosure mechanisms for large derivative positions?</li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </ArticleFrame>
  );
}
