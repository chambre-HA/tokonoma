import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments
  // output: 'standalone',

  // Configure allowed image domains if needed
  // images: {
  //   remotePatterns: [
  //     { protocol: 'https', hostname: '*.vibeuncle.com' },
  //   ],
  // },
}

export default nextConfig
