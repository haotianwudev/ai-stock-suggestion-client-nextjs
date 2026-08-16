import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const WHEEL_STEPS = [
    { n: 1, title: 'Sell Cash-Secured Puts', text: 'Generate income while waiting for potential stock assignment.' },
    { n: 2, title: 'Get Assigned Stock', text: 'Acquire shares at your chosen strike price.' },
    { n: 3, title: 'Sell Covered Calls', text: 'Generate income on the newly-acquired stock position.' },
];

export function CoveredCallOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>covered call</strong> combines owning at least 100 shares of the underlying with selling a call
                    option against that stock. You collect the option's premium upfront in exchange for capping your upside at
                    the strike price — sometimes called the "rent collection" strategy, since you're renting out the stock's
                    upside for immediate income.
                </p>
                <p>
                    It's popular with income-focused holders because it can add <Jargon term="1-3% monthly" definition="A commonly cited rule-of-thumb premium yield for at-the-money-ish covered calls on liquid names — actual yield varies heavily with implied volatility and strike distance, and is not guaranteed." /> in
                    premium on top of any dividends, at the cost of giving up gains beyond the strike.
                </p>
            </div>

            <FormulaPanel
                title="Put-Call Parity"
                formula="C + PV(K) = P + S"
                legend={[
                    { label: 'C', value: 'Call price' },
                    { label: 'PV(K)', value: 'Present value of the strike' },
                    { label: 'P', value: 'Put price' },
                    { label: 'S', value: 'Stock price' },
                ]}
                example={{
                    label: 'What It Means',
                    rows: [
                        { label: 'Covered Call', value: 'Long stock + short call (S − C)' },
                        { label: 'Cash-Secured Put', value: 'Cash + short put (PV(K) − P)' },
                    ],
                    result: { label: 'Payoff shape', value: 'Identical' },
                    note: 'This is why a covered call and a naked short put at the same strike and expiration have the same risk profile, despite looking structurally different.',
                }}
            />

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Covered Call vs. Cash-Secured Put</h3>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Covered Call"
                        tone="neutral"
                        items={[
                            "Starting position: own the stock, then sell a call against it.",
                            "Capital required: higher (full cost of the shares).",
                            "Dividends: received directly, since you own the stock.",
                        ]}
                    />
                    <ComparisonCard
                        title="Cash-Secured Put"
                        tone="neutral"
                        items={[
                            "Starting position: hold cash as collateral, then sell a put.",
                            "Capital required: lower (cash collateral only).",
                            "Dividends: priced into the put premium, not received directly.",
                        ]}
                    />
                </ComparisonGrid>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">The Wheel Strategy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Covered calls are the second phase of the "Wheel": cycle between selling puts and, once assigned, selling calls
                    against the resulting stock — a continuous income loop of put premiums, call premiums, and dividends.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {WHEEL_STEPS.map((s) => (
                        <div key={s.n} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
                            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 font-mono text-sm font-bold text-[#A8672E] dark:text-[#D08F52]">
                                {s.n}
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{s.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{s.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CoveredCallPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>At-the-money:</strong> highest premium, but immediate upside limitation — best for a neutral, income-focused outlook.</li>
                    <li><strong>Out-of-the-money (5-10% above spot):</strong> lower premium but room for the stock to appreciate.</li>
                    <li><strong>Delta-based (20-30 delta):</strong> a common balance of premium income and assignment probability.</li>
                </ul>
                <h4>Entry Criteria</h4>
                <ul>
                    <li>Own at least 100 shares in round lots; IV rank above 25% for adequate premium.</li>
                    <li>30-45 DTE is the typical sweet spot for theta decay.</li>
                </ul>
                <h4>Step-by-Step</h4>
                <ol>
                    <li>Identify a stock position suitable for covered calls.</li>
                    <li>Check IV rank ({'>'}25% preferred).</li>
                    <li>Select a strike 5-10% above the current price.</li>
                    <li>Choose an expiration 30-45 days out.</li>
                    <li>Sell the call and collect the premium.</li>
                </ol>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Management</h4>
                <ul>
                    <li><strong>Profit target:</strong> close at 50% of maximum profit.</li>
                    <li><strong>Rolling up:</strong> roll to a higher strike when the position is profitable and you want continued upside.</li>
                    <li><strong>Time stop:</strong> close by 21 DTE to avoid accelerating gamma risk near expiration.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Assignment Example"
                formula="\text{Total Return} = (K - S_0) + C"
                legend={[
                    { label: 'K', value: 'Strike price' },
                    { label: 'S_0', value: 'Stock price at entry' },
                    { label: 'C', value: 'Call premium collected' },
                ]}
                example={{
                    label: 'Worked Example',
                    rows: [
                        { label: 'S_0', value: '$95' },
                        { label: 'K', value: '$100' },
                        { label: 'C', value: '$2' },
                    ],
                    result: { label: 'Total Return', value: '$7' },
                    note: 'Own stock at $95, sell the $100 call for $2. If assigned: $5 appreciation + $2 premium = $7 total return.',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <ul>
                    <li><strong>Downside isn't protected:</strong> a covered call carries the same downside risk as owning the stock outright, offset only by the premium collected.</li>
                    <li><strong>Quality-only rule:</strong> only write calls on stocks you're genuinely happy to own or sell at the strike — don't chase premium on names you wouldn't otherwise hold.</li>
                    <li>Diversify across positions rather than concentrating covered calls in a single stock or sector.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Covered call writing is suitable only for investors who own the underlying stock.
                    While premium income is generated, upside potential is limited and downside risk remains substantial. This
                    information is for educational purposes only and does not constitute investment advice. Please consult a
                    qualified financial advisor before implementing any options strategy.
                </p>
            </div>
        </div>
    );
}
