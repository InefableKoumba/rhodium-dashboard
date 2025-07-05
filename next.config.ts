import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rhodium-bucket.franzer.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
