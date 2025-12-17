'use client';

import { HobbyCard } from './hobby-card';
import type { Hobby } from '../constants/hobbies';

interface HobbyCardGridProps {
  hobbies: Hobby[];
  bookmarkedIds?: Set<string>;
  onBookmarkToggle?: (hobbyId: string) => void;
}

export function HobbyCardGrid({
  hobbies,
  bookmarkedIds = new Set(),
  onBookmarkToggle,
}: HobbyCardGridProps) {
  if (hobbies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">표시할 취미가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hobbies.map((hobby) => (
        <HobbyCard
          key={hobby.id}
          hobby={hobby}
          isBookmarked={bookmarkedIds.has(hobby.id)}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
}


