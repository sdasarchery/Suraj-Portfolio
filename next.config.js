/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable next/image optimizations
    formats: ['image/avif', 'image/webp'],
    // Responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
  },
  
  // Enable SWC minifier (default in Next.js 12+, no need to explicitly set in 15)
  
  // Compress responses
  compress: true,
  
  // Enable strict React mode for development
  reactStrictMode: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;

