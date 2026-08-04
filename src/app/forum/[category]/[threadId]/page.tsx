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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <ThreadDetailClient threadId={threadId} />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
