"use client";

import React, { useState, useEffect } from 'react';
import { X, RotateCw, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from './button';

interface FullScreenImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenImageViewer({ src, alt, isOpen, onClose }: FullScreenImageViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);

  // Check if screen is portrait and image would benefit from rotation
  useEffect(() => {
    const checkOrientation = () => {
      const isScreenPortrait = window.innerHeight > window.innerWidth;
      setIsPortrait(isScreenPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Reset rotation when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setRotation(0);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'r':
        case 'R':
          rotateClockwise();
          break;
        case 'l':
        case 'L':
          rotateCounterClockwise();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const rotateClockwise = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotation(prev => (prev - 90 + 360) % 360);
  };

  // Auto-rotate suggestion for portrait screens
  const suggestRotation = isPortrait && rotation === 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-[10000] flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={rotateCounterClockwise}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          title="Rotate counter-clockwise (L key)"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={rotateClockwise}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          title="Rotate clockwise (R key)"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          title="Close (Escape key)"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Rotation suggestion for portrait screens */}
      {suggestRotation && (
        <div className="absolute top-4 left-4 z-[10000] bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 animate-pulse">
          <RotateCw className="h-4 w-4" />
          <span>Try rotating for better view</span>
        </div>
      )}

      {/* Image container */}
      <div 
        className="relative max-w-full max-h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            maxWidth: rotation % 180 === 90 ? '100vh' : '100vw',
            maxHeight: rotation % 180 === 90 ? '100vw' : '100vh',
          }}
        />
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close image viewer"
      />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
        <div className="bg-black/50 px-4 py-2 rounded-lg">
          <div className="hidden sm:block">
            Press <kbd className="bg-white/20 px-1 rounded">R</kbd> to rotate clockwise, 
            <kbd className="bg-white/20 px-1 rounded ml-1">L</kbd> to rotate counter-clockwise, 
            <kbd className="bg-white/20 px-1 rounded ml-1">Esc</kbd> to close
          </div>
          <div className="sm:hidden">
            Tap buttons to rotate • Tap outside to close
          </div>
        </div>
      </div>
    </div>
  );
}