/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static01.nyt.com'],
  },
  // Enable standalone output for Docker deployments
  output: 'standalone',
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // Environment-specific configurations
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Optional: Configure for specific deployment scenarios
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
};

module.exports = nextConfig;