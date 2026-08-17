"use client";

// Chat-scale markdown, reusing the same remark/rehype plugin trio as
// src/components/wiki/wiki-markdown.tsx (remarkGfm + remarkMath + rehypeKatex — KaTeX CSS is
// already imported globally in globals.css) but with a compact component map: wiki-markdown.tsx's
// spacing (text-3xl headings, mt-8 margins) is article-scale and far too large for a ~360px chat
// panel.

import { MarkdownTextPrimitive, type MarkdownTextPrimitiveProps } from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

const components: NonNullable<MarkdownTextPrimitiveProps["components"]> = {
  h1: ({ children }) => <h3 className="font-serif text-base font-bold text-gray-900 dark:text-gray-100 mt-3 mb-1.5">{children}</h3>,
  h2: ({ children }) => <h4 className="font-serif text-sm font-bold text-gray-900 dark:text-gray-100 mt-3 mb-1">{children}</h4>,
  h3: ({ children }) => <h5 className="font-serif text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2 mb-1">{children}</h5>,
  p: ({ children }) => <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    const cls = "text-[#A8672E] dark:text-[#D08F52] underline underline-offset-2 font-medium";
    if (isInternal && href) {
      return <Link href={href} className={cls}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  },
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) return <code className={`${className ?? ""} block`}>{children}</code>;
    return (
      <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[#A8672E] dark:text-[#D08F52] font-mono text-xs">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 mb-2 text-xs font-mono">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2 rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="min-w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="px-2 py-1 text-left font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800">{children}</th>,
  td: ({ children }) => <td className="px-2 py-1 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">{children}</td>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
};

export const ChatMarkdown = () => (
  <MarkdownTextPrimitive
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
    components={components}
    className="prose-sm max-w-none"
  />
);
