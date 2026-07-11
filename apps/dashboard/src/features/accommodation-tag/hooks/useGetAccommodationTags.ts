'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { ACCOMMODATION_TAG_QUERY_KEYS } from '@/features/accommodation-tag/constants';
import { getAccommodationTags } from '@/features/accommodation-tag/api/getAccommodationTags';

export const useGetAccommodationTags = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACCOMMODATION_TAG_QUERY_KEYS.list(params),
    queryFn: () => getAccommodationTags(params),
  });
};
