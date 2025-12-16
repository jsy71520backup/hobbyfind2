'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { HOBBY_CATEGORIES } from '../constants/hobbies';
import type { HobbyCategory } from '../constants/hobbies';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          HobbyFind
        </Link>

        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {Object.entries(HOBBY_CATEGORIES).map(([key, value], index) => (
              <div key={key} className="flex items-center gap-4">
                <Link
                  href={`/category/${key}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {value.label}
                </Link>
                {index < Object.keys(HOBBY_CATEGORIES).length - 1 && (
                  <span className="text-gray-300">|</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {session ? (
              <>
                <Link href="/mypage">
                  <Button variant="ghost" size="sm">
                    마이페이지
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary-hover">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

