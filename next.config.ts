import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd21y75miwcfqoq.cloudfront.net'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  },
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],

  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
