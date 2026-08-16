import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — stable and less volatile day-to-day than short-dated options.' },
    { label: 'Vega', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'High negative vega — vega dominates over theta in LEAPS; highly sensitive to multi-year volatility shifts.' },
    { label: 'Theta', tone: 'text-[#A8672E] dark:text-[#D08F52]', text: 'Mildly positive — time decay is slow initially, accelerating only in the final 6–9 months.' },
    { label: 'Strategic Role', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Institutional cash-flow generation and patient, value-based stock acquisition.' },
];

export function LeapsPutOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    <strong>LEAPS put selling</strong> involves writing long-dated put options (<Jargon term="LEAPS" definition="Long-Term Equity Anticipation Securities — options contracts with expiration horizons extending 12 to 39 months into the future." />)
                    on highest-conviction, wide-moat businesses or major index benchmarks.
                </p>
                <p>
                    Made famous by institutional investors like <strong>Warren Buffett (Berkshire Hathaway)</strong>, this approach
                    treats put selling not as a weekly income race, but as a <strong>strategic capital allocation framework</strong>: you
                    collect massive upfront premiums, benefit from long-term volatility mean reversion, and secure contractual commitments
                    to acquire premier businesses at deep historical discounts.
                </p>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Greeks Profile: The Multi-Year Dynamic</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {GREEKS.map((g) => (
                        <div key={g.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3">
                            <p className={`font-mono text-xs font-bold mb-1 ${g.tone}`}>{g.label}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{g.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">LEAPS Put Selling vs. Short-Dated Put Selling</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="LEAPS Put Selling (1–3 Years)"
                        tone="pos"
                        items={[
                            "Primary driver: volatility mean-reversion and multi-year fundamental growth.",
                            "Management: hands-off, low maintenance; immune to short-term intraday noise.",
                            "Upfront cash: collects massive cash sums upfront to redeploy into yield assets.",
                            "Acquisition strike: placed at deep margin-of-safety discounts (-20% to -40%).",
                        ]}
                    />
                    <ComparisonCard
                        title="Short-Dated Puts (30–45 DTE)"
                        tone="neutral"
                        items={[
                            "Primary driver: rapid gamma/theta decay cycle.",
                            "Management: high-frequency rolling, rebalancing every month.",
                            "Upfront cash: small monthly cash increments.",
                            "Acquisition strike: typically placed close to spot price (-3% to -7%).",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function LeapsPutPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Underlyer Selection (The Buffett Standard)</h4>
                <ul>
                    <li><strong>Wide-Moat Franchises:</strong> durable competitive advantages, stellar balance sheets, predictable cash flows (e.g., BRK.B, AAPL, MSFT) or broad indices (SPX, SPY).</li>
                    <li><strong>Avoid Cyclical or High-Debt Names:</strong> companies with fragile 3-year survival odds are disqualified.</li>
                </ul>
                <h4>Strike Selection &amp; Margin of Safety</h4>
                <ul>
                    <li><strong>15–25 Delta (Deep OTM):</strong> choose strikes 20–35% below current market prices to establish a generational margin of safety.</li>
                    <li><strong>12–24 Months Duration:</strong> target expirations 1 to 2 years out (e.g. 365–730 DTE).</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Identify a premier wide-moat company trading at or below fair value during an elevated IV regime.</li>
                    <li>Select a LEAPS expiration cycle 12–24 months out.</li>
                    <li>Sell the 20-delta out-of-the-money put option and collect the upfront cash premium.</li>
                    <li>Deposit the cash collateral into interest-bearing Treasury bills or money markets to earn risk-free yield.</li>
                    <li>Place a GTC buyback order at 50% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking &amp; Assignment</h4>
                <ul>
                    <li><strong>Early Volatility Collapse Exit:</strong> if a market rally collapses implied volatility and the put reaches 50% profit within the first 6 months, close early to capture an annualized gain far ahead of schedule.</li>
                    <li><strong>Accept Assignment Willingly:</strong> if assigned at expiration after a multi-year bear market, celebrate buying a fortress balance sheet company at 30–40% below its historical highs.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Worked Example: 2-Year LEAPS Put Sale"
                formula="\text{Effective Cost Basis} = K_{\text{put}} - P_{\text{collected}}"
                legend={[
                    { label: 'K_{put}', value: 'Put strike price' },
                    { label: 'P_{collected}', value: 'Upfront cash premium collected per share' },
                ]}
                example={{
                    label: 'Fortress Stock ($150 Spot Price)',
                    rows: [
                        { label: 'Sell 2-Year $120 Put (20% OTM)', value: '$15.00 cash credit ($1,500/contract)' },
                        { label: 'Cash Collateral Earning 4.5% in T-Bills', value: '+$1,080 interest over 2 years' },
                        { label: 'Effective Entry Price if Assigned', value: '$105.00 ($120 strike - $15 premium)' },
                    ],
                    result: { label: 'Discount to Entry Price', value: 'Acquisition price is -30.0% below initial market spot' },
                    note: 'If never assigned, total return equals the $1,500 option premium + $1,080 T-bill interest = $2,580 on $12,000 collateral (+21.5% total return).',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Risks to Monitor</h4>
                <ul>
                    <li><strong>Multi-Year Fundamental Decay:</strong> business model disruption occurring over a 2-year horizon.</li>
                    <li><strong>Capital Lockup:</strong> committing cash collateral for multiple years limits tactical agility unless managed actively.</li>
                    <li><strong>Overleveraging on Margin:</strong> selling too many naked LEAPS puts and facing severe margin calls during market panics.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> LEAPS put selling requires committing capital over multi-year horizons.
                    Downside risk below the strike price is substantial. This information is for educational purposes only.
                </p>
            </div>
        </div>
    );
}
