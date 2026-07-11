'use client';

import { useQuery } from '@tanstack/react-query';
import { CURRENCY_QUERY_KEYS } from '@/features/currency/constants';
import { getCurrency } from '@/features/currency/api/getCurrency';

export const useGetCurrency = (id: string) => {
  return useQuery({
    queryKey: CURRENCY_QUERY_KEYS.detail(id),
    queryFn: () => getCurrency(id),
    enabled: !!id,
  });
};
