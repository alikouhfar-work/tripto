'use client';

import { useQuery } from '@tanstack/react-query';
import { CURRENCY_QUERY_KEYS } from '@/features/currency/constants';
import { getCurrenciesDropdown } from '@/features/currency/api/getCurrenciesDropdown';

export const useGetCurrenciesDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...CURRENCY_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getCurrenciesDropdown(onlyActive),
  });
};
