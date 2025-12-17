import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  // ⚠️ ESLint 설정이 제거됨

  // 1. Images 설정
  images: {
    remotePatterns: [
      {
        hostname: '**', 
      },
    ],
  },

  // 2. Supabase 빌드 오류를 해결하기 위한 핵심 설정
  transpilePackages: ['@supabase/supabase-js', '@supabase/ssr'],
};

export default nextConfig;