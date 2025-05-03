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
    <TooltipProvider delayDuration={100}>
      <Tooltip.Root>
        <TooltipTrigger asChild>
          <button 
            type="button" 
            className={`inline-flex items-center justify-center rounded-full border w-4 h-4 text-[10px] text-muted-foreground font-medium hover:bg-muted cursor-help transition-colors ${className}`}
            aria-label="More information"
          >
            i
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="max-w-xs text-xs">
          {text}
        </TooltipContent>
      </Tooltip.Root>
    </TooltipProvider>
  );
} 