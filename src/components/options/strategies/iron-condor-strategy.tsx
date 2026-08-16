import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — profits as long as price stays range-bound between short strikes.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Strongly positive — time decay erodes both short wings simultaneously in your favor.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — benefits substantially when elevated implied volatility contracts.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative while profitable — risk accelerates when the underlying approaches either short strike.' },
];

export function IronCondorOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    An <strong>iron condor</strong> is a delta-neutral, defined-risk options strategy constructed by simultaneously
                    selling an out-of-the-money bull put spread below the current market price and an out-of-the-money bear call spread
                    above it, both sharing the same expiration date.
                </p>
                <p>
                    The strategy monetizes the <Jargon term="Variance Risk Premium (VRP)" definition="The structural market anomaly where implied volatility persistently exceeds subsequent realized volatility (historically occurring ~83% of the time in index options), allowing disciplined sellers to capture the difference as net yield." />.
                    Because the market can only finish in one direction at expiration, only one side of the condor can ever be at risk
                    at a time, creating a high-probability "profit tent" bounded by your short strikes.
                </p>
            </div>

            <FormulaPanel
                title="Iron Condor Payoff & Breakeven Range"
                formula="\text{Breakevens} = [K_{\text{short put}} - \text{Credit}, \quad K_{\text{short call}} + \text{Credit}]"
                legend={[
                    { label: 'Credit', value: 'Total net premium collected from both credit spreads combined' },
                    { label: 'Wing Width', value: 'Distance between short and long strikes (equal on both sides)' },
                    { label: 'Max Profit', value: 'Total Credit collected (earned if price stays between short strikes)' },
                    { label: 'Max Loss', value: 'Wing Width minus Total Credit' },
                ]}
                example={{
                    label: 'SPX $50-Wide Iron Condor Example',
                    rows: [
                        { label: 'Bull Put Spread (5600/5550)', value: 'Collect $6.00 credit' },
                        { label: 'Bear Call Spread (5900/5950)', value: 'Collect $5.00 credit' },
                        { label: 'Total Net Credit Collected', value: '$11.00 ($1,100 per contract)' },
                        { label: 'Max Risk (Wing Width - Credit)', value: '$50.00 - $11.00 = $39.00 ($3,900)' },
                    ],
                    result: { label: 'Profit Zone', value: '$5,589.00 to $5,911.00 (~322 point range)' },
                    note: 'Max profit of $1,100 is retained if SPX settles anywhere between 5600 and 5900 at expiration. Max loss is strictly capped at $3,900.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Iron Condor vs. Naked Short Strangle</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Iron Condor (Defined Risk)"
                        tone="pos"
                        items={[
                            "Risk: strictly defined by the outer protective long wings.",
                            "Buying power: lower margin requirement (only one wing width minus credit).",
                            "Suitable for: standard margin accounts, retirement accounts, and risk-averse premium sellers.",
                        ]}
                    />
                    <ComparisonCard
                        title="Short Strangle (Undefined Risk)"
                        tone="neutral"
                        items={[
                            "Risk: theoretically unlimited on both upside and downside.",
                            "Buying power: requires substantial portfolio margin reserves.",
                            "Credit: higher initial credit collected, but vulnerable to catastrophic black swan tail risk.",
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

export function IronCondorPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection (16-Delta Standard)</h4>
                <ul>
                    <li><strong>Short Strikes (16–20 Delta):</strong> place the short put and short call ~1 standard deviation away from spot price (~68–75% probability of expiring OTM).</li>
                    <li><strong>Long Wings (5–10 Delta):</strong> buy outer wings 5–10% further out to define maximum risk.</li>
                    <li><strong>Credit Rule:</strong> target collecting roughly 25–35% of the total wing width as net credit.</li>
                </ul>
                <h4>Entry Environment &amp; Timing</h4>
                <ul>
                    <li><strong>IV Rank &gt; 35%:</strong> deploy when implied volatility is elevated so premium prices are rich and expected moves are overstated.</li>
                    <li><strong>30–45 DTE:</strong> optimal theta decay acceleration zone without short-dated gamma turbulence.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for broad market indices (SPX, NDX, RUT) or liquid ETFs (SPY, QQQ) with IV Rank &gt; 35%.</li>
                    <li>Select an expiration cycle 30–45 days out.</li>
                    <li>Enter all 4 legs as a single order: Sell 16Δ Put + Buy 5Δ Put + Sell 16Δ Call + Buy 5Δ Call.</li>
                    <li>Confirm total credit is $\ge 25\%$ of wing width.</li>
                    <li>Place a GTC limit order to buy back the entire condor at 50% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Management &amp; Time Stops</h4>
                <ul>
                    <li><strong>50% Profit Target:</strong> close the trade when 50% of the maximum credit is captured. Holding for the remaining 50% exposes you to gamma spikes for diminishing return.</li>
                    <li><strong>21 DTE Rule:</strong> exit or roll the condor at 21 DTE regardless of P&amp;L to avoid high gamma assignment risk.</li>
                </ul>
                <h4>Defensive Adjustments</h4>
                <ul>
                    <li><strong>Roll the Untested Wing In:</strong> if the market drops and tests your put spread, buy back your call spread for pennies and roll it closer to spot (e.g. from 20 delta to 30 delta) to collect additional credit and widen the breakeven on the tested side.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Limit total risk across all iron condors to no more than 3–5% of total portfolio equity.</li>
                </ul>
                <h4>Common Pitfalls</h4>
                <ul>
                    <li><strong>Wings Too Narrow:</strong> trading $1-wide condors where commissions and bid-ask spread friction destroy profit margins.</li>
                    <li><strong>Trading Through Earnings on Single Stocks:</strong> deploying condors into binary earnings events where underlying gaps blow through both wings.</li>
                    <li><strong>Panic Closing Both Sides:</strong> remember that only one side can lose at a time; the opposing spread is at maximum profit.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Iron condors carry defined maximum risk. Losses can equal the wing width
                    minus net credit received if the underlying stock makes a large move past either long strike. This content is for educational purposes only.
                </p>
            </div>
        </div>
    );
}
