import type {NextConfig} from 'next';

 const nextConfig: NextConfig = {
  basePath: '/design-courses-delhi',
  trailingSlash: false,
  serverExternalPackages: [],
  serverActions: {
    allowedOrigins: [
      'insd-landing-page.vercel.app', 
      'insd-generic.vercel.app', 
      'localhost:3000', 
      'localhost:3001'
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
   unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
