"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { getGraphQLUri } from "./gql-config";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    // Get GraphQL URI from configuration utility
    const graphqlUri = getGraphQLUri();
    
    // Log the GraphQL URI for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Connecting to GraphQL endpoint: ${graphqlUri}`);
    }
    
    // Error handling link with better error reporting
    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          );
        });
      }
      
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        
        // Handle specific network errors
        if (networkError.message.includes('fetch')) {
          console.error('Network fetch error - check connectivity');
        }
      }
    });

    const httpLink = new HttpLink({
      uri: graphqlUri,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Add request timeout
      fetchOptions: {
        timeout: 10000, // 10 seconds
      },
    });

    // Optimized cache configuration
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            batchStocks: {
              merge: false, // Don't merge arrays, replace them
            },
            coveredTickers: {
              merge: false,
            },
          },
        },
      },
      // Optimize cache garbage collection
      resultCaching: true,
      canonizeResults: true,
    });

    return new ApolloClient({
      link: from([errorLink, httpLink]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network', // Better UX with cached data
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'cache-first', // Use cache when available
          errorPolicy: 'all',
        },
      },
      // Enable query deduplication
      queryDeduplication: true,
      // Add connection pool
      assumeImmutableResults: true,
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
