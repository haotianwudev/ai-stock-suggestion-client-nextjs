"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { topicsConfig as optionTopicsConfig } from "@/app/option/topics/config";
import { topicsConfig as quantTopicsConfig } from "@/app/quant/topics/config";
import { quantTopicsConfig as quantTradingTopicsConfig } from "@/app/quant/quanttrading/config";
import { topicsConfig as stockTopicsConfig } from "@/app/stock/topics/config";

export interface TopicTitleSwitcherProps {
  currentTopicId: string;
  title: string;
}

const TOPIC_GROUPS = [
  {
    category: "Options Topics",
    basePath: "/option/topics",
    configs: optionTopicsConfig,
  },
  {
    category: "Quantitative Finance",
    basePath: "/quant/topics",
    configs: quantTopicsConfig,
  },
  {
    category: "Quant Trading Systems",
    basePath: "/quant/quanttrading",
    configs: quantTradingTopicsConfig,
  },
  {
    category: "Stock Investment & Analysis",
    basePath: "/stock/investment",
    configs: stockTopicsConfig,
  },
];

const TOPIC_HREF_OVERRIDES: Record<string, string> = {
  "stock-analysis": "/stock/stock-analysis/stock-analysis",
  "13f-analysis": "/stock/stock-analysis/13f-analysis",
  "etf-mutual-fund": "/stock/stock-analysis/etf-mutual-fund",
};

export function TopicTitleSwitcher({ currentTopicId, title }: TopicTitleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full max-w-3xl"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <div
        className="group inline-flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-1.5 leading-tight transition-colors group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52]">
          {title}
        </h1>
        <div className="shrink-0 size-7 sm:size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] group-hover:bg-[#A8672E]/10 dark:group-hover:bg-[#D08F52]/10 flex items-center justify-center transition-all duration-200 shadow-xs mb-1">
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#A8672E] dark:text-[#D08F52]" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 z-50 w-full max-w-lg sm:max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-[#A8672E] dark:text-[#D08F52]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Explore All Topics
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">Hover or click to switch</span>
          </div>

          <div className="mt-3 max-h-80 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            {TOPIC_GROUPS.map((group) => {
              const topicEntries = Object.values(group.configs);
              return (
                <div key={group.category} className="space-y-1.5">
                  <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {topicEntries.map((topic) => {
                      const isCurrent = topic.id === currentTopicId;
                      const href = TOPIC_HREF_OVERRIDES[topic.id] ?? `${group.basePath}/${topic.id}`;
                      return (
                        <Link
                          key={topic.id}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl border text-xs font-medium transition-colors ${
                            isCurrent
                              ? "border-[#A8672E]/40 dark:border-[#D08F52]/40 bg-[#A8672E]/5 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]"
                              : "border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span className="truncate">{topic.title}</span>
                          {isCurrent && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] px-1 py-0 bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52] shrink-0"
                            >
                              Current
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
