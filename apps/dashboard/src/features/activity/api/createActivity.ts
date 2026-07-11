import { ActivityFormData } from '@/features/activity/types/activity';
import { ACTIVITY_ERRORS } from '@/features/activity/constants';

export const createActivity = async (data: ActivityFormData, heroImage?: File | null) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (heroImage) {
    formData.append('heroImage', heroImage);
  }

  const response = await fetch('/api/activities', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_ERRORS.CREATE_FAILED);
  }

  return response.json();
};
