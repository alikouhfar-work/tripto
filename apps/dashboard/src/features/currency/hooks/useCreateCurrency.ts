'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CurrencyFormData } from '@/features/currency/types/currency';
import { createCurrency } from '@/features/currency/api/createCurrency';
import {
  CURRENCY_ERRORS,
  CURRENCY_QUERY_KEYS,
  CURRENCY_SUCCESS,
} from '@/features/currency/constants';

export const useCreateCurrency = () => {
  return useMutation({
    mutationFn: (data: CurrencyFormData) => createCurrency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_QUERY_KEYS.lists() });
      toast.success(CURRENCY_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || CURRENCY_ERRORS.CREATE_FAILED);
    },
  });
};
