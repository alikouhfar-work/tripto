import { Destination } from '@/features/destination/types/destination';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { createListFetcher } from '@/utils/apiClient';

export const getDestinations = createListFetcher<Destination>({
  endpoint: '/api/destinations',
  defaultError: DESTINATION_ERRORS.GET_LIST_FAILED,
});