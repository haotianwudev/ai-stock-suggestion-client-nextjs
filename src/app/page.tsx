import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
          <div className="container max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center gap-4 text-center max-w-[64rem] mx-auto">
              <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
              </h1>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Stock/Option Portfolio Helper for Investment and Education
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Empowering stock and option investors with insights, education, and ideas by SOPHIE using AI.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg">
                  <Link href="/trending">
                    <SearchIcon className="mr-2 h-4 w-4" />
                    Explore Trending Stocks
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="container max-w-screen-xl mx-auto space-y-6 py-8 md:py-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[64rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              SOPHIE analyzes stocks from multiple perspectives to provide comprehensive insights for investors at all experience levels.
            </p>
          </div>
          <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive stock analysis using SOPHIE, our AI model that synthesizes all available data into actionable insights.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Technical Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced technical indicators including trend analysis, momentum, mean reversion, volatility metrics, and statistical arbitrage signals.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Fundamental Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep evaluation of company fundamentals across profitability, growth, financial health, and valuation metrics.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Market Sentiment</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of market psychology through news sentiment, insider trading activity, and institutional interest signals.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Investment Legends</h3>
                  <p className="text-sm text-muted-foreground">
                    Stock analysis through the lens of legendary investors like Warren Buffett and Charlie Munger to provide time-tested perspectives.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[160px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Educational Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed for learning - all analyses include clear explanations to help new investors understand market concepts and terminology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} SOPHIE - Stock/Option Portfolio Helper. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Some analysis methodologies are inspired by <a href="https://github.com/virattt/ai-hedge-fund" className="underline hover:text-primary">ai-hedge-fund</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
