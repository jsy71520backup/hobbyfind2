export type HobbyCategory = 'sports' | 'intelligence' | 'art';

export interface Hobby {
  id: string;
  name: string;
  category: HobbyCategory;
}

export const HOBBY_CATEGORIES: Record<HobbyCategory, { label: string; description: string }> = {
  sports: {
    label: '운동형',
    description: '몸을 움직이며 즐길 수 있는 취미들',
  },
  intelligence: {
    label: '지능형',
    description: '두뇌를 활용하며 즐길 수 있는 취미들',
  },
  art: {
    label: '예술형',
    description: '창의성을 발휘하며 즐길 수 있는 취미들',
  },
};

export const HOBBIES: Hobby[] = [
  // 운동형
  { id: 'running', name: '조깅/러닝', category: 'sports' },
  { id: 'yoga', name: '요가', category: 'sports' },
  { id: 'swimming', name: '수영', category: 'sports' },
  { id: 'cycling', name: '자전거', category: 'sports' },
  { id: 'climbing', name: '클라이밍', category: 'sports' },
  { id: 'dance', name: '댄스', category: 'sports' },
  // 지능형
  { id: 'reading', name: '독서', category: 'intelligence' },
  { id: 'puzzle', name: '퍼즐', category: 'intelligence' },
  { id: 'chess', name: '체스', category: 'intelligence' },
  { id: 'programming', name: '프로그래밍', category: 'intelligence' },
  { id: 'language', name: '외국어 학습', category: 'intelligence' },
  { id: 'photography', name: '사진 촬영', category: 'intelligence' },
  // 예술형
  { id: 'drawing', name: '그림 그리기', category: 'art' },
  { id: 'music', name: '악기 연주', category: 'art' },
  { id: 'cooking', name: '요리', category: 'art' },
  { id: 'calligraphy', name: '서예', category: 'art' },
  { id: 'pottery', name: '도자기 만들기', category: 'art' },
  { id: 'gardening', name: '정원 가꾸기', category: 'art' },
];

export const HOBBY_THUMBNAIL_MAP: Record<string, string> = {
  running: 'running.jpg',
  yoga: 'yoga.jpg',
  swimming: 'swimming.jpg',
  cycling: 'cycling.jpg',
  climbing: 'climbing.jpg',
  dance: 'dance.jpg',
  reading: 'reading.jpg',
  puzzle: 'puzzle.jpg',
  chess: 'chess.jpg',
  programming: 'programming.jpg',
  language: 'foreign_language_learning.jpg',
  photography: 'photography.jpg',
  drawing: 'drawing.jpg',
  music: 'instrument_playing.jpg',
  cooking: 'cooking.jpg',
  calligraphy: 'calligraphy.jpg',
  pottery: 'pottery.jpg',
  gardening: 'gardening.jpg',
};

export function getHobbyThumbnailUrl(hobbyId: string): string {
  const filename = HOBBY_THUMBNAIL_MAP[hobbyId] || 'default.jpg';
  return `/thumbnails/${filename}`;
}

