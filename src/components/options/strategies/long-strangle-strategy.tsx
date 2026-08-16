import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — stays neutral until price approaches either OTM strike.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive vega — benefits as market uncertainty and implied volatility expand.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Convex positive gamma — explosive profit acceleration once price breaks past either OTM strike.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative theta — burns daily extrinsic value, though at a lower absolute dollar cost than straddles.' },
];

export function LongStrangleOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>long strangle</strong> is a direction-neutral volatility strategy created by simultaneously
                    purchasing an out-of-the-money put option and an out-of-the-money call option with different strike prices
                    and the same expiration date.
                </p>
                <p>
                    Because both options are out-of-the-money, a strangle costs <strong>50–70% less upfront capital</strong> than an
                    equivalent straddle. In exchange for this low cost, it requires a larger underlying move to reach profitability,
                    making it the quintessential tool for <Jargon term="asymmetric tail-event speculation" definition="Allocating modest premium capital to capture explosive 300%+ percentage returns on large, multi-standard-deviation market breakouts or shocks." />.
                </p>
            </div>

            <FormulaPanel
                title="Long Strangle Payoff & Breakeven Range"
                formula="\text{Breakevens} = [K_{\text{put}} - \text{Debit}_{\text{total}}, \quad K_{\text{call}} + \text{Debit}_{\text{total}}]"
                legend={[
                    { label: 'K_{put}', value: 'Out-of-the-money put strike' },
                    { label: 'K_{call}', value: 'Out-of-the-money call strike' },
                    { label: 'Debit_{total}', value: 'Combined purchase price (Put Premium + Call Premium)' },
                    { label: 'Max Loss', value: 'Strictly capped at Debit_{total} (occurs if price finishes between strikes)' },
                ]}
                example={{
                    label: 'Worked Example ($100 Stock OTM Strangle)',
                    rows: [
                        { label: 'Buy $95 Put (25Δ OTM)', value: '$1.50 debit' },
                        { label: 'Buy $105 Call (25Δ OTM)', value: '$1.50 debit' },
                        { label: 'Total Capital at Risk', value: '$3.00 ($300 per contract)' },
                    ],
                    result: { label: 'Breakeven Range', value: '$92.00 on the downside and $108.00 on the upside' },
                    note: 'Maximum risk is $300 (compared to $800+ for an ATM straddle). Profits expand exponentially once the stock moves outside the $92-$108 boundaries.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Long Strangle vs. Long Straddle</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Long Strangle (OTM)"
                        tone="pos"
                        items={[
                            "Cost: 50-70% lower capital outlay per contract.",
                            "ROI potential: explosive 300-1000%+ percentage returns on large outlier moves.",
                            "Win rate: lower (~25-35% probability of profit).",
                        ]}
                    />
                    <ComparisonCard
                        title="Long Straddle (ATM)"
                        tone="neutral"
                        items={[
                            "Cost: higher upfront dollar debit.",
                            "ROI potential: steady 50-100% returns on moderate moves.",
                            "Win rate: higher (~40-50% probability of profit).",
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

export function LongStranglePlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection (20–30 Delta Range)</h4>
                <ul>
                    <li><strong>25-Delta Strikes:</strong> buy the ~25-delta put and ~25-delta call equidistant from the spot price to balance affordability with realistic breakout probability.</li>
                    <li><strong>Low IV Regime:</strong> buy only when IV Rank is &lt; 20% to acquire cheap option gamma.</li>
                    <li><strong>45–90 DTE Duration:</strong> longer expiration cycles give multi-month technical breakouts time to materialize while softening daily theta burn.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Identify an underlying consolidating inside a tight multi-month volatility compression channel with IV Rank &lt; 20%.</li>
                    <li>Select an expiration 45–90 days out.</li>
                    <li>Buy the 25Δ put and 25Δ call simultaneously as a single order.</li>
                    <li>Calculate breakeven prices and set a GTC limit order to sell at 100–200% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>100%+ Profit Target:</strong> take profits or roll up/down once total strangle value doubles following a breakout move.</li>
                    <li><strong>Scale Out on Surges:</strong> close the in-the-money winning leg on a violent surge to lock in principal, letting the remaining leg ride as a free tail hedge.</li>
                </ul>
                <h4>Loss Management &amp; Time Stops</h4>
                <ul>
                    <li><strong>50% Debit Stop:</strong> close the trade if the total strangle value drops by 50% from initial entry debit.</li>
                    <li><strong>Time Stop (21 DTE):</strong> exit prior to the final 3 weeks to avoid total decay in stagnant markets.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Treat long strangles as speculative convexity bets: risk no more than 1% of portfolio equity per trade.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Buying Far OTM Lottery Tickets (5Δ strikes):</strong> buying strikes that require once-in-a-decade moves, suffering 100% loss rates.</li>
                    <li><strong>Over-trading in Chop:</strong> repeatedly buying strangles during choppy sideways regimes that bleed theta continuously.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Long strangles involve defined risk limited to premium paid, but have a low
                    probability of profit. Full premium loss occurs if the underlying stays between strikes. Educational purposes only.
                </p>
            </div>
        </div>
    );
}