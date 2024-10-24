/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-1303887003.cos.ap-beijing.myqcloud.com',
        port: '',  
        pathname: "/images/**",      	
      },
    ],
  },
};

export default nextConfig;


