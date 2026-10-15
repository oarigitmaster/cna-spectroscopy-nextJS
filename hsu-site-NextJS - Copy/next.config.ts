import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cna-webfiles.s3.us-east-1.amazonaws.com",
        pathname: "/webmedia/**",
      },
    ],
    qualities: [75],
    formats: ["image/webp"],
  },
};

export default nextConfig;