/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "victorbagsbd.com",
        port: "",
        pathname: "/admin/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
