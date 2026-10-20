import { useQuery } from '@tanstack/react-query';
import { ACTIVITY_QUERY_KEYS } from '@/features/activity/constants';
import { getActivities } from '@/features/activity/server/queries';

export const useGetActivities = (city: string, activityTypeId: string) => {
  return useQuery({
    queryKey: ACTIVITY_QUERY_KEYS.list(activityTypeId),
    queryFn: () => getActivities(city, activityTypeId),
  });
};
