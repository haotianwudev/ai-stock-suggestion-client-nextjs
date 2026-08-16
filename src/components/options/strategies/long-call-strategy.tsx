import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive, and rises as the stock moves further in-the-money — from ~0.50 at-the-money toward ~0.90 deep ITM.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive and peaks at-the-money — gains accelerate as the stock moves in your favor.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative — the option loses value every day, faster as expiration approaches.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — benefits from rising implied volatility, but vulnerable to a vol crush.' },
];

export function LongCallOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    The long call is the fundamental instrument for <strong>asymmetric leverage</strong> in options trading. You pay a
                    small premium for the right to profit from significant upward moves, creating a payoff where your maximum loss
                    is capped at the premium paid, but profit potential is unlimited.
                </p>
                <p>
                    Buying a call also gives you exposure to <Jargon term="implied volatility (IV)" definition="The market's forward-looking estimate of how much the underlying will move, baked into the option's price. Rising IV inflates an option's value independent of the stock price; falling IV (a 'vol crush') erodes it." /> —
                    bull markets often coincide with volatility expansion during momentum phases, giving a long call a second way to
                    profit beyond pure direction.
                </p>
            </div>

            <div>
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Greeks at a Glance</h3>
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
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Call vs. Put: The Asymmetry</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Calls and puts are mirror images mathematically, but behave differently in practice due to market structure and skew.
                </p>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Long Call — The Optimist's Bet"
                        tone="pos"
                        items={[
                            "Vega headwind: as markets rise, fear (and IV) usually subsides — you profit from delta but can lose ground on vega. “Taking the stairs up.”",
                            "Pricing advantage: due to volatility skew, OTM calls are typically cheaper than equidistant OTM puts.",
                            "Theoretical upside is unlimited, since the stock can rise indefinitely.",
                        ]}
                    />
                    <ComparisonCard
                        title="Long Put — The Pessimist's Bet"
                        tone="neg"
                        items={[
                            "Vega tailwind: as markets crash, fear and IV both spike — you profit from delta AND vega, which can produce explosive gamma squeezes. “Taking the elevator down.”",
                            "Pricing disadvantage: puts are structurally more expensive (“crashophobia”), so you need a larger move to break even.",
                            "Theoretical downside is capped, since the stock can only fall to zero.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function LongCallPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>ATM (~50 delta):</strong> balanced premium and probability, for a moderate bullish outlook.</li>
                    <li><strong>OTM (10-30 delta):</strong> cheap, high-reward "lottery ticket" strikes for momentum or breakout plays.</li>
                    <li><strong>ITM (70+ delta):</strong> a stock substitute — expensive but high-probability, for strong conviction.</li>
                </ul>
                <h4>Time to Expiration</h4>
                <ul>
                    <li><strong>0-30 DTE:</strong> high gamma and high theta — event plays (earnings, announcements), but total loss if timing is wrong.</li>
                    <li><strong>30-90 DTE:</strong> more balanced, giving a thesis time to play out with manageable decay.</li>
                </ul>
                <h4>Entry Timing</h4>
                <ul>
                    <li>Buy when IV is compressed, not elevated — cheap premium is the whole edge.</li>
                    <li>Favor technical support levels, positive catalysts, or extreme pessimism as entry triggers.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>50% rule:</strong> take profits at 50% of maximum theoretical value.</li>
                    <li><strong>2x rule:</strong> close the position once premium doubles.</li>
                    <li>Exit early if implied volatility starts collapsing, even if the stock hasn't moved much.</li>
                </ul>
                <h4>Loss Management &amp; Rolling</h4>
                <ul>
                    <li><strong>50% stop loss:</strong> cut losses if premium falls 50% from entry.</li>
                    <li>Close by 7-10 DTE to avoid accelerating gamma risk near expiration.</li>
                    <li>Roll out (more time) or roll up (higher strike) only for a net credit — never roll for a net debit.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Risk no more than 1-2% of the portfolio per trade, sized on premium paid, not notional exposure.</li>
                    <li>Avoid concentrating in correlated calls, and check liquidity before entering — wide spreads erode edge on the way out.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li>Buying expensive calls during high-IV periods, then losing to a vol crush even when right on direction.</li>
                    <li>Holding to expiration and ignoring accelerating time decay.</li>
                    <li>Overleveraging, FOMO entries after a big move already happened, and trading illiquid strikes.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Options trading involves substantial risk and is not suitable for all investors.
                    This information is for educational purposes only and does not constitute investment advice. Please consult a
                    qualified financial advisor before implementing any options strategy.
                </p>
            </div>
        </div>
    );
}
