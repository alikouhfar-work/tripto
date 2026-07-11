import { createSingleFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { ActivityType } from '@/features/activity-type/types/activityType';
import { serverFetch } from '@/utils/serverFetch';

export const getActivityType = createSingleFetcher<ActivityType>({
  fetchFn: serverFetch,
  endpoint: '/api/activity-types',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_FAILED,
});
