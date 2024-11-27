import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rhodiumevent.xyz",
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
