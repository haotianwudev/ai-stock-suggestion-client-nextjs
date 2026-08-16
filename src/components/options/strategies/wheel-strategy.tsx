import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const WHEEL_STAGES = [
    {
        stage: 1,
        title: 'Sell Cash-Secured Put',
        badge: 'Put Phase',
        desc: 'Sell an OTM put (16-30 delta) on a quality stock and collect premium. If it expires worthless, keep the cash and repeat.',
    },
    {
        stage: 2,
        title: 'Assignment & Acquisition',
        badge: 'Transition',
        desc: 'If assigned below the strike, purchase 100 shares with your reserved cash at an effective discount (Strike minus Put Premium).',
    },
    {
        stage: 3,
        title: 'Sell Covered Call',
        badge: 'Call Phase',
        desc: 'Sell an OTM call (20-30 delta) at or above cost basis. Collect call premium + dividends while waiting for shares to be called away.',
    },
];

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Mildly positive across both phases — gains from upward/flat stock movement.' },
    { label: 'Theta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Consistently positive — time decay acts as the primary compounding engine.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Negative — benefits when implied volatility contracts after premium collection.' },
    { label: 'Income', tone: 'text-[#A8672E] dark:text-[#D08F52]', text: 'Triple stream: put premiums + call premiums + quarterly stock dividends.' },
];

export function WheelOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    The <strong>Wheel Strategy</strong> (also known as the <em>Triple Income Engine</em>) is a systematic,
                    mechanical options methodology designed for long-term income investors. It cycles continuously between
                    selling cash-secured puts to acquire high-quality equities at a discount, and selling covered calls to
                    monetize those shares until they are called away at a profit.
                </p>
                <p>
                    The engine harvests three distinct cash flows: <strong>put premiums</strong>, <strong>call premiums</strong>,
                    and <strong>underlying dividends</strong>. Each cycle reduces your <Jargon term="net cost basis" definition="The effective purchase price of the stock after subtracting all accumulated put premiums, call premiums, and dividends collected over time." />, providing an expanding cushion against downside fluctuations.
                </p>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">The 3-Phase Lifecycle</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {WHEEL_STAGES.map((s) => (
                        <div key={s.stage} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 font-mono text-xs font-bold text-[#A8672E] dark:text-[#D08F52]">
                                    {s.stage}
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                    {s.badge}
                                </span>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{s.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 flex-1 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Wheel Phases: Comparative Mechanics</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Phase 1: Cash-Secured Put"
                        tone="neutral"
                        items={[
                            "Capital state: 100% cash in interest-bearing money market.",
                            "Action: sell 16-30 delta put 30-45 DTE.",
                            "Objective: collect premium yield or acquire shares at discount.",
                            "Exit: close at 50% profit, or accept assignment if ITM.",
                        ]}
                    />
                    <ComparisonCard
                        title="Phase 2: Covered Call"
                        tone="neutral"
                        items={[
                            "Capital state: 100 shares owned from assignment.",
                            "Action: sell 20-30 delta call at/above adjusted cost basis.",
                            "Objective: collect call premium + dividends while holding.",
                            "Exit: close at 50% profit, or let shares get called away for capital gain.",
                        ]}
                    />
                </ComparisonGrid>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Greeks &amp; Return Profile</h3>
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

export function WheelPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Stock Selection Criteria</h4>
                <ul>
                    <li><strong>Fundamental Quality:</strong> blue-chip, profitable companies with robust balance sheets (e.g., AAPL, MSFT, GOOGL) or broad ETFs (SPY, QQQ).</li>
                    <li><strong>Dividend Yield:</strong> prefer stocks paying 1.5-3% dividend yield to monetize Phase 2 holding periods.</li>
                    <li><strong>Golden Rule of Underlyers:</strong> NEVER wheel a stock you would not be happy to own for the next 5 years.</li>
                </ul>
                <h4>Strike Selection &amp; Execution</h4>
                <ul>
                    <li><strong>Puts (Phase 1):</strong> sell 16-25 delta puts (~75-84% probability of expiring OTM) at 30-45 DTE.</li>
                    <li><strong>Calls (Phase 2):</strong> sell 20-30 delta calls at or above your <em>adjusted cost basis</em>. Never sell a strike below cost basis.</li>
                </ul>
                <h4>Step-by-Step Cycle</h4>
                <ol>
                    <li>Hold cash in interest-bearing collateral and sell a 30-45 DTE cash-secured put.</li>
                    <li>If unassigned, collect 50% profit and sell the next monthly put.</li>
                    <li>If assigned, take delivery of 100 shares and record your net cost basis (Strike minus Put Premium).</li>
                    <li>Immediately sell a 30-45 DTE covered call at or above that cost basis.</li>
                    <li>When called away, lock in the total capital gain + all accumulated premiums, and return to Step 1.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Management</h4>
                <ul>
                    <li><strong>50% Profit Rule:</strong> close short options at 50% of maximum profit to free up capital and reset theta decay.</li>
                    <li><strong>21 DTE Rule:</strong> roll or close open options at 21 DTE to avoid accelerating gamma risk near expiration.</li>
                    <li><strong>Roll for Net Credit Only:</strong> if tested, roll out to a later expiration for a net credit. Never pay a net debit to roll.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Adjusted Cost Basis & Total Return"
                formula="\text{Adjusted Cost Basis} = K_{\text{put}} - \sum P_{\text{put}} - \sum P_{\text{call}} - \sum \text{Dividends}"
                legend={[
                    { label: 'K_{put}', value: 'Initial put assignment strike price' },
                    { label: 'P_{put}, P_{call}', value: 'All option premiums collected across cycles' },
                    { label: 'Dividends', value: 'Quarterly dividends received while holding shares' },
                ]}
                example={{
                    label: 'Worked Wheel Cycle',
                    rows: [
                        { label: 'Put Assignment Strike', value: '$100.00 (collected $2.50 put premium)' },
                        { label: 'Initial Cost Basis', value: '$97.50' },
                        { label: 'Covered Call Sold', value: '$105.00 strike (collected $2.00 call premium)' },
                        { label: 'Dividends Collected', value: '$0.50' },
                        { label: 'Adjusted Cost Basis', value: '$95.00' },
                    ],
                    result: { label: 'Total Profit upon Assignment at $105', value: '$1,000 ($10.00/share = +10.5% return)' },
                    note: 'Total return consists of $5.00 capital gain ($105 - $100) + $4.50 options premium + $0.50 dividend = $10.00 per share.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Key Risks</h4>
                <ul>
                    <li><strong>Severe Bear Market / Gap Down:</strong> if a stock drops 40%, you hold shares at an unrecovered cost basis.</li>
                    <li><strong>Opportunity Cost:</strong> if a stock rallies 50% overnight, your gains are capped at the covered call strike.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Wheeling High-IV Meme Stocks:</strong> chasing 10% monthly yields on dying businesses that suffer permanent capital loss.</li>
                    <li><strong>Selling Calls Below Cost Basis:</strong> locking in a permanent capital loss out of impatience.</li>
                    <li><strong>Neglecting Cash Reserves:</strong> deploying 100% of cash into single puts without dry powder for laddered entries.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> The Wheel Strategy involves owning equities and selling options. Downside risk is
                    equivalent to stock ownership and upside is capped during the call phase. This content is for educational purposes only.
                </p>
            </div>
        </div>
    );
}