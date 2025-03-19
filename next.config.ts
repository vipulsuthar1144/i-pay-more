import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["*"], // Add external domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
      {
        protocol: "http",
        hostname: "**", // Allows images from any domain
      },
    ],
  },
};

export default nextConfig;
