import { useQuery } from '@tanstack/react-query';
import { ACTIVITY_TYPE_QUERY_KEYS } from '@/features/activity-type/constants';
import { getActivityTypes } from '@/features/activity-type/server/queries';

export const useGetActivityTypes = () => {
  return useQuery({
    queryKey: ACTIVITY_TYPE_QUERY_KEYS.list(),
    queryFn: getActivityTypes,
  });
};
