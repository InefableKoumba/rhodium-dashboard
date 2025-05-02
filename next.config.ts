import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ae088144a8ed4eb88768ecc69b18a04e.r2.dev",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "placeholder.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placeholder.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
