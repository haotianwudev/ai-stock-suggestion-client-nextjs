---
inclusion: manual
---

# Adding New Option Strategies - Developer Guide

This guide explains how to add new option strategies to the Strategy Explorer with comprehensive detailed content similar to the wheel and long put strategies.

## Overview

The option strategy system consists of:
- **Strategy Configuration** (`src/components/options/strategy-config.ts`) - Centralized strategy data, payoff calculations, and component mapping
- **Strategy Detail Components** (`src/components/options/strategies/`) - Comprehensive educational content
- **Strategy Explorer** (`src/components/options/strategy-explorer.tsx`) - Main display component

The system is **data-driven** with all strategy information and component references centralized in the configuration file.

## Step-by-Step Process

### 1. Add Strategy Configuration

Edit `src/components/options/strategy-config.ts` and add your strategy to the `strategies` array:

```typescript
{
    id: 'your_strategy_id',
    category: ['Bullish', 'Income'], // Array of categories
    name: 'Your Strategy Name',
    description: "Comprehensive description of the strategy, its mechanics, and use cases.",
    profile: 'Risk Profile Description',
    volatility: 'Volatility Impact (Long/Short Vega)',
    time: 'Time Decay Impact (Long/Short Theta)',
    payoffCalculator: (p, { strike1, strike2, premium }) => 
        // Your payoff calculation logic here
        Math.max(0, p - strike1) - premium,
    youtubeId: 'VIDEO_ID', // Optional: YouTube video ID
    payoffExplanation: "Explanation of how to read the payoff diagram", // Optional
    relatedArticles: ["article-slug-1", "article-slug-2"], // Optional
    infographicUrl: 'https://i.imgur.com/IMAGE_ID.jpeg', // Optional
    detailComponent: YourStrategyDetail as ComponentType<StrategyDetailProps> // Optional: For detailed content
}
```

**Category Options:**
- `Bullish` - Profits from upward price movement
- `Bearish` - Profits from downward price movement  
- `Neutral` - Profits from sideways movement
- `Volatility` - Profits from large price moves
- `Income` - Generates premium income
- `Featured` - Highlighted strategies

### 2. Create Strategy Detail Component (Optional)

**Only create this if you want comprehensive educational content beyond the basic payoff diagram.**

Create `src/components/options/strategies/your-strategy-name.tsx`:

```typescript
import { StrategyDetailProps } from '../strategy-config';

export const YourStrategyDetail = ({ strategy, onBack }: StrategyDetailProps) => {
  return (
    <div className="mt-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Strategy Details
            </h3>
        </div>

        {/* Strategy Intuition Section */}
        <div className="bg-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            Strategy Intuition
          </h3>
          <div className="text-sm text-slate-700 space-y-4">
            {/* Your content here */}
          </div>
        </div>

        {/* Add more sections as needed */}
    </div>
  );
};
```

### 3. Add Component Import to Config

If you created a detail component, add the import to `src/components/options/strategy-config.ts`:

```typescript
// Import strategy detail components
import { YourStrategyDetail } from './strategies/your-strategy-name';

// Then reference it in your strategy configuration
detailComponent: YourStrategyDetail as ComponentType<StrategyDetailProps>
```

### 4. Update Route Metadata (Optional)

If you want SEO metadata, edit `src/app/option/strategies/[[...slug]]/page.tsx`:

```typescript
const strategyMetadata: Record<string, { name: string; description: string }> = {
  // ... existing strategies
  'your-strategy-slug': {
    name: 'Your Strategy Name',
    description: 'Brief description for SEO purposes.',
  },
};
```

## System Architecture

### Data-Driven Design

The strategy system is **completely data-driven**:

1. **Single Configuration File**: All strategy data, payoff calculations, and component references are in `strategy-config.ts`
2. **Automatic Component Resolution**: The `getStrategyDetailComponent` function automatically finds the right component
3. **No Manual Mapping**: No need to update multiple files when adding strategies
4. **Type Safety**: Full TypeScript support with proper interfaces

### Component Flow

```
Strategy Config → Strategy Explorer → Detail Component
     ↓                    ↓               ↓
  - Data              - Display        - Education
  - Payoff            - Charts         - Deep Content  
  - Component         - Basic Info     - Best Practices
```

### Adding Strategies

**Minimal Strategy (Payoff Only):**
```typescript
// Just add to strategies array in config - that's it!
{
    id: 'simple_strategy',
    category: ['Bullish'],
    name: 'Simple Strategy',
    // ... basic properties
    payoffCalculator: (p, params) => /* calculation */
}
```

**Full Strategy (With Educational Content):**
```typescript
// 1. Create detail component
// 2. Import in config
// 3. Add to strategies array with detailComponent property
{
    id: 'complex_strategy',
    // ... basic properties
    detailComponent: ComplexStrategyDetail as ComponentType<StrategyDetailProps>
}
```

## Content Structure Guidelines

### Required Sections

1. **Strategy Intuition** (`bg-slate-50`)
   - Core concept explanation
   - Why the strategy works
   - Market mechanics
   - Mathematical foundations

2. **Implementation Framework** (`bg-indigo-50`)
   - Step-by-step trading procedure
   - Entry and exit criteria
   - Position sizing rules
   - Management guidelines

3. **Best Practices** (`bg-green-50`)
   - Option selection criteria
   - Position management rules
   - Risk management protocols

4. **Market Conditions** (`bg-blue-50`)
   - Suitable market environments
   - When to use the strategy
   - When to avoid

5. **Risk Management** (`bg-red-50`)
   - Common pitfalls
   - Position sizing rules
   - Psychological challenges

### Optional Sections

6. **Advanced Applications** (`bg-purple-50`)
   - Portfolio integration
   - Combination strategies
   - Institutional applications

7. **Performance Metrics** (`bg-yellow-50`)
   - Expected returns
   - Win rates
   - Capital requirements

8. **Educational Resources** (`bg-teal-50`)
   - External links
   - Further reading
   - Tools and calculators

### Color Scheme Guidelines

Choose appropriate gradient colors based on strategy type:

**Bullish Strategies:**
```typescript
// Green theme
from-green-50 to-emerald-50
border-green-200
text-green-800
```

**Bearish Strategies:**
```typescript
// Red theme  
from-red-50 to-pink-50
border-red-200
text-red-800
```

**Neutral Strategies:**
```typescript
// Blue theme
from-blue-50 to-indigo-50
border-blue-200
text-blue-800
```

**Income Strategies:**
```typescript
// Purple theme
from-purple-50 to-pink-50
border-purple-200
text-purple-800
```

### Content Guidelines

1. **Educational Focus**: Content should be educational, not investment advice
2. **Comprehensive Coverage**: Include both theory and practical implementation
3. **Risk Warnings**: Always include appropriate risk disclaimers
4. **External Links**: Link to reputable educational resources
5. **Responsive Design**: Ensure mobile-friendly layouts
6. **Consistent Formatting**: Follow established patterns from existing strategies

### Payoff Calculator Guidelines

The payoff calculator should:
- Take price `p` and params object as arguments
- Return profit/loss at expiration
- Handle multiple strikes (strike1, strike2, strike3, strike4)
- Include premium costs
- Be mathematically accurate

**Example Patterns:**
```typescript
// Long Call
(p, { strike1, premium }) => Math.max(0, p - strike1) - premium

// Bull Call Spread  
(p, { strike1, strike2, premium }) => 
    Math.min(strike2 - strike1, Math.max(0, p - strike1)) - Math.max(0, p - strike2) - premium * 0.5

// Iron Condor
(p, { strike2, strike4 }) => 
    1.0 - Math.max(0, p - strike2) - Math.max(0, strike4 - p)
```

## Testing Checklist

Before deploying your new strategy:

- [ ] Strategy config added with correct ID and categories
- [ ] Payoff calculator tested and mathematically correct
- [ ] Detail component created (if needed) with comprehensive content
- [ ] Component imported in config file (if created)
- [ ] All sections follow established color and formatting patterns
- [ ] External links tested and working
- [ ] Mobile responsiveness verified
- [ ] No TypeScript errors
- [ ] Content is educational and accurate
- [ ] Risk warnings included where appropriate

**Note**: No need to update registry or strategy explorer - the system automatically handles new strategies!

## URL Structure

Strategies are accessible at:
- Overview: `/option/strategies`
- Specific strategy: `/option/strategies/strategy-slug`

The system automatically converts:
- Strategy ID `your_strategy_id` → URL slug `your-strategy-id`
- URL slug `your-strategy-id` → Strategy ID `your_strategy_id`

## Integration with Articles

To link strategies with related articles:
1. Add article slugs to `relatedArticles` array in strategy config
2. Articles will automatically appear in the "Related Articles" section
3. Ensure articles exist in the articles data files

## Best Practices

1. **Data-Driven Approach**: Keep all strategy information in the config file
2. **Consistent Naming**: Use descriptive, consistent naming for strategy IDs
3. **Comprehensive Content**: Include all relevant sections for educational value
4. **Visual Elements**: Use emojis and icons for better visual hierarchy
5. **External Resources**: Link to reputable educational sources
6. **Risk Disclosure**: Always include appropriate risk warnings
7. **Mobile First**: Design for mobile responsiveness
8. **Performance**: Keep content focused and scannable
9. **Accessibility**: Use proper heading hierarchy and alt text
10. **Type Safety**: Use proper TypeScript types and assertions

## Key Advantages of This System

✅ **Simplified Development**: Add strategies by editing one file
✅ **Automatic Integration**: No manual mapping or registry updates needed
✅ **Type Safety**: Full TypeScript support with proper interfaces
✅ **Maintainable**: Single source of truth for all strategy data
✅ **Scalable**: Easy to add new strategies without touching existing code
✅ **Consistent**: Uniform handling of all strategies

This data-driven approach ensures consistency across all option strategies while providing comprehensive educational content for users with minimal development overhead.