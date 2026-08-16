import { Settings, Compass, Search, Layers, FlaskConical, Rocket, Cpu, Database, Cloud, TrendingDown, RefreshCw, Gauge } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getQuantTopicConfig } from "./config";

export function TradingSystemContent() {
  const config = getQuantTopicConfig('trading-system');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Settings}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Foundations" />
          <StatTile title="A Trading System Is the Full Pipeline, Not the Idea" icon={Compass}>
            A profitable strategy on paper is just an idea. A <strong>trading system</strong> is everything required
            to turn that idea into capital deployed unattended: research, position sizing, execution, monitoring,
            and fail-safes. Most of the engineering effort in quant trading goes into this surrounding
            infrastructure, not the signal itself.
          </StatTile>
        </div>

        {/* 2. The Four Pillars */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="The Four Pillars" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="1. Alpha Discovery & Research" icon={Search}>
              Data collection, feature engineering, and model development to find signals with real predictive
              power — the hardest pillar, since most explored ideas produce nothing usable.
            </StatTile>
            <StatTile title="2. Portfolio Construction" icon={Layers}>
              Converts one or many signals into position sizes — risk management, market-neutral positioning, and
              hedging that turn a raw signal into something a real portfolio can actually hold.
            </StatTile>
            <StatTile title="3. Rigorous Backtesting" icon={FlaskConical}>
              Historical simulation with realistic frictions (fees, slippage) and honest bias controls — the gate a
              strategy must pass before it&apos;s trusted with real capital.
            </StatTile>
            <StatTile title="4. Automated Execution" icon={Rocket}>
              Turns a decision into a filled order with minimal market impact — order type selection, algorithmic
              execution, and transaction cost analysis to keep real-world costs close to the backtest&apos;s
              assumptions.
            </StatTile>
          </div>
        </div>

        {/* 3. Technology Stack */}
        <SectionCard title="Technology Stack" icon={Cpu} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Python for Research, C++/Rust for Execution</h4>
              <p>
                Python&apos;s ecosystem (pandas, scikit-learn) makes it the default for research and modeling, where
                iteration speed matters most. Compiled languages like C++ or Rust take over where microseconds
                matter — the actual order-routing path — because Python&apos;s overhead there is a genuine cost, not
                a rounding error.
              </p>
            </div>
            <div>
              <h4>KDB+/q for Time-Series Data</h4>
              <p>
                A column-oriented database purpose-built for time-series queries at high frequency and volume — the
                industry standard at firms handling tick-level data, where a general-purpose relational database
                would be too slow for the query patterns quant research actually runs.
              </p>
            </div>
            <div>
              <h4>Cloud for Scalable Compute</h4>
              <p>
                Backtesting thousands of parameter combinations or training models is bursty, parallelizable work —
                a natural fit for on-demand cloud compute rather than fixed, always-on hardware.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Perpetual Challenges */}
        <SectionCard title="Why No System Stays Finished" icon={TrendingDown} tone="neg">
          <ul>
            <li><strong>Alpha decay:</strong> Once a signal is discovered and traded by enough capital, competition typically erodes its edge — what worked reliably last year may thin out or vanish this year.</li>
            <li><strong>Market adaptation:</strong> Market structure itself changes — new participants, new regulations, new venues — meaning a system tuned for yesterday&apos;s market microstructure can quietly stop fitting today&apos;s.</li>
            <li><strong>Continuous research is mandatory:</strong> Because of decay, a trading system is never &quot;done&quot; — ongoing research to refresh and replace aging signals is a permanent cost of staying in the business, not a one-time build.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={RefreshCw} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <RefreshCw className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Backtesting</h4>
                <p>
                  For the detailed methodology behind Pillar 3 — see{" "}
                  <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Backtesting</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Gauge className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  For the rule-based foundations that feed Pillar 1&apos;s research process — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Systematic Strategies</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
