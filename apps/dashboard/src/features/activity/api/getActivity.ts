import { ACTIVITY_ERRORS } from '../constants';
import { ActivityDTO } from '../types/activity';
import { createSingleFetcher } from '@/utils/apiClient';
import { serverFetch } from '@/utils/serverFetch';

export const getActivity = createSingleFetcher<ActivityDTO>({
  fetchFn: serverFetch,
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_FAILED,
});
