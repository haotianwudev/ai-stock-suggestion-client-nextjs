"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { wikiEntries, getWikiCategories } from "@/data/wiki";

export function WikiIndex() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => getWikiCategories(), []);

  const filtered = useMemo(() => {
    return wikiEntries.filter((entry) => {
      const category = entry.path.split("/")[0];
      if (selectedCategory && category !== selectedCategory) return false;
      if (searchText) {
        const haystack = `${entry.title} ${entry.summary}`.toLowerCase();
        if (!haystack.includes(searchText.toLowerCase())) return false;
      }
      return true;
    });
  }, [searchText, selectedCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof wikiEntries>();
    for (const entry of filtered) {
      const category = entry.path.split("/")[0];
      map.set(category, [...(map.get(category) ?? []), entry]);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search the wiki..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-12">No wiki entries match your search.</p>
      ) : (
        <div className="space-y-10">
          {[...grouped.entries()].map(([category, entries]) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 capitalize">
                {category.replace(/-/g, " ")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {entries.map((entry) => (
                  <Link
                    key={entry.path}
                    href={`/wiki/${entry.path}`}
                    className="block p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5 line-clamp-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{entry.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
