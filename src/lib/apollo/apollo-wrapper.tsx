"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { getGraphQLUri } from "./gql-config";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

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

    // Attaches the current Supabase session's access token, if any, so
    // auth-aware resolvers (Query.me, forum mutations) can identify the
    // caller. Runs per-operation, unlike the rest of this client which is
    // built once on mount.
    const authLink = setContext(async (_, { headers }) => {
      if (!isSupabaseConfigured) return { headers };
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      return {
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };
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
      link: from([errorLink, authLink, httpLink]),
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
