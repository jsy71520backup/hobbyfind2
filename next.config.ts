import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... 기존 설정 유지 ...
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '***',
      },
    ],
  },
  // 💡 이 부분을 추가합니다.
  transpilePackages: ['@supabase/supabase-js', '@supabase/ssr'], 
};

module.exports = nextConfig;