import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive delta — profits from underlying price appreciation above the long call strike.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Vega-skew sensitive — benefits when expensive OTM put volatility contracts relative to calls.' },
    { label: 'Theta', tone: 'text-[#A8672E] dark:text-[#D08F52]', text: 'Balanced theta — short put and short call decay offset long call time decay.' },
    { label: 'Downside Risk', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Substantial below short put — behaves like a short put position if the stock crashes below K1.' },
];

export function SeagullSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>seagull spread</strong> (bullish variant) is a three-legged options structure that finances a directional
                    bull call spread by simultaneously selling an out-of-the-money put option, typically resulting in a <strong>zero-cost
                    or small net credit</strong> entry.
                </p>
                <p>
                    The strategy exploits <Jargon term="volatility skew arbitrage" definition="The structural pricing phenomenon where index out-of-the-money puts trade at significantly higher implied volatilities than out-of-the-money calls due to persistent market demand for downside crash insurance." />.
                    By selling the overpriced OTM put, you generate enough income to fully finance the long call spread, capturing
                    upside participation without upfront cash outlay, in exchange for downside exposure below the short put strike.
                </p>
            </div>

            <FormulaPanel
                title="Seagull Spread Payoff Architecture"
                formula="\text{Max Profit} = (K_3 - K_2) - \text{Debit}_{\text{net}}, \quad \text{Downside Risk} = S_T < K_1"
                legend={[
                    { label: 'K_1', value: 'Short put strike (Financing leg; downside risk below this level)' },
                    { label: 'K_2', value: 'Long call strike (ATM / near-the-money directional entry)' },
                    { label: 'K_3', value: 'Short call strike (Upper profit ceiling)' },
                    { label: 'Debit_{net}', value: 'Net cost (typically ~$0.00 zero-cost)' },
                ]}
                example={{
                    label: 'SPX Zero-Cost Seagull Example',
                    rows: [
                        { label: 'Sell 1x 15Δ Put ($5,500 Strike)', value: '+$18.00 credit (Financing leg)' },
                        { label: 'Buy 1x 45Δ Call ($5,800 Strike)', value: '-$30.00 debit' },
                        { label: 'Sell 1x 20Δ Call ($5,950 Strike)', value: '+$12.00 credit' },
                    ],
                    result: { label: 'Net Cash Outlay', value: '$0.00 (Zero Cost) with $150.00 ($15,000) upside cap' },
                    note: 'Max profit of $15,000 is achieved if SPX reaches $5,950. No cash is lost if SPX stays between $5,500 and $5,800. Downside risk begins below $5,500.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Seagull Spread vs. Bull Call Spread</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Bullish Seagull Spread"
                        tone="pos"
                        items={[
                            "Cost: $0.00 zero-cost or net credit collected upfront.",
                            "Financing: short OTM put pays for the call spread.",
                            "Downside risk: substantial below the short put strike.",
                            "Best for: bullish investors willing to buy the stock at a discount.",
                        ]}
                    />
                    <ComparisonCard
                        title="Standard Bull Call Spread"
                        tone="neutral"
                        items={[
                            "Cost: requires paying full net debit upfront.",
                            "Financing: self-funded.",
                            "Downside risk: strictly defined to the initial debit paid.",
                            "Best for: risk-averse directional traders avoiding any short put risk.",
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

export function SeagullSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection &amp; Skew Calibration</h4>
                <ul>
                    <li><strong>Short Put ($K_1$):</strong> sell a 15–20 delta put placed at key support where you would be happy to buy the stock.</li>
                    <li><strong>Long Call ($K_2$):</strong> buy a 40–50 delta ATM call for directional upside leverage.</li>
                    <li><strong>Short Call ($K_3$):</strong> sell a 15–25 delta OTM call to cap upside and reduce call spread cost.</li>
                    <li><strong>Zero-Cost Verification:</strong> verify that Put Credit + Short Call Credit $\ge$ Long Call Debit.</li>
                </ul>
                <h4>Duration &amp; Expiration</h4>
                <ul>
                    <li><strong>60–120 DTE:</strong> longer timeframes allow volatility skew to work in your favor and give the directional move time to mature.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for bullish setups in index products (SPX) or high-quality large caps with steep put skew.</li>
                    <li>Select an expiration 60–120 days out.</li>
                    <li>Enter all 3 legs simultaneously as a single 3-way order ticket.</li>
                    <li>Verify net cost is $\le \$0.00$.</li>
                    <li>Set a GTC profit target at 60–80% of the call spread width.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Targets</h4>
                <ul>
                    <li><strong>60–80% Call Width Target:</strong> exit when the call spread approaches full value as the stock reaches $K_3$.</li>
                </ul>
                <h4>Downside Management</h4>
                <ul>
                    <li><strong>Short Put Defense:</strong> if the stock drops toward $K_1$, treat the short put identically to a cash-secured put: roll down and out for credit, or accept assignment at a steep discount.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Key Risks</h4>
                <ul>
                    <li><strong>No Free Lunch Downside:</strong> while zero cash is paid upfront, capital loss below the short put $K_1$ can be substantial during market crashes.</li>
                    <li><strong>Capped Upside:</strong> gains stop accumulating above the short call strike $K_3$.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Seagull spreads carry substantial downside risk below the short put strike.
                    Losses can equal the strike price minus premium if the underlying stock collapses. Educational purposes only.
                </p>
            </div>
        </div>
    );
}
