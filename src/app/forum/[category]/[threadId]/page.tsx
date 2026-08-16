import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { ThreadDetailClient } from "./thread-detail-client";

type Params = {
  category: string;
  threadId: string;
};

export default async function ForumThreadPage({ params }: { params: Params }) {
  const { threadId } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          <ThreadDetailClient threadId={threadId} />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
