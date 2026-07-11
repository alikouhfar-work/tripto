'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateHotelPayload } from '@/features/accommodation/hotel/types/mutations';
import { createHotel } from '@/features/accommodation/hotel/api/createHotel';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '@/features/accommodation/constants';

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: (payload: CreateHotelPayload) => createHotel(payload),
    onSuccess: () => {
      toast.success(ACCOMMODATION_SUCCESS.CREATED);
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.CREATE_FAILED);
    },
  });
};
