import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3no.cashify.in"], // Add external domains here
  },
};

export default nextConfig;
