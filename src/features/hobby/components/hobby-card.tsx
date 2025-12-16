'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Hobby } from '../constants/hobbies';
import { HOBBY_CATEGORIES, getHobbyThumbnailUrl } from '../constants/hobbies';

interface HobbyCardProps {
  hobby: Hobby;
  isBookmarked?: boolean;
  onBookmarkToggle?: (hobbyId: string) => void;
}

export function HobbyCard({
  hobby,
  isBookmarked = false,
  onBookmarkToggle,
}: HobbyCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookmarkClick = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    onBookmarkToggle?.(hobby.id);
  };

  const categoryInfo = HOBBY_CATEGORIES[hobby.category];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Card className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {hobby.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {categoryInfo.label}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmarkClick}
            className="flex-shrink-0"
          >
            <Heart
              className={`w-5 h-5 ${
                isBookmarked
                  ? 'fill-primary text-primary'
                  : 'text-gray-400 hover:text-primary'
              } transition-colors`}
            />
          </Button>
        </div>
        <div className="aspect-video bg-section-bg rounded-lg overflow-hidden">
          <img
            src={getHobbyThumbnailUrl(hobby.id)}
            alt={hobby.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Card>
    </motion.div>
  );
}

