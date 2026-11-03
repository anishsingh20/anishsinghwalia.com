import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/work/semrush", destination: "/work", permanent: true },
      { source: "/work/tanot-solutions", destination: "/work", permanent: true },
      { source: "/work/dataimpulse", destination: "/work", permanent: true },
      { source: "/work/digitalocean-inference-benchmarks", destination: "/work", permanent: true },
      { source: "/work/:slug", destination: "/work", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
