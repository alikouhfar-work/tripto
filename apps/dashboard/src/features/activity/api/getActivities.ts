import { ACTIVITY_ERRORS } from '../constants';
import { ActivityColumnDTO } from '../types/activity';
import { createListFetcher } from '@/utils/apiClient';

export const getActivities = createListFetcher<ActivityColumnDTO>({
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_LIST_FAILED,
});
