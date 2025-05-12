"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, DollarSign, LineChart, BarChart4 } from "lucide-react";

export default function OptionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Option Page To Be Updated
            </h1>
            <p className="text-muted-foreground">
              Learn when and how to effectively use options in your investment strategy
            </p>
          </div>

          <Tabs defaultValue="when-to-trade">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="when-to-trade">When to Trade</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="when-to-trade" className="space-y-6 py-4">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Hedging Risk */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle>1. Hedging Risk (Insurance)</CardTitle>
                      <CardDescription>Protect your portfolio</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You own 100 shares of TSLA and want to protect against a drop.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a protective put (limits downside risk).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Cheaper than selling stock; defines max loss.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Speculating with Leverage */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <CardTitle>2. Speculating with Leverage</CardTitle>
                      <CardDescription>Amplify your returns</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You believe NVDA will rise but don't want to buy shares.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a call option (small capital, high upside).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          More leverage than stocks (higher % gains).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Income Generation */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                    <div>
                      <CardTitle>3. Income Generation</CardTitle>
                      <CardDescription>Selling premium</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You think SPY will stay flat or rise slightly.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Sell a covered call (earn premium while holding shares).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Generates passive income in sideways markets.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Betting on Volatility */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <LineChart className="h-6 w-6 text-purple-500" />
                    <div>
                      <CardTitle>4. Betting on Volatility</CardTitle>
                      <CardDescription>Not direction</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          Earnings season—you expect AMZN to move sharply but don't know the direction.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a straddle (profits from big moves up or down).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Stocks can't profit from volatility alone.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Capital Efficiency */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <BarChart4 className="h-6 w-6 text-indigo-500" />
                    <div>
                      <CardTitle>5. Capital Efficiency</CardTitle>
                      <CardDescription>Defined risk strategies</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You want to bet on AAPL rising but limit losses.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Use a bull call spread (lower cost than buying stock).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Defined risk, less capital than buying shares.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* When NOT to Use Options */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-500">🚫 When NOT to Use Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Short-Term Gambling</span> – Buying weekly OTM options is like buying lottery tickets (most expire worthless).
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Without Understanding Greeks</span> – If you don't know Delta, Theta, or IV, you'll lose money.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Illiquid Markets</span> – Avoid options with low volume (wide bid-ask spreads = bad fills).
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Options Strategies</CardTitle>
                  <CardDescription>Coming soon!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check back soon!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Disclaimer />
    </div>
  );
} 