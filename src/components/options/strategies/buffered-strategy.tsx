import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const BUFFER_ELEMENTS = [
    { label: 'Long Stock / ETF', desc: 'Provides core underlying equity exposure and dividend flow.' },
    { label: 'Long Put (ATM / Near-ATM)', desc: 'Initiates immediate downside protection starting at the entry price.' },
    { label: 'Short Put (OTM Buffer Boundary)', desc: 'Ends the buffer zone and re-exposes downside, financing the long put.' },
    { label: 'Short Call (The Cap)', desc: 'Caps upside gains to achieve an exact zero net debit cost.' },
];

export function BufferedOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>buffered strategy</strong> (the structural architecture behind popular <em>Defined Outcome ETFs</em>)
                    is a 4-legged equity overlay that absorbs the first 10–20% of market losses while capping gains at a predetermined ceiling.
                </p>
                <p>
                    It combines long stock with a <Jargon term="put spread collar" definition="Buying an at-the-money put and selling an out-of-the-money put to create a protected 'buffer zone', financed by selling an out-of-the-money call." />.
                    This structure guarantees that if the market drops anywhere within the buffer zone over the holding period, your account
                    suffers 0% loss, providing institutional-grade risk shielding for wealth preservation and retirement portfolios.
                </p>
            </div>

            <FormulaPanel
                title="Defined Outcome Architecture"
                formula="\text{Buffer Zone} = [K_{\text{short put}}, K_{\text{long put}}], \quad \text{Max Gain} = K_{\text{call}} - S_0"
                legend={[
                    { label: 'K_{long put}', value: 'ATM strike where downside protection begins' },
                    { label: 'K_{short put}', value: 'Lower strike where buffer ends and risk resumes' },
                    { label: 'K_{call}', value: 'Upper strike capping maximum upside profit' },
                ]}
                example={{
                    label: '15% Buffer with 12% Cap ($100 Stock)',
                    rows: [
                        { label: 'Long Stock + Long $100 Put', value: 'Protected against drop below $100' },
                        { label: 'Sell $85 Put (Buffer Limit)', value: 'Finances put purchase; risk resumes below $85' },
                        { label: 'Sell $112 Call (Upside Cap)', value: 'Finances remaining cost → Zero Net Debit' },
                    ],
                    result: { label: 'Defined Outcome', value: '0% loss between $85 and $100; max gain +12% above $112' },
                    note: 'If the market falls 10% to $90, your return is 0%. If the market falls 25% to $75, your loss is only -10% ($85 - $75).',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">The 4 Structural Building Blocks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {BUFFER_ELEMENTS.map((elem) => (
                        <div key={elem.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5">
                            <p className="font-semibold text-xs text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider mb-1">{elem.label}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{elem.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Buffered Strategy vs. Standard Collar</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Buffered Strategy (Put Spread Collar)"
                        tone="pos"
                        items={[
                            "Protection zone: absorbs the first 10-20% of losses (the most frequent correction magnitude).",
                            "Upside Cap: higher cap allowed because the short put finances a large portion of the long put.",
                            "Tail risk: risk resumes below the buffer boundary (e.g. below -15%).",
                        ]}
                    />
                    <ComparisonCard
                        title="Standard Collar (Single Put)"
                        tone="neutral"
                        items={[
                            "Protection zone: absorbs 100% of losses below a chosen strike all the way to $0.",
                            "Upside Cap: lower cap required to finance an unhedged long put.",
                            "Tail risk: zero tail risk below the put strike.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function BufferedPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection (1-Year Outcome Period)</h4>
                <ul>
                    <li><strong>Long Put (ATM):</strong> buy a 100% strike put (0.50 delta) to immediately protect against any downward correction.</li>
                    <li><strong>Short Put (OTM Buffer Boundary):</strong> sell an 85–90% strike put (0.15–0.25 delta) to establish a 10–15% buffer.</li>
                    <li><strong>Short Call (OTM Cap):</strong> sell an out-of-the-money call (e.g. 110–115% strike) priced to make the net options package cost $0.</li>
                </ul>
                <h4>Holding Duration</h4>
                <ul>
                    <li><strong>1 Year (365 DTE):</strong> defined outcome characteristics are calibrated to mature at expiration. Intra-period values fluctuate with market volatility.</li>
                </ul>
                <h4>Step-by-Step Execution</h4>
                <ol>
                    <li>Hold index ETF shares (e.g., SPY, QQQ).</li>
                    <li>Select a 1-year expiration cycle.</li>
                    <li>Buy the ATM put, sell the buffer-boundary put, and sell the financing call as a single 3-way combination order.</li>
                    <li>Verify net debit is $0.00 (Zero-Cost).</li>
                    <li>Hold through the annual outcome cycle and rebalance at expiration.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Outcome Period Management</h4>
                <ul>
                    <li><strong>Hold to Expiration:</strong> the mathematical buffer guarantees apply strictly at the expiration date; avoid panic-selling during mid-cycle drawdowns.</li>
                    <li><strong>Annual Reset / Roll:</strong> at the end of the 1-year cycle, close expiring options and reset strikes around the new current market price.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Worked Example: Market Scenarios at 1-Year Expiration"
                formula="\text{P\&L} = \begin{cases} \text{Cap} & \text{if } S_T \ge K_{\text{call}} \\ S_T - S_0 & \text{if } K_{\text{long put}} < S_T < K_{\text{call}} \\ 0\% & \text{if } K_{\text{short put}} \le S_T \le K_{\text{long put}} \\ (S_T - K_{\text{short put}}) & \text{if } S_T < K_{\text{short put}} \end{cases}"
                legend={[
                    { label: 'Entry Price', value: '$100.00 with 15% Buffer ($85) and 12% Cap ($112)' },
                ]}
                example={{
                    label: 'Scenario Comparison',
                    rows: [
                        { label: 'Bull Rally (+20% to $120)', value: '+12% Return ($112 Cap hit)' },
                        { label: 'Moderate Gain (+8% to $108)', value: '+8% Return (Full participation)' },
                        { label: 'Correction (-10% to $90)', value: '0% Return (Buffer absorbs full 10% loss)' },
                        { label: 'Severe Crash (-30% to $70)', value: '-15% Return ($85 - $70, saving 15% in losses)' },
                    ],
                    result: { label: 'Optimal Market Fit', value: 'Outperforms standard equities in flat, choppy, or moderate bear markets' },
                    note: 'The strategy delivers complete peace of mind across normal market correction regimes.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Risks &amp; Considerations</h4>
                <ul>
                    <li><strong>Tail Risk Beyond Buffer:</strong> losses beyond the buffer (e.g. below -15%) are fully absorbed by the investor.</li>
                    <li><strong>Mid-Period Volatility:</strong> before expiration, the position will show partial drawdown due to delta and option pricing dynamics.</li>
                    <li><strong>Capped Upside:</strong> misses out on runaway bull market gains above the short call strike.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Buffered strategies provide downside protection only within the defined buffer zone.
                    Losses beyond the buffer are uncapped down to zero. This content is for educational purposes only.
                </p>
            </div>
        </div>
    );
}