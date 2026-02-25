'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Landmark, TrendingUp, Users, AlertCircle, Activity, ShieldAlert, Gavel, Network, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Reusable UI Components ---
const SectionHeading = ({ icon: Icon, title, subtitle, colorClass }: { 
  icon: React.ElementType; 
  title: string; 
  subtitle?: string; 
  colorClass: string;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-3 rounded-2xl ${colorClass} shadow-sm`}>
        <Icon size={28} className="text-current" />
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-xl text-slate-600 font-medium ml-14">{subtitle}</p>}
  </div>
);

const TutorialCard = ({ title, children, accentColor = "bg-blue-500" }: { 
  title?: string; 
  children: React.ReactNode; 
  accentColor?: string;
}) => (
  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
    <div className={`h-2 w-full ${accentColor}`}></div>
    <div className="p-6 md:p-8">
      {title && <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>}
      <div className="text-slate-600 space-y-4 leading-relaxed text-lg">{children}</div>
    </div>
  </div>
);

const DefinitionBox = ({ term, definition, color = "blue" }: { 
  term: string; 
  definition: string; 
  color?: "blue" | "purple" | "rose" | "amber" | "emerald";
}) => {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };
  return (
    <div className={`p-5 rounded-xl border-l-4 ${colorMap[color]} my-6 shadow-sm`}>
      <span className="font-bold text-lg block mb-1">{term}</span>
      <span className="opacity-90 leading-relaxed">{definition}</span>
    </div>
  );
};

// --- Main Application ---
export default function PrivateCreditArchitecture() {
  const currentArticle = articles.find(article => article.slug === 'architecture-private-credit-structural-mechanics-vulnerabilities');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">

        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white py-24 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold tracking-wider uppercase mb-6 border border-white/30">
              Deep Research
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
              The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Private Credit</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed font-light">
              Structural Mechanics, Emerging Vulnerabilities, and Systemic Implications in a Trillion-Dollar Asset Class.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/KPFe21I.jpeg" 
              alt="Private Credit Architecture Infographic" 
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

        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Private Credit Architecture Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        <main className="max-w-5xl mx-auto space-y-24 py-16 px-6 md:px-12">
          {/* 1. Introduction */}
          <section>
            <SectionHeading 
              icon={BookOpen} 
              title="Macroeconomic Genesis" 
              subtitle="The birth of a trillion-dollar asset class"
              colorClass="bg-blue-100 text-blue-700"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <TutorialCard accentColor="bg-blue-500">
                <p>Following the 2008 Global Financial Crisis (GFC), regulations like the <strong>Dodd-Frank Act</strong> and <strong>Basel III</strong> imposed strict capital and risk rules on traditional banks. This intentionally de-risked the banking system but created a massive vacuum in middle-market corporate finance.</p>
                <p>Private credit emerged to fill this void. By 2024–2025, it exploded into an estimated <strong>$1.7T to $2.5T</strong> market, projected to exceed $3 trillion by 2028.</p>
              </TutorialCard>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 flex flex-col justify-center border border-blue-200">
                <h4 className="text-xl font-bold text-indigo-900 mb-4">Key Takeaway</h4>
                <p className="text-indigo-800 text-lg leading-relaxed">
                  Corporate credit risk has shifted from highly regulated, publicly insured depository banks to opaque, lightly regulated private investment vehicles managed by alternative asset managers.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Business Model */}
          <section>
            <SectionHeading 
              icon={Landmark} 
              title="The Business Model & Mechanics" 
              subtitle="How Direct Lending actually works behind the scenes"
              colorClass="bg-emerald-100 text-emerald-700"
            />
            <div className="space-y-8">
              <TutorialCard accentColor="bg-emerald-500">
                <p>The foundational pillar of private credit is <strong>Direct Lending</strong>—pooling capital from institutional LPs (pensions, sovereign wealth funds) to issue direct, bilaterally negotiated senior secured loans to private companies (often backed by Private Equity sponsors).</p>

                <div className="grid md:grid-cols-2 gap-6 mt-8 mb-2">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
                    <h4 className="font-bold text-slate-800 text-xl mb-3 border-b pb-2">Traditional Banks</h4>
                    <ul className="space-y-2 text-slate-600 list-disc ml-4">
                      <li>Fractional reserve model funded by highly flighty deposits.</li>
                      <li>Prone to "bank run" liquidity spirals.</li>
                      <li>Subject to intense regulatory scrutiny and strict capital adequacy constraints.</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 shadow-inner">
                    <h4 className="font-bold text-emerald-900 text-xl mb-3 border-b border-emerald-200 pb-2">Private Credit Funds</h4>
                    <ul className="space-y-2 text-emerald-800 list-disc ml-4">
                      <li>Funded by locked-up, long-term LP capital (5-10 year horizons).</li>
                      <li>Structurally immune to traditional depository bank runs.</li>
                      <li>Non-depository, largely bypassing stringent systemic bank regulations.</li>
                    </ul>
                  </div>
                </div>
              </TutorialCard>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-bold">1</div>
                    The Capital Call Model
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Unlike mutual funds where all money is invested on day one, institutional private credit relies on <strong>Committed Capital</strong>.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-4">
                    <strong className="text-emerald-800 block mb-1">"Dry Powder"</strong>
                    <p className="text-emerald-700 text-xs leading-relaxed">
                      Investors pledge a certain amount, which sits as uncalled "Dry Powder." The General Partner (GP) only "calls" the capital from LPs when a specific loan is successfully negotiated and ready to be funded.
                    </p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    This structure artificially boosts the Internal Rate of Return (IRR), because the "clock" on the investment doesn't start ticking until the exact moment the money is deployed into a yielding corporate loan.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-bold">2</div>
                    Targeting the Capital Stack
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Private credit funds actively choose their risk profile by lending at different tiers of a company's capital structure:
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-4 border-emerald-500 bg-slate-50 p-3 rounded-r-lg">
                      <strong className="text-slate-800 block text-sm">Senior Secured (First-Lien)</strong>
                      <p className="text-slate-600 text-xs">The safest tier. First to be repaid in bankruptcy, secured by the company's assets and cash flows. Yields ~8-11%.</p>
                    </div>
                    <div className="border-l-4 border-teal-500 bg-slate-50 p-3 rounded-r-lg">
                      <strong className="text-slate-800 block text-sm">Unitranche Debt <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[10px] ml-2 uppercase">Innovation</span></strong>
                      <p className="text-slate-600 text-xs">Blends senior and subordinated debt into a single massive loan with one blended interest rate. Highly popular for speeding up M&A deals.</p>
                    </div>
                    <div className="border-l-4 border-amber-500 bg-slate-50 p-3 rounded-r-lg">
                      <strong className="text-slate-800 block text-sm">Mezzanine / Subordinated</strong>
                      <p className="text-slate-600 text-xs">Unsecured, higher risk. Sits below senior debt but above equity. Often includes equity warrants. Yields ~12-18%.</p>
                    </div>
                  </div>
                </div>
              </div>

              <TutorialCard accentColor="bg-emerald-600">
                <h4 className="font-bold text-slate-800 text-2xl mb-4">The Illiquidity Premium & Covenant-Lite Era</h4>
                <p className="text-slate-600 mb-6">
                  Private lenders charge an "illiquidity premium" (generally 200-300 basis points higher than public broadly syndicated loans). In return, borrowers accept this higher cost of capital because private credit offers unparalleled strategic advantages:
                </p>

                <ul className="grid md:grid-cols-3 gap-4 mb-8">
                  <li className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <strong className="text-slate-800 block mb-2">Certainty of Execution</strong>
                    <span className="text-sm text-slate-600">Eliminates "flex risk". The price agreed upon in a private boardroom is final, unlike syndicated loans which fluctuate with public market appetite.</span>
                  </li>
                  <li className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <strong className="text-slate-800 block mb-2">Bespoke Customization</strong>
                    <span className="text-sm text-slate-600">Complex, highly customized payment structures (like delayed draw term loans) that traditional banks cannot operationalize.</span>
                  </li>
                  <li className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <strong className="text-slate-800 block mb-2">Speed & Absolute Privacy</strong>
                    <span className="text-sm text-slate-600">Bypasses public rating agencies (S&P, Moody's) and arduous roadshows, keeping corporate financial data entirely hidden from competitors.</span>
                  </li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
                  <h5 className="font-bold text-amber-900 mb-2">The Rise of "Cov-Lite"</h5>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Historically, direct loans required strict financial maintenance covenants (e.g., forcing borrowers to maintain specific debt-to-EBITDA ratios every quarter). Today, fierce competition among private credit funds to win deals has led to the dominance of <strong>Covenant-Lite (Cov-Lite)</strong> loans. These strip away early-warning tripwires, meaning a lender cannot intervene until the borrower actually misses an interest payment—by which point, the company may already be in terminal distress.
                  </p>
                </div>
              </TutorialCard>
            </div>
          </section>

          {/* 3. The Oligopoly */}
          <section>
            <SectionHeading 
              icon={Users} 
              title="The Oligopoly of Capital" 
              subtitle="Major players and market consolidation"
              colorClass="bg-purple-100 text-purple-700"
            />
            <TutorialCard accentColor="bg-purple-500">
              <p className="mb-6">
                Private credit is a "winner-takes-all" dynamic. The top 20 global managers hold over one-third of the market's deployable capital ($138.14 billion out of $385.28 billion dry powder).
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-100 text-slate-800 uppercase text-xs font-bold">
                    <tr>
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Firm</th>
                      <th className="px-6 py-4">Capital Raised ($M)</th>
                      <th className="px-6 py-4">Core Origin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">1</td>
                      <td className="px-6 py-4 font-bold text-slate-900">Ares Management</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">$116,277</td>
                      <td className="px-6 py-4">Alt Assets / Direct Credit</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">2</td>
                      <td className="px-6 py-4 font-bold text-slate-900">HPS Investment Partners</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">$100,912</td>
                      <td className="px-6 py-4">Dedicated Private Credit</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">3</td>
                      <td className="px-6 py-4 font-bold text-slate-900">Blackstone Inc.</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">$98,384</td>
                      <td className="px-6 py-4">Private Equity / Real Estate</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">4</td>
                      <td className="px-6 py-4 font-bold text-slate-900">Goldman Sachs AM</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">$87,755</td>
                      <td className="px-6 py-4">Investment Banking</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold">5</td>
                      <td className="px-6 py-4 font-bold text-slate-900">AXA IM Alts</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">$56,910</td>
                      <td className="px-6 py-4">Insurance / Asset Mgt.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TutorialCard>
          </section>

          {/* 4. Wall Street Realignment */}
          <section>
            <SectionHeading 
              icon={Network} 
              title="Wall Street's Strategic Realignment" 
              subtitle="Symbiosis, Syndication, and Synthetic Risk"
              colorClass="bg-indigo-100 text-indigo-700"
            />
            <div className="space-y-8">
              <TutorialCard accentColor="bg-indigo-500">
                <p className="text-xl text-slate-700 mb-4 font-medium">
                  Traditional banks haven't been entirely defeated by the rise of shadow banking; instead, they have pivoted to deep, symbiotic integration.
                </p>
                <p className="text-slate-600 mb-6">
                  Recognizing private credit as a multi-trillion-dollar juggernaut, Wall Street's biggest institutions have stopped fighting the trend. They are now utilizing private credit funds as a massive source of fee generation, a dumping ground for systemic risk, and a critical tool to navigate strict capital regulations.
                </p>
              </TutorialCard>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-indigo-500 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Financing the Shadow Banks</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    While banks are hesitant to lend directly to highly leveraged middle-market companies, they eagerly lend to the private credit funds themselves. This creates <strong>leverage-on-leverage</strong> within the financial system.
                  </p>
                  <div className="space-y-4 mt-auto">
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <strong className="text-indigo-900 block mb-1">Subscription Lines</strong>
                      <p className="text-indigo-800 text-xs">Short-term bridging loans secured by the unfunded capital commitments of a fund's institutional LPs. Extremely low risk for the bank.</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                      <strong className="text-indigo-900 block mb-1">NAV (Net Asset Value) Loans</strong>
                      <p className="text-indigo-800 text-xs">Loans secured by the fund's underlying portfolio of debt. Funds increasingly use NAV loans to artificially boost distributions to LPs or to inject emergency capital into distressed portfolio companies.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-indigo-500 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Origination Joint Ventures</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    The rebirth of the <em>"Originate-to-Distribute"</em> model. Banks possess vast, global investment banking networks to source corporate deals, but they lack the unregulated balance sheets to hold the debt.
                  </p>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    They are now forming massive Joint Ventures (JVs) with private credit mega-funds. The bank finds the borrower, structures the deal, and collects a hefty origination fee. The private credit fund then provides the actual capital and holds the loan to maturity.
                  </p>
                  <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <strong className="text-slate-800 block text-sm mb-2">High-Profile Partnerships:</strong>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc ml-4">
                      <li><strong>Citigroup & Apollo:</strong> $25 Billion direct lending JV.</li>
                      <li><strong>Wells Fargo & Centerbridge:</strong> $5 Billion middle-market JV.</li>
                      <li><strong>Société Générale & Brookfield:</strong> €10 Billion global debt fund.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-8 rounded-2xl shadow-xl border border-indigo-800 md:col-span-2 text-white relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10">
                    <Network size={200} />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-indigo-500/30 text-indigo-200 text-xs font-bold rounded-full mb-3 border border-indigo-400/30 uppercase tracking-wider">
                      The Capital Relief Engine
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">3. Synthetic Risk Transfers (SRTs)</h3>
                    <p className="text-indigo-100 mb-6 leading-relaxed">
                      To survive the impending <strong>Basel III Endgame</strong> regulations—which demand banks hold significantly more capital against the loans they issue—banks are heavily utilizing SRTs (also known as Credit Risk Transfers).
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-black/20 p-5 rounded-xl backdrop-blur-sm border border-white/10">
                        <strong className="text-indigo-200 block mb-2 text-lg">The Mechanism</strong>
                        <p className="text-indigo-50 text-sm leading-relaxed">
                          A bank issues a portfolio of traditional corporate loans. Instead of selling the loans, it buys a credit default derivative on the "first-loss tranche" (the riskiest 5-15% of the portfolio) from a private credit fund. If a borrower defaults, the private fund absorbs the hit, not the bank.
                        </p>
                      </div>
                      <div className="bg-black/20 p-5 rounded-xl backdrop-blur-sm border border-white/10">
                        <strong className="text-indigo-200 block mb-2 text-lg">The Systemic Result</strong>
                        <p className="text-indigo-50 text-sm leading-relaxed mb-3">
                          <strong>For the Bank:</strong> Massive regulatory capital relief. By shedding the risk, their Risk-Weighted Assets (RWA) plummet, freeing up billions to issue new loans or return to shareholders.
                        </p>
                        <p className="text-indigo-50 text-sm leading-relaxed">
                          <strong>For the System:</strong> Traditional banks appear incredibly safe on paper, but the true underlying corporate credit risk has simply been parceled out and hidden deep within the opaque, highly interconnected shadow banking sector.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Retailization */}
          <section>
            <SectionHeading 
              icon={TrendingUp} 
              title="The Retailization of Illiquidity" 
              subtitle="Selling private credit to common investors"
              colorClass="bg-amber-100 text-amber-700"
            />
            <div className="space-y-8">
              <TutorialCard accentColor="bg-amber-500">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">The Pivot to the $80 Trillion Wealth Channel</h3>
                  <p className="text-slate-600 mb-4">
                    For a decade, private credit was exclusively the domain of institutional LPs (pensions, sovereign wealth funds, endowments). However, as institutional allocations hit their limits ("denominator effect" saturation), mega-managers like Blackstone, Apollo, and Ares needed a new engine for infinite AUM growth.
                  </p>
                  <p className="text-slate-600">
                    They found it in the global retail wealth market. Packaged under the narrative of the "democratization of alternative investments," Wall Street is now aggressively pushing complex, illiquid debt into the portfolios of High-Net-Worth (HNW) individuals, wirehouse platforms, and Registered Investment Advisors (RIAs).
                  </p>
                </div>

                <DefinitionBox 
                  color="amber"
                  term="Business Development Company (BDC)" 
                  definition="A specialized closed-end investment company created by Congress in 1980 to spur investment in US businesses. They act as pass-through entities, meaning they must distribute at least 90% of taxable income as dividends to avoid corporate-level taxation, resulting in highly attractive yield distributions for retail investors." 
                />

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition bg-white">
                    <h4 className="font-bold text-slate-800 mb-2 text-lg">Public BDCs</h4>
                    <p className="text-sm text-slate-600">
                      Trade daily on stock exchanges. While fully liquid, they are highly volatile and frequently trade at steep discounts to their actual Net Asset Value (NAV) during times of market panic.
                    </p>
                  </div>
                  <div className="border-2 border-amber-300 rounded-xl p-5 hover:shadow-md transition bg-amber-50/50 relative">
                    <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">Dominant Vehicle</div>
                    <h4 className="font-bold text-slate-800 mb-2 text-lg">Non-Traded (Perpetual) BDCs</h4>
                    <p className="text-sm text-slate-600">
                      The primary growth engine today (e.g., Blackstone's BCRED). They allow monthly subscriptions at a smoothed NAV, intentionally masking true market volatility, while allowing managers to apply higher leverage.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition bg-white">
                    <h4 className="font-bold text-slate-800 mb-2 text-lg">Interval Funds</h4>
                    <p className="text-sm text-slate-600">
                      Offer mandatory periodic liquidity at NAV (usually 5-25% per quarter). Stricter regulatory leverage limits (0.5:1 max) mean lower volatility but limited yield amplification compared to BDCs.
                    </p>
                  </div>
                </div>
              </TutorialCard>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">The Retail Fee Layer Cake</h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    The "democratization" of private credit comes at a steep price. Retail investors absorb a heavy fee burden that drastically drags down their net yield compared to institutional giants:
                  </p>

                  <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-slate-600">
                      <span className="font-black text-amber-500 text-lg">1</span>
                      <div>
                        <strong className="text-slate-800 block">Upfront Loads & Distribution Fees:</strong> 
                        Brokers often take upfront commissions (up to 2-5%) just for placing the retail investor into the fund, meaning capital is destroyed on day one.
                      </div>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600">
                      <span className="font-black text-amber-500 text-lg">2</span>
                      <div>
                        <strong className="text-slate-800 block">Management Fees (1.25% - 1.5%):</strong> 
                        Charged annually on <em>gross assets</em> (including the leverage the fund uses), not just the investor's equity.
                      </div>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600">
                      <span className="font-black text-amber-500 text-lg">3</span>
                      <div>
                        <strong className="text-slate-800 block">Incentive Fees (12.5% - 15%):</strong> 
                        The manager takes a massive cut of the net investment income once it clears a basic "hurdle rate" (typically around 5%).
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow-sm flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-red-800 flex items-center gap-2 mb-4">
                    <AlertCircle size={24}/> The Liquidity Illusion
                  </h4>
                  <p className="text-red-700 text-sm md:text-base leading-relaxed mb-4">
                    Retail BDCs market themselves with the illusion of liquidity, promising high yields, downside protection, and the ability to withdraw money quarterly. However, this creates a severe structural mismatch: <strong>they are offering quarterly retail liquidity against 5-to-7 year highly illiquid corporate loans.</strong>
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-red-100 text-red-800 text-sm font-medium">
                    <strong>The Redemption Gate Trap:</strong> Non-traded BDCs implement strict redemption caps (typically maximum 5% of aggregate NAV per quarter). If a recession hits and retail panic ensues, these gates will slam shut immediately. Investors who need cash the most will find their capital legally trapped in a depreciating, illiquid vehicle for years.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Emerging Fissures */}
          <section>
            <SectionHeading 
              icon={ShieldAlert} 
              title="Emerging Fissures" 
              subtitle="Why the asset class is under stress"
              colorClass="bg-rose-100 text-rose-700"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <TutorialCard title="The Payment-in-Kind (PIK) Escalation" accentColor="bg-rose-500">
                <p>PIK allows borrowers to defer cash interest payments by adding the owed interest to the principal loan balance.</p>
                <p>In a high-rate environment, PIK accelerates total leverage, compounding debt until it eclipses the firm's enterprise value. PIK income rose from 4.2% of revenue in 2018 to nearly 8.8% by late 2025.</p>
                <div className="bg-rose-50 p-4 rounded-lg mt-4 border border-rose-200">
                  <strong className="text-rose-800 block mb-1">Shadow Defaults:</strong>
                  <span className="text-rose-700 text-sm">Managers use "mid-life" PIK amendments to save distressed borrowers from formal default, artificially suppressing headline default rates.</span>
                </div>
              </TutorialCard>

              <TutorialCard title="Valuation Opacity" accentColor="bg-rose-500">
                <p>Unlike public bonds, private credit assets are untraded. Valuations rely heavily on Level 3 "mark-to-model" frameworks based on highly subjective assumptions.</p>
                <p>This creates severe agency issues: managers have a profound incentive to inflate valuations to pad fees, support borrowing covenants, and present a low-volatility illusion to LPs.</p>
                <div className="bg-rose-50 p-4 rounded-lg mt-4 border border-rose-200">
                  <strong className="text-rose-800 block mb-1">The Danger:</strong>
                  <span className="text-rose-700 text-sm">During acute stress, the violent divergence between smoothed modeled valuations and actual recovery values in liquidation can be catastrophic.</span>
                </div>
              </TutorialCard>
            </div>
          </section>

          {/* 7 & 8. Refinancing Cliff & Restructuring */}
          <section>
            <SectionHeading 
              icon={Gavel} 
              title="The Restructuring Crucible" 
              subtitle="The 2026 cliff and 'Sponsor-on-Sponsor Violence'"
              colorClass="bg-orange-100 text-orange-700"
            />
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Activity size={120} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">The 2026-2027 Refinancing Cliff</h3>

                <p className="text-lg text-slate-600 relative z-10 mb-6">
                  Roughly 50% of outstanding loans held in US private credit funds are due for reimbursement or refinancing within a concentrated three-year window. With ~40% of borrowers generating negative free cash flow, traditional cash-flow lending is perishing, causing a flight to <strong>Asset-Based Finance (ABF)</strong>.
                </p>
                <div className="bg-slate-900 text-white rounded-xl p-6 relative z-10 shadow-lg">
                  <h4 className="text-xl font-bold text-orange-400 mb-3 border-b border-slate-700 pb-2">Liability Management Exercises (LMEs)</h4>
                  <p className="text-slate-300 mb-4">
                    Driven by "covenant-lite" loans, PE sponsors execute aggressive out-of-court restructurings to strip value from collateral pools and preserve equity at the lenders' expense.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">&rarr;</span>
                      <div>
                        <strong className="text-white">Drop-Downs (J.Crew Maneuver):</strong> Transferring crown-jewel assets (like IP) to unrestricted subsidiaries to raise new super-priority debt.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1">&rarr;</span>
                      <div>
                        <strong className="text-white">Uptiers (Serta Maneuver):</strong> Conspiring with a slim majority of lenders to subordinate minority lenders within the same class of debt.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-8 border-orange-500 p-8 rounded-r-2xl shadow-sm">
                <h4 className="text-2xl font-black text-orange-900 mb-2 uppercase tracking-wide text-sm">Case Study</h4>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The Pluralsight Paradigm</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Sponsored by Vista Equity Partners, Pluralsight faced distress. Vista attempted a classic drop-down LME with a $50M band-aid. Instead of accepting minor losses, private credit lenders (Blue Owl & Ares) retaliated with overwhelming force.
                </p>
                <p className="text-slate-700 leading-relaxed font-medium">
                  They executed a hostile takeover, canceled $1.3 billion of debt, took full equity control, and entirely wiped out Vista's $4 billion equity investment. Private credit funds have morphed into apex predators in restructuring.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Systemic Risk */}
          <section>
            <SectionHeading 
              icon={Activity} 
              title="Systemic Risk & The Contagion Web" 
              subtitle="How a private market shock transmits to the global economy"
              colorClass="bg-red-100 text-red-700"
            />
            <div className="space-y-8">
              <TutorialCard accentColor="bg-red-600">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">The 2008 Comparison</h3>
                    <p className="text-slate-600 mb-4">
                      While sharing similarities (opaque shadow banking, covenant-lite loans), private credit fundamentally differs in <strong>liabilities</strong>.
                    </p>
                    <p className="text-slate-600 mb-4">
                      The 2008 crisis was a bank run driven by hyper-leverage (30:1) and overnight funding mismatch. Private credit generally uses lower fund-level leverage (1.5:1) and locked-up institutional capital, rendering it largely immune to sudden liquidity runs. Regulators currently assess that private credit <em>does not</em> pose an immediate, direct systemic risk to depository banks in the 2008 sense.
                    </p>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <strong className="text-red-800 block mb-1">The Macro-Economic Transmission:</strong>
                      <p className="text-red-700 text-sm">
                        However, because private credit now funds a massive portion of the middle-market real economy (employing tens of millions of people), a sudden stop in private lending would directly trigger widespread corporate bankruptcies and massive job losses, instantly turning a financial credit crunch into a severe, prolonged economic recession.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                        <Network size={18} className="text-indigo-600"/> The Hidden Bank Linkage
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Banks are still exposed through the backdoor. They provide massive subscription lines and Net Asset Value (NAV) loans to private credit funds. If underlying private loans default en masse, fund NAVs plummet, potentially triggering margin calls from banks and forcing chaotic liquidations.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                        <ShieldAlert size={18} className="text-rose-600"/> Insurance Capital Arbitrage
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Private equity mega-firms increasingly own life insurers (e.g., Apollo's ownership of Athene). They funnel policyholder premiums into their own illiquid private credit funds to boost yield. This deep correlation means a severe credit shock could rapidly deplete insurance reserves, threatening policyholder payouts.
                      </p>
                    </div>
                  </div>
                </div>
              </TutorialCard>

              <div className="bg-red-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Activity size={100} />
                </div>
                <h3 className="text-2xl font-bold text-red-100 mb-6 relative z-10 border-b border-red-800 pb-4">
                  The Denominator Effect & Fire Sale Contagion
                </h3>
                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                  <div>
                    <div className="text-red-300 font-bold mb-2">Step 1: Valuation Mismatch</div>
                    <p className="text-red-100 text-sm leading-relaxed">
                      During a market crash, public stocks and bonds fall instantly. Private credit funds, using opaque "mark-to-model" accounting, keep their asset values artificially high, creating a temporary illusion of stability.
                    </p>
                  </div>
                  <div>
                    <div className="text-red-300 font-bold mb-2">Step 2: The Denominator Effect</div>
                    <p className="text-red-100 text-sm leading-relaxed">
                      Because the public portion of institutional portfolios (pensions/endowments) shrinks, their overall portfolio denominator drops. Suddenly, they breach their strict concentration limits, becoming accidentally over-allocated to illiquid private credit.
                    </p>
                  </div>
                  <div>
                    <div className="text-red-300 font-bold mb-2">Step 3: The Fire Sale</div>
                    <p className="text-red-100 text-sm leading-relaxed">
                      Unable to sell the illiquid private credit assets to rebalance, pensions and insurers are forced to violently dump their <em>highly liquid</em> public assets (Treasuries, blue-chip equities). This "fire sale" crashes broader public markets, violently transmitting the private shadow-banking shock into the core global financial system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500"></div>
            <h2 className="text-3xl font-black mb-6">Conclusion</h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Private credit has institutionalized a multi-trillion-dollar shadow banking system. While insulated from 2008-style bank runs, it is buckling under higher-for-longer capital costs. PIK escalations and valuation opacity mask deep distress. Ultimately, its profound interconnectedness with global insurers and pensions guarantees that in a severe macro contraction, private credit will act as a potent accelerant for broader systemic contagion.
            </p>
          </section>

          {/* Call to Action */}
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
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 mt-12">
          <p className="text-sm">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          <p className="text-xs mt-2">
            Based on the research report: "The Architecture of Private Credit: Structural Mechanics, Emerging Vulnerabilities, and Systemic Implications"
          </p>
        </footer>
      </div>
    </>
  );
}
