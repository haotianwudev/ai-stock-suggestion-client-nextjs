# Performance Optimization Tools Guide

## Quick Reference

### Performance Analysis Commands

```bash
# Full performance analysis (build + analyze)
npm run perf

# Run performance analysis on existing build
npm run analyze

# Build with visual bundle analyzer
npm run build:analyze

# Standard production build
npm run build
```

## Tool Descriptions

### 1. Custom Performance Analyzer (`scripts/performance-analysis.js`)

**What it does:**
- Analyzes bundle sizes and identifies large files
- Finds components over 10KB that need code splitting
- Identifies images over 500KB that need optimization
- Detects heavy dependencies that impact bundle size
- Generates detailed performance reports

**Output:**
- Console report with issues and recommendations
- `performance-report.json` with detailed analysis

### 2. Bundle Analyzer (Visual)

**What it does:**
- Opens interactive visualization of bundle composition
- Shows which dependencies contribute most to bundle size
- Helps identify optimization opportunities

**How to use:**
```bash
npm run build:analyze
```
This will open a web page showing the bundle breakdown.

### 3. Performance Report Files

#### `performance-report.json`
Contains detailed analysis data including:
- Bundle size breakdown
- Large component files
- Image optimization opportunities
- Dependency analysis

#### `PERFORMANCE_OPTIMIZATION_RESULTS.md`
Human-readable summary of:
- Before/after performance metrics
- Optimization achievements
- Remaining issues
- Next steps

## Optimization Strategies Implemented

### 1. Dynamic Imports
- **Location**: `src/app/page.tsx`
- **What**: Apollo Client and Podcast Player lazy-loaded
- **Impact**: 34 kB reduction in home page bundle

### 2. Optimized Components
- **Lazy Loading**: `src/components/ui/lazy-component.tsx`
- **Optimized Icons**: `src/components/ui/optimized-icons.tsx`
- **Optimized Images**: `src/components/ui/optimized-image.tsx`

### 3. Apollo Client Optimization
- **Location**: `src/lib/apollo/apollo-wrapper.tsx`
- **Changes**: Cache-first policies, query deduplication
- **Impact**: Better caching and reduced network requests

### 4. Next.js Configuration
- **Location**: `next.config.ts`
- **Features**: Image optimization, package imports, console removal
- **Impact**: Modern image formats, reduced production bundle

## Monitoring Performance

### Regular Checks
```bash
# After making changes
npm run build

# Monthly performance audit
npm run perf

# Before major releases
npm run build:analyze
```

### Key Metrics to Watch
- **Bundle Size**: Keep pages under 200 kB
- **First Load JS**: Minimize shared bundle size
- **Image Sizes**: Keep images under 500 kB
- **Component Size**: Break down components over 10 kB

## Common Issues and Solutions

### Large Bundle Size
1. **Check**: Run `npm run analyze` to identify large files
2. **Action**: Apply dynamic imports to heavy components
3. **Verify**: Run `npm run build` to see improvements

### Slow Loading
1. **Check**: Review First Load JS in build output
2. **Action**: Implement lazy loading for non-critical components
3. **Verify**: Test with `npm run build:analyze`

### Large Images
1. **Check**: Look for files over 500KB in analysis
2. **Action**: Compress images or use next/image optimization
3. **Verify**: Re-run `npm run analyze`

## Performance Budget

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Home Page | < 200 kB | 184 kB | ✅ |
| Stock Page | < 200 kB | 301 kB | ❌ |
| Option Page | < 200 kB | 262 kB | ❌ |
| Images/Page | < 500 kB | ~250 kB | ✅ |

## Next Optimization Priorities

1. **Stock Detail Page**: Apply chart component lazy loading
2. **Option Page**: Implement dynamic imports for heavy components
3. **Image Compression**: Reduce agent PNGs to < 100KB
4. **Component Splitting**: Break down 9 large components

## Continuous Integration

Add to CI/CD pipeline:
```bash
# Performance check in CI
npm run perf > performance-ci-report.txt
```

Consider failing builds if:
- Bundle size exceeds 250 kB
- New large components added (> 15 kB)
- Images added over 500 kB

## Troubleshooting

### Bundle Analyzer Won't Open
```bash
# Try manual approach
npx webpack-bundle-analyzer .next/static/chunks/
```

### Performance Analysis Errors
```bash
# Ensure build exists first
npm run build
npm run analyze
```

### Large Dependency Issues
1. Check if dependency is actually needed
2. Look for lighter alternatives
3. Implement dynamic imports
4. Consider tree shaking improvements

---

**Remember**: Performance optimization is an ongoing process. Run these tools regularly and monitor for regressions!