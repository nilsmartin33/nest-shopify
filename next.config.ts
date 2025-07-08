export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '7dc5-2a01-cb19-c9a-1b00-292c-83d3-cf8c-fe4b.ngrok-free.app'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
