import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  // 1. ESLint 설정
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 2. Images 설정
  images: {
    remotePatterns: [
      {
        // hostname: '***'로 되어있으나, 보안을 위해 올바른 도메인으로 설정 권장
        hostname: '**', 
      },
    ],
  },

  // 3. Supabase 빌드 오류를 해결하기 위한 핵심 설정
  transpilePackages: ['@supabase/supabase-js', '@supabase/ssr'],
};

// ⚠️ TypeScript 환경에서는 'export default'나 'module.exports' 중 하나만 사용해야 합니다.
// Next.js 설정은 'export default'를 권장하며, 'module.exports'도 사용 가능합니다.
// 여기서는 하나의 깔끔한 export default 구문만 남깁니다.
export default nextConfig;

// 만약 프로젝트가 CommonJS 모듈을 사용해야 한다면, 위 export default를 삭제하고 아래 구문을 사용하세요.
// module.exports = nextConfig;