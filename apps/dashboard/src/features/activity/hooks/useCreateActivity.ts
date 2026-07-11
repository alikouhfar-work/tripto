'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ActivityFormData } from '@/features/activity/types/activity';
import { createActivity } from '@/features/activity/api/createActivity';
import {
  ACTIVITY_ERRORS,
  ACTIVITY_QUERY_KEYS,
  ACTIVITY_SUCCESS,
} from '@/features/activity/constants';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: ({ data, heroImage }: { data: ActivityFormData; heroImage?: File | null }) =>
      createActivity(data, heroImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_QUERY_KEYS.lists() });
      toast.success(ACTIVITY_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_ERRORS.CREATE_FAILED);
    },
  });
};
