# Adding New Topics - Developer Guide

This guide explains how to add new topics to both the **Quant** and **Option** sections using our unified template system.

## Overview

Our template system (`src/components/shared/page-template.tsx`) provides a consistent structure for all topic pages with:
- Hero section with configurable colors and icons
- Video tutorials with study guides
- Infographics with full-screen viewing
- Custom content sections
- Related articles integration

## Step-by-Step Process

### 1. Choose Your Section

**Quant Section** (`src/app/quant/`):
- **Topics**: `src/app/quant/topics/` - Core quantitative concepts (Monte Carlo, etc.)
- **Quanttrading**: `src/app/quant/quanttrading/` - Trading strategies (Systematic, ML, etc.)

**Option Section** (`src/app/option/`):
- **Topics**: `src/app/option/topics/` - Options concepts (Greeks, VRP, etc.)

### 2. Add Configuration

#### For Quant Topics (`src/app/quant/topics/config.ts`):
```typescript
export const topicsConfig: Record<string, TopicConfig> = {
  // ... existing configs
  'your-new-topic': {
    id: 'your-new-topic',
    title: 'Your Topic Title',
    description: 'Detailed description of what this topic covers and what users will learn.',
    videoUrl: 'https://youtu.be/VIDEO_ID', // Optional
    infographicUrl: 'https://i.imgur.com/IMAGE_ID.jpeg', // Optional
    relatedArticles: [
      "article-slug-1",
      "article-slug-2",
    ], // Optional
    studyGuide: { // Optional
      items: [
        {
          text: "Resource Title",
          url: "https://example.com/resource"
        },
        {
          text: "[Youtube] Video Resource",
          url: "https://youtu.be/VIDEO_ID",
          videoUrl: "https://youtu.be/CUSTOM_VIDEO_ID",  // Optional: Custom video for this item
          visualGuideUrl: "https://i.imgur.com/CUSTOM_GUIDE.jpeg"  // Optional: Custom visual guide
        },
        {
          text: "Interactive Tool",
          url: "https://calculator.example.com"
        }
      ]
    }
  }
};
```

#### For Quant Trading (`src/app/quant/quanttrading/config.ts`):
```typescript
export const quantTopicsConfig: Record<string, QuantTopicConfig> = {
  // ... existing configs
  'your-trading-topic': {
    id: 'your-trading-topic',
    title: 'Your Trading Strategy',
    description: 'Description of the trading strategy or quantitative method.',
    // ... same structure as above
  }
};
```

#### For Option Topics (`src/app/option/topics/config.ts`):
```typescript
export const topicsConfig: Record<string, TopicConfig> = {
  // ... existing configs
  'your-option-topic': {
    id: 'your-option-topic',
    title: 'Your Option Concept',
    description: 'Description of the options concept or strategy.',
    // ... same structure as above
  }
};
```

### 3. Create Component File

Create your component file in the appropriate directory:
- Quant Topics: `src/app/quant/topics/your-new-topic.tsx`
- Quant Trading: `src/app/quant/quanttrading/your-trading-topic.tsx`
- Option Topics: `src/app/option/topics/your-option-topic.tsx`

#### Template Structure:
```typescript
'use client';

import { YourIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config"; // or getQuantTopicConfig for quanttrading

export function YourTopicContent() {
  const config = getTopicConfig('your-new-topic');
  
  if (!config) return null;

  // Define your color scheme
  const heroColorScheme = {
    border: "border-blue-200",
    background: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border border-blue-100",
    cardText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    sectionTitle: "text-blue-900"
  };

  // Define your custom content sections
  const contentSections = (
    <>
      {/* Your custom content here */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Your Section Title</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Your content cards, explanations, etc. */}
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-blue-900">Implementation</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Tag 1</Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Tag 2</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<YourIcon className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Your Infographic Alt Text"
    />
  );
}
```

### 4. Color Scheme Examples

Choose appropriate colors for your topic:

**Blue Theme** (Monte Carlo):
```typescript
const heroColorScheme = {
  border: "border-blue-200",
  background: "bg-gradient-to-br from-blue-50 to-indigo-50",
  iconBg: "bg-blue-100",
  iconColor: "text-blue-600",
  titleColor: "text-blue-900",
  descriptionColor: "text-blue-700",
  cardBg: "bg-white",
  cardBorder: "border border-blue-100",
  cardText: "text-blue-900",
  badgeBg: "bg-blue-100",
  badgeText: "text-blue-800",
  sectionTitle: "text-blue-900"
};
```

**Green Theme** (Systematic Strategies):
```typescript
const heroColorScheme = {
  border: "border-green-200",
  background: "bg-gradient-to-br from-green-50 to-emerald-50",
  iconBg: "bg-green-100",
  iconColor: "text-green-600",
  titleColor: "text-green-900",
  descriptionColor: "text-green-700",
  cardBg: "bg-white",
  cardBorder: "border border-green-100",
  cardText: "text-green-900",
  badgeBg: "bg-green-100",
  badgeText: "text-green-800",
  sectionTitle: "text-green-900"
};
```

**Purple Theme** (Machine Learning, VRP):
```typescript
const heroColorScheme = {
  border: "border-purple-200",
  background: "bg-gradient-to-br from-purple-50 to-pink-50",
  iconBg: "bg-purple-100",
  iconColor: "text-purple-600",
  titleColor: "text-purple-900",
  descriptionColor: "text-purple-700",
  cardBg: "bg-white",
  cardBorder: "border border-purple-100",
  cardText: "text-purple-900",
  badgeBg: "bg-purple-100",
  badgeText: "text-purple-800",
  sectionTitle: "text-purple-900"
};
```

**Orange Theme** (Greeks):
```typescript
const heroColorScheme = {
  border: "border-orange-200",
  background: "bg-gradient-to-br from-orange-50 to-amber-50",
  iconBg: "bg-orange-100",
  iconColor: "text-orange-600",
  titleColor: "text-orange-900",
  descriptionColor: "text-orange-700",
  cardBg: "bg-white",
  cardBorder: "border border-orange-100",
  cardText: "text-orange-900",
  badgeBg: "bg-orange-100",
  badgeText: "text-orange-800",
  sectionTitle: "text-orange-900"
};
```

### 5. Update Navigation

#### For Quant Topics:
Update `src/app/quant/[tab]/client.tsx` in the `TopicsTab` component:

```typescript
<TabsList className="grid w-full grid-cols-2 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
  <TabsTrigger value="monte-carlo" className="...">Monte Carlo</TabsTrigger>
  <TabsTrigger value="your-new-topic" className="...">Your Topic</TabsTrigger>
</TabsList>

<TabsContent value="your-new-topic" className="mt-0">
  <YourTopicContent config={getTopicConfig('your-new-topic') || undefined} />
</TabsContent>
```

#### For Quant Trading:
Update `src/app/quant/[tab]/client.tsx` in the `QuantTradingTab` component:

```typescript
<TabsList className="grid w-full grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 bg-slate-100 border-t touch-manipulation">
  <TabsTrigger value="systematic-strategies" className="...">Systematic</TabsTrigger>
  <TabsTrigger value="machine-learning" className="...">ML</TabsTrigger>
  <TabsTrigger value="your-trading-topic" className="...">Your Topic</TabsTrigger>
</TabsList>

<TabsContent value="your-trading-topic" className="mt-0">
  <YourTradingTopicContent />
</TabsContent>
```

#### For Option Topics:
Update the appropriate navigation file in the option section.

### 6. Add Import Statements

Don't forget to import your new component:

```typescript
import { YourTopicContent } from "../topics/your-new-topic";
```

## Best Practices

### Content Structure
1. **Hero Section**: Automatically handled by template
2. **Video + Study Guide**: Configured in config file
3. **Infographic**: High-quality visual with full-screen capability
4. **Custom Sections**: Your topic-specific content
5. **Related Articles**: Automatically filtered from config

### Study Guide Guidelines
- Include mix of internal articles and external resources
- Mark YouTube videos with "[Youtube]" prefix
- Order from basic to advanced concepts
- Include practical tools and calculators when relevant

#### Enhanced Study Guide Features

**Interactive Study Guide Items:**
Each study guide item now supports enhanced functionality:

```typescript
{
  text: "How to understand Greeks",
  url: "https://main-article-url.com",           // Main URL (always required)
  videoUrl: "https://youtu.be/CUSTOM_VIDEO",     // Optional: Custom video for this item
  visualGuideUrl: "https://i.imgur.com/GUIDE"   // Optional: Custom visual guide for this item
}
```

**Icon System:**
- **Main icon**: FileText icon (blue) shown for all items
- **Additional content indicators**: Additional icons shown when `videoUrl` or `visualGuideUrl` are available
  - `videoUrl` present → Additional YouTube icon (red)
  - `visualGuideUrl` present → Additional Image icon (purple)
- **Visual layout**: `[📄 FileText] [📺 Video][🖼️ Visual Guide] "Item Text" [Open Button]`
- **Consistent sizing**: All icons are 4x4 size for visual consistency

**Interactive Behavior:**
- **Items with custom content** (videoUrl or visualGuideUrl): Clicking the row selects it (highlighted with blue colors) and updates the main video and infographic sections
- **Items without custom content**: Clicking the row directly opens the URL in a new tab
- **"Open" button**: Always available on the right side to open the main URL for any item
- **Visual feedback**: Selected items are highlighted with blue background and stronger borders
- **Helper text**: Items with custom content show "Click to view custom content" hint

**Video Tutorial Standardization:**
- All videos in topic pages display "Video Tutorial" as the title
- No description text is shown below the video title
- Clean, consistent appearance across all topics

**Example Enhanced Study Guide:**
```typescript
studyGuide: {
  items: [
    {
      text: "[Youtube] Greeks Overview",
      url: "https://youtu.be/main-video"
    },
    {
      text: "How to understand Greeks",
      url: "https://sophie-ai-finance.com/article",
      videoUrl: "https://youtu.be/detailed-tutorial",      // Custom video for this item
      visualGuideUrl: "https://i.imgur.com/detailed.jpg"  // Custom infographic for this item
    },
    {
      text: "Interactive Greeks Calculator",
      url: "https://calculator.com"
    }
  ]
}
```

This creates a powerful, interactive learning experience where users can:
1. **Identify additional content** at a glance through indicator icons
2. **Click on items** to update the main video and infographic sections with custom content
3. **Use the "Open" button** to access the main URL for each resource
4. **Navigate efficiently** with visual selection highlighting and smart click behavior
5. **Enjoy consistent video presentation** with standardized "Video Tutorial" titles

### Color Scheme Selection
- **Blue**: Mathematical/theoretical concepts
- **Green**: Trading strategies and systematic approaches
- **Purple**: AI/ML and advanced analytics
- **Orange**: Options-specific concepts
- **Red**: Risk management topics
- **Teal**: Market structure and mechanics

### Content Guidelines
- Keep explanations concise and practical
- Use interactive elements when possible
- Include real-world examples
- Add risk warnings for trading strategies
- Maintain educational tone (not investment advice)

## Template Features

The `PageTemplate` component provides:

### Required Props
- `config`: Topic configuration object
- `heroIcon`: Main icon for the topic
- `heroColorScheme`: Color scheme object

### Optional Props
- `contentSections`: Your custom content JSX
- `infographicAlt`: Alt text for infographic
- `fallbackInfographic`: Fallback content if no infographic URL
- `showKeyConceptsSection`: Boolean to show/hide key concepts (defaults to false)
- `showVideoSection`: Boolean to show/hide video section
- `showInfographicSection`: Boolean to show/hide infographic section
- `showRelatedArticlesSection`: Boolean to show/hide related articles

### Automatic Features
- Responsive design (mobile/desktop)
- Full-screen image viewer
- Study guide integration with interactive selection
- Related articles filtering
- SEO-friendly structure
- Consistent spacing and typography
- **Standardized video tutorials** with "Video Tutorial" title and no description text

## Testing Checklist

Before deploying your new topic:

- [ ] Config entry added with all required fields
- [ ] Component file created with proper imports
- [ ] Navigation updated to include new topic
- [ ] Color scheme is consistent and accessible
- [ ] Video URL works (if provided)
- [ ] Infographic displays correctly (if provided)
- [ ] Study guide links are valid (if provided)
- [ ] Related articles exist and are relevant
- [ ] Mobile responsiveness tested
- [ ] Full-screen image viewer works
- [ ] No TypeScript errors
- [ ] Content is educational and accurate

## Common Issues

### Config Not Found
- Ensure config ID matches exactly in both config file and component
- Check import paths are correct
- Verify config is exported properly

### Navigation Not Working
- Update grid columns count when adding new tabs
- Ensure TabsTrigger value matches config ID
- Import new component in navigation file

### Styling Issues
- Use provided color scheme structure
- Test on both light and dark modes
- Ensure sufficient color contrast
- Check mobile responsiveness

### Content Issues
- Keep content sections focused and scannable
- Use consistent heading hierarchy
- Include proper alt text for images
- Test all external links

This template system ensures consistency across all topic pages while allowing for unique, topic-specific content and styling.