import { createDropdownFetcher, createListFetcher, createSingleFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { AccommodationTag, AccommodationTagOption } from '@/features/accommodation-tag/types';
import { serverFetch } from '@/utils/serverFetch';

export const getAccommodationTags = createListFetcher<AccommodationTag>({
  endpoint: '/api/accommodation-tags',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});

export const getAccommodationTagById = createSingleFetcher<AccommodationTag>({
  fetchFn: serverFetch,
  endpoint: '/api/accommodation-tags',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_FAILED,
});

export const getAccommodationTagsDropdown = createDropdownFetcher<AccommodationTagOption>({
  endpoint: '/api/accommodation-tags/dropdown?onlyActive=true',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
