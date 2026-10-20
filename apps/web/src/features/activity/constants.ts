export const ACTIVITY_QUERY_KEYS = {
  all: ['activities'] as const,
  list: (activityTypeId: string) => [...ACTIVITY_QUERY_KEYS.all, 'list', activityTypeId] as const,
};

export const ACTIVITY_ERRORS = {
  GET_LIST_FAILED: 'Failed to get activities. Please try again.',
} as const;
