"use client";

import { CategoryList } from "@/components/forum/category-list";

export function ForumClient() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Forum</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Pick a category to browse discussions.
        </p>
      </div>
      <CategoryList />
    </div>
  );
}
