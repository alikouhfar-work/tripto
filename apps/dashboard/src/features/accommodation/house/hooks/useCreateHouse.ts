'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HouseFormData } from '@/features/accommodation/house/types/houseForm';
import { createHouse } from '@/features/accommodation/house/api/createHouse';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '@/features/accommodation/constants';

export const useCreateHouse = () => {
  return useMutation({
    mutationFn: ({
      data,
      heroImage,
      galleryImages,
    }: {
      data: HouseFormData;
      heroImage?: File | null;
      galleryImages?: Array<File> | null;
    }) => createHouse(data, heroImage, galleryImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.CREATE_FAILED);
    },
  });
};
