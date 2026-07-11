import { createSingleFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { AccommodationTag } from '@/features/accommodation-tag/types/accommodationTag';
import { serverFetch } from '@/utils/serverFetch';

export const getAccommodationTag = createSingleFetcher<AccommodationTag>({
  fetchFn: serverFetch,
  endpoint: '/api/accommodation-tags',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_FAILED,
});
