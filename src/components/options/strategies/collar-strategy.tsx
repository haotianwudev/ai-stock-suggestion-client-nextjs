import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Net positive but bounded between 0 and 1 — delta approaches 0 below the put strike and near the call strike.' },
    { label: 'Theta', tone: 'text-[#A8672E] dark:text-[#D08F52]', text: 'Near neutral — short call theta income offsets long protective put theta decay.' },
    { label: 'Vega', tone: 'text-[#A8672E] dark:text-[#D08F52]', text: 'Balanced — long put vega balances short call vega across moderate price ranges.' },
    { label: 'Greeks Role', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Engineered to bracket risk: establishes a guaranteed floor and defined cap on stock equity.' },
];

export function CollarOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>collar strategy</strong> is a three-legged protective structure combining 100 shares of underlying
                    stock with a long out-of-the-money protective put (a downside floor) and a short out-of-the-money call (an upside cap).
                </p>
                <p>
                    By selling the call, you collect premium that directly finances the purchase of the protective put, frequently
                    achieving a <Jargon term="zero-cost collar" definition="A collar structure where the premium collected from the short call exactly equals the premium paid for the protective put, providing downside protection at zero initial cash outlay." />.
                    It is widely favored by corporate executives and institutional investors to protect accumulated gains in
                    concentrated equity positions without triggering immediate taxable sales.
                </p>
            </div>

            <FormulaPanel
                title="Collar Payoff Boundaries"
                formula="\text{Floor} = K_{\text{put}} - \text{Net Cost}, \quad \text{Cap} = K_{\text{call}} - \text{Net Cost}"
                legend={[
                    { label: 'K_{put}', value: 'Protective put strike (downside floor)' },
                    { label: 'K_{call}', value: 'Covered call strike (upside profit cap)' },
                    { label: 'Net Cost', value: 'Put premium paid minus Call premium received' },
                ]}
                example={{
                    label: 'Worked Example ($100 Stock)',
                    rows: [
                        { label: 'Stock Price at Entry', value: '$100.00' },
                        { label: 'Buy $90 Put (Floor)', value: '$2.00 debit' },
                        { label: 'Sell $110 Call (Cap)', value: '$2.00 credit' },
                        { label: 'Net Cash Outlay', value: '$0.00 (Zero-Cost Collar)' },
                    ],
                    result: { label: 'Protected Range', value: 'Max loss limited to -$10 (-10%); Max gain capped at +$10 (+10%)' },
                    note: 'Regardless of how far the stock drops below $90, losses cannot exceed $10/share. In exchange, gains above $110 are surrendered.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Collar vs. Stop-Loss Order</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Equity Collar"
                        tone="pos"
                        items={[
                            "Guaranteed protection: put option provides an inviolable floor against overnight gaps and black swan crashes.",
                            "Zero execution slippage: contractual right to sell at the strike.",
                            "Cost: financed entirely by selling the OTM call.",
                        ]}
                    />
                    <ComparisonCard
                        title="Traditional Stop-Loss Order"
                        tone="neutral"
                        items={[
                            "Gap risk vulnerability: order executes at the market open price during weekend gaps, ignoring the stop trigger price.",
                            "False whipsaws: sharp intraday dips can trigger premature sales right before a rebound.",
                            "Cost: free, but lacks contractual protection.",
                        ]}
                    />
                </ComparisonGrid>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Greeks at a Glance</h3>
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

export function CollarPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>Protective Put:</strong> buy a 10–20 delta put (typically 5–15% below current stock price) to establish your worst-case loss floor.</li>
                    <li><strong>Covered Call:</strong> sell a 20–30 delta call (typically 5–15% above current stock price) priced to match or exceed the put's cost.</li>
                    <li><strong>Zero-Cost Objective:</strong> adjust the call strike until net credit matches the put debit.</li>
                </ul>
                <h4>Duration &amp; Expiration</h4>
                <ul>
                    <li><strong>60–180 DTE:</strong> longer durations reduce annual rebalancing friction and allow wider collar boundaries for the same zero net cost.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Hold 100 shares of underlying stock per collar contract.</li>
                    <li>Select a target expiration 60–180 days out.</li>
                    <li>Price the desired downside put strike (e.g. -10%).</li>
                    <li>Find the call strike that generates equal or higher premium (+10% to +15%).</li>
                    <li>Execute the put purchase and call sale simultaneously.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Position Adjustments</h4>
                <ul>
                    <li><strong>Rolling Collars Forward:</strong> as expiration approaches (within 21–30 DTE), roll both legs to a new expiration cycle to maintain perpetual protection.</li>
                    <li><strong>Rolling the Call Up:</strong> if the stock rallies strongly towards the call strike and you wish to avoid assignment, buy back the call and roll to a higher strike and later date.</li>
                    <li><strong>Exercising the Put:</strong> if the company suffers catastrophic breakdown, exercise the put at expiration to exit at the strike price.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Total Position Return at Expiration"
                formula="\text{P\&L} = \max\left(K_{\text{put}}, \min(S_T, K_{\text{call}})\right) - S_0 + \text{Dividends} - \text{Net Debit}"
                legend={[
                    { label: 'S_0', value: 'Stock purchase price' },
                    { label: 'S_T', value: 'Stock price at expiration' },
                    { label: 'Dividends', value: 'Dividends collected during holding period' },
                ]}
                example={{
                    label: 'Downside Crash Outcome',
                    rows: [
                        { label: 'Stock Bought at', value: '$100.00' },
                        { label: 'Put Strike / Call Strike', value: '$90 / $110 (Zero Cost)' },
                        { label: 'Stock Crashes to', value: '$50.00 at expiration' },
                    ],
                    result: { label: 'Protected Position Value', value: '$90.00 per share (Loss strictly limited to -$10.00, saving $40.00/share)' },
                    note: 'The protective put cushions 80% of the drop, preventing catastrophic capital loss.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Key Considerations</h4>
                <ul>
                    <li><strong>Opportunity Regret:</strong> if the stock enters a massive multi-bagger rally, upside is capped at the call strike unless rolled for a debit.</li>
                    <li><strong>Early Assignment Risk:</strong> watch short in-the-money calls closely right before ex-dividend dates to prevent surprise share assignment.</li>
                    <li><strong>Trading Wide Bids:</strong> on illiquid stock options, wide spreads on both legs can create unnecessary execution slippage.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Collars define maximum profit and maximum loss. While downside risk is limited
                    to the put strike, capital loss is still possible down to that level. This content is for educational purposes only.
                </p>
            </div>
        </div>
    );
}