import { PiggyBank, ScrollText, Umbrella, Receipt, Landmark, GraduationCap, Globe } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function WealthPlanningContent() {
  const config = getTopicConfig('wealth-planning');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={PiggyBank}>
      <div className="space-y-8">
        {/* 1. Estate Planning */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Estate Planning" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Trusts & Wealth-Transfer Structures</strong> — A revocable living trust avoids probate (the public, often slow
            court process for settling an estate) while an irrevocable trust can also move assets out of a taxable
            estate. Beyond a certain estate size, "just a will" leaves money on the table — trusts, gifting strategies,
            and step-up-in-basis planning at death all reduce the tax bill heirs eventually pay.
          </p>
        </div>

        {/* 2. Retirement Architecture */}
        <SectionCard title="Retirement Architecture" icon={Umbrella} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Withdrawal Rules & Sequence Risk</h4>
              <p>
                The "4% rule" is a rough starting point, not a guarantee — its biggest hidden danger is{" "}
                <strong>sequence-of-returns risk</strong>: a market crash in the first few years of retirement does far
                more damage than the same crash happening decades in, because there's no time left to earn it back before
                withdrawals resume.
              </p>
            </div>
            <div>
              <h4>The Role of Insurance Products</h4>
              <p>
                Annuities function as longevity insurance — trading a lump sum for guaranteed income you can't outlive.
                Whole/permanent life insurance is frequently oversold as an investment vehicle; for most people term life
                (pure insurance, no cash-value component) plus separately invested savings is the lower-cost combination.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 3. Tax-Efficient Investing */}
        <SectionCard title="Tax-Efficient Investing" icon={Receipt} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Tax-Loss Harvesting</h4>
              <p>
                Systematically selling a position at a loss to offset realized capital gains elsewhere (and up to $3,000
                of ordinary income per year), then buying a similar-but-not-identical replacement to stay invested —
                subject to the IRS wash-sale rule, which disallows the loss if you rebuy the same security within 30 days.
              </p>
            </div>
            <div>
              <h4>Direct Indexing</h4>
              <p>
                Instead of owning an index fund as one unit, directly owning its individual constituent stocks lets an
                algorithm harvest losses on specific names even while the index overall is up — extracting tax alpha that
                a pooled fund structurally can't offer its holders.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Wealth Preservation */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Wealth Preservation" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Multi-generational time horizons change the optimization target: instead of maximizing expected return, the
            priority shifts toward minimizing the risk of a permanent, catastrophic loss and preserving{" "}
            <strong className="text-gray-900 dark:text-gray-100">real</strong> (inflation-adjusted) purchasing power across decades. This typically means broader
            diversification across asset classes and geographies, and glide paths that gradually reduce risk as capital
            needs approach.
          </p>
        </div>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Landmark} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <GraduationCap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Finance 101</h4>
                <p>
                  For the behavioral foundations that make any of these plans stick — see{" "}
                  <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Finance 101</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Globe className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Macro Analysis</h4>
                <p>
                  Wealth preservation decisions (glide paths, real-return targets) are directly informed by where the
                  economy sits in the cycle — see{" "}
                  <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Macro Analysis</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
