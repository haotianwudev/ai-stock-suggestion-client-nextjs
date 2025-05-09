/**
 * GraphQL Configuration
 * 
 * This file contains configuration for GraphQL endpoints.
 * Edit these settings to switch between local and production GraphQL servers.
 */

// Set this to true to use local GraphQL server, false to use production
export const USE_LOCAL_GQL = false;

// Local GraphQL server port
export const LOCAL_GQL_PORT = 4000;

// Default fallback for production GraphQL URI if not set in environment
const DEFAULT_PROD_URI = "";

// Get the appropriate GraphQL URI based on configuration
export function getGraphQLUri(): string {
  // Environment variable should always take precedence if defined
  const envUri = process.env.NEXT_PUBLIC_GRAPHQL_URI;
  
  // If using local GraphQL server
  if (USE_LOCAL_GQL) {
    return `http://localhost:${LOCAL_GQL_PORT}/graphql`;
  }
  
  // Return environment variable or default if not set
  const uri = envUri || DEFAULT_PROD_URI;
  
  // Ensure the URI ends with /graphql if it's not empty
  if (uri && !uri.endsWith('/graphql')) {
    return uri.endsWith('/') ? `${uri}graphql` : `${uri}/graphql`;
  }
  
  return uri;
}
