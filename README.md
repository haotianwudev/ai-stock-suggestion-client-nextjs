# SOPHIE - Stock/Option Portfolio Helper

A responsive Next.js frontend for an intelligent stock/option portfolio helper, designed to provide investment insights and education.

## About SOPHIE

SOPHIE (Stock/Option Portfolio Helper for Investment and Education) is a comprehensive platform that helps investors:
- Analyze stock and option investments
- Track portfolio performance
- Learn about investment strategies
- Make informed financial decisions

## Features

- **Smart Search**: Dynamic search bar to query stock and option information with real-time suggestions
- **Portfolio Analysis**: Tools to help track and analyze your investments
- **Market Data**: Display key stock information, financial metrics, price charts, and news
- **Investment Education**: Resources to learn about investing strategies
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Apollo Client**: GraphQL client for data fetching
- **Recharts**: Charting library for React
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Reusable component system

## Getting Started

### Method 2: Configuration Toggle Scripts

Use these npm scripts to easily switch between environments:

```bash
# Use production GraphQL server
npm run use:prod-gql

# Use local GraphQL server (default port 4000)
npm run use:local-gql

# Use local GraphQL server with custom port
npm run use:custom-gql 5000  # Replace 5000 with your desired port
```

After switching environments, restart your Next.js server for changes to take effect:

```bash
npm run dev
```

### Configuration Files

The GraphQL configuration is managed in:

- `/src/lib/apollo/gql-config.ts` - Central configuration file
- `/scripts/switch-gql.js` - Script to switch between environments

## GraphQL API

The application communicates with a GraphQL API that provides:

- Stock and option search functionality
- Company information
- Financial metrics
- Price data
- News and updates
- Portfolio analytics

## Project Structure

- `/src/app`: Main application pages using App Router
- `/src/components`: Reusable React components
- `/src/lib`: Utilities, hooks, and GraphQL configuration
- `/public`: Static assets
- `/scripts`: Utility scripts for development

## Deployment

This application can be easily deployed to Vercel or any other hosting platform that supports Next.js. 

For Vercel deployment, set the environment variable in your Vercel project settings:
```
NEXT_PUBLIC_GRAPHQL_URI=
```

## AI Agent Suggestions

The application now includes AI agent analysis and suggestions from virtual investment experts:

- Warren Buffett agent provides analysis based on fundamental business quality and intrinsic value
- Charlie Munger agent focuses on business moats, predictability, and mental models

### Agent Images

The application includes built-in placeholder images for the AI agents, displayed as colored circles with initials when custom images are not available.

For a more personalized experience, you can add custom cartoon-style images:

1. Create the following directories (if they don't exist):
   ```
   public/images/agents/
   ```

2. Add the following image files:
   - `public/images/agents/warren_buffett.png` - A cartoon-style image of Warren Buffett
   - `public/images/agents/charlie_munger.png` - A cartoon-style image of Charlie Munger

The application will automatically use your custom images when available.

## Setup Instructions

### Adding Agent Images

For the AI agent suggestions feature to display properly, please add cartoon-style images for each agent:

1. Create the following directories (if they don't exist):
   ```
   public/images/agents/
   ```

2. Add the following image files:
   - `public/images/agents/warren_buffett.png` - A cartoon-style image of Warren Buffett
   - `public/images/agents/charlie_munger.png` - A cartoon-style image of Charlie Munger

You can use any cartoon/avatar style images that represent these investors.

## Development

```bash
# Install dependencies
npm install

# Create .env.local with your GraphQL endpoint (example)
echo "NEXT_PUBLIC_GRAPHQL_URI=CCC/graphql" > .env.local

# Or switch to local GraphQL server
npm run use:local-gql

# Run development server
npm run dev
```

## Contact

For inquiries, please contact: [sophieaifinance@gmail.com](mailto:sophieaifinance@gmail.com)
