import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const deleteDestination = async (id: string) => {
  const response = await fetch(`/api/destinations/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
