import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate | SOPHIE",
  description: "Support SOPHIE Daddy Quant Blog directly. Donations promote your account tier and unlock perks.",
};

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <DonateClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
