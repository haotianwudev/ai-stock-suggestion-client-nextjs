"use client";
import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/articles/article-card";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BookSummaryPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') {
        setUnlocked(true);
        setIsLocal(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "book") {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Filter book summary articles
  const bookArticles = articles.filter(a => a.bookSummary);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Book Summaries</h1>
        {!unlocked ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 max-w-md mx-auto">
            <label htmlFor="password" className="font-medium">Enter password to view book summaries:</label>
            <input
              id="password"
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-200"
            >
              Unlock
            </button>
          </form>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookArticles.map(article => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug}
                date={article.date}
                imageUrl={article.imageUrl}
                googleDoc={article.googleDoc}
                deepResearch={article.deepResearch}
                youtubeUrl={article.youtubeUrl}
                isVideo={article.isVideo}
                options={article.options}
              />
            ))}
          </div>
        )}
        {isLocal && (
          <div className="mt-4 text-center text-green-700 text-sm font-medium">Password is not required on localhost.</div>
        )}
      </div>
    </div>
  );
} 