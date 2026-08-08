'use client';

import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Helper Components for UI ---

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle, icon, color = 'gray' }: { title: string; subtitle: string; icon: string; color?: string }) => (
  <div className={`p-6 bg-${color}-500 dark:bg-${color}-700 text-white`}>
    <div className="flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </div>
  </div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 space-y-4 flex-grow">
    {children}
  </div>
);

const InfoRow = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
  <div className={`flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    <p className="font-semibold text-gray-700 dark:text-gray-300 w-2/5">{label}</p>
    <p className="text-gray-600 dark:text-gray-400 text-right w-3/5">{value}</p>
  </div>
);

const RationaleBox = ({ children, title = "Rationale" }: { children: React.ReactNode; title?: string }) => (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
    </div>
);

const CriticalDecisionBox = ({ children, title = "Critical Decision" }: { children: React.ReactNode; title?: string }) => (
    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/40 border-l-4 border-amber-500 rounded-r-lg">
        <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">{title}</h4>
        <p className="text-sm text-amber-700 dark:text-amber-400">{children}</p>
    </div>
);

const AdvancedRuleBox = ({ children, title = "Advanced Rules" }: { children: React.ReactNode; title?: string }) => (
    <div className="mt-4 p-4 bg-sky-50 dark:bg-sky-900/40 border-l-4 border-sky-500 rounded-r-lg">
        <h4 className="font-bold text-sky-800 dark:text-sky-300 mb-2">{title}</h4>
        <p className="text-sm text-sky-700 dark:text-sky-400">{children}</p>
    </div>
);

// --- Main Infographic Sections ---

const DefensivePutRoll = () => (
  <Card>
    <CardHeader
      title="Defensive Put Roll"
      subtitle="Managing a Challenged Short Put"
      icon="🛡️"
      color="red"
    />
    <CardBody>
      <InfoRow label="Maneuver" value="Roll Down & Out" />
      <InfoRow label="When Price" value="Falls toward/below strike" />
      <InfoRow label="Delta Trigger" value="Reaches ~ -0.35 to -0.50" />
      <InfoRow label="DTE Trigger" value="≤ 21 Days to Expiration" />
      <InfoRow label="Core Rule" value="MUST collect a Net Credit" />
      <RationaleBox>
        Lowers the breakeven price, giving the stock more room to fall. Buys more time for the original bullish thesis to play out and avoids gamma risk near expiration.
      </RationaleBox>
      <CriticalDecisionBox title="Point of No Return">
        If a credit roll is impossible (deep ITM), choose: 1) Accept Assignment if thesis holds, or 2) Close for a Loss if thesis is broken.
      </CriticalDecisionBox>
    </CardBody>
  </Card>
);

const OffensivePutRoll = () => (
  <Card>
    <CardHeader
      title="Offensive Put Roll"
      subtitle="Capitalizing on a Profitable Short Put"
      icon="⚔️"
      color="green"
    />
    <CardBody>
      <InfoRow label="Maneuver" value="Roll Up & Out" />
      <InfoRow label="When Price" value="Rises significantly" />
      <InfoRow label="Profit Trigger" value="Captured 80-90% of max profit" />
      <InfoRow label="Delta State" value="Delta is very low (near zero)" />
      <InfoRow label="Core Rule" value="New premium should be substantial" />
      <RationaleBox>
        Redeploys capital more efficiently. The original position has little premium left to decay (&ldquo;dead money&rdquo;). Rolling puts the capital back to work.
      </RationaleBox>
      <AdvancedRuleBox>
        Consider a &ldquo;3x Premium Rule&rdquo; where the new premium is &gt;3x the cost to close. Or, ensure the new position meets a minimum annualized Return on Capital.
      </AdvancedRuleBox>
    </CardBody>
  </Card>
);

const DefensiveCallRoll = () => (
  <Card>
    <CardHeader
      title="Defensive Call Roll"
      subtitle="Managing a (Covered) Call"
      icon="🛡️"
      color="red"
    />
    <CardBody>
      <InfoRow label="Maneuver" value="Roll Up & Out" />
      <InfoRow label="When Price" value="Rises toward/above strike" />
      <InfoRow label="Delta Trigger" value="Reaches ~ 0.35 to 0.50" />
      <InfoRow label="DTE Trigger" value="≤ 21 Days to Expiration" />
      <InfoRow label="Core Rule" value="Roll for credit to avoid assignment" />
      <RationaleBox>
        Primarily used to avoid having shares called away. A small debit may be acceptable if retaining the stock is the absolute priority and potential stock gains outweigh the cost.
      </RationaleBox>
      <CriticalDecisionBox title="Deep ITM Covered Call">
        If a credit roll is difficult, the best action is often to do nothing and allow assignment. This realizes the maximum profit for the covered call strategy.
      </CriticalDecisionBox>
    </CardBody>
  </Card>
);

const OffensiveCallRoll = () => (
  <Card>
    <CardHeader
      title="Offensive Call Roll"
      subtitle="Capitalizing on a Profitable Short Call"
      icon="⚔️"
      color="green"
    />
    <CardBody>
      <InfoRow label="Maneuver" value="Roll Down & Out" />
      <InfoRow label="When Price" value="Falls significantly" />
      <InfoRow label="Profit Trigger" value="Captured 80-90% of max profit" />
      <InfoRow label="Delta State" value="Delta is very low (near zero)" />
      <InfoRow label="Core Rule" value="New strike has higher Theta" />
      <RationaleBox title="Rationale: Active Theta Harvesting">
        As a call moves deep OTM, its time decay (Theta) slows. Rolling down to a strike closer to the price sells a new option with a much faster rate of decay, maximizing income per unit of time.
      </RationaleBox>
    </CardBody>
  </Card>
);

const UniversalPrinciples = () => (
    <Card className="md:col-span-2 lg:col-span-4 bg-gray-50 dark:bg-gray-900 border border-blue-500">
        <CardHeader
            title="Universal Rolling Principles"
            subtitle="The Non-Negotiable Rules for All Rolls"
            icon="⚖️"
            color="blue"
        />
        <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-2">1. Thesis Validity Check</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        <strong>Ask:</strong> Is my original reason for this trade still valid?
                        <br />
                        <strong>Rule:</strong> Only roll if your outlook on the asset is unchanged. If the thesis is broken, close the trade and take the loss.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-red-600 dark:text-red-400 mb-2">2. The Net Credit Mandate (Defense)</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        <strong>Ask:</strong> Am I getting paid to take on this new risk?
                        <br />
                        <strong>Rule:</strong> A defensive roll MUST be for a net credit. This lowers your breakeven point, which is the mathematical key to repairing a trade.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-yellow-600 dark:text-yellow-400 mb-2">3. Volatility (Vega) Awareness</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        <strong>Ask:</strong> Is the volatility environment helping me?
                        <br />
                        <strong>Rule:</strong> Rolling is easiest when IV is high (e.g., IV Rank &gt; 50). High IV inflates the premium you collect, making it easier to get a good credit.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-purple-600 dark:text-purple-400 mb-2">4. DTE & Gamma Risk</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        <strong>Ask:</strong> Am I too close to expiration?
                        <br />
                        <strong>Rule:</strong> Proactively manage positions at or before 21 DTE. This avoids the accelerated time decay and unpredictable price sensitivity (gamma) of the final weeks.
                    </p>
                </div>
                 <div className="md:col-span-2">
                    <h4 className="font-bold text-lg text-teal-600 dark:text-teal-400 mb-2">5. Capital Efficiency Question</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        <strong>Ask:</strong> Is this the best use of my capital right now?
                        <br />
                        <strong>Rule:</strong> View a roll not as saving an old trade, but as an active decision to enter a *new* one. Compare its risk/reward to other opportunities. Never roll just to avoid admitting a mistake.
                    </p>
                </div>
            </div>
        </CardBody>
    </Card>
);

// --- Main App Component ---

export default function StrategicFrameworkRollingOptions() {
  return (
    <ArticleFrame
      slug="strategic-framework-rolling-options-quantitative-approach"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors."
    >
      <div className="max-w-5xl mx-auto px-4 text-gray-900 dark:text-gray-100">
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
          A quantitative approach to managing option positions through defensive and offensive rolling strategies.
        </p>

        <InfographicSlot alt="Strategic Framework for Rolling Options - Comprehensive Visual Guide" />

        <div className="space-y-12 mt-12">

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Introduction</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The management of an options position throughout its lifecycle is as critical as the initial trade selection. Among the various management techniques available to a trader, &ldquo;rolling&rdquo; a position stands out as a uniquely flexible tool for adapting to changing market conditions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At its core, rolling is a tactical maneuver that allows a trader to modify the terms of an existing position without fully exiting the trade. This comprehensive guide explores the foundational principles that govern all rolling decisions, creating the theoretical bedrock for specific defensive and offensive strategies.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-500 p-4 my-6">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">What is Rolling?</h4>
                <p className="text-blue-700 dark:text-blue-300">
                  To roll an options position is to simultaneously close an existing contract and open a new one on the same underlying security. This action allows a trader to alter the strike price, expiration date, or both.
                </p>
              </div>
            </div>
          </section>

          {/* Universal Principles Interactive Section */}
          <section id="universal-principles" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Universal Principles</h2>
            <UniversalPrinciples />
          </section>

          {/* Defensive Rolling */}
          <section id="defensive-rolling" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Defensive Rolling: Managing Challenged Positions</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Defensive rolling is a reactive strategy employed when a position is challenged by adverse price movement in the underlying asset. It is a tactic born of necessity, used when a trade is losing or at risk of assignment.
              </p>
              <div className="bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 p-4 my-6">
                <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Key Objectives</h4>
                <ul className="text-red-700 dark:text-red-300 list-disc list-inside">
                  <li>Risk mitigation and loss management</li>
                  <li>Buying more time for the original thesis to play out</li>
                  <li>Lowering the breakeven point of the trade</li>
                  <li>Avoiding assignment when undesirable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Offensive Rolling */}
          <section id="offensive-rolling" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Offensive Rolling: Optimizing Profitable Positions</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Offensive rolling is a proactive strategy executed when a position is performing well and is profitable. The goals here are not of survival but of optimization.
              </p>
              <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-500 p-4 my-6">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Key Objectives</h4>
                <ul className="text-green-700 dark:text-green-300 list-disc list-inside">
                  <li>Lock in existing gains while extending profit potential</li>
                  <li>Improve capital efficiency</li>
                  <li>Reset the trade&apos;s risk-reward profile</li>
                  <li>Maximize theta decay and income generation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Interactive Guide */}
          <section id="interactive-guide" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
              Interactive Rolling Strategy Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Put Options Section */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4 text-center border-b-2 border-green-500 pb-2">Short Put Strategies</h3>
                <div className="grid grid-cols-1 gap-8 mt-6">
                  <DefensivePutRoll />
                  <OffensivePutRoll />
                </div>
              </div>

              {/* Call Options Section */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4 text-center border-b-2 border-red-500 pb-2">Short Call Strategies</h3>
                <div className="grid grid-cols-1 gap-8 mt-6">
                  <DefensiveCallRoll />
                  <OffensiveCallRoll />
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework */}
          <section id="decision-framework" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Decision Framework: Roll, Close, or Hold?</h2>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The choice to roll, close, or hold is the defining moment in active option management. This decision should not be arbitrary but guided by a disciplined, three-part assessment: <strong>Thesis Validity</strong>, <strong>Adjustment Economics</strong>, and <strong>Time Horizon &amp; Volatility</strong>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Scenario</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thesis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Optimal Action</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Stock moves against, strike breached</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Intact</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Losing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Defensive Roll (Credit)</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Thesis holds; collect credit to lower breakeven</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Stock moves against, strike breached</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Broken</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Losing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Close Position</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Reason for trade is gone. Accept loss</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Position hits max loss (2-3x credit)</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Irrelevant</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Max Loss</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Close Position</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Enforce risk management. Prevent catastrophic loss</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Stock moves strongly in favor</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Intact</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Profitable (&gt;80%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Offensive Roll (Credit)</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Redeploy capital efficiently at better strike</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Slightly profitable/flat near expiry</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Intact</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Near Breakeven</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Hold or Roll Out</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Let theta work or roll for more time if credit available</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Deeply OTM near expiry</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Irrelevant</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">Losing (near max)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600 dark:text-cyan-400">Let Expire / Close</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Unlikely to recover. Avoid transaction costs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 dark:bg-amber-900/40 border-l-4 border-amber-500 p-6">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">The 80% Rule for Offensive Rolls</h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                A widely used rule of thumb is to consider rolling when you&apos;ve captured <strong>80% or more</strong> of the initial premium. At this point, the remaining profit may not justify the risk or capital being used.
              </p>
            </div>

            <div className="mt-6 bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 p-6">
              <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Maximum Loss Rule</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                When a position reaches a loss of <strong>2-3x the initial credit received</strong>, it should be closed regardless of thesis validity. This prevents catastrophic losses and enforces disciplined risk management.
              </p>
            </div>
          </section>

          {/* Pre-Roll Checklist */}
          <section id="pre-roll-checklist" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pre-Roll Checklist</h2>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Before executing any roll, an option writer should conduct a final review. This disciplined checklist helps remove emotion and ensures the decision is economically sound.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Thesis Validity</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Is my original thesis for this trade still 100% valid?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Motivation Assessment</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Am I rolling to repair a viable position (defensive) or to avoid taking a necessary loss (psychological)?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Credit Requirement</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Can this roll be executed for a meaningful net credit?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Breakeven Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Have I calculated the new breakeven point, and does it represent a significant improvement?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fresh Trade Test</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Does the new risk/reward profile represent a trade I would willingly enter today?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Volatility Environment</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Have I considered the current implied volatility environment and my new Vega exposure?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Transaction Costs</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Is the credit from the roll sufficient to overcome all transaction costs?</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Concepts */}
          <section id="advanced-concepts" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Advanced Rolling Concepts</h2>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">The Greeks as Decision Triggers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Delta Triggers</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Delta serves as an objective proxy for probability. When a short put reaches -0.35 to -0.50 delta, it indicates the position is moving against you and requires attention.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Rule:</strong> Use delta thresholds to trigger management decisions rather than relying on emotions or arbitrary price levels.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vega Considerations</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Rolling is most favorable when implied volatility is high. High IV inflates the premium you collect, making it easier to achieve the required net credit.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Rule:</strong> Prefer rolling when IV Rank &gt; 50. Avoid rolling in low volatility environments when possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">Capital Allocation Perspective</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Every roll decision should be viewed through the lens of capital allocation. When a trade is challenged, ask yourself: &ldquo;Is rolling this position the absolute best use of this capital right now, compared to every other potential trade in the market?&rdquo;
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/40 border-l-4 border-orange-500 p-4">
                  <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">Critical Question</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Rolling is not about saving an old trade&mdash;it&apos;s about making a new one. Evaluate the rolled position as if you were entering it fresh today.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Examples */}
          <section id="practical-examples" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Practical Examples</h2>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Defensive Put Roll Example</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Scenario:</strong> You sold a $100 put on XYZ stock for $2.00 premium, expecting the stock to stay above $100.
                    The stock drops to $95, and your put is now worth $5.50 with 15 days to expiration.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-red-200 dark:border-red-800 rounded">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Poor Decision</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Close the $100 put for $5.50 loss and sell a $95 put for $3.00, resulting in a net debit of $2.50.
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Good Decision</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Roll to a $95 put in the next monthly cycle for a net credit of $0.50, lowering your breakeven to $97.50.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Offensive Put Roll Example</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Scenario:</strong> You sold a $100 put for $2.00. The stock rallies to $110, and your put is now worth $0.20
                    with 30 days remaining. You&apos;ve captured 90% of the maximum profit.
                  </p>
                </div>
                <div className="p-4 border border-green-200 dark:border-green-800 rounded">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Optimal Strategy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Close the $100 put for $0.20 and sell a $105 put in the next cycle for $2.50, netting $2.30 in additional premium.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This puts your capital back to work at a higher strike with substantial new premium collection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Conclusion</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Rolling options is both an art and a science, requiring a delicate balance of technical knowledge, market awareness, and emotional discipline. The framework presented here provides the foundational principles that should guide every rolling decision.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-500 p-6 my-8">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4">Key Takeaways</h3>
                <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                  <li>✓ Always roll for a net credit in defensive situations</li>
                  <li>✓ Only roll if your original thesis remains intact</li>
                  <li>✓ Use Delta and DTE as objective triggers for management</li>
                  <li>✓ View rolling as making a new trade, not saving an old one</li>
                  <li>✓ Consider volatility environment when timing rolls</li>
                  <li>✓ Maintain strict risk management and position sizing</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
