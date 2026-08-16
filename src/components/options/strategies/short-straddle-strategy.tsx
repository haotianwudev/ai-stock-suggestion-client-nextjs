import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — shifts rapidly as the underlying moves away from the strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Maximum positive theta — captures the single highest daily extrinsic time decay rate of any options structure.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Highest negative vega — generates explosive profits when elevated implied volatility collapses.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'High negative gamma — assignment and directional risk accelerate rapidly near expiration.' },
];

export function ShortStraddleOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>short straddle</strong> is a market-neutral options strategy constructed by simultaneously selling
                    an at-the-money call and an at-the-money put at the exact same strike price and expiration date.
                </p>
                <p>
                    Because at-the-money options contain the maximum possible extrinsic value, selling a straddle harvests the
                    highest initial premium and highest daily theta decay rate in options trading. It is the purest quantitative
                    expression of <Jargon term="short volatility arbitrage" definition="Selling options when implied volatility is significantly higher than expected realized movement, profiting from time decay and volatility contraction." />.
                    In exchange, the position carries undefined risk beyond the upper and lower breakeven boundaries.
                </p>
            </div>

            <FormulaPanel
                title="Short Straddle Payoff & Breakeven Range"
                formula="\text{Breakevens} = [K - \text{Credit}_{\text{total}}, \quad K + \text{Credit}_{\text{total}}]"
                legend={[
                    { label: 'K', value: 'At-the-money strike price (shared by both call and put)' },
                    { label: 'Credit_{total}', value: 'Combined premium collected (Call Premium + Put Premium)' },
                    { label: 'Max Profit', value: 'Exact Credit_{total} (retained if price settles precisely at strike K)' },
                    { label: 'Max Loss', value: 'Theoretically unlimited in both directions' },
                ]}
                example={{
                    label: 'SPX $5,800 ATM Short Straddle',
                    rows: [
                        { label: 'Sell $5,800 Call (ATM)', value: '$65.00 credit' },
                        { label: 'Sell $5,800 Put (ATM)', value: '$65.00 credit' },
                        { label: 'Total Premium Collected', value: '$130.00 ($13,000 per contract)' },
                    ],
                    result: { label: 'Profit Zone', value: '$5,670.00 to $5,930.00 (260 point range)' },
                    note: 'Maximum profit of $13,000 occurs right at $5,800. The position is profitable as long as SPX stays within the 260-point breakeven window.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Short Straddle vs. Short Strangle</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Short Straddle (ATM)"
                        tone="neutral"
                        items={[
                            "Strike: ATM call + ATM put at the same strike.",
                            "Premium: highest possible credit collected upfront.",
                            "Breakevens: narrower percentage profit window.",
                            "Gamma risk: high — delta changes rapidly on small underlying moves.",
                        ]}
                    />
                    <ComparisonCard
                        title="Short Strangle (OTM)"
                        tone="neutral"
                        items={[
                            "Strike: OTM call + OTM put at different strikes.",
                            "Premium: lower initial credit collected.",
                            "Breakevens: wider safety margin and higher probability of profit.",
                            "Gamma risk: lower — delta changes slowly until strikes are tested.",
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

export function ShortStraddlePlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection &amp; Setup</h4>
                <ul>
                    <li><strong>ATM Strike:</strong> pick the strike closest to current underlying spot price (~50 delta on both legs).</li>
                    <li><strong>High IV Environment:</strong> enter strictly when IV Rank is &gt; 50% or IV Percentile is &gt; 70% to ensure rich extrinsic premium.</li>
                    <li><strong>30–45 DTE:</strong> optimal theta decay window that avoids short-dated expiration gamma whipsaws.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen broad market index (e.g. SPX) with elevated IV Rank (&gt;50%).</li>
                    <li>Select an expiration cycle 30–45 days out.</li>
                    <li>Execute the ATM call sale and ATM put sale simultaneously as a single straddle order.</li>
                    <li>Record total premium collected and calculate upper/lower breakeven levels.</li>
                    <li>Set a GTC limit order to buy back the straddle at 25–50% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Early Profit Taking</h4>
                <ul>
                    <li><strong>25–50% Profit Rule:</strong> because straddles decay fastest in early days, take profits when 25–50% of the maximum credit is captured. Do not hold to expiration.</li>
                    <li><strong>21 DTE Time Stop:</strong> close or roll the straddle at 21 DTE to eliminate exponential gamma risk.</li>
                </ul>
                <h4>Dynamic Delta Adjustments</h4>
                <ul>
                    <li><strong>Roll Untested Side:</strong> if the market rallies, buy back the profitable put and roll it up to a higher strike to re-center delta and collect additional credit.</li>
                    <li><strong>Convert to Inverted Straddle or Iron Butterfly:</strong> buy outer protective wings if a runaway trend threatens margin limits.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Keep total short straddle margin usage strictly under 15–20% of net liquidating value to survive sudden volatility expansions.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Holding into expiration week:</strong> holding a naked short straddle at 0–5 DTE where gamma creates massive intraday losses on tiny moves.</li>
                    <li><strong>Trading illiquid single stocks:</strong> selling straddles on individual stocks prone to takeover bids or unexpected +30% gap moves.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Short straddles carry theoretically unlimited risk in both directions.
                    Losses can exceed account value during sudden gap events. This content is for educational purposes only.
                </p>
            </div>
        </div>
    );
}