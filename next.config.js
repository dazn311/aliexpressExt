/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  crossOrigin:"use-credentials",
  env:{
    BASE_URL:'http://localhost:3000',
    X_RAPID_API_KEY:'daza675756c38msh7bf53aadf27b4c2p195d51jsn705d263f4164',
    X_RAPID_API_HOST:'dazaliexpress-datahub.p.rapidapi.com',
    DEFAULT_PAGE:'Sneakers',
  },
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ['dazreact.ru','localhost:3000'],
    },
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
