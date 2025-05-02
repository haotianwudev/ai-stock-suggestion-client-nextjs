# Next.js Stock Information Dashboard

A responsive Next.js frontend for a stock information and recommendation platform, powered by a GraphQL backend.

## Features

- **Search Functionality**: Dynamic search bar to query stock tickers with real-time suggestions
- **Stock Dashboard**: Display key stock information, financial metrics, price charts, and news
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

First, create a `.env.local` file in the root directory with the following:

```
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GraphQL API

The application communicates with a GraphQL API that provides:

- Stock search functionality
- Company information
- Financial metrics
- Stock price data
- News and updates

## Project Structure

- `/src/app`: Main application pages using App Router
- `/src/components`: Reusable React components
- `/src/lib`: Utilities, hooks, and GraphQL configuration
- `/public`: Static assets

## Deployment

This application can be easily deployed to Vercel or any other hosting platform that supports Next.js.

```bash
npm run build
```
