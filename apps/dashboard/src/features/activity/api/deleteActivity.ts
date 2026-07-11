import { ACTIVITY_ERRORS } from '@/features/activity/constants';

export const deleteActivity = async (id: string) => {
  const response = await fetch(`/api/activities/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
