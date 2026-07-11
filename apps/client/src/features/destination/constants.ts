import { SeasonEnum } from '@/enums/season';

export const DESTINATION_QUERY_KEYS = {
  all: ['destinations'] as const,
  weekend: () => [...DESTINATION_QUERY_KEYS.all, 'weekend'] as const,
  seasonal: (season: SeasonEnum) => [...DESTINATION_QUERY_KEYS.all, 'seasonal', season] as const,
};

export const DESTINATION_ERRORS = {
  SEASON_REQUIRED: 'Season is required',
  GET_LIST_FAILED: 'Failed to get destinations. Please try again.',
} as const;
