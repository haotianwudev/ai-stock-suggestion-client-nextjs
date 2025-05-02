import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">SOPHIE</span>
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Your Smart Stock/Option Portfolio Helper
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Empowering investors with intelligent insights, education, and portfolio management tools for stock and option investments.
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
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              SOPHIE provides comprehensive tools to help with your investment decisions and financial education.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Market Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Access up-to-date information on stock prices, options, volumes, and market trends.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Portfolio Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Track and analyze your investments with advanced portfolio management tools.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Financial Metrics</h3>
                  <p className="text-sm text-muted-foreground">
                    View key financial metrics like market cap, P/E ratio, option Greeks, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Interactive Charts</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize stock and option performance with interactive price and volatility charts.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Investment Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about investing strategies with our educational resources and news insights.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Smart Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Quickly find stocks and options with our intelligent search functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} SOPHIE - Stock/Option Portfolio Helper. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
