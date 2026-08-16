import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — acts like a sensitive compass centered on the middle strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive theta near the body strike — the 2 short options decay at twice the rate of the wings.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative vega near the body strike — benefits when implied volatility contracts into expiration.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'High gamma peak at the center body — creates a razor-sharp tent-shaped payoff profile.' },
];

export function ButterflySpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>long butterfly spread</strong> is a precision, defined-risk options strategy constructed using a
                    <strong> 1-2-1 ratio</strong> across three equidistant strike prices: buying 1 lower-strike option, selling 2 middle-strike
                    options (the "body"), and buying 1 higher-strike option (the "wings"), all sharing the same expiration date.
                </p>
                <p>
                    Unlike wide-range iron condors, the butterfly is a <Jargon term="pin-risk precision vehicle" definition="A strategy engineered to capture asymmetric 3:1 to 10:1 reward-to-risk payouts by forecasting that the stock will settle within a tight zone around a specific target strike price." />.
                    Because selling the two middle options finances most of the cost of the outer wings, the net debit required is
                    very low, giving the trade exceptional capital efficiency.
                </p>
            </div>

            <FormulaPanel
                title="Butterfly Payoff & Breakeven Boundaries"
                formula="\text{Max Profit} = (K_2 - K_1) - \text{Debit}_{\text{net}}, \quad \text{Breakevens} = [K_1 + \text{Debit}_{\text{net}}, \quad K_3 - \text{Debit}_{\text{net}}]"
                legend={[
                    { label: 'K_1', value: 'Lower wing strike (Buy 1 Call/Put)' },
                    { label: 'K_2', value: 'Middle body strike (Sell 2 Calls/Puts)' },
                    { label: 'K_3', value: 'Upper wing strike (Buy 1 Call/Put)' },
                    { label: 'Debit_{net}', value: 'Net premium paid upfront (Max Risk)' },
                ]}
                example={{
                    label: 'SPX $50-Wide Butterfly Example',
                    rows: [
                        { label: 'Buy 1x $5,750 Call (Lower Wing)', value: '$110.00 debit' },
                        { label: 'Sell 2x $5,800 Call (Body)', value: '2x $78.00 = $156.00 credit' },
                        { label: 'Buy 1x $5,850 Call (Upper Wing)', value: '$54.00 debit' },
                        { label: 'Net Debit Paid (Max Risk)', value: '$8.00 ($800 per contract)' },
                    ],
                    result: { label: 'Max Profit Potential', value: '$42.00 ($4,200) — a 5.25 to 1 reward-to-risk ratio' },
                    note: 'Max profit of $4,200 is reached if SPX settles exactly at $5,800 at expiration. The trade breaks even between $5,758 and $5,842.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Butterfly Spread vs. Iron Condor</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Long Butterfly Spread"
                        tone="pos"
                        items={[
                            "Reward-to-Risk: high (often 3:1 to 6:1+ payout).",
                            "Cost: small net debit paid upfront.",
                            "Profit zone: tight tent centered around the body strike.",
                            "Best for: low-cost directional targeting or range consolidation.",
                        ]}
                    />
                    <ComparisonCard
                        title="Iron Condor"
                        tone="neutral"
                        items={[
                            "Reward-to-Risk: lower (typically 1:3 payout).",
                            "Cost: net credit collected upfront.",
                            "Profit zone: wide profit plateau between short strikes.",
                            "Best for: high-probability systematic premium harvesting.",
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

export function ButterflySpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Configuration &amp; Sizing</h4>
                <ul>
                    <li><strong>Middle Body ($K_2$):</strong> place the 2 short options at your exact target price (ATM for neutral, OTM for directional butterflies).</li>
                    <li><strong>Outer Wings ($K_1, K_3$):</strong> place the long wings equidistant from $K_2$ (e.g. $\pm 25$ to $\pm 50$ points on SPX).</li>
                    <li><strong>Debit Benchmark:</strong> target paying no more than 15–20% of the wing width as net debit.</li>
                </ul>
                <h4>Duration &amp; Expiration</h4>
                <ul>
                    <li><strong>14–30 DTE:</strong> butterflies require time decay to accelerate inside the body; cycles shorter than 30 DTE realize profit faster without long holding drag.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Identify a high-conviction price target or range consolidation zone.</li>
                    <li>Select an expiration 14–30 days out.</li>
                    <li>Enter order as a single 1-2-1 butterfly ticket (Buy 1 $K_1$ + Sell 2 $K_2$ + Buy 1 $K_3$).</li>
                    <li>Verify net debit is $\le 20\%$ of wing width.</li>
                    <li>Set a GTC limit order to exit at 2x to 3x your initial debit paid.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Targets</h4>
                <ul>
                    <li><strong>2x–3x Debit Rule:</strong> take profit when the spread value doubles or triples. Do not greedily hold for theoretical 100% max pin profit, which rarely settles exactly at the body strike to the cent.</li>
                </ul>
                <h4>Risk Management</h4>
                <ul>
                    <li><strong>Accept Max Loss:</strong> because maximum risk is strictly capped at the small initial debit (e.g. $200–$800), active stop-loss orders are often unnecessary.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Common Pitfalls</h4>
                <ul>
                    <li><strong>Pin Risk at Expiration:</strong> stock settling right next to the short strikes can cause unexpected assignment if trading deliverable equity options (trade cash-settled SPX/NDX to avoid assignment).</li>
                    <li><strong>Exiting Too Early:</strong> butterflies show minimal P&amp;L change until the final 7–10 days when theta decay accelerates into the body.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Butterfly spreads carry defined risk limited to the initial net debit paid.
                    Maximum profit requires the underlying to settle near the middle strike at expiration. Educational purposes only.
                </p>
            </div>
        </div>
    );
}
