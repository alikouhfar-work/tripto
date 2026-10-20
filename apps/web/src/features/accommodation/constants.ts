export const ACCOMMODATION_QUERY_KEYS = {
  all: ['accommodations'] as const,
  list: (activityTypeId: string) => [...ACCOMMODATION_QUERY_KEYS.all, 'list', activityTypeId] as const,
};

export const ACCOMMODATION_ERRORS = {
  GET_LIST_FAILED: 'Failed to get accommodations. Please try again.',
} as const;
