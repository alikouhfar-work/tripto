'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ActivityTypeFormData } from '@/features/activity-type/types/activityType';
import { updateActivityType } from '@/features/activity-type/api/updateActivityType';
import { ACTIVITY_TYPE_ERRORS, ACTIVITY_TYPE_SUCCESS } from '@/features/activity-type/constants';

export const useUpdateActivityType = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ActivityTypeFormData }) =>
      updateActivityType(id, data),
    onSuccess: () => {
      toast.success(ACTIVITY_TYPE_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_TYPE_ERRORS.UPDATE_FAILED);
    },
  });
};
