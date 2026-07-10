import { CURRENCY_ERRORS } from '@/features/currency/constants';
import { CurrencyFormData } from '@/features/currency/types';

export const deleteCurrency = async (id: string) => {
  const response = await fetch(`/api/currencies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || CURRENCY_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
