"use client";

import React from "react";
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
  type LucideIcon,
} from "lucide-react";
import { getTierMetadata, type TierIconName } from "@/lib/tiers";
import { cn } from "@/lib/utils";

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

export interface TierBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tier?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "solid" | "outline" | "glow";
  showIcon?: boolean;
  showTierNumber?: boolean | "prefix" | "badge";
  showLabel?: boolean;
  interactive?: boolean;
}

const SIZE_CLASSES = {
  xs: "text-[10px] px-1.5 py-0.5 gap-1 rounded-full font-medium leading-none",
  sm: "text-xs px-2.5 py-0.5 gap-1.5 rounded-full font-medium leading-normal",
  md: "text-sm px-3 py-1 gap-1.5 rounded-full font-semibold leading-normal",
  lg: "text-base px-4 py-1.5 gap-2 rounded-full font-bold leading-normal",
};

const ICON_SIZE_CLASSES = {
  xs: "size-2.5 shrink-0",
  sm: "size-3 shrink-0",
  md: "size-3.5 shrink-0",
  lg: "size-4 shrink-0",
};

export const TierBadge = React.forwardRef<HTMLSpanElement, TierBadgeProps>(
  (
    {
      tier = 1,
      size = "sm",
      variant = "default",
      showIcon = true,
      showTierNumber = false,
      showLabel = true,
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const meta = getTierMetadata(tier);
    const Icon = ICON_MAP[meta.iconName] ?? GraduationCap;

    let variantClasses = meta.classes.badge;
    if (variant === "solid") {
      variantClasses = meta.classes.solid;
    } else if (variant === "outline") {
      variantClasses = meta.classes.outline;
    } else if (variant === "glow") {
      variantClasses = cn(
        meta.classes.badge,
        "shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_14px_rgba(255,255,255,0.06)]"
      );
    }

    const iconColorClass = variant === "solid" ? "text-white" : meta.classes.icon;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center border transition-all duration-200 select-none whitespace-nowrap",
          SIZE_CLASSES[size],
          variantClasses,
          interactive && "hover:scale-[1.03] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {showIcon && (
          <Icon className={cn(ICON_SIZE_CLASSES[size], iconColorClass)} aria-hidden="true" />
        )}
        {showTierNumber === "badge" && (
          <span className="opacity-75 font-mono text-[0.85em]">#{meta.tier}</span>
        )}
        {showTierNumber === "prefix" && (
          <span className="opacity-75 font-mono text-[0.85em]">{meta.shortName}</span>
        )}
        {children ? (
          children
        ) : showLabel ? (
          <span>{meta.name}</span>
        ) : null}
      </span>
    );
  }
);

TierBadge.displayName = "TierBadge";
