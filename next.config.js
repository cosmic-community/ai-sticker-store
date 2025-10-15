/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
  experimental: {
    optimizePackageImports: ['@cosmicjs/sdk'],
  },
}

module.exports = nextConfig