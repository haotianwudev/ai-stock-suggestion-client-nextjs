"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BarChart3,
  TrendingUp,
  Brain,
  Award,
  Flame,
  Gem,
  Trophy,
  Crown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { TIER_PERKS_LADDER, getTierMetadata, type TierIconName } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import { SlotKicker } from "@/components/articles/article-frame";

const ICON_MAP: Record<TierIconName, LucideIcon> = {
  GraduationCap,
  BarChart3,
  TrendingUp,
  Brain,
  Award,
  Flame,
  Gem,
  Trophy,
  Crown,
};

export interface TierHoverCardProps {
  children: React.ReactNode;
  highlightTier?: number;
  align?: "start" | "center" | "end";
  className?: string;
}

export function TierHoverCard({
  children,
  highlightTier = 1,
  align = "center",
  className,
}: TierHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openCard = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const closeCard = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
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

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={openCard}
      onMouseLeave={closeCard}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer inline-flex items-center"
      >
        {children}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 z-50 w-72 sm:w-80 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150",
            alignClasses
          )}
          onMouseEnter={openCard}
          onMouseLeave={closeCard}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-800">
            <SlotKicker icon={Crown} label="Ranks & Tiers" tone="accent" />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] font-semibold">
              Tier {highlightTier}
            </span>
          </div>

          {/* Compact Tier List */}
          <div className="mt-2.5 max-h-64 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {TIER_PERKS_LADDER.map((item) => {
              const meta = getTierMetadata(item.tier);
              const Icon = ICON_MAP[meta.iconName] ?? GraduationCap;
              const isCurrent = highlightTier === item.tier;

              return (
                <div
                  key={item.tier}
                  className={cn(
                    "flex items-center justify-between gap-2 p-1.5 rounded-xl border text-xs transition-colors",
                    isCurrent
                      ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10"
                      : "border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={cn(
                        "size-5.5 rounded-md flex items-center justify-center border text-[10px] shrink-0",
                        meta.classes.badge
                      )}
                    >
                      <Icon className="size-3" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "font-semibold text-xs truncate block",
                          isCurrent
                            ? "text-[#A8672E] dark:text-[#D08F52]"
                            : "text-gray-900 dark:text-gray-100"
                        )}
                      >
                        {item.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground block truncate">
                        {item.unlocksSummary}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 shrink-0 font-medium">
                    T{item.tier}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer Quick Links */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors flex items-center gap-0.5"
              onClick={() => setIsOpen(false)}
            >
              All Perks
              <ChevronRight className="size-3" />
            </Link>
            <Link
              href="/donate"
              className="font-semibold text-[#A8672E] dark:text-[#D08F52] hover:underline flex items-center gap-0.5"
              onClick={() => setIsOpen(false)}
            >
              Upgrade Tier
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
