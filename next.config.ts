import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_GRAPHQL_URI: "https://sophie-gql.vercel.app/graphql"
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
