import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { InvestmentClockClient } from "./investment-clock-client";

export const metadata: Metadata = {
  title: "Investment Clock | SOPHIE",
  description:
    "Real-time macroeconomic cycle tracker using the Merrill Lynch Investment Clock framework. Track Reflation, Recovery, Overheat, and Stagflation phases.",
};

export default function InvestmentClockPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <InvestmentClockClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
