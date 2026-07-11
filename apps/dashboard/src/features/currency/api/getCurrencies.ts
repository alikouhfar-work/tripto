import { createListFetcher } from '@/utils/apiClient';
import { Currency } from '@/features/currency/types/currency';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export const getCurrencies = createListFetcher<Currency>({
  endpoint: '/api/currencies',
  defaultError: CURRENCY_ERRORS.GET_LIST_FAILED,
});