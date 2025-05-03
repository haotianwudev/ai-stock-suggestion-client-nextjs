import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoIconProps {
  text: string;
  className?: string;
}

export function InfoIcon({ text, className = "" }: InfoIconProps) {
  return (
    <TooltipProvider>
      <Tooltip.Root>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center justify-center rounded-full border w-4 h-4 text-[10px] text-muted-foreground font-medium hover:bg-muted cursor-help transition-colors ${className}`}>
            i
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip.Root>
    </TooltipProvider>
  );
} 