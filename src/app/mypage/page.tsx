'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/features/hobby/components/header';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';
import { HOBBIES, HOBBY_CATEGORIES } from '@/features/hobby/constants/hobbies';
import type { Hobby } from '@/features/hobby/constants/hobbies';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchBookmarks();
    }
  }, [status, router]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarkedIds(new Set(data.hobbyIds));
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkToggle = async (hobbyId: string) => {
    const isBookmarked = bookmarkedIds.has(hobbyId);

    try {
      if (isBookmarked) {
        const response = await fetch(`/api/bookmarks?hobbyId=${hobbyId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBookmarkedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(hobbyId);
            return newSet;
          });
        }
      } else {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hobbyId }),
        });

        if (response.ok) {
          setBookmarkedIds((prev) => new Set(prev).add(hobbyId));
        }
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">로딩 중...</div>
        </main>
      </div>
    );
  }

  const bookmarkedHobbies = HOBBIES.filter((hobby) =>
    bookmarkedIds.has(hobby.id)
  );

  const categoryStats = Object.keys(HOBBY_CATEGORIES).map((categoryKey) => {
    const category = categoryKey as keyof typeof HOBBY_CATEGORIES;
    const count = bookmarkedHobbies.filter(
      (hobby) => hobby.category === category
    ).length;
    return {
      category: HOBBY_CATEGORIES[category].label,
      count,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">마이페이지</h1>

        <div className="mb-8">
          <Card className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              북마크 요약
            </h2>
            <div className="mb-6">
              <p className="text-2xl font-bold text-primary">
                총 {bookmarkedHobbies.length}개
              </p>
              <p className="text-sm text-gray-500 mt-1">북마크한 취미</p>
            </div>

            {bookmarkedHobbies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  카테고리별 분포
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FF5A5F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            북마크한 취미
          </h2>
          {bookmarkedHobbies.length === 0 ? (
            <Card className="bg-white p-12 rounded-xl shadow-sm text-center">
              <p className="text-gray-500">
                아직 북마크한 취미가 없습니다.
                <br />
                관심 있는 취미를 북마크해보세요!
              </p>
            </Card>
          ) : (
            <HobbyCardGrid
              hobbies={bookmarkedHobbies}
              bookmarkedIds={bookmarkedIds}
              onBookmarkToggle={handleBookmarkToggle}
            />
          )}
        </div>
      </main>
    </div>
  );
}


