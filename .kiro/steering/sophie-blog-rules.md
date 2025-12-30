# SOPHIE's Daddy Quant Blog - Development Rules

## Article Creation Workflow

### File Structure & Creation Process
- **Article Pages**: `src/app/articles/[slug]/page.tsx` (kebab-case slugs)
- **Article Data**: Add to appropriate quarterly file in `src/data/articles/` (at beginning for newest date)
  - Current quarter (Q4 2025): `src/data/articles/2025-q4.ts`
  - Previous quarters: `2025-q3.ts`, `2025-q2.ts`, etc.
- **SEO Components**: Use `src/components/seo/` components for metadata

### Adding New Articles - Step by Step

1. **Determine the Quarter**: Based on article date (e.g., December 2025 = Q4 2025)
2. **Open the Quarterly File**: `src/data/articles/2025-q4.ts`
3. **Add Article at the Beginning**: Insert new article object at the top of the array (newest first)
4. **Follow the Article Interface**: See below for required and optional fields

**Example:**
```typescript
// In src/data/articles/2025-q4.ts
export const articles2025Q4: Article[] = [
  {
    title: "Your New Article Title",
    description: "2-3 sentence description of the article content.",
    slug: "your-new-article-slug", // Optional: auto-generated if omitted
    date: "December 7, 2025",
    imageUrl: "https://i.imgur.com/example.jpeg",
    deepResearch: true,
    labels: [ArticleLabel.QUANT, ArticleLabel.AI_ML],
  },
  // ... existing articles below
];
```

### Creating a New Quarter

When starting a new quarter (e.g., 2026-Q1):

1. **Create New File**: `src/data/articles/2026-q1.ts`
```typescript
import { Article, ArticleLabel } from './types';

export const articles2026Q1: Article[] = [
  // Your new articles here
];
```

2. **Update Index File**: `src/data/articles/index.ts`
```typescript
import { articles2026Q1 } from './2026-q1';
import { articles2025Q4 } from './2025-q4';
// ... other imports

const allArticlesRaw = [
  ...articles2026Q1,  // Add new quarter at the top
  ...articles2025Q4,
  ...articles2025Q3,
  ...articles2025Q2,
];
```

### Article Interface
```typescript
interface Article {
  title: string;           // Required
  description: string;     // Required: 2-3 sentences
  slug: string;           // Required: kebab-case
  date: string;          // Required: "Month DD, YYYY"
  imageUrl?: string;     // Optional: Unsplash URLs
  googleDoc?: string;    // Optional: Source research
  deepResearch?: boolean; // Optional: Comprehensive analysis
  youtubeUrl?: string;   // Optional: Video content
  isVideo?: boolean;     // Optional: Video flag
  options?: boolean;     // Optional: Options trading
  pinned?: boolean;      // Optional: Pin to top
  bookSummary?: boolean; // Optional: Book summary flag
  noSummary?: boolean;   // Optional: Skip summary
  podcastUrl?: string;   // Optional: Spotify podcast URL
  labels?: ArticleLabel[]; // Optional: Custom labels for filtering
}
```

### Article Labels System

**Available Labels (Enum)**
```typescript
enum ArticleLabel {
  DEEP_RESEARCH = "Deep Research",      // Auto-generated from deepResearch flag
  OPTIONS = "Options Trading",          // Auto-generated from options flag
  VIDEO = "Youtube",                    // Auto-generated from isVideo flag
  PODCAST = "Podcast",                  // Auto-generated from podcastUrl
  QUANT = "Quantitative Finance",       // Manual: quant methods, algorithms
  AI_ML = "AI & Machine Learning",      // Manual: ML, AI, neural networks
  STOCK_ANALYSIS = "Stock Analysis"     // Manual: stock analysis, valuations
}
```

**How Labels Work**
1. **Auto-Generated Labels**: Automatically added based on article flags
   - `deepResearch: true` → "Deep Research" label
   - `options: true` → "Options Trading" label
   - `isVideo: true` → "Youtube" label
   - `podcastUrl: "..."` → "Podcast" label

2. **Manual Labels**: Add to articles for better categorization
   ```typescript
   {
     title: "Monte Carlo Simulation in Quantitative Finance",
     description: "...",
     deepResearch: true,  // Auto-adds "Deep Research" label
     labels: [ArticleLabel.QUANT],  // Manually add "Quantitative Finance"
   }
   ```

**When to Add Manual Labels**
- **QUANT**: Quantitative methods, Monte Carlo, systematic trading, algorithms, backtesting
- **AI_ML**: Machine learning, deep learning, neural networks, transformers, AI applications
- **STOCK_ANALYSIS**: Stock analysis, DCF, valuations, earnings, portfolio analysis, hedge funds

**Label Guidelines**
- Auto-generated labels (Deep Research, Options Trading, Youtube, Podcast) are handled automatically
- Only add manual labels (QUANT, AI_ML, STOCK_ANALYSIS) when relevant
- Articles can have multiple labels for better discoverability
- Labels enable filtering on the homepage

## Required Components

### Return to Home Button (Header)
```tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

<div className="flex items-center gap-4 mb-4">
  <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
    <ArrowLeft className="mr-2 h-4 w-4" />
    Return to Home
  </Link>
</div>
```

### SEO Components (MANDATORY)
```tsx
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// In component
const currentArticle = articles.find(article => article.slug === 'your-article-slug');

// In return statement
<>
  {currentArticle && (
    <>
      <StructuredData article={currentArticle} />
      <BreadcrumbStructuredData 
        articleTitle={currentArticle.title} 
        articleSlug={currentArticle.slug} 
      />
    </>
  )}
  {/* Your content */}
</>
```

## Badge Positioning
- **"Deep Research"**: Top-left corner (purple)
- **"Video"**: Top-right corner (red)
- **"Podcast"**: Top-right corner (green) - when no video
- **"Options"**: Bottom-right corner (orange-yellow)

## Content Standards
- Use research callouts, strategy boxes, risk warnings
- JSX arrows: `&rarr;` not `→`
- Responsive design with Tailwind CSS
- Educational disclaimers
- **Footer branding**: `© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.`

## SEO Implementation (CRITICAL)

### Branding Standards
- **Site Name**: "SOPHIE's Daddy Quant Blog"
- **Domain**: https://sophie-ai-finance.com
- **Author**: "SOPHIE's Daddy Quant Blog"
- **Publisher**: "SOPHIE's Daddy Quant Blog"
- **Twitter Handle**: @sophies_daddy

### Article SEO Pattern
```tsx
'use client';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function YourArticle() {
  const currentArticle = articles.find(article => article.slug === 'your-slug');
  
  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}
      {/* Your article content */}
    </>
  );
}
```

### Metadata Requirements
- **Title Format**: `Article Title | SOPHIE's Daddy Quant Blog`
- **Description**: Use article.description from articles.ts
- **Keywords**: Include relevant SEO keywords based on content type
- **Open Graph**: Automatic via SEO components
- **Twitter Cards**: Automatic via SEO components
- **Structured Data**: JSON-LD schema for articles

## Podcast Integration

### URL Configuration
- Add `podcastUrl: "https://open.spotify.com/episode/EPISODE_ID"` to article data
- Use full Spotify episode URLs (not embed URLs)

### Article Page Integration
```tsx
import { Music } from 'lucide-react';

// In call-to-action section
{currentArticle?.podcastUrl && (
  <a 
    href={currentArticle.podcastUrl}
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
  >
    <Music className="inline mr-2" />
    Listen to Podcast
  </a>
)}
```

## Video Tutorial Integration

### VideoTutorial Component Interface
```tsx
interface VideoTutorialProps {
  title: string;           // Tutorial title
  description: string;     // Educational description
  videoId: string;        // YouTube video ID (not full URL)
  startTime?: number;     // Optional start time in seconds
  className?: string;     // Optional additional CSS classes
}
```

### Implementation Pattern
```tsx
import { VideoTutorial } from "@/components/ui/video-tutorial";

{analysisMethod === "dcf" && (
  <VideoTutorial
    title="DCF Tutorial: Step-by-Step Guide"
    description="Learn how to build a DCF model from scratch and understand the key assumptions."
    videoId="DEzMJY7dJ6o"
    startTime={6}
    className="mb-4"
  />
)}
```

## Technical Requirements
- Use `'use client';` for interactive React components
- Implement smooth scrolling navigation
- Add proper TypeScript typing
- Include responsive design for mobile/desktop
- Use semantic HTML structure with proper heading hierarchy
- **MANDATORY: Include SEO components on every article**

## Quality Checklist for New Articles
- [ ] Added to appropriate quarterly file (e.g., `src/data/articles/2025-q4.ts`) at the beginning
- [ ] Article date matches the quarter file (Dec 2025 → 2025-q4.ts)
- [ ] Includes SEO components (`StructuredData` + `BreadcrumbStructuredData`)
- [ ] Has proper Return to Home button
- [ ] Uses correct badge positioning
- [ ] Hero infographic placed at top (if applicable) with MANDATORY full-screen viewing capability
- [ ] All infographics include hover effects, click hints, and rotation functionality
- [ ] Article page uses 'use client' directive for interactive components
- [ ] Includes educational disclaimer
- [ ] Footer has "SOPHIE's Daddy Quant Blog" branding
- [ ] Tests build process to ensure sitemap generation
- [ ] Responsive design verified
- [ ] Interactive elements tested (including full-screen image viewer)
- [ ] Podcast integration (if applicable): badge, metadata link, and action button working
- [ ] Full-screen image viewer works on both mobile and desktop

## Content Categories
- **Deep Research**: Comprehensive analysis with multiple sections, interactive elements
- **Options Trading**: Put/call strategies, Greeks, volatility analysis
- **Video Content**: YouTube integration with embedded players
- **Podcast Content**: Spotify podcast integration with dedicated buttons
- **Stock Analysis**: Company-specific DCF models, valuation analysis
- **Book Summaries**: Interactive summaries of trading/investment books

## Article Structure Requirements

### Hero Infographic (When Available)
- **Placement**: Display infographic IMMEDIATELY AFTER the title/hero section and BEFORE the main content sections
- **Order**: Return to Home Button → Title/Hero Section → Infographic → Main Content
- **Styling**: Use rounded corners, shadow, and border for professional appearance
- **Full-Screen Functionality**: MANDATORY - All infographics must include full-screen viewing capability
- **Implementation Pattern**:
```tsx
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Maximize2 } from 'lucide-react';
import { useState } from 'react';

// In component (must be 'use client')
const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

{/* Return to Home Button */}
<div className="max-w-5xl mx-auto px-6 pt-8">
  <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
    <ArrowLeft className="mr-2 h-4 w-4" />
    Return to Home
  </Link>
</div>

{/* Hero Section with Title */}
<div className="bg-white relative overflow-hidden border-b border-slate-100">
  <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
      Your Article Title
    </h1>
    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
      Article description
    </p>
  </div>
</div>

{/* Hero Infographic - Below Title with Full-Screen Capability */}
<section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
  <div 
    className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
    onClick={() => setIsImageViewerOpen(true)}
  >
    <img 
      src="https://i.imgur.com/your-image.jpeg" 
      alt="Article Infographic" 
      className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
    />
    {/* Full-screen button overlay */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsImageViewerOpen(true);
      }}
      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      title="View full screen"
    >
      <Maximize2 className="h-4 w-4" />
    </button>
    {/* Click hint */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
      <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
        Click to view full screen
      </div>
    </div>
  </div>
</section>

{/* Full-screen image viewer */}
<FullScreenImageViewer
  src="https://i.imgur.com/your-image.jpeg"
  alt="Article Infographic"
  isOpen={isImageViewerOpen}
  onClose={() => setIsImageViewerOpen(false)}
/>

{/* Main Content Starts Here */}
<main className="max-w-5xl mx-auto px-6 py-16">
  {/* Article sections */}
</main>
```
- **When to Use**: For deep research articles with custom infographics or data visualizations
- **Image Source**: Store in `imageUrl` field in articles.ts
- **CRITICAL**: Infographic must appear AFTER the title section, not before it
- **MANDATORY**: All infographics must include full-screen viewing with rotation capability

### Google Doc Integration
- **Call-to-Action**: Include "Read Full Research Paper" button in article conclusion

### Podcast Integration (When Available)
- **Badge**: Add green "Podcast" badge in top-right corner when no video exists
- **Call-to-Action**: Include podcast button in article conclusion next to google doc
- **Metadata**: Ensure `podcastUrl` is added to article data

### Podcast Call-to-Action Template
```tsx
{/* Add before footer, after deep research section */}
<div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    {currentArticle?.podcastUrl && (
      <a 
        href={currentArticle.podcastUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
      >
        <Music className="inline mr-2" />
        Listen to Podcast
      </a>
    )}
    {/* Add other call-to-action buttons as needed */}
  </div>
</div>
```

## Quality Standards
- Articles should be educational, not investment advice
- Include proper disclaimers and risk warnings
- Cite sources when using external research
- Use professional language and formatting
- Test all interactive features before publishing
- **MANDATORY: Include SEO components on every new article**
- **MANDATORY: Add google doc link for articles marked with `googleDoc: true`**
- **MANDATORY: Include podcast integration when `podcastUrl` is available**