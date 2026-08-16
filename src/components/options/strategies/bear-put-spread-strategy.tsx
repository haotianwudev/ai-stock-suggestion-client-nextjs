import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative — profits from falling prices; muted compared to outright long puts.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive near the long strike, flipping negative near the short strike as max gain is reached.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Mildly negative — short put theta offsets the long put daily decay rate.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Mildly positive — insulated from volatility crush compared to single-leg puts.' },
];

export function BearPutSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>bear put spread</strong> (or <em>put debit spread</em>) is a defined-risk bearish options strategy
                    constructed by purchasing an in-the-money or at-the-money put option while simultaneously selling an
                    out-of-the-money put at a lower strike price with the same expiration date.
                </p>
                <p>
                    Selling the lower strike put finances a substantial portion (typically 40–70%) of the long put's premium,
                    lowering your cash outlay and breakeven price. In exchange, maximum profit is reached if the stock falls
                    to or below the short strike at expiration. It delivers <Jargon term="cost-effective downside participation" definition="Targeting defined profits from an expected downward correction without paying the full price of elevated put option skew." />.
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
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Bear Put Spread vs. Single Long Put</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Bear Put Spread (Debit Spread)"
                        tone="neg"
                        items={[
                            "Cost: 40-70% cheaper than buying a put alone.",
                            "Breakeven: closer to spot price (Long Strike minus Net Debit).",
                            "Theta decay: reduced — short put decay counteracts long put decay.",
                            "Profit cap: capped at Strike Width minus Net Debit.",
                        ]}
                    />
                    <ComparisonCard
                        title="Single-Leg Long Put"
                        tone="neutral"
                        items={[
                            "Cost: full put premium paid upfront.",
                            "Breakeven: lower hurdle required to overcome high put skew.",
                            "Theta decay: fully exposed to rapid daily extrinsic erosion.",
                            "Profit cap: profits expand all the way down to $0.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function BearPutSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>Long Put (Higher Strike):</strong> buy an ATM or slightly ITM strike (50–60 delta) for high delta sensitivity.</li>
                    <li><strong>Short Put (Lower Strike):</strong> sell an OTM strike (20–30 delta) placed at your anticipated downside price target.</li>
                    <li><strong>Debit Budget:</strong> target a net debit between 30% and 50% of the strike width to ensure an attractive risk/reward profile.</li>
                </ul>
                <h4>Time to Expiration</h4>
                <ul>
                    <li><strong>30–60 DTE:</strong> optimal window providing sufficient duration for the bearish thesis to play out with balanced decay.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Identify a stock with deteriorating fundamentals or a technical breakdown below key support.</li>
                    <li>Select an expiration cycle 30–60 days out.</li>
                    <li>Buy the ~50-delta upper put and simultaneously sell the ~25-delta lower put as a single spread order.</li>
                    <li>Confirm that net debit is $\le 50\%$ of strike width.</li>
                    <li>Submit a GTC limit order to close at 50–75% of maximum profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>50–75% Rule:</strong> take profits once the spread captures 50–75% of maximum potential gain.</li>
                    <li><strong>Fast Drop Exit:</strong> if the stock plunges through the short strike early in the trade, take profits immediately.</li>
                </ul>
                <h4>Loss Management &amp; Exits</h4>
                <ul>
                    <li><strong>50% Debit Stop:</strong> close the spread if its market price declines by 50% from entry.</li>
                    <li><strong>Time Stop (14–21 DTE):</strong> exit if the stock has not moved downwards by 21 DTE to recover remaining extrinsic value.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Spread Payoff & Breakeven"
                formula="\text{Max Profit} = (K_{\text{long}} - K_{\text{short}}) - \text{Debit}_{\text{net}}"
                legend={[
                    { label: 'K_{long}', value: 'Higher (bought) strike price' },
                    { label: 'K_{short}', value: 'Lower (sold) strike price' },
                    { label: 'Debit_{net}', value: 'Net debit paid per share' },
                    { label: 'Breakeven', value: 'K_{long} - Debit_{net}' },
                ]}
                example={{
                    label: 'Worked Example ($5-Wide Spread)',
                    rows: [
                        { label: 'Buy $100 Put', value: '$4.00 debit' },
                        { label: 'Sell $95 Put', value: '$1.75 credit' },
                        { label: 'Net Debit Paid', value: '$2.25 ($225 per contract)' },
                    ],
                    result: { label: 'Max Profit', value: '$2.75 ($275 per contract) at or below $95' },
                    note: 'Breakeven is $97.75 ($100 - $2.25). Max risk is strictly limited to the $225 net debit paid.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Allocate no more than 2–3% of portfolio equity to any single vertical debit spread.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Overpaying for debit:</strong> paying &gt;50% of the strike width, which degrades the risk-to-reward ratio.</li>
                    <li><strong>Holding past target:</strong> letting profitable spreads ride into expiration week where delta pin risk increases.</li>
                    <li><strong>Trading illiquid names:</strong> entering spreads on low-volume strikes with wide bid-ask slippage.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Bear put spreads carry the risk of total loss of the net debit paid.
                    This information is for educational purposes only and does not constitute investment advice.
                </p>
            </div>
        </div>
    );
}