import { CURRENCY_ERRORS } from '@/features/currency/constants';
import { CurrencyFormData } from '@/features/currency/types/currency';

export const updateCurrency = async (id: string, data: CurrencyFormData) => {
  const response = await fetch(`/api/currencies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || CURRENCY_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};
