/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ae-pic-a1.aliexpress-media.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
