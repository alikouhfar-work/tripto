'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { CURRENCY_QUERY_KEYS } from '@/features/currency/constants';
import { getCurrencies } from '@/features/currency/api/getCurrencies';

export const useGetCurrencies = (params: ServerTableParams) => {
  return useQuery({
    queryKey: CURRENCY_QUERY_KEYS.list(params),
    queryFn: () => getCurrencies(params),
  });
};
