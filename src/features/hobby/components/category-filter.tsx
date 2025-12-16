'use client';

import { Button } from '@/components/ui/button';
import { HOBBY_CATEGORIES } from '../constants/hobbies';
import type { HobbyCategory } from '../constants/hobbies';

interface CategoryFilterProps {
  selectedCategory: HobbyCategory | null;
  onCategoryChange: (category: HobbyCategory | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 mb-8 flex-wrap">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={`rounded-full ${
          selectedCategory === null
            ? 'bg-primary hover:bg-primary-hover text-white'
            : ''
        }`}
      >
        전체
      </Button>
      {Object.entries(HOBBY_CATEGORIES).map(([key, value]) => (
        <Button
          key={key}
          variant={selectedCategory === key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(key as HobbyCategory)}
          className={`rounded-full ${
            selectedCategory === key
              ? 'bg-primary hover:bg-primary-hover text-white'
              : ''
          }`}
        >
          {value.label}
        </Button>
      ))}
    </div>
  );
}

