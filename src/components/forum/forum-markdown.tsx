"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Link from "next/link";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-3 mb-1.5 first:mt-0 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-3 mb-1.5 first:mt-0 tracking-tight border-b border-gray-200/80 dark:border-gray-800/80 pb-1">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-2.5 mb-1 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-serif text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 mb-1 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-2 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-2 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-3 border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-r-lg px-3 py-1.5 italic text-slate-700 dark:text-slate-300 my-2 text-xs sm:text-sm">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="text-[#A8672E] dark:text-[#D08F52] underline underline-offset-2 hover:opacity-80 transition-colors font-medium break-words"
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
        className="text-[#A8672E] dark:text-[#D08F52] underline underline-offset-2 hover:opacity-80 transition-colors font-medium break-words"
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
      <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[#A8672E] dark:text-[#D08F52] font-mono text-[11px] sm:text-xs border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 my-2 text-xs font-mono border border-gray-800 shadow-inner">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
      <table className="min-w-full border-collapse text-xs">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 font-semibold text-slate-900 dark:text-slate-100">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-1.5 text-left font-semibold text-slate-900 dark:text-slate-100 border-r last:border-r-0 border-gray-200 dark:border-gray-800">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-1.5 text-slate-700 dark:text-slate-300 border-t border-r last:border-r-0 border-gray-200 dark:border-gray-800">
      {children}
    </td>
  ),
  hr: () => <hr className="my-3 border-gray-200 dark:border-gray-800" />,
  strong: ({ children }) => (
    <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>
  ),
};

interface ForumMarkdownProps {
  content: string;
  className?: string;
}

export function ForumMarkdown({ content, className = "" }: ForumMarkdownProps) {
  return (
    <div className={`prose-sm max-w-none text-slate-800 dark:text-slate-200 ${className}`}>
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
