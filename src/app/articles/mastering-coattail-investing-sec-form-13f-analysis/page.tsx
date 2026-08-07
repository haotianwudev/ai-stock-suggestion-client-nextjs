'use client';

import React from 'react';
import { BookOpen, Clock, ShieldAlert, TrendingUp, Users, Activity, Search, CheckCircle, XCircle, PieChart, Briefcase, Target, Cpu, Globe, Layers, Scale } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-rose-100 text-rose-800",
    purple: "bg-purple-100 text-purple-800",
    amber: "bg-amber-100 text-amber-800",
    gray: "bg-slate-200 text-slate-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const InvestorCard = ({ name, firm, type, strategy, keyMoves, color }: {
  name: string;
  firm: string;
  type: string;
  strategy: string;
  keyMoves: Array<{ ticker: string; desc: string; type: string }>;
  color: string;
}) => (
  <div className={`bg-white rounded-2xl p-6 shadow-xl border-t-4 hover:shadow-2xl transition-shadow duration-300 ${color === 'green' ? 'border-emerald-500' : color === 'purple' ? 'border-purple-500' : 'border-blue-500'}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-500 font-medium">{firm}</p>
      </div>
      <Badge color={color}>{type}</Badge>
    </div>
    <p className="text-slate-600 text-sm mb-6 leading-relaxed">{strategy}</p>
    <div className="bg-slate-50 rounded-xl p-4">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Q4 2025 Key Moves</h4>
      <ul className="space-y-3">
        {keyMoves.map((move, idx) => (
          <li key={idx} className="flex items-start text-sm">
            <span className={`mt-1 mr-2 w-2 h-2 rounded-full flex-shrink-0 ${move.type === 'buy' ? 'bg-emerald-500' : move.type === 'sell' ? 'bg-rose-500' : 'bg-amber-500'}`} />
            <span className="text-slate-700">
              <span className="font-semibold">{move.ticker}:</span> {move.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StepCard = ({ number, title, icon: Icon, children }: {
  number: number;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="relative pl-16 py-4 group">
    <div className="absolute left-0 top-4 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-300">
      <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
    </div>
    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 -z-10 group-last:hidden"></div>
    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center">
      <span className="mr-2 text-indigo-500">Step {number}:</span> {title}
    </h3>
    <div className="text-slate-600 leading-relaxed max-w-2xl">{children}</div>
  </div>
);

const TypologyCard = ({ icon: Icon, title, description, examples, type }: {
  icon: React.ElementType;
  title: string;
  description: string;
  examples: string[];
  type: string;
}) => (
  <div className={`p-6 rounded-xl border ${type === 'good' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
    <div className="flex items-start mb-4">
      <div className={`p-2 rounded-lg mr-3 ${type === 'good' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
        <Icon className={`w-5 h-5 ${type === 'good' ? 'text-emerald-600' : 'text-rose-600'}`} />
      </div>
      <div>
        <h4 className={`text-lg font-bold ${type === 'good' ? 'text-emerald-900' : 'text-rose-900'}`}>{title}</h4>
      </div>
    </div>
    <p className="text-sm text-slate-600 mb-4 min-h-[60px]">{description}</p>
    <div className="pt-4 border-t border-dashed border-slate-300">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Typical Firms</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {examples.map((ex, i) => (
          <Badge key={i} color={type === 'good' ? 'green' : 'red'}>{ex}</Badge>
        ))}
      </div>
    </div>
  </div>
);

const ConflictCard = ({ stock, bull, bear, bullThesis, bearThesis }: {
  stock: string;
  bull: string;
  bear: string;
  bullThesis: string;
  bearThesis: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 mr-3">
          {stock}
        </div>
        <h4 className="font-bold text-slate-900">The Battleground</h4>
      </div>
      <Scale className="text-slate-400 w-5 h-5" />
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
        <span className="block font-bold text-emerald-800 mb-1">{bull} (Buying)</span>
        <p className="text-emerald-700 leading-tight">{bullThesis}</p>
      </div>
      <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
        <span className="block font-bold text-rose-800 mb-1">{bear} (Selling)</span>
        <p className="text-rose-700 leading-tight">{bearThesis}</p>
      </div>
    </div>
  </div>
);

export default function CoattailInvestingArticle() {
  return (
    <ArticleFrame slug="mastering-coattail-investing-sec-form-13f-analysis">
      <div className="bg-transparent font-sans">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Mastering Coattail Investing Infographic" />
        </div>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Introduction & Mechanics */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">What is the 13F?</h2>
              <p className="text-lg text-slate-600 mb-4">
                Born from the Securities Exchange Act of 1934, SEC Form 13F is a quarterly report filed by institutional investment managers with over <strong>$100 million</strong> in qualifying assets.
              </p>
              <p className="text-slate-600 mb-6">
                It provides a snapshot of long positions in U.S. equities and options. While it offers transparency, it was designed for regulatory oversight, not for retail copycats.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <Clock className="w-6 h-6 text-amber-500 mb-2" />
                  <h3 className="font-semibold text-slate-900">The 45-Day Lag</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Filings are due 45 days after quarter-end. Q4 data (Dec 31) arrives in mid-February.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <ShieldAlert className="w-6 h-6 text-rose-500 mb-2" />
                  <h3 className="font-semibold text-slate-900">Asymmetric Data</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Only LONG positions are shown. Short sells, foreign stocks, and cash are hidden.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                <BookOpen size={200} />
              </div>
              <h3 className="text-2xl font-bold mb-4">The Golden Rule</h3>
              <p className="text-indigo-200 mb-6 text-lg">
                "Treating a 13F filing as a real-time reflection of market sentiment is a critical analytical fallacy."
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm">Follow managers with multi-year time horizons.</p>
                </div>
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-rose-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm">Avoid High-Frequency Traders & Market Makers.</p>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm">Verify the thesis before cloning.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typology: Who to Follow vs Avoid */}
        <section className="mb-16 bg-white py-16 px-4 md:px-8 rounded-3xl">
          <div className="text-center mb-16">
            <Badge color="blue">Step 1: Filtration</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mt-4">The Typology of Institutional Alpha</h2>
            <p className="text-slate-500 mt-2">
              Not all billions are created equal. You must filter for specific operational models to find actionable signal.
            </p>
          </div>

          {/* High Signal Investors */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              High-Signal Allocators (The Green Zone)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TypologyCard 
                icon={Target}
                type="good"
                title="Concentrated Value"
                description="The 'Holy Grail' of 13Fs. These managers run portfolios with <20 stocks and hold for years. Turnover is low, meaning the 45-day lag is irrelevant."
                examples={["Berkshire (Buffett)", "Himalaya (Li Lu)", "Baupost (Klarman)"]}
              />
              <TypologyCard 
                icon={Users}
                type="good"
                title="Activist Investors"
                description="They don't just pick stocks; they change companies. They seek board seats to force buybacks or spinoffs. Their entry often creates a self-fulfilling catalyst."
                examples={["Pershing Sq (Ackman)", "Trian (Peltz)", "Third Point (Loeb)"]}
              />
              <TypologyCard 
                icon={Cpu}
                type="good"
                title="Sector Specialists"
                description="Deep domain experts in complex fields like Biotech or Tech. They understand the science better than the market. Buying signals here are high-fidelity quality checks."
                examples={["Baker Bros (Bio)", "Coatue (Tech)", "Greenlight (Einhorn)"]}
              />
            </div>
          </div>

          {/* Low Signal Investors */}
          <div>
            <h3 className="text-xl font-bold text-rose-800 mb-6 flex items-center">
              <XCircle className="w-6 h-6 mr-2" />
              Low-Signal / Noise (The Red Zone)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TypologyCard 
                icon={Activity}
                type="bad"
                title="High-Frequency / Quant"
                description="Algorithms trade in milliseconds. A quarterly snapshot of their portfolio is mathematically useless. It represents a state that ceased to exist months ago."
                examples={["Renaissance", "Two Sigma", "D.E. Shaw"]}
              />
              <TypologyCard 
                icon={Layers}
                type="bad"
                title="Market Makers"
                description="Their massive holdings are inventory, not investment convictions. High options volume in their 13F is usually hedging retail order flow."
                examples={["Citadel", "Susquehanna", "Virtu"]}
              />
              <TypologyCard 
                icon={Globe}
                type="bad"
                title="Index Aggregators"
                description="They own everything because they track indices (S&P 500). Their 'buying' just means they received more inflows, not that they like the stock."
                examples={["Vanguard", "BlackRock", "State Street"]}
              />
              <TypologyCard 
                icon={Briefcase}
                type="bad"
                title="Bank Trading Desks"
                description="Holdings often represent client facilitation, prime brokerage hedging, or derivatives. It is impossible to separate proprietary bets from client flow."
                examples={["J.P. Morgan", "Goldman Sachs", "Morgan Stanley"]}
              />
            </div>
          </div>
        </section>

        {/* Q4 2025 Analysis */}
        <section className="mb-16 bg-indigo-50 py-16 px-4 md:px-8 rounded-3xl">
          <div className="text-center mb-16">
            <Badge color="purple">Q4 2025 Research • Feb 2026 Filings</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mt-4">The Apex Allocators: Divergent Views</h2>
            <p className="text-slate-500 mt-2">
              The consensus has fractured. The masters are taking opposing bets on the "AI Capex" cycle.
            </p>
          </div>

          {/* The Divergence Map */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <ConflictCard 
                stock="META"
                bull="Bill Ackman"
                bullThesis="New $1.8B position. Sees AI monetization runway and discounted valuation relative to hyperscalers."
                bear="Druckenmiller"
                bearThesis="Exited completely. Cites concerns over rising capital expenditures and regulatory headwinds."
              />
              <ConflictCard 
                stock="AMZN"
                bull="Seth Klarman"
                bullThesis="New Buy. Sees value in AWS cash flow resilience and logistics dominance despite AI spend."
                bear="Warren Buffett"
                bearThesis="Sold 77% of stake. A massive de-risking move, signaling discomfort with cloud valuation multiples."
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <InvestorCard 
              name="Warren Buffett"
              firm="Berkshire Hathaway"
              type="Value"
              color="green"
              strategy="Extreme caution on Tech. Shifting capital into high-cash-flow media and consumer staples."
              keyMoves={[
                { ticker: "AMZN", desc: "Sold 77%. The headline shocker of the quarter.", type: "sell" },
                { ticker: "AAPL", desc: "Reduced -4.3%. Continued trimming of top holding.", type: "sell" },
                { ticker: "NYT", desc: "New Buy. Betting on digital subscription pricing power.", type: "buy" },
                { ticker: "DPZ", desc: "Increased stake. Classic recession-resistant franchise.", type: "buy" }
              ]}
            />
            <InvestorCard 
              name="Bill Ackman"
              firm="Pershing Square"
              type="Activist"
              color="blue"
              strategy="Aggressive rotation into the 'Magnificent Seven' while liquidating legacy restaurant wins."
              keyMoves={[
                { ticker: "META", desc: "New $1.8B Stake. Now a top-5 holding.", type: "buy" },
                { ticker: "BN", desc: "Brookfield +50%. Playing the 'AI Power' real estate angle.", type: "buy" },
                { ticker: "CMG", desc: "Exited 100%. Cashed out after historic run-up.", type: "sell" },
                { ticker: "NKE", desc: "Exited 100%. Abandoned turnaround thesis.", type: "sell" }
              ]}
            />
            <InvestorCard 
              name="David Tepper"
              firm="Appaloosa Management"
              type="Macro"
              color="purple"
              strategy="'All-in' on AI Infrastructure hardware but hedging with deep value consumer durables."
              keyMoves={[
                { ticker: "MU", desc: "Micron +200%. Massive bet on memory chip cycle.", type: "buy" },
                { ticker: "GOOGL", desc: "Increased +29%. High conviction in Gemini integration.", type: "buy" },
                { ticker: "WHR", desc: "Whirlpool +1,966%. A contrarian mean-reversion trade.", type: "buy" },
                { ticker: "BABA", desc: "Reduced -20%. Trimming China exposure.", type: "sell" }
              ]}
            />
            <InvestorCard 
              name="Stanley Druckenmiller"
              firm="Duquesne Family Office"
              type="Macro"
              color="purple"
              strategy="Pivoting to 'Old Economy' Cyclicals. Betting on deregulation and yield curve steepening."
              keyMoves={[
                { ticker: "GS", desc: "New Buy. Financials play for M&A rebound.", type: "buy" },
                { ticker: "DAL/AAL", desc: "New Buys. Airlines added for cyclical recovery.", type: "buy" },
                { ticker: "META", desc: "Exited 100%. Taking profits on AI hype.", type: "sell" },
                { ticker: "AMZN", desc: "Increased +65%. Diverges from Buffett here.", type: "buy" }
              ]}
            />
          </div>
        </section>

        {/* Tutorial Workflow */}
        <section className="mb-16 bg-white py-16 px-4 md:px-8 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge color="blue">Tutorial</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mt-4">The Common Investor Workflow</h2>
              <p className="text-slate-500 mt-2">How to execute this strategy yourself.</p>
            </div>
            <div className="space-y-4">
              <StepCard number={1} title="Manager Selection" icon={Users}>
                Curate a universe of 10-20 high-conviction managers (CIKs). Stick to fundamental value and macro-opportunists. Filter out the noise of high-frequency funds.
              </StepCard>
              <StepCard number={2} title="The Sentiment Dashboard" icon={PieChart}>
                Wait for the mid-quarter deadline (Feb, May, Aug, Nov). Aggregate holdings into a centralized matrix to visualize net flows of institutional capital.
              </StepCard>
              <StepCard number={3} title="Cluster Buying Identification" icon={Activity}>
                Look for <strong>"Cluster Buying"</strong>: when multiple independent masters buy the same stock in the same quarter. Also watch for <strong>"Conviction Sizing"</strong>—new positions that immediately enter a fund's top 10 holdings (e.g., Tepper's Whirlpool).
              </StepCard>
              <StepCard number={4} title="Cross-Verification" icon={Search}>
                Don't trust the 45-day old data alone. Check <strong>SEC Form 4</strong> for insider trading (did the CEO also buy?) and <strong>Schedule 13D</strong> for activist filings to confirm the thesis is still alive.
              </StepCard>
              <StepCard number={5} title="Fundamental Due Diligence" icon={BookOpen}>
                <strong>Clone but Verify.</strong> Answer <em>why</em> they bought it. For example, knowing Buffett bought Domino's is useless unless you understand the franchise model's resilience. Ensure the asset fits your risk profile.
              </StepCard>
              <StepCard number={6} title="Crowding & Exit Strategy" icon={ShieldAlert}>
                Monitor the exit. If your tracked master liquidates (like Druckenmiller dumping Meta after 3 months), the thesis has likely broken. Don't be the "bag holder" for institutional liquidity.
              </StepCard>
            </div>
          </div>
        </section>

      </main>
      </div>
    </ArticleFrame>
  );
}
