import { Compass, Sliders, AlertTriangle } from 'lucide-react';
import { Strategy } from '../strategy-config';
import { SectionCard } from '../strategy-visuals';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

const GREEKS = [
    { label: 'Delta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative — profits as price falls; approaches -1.00 deep ITM, creating 1:1 stock downside leverage.' },
    { label: 'Gamma', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive and peaks at-the-money — gains accelerate as the underlying stock plummets.' },
    { label: 'Theta', tone: 'text-[#BC4128] dark:text-[#E2694A]', text: 'Negative — the option decays each day, eroding value rapidly inside the final 30 days.' },
    { label: 'Vega', tone: 'text-[#1D8A70] dark:text-[#3CBF9C]', text: 'Positive — market selloffs frequently coincide with volatility spikes, boosting the put on both delta and vega.' },
];

export function LongPutOverview({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-8">
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-3">
                <p>
                    A <strong>long put</strong> gives you the right, but not the obligation, to sell an underlying asset at a
                    specified strike price before expiration. It is the premier tool for <strong>asymmetric downside leverage</strong>
                    and portfolio hedging: your maximum risk is strictly capped at the premium paid, while profit expands as the
                    underlying stock falls towards zero.
                </p>
                <p>
                    Unlike short selling shares (which requires borrowing stock, paying borrow fees, and facing unlimited upside risk),
                    buying a put defines risk upfront. Furthermore, equity markets exhibit <Jargon term="volatility skew (crashophobia)" definition="The structural market tendency for out-of-the-money put options to trade at higher implied volatility than equivalent calls, because institutional investors pay up for catastrophe insurance." /> — meaning market drops often spark rapid IV expansion that supercharges long put profits.
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
                <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 mb-3">Speculative Short vs. Tail-Risk Hedge</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    The long put serves two distinct strategic mandates depending on strike selection and portfolio role:
                </p>
                <ComparisonGrid>
                    <ComparisonCard
                        title="Directional Speculation"
                        tone="neg"
                        items={[
                            "Objective: profit from an anticipated downward move or breakdown.",
                            "Strike: ATM (~50 delta) or slightly OTM (30 delta) with 30-60 DTE.",
                            "Management: strict profit targets (50-100% gain) and stop loss (50% premium loss).",
                            "Edge: timing technical breakdowns or catalyst disappointments when IV is low.",
                        ]}
                    />
                    <ComparisonCard
                        title="Portfolio Tail-Risk Hedge"
                        tone="pos"
                        items={[
                            "Objective: protect an equity portfolio against black swan market crashes.",
                            "Strike: deep OTM (10-15 delta) index puts (e.g. SPX/SPY) with 60-120 DTE.",
                            "Management: treated as an insurance expense; rolled systematically before expiry.",
                            "Edge: massive gamma & vega explosion during severe systemic drawdowns.",
                        ]}
                    />
                </ComparisonGrid>
            </div>
        </div>
    );
}

export function LongPutPlaybook({ strategy }: { strategy: Strategy }) {
    return (
        <div className="space-y-6">
            <SectionCard title="How to Trade It" icon={Compass} tone="accent">
                <h4>Strike Selection</h4>
                <ul>
                    <li><strong>ATM (~50 delta):</strong> highest sensitivity to price action; best for high-conviction directional swing trades.</li>
                    <li><strong>OTM (20-30 delta):</strong> cost-effective speculative positioning; good risk/reward for momentum breakdowns.</li>
                    <li><strong>Deep OTM (10-15 delta):</strong> catastrophic tail-risk insurance; low cost per contract but high decay rate.</li>
                </ul>
                <h4>Time to Expiration</h4>
                <ul>
                    <li><strong>30-90 DTE:</strong> recommended for directional trades — provides time for the bearish thesis to play out with manageable theta decay.</li>
                    <li><strong>0-14 DTE:</strong> binary event plays (earnings, macro data) — explosive gamma potential, but high risk of total premium loss.</li>
                </ul>
                <h4>Entry Timing</h4>
                <ul>
                    <li>Buy puts when IV Rank is compressed (&lt;25%) — cheap implied volatility provides the essential edge for option buyers.</li>
                    <li>Look for technical breakdowns below major support levels or macro turning points.</li>
                </ul>
            </SectionCard>

            <SectionCard title="Manage the Position" icon={Sliders} tone="accent">
                <h4>Profit Taking</h4>
                <ul>
                    <li><strong>50% Rule:</strong> take profits when option premium gains 50% from entry.</li>
                    <li><strong>2x Rule:</strong> close or trim position once premium doubles (100% gain).</li>
                    <li><strong>Vol Surge Exit:</strong> take rapid profits if implied volatility spikes sharply after a market drop.</li>
                </ul>
                <h4>Loss Management &amp; Exits</h4>
                <ul>
                    <li><strong>50% Stop Loss:</strong> cut the trade if option value declines 50% from initial purchase price.</li>
                    <li><strong>Time Stop (14-21 DTE):</strong> close or roll out before the final 2 weeks to avoid terminal theta bleed.</li>
                    <li><strong>No Averaging Down:</strong> never add capital to a losing single-leg option trade.</li>
                </ul>
            </SectionCard>

            <FormulaPanel
                title="Long Put Payoff & Breakeven"
                formula="\text{Breakeven} = K - P_{\text{paid}}"
                legend={[
                    { label: 'K', value: 'Put strike price' },
                    { label: 'P_{paid}', value: 'Premium paid per share' },
                    { label: 'Max Loss', value: 'Limited strictly to P_{paid}' },
                    { label: 'Max Gain', value: '(K - P_{paid}) × 100 per contract (if stock reaches $0)' },
                ]}
                example={{
                    label: 'Worked Example',
                    rows: [
                        { label: 'Stock Price at Entry', value: '$100.00' },
                        { label: 'Strike Price (K)', value: '$95.00' },
                        { label: 'Put Premium Paid', value: '$3.00 ($300 total)' },
                    ],
                    result: { label: 'Breakeven Price', value: '$92.00' },
                    note: 'Maximum risk is $300. If the stock falls to $85 at expiration, payoff is ($95 - $85 - $3) = $7 per share ($700 net profit, +233% ROI).',
                }}
            />

            <SectionCard title="Risks & Common Mistakes" icon={AlertTriangle} tone="neg">
                <h4>Position Sizing</h4>
                <ul>
                    <li>Risk no more than 1-2% of total portfolio equity per speculative long put trade.</li>
                    <li>Size purely based on premium paid (total loss amount), not notional stock exposure.</li>
                </ul>
                <h4>Common Mistakes</h4>
                <ul>
                    <li><strong>Buying puts after the crash:</strong> purchasing high-IV puts at the bottom of a selloff, then suffering severe vol crush.</li>
                    <li><strong>Holding into expiration:</strong> letting theta decay consume all remaining option value inside the final days.</li>
                    <li><strong>Over-hedging:</strong> spending excessive portfolio capital on continuous OTM puts that drag down overall returns.</li>
                </ul>
            </SectionCard>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg p-4">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                    <strong>Risk Disclosure:</strong> Long options involve the risk of losing 100% of the premium paid if the underlying
                    does not move sufficiently in the expected direction before expiration. This information is for educational purposes only
                    and does not constitute investment advice.
                </p>
            </div>
        </div>
    );
}