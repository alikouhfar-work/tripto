import { ActivityTypeFormData } from '@/features/activity-type/types/activityType';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export const createActivityType = async (data: ActivityTypeFormData) => {
  const response = await fetch('/api/activity-types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

