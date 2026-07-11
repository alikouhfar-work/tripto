import { createDropdownFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { AccommodationTagOption } from '@/features/accommodation-tag/types/accommodationTag';

export const getAccommodationTagsDropdown = createDropdownFetcher<AccommodationTagOption>({
  endpoint: '/api/accommodation-tags/dropdown?onlyActive=true',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
