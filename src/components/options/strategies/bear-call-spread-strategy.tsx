import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative — profits as price drops or remains below the short strike.' },
    { label: 'Gamma', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative while profitable — risk accelerates if the underlying rallies towards the short call strike.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — time decay generates steady income as long as price stays below the short strike.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — benefits when implied volatility drops after trade initiation.' },
];

export function BearCallSpreadOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>bear call spread</strong> (or <em>call credit spread</em>) is a defined-risk, income-generating strategy
                    formed by selling a lower-strike call option while simultaneously buying a higher-strike call option with the
                    same expiration date for a net credit.
                </p>
                <p>
                    Think of it as <strong>selling insurance against upward stock surges</strong>: you collect cash upfront, and the
                    long call caps your maximum possible loss. You profit in three distinct market scenarios: if the stock falls,
                    remains flat, or even drifts upward slightly, as long as it finishes below the short strike at expiration. It is
                    a cornerstone of <Jargon term="systematic credit harvesting" definition="Collecting option risk premium with defined maximum loss by selling credit spreads placed outside standard market movement expectations." />.
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
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Bear Call Spread vs. Bear Put Spread</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Bear Call Spread (Credit Spread)"
                        tone="neutral"
                        items={[
                            "Cash flow: net credit collected upfront.",
                            "Profit zone: stock falls, stays flat, or rises slightly below short strike.",
                            "Theta: positive — time decay generates daily profit.",
                            "Risk: defined (Strike Width minus Net Credit).",
                        ]}
                    />
                    <ComparisonCard
                        title="Bear Put Spread (Debit Spread)"
                        tone="neutral"
                        items={[
                            "Cash flow: net debit paid upfront.",
                            "Profit zone: requires an active downward move to cover debit.",
                            "Theta: mildly negative — time decay works against the trade.",
                            "Risk: defined strictly to initial debit paid.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function BearCallSpreadPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>Short Call (Lower Strike):</strong> sell an OTM call at 16–25 delta placed at or above major overhead resistance (~75–84% probability of expiring OTM).</li>
                    <li><strong>Long Call (Higher Strike):</strong> buy a protective call 5–10 points higher (10–15 delta) to cap upside risk.</li>
                    <li><strong>Credit Target:</strong> target collecting 25–35% of the spread width as net credit.</li>
                </ul>
                <h4>Entry Criteria</h4>
                <ul>
                    <li><strong>IV Rank &gt; 30%:</strong> high implied volatility expands call premiums, giving you a wider safety margin above spot price.</li>
                    <li><strong>30–45 DTE:</strong> optimal theta acceleration window.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Screen for stocks at technical resistance or with high IV Rank (&gt;30%).</li>
                    <li>Choose an expiration cycle 30–45 days out.</li>
                    <li>Sell the ~20-delta call and simultaneously buy the ~10-delta higher call.</li>
                    <li>Ensure net credit is 25–35% of spread width.</li>
                    <li>Place a GTC buyback order at 50% profit target.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Management</h4>
                <ul>
                    <li><strong>50% Profit Rule:</strong> buy back the spread once it captures 50% of the initial credit collected to free up collateral and avoid tail risk.</li>
                    <li><strong>21 DTE Time Stop:</strong> close or roll the position around 21 DTE to eliminate escalating gamma risk.</li>
                </ul>
                <h4>Loss Limits &amp; Adjustments</h4>
                <ul>
                    <li><strong>2x Loss Stop:</strong> close the trade if the spread cost reaches 2x the initial credit received.</li>
                    <li><strong>Roll Up and Out:</strong> if tested, roll to higher strikes and a later expiration month for a net credit.</li>
                    <li><strong>Ex-Dividend Vigilance:</strong> beware of dividend risk if the short call becomes in-the-money before an ex-dividend date.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Spread Payoff & Breakeven"
                formula="\text{Breakeven} = K_{\text{short}} + \text{Credit}_{\text{net}}"
                legend={[
                    { label: 'K_{short}', value: 'Lower (sold) strike price' },
                    { label: 'K_{long}', value: 'Higher (bought) strike price' },
                    { label: 'Credit_{net}', value: 'Net premium received per share' },
                    { label: 'Max Loss', value: '(K_{long} - K_{short}) - Credit_{net}' },
                ]}
                example={{
                    label: 'Worked Example ($5-Wide Spread)',
                    rows: [
                        { label: 'Sell $105 Call', value: '$2.00 credit' },
                        { label: 'Buy $110 Call', value: '$0.60 debit' },
                        { label: 'Net Credit Received', value: '$1.40 ($140 per contract)' },
                    ],
                    result: { label: 'Max Profit', value: '$1.40 ($140 per contract) at or below $105' },
                    note: 'Breakeven is $106.40 ($105 + $1.40). Max loss is capped at $3.60 ($5.00 width - $1.40 credit = $360 per contract).',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Limit risk to 1–2% of account equity per vertical credit spread position.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Selling calls into strong momentum breakouts:</strong> trying to pick tops in roaring bull markets.</li>
                    <li><strong>Over-allocating to correlated tech calls:</strong> suffering simultaneous losses across multiple spreads during market rallies.</li>
                    <li><strong>Early assignment on ITM calls:</strong> ignoring early assignment risk on high-dividend stocks.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Bear call spreads carry defined maximum risk. Losses can equal the full spread width
                    minus credit received if the underlying stock rallies through both strikes. This material is for educational purposes only.
                </p>
            </div>
        </div>
    );
}