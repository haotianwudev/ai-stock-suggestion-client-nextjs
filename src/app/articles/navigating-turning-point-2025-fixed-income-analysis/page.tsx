'use client';

import { TrendingDown, TrendingUp, Shield, Lock, Briefcase, Landmark, PieChart, Banknote, Building } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- Reusable Components ---
const StatCard = ({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext?: string }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <div className="text-[#A8672E] dark:text-[#D08F52]">{icon}</div>
    </div>
    <p className="text-3xl lg:text-4xl font-mono tabular-nums font-bold text-gray-900 dark:text-white">{value}</p>
    {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-3">{children}</h2>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">{children}</p>
);

const OpportunityCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-full">
    <div className="w-12 h-12 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const sectorTone = {
  favorable: "text-[#1D8A70] dark:text-[#3CBF9C]",
  caution: "text-[#BC4128] dark:text-[#E2694A]",
} as const;

const SectorCard = ({ icon, title, recommendation, rationale }: { icon: React.ReactNode; title: string; recommendation: { text: string; tone: keyof typeof sectorTone }; rationale: string }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 h-full shadow-sm">
    <div className="flex items-start gap-4">
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-lg text-gray-900 dark:text-white">{title}</h3>
        <p className={`text-sm font-semibold ${sectorTone[recommendation.tone]}`}>{recommendation.text}</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{rationale}</p>
  </div>
);

const BullSteepeningChart = () => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl shadow-sm">
    <div className="text-gray-900 dark:text-white mb-4">
      <h4 className="font-serif text-base">Yield Curve: Bull Steepening</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">Short-term rates are expected to fall faster than long-term rates.</p>
    </div>
    <div className="relative h-40">
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
        <line x1="10" y1="10" x2="10" y2="90" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5" />
        <line x1="10" y1="90" x2="290" y2="90" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="0.5" />
        <text x="0" y="15" className="fill-gray-500 dark:fill-gray-400" fontSize="6">High</text>
        <text x="0" y="90" className="fill-gray-500 dark:fill-gray-400" fontSize="6">Low</text>
        <text x="15" y="98" className="fill-gray-500 dark:fill-gray-400" fontSize="6">2Y</text>
        <text x="275" y="98" className="fill-gray-500 dark:fill-gray-400" fontSize="6">30Y</text>

        {/* Current Flat/Inverted Curve (Dashed) */}
        <path d="M 20 30 Q 150 40 280 50" className="stroke-[#A8672E] dark:stroke-[#D08F52]" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />

        {/* Expected Bull Steepening Curve (Solid) */}
        <path d="M 20 80 Q 150 65 280 55" className="stroke-[#1D8A70] dark:stroke-[#3CBF9C]" strokeWidth="2" fill="none" />
      </svg>
    </div>
    <div className="flex justify-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-4">
      <div className="flex items-center">
        <span className="w-3 h-0.5 border-t border-dashed border-[#A8672E] dark:border-[#D08F52] mr-2"></span>
        <span>Current Curve</span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-0.5 bg-[#1D8A70] dark:bg-[#3CBF9C] mr-2"></span>
        <span>Expected Curve</span>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function FixedIncomeReportPage() {
  return (
    <ArticleFrame
      slug="navigating-turning-point-2025-fixed-income-analysis"
      additionalDisclaimer="Fixed income investments carry interest rate risk, credit risk, and inflation risk. Bond prices move inversely to interest rates. High-yield bonds carry additional credit and default risk. Municipal bonds may be subject to state and local taxes and the alternative minimum tax."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Analysis as of September 16, 2025</p>

        {/* --- Key Takeaways --- */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>2025 fixed income returns are dominated by coupon income rather than price appreciation, cushioning against rate volatility.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>A &ldquo;stagflation-lite&rdquo; backdrop&mdash;slowing growth, sticky inflation&mdash;sets up a Fed pivot to rate cuts in H2 2025.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>The market expects a <Jargon term="bull-steepening" definition="A shift in the yield curve where short-term rates fall faster than long-term rates, typically as the Fed cuts amid still-elevated long-term inflation/issuance premia." /> yield curve as the Fed eases while long-end term premium stays elevated.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
                <span>Quality and tax-advantaged assets stand out: investment-grade corporates and municipal bonds are favored over high-yield credit.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- Market Performance Section --- */}
        <section className="mb-12">
          <SectionTitle>A Market Defined by Income</SectionTitle>
          <SectionSubtitle>
            In 2025, fixed income total returns are dominated by the renewed power of coupon income, providing a substantial cushion against interest rate volatility and a compelling alternative to cash.
          </SectionSubtitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="H1 2025 Broad Index Returns"
              value="4-7.25%"
              icon={<PieChart size={20} />}
              subtext="Driven primarily by coupon payments."
            />
            <StatCard
              label="High-Yield Bond Yields"
              value="~7.5%"
              icon={<TrendingUp size={20} />}
              subtext="Offering historically high income streams."
            />
            <StatCard
              label="Projected 10-Yr Treasury"
              value="3.75-4.25%"
              icon={<TrendingDown size={20} />}
              subtext="Ending 2025 lower as Fed cuts take hold."
            />
            <StatCard
              label="Primary Return Driver"
              value="Income"
              icon={<Banknote size={20} />}
              subtext="A paradigm shift from price appreciation."
            />
          </div>
        </section>

        {/* --- Macroeconomic Section --- */}
        <section className="mb-12">
          <SectionTitle>The Macroeconomic Crucible</SectionTitle>
          <SectionSubtitle>
            A &ldquo;stagflation-lite&rdquo; environment&mdash;characterized by slowing growth that narrowly avoids recession and stickier-than-expected inflation&mdash;sets the stage for a Federal Reserve pivot.
          </SectionSubtitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="font-serif text-sm text-gray-900 dark:text-white">Growth Deceleration</h4>
              <p className="text-2xl font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52] my-2">1.6%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Projected 2025 U.S. GDP growth, down from ~2.5% in 2024.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="font-serif text-sm text-gray-900 dark:text-white">Stubborn Inflation</h4>
              <p className="text-2xl font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52] my-2">2.9%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Headline CPI (Aug 2025), fueled by base effects and resilient services inflation.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="font-serif text-sm text-gray-900 dark:text-white">Fed&apos;s Pivot</h4>
              <p className="text-2xl font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52] my-2">Rate Cuts</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Expected in H2 2025 to support a softening labor market.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="font-serif text-sm text-gray-900 dark:text-white">Labor Market</h4>
              <p className="text-2xl font-mono tabular-nums font-bold text-[#A8672E] dark:text-[#D08F52] my-2">Cooling</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Slowing payrolls shift the Fed&apos;s focus toward employment.</p>
            </div>
          </div>
        </section>

        {/* --- Yield Curve & Stock/Bond Section --- */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">The Yield Curve&apos;s Message</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 marker:text-[#A8672E] dark:marker:text-[#D08F52]">
                <li>Market pricing in near-term Fed cuts depresses the short end of the curve.</li>
                <li>Longer-dated bonds still demand a higher <Jargon term="term premium" definition="The extra yield investors require to hold longer-maturity bonds instead of rolling over a series of shorter-term ones, compensating for rate/inflation uncertainty." /> due to inflation risk and heavy Treasury issuance funding fiscal deficits.</li>
              </ul>
              <BullSteepeningChart />
            </div>
            <div>
              <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-3">A Return to Ballast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                After years of positive correlation driven by inflation shocks, the stock-bond relationship has normalized. As growth concerns overtake inflation as the primary market driver, capital is expected to rotate from equities to government bonds during downturns, restoring their classic diversifying role.
              </p>
              <ComparisonGrid>
                <ComparisonCard title="Equities" tone="neg">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="text-[#BC4128] dark:text-[#E2694A] flex-none" size={28} />
                    <span>Face growth headwinds as decelerating GDP pressures earnings.</span>
                  </div>
                </ComparisonCard>
                <ComparisonCard title="Bonds" tone="pos">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C] flex-none" size={28} />
                    <span>Benefit from a safety bid, restoring their classic diversifying role.</span>
                  </div>
                </ComparisonCard>
              </ComparisonGrid>
            </div>
          </div>
        </section>

        {/* --- Sector Deep Dive --- */}
        <section className="mb-12">
          <SectionTitle>Sector Deep Dive: Where to Position</SectionTitle>
          <SectionSubtitle>
            A granular look at the risk-reward profile across key fixed-income sectors reveals a clear preference for quality and tax-advantaged assets.
          </SectionSubtitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SectorCard
              icon={<Building size={20} />}
              title="Investment Grade Corporates"
              recommendation={{ text: "Favorable", tone: "favorable" }}
              rationale="Corporate balance sheets remain healthy, but spreads are tight, offering little compensation for risk. Focus on non-cyclical sectors and issuers with strong pricing power."
            />
            <SectorCard
              icon={<TrendingUp size={20} />}
              title="High-Yield Corporates"
              recommendation={{ text: "Cautious / Underweight", tone: "caution" }}
              rationale="While all-in yields are attractive, they don't fully compensate for the rising risk of defaults in a decelerating economy. A highly selective approach is critical."
            />
            <SectorCard
              icon={<Landmark size={20} />}
              title="Municipal Bonds"
              recommendation={{ text: "Highly Favorable", tone: "favorable" }}
              rationale="A standout opportunity. Tax-equivalent yields are compelling, credit fundamentals are strong, and the sector is insulated from many federal policy headwinds."
            />
          </div>
        </section>

        {/* --- Strategic Opportunities Section --- */}
        <section id="opportunity" className="mb-4">
          <SectionTitle>Core Strategies for 2025</SectionTitle>
          <SectionSubtitle>
            The current landscape presents a clear, time-sensitive imperative: lock in historically high yields in quality assets before the anticipated easing cycle commences.
          </SectionSubtitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <OpportunityCard title="Lock In High Yields" icon={<Lock size={22} />}>
              The primary imperative. Extend duration out of cash to capture yields of 5%+ in high-quality assets. This window will narrow as the market prices in future rate cuts.
            </OpportunityCard>
            <OpportunityCard title="Prioritize Quality" icon={<Shield size={22} />}>
              Focus on investment-grade bonds. Spreads on lower-quality credit do not adequately compensate for rising default risk. Focus on firms with strong cash flows and low leverage.
            </OpportunityCard>
            <OpportunityCard title="Embrace Intermediate Duration" icon={<Briefcase size={22} />}>
              Position in the &ldquo;belly&rdquo; of the curve (2-10 year maturities) to benefit most from Fed cuts while mitigating risk from long-term fiscal uncertainty impacting the 20-30 year range.
            </OpportunityCard>
            <OpportunityCard title="Leverage Municipal Bonds" icon={<Landmark size={22} />}>
              For taxable investors, the tax-equivalent yields on high-quality munis are among the most attractive in years, offering a compelling defensive and income-generating position.
            </OpportunityCard>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
