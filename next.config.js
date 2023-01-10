/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  experimental: {
    appDir: true,
  },
  // assetPrefix: isProd ? undefined : "/proxy/3000",
  // basePath: isProd ? undefined : "/proxy/3000",
  // async rewrites() {
  //   return [
  //     {
  //       source: '/proxy/3000/proxy/3000',
  //       destination: '/proxy/3000',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
