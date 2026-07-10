import { ActivityTypeFormData } from '@/features/activity-type/types';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export const updateActivityType = async (id: string, data: ActivityTypeFormData) => {
  const response = await fetch(`/api/activity-types/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};