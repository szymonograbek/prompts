/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },
  experimental: {
    serverActions: true
  },
  webpack: function(config, option) {
    config.experiments = { asyncWebAssembly: true, layers: true, ...config.experiments };
    return config;
  }
}

module.exports = nextConfig
