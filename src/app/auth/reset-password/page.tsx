import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ResetPasswordClient } from "./reset-password-client";

export const metadata: Metadata = {
  title: "Reset Password | SOPHIE",
  description: "Set a new password for your account.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-sm px-4 py-8">
          <ResetPasswordClient />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
