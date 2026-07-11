import { createDropdownFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { ActivityTypeOption } from '@/features/activity-type/types/activityType';

export const getActivityTypesDropdown = createDropdownFetcher<ActivityTypeOption>({
  endpoint: '/api/activity-types/dropdown?onlyActive=true',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
