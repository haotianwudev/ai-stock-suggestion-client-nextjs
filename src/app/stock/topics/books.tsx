'use client';

import { BookOpen, Brain, Dices, Wallet, Library, Compass, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-indigo-900">{title}</h3>
    </div>
  );
}

export function BooksContent() {
  // Get configuration for books
  const config = getTopicConfig('books');

  const heroColorScheme = {
    border: "border-indigo-200",
    background: "bg-gradient-to-br from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    descriptionColor: "text-indigo-700",
    cardBg: "bg-white",
    cardBorder: "border border-indigo-100",
    cardText: "text-indigo-900",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-800",
    sectionTitle: "text-indigo-900"
  };

  const contentSections = (
    <>
      {/* 1. Trading Psychology */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Trading Psychology" colorClass="bg-indigo-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <Card className="border-indigo-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Brain className="h-4 w-4 text-indigo-600 flex-shrink-0" /> The Phantom Trader
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
                Built around the "Losing Game" paradigm: trading is a game where the winner isn't the one who's right most
                often, but the one who loses best. Covers the <strong>Best Loser Philosophy</strong>, a behavioral shift
                away from being-right toward process discipline, the <strong>Three Laws of Survival</strong>, a{" "}
                <strong>3:2:1 pyramiding ratio</strong> for scaling into winners, and a concrete behavior-modification
                routine (physical activation, grounding, rule rehearsal, and a hard time-stop) for staying disciplined
                under pressure.
              </p>
              <p className="text-xs text-indigo-600">
                Read the full summary:{" "}
                <Link href="/articles/gift-phantom-trader-psychology-winning-through-losing" className="underline underline-offset-2 hover:text-indigo-900">
                  The Phantom Trader
                </Link>
              </p>
            </CardContent>
          </Card>
          <Card className="border-indigo-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Brain className="h-4 w-4 text-indigo-600 flex-shrink-0" /> The Little Book of Behavioral Investing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
                James Montier's field guide to the specific cognitive biases that damage investment returns: overconfidence,
                confirmation bias, anchoring, loss aversion, and herding. Its practical value is the checklist format —
                naming the bias in advance is the first defense against falling for it in the moment.
              </p>
              <p className="text-xs text-indigo-600">
                Read the full summary:{" "}
                <Link href="/articles/little-book-behavioral-investing-summary" className="underline underline-offset-2 hover:text-indigo-900">
                  The Little Book of Behavioral Investing
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. Understanding Randomness & Risk */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Understanding Randomness &amp; Risk" colorClass="bg-indigo-600" />
        <Card className="border-indigo-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Dices className="h-4 w-4 text-indigo-600 flex-shrink-0" /> Fooled by Randomness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
              Nassim Taleb's argument that success is far more often mistaken for skill than it actually reflects skill —
              a large enough population of random traders will always produce some who look like geniuses purely by chance
              (survivorship bias). Covers asymmetric payoffs (small frequent gains vs. rare catastrophic losses, and the
              reverse), and why judging any strategy from a short track record is close to meaningless.
            </p>
            <p className="text-xs text-indigo-600">
              Read the full summary:{" "}
              <Link href="/articles/fooled-by-randomness-book-summary" className="underline underline-offset-2 hover:text-indigo-900">
                Fooled by Randomness
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Personal Finance Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Personal Finance Foundations" colorClass="bg-indigo-600" />
        <Card className="border-indigo-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Wallet className="h-4 w-4 text-indigo-600 flex-shrink-0" /> Rich Dad, Poor Dad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
              Robert Kiyosaki's core distinction: an asset puts money in your pocket, a liability takes money out — and most
              people's "assets" (a house, a car) are actually liabilities by that test. Argues for financial literacy and
              acquiring income-producing assets over trading time for a paycheck, framed through the contrast between two
              father figures with opposite money mindsets.
            </p>
            <p className="text-xs text-indigo-600">
              Read the full summary:{" "}
              <Link href="/articles/rich-dad-poor-dad-book-summary" className="underline underline-offset-2 hover:text-indigo-900">
                Rich Dad, Poor Dad
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Further Reading Shelf */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Further Reading Shelf" colorClass="bg-indigo-600" />
        <Card className="border-indigo-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Library className="h-4 w-4 text-indigo-600 flex-shrink-0" /> Essential Reading for Investors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-indigo-700 leading-relaxed">
              A curated 13-book shelf grouped by theme: <strong>value investing &amp; market cycles</strong> (Howard Marks'
              The Most Important Thing and Mastering the Market Cycle, Guy Spier's Education of a Value Investor, Poor
              Charlie's Almanack), <strong>money psychology</strong> (Morgan Housel's The Psychology of Money and Same as
              Ever, William Green's Richer, Wiser, Happier), and <strong>habits &amp; focus</strong> (Atomic Habits, Ego Is
              the Enemy, The Subtle Art of Not Giving a F*ck, Stolen Focus, Clear Thinking) — the non-financial discipline
              that determines whether the financial lessons actually stick.
            </p>
            <p className="text-xs text-indigo-600">
              See the full list:{" "}
              <Link href="/articles/essential-reading-for-investors" className="underline underline-offset-2 hover:text-indigo-900">
                Essential Reading for Investors
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-indigo-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Finance 101</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                These books assume the reader already has basic financial vocabulary — if terms like compounding or asset
                allocation aren't second nature yet, start here — see{" "}
                <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-indigo-900 inline-flex items-center gap-0.5">
                  Finance 101 <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Wallet className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm md:text-base">Wealth Planning</h4>
              <p className="text-xs md:text-sm text-indigo-700 leading-relaxed mt-1">
                Rich Dad Poor Dad's asset/liability framework connects directly to building an actual plan — see{" "}
                <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-indigo-900 inline-flex items-center gap-0.5">
                  Wealth Planning <ArrowRight className="h-3 w-3" />
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
      heroIcon={<BookOpen className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Books Guide"
    />
  );
}
