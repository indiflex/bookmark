/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'preview.cruip.com',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
