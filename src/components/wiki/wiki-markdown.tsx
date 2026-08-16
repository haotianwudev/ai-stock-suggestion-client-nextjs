"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3 first:mt-0 tracking-tight border-b border-gray-100 dark:border-gray-800 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-r-xl px-4 py-3 italic text-gray-700 dark:text-gray-300 my-4 text-sm sm:text-base">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="text-[#A8672E] dark:text-[#D08F52] underline underline-offset-2 hover:text-[#8f5726] dark:hover:text-[#e2a877] transition-colors font-medium"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#A8672E] dark:text-[#D08F52] underline underline-offset-2 hover:text-[#8f5726] dark:hover:text-[#e2a877] transition-colors font-medium"
      >
        {children}
      </a>
    );
  },
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className={`${className ?? ""} block`}>{children}</code>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[#A8672E] dark:text-[#D08F52] font-mono text-xs sm:text-sm border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 mb-4 text-xs sm:text-sm font-mono border border-gray-800 shadow-inner">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <table className="min-w-full border-collapse text-xs sm:text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-3.5 py-2.5 text-left font-semibold text-gray-900 dark:text-gray-100 border-r last:border-r-0 border-gray-200 dark:border-gray-800">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3.5 py-2.5 text-gray-700 dark:text-gray-300 border-t border-r last:border-r-0 border-gray-200 dark:border-gray-800">
      {children}
    </td>
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
  ),
};

interface WikiMarkdownProps {
  content: string;
  className?: string;
}

export function WikiMarkdown({ content, className = "" }: WikiMarkdownProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
