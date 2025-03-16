import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.panerabread.com'
      },
      {
        protocol: 'https',
        hostname: 'd21y75miwcfqoq.cloudfront.net'
      }
    ]
  }
}

export default nextConfig
