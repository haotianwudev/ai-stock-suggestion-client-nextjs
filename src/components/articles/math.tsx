"use client";

import katex from "katex";
import { useMemo } from "react";

function render(math: string, displayMode: boolean): string {
  try {
    return katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    return math;
  }
}

interface InlineMathProps {
  math: string;
  className?: string;
}

export function InlineMath({ math, className = "" }: InlineMathProps) {
  const html = useMemo(() => render(math, false), [math]);
  return (
    <span
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MathBlockProps {
  math: string;
  className?: string;
}

export function MathBlock({ math, className = "" }: MathBlockProps) {
  const html = useMemo(() => render(math, true), [math]);
  return (
    <div className={`overflow-x-auto py-2 ${className}`}>
      <div
        className="min-w-fit"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
