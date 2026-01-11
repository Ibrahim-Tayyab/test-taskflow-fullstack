/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev) {
      return [
        {
          source: '/api/tasks/:path*',
          destination: 'http://127.0.0.1:8000/api/tasks/:path*',
        },
        {
          source: '/api/health',
          destination: 'http://127.0.0.1:8000/api/health',
        },
      ]
    }
    return []
  }
}

module.exports = nextConfig