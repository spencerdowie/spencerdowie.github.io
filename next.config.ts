import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://fullstack-8ksk.onrender.com/**")]
  }
};

export default nextConfig;
