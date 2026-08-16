import { BookOpen, Brain, Dices, Wallet, Library, Compass } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function BooksContent() {
  const config = getTopicConfig('books');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={BookOpen}>
      <div className="space-y-8">
        {/* 1. Trading Psychology */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Trading Psychology" />
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Brain className="h-4 w-4" /> The Phantom Trader</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Built around the "Losing Game" paradigm: trading is a game where the winner isn't the one who's right most
                often, but the one who loses best. Covers the <strong>Best Loser Philosophy</strong>, a behavioral shift
                away from being-right toward process discipline, the <strong>Three Laws of Survival</strong>, a{" "}
                <strong>3:2:1 pyramiding ratio</strong> for scaling into winners, and a concrete behavior-modification
                routine (physical activation, grounding, rule rehearsal, and a hard time-stop) for staying disciplined
                under pressure.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Read the full summary:{" "}
                <Link href="/articles/gift-phantom-trader-psychology-winning-through-losing" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">The Phantom Trader</Link>
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]"><Brain className="h-4 w-4" /> The Little Book of Behavioral Investing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                James Montier's field guide to the specific cognitive biases that damage investment returns:
                overconfidence, confirmation bias, anchoring, loss aversion, and herding. Its practical value is the
                checklist format — naming the bias in advance is the first defense against falling for it in the moment.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Read the full summary:{" "}
                <Link href="/articles/little-book-behavioral-investing-summary" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">The Little Book of Behavioral Investing</Link>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Understanding Randomness & Risk */}
        <SectionCard title="Understanding Randomness & Risk" icon={Dices} tone="accent">
          <p>
            <strong>Fooled by Randomness</strong> — Nassim Taleb's argument that success is far more often mistaken for
            skill than it actually reflects skill — a large enough population of random traders will always produce some
            who look like geniuses purely by chance (survivorship bias). Covers asymmetric payoffs (small frequent gains
            vs. rare catastrophic losses, and the reverse), and why judging any strategy from a short track record is
            close to meaningless.
          </p>
          <p className="text-sm">
            Read the full summary:{" "}
            <Link href="/articles/fooled-by-randomness-book-summary" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Fooled by Randomness</Link>
          </p>
        </SectionCard>

        {/* 3. Personal Finance Foundations */}
        <SectionCard title="Personal Finance Foundations" icon={Wallet} tone="accent">
          <p>
            <strong>Rich Dad, Poor Dad</strong> — Robert Kiyosaki's core distinction: an asset puts money in your pocket,
            a liability takes money out — and most people's "assets" (a house, a car) are actually liabilities by that
            test. Argues for financial literacy and acquiring income-producing assets over trading time for a paycheck,
            framed through the contrast between two father figures with opposite money mindsets.
          </p>
          <p className="text-sm">
            Read the full summary:{" "}
            <Link href="/articles/rich-dad-poor-dad-book-summary" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Rich Dad, Poor Dad</Link>
          </p>
        </SectionCard>

        {/* 4. Further Reading Shelf */}
        <SectionCard title="Further Reading Shelf" icon={Library} tone="accent">
          <p>
            A curated 13-book shelf grouped by theme: <strong>value investing & market cycles</strong> (Howard Marks'
            The Most Important Thing and Mastering the Market Cycle, Guy Spier's Education of a Value Investor, Poor
            Charlie's Almanack), <strong>money psychology</strong> (Morgan Housel's The Psychology of Money and Same as
            Ever, William Green's Richer, Wiser, Happier), and <strong>habits & focus</strong> (Atomic Habits, Ego Is
            the Enemy, The Subtle Art of Not Giving a F*ck, Stolen Focus, Clear Thinking) — the non-financial discipline
            that determines whether the financial lessons actually stick.
          </p>
          <p className="text-sm">
            See the full list:{" "}
            <Link href="/articles/essential-reading-for-investors" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Essential Reading for Investors</Link>
          </p>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Finance 101</h4>
                <p>
                  These books assume the reader already has basic financial vocabulary — if terms like compounding or
                  asset allocation aren't second nature yet, start here — see{" "}
                  <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Finance 101</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Wallet className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Wealth Planning</h4>
                <p>
                  Rich Dad Poor Dad's asset/liability framework connects directly to building an actual plan — see{" "}
                  <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Wealth Planning</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
