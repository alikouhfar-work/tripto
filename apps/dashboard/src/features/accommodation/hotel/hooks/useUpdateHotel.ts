'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateHotelPayload } from '@/features/accommodation/hotel/types/mutations';
import { updateHotel } from '@/features/accommodation/hotel/api/updateHotel';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '@/features/accommodation/constants';

export const useUpdateHotel = () => {
  return useMutation({
    mutationFn: (payload: UpdateHotelPayload) => updateHotel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.UPDATE_FAILED);
    },
  });
};
