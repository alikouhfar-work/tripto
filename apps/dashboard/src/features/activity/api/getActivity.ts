import { ACTIVITY_ERRORS } from '../constants';
import { ActivityColumnDTO, ActivityDTO } from '../types';
import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';
import { serverFetch } from '@/utils/serverFetch';

export const getActivities = createListFetcher<ActivityColumnDTO>({
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_LIST_FAILED,
});

export const getActivity = createSingleFetcher<ActivityDTO>({
  fetchFn: serverFetch,
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_FAILED,
});
