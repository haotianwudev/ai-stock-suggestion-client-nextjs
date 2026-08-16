import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — benefits from flat or rising prices; delta increases as stock nears strike.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative while profitable — assignment risk accelerates if the underlying falls toward the strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — time decay is your main income driver, accelerating in the final 30-45 days.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — benefits when implied volatility contracts after opening the position.' },
];

export function PutWritingOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    <strong>Put writing</strong> is a premier income-generation strategy where you sell a put option, collect
                    premium upfront, and agree to purchase the underlying stock at the strike price if assigned. Think of it as
                    <strong> "getting paid to place a limit order"</strong> — instead of waiting with an unrewarded buy order at
                    $95 for a $100 stock, you sell a $95 put, collect immediate cash, and lower your effective purchase price.
                </p>
                <p>
                    Investors deploy put writing in two primary formats: <Jargon term="cash-secured puts (CSPs)" definition="Holding 100% of the cash required to purchase 100 shares at the strike price, completely eliminating margin call risk." /> for conservative income and retirement accounts, or <Jargon term="naked puts" definition="Selling puts on margin (typically requiring 20-30% collateral), which boosts return on capital but introduces leverage and assignment liquidity risk." /> for active trading.
                </p>
            </div>

            <FormulaPanel
                title="Put-Call Parity & Synthetic Equivalence"
                formula="C + PV(K) = P + S \implies PV(K) - P = S - C"
                legend={[
                    { label: 'PV(K) - P', value: 'Cash-Secured Put (Cash collateral − Put premium)' },
                    { label: 'S - C', value: 'Covered Call (Long stock − Call premium)' },
                    { label: 'Equivalence', value: 'Identical payoff shape and risk profile' },
                ]}
                example={{
                    label: 'Mechanics Comparison',
                    rows: [
                        { label: 'Cash-Secured Put', value: 'Hold $10,000 cash, sell $100 put for $3 → Max gain $300, Breakeven $97' },
                        { label: 'Covered Call', value: 'Buy stock at $100, sell $100 call for $3 → Max gain $300, Breakeven $97' },
                    ],
                    result: { label: 'Risk/Reward Profile', value: 'Synthetically Identical' },
                    note: 'By put-call parity, selling a cash-secured put and writing a covered call at the same strike and expiration produce the exact same P&L distribution.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Cash-Secured vs. Naked Put Writing</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Cash-Secured Put (Conservative)"
                        tone="neutral"
                        items={[
                            "Collateral: 100% cash reserved (Strike × 100).",
                            "Risk: defined by cash held; zero margin call risk.",
                            "Assignment: seamless execution — cash automatically buys the shares.",
                            "Best for: retirement accounts, long-term investors, and Wheel Strategy Phase 1.",
                        ]}
                    />
                    <ComparisonCard
                        title="Naked Put (Leveraged)"
                        tone="neutral"
                        items={[
                            "Collateral: margin requirement (typically 20-30% of notional).",
                            "Risk: amplified by leverage; stock crash can trigger margin calls.",
                            "Assignment: requires liquidating assets or depositing fresh cash.",
                            "Best for: experienced margin traders seeking high return on capital (ROC).",
                        ]}
                    />
                </ComparisonGrid>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Greeks Profile</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {GREEKS.map((g) => (
                        <div key={g.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3">
                            <p className={`font-mono text-xs font-bold mb-1 ${g.tone}`}>{g.label}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{g.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PutWritingPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>16 Delta (~1 standard deviation OTM):</strong> ~84% probability of expiring OTM; conservative income target (~0.5-1.0% monthly).</li>
                    <li><strong>20-30 Delta:</strong> ~70-80% probability of profit; balanced risk/reward yield target (~1.0-2.0% monthly).</li>
                    <li><strong>Technical Support:</strong> anchor strikes at major support levels or historical moving averages where you genuinely want to own the stock.</li>
                </ul>
                <h4>Entry Criteria</h4>
                <ul>
                    <li><strong>IV Rank &gt; 30%:</strong> ensure elevated implied volatility so premium compensates for downside risk.</li>
                    <li><strong>30-45 DTE:</strong> optimal theta decay acceleration zone without excessive short-dated gamma risk.</li>
                    <li><strong>Quality-first rule:</strong> only sell puts on high-quality companies you are happy to hold for years.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for quality underlyings with IV Rank &gt; 30% and strong fundamentals.</li>
                    <li>Select an expiration cycle 30-45 days out.</li>
                    <li>Choose a 16-30 delta strike below key support levels.</li>
                    <li>Sell the put option and collect the credit upfront.</li>
                    <li>Set a working GTC limit order to buy back at 50% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit &amp; Time Management</h4>
                <ul>
                    <li><strong>50% Profit Rule:</strong> buy back the short put once it reaches 50% of maximum profit to lock in gains and eliminate remaining tail risk.</li>
                    <li><strong>21 DTE Time Stop:</strong> close or roll the position around 21 DTE to avoid accelerating gamma risk near expiration.</li>
                </ul>
                <h4>Adjustment &amp; Assignment</h4>
                <ul>
                    <li><strong>Roll Down and Out:</strong> if the stock tests your strike, roll to a lower strike and a later expiration month for a net credit. Never roll for a debit.</li>
                    <li><strong>Accept Assignment:</strong> if assigned, take delivery of the stock at an effective discount ($K - P$) and immediately begin writing covered calls (The Wheel Strategy).</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Effective Purchase Price & Yield"
                formula="\text{Effective Cost Basis} = K - P_{\text{put}}"
                legend={[
                    { label: 'K', value: 'Put strike price' },
                    { label: 'P_{put}', value: 'Put premium collected' },
                    { label: 'Breakeven', value: 'Price below which the position incurs net loss' },
                ]}
                example={{
                    label: 'Worked Example',
                    rows: [
                        { label: 'Stock Current Price', value: '$105.00' },
                        { label: 'Short Put Strike (K)', value: '$100.00' },
                        { label: 'Premium Collected (P)', value: '$2.50' },
                    ],
                    result: { label: 'Effective Purchase Price', value: '$97.50' },
                    note: 'If assigned at $100, your real cost basis is $97.50 (a 7.1% discount to current market price). If unassigned, you retain the full $250 credit ($2.50/share).',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li><strong>Cash-Secured:</strong> allocate 5-10% of portfolio max per position; maintain 20-30% cash buffer.</li>
                    <li><strong>Naked Puts:</strong> size so maximum margin usage stays under 50% of total portfolio equity during normal conditions.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Chasing high IV on low-quality stocks:</strong> selling puts on meme stocks or biotech names heading to zero.</li>
                    <li><strong>Holding into expiration week:</strong> holding through 0-7 DTE exposing the trade to massive gamma risk for pennies of remaining profit.</li>
                    <li><strong>Panic closing on market dips:</strong> closing at the bottom instead of rolling for credit or taking delivery of a quality business.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Put writing involves substantial risk. While premium income is received upfront,
                    downside risk is substantial and similar to outright stock ownership below the strike price. Naked put writing carries
                    leverage and margin call risk. This information is for educational purposes only and does not constitute investment advice.
                </p>
            </div>
        </div>
    );
}