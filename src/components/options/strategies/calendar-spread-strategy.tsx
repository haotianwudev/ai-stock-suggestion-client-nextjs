import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Near neutral at initiation (~0.00 delta) — behaves directionally if price breaks outside the front-month strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Net positive theta — short front-month decay accelerates much faster than long back-month decay.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Net positive vega — back-month option has significantly higher vega, profiting when term structure IV rises.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative gamma near front expiration — vulnerable to sharp, fast underlying price breakouts.' },
];

export function CalendarSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>calendar spread</strong> (also known as a <em>time spread</em> or <em>horizontal spread</em>) is a
                    market-neutral options strategy constructed by selling a near-term (front-month) option and simultaneously
                    buying a longer-term (back-month) option at the exact same strike price.
                </p>
                <p>
                    The strategy exploits <Jargon term="differential theta decay" definition="The mathematical property of options pricing where short-dated options experience exponential time decay acceleration compared to linear, sluggish decay in longer-dated options." />.
                    Because the front-month option erodes rapidly while the back-month option preserves its extrinsic value and vega exposure,
                    you capture the spread difference as net profit with strictly defined risk capped at the initial net debit.
                </p>
            </div>

            <FormulaPanel
                title="Calendar Spread Payoff Mechanics"
                formula="\text{Max Loss} = \text{Debit}_{\text{net}}, \quad \text{P\&L}_{\text{front exp}} = V_{\text{back}}(S_T) - \max(0, S_T - K) - \text{Debit}_{\text{net}}"
                legend={[
                    { label: 'Debit_{net}', value: 'Initial capital paid (Back-month price minus Front-month price)' },
                    { label: 'V_{back}(S_T)', value: 'Remaining market value of the back-month option at front-month expiration' },
                    { label: 'K', value: 'Shared strike price' },
                    { label: 'Max Profit', value: 'Occurs at front expiration when underlying settles precisely at strike K' },
                ]}
                example={{
                    label: 'SPX $5,800 Calendar Spread Example',
                    rows: [
                        { label: 'Buy 60 DTE $5,800 Call (Back)', value: '$95.00 debit' },
                        { label: 'Sell 30 DTE $5,800 Call (Front)', value: '$65.00 credit' },
                        { label: 'Net Debit Paid (Max Risk)', value: '$30.00 ($3,000 per contract)' },
                    ],
                    result: { label: 'Peak Profit at 30 DTE', value: '+$1,200 to +$1,800 (40-60% ROI on debit) if SPX is near $5,800' },
                    note: 'At 30 DTE, the front call expires worthless ($0), leaving you owning a 30 DTE call with substantial remaining extrinsic value.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Calendar Spread vs. Vertical Spread</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Calendar Spread (Time Spread)"
                        tone="pos"
                        items={[
                            "Structure: same strike, different expiration dates.",
                            "Primary driver: time decay differential (theta arbitrage) and rising back-month IV.",
                            "Vega: positive — benefits from market uncertainty and rising volatility.",
                        ]}
                    />
                    <ComparisonCard
                        title="Vertical Spread (Price Spread)"
                        tone="neutral"
                        items={[
                            "Structure: different strikes, same expiration date.",
                            "Primary driver: directional price movement or static credit decay.",
                            "Vega: depends on net debit/credit, but generally near vega-neutral.",
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

export function CalendarSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike &amp; Expiration Selection</h4>
                <ul>
                    <li><strong>ATM Strike:</strong> select the strike closest to spot for delta-neutral consolidation plays; choose slightly OTM for directional bias.</li>
                    <li><strong>Front Month (20–35 DTE):</strong> captures the steepest part of the theta decay curve.</li>
                    <li><strong>Back Month (50–90 DTE):</strong> 30–60 days further out than the front month to maximize vega retention and theta differential.</li>
                    <li><strong>IV Term Structure Check:</strong> ensure front-month IV is higher than or equal to back-month IV (avoid inverted term structures).</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for consolidations or index benchmarks in low-to-moderate IV environments.</li>
                    <li>Select an ATM strike at the current stock price.</li>
                    <li>Sell the front-month option (30 DTE) and buy the back-month option (60–90 DTE) as a single calendar order.</li>
                    <li>Set a GTC profit target at 25–40% return on debit paid.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking &amp; Rolling</h4>
                <ul>
                    <li><strong>25–40% Profit Rule:</strong> close the entire calendar once it yields 25–40% return on debit paid.</li>
                    <li><strong>Rolling Front Leg (Double Dipping):</strong> if the front-month option expires worthless and the stock remains near the strike, sell another 30-day option against the remaining back-month contract to reduce cost basis to near zero.</li>
                </ul>
                <h4>Loss Limits</h4>
                <ul>
                    <li><strong>25–30% Debit Stop:</strong> close the spread if the underlying stock experiences a violent breakout away from the strike.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Key Risks</h4>
                <ul>
                    <li><strong>Violent Breakouts:</strong> large directional gaps will devalue the spread because both options lose value away from the strike.</li>
                    <li><strong>Back-Month Volatility Crush:</strong> a sharp drop in back-month implied volatility reduces the value of your long leg.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Calendar spreads carry defined maximum risk strictly limited to the net debit paid.
                    Actual profit depends on back-month implied volatility at front-month expiration. Educational purposes only.
                </p>
            </div>
        </div>
    );
}
