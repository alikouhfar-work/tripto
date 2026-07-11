'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getAccommodations } from '@/features/accommodation/api/getAccommodations';
import { ACCOMMODATION_QUERY_KEYS } from '@/features/accommodation/constants';

export const useGetAccommodations = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACCOMMODATION_QUERY_KEYS.list(params),
    queryFn: () => getAccommodations(params),
  });
};
