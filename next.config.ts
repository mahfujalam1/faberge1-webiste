import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from all domains
    domains: ['10.10.20.16'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 128, 256, 384, 512],
  },
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    "@typescript-eslint/no-explicit-any": "off"
  },

};

export default nextConfig;
