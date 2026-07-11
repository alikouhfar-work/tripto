import { DestinationFormData } from '@/features/destination/types/destination';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const createDestination = async (data: DestinationFormData) => {
  const response = await fetch('/api/destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.CREATE_FAILED);
  }

  return response.json();
};
