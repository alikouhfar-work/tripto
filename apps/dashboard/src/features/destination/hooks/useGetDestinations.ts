'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { DESTINATION_QUERY_KEYS } from '@/features/destination/constants';
import { getDestinations } from '@/features/destination/api/getDestinations';

export const useGetDestinations = (params: ServerTableParams) => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.list(params),
    queryFn: () => getDestinations(params),
  });
};
