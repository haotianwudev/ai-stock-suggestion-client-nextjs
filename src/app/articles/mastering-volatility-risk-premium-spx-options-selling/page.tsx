'use client';

import React from 'react';
import { TrendingUp, Shield, Brain, Scale, DollarSign, Clock, Award, Briefcase, Zap, AlertTriangle, CheckCircle2, XCircle, Target, Percent, Activity, AlertOctagon, Lock, Globe } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function MasteringVRPArticle() {
  return (
    <ArticleFrame
      slug="mastering-volatility-risk-premium-spx-options-selling"
      additionalDisclaimer="Option writing involves substantial risk of loss, potentially greater than the initial investment if uncovered, and is not suitable for all investors."
    >
      <div className="text-slate-800">
        <InfographicSlot alt="Mastering the Volatility Risk Premium Infographic" />

        {/* Part 1: The VRP */}
        <section id="vrp" className="py-12">
          <SectionHeader
            subtitle="Theoretical Foundation"
            title="The Volatility Risk Premium (VRP)"
            description="The VRP is the persistent spread between Implied Volatility (what the market expects) and Realized Volatility (what actually happens). It is the insurance premium of the financial markets."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card
              icon={<Shield className="w-8 h-8 text-emerald-500" />}
              title="Structural Inelasticity"
              description="Pension funds must hedge. They are price-insensitive buyers of puts. They don't care if VIX is 15 or 25; if their mandate says 'hedge', they buy. This constant demand structurally elevates put prices."
              color="emerald"
            />
            <Card
              icon={<Brain className="w-8 h-8 text-rose-500" />}
              title="Behavioral Premium"
              description="Loss aversion is evolutionary. Investors feel the pain of a 5% drop far more than the joy of a 5% gain, leading them to habitually overpay for 'crash insurance' that rarely pays out."
              color="rose"
            />
            <Card
              icon={<Activity className="w-8 h-8 text-indigo-500" />}
              title="Variance Risk"
              description="Selling options exposes you to 'gamma' risk—losses accelerate as the market moves against you. Writers demand a premium to take on this non-linear risk profile."
              color="indigo"
            />
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 text-slate-800 opacity-20">
              <Percent size={400} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <Award className="w-8 h-8 text-amber-400 mr-3" />
                The Statistical Edge: By The Numbers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <div className="text-5xl font-extrabold text-indigo-400 mb-2">~3.5 pts</div>
                  <div className="text-lg font-semibold text-white mb-2">Average VRP Spread</div>
                  <p className="text-slate-400 leading-relaxed">
                    Historically, VIX (Implied Vol) averages ~19.5, while actual SPX Realized Vol averages ~16. This 3.5 point difference is the writer&apos;s long-term average gross margin.
                  </p>
                </div>
                <div>
                  <div className="text-5xl font-extrabold text-emerald-400 mb-2">86%</div>
                  <div className="text-lg font-semibold text-white mb-2">Implied &gt; Realized</div>
                  <p className="text-slate-400 leading-relaxed">
                    Over rolling 1-month periods since 1990, Implied Volatility has exceeded subsequent Realized Volatility in approximately 86% of observations.
                  </p>
                </div>
                <div>
                  <div className="text-5xl font-extrabold text-rose-400 mb-2">-20%</div>
                  <div className="text-lg font-semibold text-white mb-2">The &ldquo;Tail&rdquo; Risk</div>
                  <p className="text-slate-400 leading-relaxed">
                    The trade-off for steady income is rare, devastating drawdowns (e.g., 1987, 2008, 2020). VRP strategies can wipe out 2 years of gains in 2 weeks if unhedged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Part 2: Instruments */}
        <section id="instruments" className="py-12">
          <SectionHeader
            subtitle="Instrument Analysis"
            title="Choosing Your Vehicle: SPX vs. XSP vs. SPY"
            description="The underlying instrument dictates your tax liability, capital efficiency, and execution risk. Institutional traders almost exclusively use SPX for specific structural reasons."
          />
          <div className="overflow-hidden border border-slate-200 rounded-3xl shadow-lg bg-white mb-12">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-indigo-900 bg-indigo-50/50 uppercase tracking-wider">
                      SPX <span className="block text-xs font-normal normal-case opacity-70">Institutional Gold Standard</span>
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-purple-900 bg-purple-50/50 uppercase tracking-wider">
                      XSP <span className="block text-xs font-normal normal-case opacity-70">Retail &ldquo;Mini-SPX&rdquo;</span>
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-slate-700 bg-slate-50 uppercase tracking-wider">
                      SPY <span className="block text-xs font-normal normal-case opacity-70">ETF Options</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  <TableRow
                    feature="Notional Size"
                    spx="$550k+ (10x Leverage)"
                    xsp="~$55k (1x Leverage)"
                    spy="~$55k (1x Leverage)"
                    description="Value of S&P 500 controlled by one single contract."
                  />
                  <TableRow
                    feature="U.S. Tax Treatment"
                    spx={<Badge text="Section 1256 (60/40)" color="green" />}
                    xsp={<Badge text="Section 1256 (60/40)" color="green" />}
                    spy={<Badge text="Ordinary / Short Term" color="red" />}
                    description="1256 contracts get blended 60% Long-Term / 40% Short-Term capital gains rates regardless of holding period."
                  />
                  <TableRow
                    feature="Settlement Style"
                    spx={<span className="font-bold text-indigo-700">Cash Settled</span>}
                    xsp={<span className="font-bold text-indigo-700">Cash Settled</span>}
                    spy={<span className="text-slate-600">Physical Shares</span>}
                    description="Cash settlement means no risk of suddenly owning $500k of stock overnight."
                  />
                  <TableRow
                    feature="Assignment Risk"
                    spx={<span className="text-emerald-600 font-medium">None (European)</span>}
                    xsp={<span className="text-emerald-600 font-medium">None (European)</span>}
                    spy={<span className="text-rose-600 font-medium">Yes (American)</span>}
                    description="European options cannot be exercised before expiration. Essential for complex spreads."
                  />
                  <TableRow
                    feature="Trading Hours"
                    spx={<span className="text-indigo-600 font-medium">Global (Nearly 24x5)</span>}
                    xsp={<span className="text-slate-600">US Market Hours Only</span>}
                    spy={<span className="text-slate-600">Extended Hours Only</span>}
                    description="Crucial for hedging overnight macro events (e.g., foreign elections, wars)."
                  />
                  <TableRow
                    feature="Commission Efficiency"
                    spx={<span className="text-emerald-600 font-medium">High</span>}
                    xsp={<span className="text-amber-600 font-medium">Medium</span>}
                    spy={<span className="text-amber-600 font-medium">Medium</span>}
                    description="One SPX contract entails 1/10th the commission fees of 10 SPY contracts for the same notional."
                  />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mechanics Section */}
        <section id="mechanics" className="py-12">
          <SectionHeader
            subtitle="Under the Hood"
            title="Vital Mechanics: Tax & Margin"
            description="Understanding these two concepts is what separates amateur option writers from professional volatility managers."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tax Alpha Box */}
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-emerald-500 rounded-2xl shadow-md">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-emerald-900">The &ldquo;Tax Alpha&rdquo; Math</h3>
              </div>
              <p className="text-emerald-800 mb-6 leading-relaxed">
                For high-income U.S. earners, the difference between Short Term Capital Gains (STCG) and Section 1256 rates is massive. This is &ldquo;free&rdquo; alpha just by choosing the right ticker.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
                <h4 className="text-lg font-bold text-slate-800 mb-4 text-center border-b pb-2">
                  Hypothetical $100,000 Profit (Top Tax Bracket)
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Instrument</span>
                    <span className="text-slate-600 font-medium">Effective Tax Rate</span>
                    <span className="text-slate-800 font-bold">Tax Owed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <span className="font-bold text-rose-900">SPY (ETF)</span>
                    <span className="text-rose-800">37.0% (Ordinary)</span>
                    <span className="font-mono font-bold text-rose-700">$37,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-100 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-900">SPX (Index)</span>
                    <span className="text-emerald-800">26.8% (Blended)</span>
                    <span className="font-mono font-bold text-emerald-700">$26,800</span>
                  </div>
                  <div className="text-center pt-2">
                    <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                      $10,200 &ldquo;Tax Alpha&rdquo; Saved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Margin Box */}
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-md">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="ml-4 text-2xl font-bold text-indigo-900">Capital Efficiency (Margin)</h3>
              </div>
              <p className="text-indigo-800 mb-6 leading-relaxed">
                Standard retail accounts use &ldquo;Reg T&rdquo; margin, which is simplistic and capital inefficient. Professionals use &ldquo;Portfolio Margin&rdquo; (PM), which uses stress tests to determine risk.
              </p>
              <ul className="space-y-4">
                <li className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="font-bold text-indigo-900 mb-1">Regulation T (Standard)</div>
                  <p className="text-sm text-slate-600">
                    Fixed rules. Selling a naked put might require securing 20% of the notional value, tying up massive capital and dragging down ROE.
                  </p>
                </li>
                <li className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="font-bold text-indigo-900 mb-1">Portfolio Margin (Advanced)</div>
                  <p className="text-sm text-slate-600">
                    Risk-based. If you sell a put but also buy a further OTM put (a spread), PM recognizes the capped risk and drastically reduces the margin requirement, sometimes by 80%+.
                  </p>
                </li>
              </ul>
              <div className="mt-6 flex items-start bg-amber-50 p-4 rounded-xl border border-amber-100">
                <AlertOctagon className="w-6 h-6 text-amber-600 flex-shrink-0 mr-3" />
                <p className="text-xs text-amber-800 font-medium">
                  <strong>Warning:</strong> Portfolio Margin is a double-edged sword. It allows massive leverage, which is the primary cause of account blowups during crash events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risks Section */}
        <section id="risks" className="py-12 bg-slate-900 text-slate-50 rounded-3xl px-4 md:px-8">
          <div className="text-center mb-16 pt-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-rose-300 bg-rose-900/50 mb-4 border border-rose-700">
              <AlertTriangle className="w-4 h-4 mr-2" /> Danger Zones
            </div>
            <h2 className="text-4xl font-extrabold text-white">Structural Risks &amp; &ldquo;Blowups&rdquo;</h2>
            <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto">
              Option selling is often described as &ldquo;picking up pennies in front of a steamroller.&rdquo; Understanding the steamroller is more important than counting the pennies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RiskCard
              icon={<Activity className="text-rose-400"/>}
              title="Gamma Risk"
              description="As the market moves against your short option, its sensitivity to price changes (delta) increases rapidly. A small loss can exponentially become a catastrophic loss in minutes during a fast crash."
            />
            <RiskCard
              icon={<TrendingUp className="text-rose-400"/>}
              title="Vega Expansion"
              description="In a crash, volatility explodes higher. Even if the price hasn't reached your strike yet, the sheer panic (rising IV) can blow out the mark-to-market value of your short positions, forcing margin calls."
            />
            <RiskCard
              icon={<Lock className="text-rose-400"/>}
              title="Liquidity Lock-up"
              description="During extreme events (like the 2010 Flash Crash), market makers may pull quotes. You might physically be unable to close your position at ANY reasonable price while losses mount."
            />
          </div>
          <div className="mt-12 bg-slate-800/50 rounded-2xl p-8 border border-rose-900/30 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Historical Case Study: &ldquo;Volmageddon&rdquo; (Feb 2018)</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              After years of calm markets, the VIX spiked from ~17 to ~50 in a single trading session. Many short-volatility strategies (like the XIV ETN) were wiped out entirely&mdash;losing 90%+ of their value in hours&mdash;despite the S&amp;P 500 itself only being down about 4% that day.
            </p>
            <p className="text-slate-400 text-sm italic">
              Lesson: It&apos;s not just price that can kill you, it&apos;s the speed of the move (volatility of volatility).
            </p>
          </div>
        </section>

        {/* DIY vs ETF Section */}
        <section id="implementation" className="py-12">
          <SectionHeader
            subtitle="Implementation Strategy"
            title="The Great Debate: DIY vs. Packaged ETF"
            description="Do you have the skill to be your own portfolio manager, or should you pay someone else to handle the emotional burden?"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* DIY Side */}
            <div className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -z-10 opacity-50 pointer-events-none"></div>
              <div className="flex items-center mb-8">
                <div className="p-4 bg-indigo-600 rounded-2xl shadow-md">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-slate-900">Self-Directed (DIY)</h3>
                  <p className="text-indigo-600 font-medium">Maximum Control &amp; Efficiency</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Advantages</h4>
                  <ul className="space-y-3">
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="Total Tax Optimization">
                      Ensure 100% of trades are 1256 qualified.
                    </ListItem>
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="Execution Alpha">
                      Capture the bid-ask spread (often $5-$10 per contract) via patient limit orders.
                    </ListItem>
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="Dynamic Hedging">
                      Ability to &ldquo;flatten&rdquo; the book before known binary events (CPI, Fed, Elections).
                    </ListItem>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Critical Drawbacks</h4>
                  <ul className="space-y-3">
                    <ListItem icon={<XCircle className="text-rose-500"/>} title="Psychological Burden">
                      It is mentally exhausting to manage positions when the market is down 3% and your screen is flashing red.
                    </ListItem>
                    <ListItem icon={<XCircle className="text-rose-500"/>} title="Complexity Creep">
                      Requires understanding Greeks, margin, and rolling mechanics.
                    </ListItem>
                  </ul>
                </div>
              </div>
            </div>

            {/* ETF Side */}
            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-bl-full -z-10 opacity-50 pointer-events-none"></div>
              <div className="flex items-center mb-8">
                <div className="p-4 bg-purple-600 rounded-2xl shadow-md">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-slate-900">Packaged ETFs</h3>
                  <p className="text-purple-600 font-medium">Outsourced Discipline</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Advantages</h4>
                  <ul className="space-y-3">
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="Forced Discipline">
                      Systematic rules prevent emotional panic-selling at the bottom.
                    </ListItem>
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="Instant Diversification">
                      One ticker gives you exposure to a complex ladder of options.
                    </ListItem>
                    <ListItem icon={<CheckCircle2 className="text-emerald-500"/>} title="No Collateral Management">
                      No need to worry about margin calls; the fund manager handles it.
                    </ListItem>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Critical Drawbacks</h4>
                  <ul className="space-y-3">
                    <ListItem icon={<XCircle className="text-rose-500"/>} title="Fee Drag">
                      Expense ratios (0.35% - 0.95%) compound significantly over decades.
                    </ListItem>
                    <ListItem icon={<XCircle className="text-rose-500"/>} title="Structural Inefficiencies">
                      Funds must often trade at specific times, making them predictable &ldquo;prey&rdquo; for HFTs.
                    </ListItem>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ETF Analysis Section */}
        <section id="etfs" className="py-12">
          <SectionHeader
            subtitle="Market Landscape"
            title="ETF Due Diligence: Avoiding Traps"
            description="Not all 'yield' ETFs are the same. The underlying structure determines if your returns are qualified dividends, return of capital, or highly-taxed ordinary income."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ETFCard
              ticker="SPYI"
              name="NEOS S&P 500 High Income"
              strategy="Active Call Spreads"
              instrument="SPX Options (Sec 1256)"
              verdict="Tax Efficient"
              verdictColor="bg-emerald-500"
              details="Specifically designed to use SPX Section 1256 contracts to ensure distribution tax efficiency. Uses call spreads rather than just short calls to leave some room for market upside."
            />
            <ETFCard
              ticker="XYLD"
              name="Global X S&P 500 Covered Call"
              strategy="Passive ATM Covered Call"
              instrument="SPX Options (Sec 1256)"
              verdict="Tax Efficient"
              verdictColor="bg-emerald-500"
              details="A 'dumb' systematic fund that sells At-The-Money (ATM) calls every month. Highly tax efficient, but historically underperforms due to capping 100% of upside during bull runs."
            />
            <ETFCard
              ticker="JEPQ / JEPI"
              name="JPMorgan Equity Premium"
              strategy="Active ELN Overlay"
              instrument="ELNs (Structured Notes)"
              verdict="Tax Inefficient"
              verdictColor="bg-amber-500"
              details="Uses Equity-Linked Notes (ELNs) instead of direct options. Income from ELNs is typically taxed as ordinary income (highest rates), not favorable capital gains."
            />
            <ETFCard
              ticker="Various"
              name="Typical SPY-Based Funds"
              strategy="Put/Call Writing on SPY"
              instrument="SPY Options"
              verdict="Tax Trap"
              verdictColor="bg-rose-500"
              details="Any fund using standard ETF options (like SPY/QQQ) generates short-term capital gains, which are taxed at your maximum ordinary income bracket. Significant drag on net returns."
            />
          </div>
        </section>

        {/* Recommendations Section */}
        <section id="recommendations" className="py-12">
          <SectionHeader
            subtitle="Strategic Synthesis"
            title="Find Your Optimal Profile"
            description="Based on capital, time commitment, and psychological risk tolerance."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PersonaCard
              icon={<Globe className="w-10 h-10 text-indigo-600"/>}
              title='The "Pro-Am" Institutionalist'
              subtitle=">$500k Capital • High Skill • Tax Sensitive"
              recommendation="DIY with SPX Options"
              description="You have the capital to trade standard SPX contracts (notional $550k+) without over-leveraging. You demand pure Section 1256 tax treatment, 24x5 global trading hours for hedging, and zero management fees. You likely use Portfolio Margin."
            />
            <PersonaCard
              icon={<Scale className="w-10 h-10 text-purple-600"/>}
              title='Sophisticated Retail'
              subtitle="$50k - $500k Capital • High Skill"
              recommendation="DIY with XSP Options"
              description="You want the 'holy trinity' of institutional benefits—Cash Settlement, European Style, 1256 Tax Treatment—but your account size can't handle full SPX contracts. You use XSP (1/10th size) to maintain precise position sizing."
            />
            <PersonaCard
              icon={<Clock className="w-10 h-10 text-emerald-600"/>}
              title='The "Yield Harvester"'
              subtitle="Any Capital • Low Time • Risk Averse"
              recommendation="Tax-Aware ETFs (e.g., SPYI, XYLD)"
              description="You want the VRP income stream but know you lack the discipline to manage positions during a crash. You willingly pay 0.35%-0.60% annually to outsource the stress, but you carefully select funds that don't hit you with surprise ordinary income taxes."
            />
            <PersonaCard
              icon={<Zap className="w-10 h-10 text-amber-600"/>}
              title='Tactical / 0DTE Trader'
              subtitle="Active • Speed Focused • High Risk Tolerance"
              recommendation="DIY with SPY Options"
              description="You are trading intraday or very short duration (0DTE). You need the tightest possible bid/ask spreads ($0.01 wide) to enter and exit instantly. You sacrifice tax efficiency for pure liquidity and speed."
            />
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}

// Sub-components
const SectionHeader = ({ subtitle, title, description }: { subtitle: string; title: string; description: string }) => (
  <div className="text-center mb-16">
    <h2 className="inline-block px-3 py-1 text-sm font-bold text-indigo-700 bg-indigo-50 rounded-full tracking-wide uppercase mb-4">
      {subtitle}
    </h2>
    <p className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{title}</p>
    <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">{description}</p>
  </div>
);

const Card = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-200",
    rose: "bg-rose-50/50 border-rose-100 hover:border-rose-200",
    indigo: "bg-indigo-50/50 border-indigo-100 hover:border-indigo-200",
    amber: "bg-amber-50/50 border-amber-100 hover:border-amber-200",
  };
  return (
    <div className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorClasses[color] || "bg-white border-slate-200"}`}>
      <div className="mb-6 bg-white p-4 inline-block rounded-2xl shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const RiskCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700/50">
    <div className="mb-5 bg-slate-900/50 p-3 inline-block rounded-xl border border-slate-700">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const TableRow = ({ feature, spx, xsp, spy, description }: { feature: string; spx: React.ReactNode; xsp: React.ReactNode; spy: React.ReactNode; description: string }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-5">
      <div className="text-sm font-bold text-slate-900">{feature}</div>
      <div className="text-xs text-slate-500 mt-1 leading-normal max-w-xs">{description}</div>
    </td>
    <td className="px-6 py-5 text-center text-sm text-slate-700 border-l border-indigo-50 bg-indigo-50/20 font-medium align-middle">{spx}</td>
    <td className="px-6 py-5 text-center text-sm text-slate-700 border-l border-purple-50 bg-purple-50/20 font-medium align-middle">{xsp}</td>
    <td className="px-6 py-5 text-center text-sm text-slate-700 border-l border-slate-100 align-middle">{spy}</td>
  </tr>
);

const Badge = ({ text, color }: { text: string; color: string }) => {
  const classes = color === 'green'
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : 'bg-rose-100 text-rose-800 border-rose-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${classes}`}>
      {text}
    </span>
  );
};

const ListItem = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <li className="flex items-start">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="ml-3">
      <p className="text-base font-bold text-slate-900">{title}</p>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{children}</p>
    </div>
  </li>
);

const ETFCard = ({ ticker, name, strategy, instrument, verdict, verdictColor, details }: {
  ticker: string;
  name: string;
  strategy: string;
  instrument: string;
  verdict: string;
  verdictColor: string;
  details: string
}) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{ticker}</h3>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{name}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white ${verdictColor}`}>
        {verdict}
      </span>
    </div>
    <div className="space-y-4 flex-grow bg-slate-50 p-4 rounded-2xl mb-4">
      <div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Strategy</p>
        <p className="text-sm font-semibold text-slate-800">{strategy}</p>
      </div>
      <div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Instrument Base</p>
        <p className="text-sm font-medium text-indigo-700">{instrument}</p>
      </div>
    </div>
    <div className="pt-2">
      <p className="text-xs text-slate-600 leading-relaxed">{details}</p>
    </div>
  </div>
);

const PersonaCard = ({ icon, title, subtitle, recommendation, description }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  recommendation: string;
  description: string
}) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-150"></div>
    <div className="mb-6 p-3 bg-white shadow-sm inline-block rounded-2xl border border-slate-100">{icon}</div>
    <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
    <p className="text-sm text-indigo-600 font-bold mb-6 uppercase tracking-wider">{subtitle}</p>
    <div className="mb-6">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Optimal Strategy</span>
      <p className="text-lg font-bold text-slate-900 bg-slate-100 inline-block px-4 py-2 rounded-xl text-indigo-700 mt-2 w-full border border-slate-200">
        {recommendation}
      </p>
    </div>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);
