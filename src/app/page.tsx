'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/features/hobby/components/header';
import { HeroSection } from '@/features/hobby/components/hero-section';
import { CategoryFilter } from '@/features/hobby/components/category-filter';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';
import { HOBBIES } from '@/features/hobby/constants/hobbies';
import type { HobbyCategory } from '@/features/hobby/constants/hobbies';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<HobbyCategory | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (session) {
      fetchBookmarks();
    }
  }, [session]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarkedIds(new Set(data.hobbyIds));
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    }
  };

  const filteredHobbies = useMemo(() => {
    if (selectedCategory === null) {
      return HOBBIES;
    }
    return HOBBIES.filter((hobby) => hobby.category === selectedCategory);
  }, [selectedCategory]);

  const handleBookmarkToggle = async (hobbyId: string) => {
    if (!session) {
      return;
    }

    const isBookmarked = bookmarkedIds.has(hobbyId);
    const hobby = HOBBIES.find((h) => h.id === hobbyId);

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
          toast({
            title: '북마크 해제',
            description: `${hobby?.name || '취미'} 북마크가 해제되었습니다.`,
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
          toast({
            title: '북마크 완료',
            description: `${hobby?.name || '취미'} 북마크가 완료되었습니다.`,
          });
        }
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      toast({
        title: '오류',
        description: '북마크 처리 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <HobbyCardGrid
          hobbies={filteredHobbies}
          bookmarkedIds={bookmarkedIds}
          onBookmarkToggle={handleBookmarkToggle}
        />
      </main>
    </div>
  );
}
