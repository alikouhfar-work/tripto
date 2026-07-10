import { Destination } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { createSingleFetcher } from '@/utils/apiClient';
import { serverFetch } from '@/utils/serverFetch';

export const getDestination = createSingleFetcher<Destination>({
  fetchFn: serverFetch,
  endpoint: '/api/destinations',
  defaultError: DESTINATION_ERRORS.GET_FAILED,
});
