import { createSingleFetcher } from '@/utils/apiClient';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { AccommodationDetails } from '@/features/accommodation/types/accommodation';
import { serverFetch } from '@/utils/serverFetch';

export const getAccommodation = createSingleFetcher<AccommodationDetails>({
  fetchFn: serverFetch,
  endpoint: '/api/accommodations',
  defaultError: ACCOMMODATION_ERRORS.GET_FAILED,
});
