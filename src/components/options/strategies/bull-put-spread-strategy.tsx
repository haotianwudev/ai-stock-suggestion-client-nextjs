import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — benefits from upward movement, growing as price approaches the short strike.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative while profitable — risk accelerates as price nears the short put strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Strongly positive — time decay works in your favor as expiration approaches.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — benefits when implied volatility falls after the trade is opened.' },
];

export function BullPutSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>bull put spread</strong> sells a higher-strike put and buys a lower-strike put, same expiration, for a
                    net credit. Think of it as selling insurance with a deductible: you collect premium upfront, and the long put
                    caps how much you can lose. Unlike owning stock, you profit whether the stock rises, stays flat, or even
                    drifts down slightly — as long as it stays above the short strike at expiration.
                </p>
                <p>
                    It's a favorite among income-focused and systematic premium sellers because it offers a defined-risk,
                    high-probability-of-profit trade with meaningfully less capital than owning the stock outright.
                </p>
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

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Bull Put vs. Bear Call Spread</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Both are credit spreads that profit from time decay — the choice usually comes down to mechanics, not just direction.
                </p>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Bull Put Spread"
                        tone="neutral"
                        items={[
                            "Strikes placed below the current price (OTM puts) — bullish to neutral outlook.",
                            "Generally better liquidity (puts trade heavier), lower margin (cash-secured), and benefits from dividends.",
                        ]}
                    />
                    <ComparisonCard
                        title="Bear Call Spread"
                        tone="neutral"
                        items={[
                            "Strikes placed above the current price (OTM calls) — bearish to neutral outlook.",
                            "Higher early-assignment risk (especially near ex-dividend dates) and higher naked-call margin requirements.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function BullPutSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>16-delta method:</strong> sell the 16-delta put for roughly 84% probability of success (one standard deviation).</li>
                    <li><strong>20-30 delta method:</strong> collect more premium at a still-solid 70-80% success rate.</li>
                    <li>Target a credit of 20-40% of the strike width for a balanced risk/reward.</li>
                </ul>
                <h4>Entry Criteria</h4>
                <ul>
                    <li>IV rank above 30%, to ensure adequate premium.</li>
                    <li>30-45 DTE — the sweet spot for theta acceleration.</li>
                    <li>Liquid underlyings, and avoid opening through an earnings date.</li>
                </ul>
                <h4>Step-by-Step</h4>
                <ol>
                    <li>Screen for high IV-rank underlyings ({'>'}30%).</li>
                    <li>Pick an expiration 30-45 days out.</li>
                    <li>Sell the put at a 16-20 delta strike.</li>
                    <li>Buy a put 5-15 strikes lower.</li>
                    <li>Target 20-40% of strike width as credit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit &amp; Loss Rules</h4>
                <ul>
                    <li><strong>Profit target:</strong> close at 50% of maximum profit.</li>
                    <li><strong>Loss limit:</strong> close at 200% of the credit received.</li>
                    <li><strong>Time stop:</strong> close by 7-10 DTE regardless of P&amp;L, to avoid gamma risk.</li>
                </ul>
                <h4>Adjustments</h4>
                <ul>
                    <li><strong>Roll down and out:</strong> if the stock moves against you, roll to lower strikes and a later expiration for additional credit.</li>
                    <li><strong>Convert to iron condor:</strong> add a bear call spread above the current price to collect additional premium.</li>
                </ul>
                <h4>Assignment</h4>
                <ul>
                    <li>Watch ITM short puts closely near ex-dividend dates.</li>
                    <li>Roll before assignment if still bullish; accept assignment if comfortable owning the stock.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Breakeven"
                formula="\text{Breakeven} = K_{short} - C_{net}"
                legend={[
                    { label: 'K_{short}', value: 'Short put strike' },
                    { label: 'C_{net}', value: 'Net credit received' },
                ]}
                example={{
                    label: 'Worked Example',
                    rows: [
                        { label: 'K_short', value: '$100' },
                        { label: 'C_net', value: '$1.50' },
                    ],
                    result: { label: 'Breakeven', value: '$98.50' },
                    note: 'Sell the $100 put, buy the $95 put, collect $1.50 credit → max profit $150, max loss $350 (the $5 width minus the credit).',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Risk 1-2% of the account per trade; diversify across underlyings and sectors rather than concentrating.</li>
                    <li>Watch total portfolio delta exposure across multiple open spreads.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Bull put spreads involve substantial risk. While risk is defined, losses can equal
                    the maximum loss amount and may result in assignment of the underlying stock. This information is for educational
                    purposes only and does not constitute investment advice. Please consult a qualified financial advisor before
                    implementing any options strategy.
                </p>
            </div>
        </div>
    );
}
