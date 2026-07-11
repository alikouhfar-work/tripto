import { createDropdownFetcher } from '@/utils/apiClient';
import { CurrencyOption } from '@/features/currency/types/currency';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export const getCurrenciesDropdown = createDropdownFetcher<CurrencyOption>({
  endpoint: '/api/currencies/dropdown?onlyActive=true',
  defaultError: CURRENCY_ERRORS.GET_LIST_FAILED,
});
