import { CURRENCY_ERRORS } from '@/features/currency/constants';

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
