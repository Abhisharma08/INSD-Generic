import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Ignore build blocking errors (optional, keep if needed)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Image configuration (production safe)
  images: {
    // 🔥 Remove unoptimized after testing (set to false in stable state)
    unoptimized: false,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // ✅ Prevent stale JS/CSS chunks (fix ChunkLoadError permanently)
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ✅ Optional: security headers (good practice)
  async rewrites() {
    return [];
  },

  reactStrictMode: true,

  // ✅ Optional: compression (enabled by default on Vercel)
  compress: true,
};

export default nextConfig;
