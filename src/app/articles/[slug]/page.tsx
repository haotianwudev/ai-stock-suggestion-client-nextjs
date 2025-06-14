import MattLevineOpinionsPage from "../matt-levine-opinions/page";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  if (params.slug === "matt-levine-opinions") {
    return <MattLevineOpinionsPage />;
  }
  // ... existing code ...
} 