import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ThanksClient } from "./thanks-client";

export const metadata: Metadata = {
  title: "Thank You | SOPHIE",
  description: "Thanks for supporting SOPHIE Daddy Quant Blog.",
};

export default function DonateThanksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <ThanksClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
