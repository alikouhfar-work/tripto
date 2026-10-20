export const ACTIVITY_TYPE_QUERY_KEYS = {
  all: ['activity-types'] as const,
  list: () => [...ACTIVITY_TYPE_QUERY_KEYS.all, 'list'] as const,
};

export const ACTIVITY_TYPE_ERRORS = {
  GET_LIST_FAILED: 'Failed to get activity types. Please try again.',
} as const;
