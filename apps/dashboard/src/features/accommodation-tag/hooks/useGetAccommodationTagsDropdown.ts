'use client';

import { useQuery } from '@tanstack/react-query';
import { ACCOMMODATION_TAG_QUERY_KEYS } from '@/features/accommodation-tag/constants';
import { getAccommodationTagsDropdown } from '@/features/accommodation-tag/api/getAccommodationTagsDropdown';

export const useGetAccommodationTagsDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...ACCOMMODATION_TAG_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getAccommodationTagsDropdown(onlyActive),
  });
};
