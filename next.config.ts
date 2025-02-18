import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shlabs.ir",
      },
    ],
  },
  crossOrigin: "anonymous",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://shlabs.vercel.app",
            // value: "https://admin.buildmasters.ir",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "OPTIONS, GET, DELETE, PATCH, POST, PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
