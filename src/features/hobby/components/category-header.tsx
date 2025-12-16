'use client';

import { HOBBY_CATEGORIES } from '../constants/hobbies';
import type { HobbyCategory } from '../constants/hobbies';

interface CategoryHeaderProps {
  category: HobbyCategory;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const categoryInfo = HOBBY_CATEGORIES[category];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">
        {categoryInfo.label}
      </h2>
      <p className="text-gray-500">{categoryInfo.description}</p>
    </div>
  );
}

