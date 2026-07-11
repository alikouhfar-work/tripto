'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HouseFormData } from '@/features/accommodation/house/types/houseForm';
import { updateHouse } from '@/features/accommodation/house/api/updateHouse';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '@/features/accommodation/constants';

export const useUpdateHouse = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
      heroImage,
      galleryImages,
    }: {
      id: string;
      data: HouseFormData;
      heroImage?: File | null;
      galleryImages?: Array<File> | null;
    }) => updateHouse(id, data, heroImage, galleryImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.UPDATE_FAILED);
    },
  });
};
