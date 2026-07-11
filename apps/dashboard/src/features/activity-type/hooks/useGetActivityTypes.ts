'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { ACTIVITY_TYPE_QUERY_KEYS } from '@/features/activity-type/constants';
import { getActivityTypes } from '@/features/activity-type/api/getActivityTypes';

export const useGetActivityTypes = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACTIVITY_TYPE_QUERY_KEYS.list(params),
    queryFn: () => getActivityTypes(params),
  });
};
