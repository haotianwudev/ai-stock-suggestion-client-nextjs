'use client';

import { PiggyBank, ScrollText, Umbrella, Receipt, Landmark, GraduationCap, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-amber-900">{title}</h3>
    </div>
  );
}

export function WealthPlanningContent() {
  // Get configuration for wealth & planning
  const config = getTopicConfig('wealth-planning');

  const heroColorScheme = {
    border: "border-amber-200",
    background: "bg-gradient-to-br from-amber-50 to-yellow-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    descriptionColor: "text-amber-700",
    cardBg: "bg-white",
    cardBorder: "border border-amber-100",
    cardText: "text-amber-900",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    sectionTitle: "text-amber-900"
  };

  const contentSections = (
    <>
      {/* 1. Estate Planning */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Estate Planning" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <ScrollText className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Trusts &amp; Wealth-Transfer Structures</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                A revocable living trust avoids probate (the public, often slow court process for settling an estate)
                while an irrevocable trust can also move assets out of a taxable estate. Beyond a certain estate size,
                "just a will" leaves money on the table — trusts, gifting strategies, and step-up-in-basis planning at
                death all reduce the tax bill heirs eventually pay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Retirement Architecture */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Retirement Architecture" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Umbrella className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Withdrawal Rules &amp; Sequence Risk</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                The "4% rule" is a rough starting point, not a guarantee — its biggest hidden danger is <strong>sequence-of-
                returns risk</strong>: a market crash in the first few years of retirement does far more damage than the
                same crash happening decades in, because there's no time left to earn it back before withdrawals resume.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <PiggyBank className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">The Role of Insurance Products</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Annuities function as longevity insurance — trading a lump sum for guaranteed income you can't outlive.
                Whole/permanent life insurance is frequently oversold as an investment vehicle; for most people term life
                (pure insurance, no cash-value component) plus separately invested savings is the lower-cost combination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tax-Efficient Investing */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Tax-Efficient Investing" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Receipt className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Tax-Loss Harvesting</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Systematically selling a position at a loss to offset realized capital gains elsewhere (and up to $3,000 of
                ordinary income per year), then buying a similar-but-not-identical replacement to stay invested — subject
                to the IRS wash-sale rule, which disallows the loss if you rebuy the same security within 30 days.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Landmark className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Direct Indexing</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Instead of owning an index fund as one unit, directly owning its individual constituent stocks lets an
                algorithm harvest losses on specific names even while the index overall is up — extracting tax alpha that
                a pooled fund structurally can't offer its holders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Wealth Preservation */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Wealth Preservation" colorClass="bg-amber-600" />
        <Card className="border-amber-100 ml-8 md:ml-9">
          <CardContent className="pt-4">
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              Multi-generational time horizons change the optimization target: instead of maximizing expected return, the
              priority shifts toward minimizing the risk of a permanent, catastrophic loss and preserving <strong>real</strong>{" "}
              (inflation-adjusted) purchasing power across decades. This typically means broader diversification across
              asset classes and geographies, and glide paths that gradually reduce risk as capital needs approach.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <GraduationCap className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Finance 101</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                For the behavioral foundations that make any of these plans stick — see{" "}
                <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Finance 101 <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Macro Analysis</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Wealth preservation decisions (glide paths, real-return targets) are directly informed by where the
                economy sits in the cycle — see{" "}
                <Link href="/stock/investment/macro-analysis" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Macro Analysis <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<PiggyBank className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Wealth & Planning Guide"
    />
  );
}
