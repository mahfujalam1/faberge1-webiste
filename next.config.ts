const nextConfig = {
  // ✅ CRITICAL: Disable React Strict Mode in production to prevent duplicate API calls
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '98.93.16.125',
      },
      {
        protocol: 'https',
        hostname: 'x91h36px-5137.inc1.devtunnels.ms',
      },
      {
        protocol: 'https',
        hostname: 'api.inhomebeautyservices.com',
      },
      {
        protocol: 'http',
        hostname: '10.10.20.16',
      },
      {
        protocol: 'https',
        hostname: 'faberge-backend-production.up.railway.app',
      },
    ],
    // ✅ Image optimization settings
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
    unoptimized: false, // Enable image optimization
  },

  // ✅ Compress responses
  compress: true,

  // ✅ Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production
};

export default nextConfig;