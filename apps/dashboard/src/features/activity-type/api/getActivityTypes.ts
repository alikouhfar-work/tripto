import { createListFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { ActivityType } from '@/features/activity-type/types/activityType';

export const getActivityTypes = createListFetcher<ActivityType>({
  endpoint: '/api/activity-types',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
