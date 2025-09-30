/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['images.unsplash.com', 'example.com'],
    formats: ['image/webp', 'image/avif']
  }
}

module.exports = nextConfig