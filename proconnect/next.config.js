/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'pbs.twimg.com'],
  },
  // Remove experimental.serverActions entirely

  output: 'standalone',
}

module.exports = nextConfig
