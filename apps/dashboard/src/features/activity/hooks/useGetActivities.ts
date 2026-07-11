'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { ACTIVITY_QUERY_KEYS } from '@/features/activity/constants';
import { getActivities } from '@/features/activity/api/getActivities';

export const useGetActivities = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACTIVITY_QUERY_KEYS.list(params),
    queryFn: () => getActivities(params),
  });
};
