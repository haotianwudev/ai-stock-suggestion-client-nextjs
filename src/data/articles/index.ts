import { Article, generateSlugFromTitle, postprocessArticles } from './types';
import { articles2026Q3 } from './2026-q3';
import { articles2026Q2 } from './2026-q2';
import { articles2026Q1 } from './2026-q1';
import { articles2025Q4 } from './2025-q4';
import { articles2025Q3 } from './2025-q3';
import { articles2025Q2 } from './2025-q2';

// All articles combined
const allArticlesRaw = [
  ...articles2026Q3,
  ...articles2026Q2,
  ...articles2026Q1,
  ...articles2025Q4,
  ...articles2025Q3,
  ...articles2025Q2,
];

// Post-process all articles: add slug if missing and auto-generate labels from flags
export const articles = postprocessArticles(
  allArticlesRaw.map(article => ({
    ...article,
    slug: article.slug || generateSlugFromTitle(article.title)
  }))
);
