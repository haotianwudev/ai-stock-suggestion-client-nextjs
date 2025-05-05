"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { getGraphQLUri } from "./gql-config";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    // Get GraphQL URI from configuration utility
    const graphqlUri = getGraphQLUri();
    
    // Log the GraphQL URI for debugging
    console.log(`Connecting to GraphQL endpoint: ${graphqlUri}`);
    
    // Error handling link
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.error(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
      uri: graphqlUri,
    });

    return new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
        },
        query: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 