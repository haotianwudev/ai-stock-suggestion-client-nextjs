"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/shared/tier-badge";
import { SlotKicker } from "@/components/articles/article-frame";
import {
  Heart,
  Star,
  Users,
  BookOpen,
  Code2,
  TrendingUp,
  Trophy,
  Youtube,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  TIER_NAMES,
  getTierName,
  MIN_TOPIC_TIER,
  MIN_COMMENT_TIER,
  MIN_PREMIUM_TIER,
  MIN_MODERATOR_TIER,
  LIKE_TIER_LADDER,
  DONATION_TIER_LADDER,
} from "@/lib/tiers";

const TIER_PERKS: Record<number, string> = {
  1: "Bookmarks & Reading History",
  [MIN_TOPIC_TIER]: "Topic Curricula & Study Guides",
  [MIN_COMMENT_TIER]: "Comments & Forum Discussions",
  [MIN_PREMIUM_TIER]: "Premium Articles & Video Platform Switcher",
  5: "1:1 Page Review",
  6: "Video Collaboration Support",
  7: "Dedicated Quant Neighborhood Page",
  [MIN_MODERATOR_TIER]: "Forum & Comment Moderation",
  9: "SOPHIE Daddy Admin",
};

function tierHowTo(tier: number): string {
  if (tier === 1) return "Default free account upon sign-in";
  if (tier === MIN_TOPIC_TIER) return "Subscribe to SOPHIE on YouTube";

  const likeStep = LIKE_TIER_LADDER.find((step) => step.tier === tier);
  if (likeStep) {
    return (
      `Like ${likeStep.likesNeeded} paired video${likeStep.likesNeeded === 1 ? "" : "s"}` +
      (likeStep.alsoNeedsSubscribe ? " (while subscribed)" : "")
    );
  }

  const donationStep = DONATION_TIER_LADDER.find((step) => step.tier === tier);
  if (donationStep) {
    return `Donate $${(donationStep.minCents / 100).toFixed(2)}+ total`;
  }

  if (tier === MIN_MODERATOR_TIER) return "Awarded for community leadership";
  if (tier === 9) return "Site Administrator";

  return "Awarded manually";
}

const TIER_ROWS = Object.keys(TIER_NAMES)
  .map(Number)
  .sort((a, b) => a - b)
  .map((tier) => ({
    tier,
    name: getTierName(tier),
    how: tierHowTo(tier),
    unlocks: TIER_PERKS[tier] ?? "Rank privilege",
  }));

export default function AboutPage() {
  const aiTools: Array<{ name: string; rating: number; comment: string; link?: string }> = [
    { name: "NotebookLM", rating: 5, comment: "Best AI tool for research and grounding!" },
    { name: "Gemini", rating: 4, comment: "Fast online search, Canvas workspace, and custom Gems context." },
    { name: "Gemini Deep Research", rating: 5, comment: "Comprehensive institutional-grade deep research reports." },
    { name: "Antigravity", rating: 4, comment: "Advanced agentic coding and paired AI development." },
    { name: "Claude Code", rating: 5, comment: "Autonomous terminal agent and deep workflow automation." },
    { name: "Google Cloud", rating: 5, comment: "Scalable cloud infrastructure, BigQuery, and enterprise AI." },
    { name: "Deepseek", rating: 4, comment: "Cost-effective reasoning and fast code generation." },
    { name: "Kiro", rating: 3, comment: "Lightweight vibe coding." },
    { name: "Ollama", rating: 3, comment: "Local LLM runtime — check out my complete cheat sheet!", link: "/articles/ollama-cheat-sheet-complete-command-reference" },
    { name: "Supabase", rating: 5, comment: "Managed authentication, PostgreSQL database, and storage." },
    { name: "Neon", rating: 5, comment: "Serverless PostgreSQL database." },
    { name: "Vercel", rating: 5, comment: "Production Next.js edge deployment." },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating
            ? "fill-[#A8672E] text-[#A8672E] dark:fill-[#D08F52] dark:text-[#D08F52]"
            : "text-gray-200 dark:text-gray-700"
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 pb-16">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-3 pt-4">
            <div className="flex justify-center">
              <SlotKicker icon={Heart} label="Creator & Mission" tone="accent" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              About the Creator
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Decoding quantitative finance, market microstructure, and applied machine learning into accessible knowledge.
            </p>
          </div>

          {/* Welcome Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <SlotKicker icon={Users} label="Welcome" tone="accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Hello, I&apos;m SOPHIE Daddy
            </h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                My day job is on Wall Street in quantitative modeling, but I strongly believe that deep institutional finance knowledge should not be kept behind closed doors.
              </p>
              <div className="p-4 rounded-xl border border-[#A8672E]/20 dark:border-[#D08F52]/20 bg-[#A8672E]/5 dark:bg-[#D08F52]/10">
                <p className="text-center font-serif font-bold text-[#A8672E] dark:text-[#D08F52] text-lg sm:text-xl">
                  &ldquo;If it&apos;s complicated, let&apos;s break it down.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <SlotKicker icon={BookOpen} label="Philosophy" tone="accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              My Mission
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              This platform is an open quantitative notebook documenting our shared exploration across derivatives pricing, systematic factor strategies, statistical arbitrage, and LLM financial engineering.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {[
                { label: "100% Free Access", sub: "Open education" },
                { label: "No Paywalls", sub: "Core articles open" },
                { label: "Login Optional", sub: "Read without account" },
                { label: "Community Driven", sub: "Peer learning" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/40 text-center"
                >
                  <p className="font-semibold text-xs text-slate-900 dark:text-slate-100">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sophie Dedication Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <SlotKicker icon={Heart} label="Dedication" tone="accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              For Sophie
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Above all, this project is dedicated to my daughter, <strong>Sophie</strong>. As she grows up in an era defined by artificial intelligence and automated systems, I want to build a lasting archive that embodies the best of technology: empowering individuals through clarity, rigor, and open education.
            </p>
          </div>

          {/* Membership Tiers Section */}
          <div
            id="membership-tiers"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-20"
          >
            <div className="flex items-center justify-between">
              <SlotKicker icon={Trophy} label="Rank System" tone="accent" />
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                <ShieldCheck className="size-3.5 text-[#1D8A70] dark:text-[#3CBF9C]" />
                Tiers never downgrade
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Membership Ranks & Perks
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Reading all public articles and using market tools is free with no account required. Signing in gives you Tier 1 and bookmarks. Higher ranks unlock curricula, commenting, video platform options, and forum moderation — earned through engagement (subscribing on YouTube or liking videos) or voluntary <Link href="/donate" className="text-[#A8672E] dark:text-[#D08F52] font-semibold underline">donations</Link>.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 text-left">
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Tier</th>
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Rank</th>
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">How to Reach</th>
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Platform Unlocks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                  {TIER_ROWS.map((row) => (
                    <tr
                      key={row.tier}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-400 dark:text-slate-500">
                        T{row.tier}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <TierBadge tier={row.tier} size="xs" />
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                        {row.how}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          {row.unlocks}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-muted-foreground border-t border-gray-100 dark:border-gray-800">
              <p>Likes and subscriptions run on the honor system. Ranks only ever upgrade.</p>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/donate"
                  className="font-semibold text-[#A8672E] dark:text-[#D08F52] hover:underline"
                >
                  Support on Donate Page &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* AI Toolkit Section */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <SlotKicker icon={Code2} label="Tools" tone="accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              My AI Toolkit & Stack
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The tools, models, and infrastructure powering SOPHIE AI Finance:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/60 text-left">
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Tool / Platform</th>
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400 text-center">Rating</th>
                    <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Notes & Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                  {aiTools.map((tool) => (
                    <tr
                      key={tool.name}
                      className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                        {tool.link ? (
                          <Link
                            href={tool.link}
                            className="text-[#A8672E] dark:text-[#D08F52] hover:underline"
                          >
                            {tool.name}
                          </Link>
                        ) : (
                          tool.name
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex justify-center gap-0.5">{renderStars(tool.rating)}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{tool.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Resources / Call to Action */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Join the Conversation
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Have questions, feedback, or strategy ideas? Leave comments on articles, start discussions on the forum, or subscribe on YouTube.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@SOPHIEAIFinance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium text-xs shadow-xs transition-colors"
              >
                <Youtube className="size-4" />
                Subscribe on YouTube
              </a>
              <Link
                href="/forum"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-xs text-slate-800 dark:text-slate-200 shadow-xs transition-colors"
              >
                <MessageSquare className="size-4 text-[#A8672E] dark:text-[#D08F52]" />
                Explore Forum
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A8672E] text-white hover:bg-[#915624] dark:bg-[#D08F52] dark:text-gray-950 dark:hover:bg-[#b87c43] font-medium text-xs shadow-xs transition-colors"
              >
                <Heart className="size-4" />
                Support / Donate
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Disclaimer />
    </div>
  );
}