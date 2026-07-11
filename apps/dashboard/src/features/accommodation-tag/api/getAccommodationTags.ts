import { createListFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { AccommodationTag } from '@/features/accommodation-tag/types/accommodationTag';

export const getAccommodationTags = createListFetcher<AccommodationTag>({
  endpoint: '/api/accommodation-tags',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
