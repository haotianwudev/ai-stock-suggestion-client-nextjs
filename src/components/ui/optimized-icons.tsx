import { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';

// Lazy load icons to reduce initial bundle size
const LazyArrowLeft = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowLeft })));
const LazyArrowRight = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight })));
const LazyArrowUp = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowUpIcon })));
const LazyArrowDown = lazy(() => import('lucide-react').then(mod => ({ default: mod.ArrowDownIcon })));
const LazyExternalLink = lazy(() => import('lucide-react').then(mod => ({ default: mod.ExternalLinkIcon })));
const LazyTrendingUp = lazy(() => import('lucide-react').then(mod => ({ default: mod.TrendingUpIcon })));
const LazyInfo = lazy(() => import('lucide-react').then(mod => ({ default: mod.InfoIcon })));
const LazyLineChart = lazy(() => import('lucide-react').then(mod => ({ default: mod.LineChart })));
const LazyTrophy = lazy(() => import('lucide-react').then(mod => ({ default: mod.Trophy })));
const LazyGraduationCap = lazy(() => import('lucide-react').then(mod => ({ default: mod.GraduationCap })));
const LazyShield = lazy(() => import('lucide-react').then(mod => ({ default: mod.Shield })));
const LazyUsers = lazy(() => import('lucide-react').then(mod => ({ default: mod.Users })));
const LazyBookOpen = lazy(() => import('lucide-react').then(mod => ({ default: mod.BookOpen })));
const LazyMic = lazy(() => import('lucide-react').then(mod => ({ default: mod.Mic })));

// Icon fallback component
const IconFallback = ({ className }: { className?: string }) => (
  <div className={`w-4 h-4 bg-gray-300 rounded animate-pulse ${className}`} />
);

// Optimized icon wrapper
interface OptimizedIconProps extends LucideProps {
  name: string;
}

export function OptimizedIcon({ name, ...props }: OptimizedIconProps) {
  const iconComponents = {
    'arrow-left': LazyArrowLeft,
    'arrow-right': LazyArrowRight,
    'arrow-up': LazyArrowUp,
    'arrow-down': LazyArrowDown,
    'external-link': LazyExternalLink,
    'trending-up': LazyTrendingUp,
    'info': LazyInfo,
    'line-chart': LazyLineChart,
    'trophy': LazyTrophy,
    'graduation-cap': LazyGraduationCap,
    'shield': LazyShield,
    'users': LazyUsers,
    'book-open': LazyBookOpen,
    'mic': LazyMic,
  };

  const IconComponent = iconComponents[name as keyof typeof iconComponents];

  if (!IconComponent) {
    return <IconFallback className={props.className} />;
  }

  return (
    <Suspense fallback={<IconFallback className={props.className} />}>
      <IconComponent {...props} />
    </Suspense>
  );
}

// Pre-built optimized icons for common use cases
export const OptimizedIcons = {
  ArrowLeft: (props: LucideProps) => <OptimizedIcon name="arrow-left" {...props} />,
  ArrowRight: (props: LucideProps) => <OptimizedIcon name="arrow-right" {...props} />,
  ArrowUp: (props: LucideProps) => <OptimizedIcon name="arrow-up" {...props} />,
  ArrowDown: (props: LucideProps) => <OptimizedIcon name="arrow-down" {...props} />,
  ExternalLink: (props: LucideProps) => <OptimizedIcon name="external-link" {...props} />,
  TrendingUp: (props: LucideProps) => <OptimizedIcon name="trending-up" {...props} />,
  Info: (props: LucideProps) => <OptimizedIcon name="info" {...props} />,
  LineChart: (props: LucideProps) => <OptimizedIcon name="line-chart" {...props} />,
  Trophy: (props: LucideProps) => <OptimizedIcon name="trophy" {...props} />,
  GraduationCap: (props: LucideProps) => <OptimizedIcon name="graduation-cap" {...props} />,
  Shield: (props: LucideProps) => <OptimizedIcon name="shield" {...props} />,
  Users: (props: LucideProps) => <OptimizedIcon name="users" {...props} />,
  BookOpen: (props: LucideProps) => <OptimizedIcon name="book-open" {...props} />,
  Mic: (props: LucideProps) => <OptimizedIcon name="mic" {...props} />,
};