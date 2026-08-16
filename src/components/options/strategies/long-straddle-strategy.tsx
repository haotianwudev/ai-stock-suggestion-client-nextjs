import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — delta accelerates rapidly in whichever direction the stock breaks out.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Highest positive vega — double exposure to rising implied volatility from both long legs.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Maximum positive gamma — profits accelerate convexly as price moves away from the strike.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Heaviest negative theta — suffers rapid daily extrinsic decay from both long options simultaneously.' },
];

export function LongStraddleOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>long straddle</strong> is the purest volatility-buying strategy in options trading, constructed by
                    simultaneously purchasing an at-the-money call option and an at-the-money put option at the exact same strike
                    price and expiration date.
                </p>
                <p>
                    Because the position starts delta-neutral, you do not need to predict market direction — you only need the
                    underlying stock to make a large move in <em>either</em> direction that exceeds the combined premium paid.
                    It directly monetizes <Jargon term="volatility expansion (Long Vega / Long Gamma)" definition="Profiting when actual realized price movement (HV) exceeds the market's initial implied volatility expectation (IV), or when a surge in market uncertainty inflates option prices." />.
                    Your maximum loss is strictly capped at the total premium paid.
                </p>
            </div>

            <FormulaPanel
                title="Long Straddle Payoff & Breakeven Range"
                formula="\text{Breakevens} = [K - \text{Debit}_{\text{total}}, \quad K + \text{Debit}_{\text{total}}]"
                legend={[
                    { label: 'K', value: 'At-the-money strike price (shared by both legs)' },
                    { label: 'Debit_{total}', value: 'Total premium paid upfront (Call Premium + Put Premium)' },
                    { label: 'Max Loss', value: 'Strictly limited to Debit_{total} (occurs if price settles exactly at strike K)' },
                    { label: 'Max Profit', value: 'Unlimited on the upside; substantial on the downside down to $0' },
                ]}
                example={{
                    label: 'Worked Example ($100 Stock ATM Straddle)',
                    rows: [
                        { label: 'Buy $100 Call (ATM)', value: '$4.00 debit' },
                        { label: 'Buy $100 Put (ATM)', value: '$4.00 debit' },
                        { label: 'Total Capital at Risk', value: '$8.00 ($800 per contract)' },
                    ],
                    result: { label: 'Breakeven Boundaries', value: '$92.00 on the downside and $108.00 on the upside' },
                    note: 'Profits are uncapped if the stock rallies above $108.00 or drops below $92.00. Maximum risk is limited to the $800 initial debit.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Long Straddle vs. Long Strangle</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Long Straddle (ATM)"
                        tone="pos"
                        items={[
                            "Convexity: maximum gamma explosion near strike.",
                            "Breakevens: requires smaller percentage price move to reach profitability.",
                            "Cost: higher upfront debit required to purchase two ATM options.",
                        ]}
                    />
                    <ComparisonCard
                        title="Long Strangle (OTM)"
                        tone="neutral"
                        items={[
                            "Convexity: lower initial gamma until strikes are breached.",
                            "Breakevens: requires a much larger price breakout to break even.",
                            "Cost: significantly cheaper upfront capital requirement.",
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

export function LongStraddlePlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection &amp; Timing</h4>
                <ul>
                    <li><strong>Exact ATM Strike:</strong> choose the strike closest to spot price (~50 delta on each leg).</li>
                    <li><strong>Enter at Low IV Rank (&lt;20%):</strong> buy straddles only when implied volatility is severely compressed and cheap. Never buy straddles during peak IV regimes.</li>
                    <li><strong>30–60 DTE Window:</strong> provides enough duration for the volatility expansion or catalyst to play out without succumbing immediately to terminal theta decay.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for underlyings with historically low IV Rank (&lt;20%) ahead of major macro or technical breakout catalysts.</li>
                    <li>Select an expiration 30–60 days out.</li>
                    <li>Buy the ATM call and ATM put simultaneously as a single package.</li>
                    <li>Record total debit paid and establish upper and lower profit targets.</li>
                    <li>Set working GTC limit orders to take profit at 50–100% gain on the straddle.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>50–100% Gain Rule:</strong> close the entire position when total straddle value appreciates by 50–100% following a sharp directional move or volatility spike.</li>
                    <li><strong>Post-Event Exit:</strong> if trading an anticipated catalyst event, close immediately upon the announcement to lock in gains before volatility crush erodes premium.</li>
                </ul>
                <h4>Loss Management &amp; Time Stops</h4>
                <ul>
                    <li><strong>40–50% Stop Loss:</strong> exit if the straddle value decays by 40–50% from initial entry debit.</li>
                    <li><strong>Time Stop (14–21 DTE):</strong> never hold long straddles into expiration week in a quiet market; close by 21 DTE to salvage remaining extrinsic value.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Limit long straddle allocation to 1–2% of total portfolio capital per trade due to negative carry (theta decay).</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Buying Straddles Right Before Earnings:</strong> buying options when IV is at yearly highs (IV crush collapses both legs post-announcement).</li>
                    <li><strong>Holding in Stagnant Markets:</strong> watching theta bleed 100% of the straddle value during sideways consolidation.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Long straddles carry the risk of total loss of premium paid if the stock stays
                    near the strike price through expiration. This information is for educational purposes only.
                </p>
            </div>
        </div>
    );
}