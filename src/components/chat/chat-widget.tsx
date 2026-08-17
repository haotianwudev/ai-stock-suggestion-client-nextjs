"use client";

// The floating launcher + panel with full drag-and-drop movement and free resizing across the page.
// Gated by localhost-only checks (see docs/SOPHIE_AGENT.md).

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MessageCircle,
  X,
  Maximize2,
  Minimize2,
  GripHorizontal,
  Move,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { ChatThread } from "./chat-thread";
import { cn } from "@/lib/utils";

const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];

const MIN_WIDTH = 340;
const MIN_HEIGHT = 420;
const DEFAULT_WIDTH = 460;
const DEFAULT_HEIGHT = 640;

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState("generalist");
  const [allowed, setAllowed] = useState(false);

  // Position & size state
  const [position, setPosition] = useState<Position | null>(null);
  const [size, setSize] = useState<Size>({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevBounds, setPrevBounds] = useState<{ pos: Position; size: Size } | null>(null);

  // Active interaction tracking refs
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const resizeRef = useRef<{
    direction: ResizeDirection;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
  } | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // Layer 3: refuse to mount against a non-local hostname
  useEffect(() => {
    setAllowed(LOCAL_HOSTNAMES.includes(window.location.hostname));
  }, []);

  // Initialize position to bottom-right when first opened
  const initPosition = useCallback(() => {
    if (typeof window === "undefined") return;
    const initialWidth = Math.min(DEFAULT_WIDTH, window.innerWidth - 32);
    const initialHeight = Math.min(DEFAULT_HEIGHT, window.innerHeight - 80);
    const initialX = Math.max(16, window.innerWidth - initialWidth - 24);
    const initialY = Math.max(16, window.innerHeight - initialHeight - 32);

    setSize({ width: initialWidth, height: initialHeight });
    setPosition({ x: initialX, y: initialY });
  }, []);

  const handleOpen = () => {
    if (!position) {
      initPosition();
    }
    setOpen(true);
  };

  // Keep window within viewport bounds when window resizes
  useEffect(() => {
    const handleWindowResize = () => {
      if (isMaximized) return;
      setPosition((prevPos) => {
        if (!prevPos) return null;
        const maxX = Math.max(0, window.innerWidth - size.width);
        const maxY = Math.max(0, window.innerHeight - size.height);
        return {
          x: Math.min(Math.max(0, prevPos.x), maxX),
          y: Math.min(Math.max(0, prevPos.y), maxY),
        };
      });
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [size, isMaximized]);

  // Drag handling
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMaximized || !position) return;
    // Don't drag if clicking buttons or interactive elements
    if ((e.target as HTMLElement).closest("button, input, select, a")) return;

    e.preventDefault();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;

      const maxX = Math.max(0, window.innerWidth - size.width);
      const maxY = Math.max(0, window.innerHeight - size.height);

      const newX = Math.min(Math.max(0, dragRef.current.initialX + dx), maxX);
      const newY = Math.min(Math.max(0, dragRef.current.initialY + dy), maxY);

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Resize handling
  const handleResizeStart = (direction: ResizeDirection, e: React.PointerEvent) => {
    if (isMaximized || !position) return;
    e.preventDefault();
    e.stopPropagation();

    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      initialWidth: size.width,
      initialHeight: size.height,
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!resizeRef.current) return;
      const {
        direction: dir,
        startX,
        startY,
        initialX,
        initialY,
        initialWidth,
        initialHeight,
      } = resizeRef.current;

      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = initialWidth;
      let newHeight = initialHeight;
      let newX = initialX;
      let newY = initialY;

      const maxWidth = window.innerWidth - 16;
      const maxHeight = window.innerHeight - 16;

      // Handle horizontal adjustments
      if (dir.includes("e")) {
        newWidth = Math.min(Math.max(MIN_WIDTH, initialWidth + dx), maxWidth - initialX);
      } else if (dir.includes("w")) {
        const potentialWidth = initialWidth - dx;
        if (potentialWidth >= MIN_WIDTH && initialX + dx >= 0) {
          newWidth = potentialWidth;
          newX = initialX + dx;
        }
      }

      // Handle vertical adjustments
      if (dir.includes("s")) {
        newHeight = Math.min(Math.max(MIN_HEIGHT, initialHeight + dy), maxHeight - initialY);
      } else if (dir.includes("n")) {
        const potentialHeight = initialHeight - dy;
        if (potentialHeight >= MIN_HEIGHT && initialY + dy >= 0) {
          newHeight = potentialHeight;
          newY = initialY + dy;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      resizeRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Maximize / restore toggle
  const toggleMaximize = () => {
    if (!position) return;
    if (isMaximized) {
      if (prevBounds) {
        setPosition(prevBounds.pos);
        setSize(prevBounds.size);
      }
      setIsMaximized(false);
    } else {
      setPrevBounds({ pos: position, size });
      setPosition({ x: 16, y: 16 });
      setSize({
        width: window.innerWidth - 32,
        height: window.innerHeight - 32,
      });
      setIsMaximized(true);
    }
  };

  // Pop-out standalone window handler
  const handlePopout = () => {
    const popoutUrl = "/agent-popout";
    const width = Math.min(520, window.screen.availWidth - 40);
    const height = Math.min(760, window.screen.availHeight - 80);
    const left = Math.max(0, window.screen.availWidth - width - 40);
    const top = 40;

    window.open(
      popoutUrl,
      "SophieAgentPopout",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
    );
    setOpen(false);
  };

  if (!allowed) return null;

  return (
    <>
      {/* Floating launcher button when closed */}
      {!open && (
        <div className="fixed bottom-4 right-20 z-50">
          <button
            onClick={handleOpen}
            className="rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white p-3.5 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Open Sophie Agent chat"
            title="Sophie Agent (local dev only)"
          >
            <MessageCircle className="size-5" />
          </button>
        </div>
      )}

      {/* Draggable & Resizable Chat Window */}
      {open && position && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            zIndex: 50,
          }}
          className={cn(
            "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col transition-shadow",
            isMaximized ? "rounded-xl" : "rounded-2xl"
          )}
        >
          {/* Draggable Header Bar */}
          <div
            onPointerDown={handleDragStart}
            onDoubleClick={toggleMaximize}
            className={cn(
              "flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-[#FDFBF7] dark:bg-[#121110] select-none",
              isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            )}
          >
            {/* Title & Drag Handle Icon */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-gray-400 dark:text-gray-500" title="Drag to move">
                <Move className="size-3.5" />
              </div>
              <span className="font-serif font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                Sophie Agent{" "}
                <span className="text-[10px] font-sans font-normal text-gray-400">
                  (local dev only)
                </span>
              </span>
            </div>

            {/* Header Action Buttons */}
            <div
              className="flex items-center gap-1 shrink-0"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handlePopout}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="Pop out into detached standalone window (immune to page reloads)"
                aria-label="Pop out chat"
              >
                <ExternalLink className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={initPosition}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="Reset window position and size"
                aria-label="Reset window"
              >
                <RotateCcw className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleMaximize}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title={isMaximized ? "Restore window" : "Maximize window"}
                aria-label={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close chat"
                title="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Main Chat Thread */}
          <div className="flex-1 min-h-0 relative">
            <ChatThread profile={profile} onProfileChange={setProfile} />
          </div>

          {/* Resizing Edge Handles (Only active when not maximized) */}
          {!isMaximized && (
            <>
              {/* Edges */}
              <div
                onPointerDown={(e) => handleResizeStart("n", e)}
                className="absolute top-0 left-2 right-2 h-1.5 cursor-n-resize select-none"
              />
              <div
                onPointerDown={(e) => handleResizeStart("s", e)}
                className="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize select-none"
              />
              <div
                onPointerDown={(e) => handleResizeStart("w", e)}
                className="absolute left-0 top-2 bottom-2 w-1.5 cursor-w-resize select-none"
              />
              <div
                onPointerDown={(e) => handleResizeStart("e", e)}
                className="absolute right-0 top-2 bottom-2 w-1.5 cursor-e-resize select-none"
              />

              {/* Corners */}
              <div
                onPointerDown={(e) => handleResizeStart("nw", e)}
                className="absolute top-0 left-0 size-3 cursor-nw-resize select-none z-10"
              />
              <div
                onPointerDown={(e) => handleResizeStart("ne", e)}
                className="absolute top-0 right-0 size-3 cursor-ne-resize select-none z-10"
              />
              <div
                onPointerDown={(e) => handleResizeStart("sw", e)}
                className="absolute bottom-0 left-0 size-3 cursor-sw-resize select-none z-10"
              />
              <div
                onPointerDown={(e) => handleResizeStart("se", e)}
                className="absolute bottom-0 right-0 size-4 cursor-se-resize select-none z-10 flex items-center justify-center group"
                title="Drag to resize window"
              >
                <div className="size-2 rounded-br-sm border-r-2 border-b-2 border-gray-300 dark:border-gray-600 group-hover:border-[#A8672E] dark:group-hover:border-[#D08F52] transition-colors" />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
