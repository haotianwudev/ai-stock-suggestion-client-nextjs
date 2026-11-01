'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

interface JargonTermProps {
  term: string;
  definition: string;
}

function JargonTerm({ term, definition }: JargonTermProps) {
  return (
    <span 
      tabIndex={0} 
      className="relative cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] group inline-block"
    >
      {term}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus:block w-64 p-2.5 text-xs font-sans text-white bg-[#14171B] dark:bg-[#05070A] rounded shadow-xl z-50 pointer-events-none text-center border border-[#A8672E]/30">
        {definition}
      </span>
    </span>
  );
}

export default function ArticlePage() {
  return (
    <ArticleFrame slug="quant-leadership-communication-architecture">
      <div className="space-y-12 text-slate-800 dark:text-slate-200 transition-colors">
        
        {/* Key Takeaways Card */}
        <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-serif mb-4 text-slate-900 dark:text-slate-100">Key Takeaways</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>Talk is a high-value asset: transparent communication and friction-less collaboration deliver higher net enterprise value than isolated technical brilliance.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>Leaders spend an average of 4.3 hours per week (223+ hours annually) managing interpersonal and cross-functional conflict.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>Upward executive briefing requires strict adherence to BLUF and the Minto Pyramid Principle using a 30/20/50 effort allocation rule.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#A8672E] dark:text-[#D08F52] font-mono mt-0.5">&bull;</span>
              <span>Quantitative risk governance requires independent validation, explicit pre-committee filings, and adherence to updated regulatory frameworks like SR 26-2.</span>
            </li>
          </ul>
        </section>

        {/* Standout Stats Stat Row */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-lg text-center">
            <div className="font-mono text-3xl font-bold text-[#A8672E] dark:text-[#D08F52] tabular-nums mb-1">4.3 hrs</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Weekly Leader Time Spent on Conflict Management</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-lg text-center">
            <div className="font-mono text-3xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] tabular-nums mb-1">14x</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Faster Resolution via Tactical Empathy vs. Positional Bargaining</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-lg text-center">
            <div className="font-mono text-3xl font-bold text-[#A8672E] dark:text-[#D08F52] tabular-nums mb-1">30/20/50</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Effort Split: Problem Definition / Analysis / Storyboarding</div>
          </div>
        </section>

        {/* Section: The Structural Challenge */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">The Structural Challenge of Quantitative Desk Leadership</h2>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm md:text-base">
            <li>&bull; Multidisciplinary teams comprise execution <JargonTerm term="traders" definition="Real-time risk takers operating in fast-paced environments with millisecond to intraday horizons, balancing delta, volatility, and order flow." />, <JargonTerm term="quantitative researchers" definition="PhD-level specialists developing out-of-sample alpha factors and predictive models across multi-week horizons." />, and quantitative <JargonTerm term="risk officers" definition="Front-office independent oversight enforcing VaR and Greek limits, running stress tests, and quantifying counterparty exposures." />.</li>
            <li>&bull; Information latency manifests as unhedged tail risk, corrupted production code, regulatory enforcement exposure, and premature institutional capital redemptions.</li>
          </ul>
        </section>

        {/* Section: Internal Team Dynamics & Cognitive Profiles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Internal Team Dynamics</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Conflicts between internal desk verticals stem from structural collisions engineered by conflicting incentives and time horizons.
          </p>
          
          {/* Responsive Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-serif border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Team Role</th>
                  <th className="p-3">Operational Horizon</th>
                  <th className="p-3">Core Technical Lexicon</th>
                  <th className="p-3">Structural Incentive &amp; Bias</th>
                  <th className="p-3">Communication Vulnerability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Execution Trader</td>
                  <td className="p-3 font-mono text-xs">Milliseconds to Intraday</td>
                  <td className="p-3 font-mono text-xs">Slippage, Greeks (<InlineMath math="\Delta, \nu, \theta, \rho" />), toxic flow</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">Long call option on P&amp;L; maximized position velocity</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Overriding risk dissent via P&amp;L clout</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Quant Researcher</td>
                  <td className="p-3 font-mono text-xs">Weeks to Quarters</td>
                  <td className="p-3 font-mono text-xs">Out-of-sample alpha, factor loading, p-values</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">Intellectual ownership; data-mining false positives</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Opacity; translation failure to execution/risk</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Quant Risk Officer</td>
                  <td className="p-3 font-mono text-xs">Intraday to Multi-Year Tail</td>
                  <td className="p-3 font-mono text-xs">VaR, stress testing, counterparty exposure, SR 26-2</td>
                  <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">Downside preservation; asymmetric penalty for misses</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">Marginalization by front-office revenue generators</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Infographic Slot placed inline to anchor the transition from desk profiles to upward briefing */}
        <InfographicSlot alt="Communication Architecture and Active Listening Protocols for Quantitative Finance Leadership" />

        {/* Dichotomy Comparison Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Communication Polarity: Upward vs. Internal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h3 className="font-serif text-lg font-medium text-[#A8672E] dark:text-[#D08F52] mb-3">Inductive Technical Communication (Internal)</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>&bull; Starts with raw data, mathematical derivations, and code implementation.</li>
                <li>&bull; Reveals core conclusions at the end of the analysis.</li>
                <li>&bull; Suitable for quantitative research reviews and peer debugging sessions.</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h3 className="font-serif text-lg font-medium text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Deductive Executive Briefing (Upward)</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>&bull; <JargonTerm term="BLUF (Bottom-Line-Up-Front)" definition="Leading with the core conclusion and strategic ROI on page one before presenting supporting arguments." /> methodology.</li>
                <li>&bull; Structured via Barbara Minto&apos;s Pyramid Principle into MECE pillars.</li>
                <li>&bull; Quarantines granular math to appendix; designed for time-constrained decision-makers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formula Panel & Worked Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Quantitative Effort Allocation &amp; Bargaining Framework</h2>
          
          {/* Dark Monospace Formula Card */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-6 rounded-xl font-mono text-sm shadow-xl border border-slate-800 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#D08F52]">Protocol Framework &amp; Equations</div>
            
            <div className="my-2">
              <MathBlock math="\text{Effort Allocation} = 30\% \ (\text{Problem}) + 20\% \ (\text{Quant Analysis}) + 50\% \ (\text{Storyboarding})" />
            </div>

            <div className="border-t border-slate-800 pt-3 text-xs text-slate-300 space-y-2">
              <div>
                <span className="text-[#D08F52] font-semibold">&gt; Ackerman Bargaining Sequence:</span> Anchor at 65% &rarr; 85% &rarr; 95% &rarr; 100%
              </div>
              <div className="my-1">
                <MathBlock math="\Delta t_{\text{resolution}} \propto \text{Tactical Empathy} \times (\text{Mirroring} + \text{4s Pause})" />
              </div>
            </div>
          </div>

          {/* Worked numeric example directly beneath */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-sm space-y-3">
            <h3 className="font-serif font-medium text-slate-900 dark:text-slate-100">Worked Numeric Example (Illustrative Resource Budget)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              When allocating a 100-hour strategic project timeline for a board risk presentation:
            </p>
            <ul className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
              <li>&bull; Problem Confirmation &amp; Pre-wiring: 30 hours (Ensures 70% briefing failure reduction)</li>
              <li>&bull; Quantitative Backtesting &amp; Model Validation: 20 hours (Robust out-of-sample stress testing)</li>
              <li>&bull; Executive Storyboarding &amp; BLUF Slide Deck: 50 hours (Translating analytics to decision impact)</li>
            </ul>
          </div>
        </section>

        {/* Section: Upward Governance & Regulatory Frameworks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Upward &amp; Regulatory Governance</h2>
          <ul className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <li>&bull; <span className="font-semibold">SR 26-2 Guidance (April 17, 2026):</span> Supersedes SR 11-7, preserving traditional three pillars of model development, independent validation, and effective challenge.</li>
            <li>&bull; <span className="font-semibold">Generative AI Scope Boundary:</span> Explicitly pulls generative and agentic AI systems out of traditional model risk guidance, requiring a proportional, risk-tiered governance inventory.</li>
            <li>&bull; <span className="font-semibold">Fiduciary &amp; Fee Conflict Mitigation:</span> Independent risk reporting verifies trade allocations against SEC Form ADV disclosures, preventing undisclosed fee bias across client vehicles.</li>
          </ul>
        </section>

        {/* Section: Lateral & Technical Communication */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Lateral Engineering &amp; Incidents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <h3 className="font-serif font-medium text-slate-900 dark:text-slate-100 mb-2">Python-to-C++ Chasm</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Prevents look-ahead biases and compilation discrepancies between research notebooks and production binaries.
              </p>
              <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52]">
                Requirement: Co-Owned Streaming Golden Unit Test Protocol
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <h3 className="font-serif font-medium text-slate-900 dark:text-slate-100 mb-2">Incident Response</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Ensures rapid restoration during feed corruptions or AI pipeline degradation at 2:00 AM.
              </p>
              <div className="text-xs font-mono text-[#1D8A70] dark:text-[#3CBF9C]">
                Requirement: 48-Hour Blameless Post-Mortems + Automated Tests
              </div>
            </div>
          </div>
        </section>

        {/* Section: Outward & Global Operations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100">Outward Communication &amp; Global Operations</h2>
          <ul className="space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <li>&bull; <span className="font-semibold">Process Credibility Problem:</span> Systematic models protect proprietary alpha via restricted transparency, requiring allocators to evaluate research methodology and governance rather than static portfolio theses.</li>
            <li>&bull; <span className="font-semibold">Drawdown Communication:</span> Eliminates information latency by attributing performance strictly to model behavior (factor exposures, volatility filters) rather than generic macro commentary.</li>
            <li>&bull; <span className="font-semibold">Follow-the-Sun Handover:</span> Evidenced shift-handover logs across AMRS, EMEA, and APAC supported by split-supervision (Central Market Risk vs. Local Conduct).</li>
          </ul>
        </section>

      </div>
    </ArticleFrame>
  );
}
