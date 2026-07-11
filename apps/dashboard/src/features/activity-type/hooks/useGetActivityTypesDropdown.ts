'use client';

import { useQuery } from '@tanstack/react-query';
import { ACTIVITY_TYPE_QUERY_KEYS } from '@/features/activity-type/constants';
import { getActivityTypesDropdown } from '@/features/activity-type/api/getActivityTypesDropdown';

export const useGetActivityTypesDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...ACTIVITY_TYPE_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getActivityTypesDropdown(onlyActive),
  });
};
