import { GraduationCap, Brain, TrendingUp, AlertTriangle, Leaf, Vote, Bitcoin, Ban, Wallet, LineChart } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function Finance101Content() {
  const config = getTopicConfig('finance-101');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={GraduationCap}>
      <div className="space-y-8">
        {/* 1. Investor Psychology */}
        <SectionCard title="Investor Psychology" icon={Brain} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>The Behavior Gap</h4>
              <p>
                Annual studies of fund-flow timing (e.g. DALBAR-style research) consistently find that the average
                investor's actual return trails the funds they hold — not because the funds underperform, but because
                investors buy after a rally and sell after a drop. The market doesn't need to beat you; your own timing
                does that on its own.
              </p>
            </div>
            <div>
              <h4>Loss Aversion & Overconfidence</h4>
              <p>
                Losses hurt roughly twice as much (psychologically) as equivalent gains feel good, which pushes people to
                hold losers too long. Overconfidence does the opposite damage — it pushes people to trade too often and
                concentrate too much in "high conviction" ideas that are really just familiar ones.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Market Structure & Hype */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Market Structure & Hype" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><TrendingUp className="h-4 w-4" /> Meme Stocks</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Coordinated retail buying can force a short squeeze — short-sellers forced to buy back shares at any price
                to close a losing position, which mechanically pushes the price even higher, independent of the company's
                actual fundamentals.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Ban className="h-4 w-4" /> Viral "AI Picks" Claims</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Screenshots of eye-popping backtested or cherry-picked "AI stock picks" almost never disclose the losing
                calls or the time period selected — a track record isn't credible without knowing the full sample and the
                exact rules used in advance.
              </p>
            </div>
          </div>
        </div>

        {/* 3. New Frontiers */}
        <SectionCard title="New Frontiers" icon={Leaf} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>ESG Investing</h4>
              <p>
                Environmental, Social, and Governance scores attempt to quantify non-financial risk — but scoring
                methodologies vary widely between providers, and "greenwashing" (marketing a fund as ESG-focused with
                minimal actual screening) is common enough that the label alone isn't a reliable signal.
              </p>
            </div>
            <div>
              <h4>Prediction Markets</h4>
              <p>
                Markets where contracts pay out based on real-world event outcomes (elections, Fed decisions) aggregate
                many participants' information into a single price — research has repeatedly found these prices can
                out-forecast individual expert opinion and polls, because bad predictions cost the predictor real money.
              </p>
            </div>
            <div>
              <h4>Bitcoin, DeFi & Stablecoins</h4>
              <p>
                Bitcoin's pitch is digitally-enforced scarcity (a fixed 21M supply cap); DeFi ("decentralized finance") is
                lending, trading, and borrowing implemented as self-executing smart contracts instead of a bank; stablecoins
                (pegged 1:1 to a currency like USD) exist mainly as the on/off-ramp connecting the two worlds.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Where Beginners Lose Money" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Performance chasing:</strong> Buying whatever just went up (a fund, a sector, a coin) tends to buy in near a local top — by the time a trend is obvious enough to notice, much of the move has already happened.</li>
            <li><strong>Ignoring fees:</strong> A 1% annual expense ratio difference compounds into a large gap in ending wealth over decades — fees are one of the few things in investing you can control with certainty.</li>
            <li><strong>No written plan:</strong> Without a plan defining what you own and why, market noise fills the vacuum — decisions get made reactively, in the moment, which is exactly when behavioral biases are strongest.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Vote} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Wallet className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Wealth Planning</h4>
                <p>
                  Once the fundamentals click, the next step is turning them into an actual plan — see{" "}
                  <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Wealth Planning</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <LineChart className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Stock Analysis</h4>
                <p>
                  For evaluating an individual company rather than market psychology — see{" "}
                  <Link href="/stock/stock-analysis/stock-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Stock Analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
