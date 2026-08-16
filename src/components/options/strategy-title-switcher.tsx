"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { strategies, strategyIdToSlug } from "./strategy-config";
import { SlotKicker } from "@/components/articles/article-frame";

export interface StrategyTitleSwitcherProps {
  currentStrategyId: string;
  name: string;
}

export function StrategyTitleSwitcher({
  currentStrategyId,
  name,
}: StrategyTitleSwitcherProps) {
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

  const categorizedStrategies = [
    {
      group: "Bullish & Neutral",
      items: strategies.filter((s) => s.category.includes("Bullish") || s.category.includes("Income")),
    },
    {
      group: "Bearish",
      items: strategies.filter((s) => s.category.includes("Bearish")),
    },
    {
      group: "Volatility & Market Neutral",
      items: strategies.filter((s) => s.category.includes("Neutral") || s.category.includes("Volatility")),
    },
  ];

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
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3 transition-colors group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52]">
          {name}
        </h1>
        <div className="shrink-0 size-7 sm:size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] group-hover:bg-[#A8672E]/10 dark:group-hover:bg-[#D08F52]/10 flex items-center justify-center transition-all duration-200 shadow-xs mb-2">
          <ChevronDown
            className={`size-3.5 sm:size-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#A8672E] dark:text-[#D08F52]" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 z-50 w-full max-w-lg sm:max-w-xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-800">
            <SlotKicker icon={TrendingUp} label="Option Strategies" tone="accent" />
          </div>

          <div className="mt-3 max-h-80 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            {categorizedStrategies.map((cat) => {
              if (cat.items.length === 0) return null;
              return (
                <div key={cat.group} className="space-y-1.5">
                  <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
                    {cat.group}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {cat.items.map((strategy) => {
                      const isCurrent = strategy.id === currentStrategyId;
                      const slug = strategyIdToSlug(strategy.id);
                      return (
                        <Link
                          key={strategy.id}
                          href={`/option/strategies/${slug}`}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl border text-xs font-medium transition-colors ${
                            isCurrent
                              ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]"
                              : "border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <span className="truncate font-semibold">{strategy.name}</span>
                          {isCurrent && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] px-1 py-0 bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52] shrink-0"
                            >
                              Active
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
