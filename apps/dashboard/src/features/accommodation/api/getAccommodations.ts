import { createListFetcher } from '@/utils/apiClient';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { AccommodationColumns } from '@/features/accommodation/types/accommodation';

export const getAccommodations = createListFetcher<AccommodationColumns>({
  endpoint: '/api/accommodations',
  defaultError: ACCOMMODATION_ERRORS.GET_LIST_FAILED,
});
