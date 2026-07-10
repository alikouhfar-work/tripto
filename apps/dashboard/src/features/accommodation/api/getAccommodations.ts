import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import {
  AccommodationColumns,
  AccommodationDetails,
} from '@/features/accommodation/types/accommodation';
import { serverFetch } from '@/utils/serverFetch';

export const getAccommodations = createListFetcher<AccommodationColumns>({
  endpoint: '/api/accommodations',
  defaultError: ACCOMMODATION_ERRORS.GET_LIST_FAILED,
});

export const getAccommodationById = createSingleFetcher<AccommodationDetails>({
  fetchFn: serverFetch,
  endpoint: '/api/accommodations',
  defaultError: ACCOMMODATION_ERRORS.GET_FAILED,
});
