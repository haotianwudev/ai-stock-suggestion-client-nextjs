import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Delta-neutral at initiation (~0.00 delta) — stays neutral across a broad range between both strikes.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — consistent daily time decay generated from both out-of-the-money options simultaneously.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — profits as elevated implied volatility contracts towards realized historical levels.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Low initial gamma — delta risk accelerates only if the underlying approaches either strike.' },
];

export function ShortStrangleOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>short strangle</strong> is a high-probability, market-neutral options strategy constructed by selling
                    an out-of-the-money put and an out-of-the-money call at different strike prices with the same expiration date.
                </p>
                <p>
                    Unlike a straddle (which requires the price to stay pinned at a single strike), a strangle creates a wide
                    "profit valley" between the two strikes. It is the premier vehicle for <Jargon term="systematic delta-neutral premium selling" definition="Selling ~16-delta (1 standard deviation) out-of-the-money options to achieve an ~84% probability of expiring out-of-the-money, capturing the Variance Risk Premium." />.
                    In exchange for this high win rate, the strategy carries undefined tail risk if the stock makes an unprecedented move beyond the breakeven boundaries.
                </p>
            </div>

            <FormulaPanel
                title="Short Strangle Payoff & Breakeven Range"
                formula="\text{Breakevens} = [K_{\text{put}} - \text{Credit}_{\text{total}}, \quad K_{\text{call}} + \text{Credit}_{\text{total}}]"
                legend={[
                    { label: 'K_{put}', value: 'Out-of-the-money put strike' },
                    { label: 'K_{call}', value: 'Out-of-the-money call strike' },
                    { label: 'Credit_{total}', value: 'Total net premium collected (Put Premium + Call Premium)' },
                    { label: 'Max Profit', value: 'Total Credit_{total} (retained if price settles anywhere between K_{put} and K_{call})' },
                ]}
                example={{
                    label: 'SPX 16-Delta Short Strangle Example',
                    rows: [
                        { label: 'Sell 16Δ Put ($5,600 Strike)', value: '$18.00 credit' },
                        { label: 'Sell 16Δ Call ($6,000 Strike)', value: '$14.00 credit' },
                        { label: 'Total Premium Collected', value: '$32.00 ($3,200 per contract)' },
                    ],
                    result: { label: 'Profit Zone', value: '$5,568.00 to $6,032.00 (464-point profit valley)' },
                    note: 'Full $3,200 profit is retained if SPX settles anywhere between 5600 and 6000 at expiration. The trade remains profitable across a 464-point range.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Short Strangle vs. Iron Condor</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Short Strangle (Naked)"
                        tone="neutral"
                        items={[
                            "Profit potential: higher credit collected (no long protective wings dragging down yield).",
                            "Breakevens: wider profit zone than an iron condor.",
                            "Risk: undefined tail risk beyond breakevens; requires active margin management.",
                        ]}
                    />
                    <ComparisonCard
                        title="Iron Condor (Defined Risk)"
                        tone="neutral"
                        items={[
                            "Profit potential: lower net credit due to cost of buying protective long wings.",
                            "Breakevens: slightly narrower profit zone.",
                            "Risk: strictly defined maximum loss capped by outer wings; suitable for non-margin accounts.",
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

export function ShortStranglePlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection (16-Delta Rule)</h4>
                <ul>
                    <li><strong>16 Delta on Both Sides:</strong> sell the 16-delta put and 16-delta call (placing each leg ~1 standard deviation away from the spot price for a ~68–84% theoretical probability of profit).</li>
                    <li><strong>IV Rank &gt; 35%:</strong> enter when implied volatility is elevated to ensure high premium collection and wide strike buffers.</li>
                    <li><strong>45 DTE Target:</strong> optimal duration for the intersection of time decay acceleration and manageable delta shifts.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen liquid broad market index (SPX, NDX, RUT) or ETFs (SPY, QQQ) with IV Rank &gt; 35%.</li>
                    <li>Select an expiration 40–50 days out.</li>
                    <li>Sell the 16-delta put and 16-delta call simultaneously as a single strangle order.</li>
                    <li>Calculate upper and lower breakevens and ensure adequate margin cushion.</li>
                    <li>Place a GTC limit order to buy back the strangle at 50% profit.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Systematic Profit &amp; Time Exits</h4>
                <ul>
                    <li><strong>50% Profit Rule:</strong> buy back the strangle once it captures 50% of maximum profit. This dramatically boosts annual turnover and win rate.</li>
                    <li><strong>21 DTE Time Stop:</strong> close or roll the strangle at 21 DTE to avoid exponential gamma risk in the final 3 weeks.</li>
                </ul>
                <h4>Dynamic Adjustments</h4>
                <ul>
                    <li><strong>Roll Untested Leg Inward:</strong> if the stock drops toward your put, buy back the profitable call for pennies and roll it down to a higher delta (e.g. 30 delta) to collect extra credit and widen the put breakeven.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing &amp; Margin Rules</h4>
                <ul>
                    <li>Never allocate more than 15–20% of total portfolio margin to naked short strangles. Keep ample cash reserves for margin expansions.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Selling strangles on meme/biotech stocks:</strong> individual stocks can gap 50% overnight on FDA or merger news. Stick to broad indices and mega-cap ETFs.</li>
                    <li><strong>Holding past 21 DTE:</strong> gamma spikes in the final days can turn winning strangles into rapid losers.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Short strangles carry undefined risk on both the upside and downside.
                    Losses can substantially exceed initial capital during sharp market gap moves. This material is for educational purposes only.
                </p>
            </div>
        </div>
    );
}