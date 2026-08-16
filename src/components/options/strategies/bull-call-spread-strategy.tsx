import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — profits from upward price moves; tempered compared to single-leg calls.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive near the long strike, flipping negative near the short strike as max profit is approached.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Mildly negative — short call time decay significantly offsets long call decay.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Mildly positive — far less vulnerable to IV crush than outright long calls.' },
];

export function BullCallSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>bull call spread</strong> (or <em>call debit spread</em>) is a defined-risk bullish strategy constructed
                    by purchasing an in-the-money or at-the-money call option while simultaneously selling an out-of-the-money call
                    at a higher strike price with the same expiration date.
                </p>
                <p>
                    Selling the higher strike call finances 40–70% of the long call's purchase price, significantly reducing both
                    your net capital at risk and the trade's breakeven threshold. In exchange, your upside is capped once the
                    underlying stock reaches the short call strike. It is the premier vehicle for <Jargon term="defined-risk directional leverage" definition="Gaining leveraged upside exposure to a stock with a strictly capped maximum possible loss equal to the net debit paid." />.
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
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Bull Call Spread vs. Long Call</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Bull Call Spread (Debit Spread)"
                        tone="pos"
                        items={[
                            "Cost: 40-70% cheaper than buying a call alone.",
                            "Breakeven: closer to current price (Long Strike + Net Debit).",
                            "Time decay: insulated — short call theta offsets long call theta.",
                            "Profit cap: capped at Strike Width minus Net Debit.",
                        ]}
                    />
                    <ComparisonCard
                        title="Single-Leg Long Call"
                        tone="neutral"
                        items={[
                            "Cost: 100% full premium paid upfront.",
                            "Breakeven: higher hurdle (Strike + Full Premium).",
                            "Time decay: fully exposed to daily theta erosion.",
                            "Profit cap: theoretically unlimited.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function BullCallSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>Long Call (Lower Strike):</strong> buy an ATM or slightly ITM strike (50–60 delta) for high responsiveness to price appreciation.</li>
                    <li><strong>Short Call (Higher Strike):</strong> sell an OTM strike (20–30 delta) corresponding to your realistic target price.</li>
                    <li><strong>Debit Target:</strong> ensure the net debit paid is between 30% and 50% of the total spread width to preserve a favorable 1:1 to 2:1 reward-to-risk ratio.</li>
                </ul>
                <h4>Entry Criteria &amp; Timing</h4>
                <ul>
                    <li><strong>30–60 DTE:</strong> provides ample time for the bullish thesis to mature while keeping theta decay balanced.</li>
                    <li><strong>Moderate IV:</strong> works well in low-to-moderate IV environments where buying the lower strike is cost-effective.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Identify an underlying with a strong technical support base and moderate bullish catalyst.</li>
                    <li>Select an expiration 30–60 days out.</li>
                    <li>Buy the ~50-delta lower call and simultaneously sell the ~25-delta upper call as a single spread order.</li>
                    <li>Verify net debit is $\le 50\%$ of strike width.</li>
                    <li>Place a GTC limit order to close at 50–75% of maximum profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>50–75% Rule:</strong> close the spread once it captures 50–75% of maximum profit rather than holding into expiration week for the final pennies.</li>
                    <li><strong>Early Target Hit:</strong> take profits immediately if a fast surge pushes the stock beyond the short strike early in the cycle.</li>
                </ul>
                <h4>Loss Management</h4>
                <ul>
                    <li><strong>50% Debit Stop:</strong> exit if the spread value declines by 50% of initial debit paid.</li>
                    <li><strong>Time Stop (14–21 DTE):</strong> if the stock hasn't moved and expiration nears, close to salvage remaining extrinsic value.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Spread Payoff & Breakeven"
                formula="\text{Max Profit} = (K_{\text{short}} - K_{\text{long}}) - \text{Debit}_{\text{net}}"
                legend={[
                    { label: 'K_{long}', value: 'Lower (bought) strike price' },
                    { label: 'K_{short}', value: 'Higher (sold) strike price' },
                    { label: 'Debit_{net}', value: 'Net premium paid per share' },
                    { label: 'Breakeven', value: 'K_{long} + Debit_{net}' },
                ]}
                example={{
                    label: 'Worked Example ($5-Wide Spread)',
                    rows: [
                        { label: 'Buy $100 Call', value: '$4.00 debit' },
                        { label: 'Sell $105 Call', value: '$1.50 credit' },
                        { label: 'Net Debit Paid', value: '$2.50 ($250 per contract)' },
                    ],
                    result: { label: 'Max Profit', value: '$2.50 ($250 per contract) at or above $105' },
                    note: 'Breakeven is $102.50 ($100 + $2.50). Max loss is strictly capped at the $250 net debit paid.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Risk no more than 2–3% of total account capital per vertical spread position.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Legging in / out:</strong> entering or exiting legs separately instead of executing as a single spread package.</li>
                    <li><strong>Spreads too narrow:</strong> trading $1-wide spreads where commission and bid-ask slippage consume your edge.</li>
                    <li><strong>Ignoring early assignment risk:</strong> failing to close ITM short calls near ex-dividend dates.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Vertical debit spreads carry the risk of total loss of the net debit paid.
                    This material is for educational purposes only and does not constitute financial advice.
                </p>
            </div>
        </div>
    );
}