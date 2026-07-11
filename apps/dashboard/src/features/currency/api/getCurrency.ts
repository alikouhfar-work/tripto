import { Currency } from '@/features/currency/types/currency';
import { createSingleFetcher } from '@/utils/apiClient';
import { serverFetch } from '@/utils/serverFetch';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export const getCurrency = createSingleFetcher<Currency>({
  fetchFn: serverFetch,
  endpoint: '/api/currencies',
  defaultError: CURRENCY_ERRORS.GET_FAILED,
});
