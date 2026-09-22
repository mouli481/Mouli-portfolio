import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  async rewrites() {
    return [
      {
        source: "/api/py/:path*",
        destination: isProduction ? "/api/py/:path*" : "http://127.0.0.1:8000/api/py/:path*",
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
