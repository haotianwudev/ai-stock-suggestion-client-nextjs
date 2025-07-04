import { Suspense, lazy, ComponentType } from 'react';

interface LazyComponentProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Generic lazy loading wrapper
export function LazyComponent({ fallback = <div>Loading...</div>, children }: LazyComponentProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Lazy loading skeleton
export function LazyLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

// Chart loading skeleton
export function ChartLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded mb-4"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends {}>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  return lazy(() => Promise.resolve({ default: Component }));
}

// Error boundary for lazy components
export class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

import React from 'react';