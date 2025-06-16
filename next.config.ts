import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  allowedDevOrigins: ["*.danalpay.com"],
  webpack: (config, options) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
