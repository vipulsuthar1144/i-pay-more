import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: ["*"], // Add external domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lms.ipaymore.in",
        // pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3no.cashify.in",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
