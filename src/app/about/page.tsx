"use client";

import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Star, Users, BookOpen, Code2, TrendingUp, Trophy } from "lucide-react";
import {
  TIER_NAMES,
  getTierName,
  MIN_TOPIC_TIER,
  MIN_COMMENT_TIER,
  MIN_PREMIUM_TIER,
  LIKE_TIER_LADDER,
} from "@/lib/tiers";

// Derived from the tier constants rather than written out by hand, so this table
// can't drift from what the gates actually enforce.
const TIER_PERKS: Record<number, string> = {
  1: "Bookmarks",
  [MIN_TOPIC_TIER]: "Topic pages & study guides",
  [MIN_COMMENT_TIER]: "Comments & forum posts",
  [MIN_PREMIUM_TIER]: "Premium articles & preferred video platform",
  5: "Coming later",
  6: "Coming later",
  7: "Coming later",
  8: "Coming later",
  9: "Admin",
};

// DONATION_TIER_LADDER mirrors real server logic (server/src/db/donations.js,
// live Stripe webhook), but there's no donate button in the client yet -- so it's
// deliberately left out of tierHowTo below rather than advertising an action
// readers can't actually take. Wire it back in once a donate flow ships.
function tierHowTo(tier: number): string {
  if (tier === 1) return "Default when you create a free account";
  if (tier === MIN_TOPIC_TIER) return "Subscribe to the SOPHIE YouTube channel";

  const likeStep = LIKE_TIER_LADDER.find((step) => step.tier === tier);
  if (likeStep) {
    return (
      `Like ${likeStep.likesNeeded} paired video${likeStep.likesNeeded === 1 ? "" : "s"}` +
      (likeStep.alsoNeedsSubscribe ? " while subscribed" : "")
    );
  }

  return "Awarded manually";
}

const TIER_ROWS = Object.keys(TIER_NAMES)
  .map(Number)
  .sort((a, b) => a - b)
  .map((tier) => ({
    tier,
    name: getTierName(tier),
    how: tierHowTo(tier),
    unlocks: TIER_PERKS[tier] ?? null,
  }));

export default function AboutPage() {
  const aiTools: Array<{name: string; rating: number; comment: string; link?: string}> = [
    { name: "NotebookLM", rating: 5, comment: "Best AI tool ever!" },
    { name: "Gemini", rating: 5, comment: "Online search are fast." },
    { name: "Gemini Deep Research", rating: 5, comment: "Super long but fantastic reports" },
    { name: "Gems", rating: 3, comment: "Handy to have a context to LLM." },
    { name: "Deepseek", rating: 4, comment: "Free and handy. API is cheap." },
    { name: "Obsidian", rating: 3, comment: "Too complicated..." },
    { name: "Chatwise", rating: 4, comment: "Local LLM client with MCP integrated." },
    { name: "Cursor", rating: 4, comment: "Expensive vibe coding~~" },
    { name: "Kiro", rating: 4, comment: "Cheap vibe coding~~" },
    { name: "Ollama", rating: 4, comment: "Local LLM - Check out my cheat sheet!", link: "/articles/ollama-cheat-sheet-complete-command-reference" },
    { name: "Cline", rating: 2, comment: "Experience not as good as cursor." },
    { name: "Veo", rating: 3, comment: "I like the video made, but I do not know how to use it in finance topics." },
    { name: "VideoScribe", rating: 3, comment: "Too expensive. AI is not that smart." },   
    { name: "Canvas", rating: 5, comment: "Knowledge -> Websites -> Knowledge" },
    { name: "Neon", rating: 5, comment: "Free PostgreSQL Database" },
    { name: "Vercel", rating: 5, comment: "Free Next.js deployment. GraphQL server is having issue." },
    { name: "Render", rating: 4, comment: "Free server is a joke. 7 dollar server is OK." },
    { name: "CapCut", rating: 4, comment: "I use the AI subtitle, not that good" },
    { name: "QuantConnect", rating: 2, comment: "Server disconnect all the time" },
    { name: "AWS Lambda", rating: 3, comment: "Not straightfoward enough to deploy" },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-4xl font-bold">About the Creator</h1>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xl text-muted-foreground">
              Welcome to my personal journey into AI and finance
            </p>
          </div>

          {/* Introduction Card */}
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Welcome!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                I'm the creator of this site, but you can call me <strong>SOPHIE Daddy</strong>. 
                My day job is on Wall Street, but I believe financial knowledge shouldn't be a luxury, 
                so I am right here with you.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
                <p className="text-center font-semibold text-purple-700 text-xl">
                  My motto is simple: <strong>If it's complicated, let's break it down.</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                My Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                This website is my personal learning journey into the fascinating world of AI and finance. 
                Together, we'll decode complex topics—from open-source projects and stock analysis to 
                machine learning and app development.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-6 py-3 text-xl font-semibold">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Personal Hobby
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-6 py-3 text-xl font-semibold">
                  Completely Free
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-6 py-3 text-xl font-semibold">
                  Login Optional
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-6 py-3 text-xl font-semibold">
                  No Paid Subscriptions
                </Badge>
              </div>
              <p className="italic text-muted-foreground">
                Just pure, accessible knowledge.
              </p>
            </CardContent>
          </Card>

          {/* Sophie Dedication Card */}
          <Card className="mb-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-red-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-600" />
                For Sophie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                More than anything, this website is a celebration of my newborn daughter, <strong>Sophie</strong>. 
                As she grows up in a world powered by AI, I wanted to create something that represents 
                the best of what technology can offer: the power to empower, educate, and connect us all.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border border-pink-200 text-center">
                <p className="text-pink-700 font-medium">
                  💕 A gift of knowledge for the next generation 💕
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
            <CardContent className="py-6">
              <div className="text-center space-y-4">
                <p className="text-xl font-semibold text-green-700">
                  I'm so glad you're here. Let's learn together.
                </p>
                <p className="text-lg text-green-600">
                  Please leave me a comment in any forms, so that I know you've been here.
                </p>
                <p className="text-base text-green-600">
                  Want to support the site? The easiest way is to{" "}
                  <a
                    href="https://www.youtube.com/@SOPHIEAIFinance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:text-green-800"
                  >
                    subscribe on YouTube
                  </a>{" "}
                  — <Link href="/settings/profile" className="font-semibold underline hover:text-green-800">log in and confirm it on your profile</Link>{" "}
                  to unlock articles going forward. A tip jar for direct financial support is on the way too — stay tuned.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Membership Tiers Section */}
          <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-600" />
                Membership Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                Reading SOPHIE is free and open — no account needed for the home page, the article
                library, or the market tools. Just signing in earns your first rank and unlocks
                bookmarks, and each rank above that unlocks more — topic pages, comments, and
                premium articles plus a preferred video platform (YouTube or Bilibili) for the
                Watch card. Ranks 5-8 are earned the same way but don&apos;t unlock anything
                yet; that&apos;s coming later.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-amber-200 text-left">
                      <th className="py-2 pr-4 font-semibold">Tier</th>
                      <th className="py-2 pr-4 font-semibold">Rank</th>
                      <th className="py-2 pr-4 font-semibold">How to reach it</th>
                      <th className="py-2 font-semibold">Unlocks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TIER_ROWS.map((row) => (
                      <tr key={row.tier} className="border-b border-amber-100 align-top">
                        <td className="py-2 pr-4 font-mono text-amber-700">{row.tier}</td>
                        <td className="py-2 pr-4 font-medium whitespace-nowrap">{row.name}</td>
                        <td className="py-2 pr-4 text-slate-600">{row.how}</td>
                        <td className="py-2">
                          {row.unlocks === "Coming later" ? (
                            <span className="text-slate-400 italic">Coming later</span>
                          ) : row.unlocks === "Admin" ? (
                            <Badge className="whitespace-nowrap bg-purple-600 hover:bg-purple-600 text-white">
                              Admin
                            </Badge>
                          ) : row.unlocks ? (
                            <Badge variant="secondary" className="whitespace-nowrap">
                              {row.unlocks}
                            </Badge>
                          ) : (
                            <span className="text-slate-400">Rank only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-600">
                Likes and subscriptions run on the honor system — I don&apos;t verify them, and
                likes count once per video, not per click. Ranks only ever go up: earning one a
                second way never lowers a rank you already have. The single exception is
                un-subscribing on YouTube, which drops {getTierName(MIN_TOPIC_TIER)} back to{" "}
                {getTierName(1)} and leaves anything higher untouched. Supporting with a donation
                will unlock ranks too — that&apos;s coming soon.
              </p>
            </CardContent>
          </Card>

          {/* Tools & Resources Section */}
          <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code2 className="h-6 w-6 text-blue-600" />
                Tools & Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-blue-700 mb-6 text-center">
                Here are some useful tools and resources I've built for the community:
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Link
                  href="/rss"
                  className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium text-center"
                >
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 11a9 9 0 0 1 9 9" />
                    <path d="M4 4a16 16 0 0 1 16 16" />
                    <circle cx="5" cy="19" r="1" />
                  </svg>
                  RSS Feeds
                </Link>

                <Link
                  href="/seo-audit"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center"
                >
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  SEO Audit
                </Link>
                
                <a
                  href="https://expo.dev/artifacts/eas/suf2rGRxaZbbecneq36JrS.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-center"
                >
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <line x1="12" y1="20" x2="12" y2="20" />
                  </svg>
                  Android App
                </a>
              </div>
            </CardContent>
          </Card>

          {/* AI Toolkit Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code2 className="h-6 w-6 text-indigo-600" />
                My AI Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">AI Tool Name</th>
                      <th className="text-center py-3 px-2 font-semibold">Rating</th>
                      <th className="text-left py-3 px-2 font-semibold">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiTools.map((tool, index) => (
                      <tr key={tool.name} className={`border-b ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                        <td className="py-3 px-2 font-medium">
                          {tool.link ? (
                            <Link href={tool.link} className="text-blue-600 hover:text-blue-800 hover:underline">
                              {tool.name}
                            </Link>
                          ) : (
                            tool.name
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <div className="flex justify-center gap-1">
                            {renderStars(tool.rating)}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">{tool.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Disclaimer />
    </div>
  );
} 