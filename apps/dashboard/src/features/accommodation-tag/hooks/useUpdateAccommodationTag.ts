'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AccommodationTagFormData } from '@/features/accommodation-tag/types/accommodationTag';
import { updateAccommodationTag } from '@/features/accommodation-tag/api/updateAccommodationTag';
import {
  ACCOMMODATION_TAG_ERRORS,
  ACCOMMODATION_TAG_SUCCESS,
} from '@/features/accommodation-tag/constants';

export const useUpdateAccommodationTag = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccommodationTagFormData }) =>
      updateAccommodationTag(id, data),
    onSuccess: () => {
      toast.success(ACCOMMODATION_TAG_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED);
    },
  });
};
