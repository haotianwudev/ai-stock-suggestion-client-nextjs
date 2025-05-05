"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import { useMemo } from "react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
      }),
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