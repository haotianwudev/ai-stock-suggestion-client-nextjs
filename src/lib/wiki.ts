/**
 * Shared utilities for the wiki knowledge-base system.
 * Wiki entries live as markdown files under public/wiki/<path>.md and are
 * indexed in src/data/wiki/index.ts.
 */

export interface WikiFrontmatter {
  path: string;
  title: string;
  articleSlug?: string;
  date?: string;
  labels?: string[];
  related?: string[];
}

export interface ParsedWikiMarkdown {
  frontmatter: WikiFrontmatter;
  content: string;
}

// Very small YAML-subset frontmatter parser: supports string, and
// bracketed string-array values only, which is all wiki files use.
export function stripFrontmatter(raw: string): ParsedWikiMarkdown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { frontmatter: { path: "", title: "" }, content: raw };
  }

  const frontmatterBlock = match[1];
  const content = raw.slice(match[0].length);

  const frontmatter: Record<string, string | string[]> = {};
  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const lineMatch = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!lineMatch) continue;
    const [, key, rawValue] = lineMatch;
    const value = rawValue.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      frontmatter[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return {
    frontmatter: {
      path: (frontmatter.path as string) || "",
      title: (frontmatter.title as string) || "",
      articleSlug: frontmatter.articleSlug as string | undefined,
      date: frontmatter.date as string | undefined,
      labels: frontmatter.labels as string[] | undefined,
      related: frontmatter.related as string[] | undefined,
    },
    content,
  };
}

export function wikiPathToPublicFile(path: string): string {
  return `/wiki/${path}.md`;
}

export function wikiPathToRoute(path: string): string {
  return `/wiki/${path}`;
}
