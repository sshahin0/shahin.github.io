/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['medium.com', 'cdn-images-1.medium.com'],
  },
  output: 'export',
  basePath: '/sshahin0.github.io',
  assetPrefix: '/sshahin0.github.io/',
}

module.exports = nextConfig 