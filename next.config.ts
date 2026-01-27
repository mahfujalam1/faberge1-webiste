const nextConfig = {
  images: {
    domains: ['98.93.16.125', 'x91h36px-5137.inc1.devtunnels.ms', '10.10.20.16', 'https://x91h36px-5137.inc1.devtunnels.ms'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 128, 256, 384, 512],
  },
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
};

export default nextConfig;
