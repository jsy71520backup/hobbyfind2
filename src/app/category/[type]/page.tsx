'use client';

import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/features/hobby/components/header';
import { CategoryHeader } from '@/features/hobby/components/category-header';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';
import { HOBBIES, HOBBY_CATEGORIES } from '@/features/hobby/constants/hobbies';
import type { HobbyCategory } from '@/features/hobby/constants/hobbies';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ type: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { type } = use(params);
  const category = type as HobbyCategory;
  const { data: session } = useSession();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  if (!HOBBY_CATEGORIES[category]) {
    notFound();
  }

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

  const filteredHobbies = HOBBIES.filter((hobby) => hobby.category === category);

  const handleBookmarkToggle = async (hobbyId: string) => {
    if (!session) {
      return;
    }

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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CategoryHeader category={category} />
        <HobbyCardGrid
          hobbies={filteredHobbies}
          bookmarkedIds={bookmarkedIds}
          onBookmarkToggle={handleBookmarkToggle}
        />
      </main>
    </div>
  );
}

